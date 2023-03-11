addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

a = ones(3);
a(1) = -0.75 + 1i;
a(5) = -0.75 + 1i;
a(9) = -0.75 + 1i;
a=a.';
dispArr(a);

b = ones(3);
b(1) = 0.5 + 1i;
b(5) = 0.5 + 1i;
b(9) = 0.5 + 1i;
b=b.';

dispArr(b);

c = a./b;
dispArr(c);

d = eye(3)./a;
dispArr(d);

e = b./eye(3);
dispArr(e);

c = a.\b;
dispArr(c);

d = eye(3).\a;
dispArr(d);

e = b.\eye(3);
dispArr(e);