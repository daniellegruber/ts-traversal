addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

exponent = 30;
iterations = 100000;

b = [2.1+0.5i,1;0,2.1+0.5i];
dispArr(b);

c = b^exponent;
dispArr(c);

for i = 1:iterations
	c = b^exponent;
	%dispArr(c);
end
