%more off
%format short

%source octaveIncludes.m;



a = zeros(2,3,5);
counter = 0;

% Method 1 to create 3D matrix
% Creates the matrix row-major to match C's implementation
% Note that in Octave, the i (row) loop is outside the j (column) loop. this is
% because Octave is natively column-major, so we must assign carefully.
for k=1:5
	for j=1:3
		for i=1:2
			%a(i,j,k) = counter*counter + 0.5;
			a(i,j,k) = counter;
			counter = counter + 1;
		end
	end
end
disp(a);

% Normal indexing in C and normal indexing in Octave are the same
for k=1:5
	for j=1:3
		for i=1:2	
			disp(a(i,j,k));
		end
	end
end
disp("\n");

% Flat indexing in Octave must be matched by normal indexing in C
for i=1:30
	disp(a(i));
end
disp("\n");



% Method 2 to create 3D matrix
% Creates the matrix column-major to match Octave's implementation
a = zeros(2,3,5);
counter = 0;
for i=1:30
	%a(i) = counter*counter + 0.5;
	a(i) = counter;
	counter = counter + 1;
end
disp(a);

% Normal indexing in C and normal indexing in Octave are the same
for k=1:5
	for j=1:3
		for i=1:2
			disp(a(i,j,k));
		end
	end
end
disp("\n");

% Flat indexing in Octave must be matched by normal indexing in C
for i=1:30
	disp(a(i));
end
disp("\n");
