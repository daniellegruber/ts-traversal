addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

iterations = 1000000;

a = [1.5,4.5;9.5,16.5];

dispArr(a);

for i = 1:iterations
	b = inv(a);
end