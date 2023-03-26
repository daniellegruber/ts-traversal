//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

// Function declarations
void fourier_vec_script(Matrix * a);

// Entry-point function
int main(void) {

	//more off
	//format short
	//source octaveIncludes.m;
	//row_vectors_i
	int vec1[10];
	
	for (int iter5 = 0; -4 + 1*iter5 <= 5; iter5++) {
		vec1[iter5] = -4 + 1*iter5;
	}
	
	int ndim1 = 2;
	int dim1[2] = {1,10};
	Matrix * a = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 10*sizeof(*input1));
	for (int iter6 = 0; iter6 < 10; iter6++) {
	   input1[0 + iter6] = vec1[iter6];
	}
	writeM( a, 10, input1);
	free(input1);
	
	printM(a);
	fourier_vec_script(a);
	// %row_vectors_d
	// a = [-4:0.5:1.5];
	// disp(a);
	// fourier_vec_script(a);
	// %row_vectors_c
	// a = zeros(1,100);
	// for i=1:100
	// 	a(i) = 101-i + (i-1)*1i;
	// end
	// disp(a);
	// fourier_vec_script(a);
	// %column_vectors_i
	// a = [-4:5].';
	// disp(a);
	// fourier_vec_script(a);
	// %column_vectors_d
	// a = [-4:0.5:1.5].';
	// disp(a);
	// fourier_vec_script(a);
	// %column_vectors_c
	// a = zeros(100,1);
	// for i=1:100
	// 	a(i) = 101-i + (i-1)*1i;
	// end
	// disp(a);
	// fourier_vec_script(a);
	return 0;
}


// Subprograms
	
void fourier_vec_script(Matrix * a) {
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		for (int iter2 = 1; iter2 <= 9; ++ iter2) {
			for (int iter3 = 2; iter3 <= 9; ++ iter3) {
				for (int iter4 = 1; iter4 <= 3; ++ iter4) {
					printf("win_size: %d, inc: %d, num_coef: %d, win_type: %d\n", iter1, iter2, iter3, iter4);
					Matrix * tmp1 = stftV(a, 80, 24, 64, 1);
					Matrix * y = tmp1;
					printM(y);
				
				}
			
			}
		
		}
	
	}
}