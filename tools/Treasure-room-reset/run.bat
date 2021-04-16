@echo off
mkdir build
node %cd%/src/index.js
echo Please copy build/CCGameManager.dat into %appdata%/local/GeometryDash. 
echo be sure to move your old saves somewhere safe
pause >nul