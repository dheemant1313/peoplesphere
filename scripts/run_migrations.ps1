# Run Alembic Database Migrations for PeopleSphere
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$BackendDir = Join-Path $ProjectRoot "backend"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  PeopleSphere HRMS — Upgrading Database Schema    " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

Set-Location $BackendDir
$AlembicExe = Join-Path $BackendDir "venv\Scripts\alembic.exe"

& $AlembicExe upgrade head
Write-Host "[✓] Migrations applied successfully to MySQL peoplesphere_db." -ForegroundColor Green
