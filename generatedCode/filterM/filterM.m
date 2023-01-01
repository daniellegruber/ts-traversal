%more off
%format short

%source octaveIncludes.m;

matrices = cell(12,1);

matrices{1} = zeros(1,10);
matrices{1}(1) = 1;
matrices{2} = ones(20,1);
matrices{3} = ones(1,10);
matrices{4} = (4.5 - 0.5i)*ones(20,1);

matrices{5} = zeros(1,10);
for i=1:10
	matrices{5}(i) = i;
end
matrices{5} = matrices{5};


matrices{6} = zeros(1,10);
for i=1:10
	matrices{6}(i) = i*i+0.5;
end
matrices{6} = matrices{6};


matrices{7} = ones(20,1);
for i=1:20
	matrices{7}(i) = i*i+0.5i;
end
matrices{7} = matrices{7};


matrices{8} = ones(20,1);
for i=1:20
	matrices{8}(i) = (i-5)*i;
end
matrices{8} = matrices{8};


matrices{9} = ones(20,1);
for i=1:20
	matrices{9}(i) = (i-8.5)*i+0.5;
end
matrices{9} = matrices{9};

matrices{10} = zeros(1,10);
for i=1:10
	matrices{10}(i) = (i-5.5)*(i)+((0.5)*(4-i))*1i;
end
matrices{10} = matrices{10};

matrices{11} = [3,-2,0,   4,-1,0,   0,0,1, 2.5];

matrices{12} = [3,-2,0,   4,-1,0,   0,0,1, 2.5];

matrices{13} = [1,2,3,4,5];


for i=1:13
	disp('b\n');
	disp(matrices{i});

	for j=1:13
		disp('\na\n');
		disp(matrices{j});

		for k=1:13
			disp('\nx\n');
			disp(matrices{k});
			%sprintf(stdout, '\n');
			disp("\n");
			y = filter(matrices{i}, matrices{j}, matrices{k});
			%[y, sf] = filter(matrices{i}, matrices{j}, matrices{k});
			disp(y);
			%sprintf(stdout, '\n');
			%disp(sf);
		end

	end
end
