@echo off

echo Processing files:
echo --------------------------------- 
for %%f in (*.frmx) do (
    if exist %%~nf.ll (
    	echo Processing: %%~nf.ll
    	SodiumCompiler %%~nf
    	llc -filetype=obj %%~nf.ll
    	link /DLL /out:%%~nf.dll %%~nf.obj MSVCRTD.lib User32.lib Gdi32.lib ole32.lib Comdlg32.lib OleAut32.lib
    	del %%~nf.obj
    	del %%~nf.exp
    ) else (
    	echo skipping file %%~nf.frmx 
    )
)
echo ---------------------------------

