%more off
%format short

%source octaveIncludes.m;

a = [0, 10, 10i; 
10.102, 10.102+0.5i, -12i; 
-0.0002-0.1i, -100.01i, 81];

b = abs(a);

disp(a);
disp(b);
%complexDisp(a);
%doubleDisp(b);