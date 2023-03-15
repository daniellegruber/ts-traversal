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
	int size = 100 * 100;
	int ndim1 = 2;
	int dim1[2] = {100,100};
	Matrix * tmp1 = onesM(ndim1, dim1);
	Matrix * a = tmp1;
	double* lhs_data1 = d_to_d(a);
	int ndim2 = 2;
	int dim2[2] = {100,100};
	Matrix * tmp2 = onesM(ndim2, dim2);
	Matrix * b = tmp2;
	complex* lhs_data2 = c_to_c(b);
	for (int n = 1; n <= size; ++ n) {
		int tmp3 = pow(n, 2);
		int d0_1 = n % 100;
		if (d0_1 == 0) {
			d0_1 = 100;
		}
		int d1_1 = (n - d0_1)/100 + 1;
		int tmp5 = pow(n, 2);
		double tmp4 = tmp5 + 0.5;
		lhs_data1[(d1_1-1) + (d0_1-1) * 100] = tmp4;
		int tmp6 = pow(n, 2);
		int d0_2 = n % 100;
		if (d0_2 == 0) {
			d0_2 = 100;
		}
		int d1_2 = (n - d0_2)/100 + 1;
		int tmp8 = pow(n, 2);
		complex tmp7 = (tmp8 + 0.5) * 1*I;
		lhs_data2[(d1_2-1) + (d0_2-1) * 100] = tmp7;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim2; iter1++)
	{
		size1 *= dim2[iter1];
	}
	Matrix *mat1 = createM(ndim2, dim2, 1);
	writeM(mat1, size1, lhs_data1);
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 2);
	writeM(mat2, size2, lhs_data2);
	for (int i = 1; i <= iterations; ++ i) {
		Matrix * tmp9 = plusM(mat2, mat1);
		Matrix * c = tmp9;
		//disp(c);
	
	}
	return 0;
}