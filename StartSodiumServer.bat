@echo off

@setlocal enableextensions

@cd /d "%~dp0"

set path=%path%;"%~dp0"

start .\SodiumServer.exe http://*:8089/ SodiumExtension.dll

sleep 5

start http://localhost:8089/Sodium-Site/welcome.frmx
