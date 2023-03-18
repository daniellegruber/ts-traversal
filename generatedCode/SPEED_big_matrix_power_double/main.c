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
	int iterations = 1;
	double exponent = 20.48;
	int size = 1000 * 1000;
	int ndim1 = 2;
	int dim1[2] = {1000,1000};
	Matrix * tmp1 = onesM(ndim1, dim1);
	Matrix * a = tmp1;
	double* lhs_data1 = i_to_d(a);
	for (int n = 1; n <= size; ++ n) {
		int tmp2 = pow(n, 2);
		int tmp4 = pow(n, 2);
		double tmp3 = tmp4 + 0.5;
		int idx1 = convertSubscript(ndim1, dim1, n);
		lhs_data1[idx1] = tmp3;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 1);
	writeM(mat1, size1, lhs_data1);
	for (int i = 1; i <= iterations; ++ i) {
		Matrix * tmp5 = mpowerM(mat1, &exponent, 1);
		Matrix * c = tmp5;
		//disp(c);
	
	}
	return 0;
}
