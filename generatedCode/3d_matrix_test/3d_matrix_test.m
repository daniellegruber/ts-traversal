%more off
%format short

%source octaveIncludes.m;

a = zeros(2,3,5);

counter = 0;
for k=1:5
	for j=1:3
		for i=1:2
			a(i,j,k) = counter;
			counter = counter + 1;
		end
	end
end
disp(a);
for k=1:5
	for j=1:3
		for i=1:2
			disp(a(i,j,k));
		end
	end
end