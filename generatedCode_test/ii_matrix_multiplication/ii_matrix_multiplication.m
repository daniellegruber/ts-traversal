%more off
%format short

%source octaveIncludes.m;

a = [1,4;9,16;25,36];
b = [2,0;0,2;0,0].';
c = a*b;

disp(a);
disp(b);
disp(c);