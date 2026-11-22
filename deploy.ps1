<#
.SYNOPSIS
    Hệ thống triển khai tự động (Automated Deployment) cho Super EZ Tour Frontend.

.DESCRIPTION
    Script thực hiện quy trình 7 bước:
    [1/7] Preflight    : Kiểm tra công cụ (node, npm, ssh, scp), SSH Key, kết nối VPS và script trên VPS.
    [2/7] Build        : Chạy build React/Vite (npm run build), kiểm tra output dist/index.html & dist/assets.
                         Trích xuất tất cả JS/CSS được tham chiếu và kiểm tra model 3D .glb.
    [3/7] Create Release: Tạo release ID theo timestamp và thư mục release độc lập trên VPS.
    [4/7] Upload       : Upload dist/ lên VPS qua SCP (port 24700), phân quyền thư mục 755 và file 644.
    [5/7] Validate     : Xác minh tính toàn vẹn của release trên VPS (tất cả files, kích thước .glb) trước khi chuyển đổi symlink.
    [6/7] Activate     : Gọi /opt/superez/scripts/deploy.sh để tráo đổi symlink atomic sang current.
    [7/7] Health Check : Kiểm tra HTTPS, HTML hash, tất cả asset JS/CSS, React Router SPA fallback, 3D model và ViVu isolation.
                         Tự động rollback nếu health check thất bại (chỉ rollback khi production đã chuyển sang release mới).

.PARAMETER DryRun
    Chạy ở chế độ kiểm thử: kiểm tra preflight và môi trường, không tạo hoặc kích hoạt release trên production.
    Alias: -PreflightOnly

.PARAMETER PreflightOnly
    Chỉ chạy bước [1/7] Preflight rồi dừng.

.PARAMETER ReleaseId
    Tùy chọn chỉ định Release ID cụ thể (mặc định: yyyyMMdd-HHmmss).

.PARAMETER SkipBuild
    Bỏ qua bước npm run build nếu dist/ đã tồn tại và muốn dùng bản build hiện có.

.PARAMETER NoRollbackOnFailure
    Không tự động rollback khi health check thất bại (dùng để gỡ lỗi).

.PARAMETER HostName
    Địa chỉ IP hoặc hostname VPS (mặc định: 103.75.187.40).

.PARAMETER Port
    Cổng SSH của VPS (mặc định: 24700).

.PARAMETER User
    Tài khoản SSH (mặc định: root).

.PARAMETER KeyPath
    Đường dẫn tới SSH private key (mặc định: $env:USERPROFILE\.ssh\superez_deploy).

.EXAMPLE
    .\deploy.ps1 -DryRun
    .\deploy.ps1
    .\deploy.ps1 -ReleaseId 20261119-210000
#>

[CmdletBinding()]
param(
    [Alias("PreflightOnly")]
    [switch]$DryRun,

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

# Thiết lập Output Encoding UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# Định nghĩa các hàm helper hiển thị log
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
    Write-Step "[1/7]" "Preflight Checks - Kiểm tra môi trường cục bộ và kết nối VPS"

    $ProjectRoot = $PSScriptRoot
    if (-not $ProjectRoot) { $ProjectRoot = (Get-Location).Path }
    $PackageJsonPath = Join-Path $ProjectRoot "package.json"

    Write-Info "Thư mục dự án: $ProjectRoot"
    if (-not (Test-Path $PackageJsonPath)) {
        throw "Không tìm thấy file package.json tại $ProjectRoot. Hãy đảm bảo bạn đang chạy script trong thư mục SuperEZTour!"
    }

    $PackageJson = Get-Content $PackageJsonPath -Raw | ConvertFrom-Json
    if ($PackageJson.name -ne "super-ez-tour") {
        throw "Tên dự án trong package.json ('$($PackageJson.name)') không khớp với 'super-ez-tour'!"
    }
    Write-Success "Đúng dự án: $($PackageJson.name) (v$($PackageJson.version))"

    # Kiểm tra các công cụ Node, npm, ssh, scp, curl
    $nodeCmd = Get-Command node -ErrorAction SilentlyContinue
    if (-not $nodeCmd) { throw "Lệnh 'node' không tồn tại trong PATH." }
    $nodeVer = (& node -v).Trim()
    Write-Success "Node.js: $nodeVer ($($nodeCmd.Source))"

    $npmCmd = Get-Command npm -ErrorAction SilentlyContinue
    if (-not $npmCmd) { throw "Lệnh 'npm' không tồn tại trong PATH." }
    $npmVer = (& npm -v).Trim()
    Write-Success "npm: v$npmVer ($($npmCmd.Source))"

    $sshCmd = Get-Command ssh -ErrorAction SilentlyContinue
    if (-not $sshCmd) { throw "Lệnh 'ssh' không tồn tại trong PATH." }
    Write-Success "SSH Client: $($sshCmd.Source)"

    $scpCmd = Get-Command scp -ErrorAction SilentlyContinue
    if (-not $scpCmd) { throw "Lệnh 'scp' không tồn tại trong PATH." }
    Write-Success "SCP Client: $($scpCmd.Source)"

    $curlCmd = Get-Command curl.exe -ErrorAction SilentlyContinue
    if (-not $curlCmd) { throw "Lệnh 'curl.exe' không tồn tại trong PATH." }
    Write-Success "curl: $($curlCmd.Source)"

    # Kiểm tra SSH Private Key
    Write-Info "Kiểm tra SSH Key: $KeyPath"
    if (-not (Test-Path $KeyPath)) {
        throw "SSH Private Key không tồn tại tại: $KeyPath. Hãy kiểm tra lại cấu hình key!"
    }
    Write-Success "SSH Private Key tồn tại."

    # Kiểm tra kết nối SSH không tương tác (BatchMode=yes)
    Write-Info "Thử kết nối SSH tới $User@$HostName`:$Port (BatchMode=yes)..."
    $sshCheckOutput = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new "${User}@${HostName}" "echo DEPLOY_READY" 2>&1
    if ($LASTEXITCODE -ne 0 -or ($sshCheckOutput -notcontains "DEPLOY_READY")) {
        throw "Không thể kết nối SSH tới VPS qua key! Chi tiết: $($sshCheckOutput -join ' ')"
    }
    Write-Success "Kết nối SSH thành công (Phản hồi: DEPLOY_READY)."

    # Kiểm tra script deploy và rollback trên VPS
    Write-Info "Kiểm tra sự tồn tại của script tại $RemoteScriptsDir trên VPS..."
    $scriptsCheck = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "test -x $RemoteScriptsDir/deploy.sh && test -x $RemoteScriptsDir/rollback.sh && echo SCRIPTS_READY" 2>&1
    if ($LASTEXITCODE -ne 0 -or ($scriptsCheck -notcontains "SCRIPTS_READY")) {
        throw "Các script deploy/rollback trên VPS ($RemoteScriptsDir) bị thiếu hoặc không có quyền thực thi (+x)!"
    }
    Write-Success "Scripts trên VPS hợp lệ: deploy.sh & rollback.sh đã sẵn sàng."

    # Lấy thông tin release hiện tại trên VPS
    $currentActive = (& ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current 2>/dev/null || echo 'NONE'").Trim()
    Write-Info "Release đang hoạt động trên production: $currentActive"

    if ($DryRun) {
        Write-Host ""
        Write-Host "--------------------------------------------------------------------------------" -ForegroundColor Yellow
        Write-Host "[DRY-RUN / PREFLIGHT-ONLY] Toàn bộ kiểm tra môi trường và kết nối hoàn tất thành công!" -ForegroundColor Yellow
        Write-Host "[DRY-RUN] Script dừng tại đây theo yêu cầu. Không có bất kỳ thay đổi nào trên production." -ForegroundColor Yellow
        Write-Host "--------------------------------------------------------------------------------" -ForegroundColor Yellow
        return
    }

    # =========================================================================
    # [2/7] BUILD FRONTEND
    # =========================================================================
    Write-Step "[2/7]" "Build Frontend React/Vite"

    $DistPath = Join-Path $ProjectRoot "dist"

    if ($SkipBuild -and (Test-Path (Join-Path $DistPath "index.html"))) {
        Write-WarningMsg "Tùy chọn -SkipBuild được bật. Bỏ qua 'npm run build', sử dụng dist/ hiện có."
    } else {
        Write-Info "Dọn dẹp thư mục dist/ cũ trước khi build..."
        if (Test-Path $DistPath) {
            Remove-Item -Path $DistPath -Recurse -Force -ErrorAction SilentlyContinue
        }

        Write-Info "Chạy lệnh: npm run build..."
        $BuildStartTime = Get-Date

        # Chạy build
        & npm run build
        if ($LASTEXITCODE -ne 0) {
            throw "Quá trình 'npm run build' thất bại với exit code $LASTEXITCODE! Hủy bỏ triển khai."
        }

        $BuildElapsed = ((Get-Date) - $BuildStartTime).TotalSeconds
        Write-Success "Build thành công trong $([math]::Round($BuildElapsed, 2))s."
    }

    # Xác thực artifacts sau build
    $IndexHtmlPath = Join-Path $DistPath "index.html"
    $AssetsPath = Join-Path $DistPath "assets"

    if (-not (Test-Path $IndexHtmlPath)) {
        throw "Không tìm thấy file $IndexHtmlPath sau khi build!"
    }
    $IndexSize = (Get-Item $IndexHtmlPath).Length
    if ($IndexSize -le 0) {
        throw "File index.html bị rỗng sau khi build!"
    }

    if (-not (Test-Path $AssetsPath)) {
        throw "Không tìm thấy thư mục assets tại $AssetsPath!"
    }
    $AssetFiles = Get-ChildItem -Path $AssetsPath -Recurse -File
    if ($AssetFiles.Count -eq 0) {
        throw "Thư mục assets không chứa tệp nào!"
    }

    # Đọc TẤT CẢ các bundle JS và CSS được tham chiếu trong index.html
    $IndexHtmlContent = Get-Content $IndexHtmlPath -Raw
    $ReferencedAssets = @()
    $AssetMatches = [regex]::Matches($IndexHtmlContent, '(?:src|href)="(/assets/[^"]+\.(?:js|css))"')
    foreach ($m in $AssetMatches) {
        $foundAsset = $m.Groups[1].Value
        if ($ReferencedAssets -notcontains $foundAsset) {
            $ReferencedAssets += $foundAsset
        }
    }

    if ($ReferencedAssets.Count -eq 0) {
        throw "Không tìm thấy bất kỳ thẻ <script> hoặc <link> asset nào trong dist/index.html!"
    }

    # Trích xuất riêng JS bundle chính phục vụ kiểm tra HTML render
    $JsBundleMatch = [regex]::Match($IndexHtmlContent, 'src="(/assets/index-[^"]+\.js)"')
    $PrimaryJsPath = if ($JsBundleMatch.Success) { $JsBundleMatch.Groups[1].Value } else { $ReferencedAssets[0] }

    Write-Success "Xác thực build artifacts hoàn tất: $($AssetFiles.Count) assets, index.html ($IndexSize bytes)."
    Write-Info "Phát hiện $($ReferencedAssets.Count) assets tham chiếu trong index.html:"
    foreach ($asset in $ReferencedAssets) {
        Write-Info "  - $asset"
    }

    # Kiểm tra model 3D .glb cục bộ nếu có
    $LocalGlbFiles = Get-ChildItem -Path $AssetsPath -Filter "*.glb" -Recurse
    $LocalGlbInfo = @{}
    if ($LocalGlbFiles.Count -gt 0) {
        foreach ($glb in $LocalGlbFiles) {
            $relPath = $glb.FullName.Substring($DistPath.Length).Replace("\", "/")
            $LocalGlbInfo[$relPath] = $glb.Length
            Write-Success "Model 3D cục bộ: $relPath ($($glb.Length) bytes)"
        }
    }

    # =========================================================================
    # [3/7] CREATE RELEASE
    # =========================================================================
    Write-Step "[3/7]" "Create Release - Quản lý định danh phiên bản"

    if (-not $ReleaseId) {
        $ReleaseId = (Get-Date).ToString("yyyyMMdd-HHmmss")
    }

    if ($ReleaseId -notmatch '^[a-zA-Z0-9_-]+$') {
        throw "Tên Release ID '$ReleaseId' không hợp lệ! Chỉ chấp nhận ký tự a-z, A-Z, 0-9, dấu gạch dưới và gạch ngang."
    }

    Write-Info "Release ID được chỉ định: $ReleaseId"
    $RemoteReleasePath = "$RemoteBaseDir/releases/$ReleaseId"

    # Kiểm tra xem release đã tồn tại trên server chưa
    $checkReleaseExists = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "test -e $RemoteReleasePath && echo EXISTS || echo NOT_EXISTS" 2>&1
    if ($checkReleaseExists -contains "EXISTS") {
        throw "Release '$ReleaseId' đã tồn tại trên VPS tại $RemoteReleasePath! Hãy dùng Release ID mới để tránh ghi đè."
    }

    Write-Info "Tạo thư mục release mới trên VPS: $RemoteReleasePath..."
    & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "mkdir -p $RemoteReleasePath"
    if ($LASTEXITCODE -ne 0) {
        throw "Không thể tạo thư mục $RemoteReleasePath trên VPS!"
    }
    Write-Success "Đã tạo thư mục release: $RemoteReleasePath"

    # =========================================================================
    # [4/7] UPLOAD
    # =========================================================================
    Write-Step "[4/7]" "Upload - Tải bản build lên VPS qua SCP (Port $Port)"

    Write-Info "Bắt đầu sao chép nội dung $DistPath lên VPS..."
    $UploadStartTime = Get-Date

    # Sử dụng scp với cấu trúc dist/. để copy toàn bộ nội dung dist vào trong thư mục release
    & scp.exe -P $Port -i "$KeyPath" -o BatchMode=yes -r "$DistPath\." "${User}@${HostName}:$RemoteReleasePath/"
    if ($LASTEXITCODE -ne 0) {
        throw "Upload qua SCP thất bại với mã lỗi $LASTEXITCODE!"
    }
    $UploadElapsed = ((Get-Date) - $UploadStartTime).TotalSeconds
    Write-Success "Upload hoàn tất trong $([math]::Round($UploadElapsed, 2))s."

    # Thiết lập quyền 755 cho thư mục và 644 cho file
    Write-Info "Thiết lập quyền thư mục 755 và quyền file 644 (tuân thủ nguyên tắc bảo mật, không dùng 777)..."
    & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "find $RemoteReleasePath -type d -exec chmod 755 {} + && find $RemoteReleasePath -type f -exec chmod 644 {} +"
    if ($LASTEXITCODE -ne 0) {
        throw "Thiết lập phân quyền chmod 755/644 cho release trên VPS thất bại!"
    }
    Write-Success "Phân quyền thành công: Directory 755, File 644."

    # =========================================================================
    # [5/7] VALIDATE RELEASE INTEGRITY
    # =========================================================================
    Write-Step "[5/7]" "Validate - Xác minh tính toàn vẹn của release trên VPS"

    Write-Info "Kiểm tra các tệp bắt buộc trong $RemoteReleasePath..."
    $remoteValidateScript = @'
if [ ! -f '{0}/index.html' ]; then
    echo "FAIL:index.html missing"
    exit 1
fi
if [ ! -d '{0}/assets' ]; then
    echo "FAIL:assets dir missing"
    exit 1
fi
FILE_COUNT=$(find '{0}' -type f | wc -l)
if [ "$FILE_COUNT" -le 0 ]; then
    echo "FAIL:empty directory"
    exit 1
fi
echo "SUCCESS:$FILE_COUNT"
'@ -f $RemoteReleasePath

    $RemoteValidation = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" $remoteValidateScript 2>&1

    if ($LASTEXITCODE -ne 0 -or ($RemoteValidation -notmatch "SUCCESS:(\d+)")) {
        throw "Release trên VPS không hợp lệ hoặc thiếu file! Chi tiết: $($RemoteValidation -join ' ')"
    }

    $RemoteFileCount = [regex]::Match($RemoteValidation, 'SUCCESS:(\d+)').Groups[1].Value
    Write-Success "Release hợp lệ trên VPS: $RemoteFileCount tệp tin sẵn sàng."

    # Xác minh sự tồn tại và KÍCH THƯỚC của tất cả các model .glb trên VPS
    if ($LocalGlbInfo.Count -gt 0) {
        foreach ($relPath in $LocalGlbInfo.Keys) {
            $expectedSize = $LocalGlbInfo[$relPath]
            $remoteGlbPath = "$RemoteReleasePath$relPath"
            $glbCheckScript = "if [ -f '$remoteGlbPath' ]; then wc -c < '$remoteGlbPath'; else echo 'NOT_FOUND'; fi"
            $remoteSizeStr = (& ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" $glbCheckScript 2>&1).Trim()

            if ($remoteSizeStr -eq "NOT_FOUND") {
                throw "Model 3D '$relPath' bị thiếu trên VPS sau khi upload!"
            }

            $remoteSizeBytes = 0
            if (-not [int64]::TryParse($remoteSizeStr, [ref]$remoteSizeBytes)) {
                throw "Không thể xác định kích thước model 3D '$relPath' trên VPS (kết quả: $remoteSizeStr)!"
            }

            if ($remoteSizeBytes -ne $expectedSize) {
                throw "Kích thước model 3D '$relPath' trên VPS ($remoteSizeBytes bytes) không khớp với bản build cục bộ ($expectedSize bytes)! File có thể bị hỏng trong quá trình upload."
            }

            Write-Success "Model 3D '$relPath' trên VPS hợp lệ: $remoteSizeBytes bytes (khớp 100% bản build cục bộ)."
        }
    }

    # =========================================================================
    # [6/7] ACTIVATE
    # =========================================================================
    Write-Step "[6/7]" "Activate - Kích hoạt release mới thông qua $RemoteScriptsDir/deploy.sh"

    Write-Info "Thực thi script: $RemoteScriptsDir/deploy.sh $ReleaseId..."
    $DeployOutput = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "$RemoteScriptsDir/deploy.sh $ReleaseId" 2>&1
    Write-Host ($DeployOutput -join "`n")

    if ($LASTEXITCODE -ne 0) {
        throw "Lệnh deploy.sh trên VPS trả về lỗi (exit code $LASTEXITCODE)!"
    }

    # Xác minh symlink current đã trỏ đúng tới release mới
    $NewCurrent = (& ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current").Trim()
    $ExpectedTarget = $RemoteReleasePath
    if ($NewCurrent -ne $ExpectedTarget) {
        throw "Symlink current không trỏ tới release mới! Hiện tại: '$NewCurrent', Mong đợi: '$ExpectedTarget'."
    }
    Write-Success "Kích hoạt thành công! Current symlink: $NewCurrent"

    # =========================================================================
    # [7/7] HEALTH CHECK & AUTOMATIC ROLLBACK
    # =========================================================================
    Write-Step "[7/7]" "Health Check - Kiểm tra toàn diện Production sau triển khai"

    $HealthCheckPassed = $true
    $FailureReasons = @()

    # Chờ 2 giây để Nginx cache / symlink ổn định
    Start-Sleep -Seconds 2

    # A. Kiểm tra Domain chính https://superez.site (HTTP 200 + Nội dung HTML)
    Write-Info "1. Kiểm tra HTTPS Domain chính (https://superez.site)..."
    $TempHttpBody = Join-Path $env:TEMP "superez_check_body.html"
    $HttpCode = & curl.exe -s -o "$TempHttpBody" -w "%{http_code}" https://superez.site
    if ($HttpCode -ne "200") {
        $HealthCheckPassed = $false
        $FailureReasons += "Trang chủ https://superez.site trả về HTTP $HttpCode (kỳ vọng: 200)."
        Write-ErrorMsg "HTTP Status: $HttpCode (FAIL)"
    } else {
        Write-Success "Trang chủ https://superez.site trả về HTTP 200 OK."

        # Kiểm tra nội dung HTML có khớp với bundle mới không
        $LiveHtml = Get-Content $TempHttpBody -Raw -ErrorAction SilentlyContinue
        if ($LiveHtml -notmatch '<div id="root">') {
            $HealthCheckPassed = $false
            $FailureReasons += "Trang chủ thiếu thẻ <div id='root'> của SPA."
            Write-ErrorMsg "HTML thiếu thẻ div#root!"
        }

        if ($PrimaryJsPath -and ($LiveHtml -notmatch [regex]::Escape($PrimaryJsPath))) {
            $HealthCheckPassed = $false
            $FailureReasons += "Nội dung index.html trên server chưa phục vụ JS Bundle mới ($PrimaryJsPath)."
            Write-ErrorMsg "index.html trên server không khớp JS Bundle vừa build ($PrimaryJsPath)!"
        } else {
            Write-Success "HTML phản hồi chính xác bundle của release mới ($PrimaryJsPath)."
        }
    }
    if (Test-Path $TempHttpBody) { Remove-Item $TempHttpBody -Force }

    # B. Kiểm tra TẤT CẢ các JS và CSS asset được tham chiếu trong index.html
    Write-Info "2. Kiểm tra TẤT CẢ asset ($($ReferencedAssets.Count)) được tham chiếu trong index.html..."
    foreach ($assetPath in $ReferencedAssets) {
        $assetUrl = "https://superez.site$assetPath"
        $assetCode = & curl.exe -sI -o /dev/null -w "%{http_code}" "$assetUrl"
        if ($assetCode -ne "200") {
            $HealthCheckPassed = $false
            $FailureReasons += "Asset $assetPath trả về HTTP $assetCode (kỳ vọng: 200)."
            Write-ErrorMsg "Asset $assetPath -> HTTP $assetCode (FAIL)"
        } else {
            Write-Success "Asset $assetPath -> HTTP 200 OK."
        }
    }

    # C. Kiểm tra React Router SPA Fallback (/destinations/hanoi)
    Write-Info "3. Kiểm tra React Router SPA Fallback (https://superez.site/destinations/hanoi)..."
    $SpaCheckPath = Join-Path $env:TEMP "superez_spa_check.html"
    $SpaCode = & curl.exe -s -o "$SpaCheckPath" -w "%{http_code}" https://superez.site/destinations/hanoi
    if ($SpaCode -ne "200") {
        $HealthCheckPassed = $false
        $FailureReasons += "SPA fallback /destinations/hanoi trả về HTTP $SpaCode."
        Write-ErrorMsg "SPA Fallback trả về HTTP $SpaCode (FAIL)"
    } else {
        $SpaHtml = Get-Content $SpaCheckPath -Raw -ErrorAction SilentlyContinue
        if ($SpaHtml -match '<div id="root">') {
            Write-Success "React Router SPA Fallback hoạt động hoàn hảo: HTTP 200 & render SPA HTML."
        } else {
            $HealthCheckPassed = $false
            $FailureReasons += "SPA fallback trả về nội dung không phải HTML của React."
            Write-ErrorMsg "SPA Fallback không trả về HTML hợp lệ!"
        }
    }
    if (Test-Path $SpaCheckPath) { Remove-Item $SpaCheckPath -Force }

    # D. Kiểm tra 3D Model Asset nếu có (.glb)
    if ($LocalGlbInfo.Count -gt 0) {
        Write-Info "4. Kiểm tra tài nguyên 3D Model qua HTTPS..."
        foreach ($relPath in $LocalGlbInfo.Keys) {
            $glbUrl = "https://superez.site$relPath"
            $glbHeaderOutput = & curl.exe -sI "$glbUrl"
            $glbStatus = [regex]::Match(($glbHeaderOutput -join "`n"), "HTTP/[12\.]+\s+(\d+)").Groups[1].Value
            $glbLengthHeader = [regex]::Match(($glbHeaderOutput -join "`n"), "Content-Length:\s*(\d+)").Groups[1].Value

            if ($glbStatus -eq "200") {
                Write-Success "3D Model '$relPath' tải thành công: HTTP 200 OK (Content-Length: $glbLengthHeader bytes)."
            } else {
                $HealthCheckPassed = $false
                $FailureReasons += "3D Model '$relPath' trả về HTTP $glbStatus."
                Write-ErrorMsg "3D Model '$relPath' trả về HTTP $glbStatus (FAIL)"
            }
        }
    }

    # E. Kiểm tra cách ly ViVu Backend (api.vivu.site/health)
    Write-Info "5. Kiểm tra cách ly ViVu Backend (https://api.vivu.site/health)..."
    $VivuCheckPath = Join-Path $env:TEMP "vivu_health.json"
    $VivuCode = & curl.exe -s -o "$VivuCheckPath" -w "%{http_code}" https://api.vivu.site/health
    if ($VivuCode -eq "200") {
        $VivuContent = Get-Content $VivuCheckPath -Raw -ErrorAction SilentlyContinue
        if ($VivuContent -match '"status":\s*"ok"') {
            Write-Success "ViVu Backend hoàn toàn ổn định và không bị ảnh hưởng (status: ok, HTTP 200)."
        } else {
            Write-WarningMsg "ViVu Backend trả về 200 nhưng nội dung: $VivuContent"
        }
    } else {
        $HealthCheckPassed = $false
        $FailureReasons += "CẢNH BÁO: ViVu Backend trả về HTTP $VivuCode!"
        Write-ErrorMsg "ViVu Backend bị gián đoạn (HTTP $VivuCode)!"
    }
    if (Test-Path $VivuCheckPath) { Remove-Item $VivuCheckPath -Force }

    # Xử lý kết quả Health Check
    if (-not $HealthCheckPassed) {
        Write-ErrorMsg "Health Check THẤT BẠI! Các lý do:"
        foreach ($reason in $FailureReasons) {
            Write-Host "    - $reason" -ForegroundColor Red
        }

        # AN TOÀN: Kiểm tra symlink current có THỰC SỰ đang trỏ tới release mới không trước khi gọi rollback.sh
        $activeCurrentCheck = (& ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current").Trim()

        if ($activeCurrentCheck -ne $RemoteReleasePath) {
            Write-WarningMsg "Production KHÔNG trỏ tới release mới '$RemoteReleasePath' (hiện tại: '$activeCurrentCheck')."
            Write-WarningMsg "Không thực thi rollback.sh để tránh đảo ngược sai release ổn định trước đó."
            throw "DEPLOYMENT THẤT BẠI: Health Check không vượt qua. Production vẫn an toàn tại: '$activeCurrentCheck'."
        }

        if (-not $NoRollbackOnFailure) {
            Write-Host ""
            Write-Host "================================================================================" -ForegroundColor Red
            Write-Host "  TỰ ĐỘNG THỰC HIỆN ROLLBACK VỀ PHIÊN BẢN TRƯỚC VÌ HEALTH CHECK THẤT BẠI..." -ForegroundColor Yellow
            Write-Host "================================================================================" -ForegroundColor Red

            $RollbackOutput = & ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "$RemoteScriptsDir/rollback.sh" 2>&1
            $RollbackExitCode = $LASTEXITCODE
            Write-Host ($RollbackOutput -join "`n")

            $PostRollbackCurrent = (& ssh.exe -i "$KeyPath" -p $Port -o BatchMode=yes "${User}@${HostName}" "readlink -f $RemoteBaseDir/current").Trim()

            if ($RollbackExitCode -ne 0 -or $PostRollbackCurrent -eq $RemoteReleasePath) {
                Write-ErrorMsg "CẢNH BÁO NGUY HIỂM: TỰ ĐỘNG ROLLBACK THẤT BẠI!"
                Write-ErrorMsg "Production hiện vẫn đang trỏ tới: $PostRollbackCurrent"
                Write-ErrorMsg "Vui lòng đăng nhập VPS thủ công để kiểm tra ngay lập tức:"
                Write-ErrorMsg "  ssh -i `"$KeyPath`" -p $Port $User@$HostName"
                Write-ErrorMsg "  ln -sfn <previous-release> $RemoteBaseDir/.manual.tmp && mv -Tf $RemoteBaseDir/.manual.tmp $RemoteBaseDir/current"
                throw "CRITICAL: Deploy thất bại VÀ Rollback tự động cũng thất bại! Cần can thiệp thủ công khẩn cấp."
            }

            Write-Success "Rollback tự động thành công. Production đã an toàn quay về: $PostRollbackCurrent"

            # Kiểm tra lại trang chủ sau khi rollback
            $RecheckCode = & curl.exe -s -o /dev/null -w "%{http_code}" https://superez.site
            Write-Info "HTTP Status sau rollback: $RecheckCode"

            throw "DEPLOYMENT THẤT BẠI: Health Check không vượt qua. Hệ thống đã được rollback tự động về '$PostRollbackCurrent'!"
        } else {
            throw "DEPLOYMENT THẤT BẠI: Health Check không vượt qua. Rollback tự động bị tắt bởi cờ -NoRollbackOnFailure."
        }
    }

    # Báo cáo thành công tổng thể
    $TotalDuration = ((Get-Date) - $GlobalStartTime).TotalSeconds
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Green
    Write-Host "  TRIỂN KHAI FRONTEND SUPER EZ TOUR THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "================================================================================" -ForegroundColor Green
    Write-Host "  - Release ID     : $ReleaseId" -ForegroundColor White
    Write-Host "  - Active Release : $NewCurrent" -ForegroundColor White
    Write-Host "  - Production URL : https://superez.site" -ForegroundColor White
    Write-Host "  - ViVu Backend   : Hoạt động bình thường (https://api.vivu.site)" -ForegroundColor White
    Write-Host "  - Thời gian chạy : $([math]::Round($TotalDuration, 2)) giây" -ForegroundColor White
    Write-Host "--------------------------------------------------------------------------------" -ForegroundColor Gray
    Write-Host "  [LƯU Ý]: Kiểm tra HTTP xác nhận server, headers và assets phản hồi chính xác." -ForegroundColor Gray
    Write-Host "           Để xác minh hoạt ảnh Three.js, GSAP và WebGL, hãy mở trình duyệt thực tế." -ForegroundColor Gray
    Write-Host "================================================================================" -ForegroundColor Green

} catch {
    Write-Host ""
    Write-Host "================================================================================" -ForegroundColor Red
    Write-Host "  QUY TRÌNH TRIỂN KHAI GẶP LỖI!" -ForegroundColor Red
    Write-Host "================================================================================" -ForegroundColor Red
    Write-ErrorMsg $_.Exception.Message
    Write-Host ""
    exit 1
}
