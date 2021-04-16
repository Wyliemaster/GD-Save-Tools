@echo off
if exist build\ (
  echo Reading Save File
) else (
 mkdir build
echo Reading Save File
)
node src/main.js
pause >nul