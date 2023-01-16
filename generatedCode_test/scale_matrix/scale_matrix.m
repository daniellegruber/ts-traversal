%more off
%format short

%source octaveIncludes.m;

disp(ones(3));

a = zeros(3);

for i=1:9
	a(i) = i;
end
a = a.';
disp(a);

b = zeros(3);

for i=1:9
	b(i) = i+ii;
end
b = b.';
disp(b);

disp(2*ones(3));
disp(2.1*ones(3));
disp((2.1+I)*ones(3));

disp(2*a);
disp(2.1*a);
disp((2.1+I)*a);

disp(2*b);
disp(2.1*b);
disp((2.1+I)*b);

disp(2iNT_MAX*ones(3));
disp(2iNT_MIN*ones(3));