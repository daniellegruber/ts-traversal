A = [1, 2;
    3, 4];
B = [A;A];
C = B*A;

a = 2.5;
c = a < b;

D = {'hello', 'world'};
E = D';

[F,G] = myfun1(1,2);

myvar = A(1,1);

function [F, G] = myfun1(f,g)
    F = f + g;
    G = f - g;
end

function outstr = myfun2()
    outstr = "hello world";
end