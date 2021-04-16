@echo off
mkdir build
node src/index.js
echo Fixed Save File in %cd%/build/CCGameManager.dat
pause >nul