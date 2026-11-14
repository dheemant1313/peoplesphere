# Start PeopleSphere FastAPI backend server on port 8001
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$BackendDir = Join-Path $ProjectRoot "backend"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  PeopleSphere HRMS — Starting Backend (FastAPI)   " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

Set-Location $BackendDir
$PythonExe = Join-Path $BackendDir "venv\Scripts\python.exe"

& $PythonExe run_backend.py
