# Run all automated tests for PeopleSphere HRMS
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$BackendDir = Join-Path $ProjectRoot "backend"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  PeopleSphere HRMS — Running Automated Test Suite " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

Set-Location $BackendDir
$PytestExe = Join-Path $BackendDir "venv\Scripts\pytest.exe"

& $PytestExe -v tests/
