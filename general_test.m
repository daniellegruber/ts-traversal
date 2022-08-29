A = [1, 2.1, 1;
    3, 4, 1];
B = [A;A];
C = B*A;
C_scaled = 3 * C;

a = 2.5;
c = a < b;
d = 1 + 3.444i;

D = {'hello', 'world'};
E = D';

[F,G] = myfun1(1,2);

H = {'hello', 1};

myvar = A(1:end,1:end);

% This is a comment

if a
  b
elseif c
  d
else
  f
end

myarr = zeros(2,3);

b = myfun3(a);

for i = [2, 7, 9]
    a;
end


function [F, G] = myfun1(f,g)
    F = f + g;
    G = f - g;
    for i = 1:2:5
        a;
    end
end

function outstr = myfun2()
    outstr = "hello world";
end