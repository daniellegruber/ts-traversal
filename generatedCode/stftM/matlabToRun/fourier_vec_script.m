function fourier_vec_script(a)

	for win_size=1:9
		for inc=1:9
			for num_coef=2:9
				for win_type=1:3
					sprintf("win_size: %d, inc: %d, num_coef: %d, win_type: %d\n", win_size, inc, num_coef, win_type);
					y = stft(a, win_size, inc, num_coef, win_type);
					disp(y);
				end
			end
		end
	end
end