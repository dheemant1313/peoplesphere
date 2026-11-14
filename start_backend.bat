@echo off
echo ===================================================
echo  PEOPLESPHERE HRMS — Backend Service Starter
echo ===================================================
cd /d "%~dp0\backend"
call .\venv\Scripts\activate.bat
python run_backend.py
pause
