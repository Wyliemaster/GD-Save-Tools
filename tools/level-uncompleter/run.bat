@echo off
mkdir build
node %cd%/src/index.js
timeout /t 10 /nobreak > NUL