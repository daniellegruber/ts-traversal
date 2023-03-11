addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

a = 0.5*ones(3);
a(1) += I;
a(5) += I;
a(9) += I;
a = a.';
dispArr(a);


b = 0.5*ones(3);
b(1) = -0.5 + I;
b(5) = -0.5 + I;
b(9) = -0.5 + I;
b = b.';

dispArr(b);

c = a-b;
dispArr(c);

d = eye(3)-a;
dispArr(d);

e = INT_MIN*eye(3)-eye(3);
dispArr(e);