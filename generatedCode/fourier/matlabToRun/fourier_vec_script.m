function fourier_vec_script(a)

	for i=1:20
		disp(fft(a,i));
		disp(ifft(a,i));
	end

end