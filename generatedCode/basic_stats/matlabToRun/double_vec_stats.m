function double_vec_stats(fileID, a)
	[greatest, index] = max(a);
	dispArr(fileID, greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	dispArr(fileID, least);
	sprintf("min index: %d\n", index);

	[mu, sd] = normfit(fileID, a);
	sprintf("mean: %.3f\n", mu);
	sprintf("sd: %.3f\n", sd);

	[ahat, bhat] = unifit(fileID, a);
	sprintf("a: %.3f\n", ahat);
	sprintf("b: %.3f\n", bhat);
end