#tests
OCTAVEC=/home/dlg59/project/Halo-Algorithm/OctaveC

INC = -I. -I${OCTAVEC} -I${EBROOTOPENBLAS}/include -I${EBROOTFFTW}
LIB = -L${EBROOTOPENBLAS}/lib -L${EBROOTSCALAPACK}/lib -L${EBROOTFFTW}/lib
VPATH = .:${OCTAVEC}

CC=gcc
CFLAGS = -lm -lopenblas -lscalapack -lfftw3

dirs := $(shell ls -d */)
all: $(dirs)
	@for dir in $(dirs) ; do \
		fulldir="$(shell pwd)/$$dir"; \
		dir=$${dir//\//}; \
		echo $$dir; \
		cd $$fulldir; \
		mfiles=$$(ls *.m); \
		srcs=$$(echo "$$mfiles" | sed "s/$$dir/main/" | sed "s/.m//"); \
		objects=$$(echo "$$mfiles" | sed "s/$$dir/main/" | sed "s/.m/.o/"); \
		for src in $$srcs; do \
			echo $$src; \
			eval $(CC) -c -o $$src.o $$src.c $(CFLAGS) $(LIB) $(INC); \
		done; \
		eval $(CC) -c -o octavec_main.o octavec_main.c $(CFLAGS) $(LIB) $(INC); \
		eval $(CC) -c -o matrix.o $$OCTAVEC/matrix.c $(CFLAGS) $(LIB) $(INC); \
		eval $(CC) -o test $$objects matrix.o $(CFLAGS) $(LIB) $(INC); \
		if [ -f "octavec_main.c" ]; then \
			eval $(CC) -o check octavec_main.o matrix.o $(CFLAGS) $(LIB) $(INC); \
		else \
			echo "Custom test"; \
		fi \
	done; \
	
copyall:
	mfiles=$$(find $$OCTAVEC/tests_C_Octave -type f -name "*.m"); \
	cd $$TS_TRAVERSAL; \
	for mfile in $$mfiles; do \
		filename=$$(basename -- "$$mfile"); \
		filename="$${filename%.*}"; \
		if [ ! -d "$(shell pwd)/$$filename" ]; then \
			echo $$filename; \
			eval npx ts-node cleanUp.ts $$filename.m $$TS_TRAVERSAL; \
		fi \
	done; \
	
genall:
	mfiles=$$(find $$OCTAVEC/tests_C_Octave -type f -name "*.m"); \
	cd $$TS_TRAVERSAL; \
	for mfile in $$mfiles; do \
		filename=$$(basename -- "$$mfile"); \
		filename="$${filename%.*}"; \
		if [ ! -f "$(shell pwd)/$$filename/main.c" ]; then \
			echo $$filename; \
			eval npx ts-node index.ts generatedCode_test/$$filename/$$filename.m $$TEST $$TS_TRAVERSAL 0 0; \
		fi \
	done; \
	
regenall:
	mfiles=$$(find $(shell pwd) -type f -name "*.m"); \
	cd $$TS_TRAVERSAL; \
	for mfile in $$mfiles; do \
		filename=$$(basename -- "$$mfile"); \
		filename="$${filename%.*}"; \
		echo $$filename; \
		eval npx ts-node index.ts generatedCode_test/$$filename/$$filename.m $$TEST $$TS_TRAVERSAL 0 0; \
	done; \
	
runmatlab:
	mfiles=$$(find $(shell pwd) -type f -name "*.m"); \
	cd $$TS_TRAVERSAL; \
	for mfile in $$mfiles; do \
		filename=$$(basename -- "$$mfile"); \
		echo $$filename; \
		matlab -nojvm -nodisplay -nosplash < $$mfile; \
	done; \
	
makeone:
	fulldir="$(shell pwd)/$(ARGS)"; \
	cd $$fulldir; \
	mfiles=$$(ls *.m); \
	srcs=$$(echo "$$mfiles" | sed "s/$(ARGS)/main/" | sed "s/.m//"); \
	objects=$$(echo "$$mfiles" | sed "s/$(ARGS)/main/" | sed "s/.m/.o/"); \
	for src in $$srcs; do \
		echo $$src; \
		eval $(CC) -c -o $$src.o $$src.c $(CFLAGS) $(LIB) $(INC); \
	done; \
	eval $(CC) -c -o octavec_main.o octavec_main.c $(CFLAGS) $(LIB) $(INC); \
	eval $(CC) -c -o matrix.o $$OCTAVEC/matrix.c $(CFLAGS) $(LIB) $(INC); \
	eval $(CC) -o test $$objects matrix.o $(CFLAGS) $(LIB) $(INC); \
	if [ -f "octavec_main.c" ]; then \
		eval $(CC) -o check octavec_main.o matrix.o $(CFLAGS) $(LIB) $(INC); \
	else \
		echo "Custom test"; \
	fi \
	
compareone:
	fulldir="$(shell pwd)/$(ARGS)"; \
	cd $$fulldir; \
	(./test 2>/dev/null | \
		sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | \
		sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | \
		tr -s ' \t\n' | sed -z 's/\n/ \n/g' | \
		sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g') > f1; \
	(matlab -nodisplay -nosplash < $(ARGS).m 2>/dev/null | \
		tail -n+10 | sed -z 's/>>//gi' | \
		sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | \
		sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | \
		tr -s ' \t\n' | sed -z 's/\n/ \n/g' | \
		sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | \
		sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g') | \
		sed -z 's/\n\s/\n/gi' | sed -z 's/  \n//gi' > f2; \
	diff -wi f1 f2 && \
		echo -e "\e[1;32mSUCCESS\e[0m : $(ARGS)"||\
		echo -e "\e[1;31mDIFF ERROR\e[0m : $(ARGS)";\