addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
fileID = fopen('/home/dlg59/project/ts-traversal/generatedCode/external_fun/output.txt','w');
[F,G] = myfun1(1,2);
b = myfun3(4);
dispArr(fileID, b);

function [F, G] = myfun1(f,g)
    F = f + g;
    G = f - g;
    for i = 1:2:5
        dispArr(fileID, i);
    end
end

function outstr = myfun2()
    outstr = "hello world";
end