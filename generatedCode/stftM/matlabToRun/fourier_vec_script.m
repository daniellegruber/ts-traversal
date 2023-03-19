function fourier_vec_script(fileID, a)

	for win_size=1:9
		for inc=1:9
			for num_coef=2:9
				for win_type=1:3
					dispArr(fileID, sprintf("win_size: %d, inc: %d, num_coef: %d, win_type: %d\n", win_size, inc, num_coef, win_type));
					y = stft(a, win_size, inc, num_coef, win_type);
					dispArr(fileID, y);
				end
			end
		end
	end
end