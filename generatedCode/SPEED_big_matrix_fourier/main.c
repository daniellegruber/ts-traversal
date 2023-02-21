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
	int iterations = 1;
	int size = 1000;
	int ndim1 = 2;
	int dim1[2] = {1000,1000};
	Matrix * tmp1 = onesM(ndim1, dim1);
	Matrix * a = tmp1;
	complex* lhs_data1 = c_to_c(a);
	for (int n = 1; n <= size; ++ n) {
		for (int m = 1; m <= size; ++ m) {
			complex tmp2 = cpow(((n - 1) * size + m), 2.1);
			int tmp3 = ((n - 1) * size + m) % 7;
			complex tmp5 = cpow(((n - 1) * size + m), 2.1);
			int tmp6 = ((n - 1) * size + m) % 7;
			complex tmp4 = tmp5 + 0.5 + tmp6;
			lhs_data1[(m-1) + (n-1)*1000 + (1-1)*1000*1000 + (1-1)*1000*1000*1] = tmp4;
		
		}
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 2);
	writeM(mat1, size1, lhs_data1);
	for (int i = 1; i <= iterations; ++ i) {
		Matrix * tmp7 = fftM(mat1);
		Matrix * b = tmp7;
	
	}
	return 0;
}
