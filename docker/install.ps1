# Fleetmanagtment Docker One-Liner Installer for Windows
# 
# One Line Command (Copy & Paste):
# docker build -t fleetmanagtment:latest . && docker run -p 8081:8081 --add-host=host.docker.internal:host-gateway fleetmanagtment:latest
#
# Full Script (Click to run):
# powershell.exe -ExecutionPolicy Bypass -File "docker/install.ps1"
#
# Requirements:
# - Docker Desktop for Windows
# - Node.js 20+ (optional, for development)
#
# WebUI URL after deployment: http://localhost:8081

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Fleetmanagtment Docker Deployment " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Prerequisites check
Write-Host "[/] Step 1: Checking Docker & WSL2..." -ForegroundColor Yellow
try {
    Test-Path "C:\ProgramData\docker" | ForEach-Object { 
        Write-Host "   [OK] Docker Desktop found" -ForegroundColor Green
    }
} catch {
    Write-Host "   [!] Docker Desktop not found! Please install first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# 2. Build Docker Image
Write-Host "[/] Step 2: Building Docker image..." -ForegroundColor Yellow
try {
    docker build -t fleetmanagtment:latest . -f dockerfile"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   [OK] Build succeeded!" -ForegroundColor Green
    } else {
        Write-Host "   [!] Build failed! Check errors above." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   [!] Build error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 3. Start WebUI
Write-Host "[/] Step 3: Starting WebUI (WebSockets & Mock-API)..." -ForegroundColor Yellow
try {
    docker run -p 8081:8081 `
      --add-host=host.docker.internal:host-gateway `
      fleetmanagtment:latest
    
    Write-Host ""
    Write-Host "[OK] Deployment completed!" -ForegroundColor Green
    Write-Host "[WebUI] Open http://localhost:8081 in your browser" -ForegroundColor Yellow
    Write-Host "[Mock-API] Available at: http://localhost:3000/api" -ForegroundColor Cyan
} catch {
    Write-Host "   [!] Run error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}