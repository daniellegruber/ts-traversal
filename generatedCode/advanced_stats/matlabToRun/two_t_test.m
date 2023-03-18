function two_t_test(a, b)
	[h, pval, ci, stats] = ttest(a, b);
	sprintf("h: %d\npval: %.2f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, stats.tstat, stats.df, stats.sd);
end