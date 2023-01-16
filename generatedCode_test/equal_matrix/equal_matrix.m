%more off
%format short

%source octaveIncludes.m;

a = [0, 10, 10*i; 
10.102, 10.102+0.5*i, -12*i; 
-0.0002-0.1i, -100.01i, 81];

disp(a);

b = a;

disp(b);

disp(a == b);