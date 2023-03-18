addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
addpath('/home/dlg59/project/ts-traversal/generatedCode/stftM/matlabToRun');
fileID = fopen('/home/dlg59/project/ts-traversal/generatedCode/stftM/output.txt','w');
%more off
%format short

%source octaveIncludes.m;


			end
		end
	end
end

%row_vectors_i
a = [-4:5];
dispArr(fileID, a);
fourier_vec_script(fileID, a);

% %row_vectors_d
% a = [-4:0.5:1.5];
% dispArr(fileID, a);
% fourier_vec_script(fileID, a);

% %row_vectors_c
% a = zeros(1,100);
% for i=1:100
% 	a(i) = 101-i + (i-1)*1i;
% end
% dispArr(fileID, a);
% fourier_vec_script(fileID, a);

% %column_vectors_i
% a = [-4:5].';
% dispArr(fileID, a);
% fourier_vec_script(fileID, a);

% %column_vectors_d
% a = [-4:0.5:1.5].';
% dispArr(fileID, a);
% fourier_vec_script(fileID, a);

% %column_vectors_c
% a = zeros(100,1);
% for i=1:100
% 	a(i) = 101-i + (i-1)*1i;
% end
% dispArr(fileID, a);
% fourier_vec_script(fileID, a);
