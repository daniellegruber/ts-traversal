addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

a = [1,4;9,16;25,36];
b = [2.1,0;0,2.1;0,0].';
c = a*b;

dispArr(a);
dispArr(b);
dispArr(c);