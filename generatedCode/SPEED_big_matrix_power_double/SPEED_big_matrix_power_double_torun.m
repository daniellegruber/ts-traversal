addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
fileID = fopen('/home/dlg59/project/ts-traversal/generatedCode/SPEED_big_matrix_power_double/output.txt','w');
%more off
%format short

%source octaveIncludes.m;

iterations = 1;
exponent = 20.48;

size = 1000*1000;

a = ones(1000);

for n = 1:size
	a(n) = n^2+0.5;
end

for i = 1:iterations
	c = a^exponent;
	%dispArr(fileID, c);
end