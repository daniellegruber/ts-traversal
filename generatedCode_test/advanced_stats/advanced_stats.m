%more off
%format short

%source octaveIncludes.m;
%pkg load statistics;

function two_t_test(a, b)
	[h, pval, ci, stats] = ttest(a, b);
	sprintf("h: %d\npval: %.2f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, stats.tstat, stats.df, stats.sd);
end

function int_vec_stats(a)
	[greatest, index] = max(a);
	disp(greatest);
	sprintf("max index: %d\n\n", index);

	[least, index] = min(a);
	disp(least);
	sprintf("min index: %d\n\n", index);

	for i=least:0.5:greatest
		sprintf("mu: %.3f\n", i);
		[h, pval, ci, stats] = ttest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, ci(1), ci(2), stats.tstat, stats.df, stats.sd);

		[h, pval, ci, z, zcrit] = ztest(a, i, std(a, 1));
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\nzcrit: %.3f\n", h, pval, ci(1), ci(2), z, zcrit);
	end

	for i=(var(a, 1)-5):1.0:(var(a, 1)+5)
		sprintf("v: %.3f\n", i);
		[h, pval, ci, stats] = vartest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df);
		% sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df);
	end

end

function double_vec_stats(a)
	[greatest, index] = max(a);
	disp(greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	disp(least);
	sprintf("min index: %d\n", index);

	for i=least:0.5:greatest
		sprintf("mu: %.3f\n", i);
		[h, pval, ci, stats] = ttest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, ci(1), ci(2), stats.tstat, stats.df, stats.sd);

		[h, pval, ci, z, zcrit] = ztest(a, i, std(a, 1));
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\nzcrit: %.3f\n", h, pval, ci(1), ci(2), z, zcrit);
	end

	for i=(var(a, 1)-5):1.0:(var(a, 1)+5)
		sprintf("v: %.3f\n", i);
		[h, pval, ci, stats] = vartest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df);
		% sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df);
	end
end

function double_stats(a)
	fun_qs = [0, -1, 3, 0.2, 0.9, 0.53, 0.75, 1, 0.34, 0.17];

	% Beta PDF
	for i=0:0.05:0.95
		for j=0:0.05:0.95
			disp(betapdf(a, i, j));
		end
	end

	% Exponential PDF
	for lambda=0.05:0.05:4.95
		disp(exppdf(a, lambda));
	end

	% Chi-square PDF
	for n=0.05:0.05:4.95
		sprintf("n = %.3f\n", n);
		disp(chi2pdf(a, n));
	end

	% Gamma PDF
	for i=0.25:0.25:1.75
		for j=0.25:0.25:1.75
			disp(gampdf(a, i, j));
		end
	end

	% Lognormal PDF
	for mu = -2:0.5:5
		for sd=0.5:0.5:5
			disp(lognpdf(a, mu, sd));
		end
	end

	% Normal PDF
	for mu = -2:0.5:5
		for sd=0.5:0.5:5
			disp(normpdf(a, mu, sd));
		end
	end

	% Uniform discrete PDF
	for n=1:9
		sprintf("n = %d\n",n);
		disp(unidpdf(a, n));
	end

end

%row_vectors_i
a = [3,-5,0,1];
disp(a);
two_t_test(a, ones(size(a)));
int_vec_stats(a);
double_stats(a);

%row_vectors_d
a = [0.5,0.25,0,0.6];
disp(a);
two_t_test(a, ones(size(a)));
double_vec_stats(a);
double_stats(a);

%column_vectors_i
a = [3;-5;0;1];
disp(a);
int_vec_stats(a);
double_stats(a);

%column_vectors_d
a = [0.25;0.5;0;0.6];
disp(a);
double_vec_stats(a);
double_stats(a);

%matrices_23_i
a=[3,-2,0;1,5,10];
disp(a);
double_stats(a);

%matrices_23_d
a=[3.25,-2,0;1,5,10];
disp(a);
double_stats(a);

%matrices_32_i
a=[3,-2;0,1;5,10];
disp(a);
double_stats(a);

%matrices_32_d
a=[3.25,-2;0,1;5,10];
disp(a);
double_stats(a);

%matrices_97_i
a=zeros(7,9);
for i=1:63
	a(i) = (-1)^i*i^2;
end
a=a.';
disp(a);
double_stats(a);

%matrices_97_d
a=zeros(7,9);
for i=1:63
	a(i) = (-1)^i*i^2/17;
end
a=a.';
disp(a);
double_stats(a);

%big_matrix
a=ones(32,32);
disp(a);
double_stats(a);

%big_vector
a=ones(1010,1);
disp(a);
int_vec_stats(a);
double_stats(a);
