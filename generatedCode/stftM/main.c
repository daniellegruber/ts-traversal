//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "./main.h"

// Function declarations
void fourier_vec_script(int a);

// Entry-point function
int main(void) {

	//more off
	//format short
	//source octaveIncludes.m;
	//row_vectors_i
	int a= -4;
	5;
	printf("\n%d\n", a);
	fourier_vec_script(a);
	// %row_vectors_d
	// a = -4:0.5:1.5;
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

void fourier_vec_script(int a) {
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		for (int iter2 = 1; iter2 <= 9; ++ iter2) {
			for (int iter3 = 2; iter3 <= 9; ++ iter3) {
				for (int iter4 = 1; iter4 <= 3; ++ iter4) {
					printf("win_size: %d, inc: %d, num_coef: %d, win_type: %d\n", iter1, iter2, iter3, iter4);
					int ndim1= 1;
					int dim1= {1};
					Matrix * tmp1= stftV(a, 80, 24, 64, 1);
					Matrix * y= tmp1;
					double * tmp2 = d_to_d(y);
					printf("\n%f\n", tmp2[0]);
				
				}
			
			}
		
		}
	
	}
}