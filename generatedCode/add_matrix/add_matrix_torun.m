addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

% normalTest
a = 0.5*ones(3);
a(1) = a(1) + 1i;
a(5) = a(5) + 1i;
a(9) = a(9) + 1i;
a = a.';
dispArr(a);


b = -0.5*ones(3);
b(1) = 0.5 - 1i;
b(5) = 0.5 - 1i;
b(9) = 0.5 - 1i;
b = b.';
dispArr(b);

c = a+b;
dispArr(c);

d = c+c;
dispArr(d);

% overflowTest
d = INT_MAX*eye(3)+eye(3);
dispArr(d);

