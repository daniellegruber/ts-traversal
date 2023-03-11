addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

a = [0, 10, 10i; 
10.102, 10.102+0.5i, -12i; 
-0.0002-0.1i, -100.01i, 81];

dispArr(a);

dispArr(~a);

dispArr(~zeros(3));
dispArr(~ones(3));
dispArr(~eye(3));

dispArr(a & zeros(3));
dispArr(a & ~eye(3));

dispArr(zeros(3) | ~ones(3));
dispArr(~ones(3) | eye(3));
