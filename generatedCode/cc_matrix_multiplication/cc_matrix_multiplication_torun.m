addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

a = [1+1i,0.4i;9-0.5i,16;10+17i,35-9i];
b = [2,0;0,1i;10+17i,35-9i].';
c = a*b;

dispArr(a);
dispArr(b);
dispArr(c);