<#
.SYNOPSIS
    Script thực hiện Rollback phiên bản frontend Super EZ Tour về release trước đó.

.DESCRIPTION
    Script thực hiện các bước:
    1. Kiểm tra kết nối SSH tới VPS qua SSH Private Key.
    2. Truy vấn release hiện tại (current) và release trước đó (previous) trên VPS.
    3. Xác nhận từ người vận hành trước khi thực hiện rollback (hoặc bỏ qua nếu có -Force).
    4. Gọi script chuẩn trên VPS: /opt/superez/scripts/rollback.sh.
    5. Xác minh symlink current sau khi đảo ngược.
    6. Kiểm tra HTTPS https://superez.site và kiểm tra cách ly https://api.vivu.site/health.
    7. Báo cáo kết quả chi tiết.

.PARAMETER Force
    Thực hiện rollback ngay lập tức mà không yêu cầu người dùng xác nhận qua bàn phím.

.PARAMETER HostName
    Địa chỉ IP hoặc hostname VPS (mặc định: 103.75.187.40).

.PARAMETER Port
    Cổng SSH của VPS (mặc định: 24700).

.PARAMETER User
    Tài khoản SSH (mặc định: root).

.PARAMETER KeyPath
    Đường dẫn tới SSH private key (mặc định: $env:USERPROFILE\.ssh\superez_deploy).

.EXAMPLE
    .\rollback.ps1
    .\rollback.ps1 -Force
#>

[CmdletBinding()]
param(
    [switch]$Force,

    [string]$HostName = "103.75.187.40",

    [int]$Port = 24700,

    [string]$User = "root",

    [string]$KeyPath = "$env:USERPROFILE\.ssh\superez_deploy",

    [string]$RemoteBaseDir = "/var/www/superez",

    [string]$RemoteScriptsDir = "/opt/superez/scripts"
)

# Thiết lập UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

function Get-Timestamp {
    return (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
}

function Write-RollbackHeader {
    param([string]$Title)
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Magenta
    Write-Host "[$((Get-Timestamp))] $Title" -ForegroundColor Magenta
    Write-Host "================================================================================" -ForegroundColor Magenta
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

$StartTime = Get-Date

try {
    Write-RollbackHeader "QUY TRÌNH ROLLBACK FRONTEND SUPER EZ TOUR"

    # 1. Kiểm tra môi trường cục bộ
    Write-Info "1. Kiểm tra SSH client và private key..."
    if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
        throw "Lệnh 'ssh' không tồn tại trong PATH hệ thống."
    }
    if (-not (Test-Path $KeyPath)) {
        throw "Không tìm thấy SSH Key tại: $KeyPath"
    }
    Write-Success "SSH Key hợp lệ: $KeyPath"

    # 2. Kiểm tra kết nối SSH tới VPS
    Write-Info "2. Kết nối tới VPS ($User@$HostName`:$Port)..."
    $sshCheck = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes -o ConnectTimeout=10 "${User}@${HostName}" "echo CONNECTED" 2>&1
    if ($LASTEXITCODE -ne 0 -or ($sshCheck -notcontains "CONNECTED")) {
        throw "Không thể kết nối SSH tới VPS! Chi tiết: $($sshCheck -join ' ')"
    }
    Write-Success "Kết nối VPS thành công."

    # 3. Truy vấn trạng thái Current và Previous trên VPS
    Write-Info "3. Kiểm tra symlink current và previous trên VPS..."
    $remoteCheckCmd = @'
CURR=$(readlink -f '{0}/current' 2>/dev/null || echo 'NONE')
PREV=$(readlink -f '{0}/previous' 2>/dev/null || echo 'NONE')
echo "CURRENT:$CURR"
echo "PREVIOUS:$PREV"
if [ -L '{0}/previous' ]; then
    echo "PREVIOUS_EXISTS:YES"
else
    echo "PREVIOUS_EXISTS:NO"
fi
'@ -f $RemoteBaseDir

    $statusCheck = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" $remoteCheckCmd 2>&1

    $currentRelease = "NONE"
    $previousRelease = "NONE"
    $previousExists = $false

    foreach ($line in $statusCheck) {
        if ($line -match "^CURRENT:(.+)$") { $currentRelease = $matches[1].Trim() }
        if ($line -match "^PREVIOUS:(.+)$") { $previousRelease = $matches[1].Trim() }
        if ($line -match "^PREVIOUS_EXISTS:YES$") { $previousExists = $true }
    }

    if (-not $previousExists) {
        $previousRelease = "CHƯA CÓ (Chưa có bản deploy trước đó để rollback)"
    }

    Write-Host ""
    Write-Host "--------------------------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host "  TRẠNG THÁI RELEASE TRÊN PRODUCTION:" -ForegroundColor Cyan
    Write-Host "  - Phiên bản đang chạy (Current) : $currentRelease" -ForegroundColor White
    Write-Host "  - Phiên bản dự phòng (Previous): $previousRelease" -ForegroundColor White
    Write-Host "--------------------------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host ""

    if (-not $previousExists -or $previousRelease -eq "NONE" -or $previousRelease -eq "") {
        throw "KHÔNG THỂ ROLLBACK: VPS hiện không có release dự phòng ($RemoteBaseDir/previous không tồn tại)! Hãy kiểm tra lại thư mục $RemoteBaseDir/releases."
    }

    if ($currentRelease -eq $previousRelease) {
        Write-WarningMsg "Release hiện tại và release trước đó trùng nhau ($currentRelease). Không cần rollback."
        return
    }

    # 4. Xác nhận từ người dùng
    if (-not $Force) {
        Write-Host "CẢNH BÁO: Thao tác này sẽ chuyển production từ '$currentRelease' về '$previousRelease'!" -ForegroundColor Yellow
        $confirmation = Read-Host "Bạn có chắc chắn muốn thực hiện rollback không? Nhập 'yes' để xác nhận"
        if ($confirmation -notin @("yes", "YES", "y", "Y")) {
            Write-Info "Người dùng đã hủy bỏ thao tác rollback. Không có thay đổi nào được thực hiện."
            return
        }
    } else {
        Write-WarningMsg "Tùy chọn -Force được bật. Bỏ qua bước xác nhận người dùng."
    }

    # 5. Gọi script rollback trên VPS
    Write-Info "5. Thực thi $RemoteScriptsDir/rollback.sh trên VPS..."
    $rollbackOutput = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "$RemoteScriptsDir/rollback.sh" 2>&1
    $rollbackExitCode = $LASTEXITCODE
    Write-Host ($rollbackOutput -join "`n")

    if ($rollbackExitCode -ne 0) {
        throw "Script rollback.sh trên VPS trả về lỗi (exit code $rollbackExitCode)!"
    }

    # 6. Xác minh symlink current sau rollback
    Write-Info "6. Xác minh symlink current sau khi đảo chiều..."
    $newCurrent = (& ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current").Trim()
    if ($newCurrent -ne $previousRelease) {
        throw "Symlink current sau rollback không khớp với mục tiêu dự kiến! Hiện tại: '$newCurrent', Kỳ vọng: '$previousRelease'."
    }
    Write-Success "Symlink current đã chuyển về thành công: $newCurrent"

    # 7. Kiểm tra HTTPS sau rollback
    Write-Info "7. Kiểm tra tình trạng website sau rollback..."
    Start-Sleep -Seconds 2

    # A. Kiểm tra superez.site
    $superezCode = & curl.exe -s -o /dev/null -w "%{http_code}" https://superez.site
    if ($superezCode -eq "200") {
        Write-Success "https://superez.site hoạt động bình thường (HTTP 200 OK)."
    } else {
        Write-WarningMsg "https://superez.site trả về HTTP $superezCode sau rollback!"
    }

    # B. Kiểm tra ViVu Backend
    $vivuCode = & curl.exe -s -o /dev/null -w "%{http_code}" https://api.vivu.site/health
    if ($vivuCode -eq "200") {
        Write-Success "ViVu Backend ổn định và không bị gián đoạn (HTTP 200 OK)."
    } else {
        Write-WarningMsg "ViVu Backend trả về HTTP $vivuCode!"
    }

    # Tổng kết
    $elapsed = ((Get-Date) - $StartTime).TotalSeconds
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Green
    Write-Host "  ROLLBACK THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "================================================================================" -ForegroundColor Green
    Write-Host "  - Phiên bản phục hồi : $newCurrent" -ForegroundColor White
    Write-Host "  - Phiên bản cũ lưu tại: $( (& ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/previous").Trim() )" -ForegroundColor White
    Write-Host "  - Thời gian xử lý    : $([math]::Round($elapsed, 2)) giây" -ForegroundColor White
    Write-Host "================================================================================" -ForegroundColor Green

} catch {
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Red
    Write-Host "  ROLLBACK THẤT BẠI!" -ForegroundColor Red
    Write-Host "================================================================================" -ForegroundColor Red
    Write-ErrorMsg $_.Exception.Message
    Write-Host ""
    Write-Host "Hướng dẫn khôi phục thủ công qua SSH:" -ForegroundColor Yellow
    Write-Host "  ssh -i `"$KeyPath`" -p $Port $User@$HostName" -ForegroundColor White
    Write-Host "  ln -sfn /var/www/superez/releases/<safe-release> /var/www/superez/.manual.tmp" -ForegroundColor White
    Write-Host "  mv -Tf /var/www/superez/.manual.tmp /var/www/superez/current" -ForegroundColor White
    Write-Host ""
    exit 1
}
