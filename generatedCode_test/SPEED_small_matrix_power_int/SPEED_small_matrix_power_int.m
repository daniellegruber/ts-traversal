%more off
%format short

%source octaveIncludes.m;

exponent = 30;
iterations = 100000;

b = [2.1+0.5*i,1;0,2.1+0.5*i];
disp(b);

c = b^exponent;
disp(c);

for i = 1:iterations
	c = b^exponent;
	%disp(c);
end
