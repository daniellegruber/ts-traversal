addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

dispArr(ones(3));

a = zeros(3);

for i=1:9
	a(i) = i;
end
a = a.';
dispArr(a);

b = zeros(3);

for i=1:9
	b(i) = i+i*1i;
end
b = b.';
dispArr(b);

dispArr(2*ones(3));
dispArr(2.1*ones(3));
dispArr((2.1+1i)*ones(3));

dispArr(2*a);
dispArr(2.1*a);
dispArr((2.1+1i)*a);

dispArr(2*b);
dispArr(2.1*b);
dispArr((2.1+1i)*b);

dispArr(2*INT_MAX*ones(3));
dispArr(2*INT_MIN*ones(3));