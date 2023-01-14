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
		echo $$fulldir; \
		cd $$fulldir; \
		eval $(CC) -c -o main.o main.c $(CFLAGS) $(LIB) $(INC); \
		eval $(CC) -c -o octavec_main.o octavec_main.c $(CFLAGS) $(LIB) $(INC); \
		eval $(CC) -c -o matrix.o $$OCTAVEC/matrix.c $(CFLAGS) $(LIB) $(INC); \
		eval $(CC) -o test main.o matrix.o $(CFLAGS) $(LIB) $(INC); \
		eval $(CC) -o check octavec_main.o matrix.o $(CFLAGS) $(LIB) $(INC); \
	done

