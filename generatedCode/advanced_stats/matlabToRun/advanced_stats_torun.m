addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
addpath('/home/dlg59/project/ts-traversal/generatedCode/advanced_stats/matlabToRun');
fileID = fopen('/home/dlg59/project/ts-traversal/generatedCode/advanced_stats/output.txt','w');
%more off
%format short

%source octaveIncludes.m;
%pkg load statistics;

%row_vectors_i
a = [3,-5,0,1];
dispArr(fileID, a);
two_t_test(fileID, a, ones(size(a)));
int_vec_stats(fileID, a);
double_stats(fileID, a);

%row_vectors_d
a = [0.5,0.25,0,0.6];
dispArr(fileID, a);
two_t_test(fileID, a, ones(size(a)));
double_vec_stats(fileID, a);
double_stats(fileID, a);

%column_vectors_i
a = [3;-5;0;1];
dispArr(fileID, a);
int_vec_stats(fileID, a);
double_stats(fileID, a);

%column_vectors_d
a = [0.25;0.5;0;0.6];
dispArr(fileID, a);
double_vec_stats(fileID, a);
double_stats(fileID, a);

%matrices_23_i
a=[3,-2,0;1,5,10];
dispArr(fileID, a);
double_stats(fileID, a);

%matrices_23_d
a=[3.25,-2,0;1,5,10];
dispArr(fileID, a);
double_stats(fileID, a);

%matrices_32_i
a=[3,-2;0,1;5,10];
dispArr(fileID, a);
double_stats(fileID, a);

%matrices_32_d
a=[3.25,-2;0,1;5,10];
dispArr(fileID, a);
double_stats(fileID, a);

%matrices_97_i
a=zeros(7,9);
for i=1:63
	a(i) = (-1)^i*i^2;
end
a=a.';
dispArr(fileID, a);
double_stats(fileID, a);

%matrices_97_d
a=zeros(7,9);
for i=1:63
	a(i) = (-1)^i*i^2/17;
end
a=a.';
dispArr(fileID, a);
double_stats(fileID, a);

%big_matrix
a=ones(32,32);
dispArr(fileID, a);
double_stats(fileID, a);

%big_vector
a=ones(1010,1);
dispArr(fileID, a);
int_vec_stats(fileID, a);
double_stats(fileID, a);





	for i=(var(a, 0, 1)-5):1.0:(var(a, 0, 1)+5)
		sprintf("v: %.3f\n", i);
		[h, pval, ci, stats] = vartest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df);
		% sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df);
	end

end



	for i=(var(a, 0, 1)-5):1.0:(var(a, 0, 1)+5)
		sprintf("v: %.3f\n", i);
		[h, pval, ci, stats] = vartest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df);
		% sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df);
	end
end


	end

	% Exponential PDF
	for lambda=0.05:0.05:4.95
		dispArr(fileID, exppdf(a, lambda));
	end

	% Chi-square PDF
	for n=0.05:0.05:4.95
		sprintf("n = %.3f\n", n);
		dispArr(fileID, chi2pdf(a, n));
	end

	% Gamma PDF
	for i=0.25:0.25:1.75
		for j=0.25:0.25:1.75
			dispArr(fileID, gampdf(a, i, j));
		end
	end

	% Lognormal PDF
	for mu = -2:0.5:5
		for sd=0.5:0.5:5
			dispArr(fileID, lognpdf(a, mu, sd));
		end
	end

	% Normal PDF
	for mu = -2:0.5:5
		for sd=0.5:0.5:5
			dispArr(fileID, normpdf(a, mu, sd));
		end
	end

	% Uniform discrete PDF
	for n=1:9
		sprintf("n = %d\n",n);
		dispArr(fileID, unidpdf(a, n));
	end

end
