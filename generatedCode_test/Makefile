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
		eval $(CC) -o check octavec_main.o matrix.o $(CFLAGS) $(LIB) $(INC); \
	done

