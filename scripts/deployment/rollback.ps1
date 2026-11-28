<#
.SYNOPSIS
    Atomic Rollback Script for Super EZ Tour Frontend (@superez/web).

.DESCRIPTION
    Reverts /var/www/superez/current to /var/www/superez/previous via /opt/superez/scripts/rollback.sh
    and verifies https://superez.site and https://api.vivu.site/health.
    Pass -DryRun to validate local workspace & SSH client configuration with zero remote calls.
#>

[CmdletBinding()]
param(
    [switch]$DryRun,

    [switch]$Force,

    [string]$HostName = "103.75.187.40",

    [int]$Port = 24700,

    [string]$User = "root",

    [string]$KeyPath = "$env:USERPROFILE\.ssh\superez_deploy",

    [string]$RemoteBaseDir = "/var/www/superez",

    [string]$RemoteScriptsDir = "/opt/superez/scripts"
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

function Get-Timestamp { return (Get-Date).ToString("yyyy-MM-dd HH:mm:ss") }
function Write-RollbackHeader([string]$Title) {
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Magenta
    Write-Host "[$((Get-Timestamp))] $Title" -ForegroundColor Magenta
    Write-Host "================================================================================" -ForegroundColor Magenta
}
function Write-Success([string]$Message) { Write-Host "  [SUCCESS] $Message" -ForegroundColor Green }
function Write-Info([string]$Message) { Write-Host "  [INFO] $Message" -ForegroundColor Gray }
function Write-WarningMsg([string]$Message) { Write-Host "  [WARNING] $Message" -ForegroundColor Yellow }
function Write-ErrorMsg([string]$Message) { Write-Host "  [ERROR] $Message" -ForegroundColor Red }

$StartTime = Get-Date

try {
    Write-RollbackHeader "SUPER EZ TOUR FRONTEND ROLLBACK"

    $ScriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Definition }
    $ProjectRoot = (Resolve-Path (Join-Path $ScriptDir "..\..")).Path
    $RootPackagePath = Join-Path $ProjectRoot "package.json"
    if (-not (Test-Path -LiteralPath $RootPackagePath)) {
        throw "Missing monorepo root package.json at $RootPackagePath."
    }

    $sshCmd = Get-Command ssh.exe -ErrorAction SilentlyContinue
    if (-not $sshCmd) { $sshCmd = Get-Command ssh -ErrorAction SilentlyContinue }
    if (-not $sshCmd) { throw "Command 'ssh' not found in PATH." }

    $curlCmd = Get-Command curl.exe -ErrorAction SilentlyContinue
    if (-not $curlCmd) { throw "Command 'curl.exe' not found in PATH." }

    if ($DryRun) {
        Write-Success "Local rollback preflight passed (Root: $ProjectRoot, SSH: $($sshCmd.Source))."
        Write-Info "[DRY-RUN] Zero SSH commands executed against $HostName. Planned remote script: $RemoteScriptsDir/rollback.sh"
        return
    }

    if (-not (Test-Path -LiteralPath $KeyPath)) {
        throw "SSH Private Key not found at: $KeyPath"
    }
    Write-Success "SSH Private Key verified: $KeyPath"

    Write-Info "Connecting to VPS (${User}@${HostName}:$Port)..."
    $sshCheck = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes -o ConnectTimeout=10 "${User}@${HostName}" "echo CONNECTED" 2>&1
    if ($LASTEXITCODE -ne 0 -or ($sshCheck -notcontains "CONNECTED")) {
        throw "Unable to connect to VPS via SSH: $($sshCheck -join ' ')"
    }
    Write-Success "VPS SSH connection established."

    $remoteCheckCmd = @'
CURR=$(readlink -f '{0}/current' 2>/dev/null || echo 'NONE')
PREV=$(readlink -f '{0}/previous' 2>/dev/null || echo 'NONE')
echo "CURRENT:$CURR"
echo "PREVIOUS:$PREV"
if [ -L '{0}/previous' ]; then echo "PREVIOUS_EXISTS:YES"; else echo "PREVIOUS_EXISTS:NO"; fi
'@ -f $RemoteBaseDir

    $statusCheck = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" $remoteCheckCmd 2>&1
    $currentRelease = "NONE"
    $previousRelease = "NONE"
    $previousExists = $false

    foreach ($line in $statusCheck) {
        if ($line -match "^CURRENT:(.+)$") { $currentRelease = $matches[1].Trim() }
        if ($line -match "^PREVIOUS:(.+)$") { $previousRelease = $matches[1].Trim() }
        if ($line -match "^PREVIOUS_EXISTS:YES$") { $previousExists = $true }
    }

    Write-Info "Active release (current)   : $currentRelease"
    Write-Info "Fallback release (previous): $previousRelease"

    if (-not $previousExists -or $previousRelease -eq "NONE" -or $previousRelease -eq "") {
        throw "Cannot rollback: $RemoteBaseDir/previous symlink does not exist on VPS."
    }
    if ($currentRelease -eq $previousRelease) {
        Write-WarningMsg "Current and previous releases are identical ($currentRelease). Nothing to roll back."
        return
    }

    if (-not $Force) {
        Write-Host "WARNING: Switching production from '$currentRelease' to '$previousRelease'." -ForegroundColor Yellow
        $confirmation = Read-Host "Type 'yes' to confirm rollback"
        if ($confirmation -notin @("yes", "YES", "y", "Y")) {
            Write-Info "Rollback cancelled by operator."
            return
        }
    }

    $rollbackOutput = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "$RemoteScriptsDir/rollback.sh" 2>&1
    $rollbackExitCode = $LASTEXITCODE
    Write-Host ($rollbackOutput -join "`n")
    if ($rollbackExitCode -ne 0) {
        throw "Remote rollback.sh failed with exit code $rollbackExitCode."
    }

    $newCurrent = (& $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current").Trim()
    if ($newCurrent -ne $previousRelease) {
        throw "Post-rollback symlink '$newCurrent' does not match expected '$previousRelease'."
    }
    Write-Success "Symlink restored to: $newCurrent"

    Start-Sleep -Seconds 2
    $superezCode = & $curlCmd.Source -s -o NUL -w "%{http_code}" https://superez.site
    $vivuCode = & $curlCmd.Source -s -o NUL -w "%{http_code}" https://api.vivu.site/health
    Write-Info "Post-rollback HTTP status: superez.site=$superezCode, api.vivu.site/health=$vivuCode"

    $elapsed = ((Get-Date) - $StartTime).TotalSeconds
    Write-Success "Rollback completed in $([math]::Round($elapsed, 2))s."
} catch {
    Write-ErrorMsg $_.Exception.Message
    exit 1
}
