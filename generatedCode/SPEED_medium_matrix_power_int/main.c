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
	int iterations = 100;
	int exponent = 10;
	int size = 100 * 100;
	int ndim1 = 2;
	int dim1[2] = {100,100};
	Matrix * tmp1 = onesM(ndim1, dim1);
	Matrix * a = tmp1;
	double* lhs_data1 = d_to_d(a);
	for (int n = 1; n <= size; ++ n) {
		int tmp2 = pow(n, 2);
		int d0_1 = n % 100;
		if (d0_1 == 0) {
			d0_1 = 100;
		}
		int d1_1 = (n - d0_1)/100 + 1;
		int tmp4 = pow(n, 2);
		double tmp3 = tmp4 + 0.5;
		lhs_data1[(d1_1-1) + (d0_1-1) * 100] = tmp3;
	
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