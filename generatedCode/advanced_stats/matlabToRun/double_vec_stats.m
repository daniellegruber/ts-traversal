function double_vec_stats(fileID, a)
	[greatest, index] = max(a);
	dispArr(fileID, greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	dispArr(fileID, least);
	sprintf("min index: %d\n", index);

	for i=least:0.5:greatest
		sprintf("mu: %.3f\n", i);
		[h, pval, ci, stats] = ttest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, ci(1), ci(2), stats.tstat, stats.df, stats.sd);

		[h, pval, ci, z, zcrit] = ztest(a, i, std(a, 0, 1));
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\nzcrit: %.3f\n", h, pval, ci(1), ci(2), z, zcrit);
	end