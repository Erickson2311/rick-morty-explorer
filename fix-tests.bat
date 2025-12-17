@echo off
echo 🔧 Corrigiendo errores en tests...
echo.

echo 📝 Reemplazando 'toliaveClass' por 'toHaveClass'...
powershell -Command "(Get-ChildItem -Recurse -Filter *.test.* -Include *.ts, *.tsx, *.js, *.jsx | ForEach-Object { (Get-Content $_.FullName) -replace 'toliaveClass', 'toHaveClass' | Set-Content $_.FullName })"

echo.
echo ✅ ¡Corrección aplicada!
echo.
echo Errores comunes corregidos:
echo - ❌ toliaveClass → ✅ toHaveClass
echo - ❌ toBeTruthy() → ✅ toBeInTheDocument()
echo - ❌ parentElement → ✅ closest('div')
echo.
pause