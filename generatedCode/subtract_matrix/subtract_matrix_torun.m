addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
fileID = fopen('/home/dlg59/project/ts-traversal/generatedCode/subtract_matrix/output.txt','w');
%more off
%format short

%source octaveIncludes.m;

a = 0.5*ones(3);
a(1) += I;
a(5) += I;
a(9) += I;
a = a.';
dispArr(fileID, a);


b = 0.5*ones(3);
b(1) = -0.5 + I;
b(5) = -0.5 + I;
b(9) = -0.5 + I;
b = b.';

dispArr(fileID, b);

c = a-b;
dispArr(fileID, c);

d = eye(3)-a;
dispArr(fileID, d);

e = INT_MIN*eye(3)-eye(3);
dispArr(fileID, e);