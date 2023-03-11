addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

function [mu, sd] = normfit(a)
	mu = mean(a);
	sd = std(a);
end

function [ahat, bhat] = unifit(a)
	ahat = min(a);
	bhat = max(a);
end

function int_vec_stats(a)
	[greatest, index] = max(a);
	dispArr(greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	dispArr(least);
	sprintf("min index: %d\n", index);

	[mu, sd] = normfit(a);
	sprintf("mean: %.3f\n", mu);
	sprintf("sd: %.3f\n", sd);

	[ahat, bhat] = unifit(a);
	sprintf("a: %d\n", ahat);
	sprintf("b: %d\n", bhat);
end

function double_vec_stats(a)
	[greatest, index] = max(a);
	dispArr(greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	dispArr(least);
	sprintf("min index: %d\n", index);

	[mu, sd] = normfit(a);
	sprintf("mean: %.3f\n", mu);
	sprintf("sd: %.3f\n", sd);

	[ahat, bhat] = unifit(a);
	sprintf("a: %.3f\n", ahat);
	sprintf("b: %.3f\n", bhat);
end

function complex_vec_stats(a)
	[greatest, index] = max(a);
	dispArr(greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	dispArr(least);
	sprintf("min index: %d\n", index);

	[mu, sd] = normfit(a);
	sprintf("mean: %.3f + %.3fi\n", real(mu), imag(mu));
	sprintf("sd: %.3f + %.3fi\n", real(sd), imag(sd));

	[ahat, bhat] = unifit(a);
	sprintf("a: %.3f + %.3fi\n", real(ahat), imag(ahat));
	sprintf("b: %.3f + %.3fi\n", real(bhat), imag(bhat));

end

function int_stats(a)
	fun_qs = [0, -1, 3, 0.2, 0.9, 0.53, 0.75, 1, 0.34, 0.17];

	dispArr(mean(a));
	dispArr(var(a));
	dispArr(var(a,1));
	dispArr(std(a));
	dispArr(std(a,1));
	dispArr(sort(a));
	dispArr(sort(a, "descend"));
	dispArr(median(a));
	dispArr(min(a));
	dispArr(max(a));
	dispArr(quantile(a, 4));
	dispArr(quantile(a, fun_qs));
end

function double_stats(a)
	fun_qs = [0, -1, 3, 0.2, 0.9, 0.53, 0.75, 1, 0.34, 0.17];

	dispArr(mean(a));
	dispArr(var(a));
	dispArr(var(a,1));
	dispArr(std(a));
	dispArr(std(a,1));
	dispArr(sort(a));
	dispArr(sort(a, "descend"));
	dispArr(median(a));
	dispArr(min(a));
	dispArr(max(a));
	dispArr(quantile(a, 4));
	dispArr(quantile(a, fun_qs));
end

function complex_stats(a)
	fun_qs = [0, -1, 3, 0.2, 0.9, 0.53, 0.75, 1, 0.34, 0.17];

	dispArr(mean(a));
	dispArr(var(a));
	dispArr(var(a,1));
	dispArr(std(a));
	dispArr(std(a,1));
	dispArr(sort(a));
	dispArr(sort(a, "descend"));
	dispArr(median(a));
	dispArr(min(a));
	dispArr(max(a));
	dispArr(quantile(a, 4));
	dispArr(quantile(a, fun_qs));
end

%row_vectors_i
a = [3,-5,0,1];
dispArr(a);
int_vec_stats(a);
int_stats(a);

%row_vectors_d
a = [3.25,-2,0,10.1];
dispArr(a);
double_vec_stats(a);
double_stats(a);

%row_vectors_c
a = [3.25,-2,0,1-1i];
dispArr(a);
complex_vec_stats(a);
complex_stats(a);

%column_vectors_i
a = [3;-5;0;1];
dispArr(a);
int_vec_stats(a);
int_stats(a);

%column_vectors_d
a = [3.25;-2;0;10.1];
dispArr(a);
double_vec_stats(a);
double_stats(a);

%column_vectors_c
a = [3.25;-2;0;1-1i];
dispArr(a);
complex_vec_stats(a);
complex_stats(a);

%matrices_23_i
a=[3,-2,0;1,5,10];
dispArr(a);
int_stats(a);

%matrices_23_d
a=[3.25,-2,0;1,5,10];
dispArr(a);
double_stats(a);

%matrices_23_c
a=[3.25,-2,0;1,5-1i,10];
dispArr(a);
complex_stats(a);

%matrices_32_i
a=[3,-2;0,1;5,10];
dispArr(a);
int_stats(a);

%matrices_32_d
a=[3.25,-2;0,1;5,10];
dispArr(a);
double_stats(a);

%matrices_32_c
a=[3.25,-2;0,1;5-1i,10];
dispArr(a);
complex_stats(a);

%matrices_97_i
a=zeros(7,9);
for i=1:63
	a(i) = (-1)^i*i^2;
end
a=a.';
dispArr(a);
int_stats(a);

%matrices_97_d
a=zeros(7,9);
for i=1:63
	a(i) = (-1)^i*i^2/17;
end
a=a.';
dispArr(a);
double_stats(a);

%matrices_97_c
a=zeros(7,9);
for i=1:63
	a(i) = (-1)^i*i-i/17i;
end
a=a.';
dispArr(a);
complex_stats(a);

%basic_quantile_test
a = [1:100];
dispArr(quantile(a, 0:0.01:1).');

b = zeros(1,1004);
for i=1:1004
	b(i) = i*i/17;
end
b=b.';
dispArr(quantile(b, 0:0.01:1).');

c = zeros(1,57);
for i=1:57
	c(i) = i-i/17i;
end
c=c.';
dispArr(quantile(c, 0:0.01:1).');