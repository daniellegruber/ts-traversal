A = [1, 2.1, 1;
    3, 4, 1];
B = A * A';
C = 3 * B;
[F, G] = myfun1(1, 2);
function [F, G] = myfun1(f, g)
    F = f + g;
    G = f - g;
end