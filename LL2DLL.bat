@echo off
rem Example Usage: ll2dll C:\Sodium\Sodium-Setup\Sodium-Site\apps core

cd %1
llc -filetype=obj %2.ll
link /DLL /out:sodium.dll *.obj MSVCRTD.lib User32.lib Gdi32.lib ole32.lib Comdlg32.lib OleAut32.lib