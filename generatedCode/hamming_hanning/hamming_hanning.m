%more off
%format short

%source octaveIncludes.m;


iterations = 3;

for i=1:iterations
	disp(hamming(i));
	disp(hamming(i, "periodic"));
	disp(hanning(i));
	disp(hanning(i, "periodic"));
end