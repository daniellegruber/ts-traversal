addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;


iterations = 100;

for i=1:iterations
	dispArr(hamming(i));
	dispArr(hamming(i, "periodic"));
	dispArr(hanning(i));
	dispArr(hanning(i, "periodic"));
end