@echo off
echo ===================================================
echo  PEOPLESPHERE HRMS — Frontend UI Starter
echo ===================================================
cd /d "%~dp0\frontend"
npm run dev -- --host 127.0.0.1 --port 5174
pause
