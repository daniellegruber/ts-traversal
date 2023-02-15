//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "./main.h"

// Entry-point function
int main(void) {

	//more off
	//format short
	//source octaveIncludes.m;
	
	int ndim1 = 2;
	int dim1[2] = {3,3};
	Matrix * a = createM(ndim1, dim1, 2);
	complex *input1 = NULL;
	input1 = malloc( 9*sizeof(*input1));
	input1[0] = 0;
	input1[1] = 10;
	input1[2] = 10*I;
	input1[3] = 10.102;
	input1[4] = 10.102 + 0.5*I;
	input1[5] = -12*I;
	input1[6] = -0.0002 - 0.1*I;
	input1[7] = -100.01*I;
	input1[8] = 81;
	writeM( a, 9, input1);
	free(input1);
	
	Matrix * tmp1= transposeM(a);
	Matrix * a_trans= tmp1;
	printM(a);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		// Octave is natively column-major matrix storage, but C is row-major
		// So when iterating over a matrix flatly (i.e., not calling dimensions), you must transpose
		int d0_1 = iter1 % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (iter1 - d0_1)/3 + 1;
		complex tmp2;
		indexM(a_trans, &tmp2, 1, (d1_1) + (d0_1-1) * 3);
		double tmp3= cimag(tmp2);
		if (tmp3 < 0) {
			int d0_2 = iter1 % 3;
			if (d0_2 == 0) {
				d0_2 = 3;
			}
			int d1_2 = (iter1 - d0_2)/3 + 1;
			double tmp5= creal(tmp2);
			int d0_3 = iter1 % 3;
			if (d0_3 == 0) {
				d0_3 = 3;
			}
			int d1_3 = (iter1 - d0_3)/3 + 1;
			double tmp7= cimag(tmp2);
			printf("%.5f  %.5fi  \n", tmp5);
			
			} else {
			int d0_4 = iter1 % 3;
			if (d0_4 == 0) {
				d0_4 = 3;
			}
			int d1_4 = (iter1 - d0_4)/3 + 1;
			double tmp9= creal(tmp2);
			int d0_5 = iter1 % 3;
			if (d0_5 == 0) {
				d0_5 = 3;
			}
			int d1_5 = (iter1 - d0_5)/3 + 1;
			double tmp11= cimag(tmp2);
			printf("%.5f + %.5fi  \n", tmp9);
			
		
		}
	
	}
	for (int iter2 = 1; iter2 <= 3; ++ iter2) {
		for (int iter3 = 1; iter3 <= 3; ++ iter3) {
			complex tmp12;
			indexM(a, &tmp12, 2, iter2, iter3);
			double tmp13= cimag(tmp12);
			if (tmp13 < 0) {
				double tmp15= creal(tmp12);
				double tmp17= cimag(tmp12);
				printf("%.5f  %.5fi  \n", tmp15);
				
				} else {
				double tmp19= creal(tmp12);
				double tmp21= cimag(tmp12);
				printf("%.5f + %.5fi  \n", tmp19);
				
			
			}
		
		}
	
	}
	return 0;
}
