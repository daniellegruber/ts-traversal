function complex_vec_stats(a)
	[greatest, index] = max(a);
	disp(greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	disp(least);
	sprintf("min index: %d\n", index);

	[mu, sd] = normfit(a);
	sprintf("mean: %.3f + %.3fi\n", real(mu), imag(mu));
	sprintf("sd: %.3f + %.3fi\n", real(sd), imag(sd));

	[ahat, bhat] = unifit(a);
	sprintf("a: %.3f + %.3fi\n", real(ahat), imag(ahat));
	sprintf("b: %.3f + %.3fi\n", real(bhat), imag(bhat));

end