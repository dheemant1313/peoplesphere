# Start PeopleSphere Vite Frontend on port 5174
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$FrontendDir = Join-Path $ProjectRoot "frontend"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  PeopleSphere HRMS — Starting Frontend (Vite)     " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

Set-Location $FrontendDir
npm run dev -- --host 127.0.0.1 --port 5174
