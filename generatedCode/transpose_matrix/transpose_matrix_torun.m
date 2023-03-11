addpath('/gpfs/gibbs/project/manohar/dlg59/ts-traversal/generatedCode');
%more off
%format short

%source octaveIncludes.m;

% int_test
a = zeros(3,6);
counter=1;
for i=1:3
	for j=1:6
		a(i,j) = counter*counter;
		counter = counter + 1;
	end
end

dispArr(a);

dispArr(a.');

b=a.';
dispArr(b.');

% double_test
a = zeros(3,6);
counter=1;
for i=1:3
	for j=1:6
		a(i,j) = counter*counter+0.5;
		counter = counter + 1;
	end
end

dispArr(a);

dispArr(a.');

b=a.';
dispArr(b.');

% complex_test
a = zeros(3,6);
counter=1;
for i=1:3
	for j=1:6
		a(i,j) = counter*counter+0.5 - 0.5i;
		counter = counter + 1;
	end
end

dispArr(a);

dispArr(a.');

b=a.';
dispArr(b.');

% complex_conjugate_test
a = zeros(3,6);
counter=1;
for i=1:3
	for j=1:6
		a(i,j) = counter*counter+0.5 - 0.5i;
		counter = counter + 1;
	end
end

dispArr(a);

dispArr(a');

b=a';
dispArr(b');