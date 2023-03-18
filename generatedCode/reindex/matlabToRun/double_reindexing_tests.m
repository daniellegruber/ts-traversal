function double_reindexing_tests(a)
	a=a.';
	disp([a(1)]);
	disp([a(4)]);
	disp([a(1) ; a(2) ; a(3) ; a(4)]);
	disp([a(4) ; a(3) ; a(2) ; a(1)]);
	disp([a(2) ; a(2) ; a(2)]);
	disp([a(1) ; a(2) ; a(2) ; a(3) ; a(3) ; a(3) ; a(4) ; a(4) ; a(4) ; a(4)]);
end