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
	
	Matrix * tmp1 = transposeM(a);
	Matrix * a_trans = tmp1;
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
		double tmp3 = cimag(tmp2);
		int ndim2 = 1;
		int dim2[1] = {1};
		int scalar1 = 0;
		Matrix * tmp4 = scaleM(onesM(ndim2, dim2), &scalar1, 0);
		if (tmp3 < tmp4) {
			int d0_2 = iter1 % 3;
			if (d0_2 == 0) {
				d0_2 = 3;
			}
			int d1_2 = (iter1 - d0_2)/3 + 1;
			double tmp6 = creal(tmp2);
			int d0_3 = iter1 % 3;
			if (d0_3 == 0) {
				d0_3 = 3;
			}
			int d1_3 = (iter1 - d0_3)/3 + 1;
			double tmp8 = cimag(tmp2);
			printf("%.5f  %.5fi  \n", tmp6, tmp8);
			
			} else {
			int d0_4 = iter1 % 3;
			if (d0_4 == 0) {
				d0_4 = 3;
			}
			int d1_4 = (iter1 - d0_4)/3 + 1;
			double tmp10 = creal(tmp2);
			int d0_5 = iter1 % 3;
			if (d0_5 == 0) {
				d0_5 = 3;
			}
			int d1_5 = (iter1 - d0_5)/3 + 1;
			double tmp12 = cimag(tmp2);
			printf("%.5f + %.5fi  \n", tmp10, tmp12);
			
		
		}
	
	}
	for (int iter2 = 1; iter2 <= 3; ++ iter2) {
		for (int iter3 = 1; iter3 <= 3; ++ iter3) {
			complex tmp13;
			indexM(a, &tmp13, 2, iter2, iter3);
			double tmp14 = cimag(tmp13);
			int ndim3 = 1;
			int dim3[1] = {1};
			int scalar2 = 0;
			Matrix * tmp15 = scaleM(onesM(ndim3, dim3), &scalar2, 0);
			if (tmp14 < tmp15) {
				double tmp17 = creal(tmp13);
				double tmp19 = cimag(tmp13);
				printf("%.5f  %.5fi  \n", tmp17, tmp19);
				
				} else {
				double tmp21 = creal(tmp13);
				double tmp23 = cimag(tmp13);
				printf("%.5f + %.5fi  \n", tmp21, tmp23);
				
			
			}
		
		}
	
	}
	return 0;
}
