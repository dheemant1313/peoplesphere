@echo off
echo ===================================================
echo  PEOPLESPHERE HRMS — MySQL 8.0 Daemon Starter
echo ===================================================
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --defaults-file="%~dp0mysql.ini" --console
pause
