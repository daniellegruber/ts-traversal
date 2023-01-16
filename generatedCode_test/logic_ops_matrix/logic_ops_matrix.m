%more off
%format short

%source octaveIncludes.m;

a = [0, 10, 10i; 
10.102, 10.102+0.5i, -12i; 
-0.0002-0.1i, -100.01i, 81];

disp(a);

disp(~a);

disp(~zeros(3));
disp(~ones(3));
disp(~eye(3));

disp(a & zeros(3));
disp(a & ~eye(3));

disp(zeros(3) | ~ones(3));
disp(~ones(3) | eye(3));
