OCTAVEC=/home/dlg59/project/Halo-Algorithm/OctaveC

INC = -I. -I${OCTAVEC} -I${EBROOTOPENBLAS}/include -I${EBROOTFFTW}
LIB = -L${EBROOTOPENBLAS}/lib -L${EBROOTSCALAPACK}/lib -L${EBROOTFFTW}/lib
VPATH = .:${OCTAVEC}

CC=gcc
CFLAGS = -lm -lopenblas -lscalapack -lfftw3
DEPS = main.h

# Compile automatically generated main file from tstraversal
OBJ = main.o matrix.o 
# Also compile test from octavec to compare and check output
OBJ2 = octavec_main.o matrix.o 

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS) $(LIB) $(INC)

test: $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS) $(LIB) $(INC)
	
check: $(OBJ2)
	$(CC) -o $@ $^ $(CFLAGS) $(LIB) $(INC)
	
hey: $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS) $(LIB) $(INC)
	
#compare:
#	diff -wi <(./$$octave_main.c          2>/dev/null | sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | tr -s ' \t\n' | sed -z 's/\n/ \n/g' | sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g') \
#			<(octave -q $$dd_matrix_multiplication.m 2>/dev/null | sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | tr -s ' \t\n' | sed -z 's/\n/ \n/g' | sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g')&&\
#	echo -e "\e[1;32mSUCCESS\e[0m : $$octave_main.c"||\
#	echo -e "\e[1;31mDIFF ERROR\e[0m : $$octave_main.c";\
	
tests := $(shell ls *.c | sed 's/\.c//g')
objects := $(shell ls *.c | sed 's/\.c/.o/g')
mfiles := $(shell ls *.m)

# tests := $(shell ls [^SPEED]*/*.c | sed 's/\.c//g')
# objects := $(shell ls [^SPEED]*/*.c | sed 's/\.c/.o/g')

MATRIX_SOURCES = matrix.o
VALGRIND_LOUD = valgrind -v -s --leak-check=full --show-leak-kinds=all --track-origins=yes --error-exitcode=22
VALGRIND_QUIET = valgrind -q --leak-check=full --show-leak-kinds=all --track-origins=yes --error-exitcode=22

$(tests): %: ${MATRIX_SOURCES} %.o
	@VALGRIND=$(shell ${CC} ${CFLAGS} ${INCLUDES} -o $@ $^ && ${VALGRIND_QUIET} ./$@ >/dev/null 2>&1)
	@if [ $(.SHELLSTATUS) -eq 22 ]; \
	then echo -e "\e[1;31mVALGRIND ERROR\e[0m : $@";\
	else \
		diff -wi <(./$@          2>/dev/null | sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | tr -s ' \t\n' | sed -z 's/\n/ \n/g' | sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g') \
				<(matlab -nojvm -nodisplay -nosplash < $@.m 2>/dev/null | sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | tr -s ' \t\n' | sed -z 's/\n/ \n/g' | sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g')&&\
		echo -e "\e[1;32mSUCCESS\e[0m : $@"||\
		echo -e "\e[1;31mDIFF ERROR\e[0m : $@";\
	fi;

hello1: $(tests)
	@for tst in $(tests) ; do \
		echo $$tst; \
	done
	
hello2: $(objects)
	@for obj in $(objects) ; do \
		echo $$obj; \
	done
	
hello3: $(mfiles)
	@for mfile in $(mfiles) ; do \
		echo $$mfile; \
	done
	
runmatlab: $(mfiles)
	for mfile in $(mfiles) ; do \
		matlab -nojvm -nodisplay -nosplash < $$mfile; \
	done
	
#$(objects): %.o: %.c %.m ${MATRIX_SOURCES}


compare1: $(tests)
	@for tst in $(tests) ; do \
		diff -wi <(./$$tst          2>/dev/null | sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | tr -s ' \t\n' | sed -z 's/\n/ \n/g' | sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g') \
				<(matlab -nojvm -nodisplay -nosplash < $$tst.m 2>/dev/null | sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | tr -s ' \t\n' | sed -z 's/\n/ \n/g' | sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g')&&\
		echo -e "\e[1;32mSUCCESS\e[0m : $$tst"||\
		echo -e "\e[1;31mDIFF ERROR\e[0m : $$tst";\
	done;
	
compare2: $(tests)
	@for tst in $(tests) ; do \
		diff -wi <(./main       	2>/dev/null | sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | tr -s ' \t\n' | sed -z 's/\n/ \n/g' | sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g') \
				 <(./octavec_main	2>/dev/null | sed -z 's/-nan/inf/gi' | sed -z 's/nan/inf/gi' | sed -z 's/\.000000//g' | sed -z 's/\.00000//g' | sed -z 's/\.0000//g' | tr -s ' \t\n' | sed -z 's/\n/ \n/g' | sed -z -E 's/-\s*(0+(\.0+)?(-|\+|\s))/\1/g' | sed -z -E 's/-\s*(0+(\.0+)?i)/+\1/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g' | sed -z -E 's/(\.[[:digit:]]+)0+(\-|\+|i|\s|\n)/\1\2/g')&&\
		echo -e "\e[1;32mSUCCESS\e[0m : $$tst"||\
		echo -e "\e[1;31mDIFF ERROR\e[0m : $$tst";\
	done;	


