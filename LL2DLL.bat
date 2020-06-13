@echo off
rem Example Usage: ll2dll C:\Sodium\Sodium-Setup\Sodium-Site\apps core

cd %1
echo Processing files:
echo --------------------------------- 
for %%f in (*.ll) do (
    echo %1\%%~nf.ll
    llc -filetype=obj %1\%%~nf.ll
)
echo ---------------------------------
echo Linking ...
link /DLL /out:sodium.dll *.obj MSVCRTD.lib User32.lib Gdi32.lib ole32.lib Comdlg32.lib OleAut32.lib

cd C:\Sodium\Sodium-Setup