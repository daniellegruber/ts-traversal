addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

% trueTest
a = zeros(3);

for i=1:9
	a(i) = i*i;
end
a = a.';

dispArr(a);

b=a;
dispArr(b);

c=a;
dispArr(c);

d=a;
dispArr(d);

dispArr((a==b)&(a==c)&(a==d));

% falseTest
dispArr(a);
dispArr(b);

c = zeros(3);
for i=1:9
	c(i) = i*i;
end
c(2) = 10;
c(3) = 11;
c(6) = 12;
c = c.';
dispArr(c);

d = zeros(3);
for i=1:9
	d(i) = i*i;
end
d(4) = 13;
d(7) = 14;
d(8) = 15;
d = d.';
dispArr(d);

dispArr((a==b)&(a==c)&(a==d));