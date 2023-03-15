addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
fileID = fopen('/home/dlg59/project/ts-traversal/generatedCode/logic_ops_matrix/output.txt','w');
%more off
%format short

%source octaveIncludes.m;

a = [0, 10, 10i; 
10.102, 10.102+0.5i, -12i; 
-0.0002-0.1i, -100.01i, 81];

dispArr(fileID, a);

dispArr(fileID, ~a);

dispArr(fileID, ~zeros(3));
dispArr(fileID, ~ones(3));
dispArr(fileID, ~eye(3));

dispArr(fileID, a & zeros(3));
dispArr(fileID, a & ~eye(3));

dispArr(fileID, zeros(3) | ~ones(3));
dispArr(fileID, ~ones(3) | eye(3));
