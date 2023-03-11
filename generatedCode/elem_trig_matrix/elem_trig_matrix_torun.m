addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

%int_test
exponent=3;
a = zeros(3);
for i=1:9
	a(i) = ((-1)^(i+1))*(i-1);
end
a=a.';
dispArr(a);

dispArr(sin(a));
dispArr(sind(a));
dispArr(cos(a));
dispArr(cosd(a));
dispArr(tan(a));
dispArr(tand(a));


%double_test
a = zeros(3);
for i=1:9
	a(i) = ((-1)^(i+1))*(i+0.4);
end
a=a.';
dispArr(a);

dispArr(sin(a));
dispArr(sind(a));
dispArr(cos(a));
dispArr(cosd(a));
dispArr(tan(a));
dispArr(tand(a));


%complex_test
exponent=1.2;
a = zeros(3);
for i=1:9
	a(i) = i + 0.5i;
end
a=a.';
dispArr(a);

dispArr(sin(a));
dispArr(sind(a));
dispArr(cos(a));
dispArr(cosd(a));
dispArr(tan(a));
dispArr(tand(a));