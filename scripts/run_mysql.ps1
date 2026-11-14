# Start PeopleSphere MySQL 8.0 daemon on port 3307
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  PeopleSphere HRMS — Starting MySQL 8.0 Server    " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

$MysqldPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe"
$ConfigFile = Join-Path $ProjectRoot "mysql.ini"

if (-not (Test-Path $MysqldPath)) {
    Write-Error "mysqld.exe not found at $MysqldPath"
}

Write-Host "Config: $ConfigFile" -ForegroundColor Gray
& $MysqldPath --defaults-file="$ConfigFile" --console
