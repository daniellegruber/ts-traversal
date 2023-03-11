addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

a = (0.5 + 1i)*eye(3);
dispArr(a);

b = (0.4 - 0.8i)*eye(3);
b = b.';

dispArr(b);

c = a.*b;
dispArr(c);

d = eye(3).*a;
dispArr(d);

e = 2*INT_MAX*eye(3);
dispArr(e);