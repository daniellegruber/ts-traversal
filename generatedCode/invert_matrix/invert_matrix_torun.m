addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

%int_test
a = [1,2;3,4];
dispArr(a);
dispArr(inv(a));
dispArr(inv(inv(a)));

%double_test
a = [1.5,2.5;3.5,4.5];
dispArr(a);
dispArr(inv(a));
dispArr(inv(inv(a)));

%complex_test
a = [1.5+1i,2.5+2i;3.5+3i,4.5+4i];
dispArr(a);
dispArr(inv(a));
dispArr(inv(inv(a)));

%singular_test
dispArr(ones(2));

%non_square_test
dispArr(ones(2,3));
