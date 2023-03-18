function double_vec_stats(a)
	[greatest, index] = max(a);
	disp(greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	disp(least);
	sprintf("min index: %d\n", index);

	for i=least:0.5:greatest
		sprintf("mu: %.3f\n", i);
		[h, pval, ci, stats] = ttest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, ci(1), ci(2), stats.tstat, stats.df, stats.sd);

		[h, pval, ci, z, zcrit] = ztest(a, i, std(a, 0, 1));
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\nzcrit: %.3f\n", h, pval, ci(1), ci(2), z, zcrit);
	end

	for i=(var(a, 0, 1)-5):1.0:(var(a, 0, 1)+5)
		sprintf("v: %.3f\n", i);
		[h, pval, ci, stats] = vartest(a, i);
		% sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df);
		% sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df);
	end
end