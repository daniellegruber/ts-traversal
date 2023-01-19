%more off
%format short

%source octaveIncludes.m;

a = 0.5*ones(3);
a(1) += I;
a(5) += I;
a(9) += I;
a = a.';
disp(a);


b = 0.5*ones(3);
b(1) = -0.5 + I;
b(5) = -0.5 + I;
b(9) = -0.5 + I;
b = b.';

disp(b);

c = a-b;
disp(c);

d = eye(3)-a;
disp(d);

e = INT_MIN*eye(3)-eye(3);
disp(e);