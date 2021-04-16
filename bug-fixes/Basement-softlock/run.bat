@echo off
set mypath=%cd%
cd %mypath%
echo creating a folder for the edited save file...
mkdir build
echo running script...
node src/index.js
pause