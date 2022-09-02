sort(A, 'descend')
sort(A)
B = zeros(2,2)
C{1} = zeros(3)
A = [1, 2, 3; 4 5 6];
A(1:2,2:3) = [1,2;3,4];
B = A.^2;
[my_h, my_p, my_ci, my_stat] = ttest(A)
ttest(A,B)
a = strcmp('hello', 'world');
b = numel(A);
c = size(A);
M = max(A);
[M,I] = max(A);
D = quantile(A,4)
D = quantile(A,[0.2 0.4 0.6 0.8])