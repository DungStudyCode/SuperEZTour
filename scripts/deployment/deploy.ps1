<#
.SYNOPSIS
    Automated Frontend Deployment Pipeline for Super EZ Tour (@superez/web).

.DESCRIPTION
    7-step zero-downtime release pipeline for the Super EZ Tour Enterprise Monorepo:
    [1/7] Preflight      : Validates monorepo root (superez-monorepo), @superez/web manifest, CLI tools,
                           and (when not in local -DryRun) SSH key & VPS script readiness.
    [2/7] Build          : Builds @superez/web (npm run build:web -> apps/web/dist) and verifies index.html,
                           all referenced hashed JS/CSS chunks on disk, and any 3D .glb assets.
    [3/7] Create Release : Creates an immutable timestamped release directory on the VPS.
    [4/7] Upload         : Uploads apps/web/dist/. via SCP (port 24700) and sets chmod 755/644.
    [5/7] Validate       : Verifies remote file count, index.html, assets/, and .glb byte parity.
    [6/7] Activate       : Atomically switches /var/www/superez/current via /opt/superez/scripts/deploy.sh.
    [7/7] Health Check   : Verifies HTTPS 200, live bundle hash, all referenced JS/CSS assets,
                           SPA fallback (/destinations/ha-noi), and ViVu isolation (api.vivu.site/health).
                           Automatically rolls back if current points to the new release and health checks fail.

.PARAMETER DryRun
    Safe local verification mode by default: validates workspace manifests, local CLI tools, builds/verifies
    apps/web/dist artifacts on disk, and prints planned deployment actions with ZERO SSH/SCP/network calls.
    Combine with -CheckRemote to also test non-destructive SSH preflight connectivity.
    Alias: -PreflightOnly

.PARAMETER CheckRemote
    Optional flag used with -DryRun to verify SSH key and non-destructive remote VPS readiness.
#>

[CmdletBinding()]
param(
    [Alias("PreflightOnly")]
    [switch]$DryRun,

    [switch]$CheckRemote,

    [switch]$SkipBuild,

    [string]$ReleaseId,

    [switch]$NoRollbackOnFailure,

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

function Get-Timestamp {
    return (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
}

function Write-Step {
    param([string]$Step, [string]$Message)
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Cyan
    Write-Host "[$((Get-Timestamp))] $Step - $Message" -ForegroundColor Cyan
    Write-Host "================================================================================" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "  [SUCCESS] $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "  [INFO] $Message" -ForegroundColor Gray
}

function Write-WarningMsg {
    param([string]$Message)
    Write-Host "  [WARNING] $Message" -ForegroundColor Yellow
}

function Write-ErrorMsg {
    param([string]$Message)
    Write-Host "  [ERROR] $Message" -ForegroundColor Red
}

$GlobalStartTime = Get-Date

try {
    # =========================================================================
    # [1/7] PREFLIGHT CHECKS
    # =========================================================================
    Write-Step "[1/7]" "Preflight Checks - Workspace & Environment Validation"

    $ScriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Definition }
    $ProjectRoot = (Resolve-Path (Join-Path $ScriptDir "..\..")).Path
    $RootPackagePath = Join-Path $ProjectRoot "package.json"
    $WebDir = Join-Path $ProjectRoot "apps\web"
    $WebPackagePath = Join-Path $WebDir "package.json"
    $DistPath = Join-Path $WebDir "dist"

    Write-Info "Monorepo root: $ProjectRoot"
    if (-not (Test-Path -LiteralPath $RootPackagePath)) {
        throw "Missing root package.json at $RootPackagePath."
    }
    if (-not (Test-Path -LiteralPath $WebPackagePath)) {
        throw "Missing frontend workspace manifest at $WebPackagePath."
    }

    $RootPkg = Get-Content -LiteralPath $RootPackagePath -Raw | ConvertFrom-Json
    if ($RootPkg.name -ne "superez-monorepo") {
        throw "Root package.json name ('$($RootPkg.name)') does not match 'superez-monorepo'."
    }
    $WebPkg = Get-Content -LiteralPath $WebPackagePath -Raw | ConvertFrom-Json
    if ($WebPkg.name -ne "@superez/web") {
        throw "Frontend workspace name ('$($WebPkg.name)') does not match '@superez/web'."
    }
    Write-Success "Verified monorepo '$($RootPkg.name)' and workspace '$($WebPkg.name)' (v$($WebPkg.version))."

    $nodeCmd = Get-Command node -ErrorAction SilentlyContinue
    if (-not $nodeCmd) { throw "Command 'node' not found in PATH." }
    $nodeVer = (& node -v).Trim()
    Write-Success "Node.js: $nodeVer ($($nodeCmd.Source))"

    $npmCmd = Get-Command npm.cmd -ErrorAction SilentlyContinue
    if (-not $npmCmd) { $npmCmd = Get-Command npm -ErrorAction SilentlyContinue }
    if (-not $npmCmd) { throw "Command 'npm' not found in PATH." }
    $npmVer = (& $npmCmd.Source -v).Trim()
    Write-Success "npm: v$npmVer ($($npmCmd.Source))"

    $sshCmd = Get-Command ssh.exe -ErrorAction SilentlyContinue
    if (-not $sshCmd) { $sshCmd = Get-Command ssh -ErrorAction SilentlyContinue }
    if (-not $sshCmd) { throw "Command 'ssh' not found in PATH." }
    Write-Success "SSH Client: $($sshCmd.Source)"

    $scpCmd = Get-Command scp.exe -ErrorAction SilentlyContinue
    if (-not $scpCmd) { $scpCmd = Get-Command scp -ErrorAction SilentlyContinue }
    if (-not $scpCmd) { throw "Command 'scp' not found in PATH." }
    Write-Success "SCP Client: $($scpCmd.Source)"

    $curlCmd = Get-Command curl.exe -ErrorAction SilentlyContinue
    if (-not $curlCmd) { throw "Command 'curl.exe' not found in PATH." }
    Write-Success "curl: $($curlCmd.Source)"

    if (-not $DryRun -or $CheckRemote) {
        Write-Info "Checking SSH Private Key: $KeyPath"
        if (-not (Test-Path -LiteralPath $KeyPath)) {
            throw "SSH Private Key not found at: $KeyPath"
        }
        Write-Success "SSH Private Key present."

        Write-Info "Testing non-interactive SSH connectivity to ${User}@${HostName}:$Port..."
        $sshCheckOutput = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new "${User}@${HostName}" "echo DEPLOY_READY" 2>&1
        if ($LASTEXITCODE -ne 0 -or ($sshCheckOutput -notcontains "DEPLOY_READY")) {
            throw "SSH connection check failed: $($sshCheckOutput -join ' ')"
        }
        Write-Success "SSH connectivity verified (DEPLOY_READY)."

        $scriptsCheck = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "test -x $RemoteScriptsDir/deploy.sh && test -x $RemoteScriptsDir/rollback.sh && echo SCRIPTS_READY" 2>&1
        if ($LASTEXITCODE -ne 0 -or ($scriptsCheck -notcontains "SCRIPTS_READY")) {
            throw "Remote deploy/rollback scripts in $RemoteScriptsDir are missing or not executable."
        }
        Write-Success "Remote VPS scripts verified: deploy.sh & rollback.sh."

        $currentActive = (& $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current 2>/dev/null || echo 'NONE'").Trim()
        Write-Info "Active production release: $currentActive"
    } else {
        Write-Info "Local-only DryRun active: skipping SSH key check and all remote network calls (pass -CheckRemote to probe SSH)."
    }

    # =========================================================================
    # [2/7] BUILD & VERIFY FRONTEND ARTIFACTS (@superez/web -> apps/web/dist)
    # =========================================================================
    Write-Step "[2/7]" "Build & Verify Frontend Workspace (@superez/web)"

    if ($SkipBuild -and (Test-Path -LiteralPath (Join-Path $DistPath "index.html"))) {
        Write-WarningMsg "-SkipBuild enabled: reusing existing build output at $DistPath."
    } else {
        Write-Info "Cleaning previous build output at $DistPath..."
        if (Test-Path -LiteralPath $DistPath) {
            Remove-Item -LiteralPath $DistPath -Recurse -Force -ErrorAction SilentlyContinue
        }

        Write-Info "Running: npm run build:web (working directory: $ProjectRoot)..."
        $BuildStartTime = Get-Date
        Push-Location $ProjectRoot
        try {
            & $npmCmd.Source run build:web
            $buildExit = $LASTEXITCODE
        } finally {
            Pop-Location
        }
        if ($buildExit -ne 0) {
            throw "'npm run build:web' failed with exit code $buildExit."
        }

        $BuildElapsed = ((Get-Date) - $BuildStartTime).TotalSeconds
        Write-Success "Frontend workspace built cleanly in $([math]::Round($BuildElapsed, 2))s."
    }

    $IndexHtmlPath = Join-Path $DistPath "index.html"
    $AssetsPath = Join-Path $DistPath "assets"

    if (-not (Test-Path -LiteralPath $IndexHtmlPath)) {
        throw "Missing build entry file: $IndexHtmlPath"
    }
    $IndexSize = (Get-Item -LiteralPath $IndexHtmlPath).Length
    if ($IndexSize -le 0) {
        throw "Built index.html is empty!"
    }
    if (-not (Test-Path -LiteralPath $AssetsPath)) {
        throw "Missing built assets directory: $AssetsPath"
    }
    $AssetFiles = Get-ChildItem -LiteralPath $AssetsPath -Recurse -File
    if ($AssetFiles.Count -eq 0) {
        throw "Built assets directory contains zero files!"
    }

    $IndexHtmlContent = Get-Content -LiteralPath $IndexHtmlPath -Raw
    $ReferencedAssets = @()
    $AssetMatches = [regex]::Matches($IndexHtmlContent, '(?:src|href)="(/assets/[^"]+\.(?:js|css))"')
    foreach ($m in $AssetMatches) {
        $foundAsset = $m.Groups[1].Value
        if ($ReferencedAssets -notcontains $foundAsset) {
            $ReferencedAssets += $foundAsset
        }
    }
    if ($ReferencedAssets.Count -eq 0) {
        throw "No hashed JS/CSS asset tags found in apps/web/dist/index.html!"
    }

    foreach ($assetRel in $ReferencedAssets) {
        $diskAsset = Join-Path $DistPath ($assetRel.TrimStart('/').Replace('/', '\'))
        if (-not (Test-Path -LiteralPath $diskAsset)) {
            throw "Referenced asset '$assetRel' in index.html is missing on disk at $diskAsset!"
        }
    }

    $JsBundleMatch = [regex]::Match($IndexHtmlContent, 'src="(/assets/index-[^"]+\.js)"')
    $PrimaryJsPath = if ($JsBundleMatch.Success) { $JsBundleMatch.Groups[1].Value } else { $ReferencedAssets[0] }

    Write-Success "Verified build output: $($AssetFiles.Count) files under assets/, index.html ($IndexSize bytes)."
    Write-Info "Verified $($ReferencedAssets.Count) entry-referenced assets in index.html:"
    foreach ($asset in $ReferencedAssets) {
        Write-Info "  - $asset"
    }

    $LocalGlbFiles = Get-ChildItem -LiteralPath $AssetsPath -Filter "*.glb" -Recurse
    $LocalGlbInfo = @{}
    foreach ($glb in $LocalGlbFiles) {
        $relPath = $glb.FullName.Substring($DistPath.Length).Replace("\", "/")
        $LocalGlbInfo[$relPath] = $glb.Length
        Write-Success "Verified 3D model asset: $relPath ($($glb.Length) bytes)"
    }

    $PlannedReleaseId = if ($ReleaseId) { $ReleaseId } else { (Get-Date).ToString("yyyyMMdd-HHmmss") }
    if ($PlannedReleaseId -notmatch '^[a-zA-Z0-9_-]+$') {
        throw "Invalid ReleaseId '$PlannedReleaseId'. Only [a-zA-Z0-9_-] characters are allowed."
    }

    if ($DryRun) {
        Write-Host ""
        Write-Host "--------------------------------------------------------------------------------" -ForegroundColor Yellow
        Write-Host "[DRY-RUN COMPLETE] Local workspace build & deployment plan verified!" -ForegroundColor Yellow
        Write-Host "  - Source Artifact Dir : $DistPath" -ForegroundColor White
        Write-Host "  - Primary Entry Chunk : $PrimaryJsPath" -ForegroundColor White
        Write-Host "  - Target Release Path : $RemoteBaseDir/releases/$PlannedReleaseId (NOT CREATED)" -ForegroundColor White
        Write-Host "  - Activation Script   : $RemoteScriptsDir/deploy.sh $PlannedReleaseId (NOT EXECUTED)" -ForegroundColor White
        Write-Host "  - SPA Health Route    : https://superez.site/destinations/ha-noi (NOT QUERIED)" -ForegroundColor White
        Write-Host "  - ViVu Isolation Guard: https://api.vivu.site/health (NOT QUERIED)" -ForegroundColor White
        Write-Host "[DRY-RUN] Zero files uploaded and zero changes made to production." -ForegroundColor Yellow
        Write-Host "--------------------------------------------------------------------------------" -ForegroundColor Yellow
        return
    }

    # =========================================================================
    # [3/7] CREATE RELEASE
    # =========================================================================
    Write-Step "[3/7]" "Create Release - Immutable Release Directory"
    $ReleaseId = $PlannedReleaseId
    $RemoteReleasePath = "$RemoteBaseDir/releases/$ReleaseId"
    Write-Info "Target release path: $RemoteReleasePath"

    $checkReleaseExists = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "test -e $RemoteReleasePath && echo EXISTS || echo NOT_EXISTS" 2>&1
    if ($checkReleaseExists -contains "EXISTS") {
        throw "Release '$ReleaseId' already exists at $RemoteReleasePath."
    }

    & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "mkdir -p $RemoteReleasePath"
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to create $RemoteReleasePath on VPS."
    }
    Write-Success "Created remote release directory: $RemoteReleasePath"

    # =========================================================================
    # [4/7] UPLOAD
    # =========================================================================
    Write-Step "[4/7]" "Upload - SCP apps/web/dist to VPS (Port $Port)"
    $UploadStartTime = Get-Date
    & $scpCmd.Source -P $Port -i "$KeyPath" -o BatchMode=yes -r "$DistPath\." "${User}@${HostName}:$RemoteReleasePath/"
    if ($LASTEXITCODE -ne 0) {
        throw "SCP upload failed with exit code $LASTEXITCODE."
    }
    $UploadElapsed = ((Get-Date) - $UploadStartTime).TotalSeconds
    Write-Success "Upload completed in $([math]::Round($UploadElapsed, 2))s."

    & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "find $RemoteReleasePath -type d -exec chmod 755 {} + && find $RemoteReleasePath -type f -exec chmod 644 {} +"
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to set chmod 755/644 permissions on $RemoteReleasePath."
    }
    Write-Success "Permissions hardened: directories 755, files 644."

    # =========================================================================
    # [5/7] VALIDATE RELEASE INTEGRITY
    # =========================================================================
    Write-Step "[5/7]" "Validate - Remote Release Integrity Check"
    $remoteValidateScript = @'
if [ ! -f '{0}/index.html' ]; then echo "FAIL:index.html missing"; exit 1; fi
if [ ! -d '{0}/assets' ]; then echo "FAIL:assets dir missing"; exit 1; fi
FILE_COUNT=$(find '{0}' -type f | wc -l)
if [ "$FILE_COUNT" -le 0 ]; then echo "FAIL:empty directory"; exit 1; fi
echo "SUCCESS:$FILE_COUNT"
'@ -f $RemoteReleasePath

    $RemoteValidation = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" $remoteValidateScript 2>&1
    if ($LASTEXITCODE -ne 0 -or ($RemoteValidation -notmatch "SUCCESS:(\d+)")) {
        throw "Remote release validation failed: $($RemoteValidation -join ' ')"
    }
    $RemoteFileCount = [regex]::Match(($RemoteValidation -join "`n"), 'SUCCESS:(\d+)').Groups[1].Value
    Write-Success "Remote release verified ($RemoteFileCount files)."

    foreach ($relPath in $LocalGlbInfo.Keys) {
        $expectedSize = $LocalGlbInfo[$relPath]
        $remoteGlbPath = "$RemoteReleasePath$relPath"
        $glbCheckScript = "if [ -f '$remoteGlbPath' ]; then wc -c < '$remoteGlbPath'; else echo 'NOT_FOUND'; fi"
        $remoteSizeStr = (& $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" $glbCheckScript 2>&1).Trim()
        $remoteSizeBytes = 0
        if ($remoteSizeStr -eq "NOT_FOUND" -or -not [int64]::TryParse($remoteSizeStr, [ref]$remoteSizeBytes) -or $remoteSizeBytes -ne $expectedSize) {
            throw "Remote 3D model '$relPath' size mismatch (got '$remoteSizeStr', expected $expectedSize bytes)."
        }
        Write-Success "Remote 3D model '$relPath' verified ($remoteSizeBytes bytes)."
    }

    # =========================================================================
    # [6/7] ACTIVATE
    # =========================================================================
    Write-Step "[6/7]" "Activate - Atomic Symlink Cutover ($RemoteScriptsDir/deploy.sh)"
    $DeployOutput = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "$RemoteScriptsDir/deploy.sh $ReleaseId" 2>&1
    Write-Host ($DeployOutput -join "`n")
    if ($LASTEXITCODE -ne 0) {
        throw "Remote deploy.sh failed with exit code $LASTEXITCODE."
    }

    $NewCurrent = (& $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current").Trim()
    if ($NewCurrent -ne $RemoteReleasePath) {
        throw "Current symlink '$NewCurrent' does not match expected '$RemoteReleasePath'."
    }
    Write-Success "Activated release: $NewCurrent"

    # =========================================================================
    # [7/7] HEALTH CHECK & AUTOMATIC ROLLBACK
    # =========================================================================
    Write-Step "[7/7]" "Health Check - Post-Deploy Production Verification"
    $HealthCheckPassed = $true
    $FailureReasons = @()
    Start-Sleep -Seconds 2

    $TempHttpBody = Join-Path $env:TEMP "superez_check_body.html"
    $HttpCode = & $curlCmd.Source -s -o "$TempHttpBody" -w "%{http_code}" https://superez.site
    if ($HttpCode -ne "200") {
        $HealthCheckPassed = $false
        $FailureReasons += "https://superez.site returned HTTP $HttpCode (expected 200)."
    } else {
        $LiveHtml = Get-Content -LiteralPath $TempHttpBody -Raw -ErrorAction SilentlyContinue
        if ($LiveHtml -notmatch '<div id="root">') {
            $HealthCheckPassed = $false
            $FailureReasons += "Live HTML missing <div id='root'>."
        } elseif ($PrimaryJsPath -and ($LiveHtml -notmatch [regex]::Escape($PrimaryJsPath))) {
            $HealthCheckPassed = $false
            $FailureReasons += "Live HTML does not reference new bundle ($PrimaryJsPath)."
        } else {
            Write-Success "https://superez.site -> HTTP 200 OK ($PrimaryJsPath)."
        }
    }
    if (Test-Path -LiteralPath $TempHttpBody) { Remove-Item -LiteralPath $TempHttpBody -Force }

    foreach ($assetPath in $ReferencedAssets) {
        $assetCode = & $curlCmd.Source -sI -o NUL -w "%{http_code}" "https://superez.site$assetPath"
        if ($assetCode -ne "200") {
            $HealthCheckPassed = $false
            $FailureReasons += "Asset $assetPath returned HTTP $assetCode."
        } else {
            Write-Success "Asset $assetPath -> HTTP 200 OK."
        }
    }

    $SpaCheckPath = Join-Path $env:TEMP "superez_spa_check.html"
    $SpaCode = & $curlCmd.Source -s -o "$SpaCheckPath" -w "%{http_code}" https://superez.site/destinations/ha-noi
    if ($SpaCode -ne "200") {
        $HealthCheckPassed = $false
        $FailureReasons += "SPA fallback /destinations/ha-noi returned HTTP $SpaCode."
    } else {
        $SpaHtml = Get-Content -LiteralPath $SpaCheckPath -Raw -ErrorAction SilentlyContinue
        if ($SpaHtml -match '<div id="root">') {
            Write-Success "SPA fallback /destinations/ha-noi -> HTTP 200 OK."
        } else {
            $HealthCheckPassed = $false
            $FailureReasons += "SPA fallback /destinations/ha-noi did not return React root HTML."
        }
    }
    if (Test-Path -LiteralPath $SpaCheckPath) { Remove-Item -LiteralPath $SpaCheckPath -Force }

    $VivuCheckPath = Join-Path $env:TEMP "vivu_health.json"
    $VivuCode = & $curlCmd.Source -s -o "$VivuCheckPath" -w "%{http_code}" https://api.vivu.site/health
    if ($VivuCode -eq "200") {
        Write-Success "ViVu Backend isolation check passed (https://api.vivu.site/health -> HTTP 200)."
    } else {
        $HealthCheckPassed = $false
        $FailureReasons += "ViVu Backend health check returned HTTP $VivuCode."
    }
    if (Test-Path -LiteralPath $VivuCheckPath) { Remove-Item -LiteralPath $VivuCheckPath -Force }

    if (-not $HealthCheckPassed) {
        Write-ErrorMsg "Post-deploy Health Check FAILED:"
        foreach ($reason in $FailureReasons) { Write-Host "    - $reason" -ForegroundColor Red }

        $activeCurrentCheck = (& $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current").Trim()
        if ($activeCurrentCheck -ne $RemoteReleasePath) {
            throw "Deployment health check failed, but production symlink remained at '$activeCurrentCheck'. Skipping rollback."
        }
        if (-not $NoRollbackOnFailure) {
            Write-WarningMsg "Triggering automatic rollback via $RemoteScriptsDir/rollback.sh..."
            $RollbackOutput = & $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "$RemoteScriptsDir/rollback.sh" 2>&1
            $RollbackExitCode = $LASTEXITCODE
            Write-Host ($RollbackOutput -join "`n")
            $PostRollbackCurrent = (& $sshCmd.Source -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current").Trim()
            if ($RollbackExitCode -ne 0 -or $PostRollbackCurrent -eq $RemoteReleasePath) {
                throw "CRITICAL: Deployment failed AND automatic rollback failed (current: $PostRollbackCurrent)!"
            }
            throw "Deployment failed health checks; automatically rolled back to '$PostRollbackCurrent'."
        }
        throw "Deployment failed health checks (-NoRollbackOnFailure set)."
    }

    $TotalDuration = ((Get-Date) - $GlobalStartTime).TotalSeconds
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Green
    Write-Host "  SUPER EZ TOUR FRONTEND DEPLOYMENT SUCCEEDED!" -ForegroundColor Green
    Write-Host "  - Release ID     : $ReleaseId" -ForegroundColor White
    Write-Host "  - Active Release : $NewCurrent" -ForegroundColor White
    Write-Host "  - Duration       : $([math]::Round($TotalDuration, 2))s" -ForegroundColor White
    Write-Host "================================================================================" -ForegroundColor Green

} catch {
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Red
    Write-Host "  DEPLOYMENT PIPELINE ERROR" -ForegroundColor Red
    Write-Host "================================================================================" -ForegroundColor Red
    Write-ErrorMsg $_.Exception.Message
    exit 1
}
