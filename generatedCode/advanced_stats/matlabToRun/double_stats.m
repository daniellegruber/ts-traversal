function double_stats(a)
	fun_qs = [0, -1, 3, 0.2, 0.9, 0.53, 0.75, 1, 0.34, 0.17];

	% Beta PDF
	for i=0:0.05:0.95
		for j=0:0.05:0.95
			disp(betapdf(a, i, j));
		end
	end

	% Exponential PDF
	for lambda=0.05:0.05:4.95
		disp(exppdf(a, lambda));
	end

	% Chi-square PDF
	for n=0.05:0.05:4.95
		sprintf("n = %.3f\n", n);
		disp(chi2pdf(a, n));
	end

	% Gamma PDF
	for i=0.25:0.25:1.75
		for j=0.25:0.25:1.75
			disp(gampdf(a, i, j));
		end
	end

	% Lognormal PDF
	for mu = -2:0.5:5
		for sd=0.5:0.5:5
			disp(lognpdf(a, mu, sd));
		end
	end

	% Normal PDF
	for mu = -2:0.5:5
		for sd=0.5:0.5:5
			disp(normpdf(a, mu, sd));
		end
	end

	% Uniform discrete PDF
	for n=1:9
		sprintf("n = %d\n",n);
		disp(unidpdf(a, n));
	end

end