addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

%ii_test
a = zeros(3);
for i=1:9
	a(i) = i;
end
a=a.';
dispArr(a);

b = a;
dispArr(b);

c = a.^b;
dispArr(c);

%id_test
a = zeros(3);
for i=1:9
	a(i) = i;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = i+0.4;
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%neg_id_test
a = zeros(3);
for i=1:9
	a(i) = -i;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = i+0.4;
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%ic_test
a = zeros(3);
for i=1:9
	a(i) = i;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = i+0.4i;
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%di_test
a = zeros(3);
for i=1:9
	a(i) = i+0.4;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = i;
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%dd_test
a = zeros(3);
for i=1:9
	a(i) = i+0.4;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = (i+0.4);
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%neg_dd_test
a = zeros(3);
for i=1:9
	a(i) = -(i+0.4);
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = -(i+0.4);
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%dc_test
a = zeros(3);
for i=1:9
	a(i) = i+0.4;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = i+0.4i;
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%ci_test
a = zeros(3);
for i=1:9
	a(i) = i+1i;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = i;
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%cd_test
a = zeros(3);
for i=1:9
	a(i) = i+0.5i;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = (i+0.4);
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%cc_test
a = zeros(3);
for i=1:9
	a(i) = i+0.4i;
end
a=a.';
dispArr(a);

b = zeros(3);
for i=1:9
	b(i) = i+0.4i;
end
b=b.';
dispArr(b);

c = a.^b;
dispArr(c);

%overflow_test
a = zeros(3);
for i=1:9
	a(i) = INT_MAX;
end
a=a.';
dispArr(a);

b = 2*ones(3);
dispArr(a);

c = a.^b;
dispArr(c);