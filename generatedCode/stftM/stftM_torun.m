addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

function fourier_vec_script(a)

	for win_size=1:9
		for inc=1:9
			for num_coef=2:9
				for win_type=1:3
					sprintf("win_size: %d, inc: %d, num_coef: %d, win_type: %d\n", win_size, inc, num_coef, win_type);
					y = stft(a, win_size, inc, num_coef, win_type);
					dispArr(y);
				end
			end
		end
	end
end

%row_vectors_i
a = [-4:5];
dispArr(a);
fourier_vec_script(a);

% %row_vectors_d
% a = [-4:0.5:1.5];
% dispArr(a);
% fourier_vec_script(a);

% %row_vectors_c
% a = zeros(1,100);
% for i=1:100
% 	a(i) = 101-i + (i-1)*1i;
% end
% dispArr(a);
% fourier_vec_script(a);

% %column_vectors_i
% a = [-4:5].';
% dispArr(a);
% fourier_vec_script(a);

% %column_vectors_d
% a = [-4:0.5:1.5].';
% dispArr(a);
% fourier_vec_script(a);

% %column_vectors_c
% a = zeros(100,1);
% for i=1:100
% 	a(i) = 101-i + (i-1)*1i;
% end
% dispArr(a);
% fourier_vec_script(a);
