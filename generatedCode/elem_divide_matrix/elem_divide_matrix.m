%more off
%format short

%source octaveIncludes.m;

a = ones(3);
a(1) = -0.75 + I;
a(5) = -0.75 + I;
a(9) = -0.75 + I;
a=a.';
disp(a);

b = ones(3);
b(1) = 0.5 + I;
b(5) = 0.5 + I;
b(9) = 0.5 + I;
b=b.';

disp(b);

c = a./b;
disp(c);

d = eye(3)./a;
disp(d);

e = b./eye(3);
disp(e);

c = a.\b;
disp(c);

d = eye(3).\a;
disp(d);

e = b.\eye(3);
disp(e);