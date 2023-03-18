function complex_stats(a)
	fun_qs = [0, 0.2, 0.9, 0.53, 0.75, 1, 0.34, 0.17];

	disp(mean(a));
	disp(var(a));
	disp(var(a,1));
	disp(std(a));
	disp(std(a,1));
	disp(sort(a));
	disp(sort(a, "descend"));
	disp(median(a));
	disp(min(a));
	disp(max(a));
	%disp(quantile(a, 4));
	%disp(quantile(a, fun_qs));
end