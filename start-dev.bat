@echo off
echo Starting AI Mail Agent Development Server...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost/mail.php
echo.
echo Starting React development server...
cd frontend
start cmd /k "npm start"
echo.
echo React server started in new window.
echo.
echo To test the backend, make sure you have a local web server running
echo (like XAMPP, WAMP, or PHP built-in server) pointing to this directory.
echo.
pause
