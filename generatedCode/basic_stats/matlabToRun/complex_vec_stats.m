function complex_vec_stats(fileID, a)
	[greatest, index] = max(a);
	dispArr(fileID, greatest);
	sprintf("max index: %d\n", index);

	[least, index] = min(a);
	dispArr(fileID, least);
	sprintf("min index: %d\n", index);

	[mu, sd] = normfit(fileID, a);
	sprintf("mean: %.3f + %.3fi\n", real(mu), imag(mu));
	sprintf("sd: %.3f + %.3fi\n", real(sd), imag(sd));

	[ahat, bhat] = unifit(fileID, a);
	sprintf("a: %.3f + %.3fi\n", real(ahat), imag(ahat));
	sprintf("b: %.3f + %.3fi\n", real(bhat), imag(bhat));

end