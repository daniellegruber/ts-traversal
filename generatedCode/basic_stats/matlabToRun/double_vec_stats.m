function double_vec_stats(a)
	[greatest, index] = max(a);
	disp(greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	disp(least);
	sprintf("min index: %d\n", index);

	[mu, sd] = normfit(a);
	sprintf("mean: %.3f\n", mu);
	sprintf("sd: %.3f\n", sd);

	[ahat, bhat] = unifit(a);
	sprintf("a: %.3f\n", ahat);
	sprintf("b: %.3f\n", bhat);
end