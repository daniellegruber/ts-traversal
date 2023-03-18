//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
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
	for (int i = 1; i <= 9; ++ i) {
		// Octave is natively column-major matrix storage, but C is row-major
		// So when iterating over a matrix flatly (i.e., not calling dimensions), you must transpose
		int tmp_ndim1 = getnDimM(a_trans);
		int *tmp_dim1 = getDimsM(a_trans);
		int idx1 = convertSubscript(ndim1, dim1, i);
		complex tmp2;
		indexM(a_trans, &tmp2, 1, idx1+1);
		double tmp3 = cimag(tmp2);
		if (tmp3 < 0) {
			int idx2 = convertSubscript(ndim1, dim1, i);
			double tmp5 = creal(tmp2);
			int idx3 = convertSubscript(ndim1, dim1, i);
			double tmp7 = cimag(tmp2);
			printf("%.5f  %.5fi  \n", tmp5, tmp7);
			
			} else {
			int idx4 = convertSubscript(ndim1, dim1, i);
			double tmp9 = creal(tmp2);
			int idx5 = convertSubscript(ndim1, dim1, i);
			double tmp11 = cimag(tmp2);
			printf("%.5f + %.5fi  \n", tmp9, tmp11);
			
		
		}
	
	}
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 3; ++ j) {
			complex tmp12;
			indexM(a, &tmp12, 2, i, j);
			double tmp13 = cimag(tmp12);
			if (tmp13 < 0) {
				double tmp15 = creal(tmp12);
				double tmp17 = cimag(tmp12);
				printf("%.5f  %.5fi  \n", tmp15, tmp17);
				
				} else {
				double tmp19 = creal(tmp12);
				double tmp21 = cimag(tmp12);
				printf("%.5f + %.5fi  \n", tmp19, tmp21);
				
			
			}
		
		}
	
	}
	return 0;
}
