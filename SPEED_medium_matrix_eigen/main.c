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
	int size = 100;
	int ndim1 = 2;
	int dim1[2] = {100,100};
	Matrix * tmp1 = onesM(ndim1, dim1);
	Matrix * a = tmp1;
	complex* lhs_data1 = i_to_c(a);
	for (int n = 1; n <= size; ++ n) {
		for (int m = 1; m <= size; ++ m) {
			complex tmp2 = cpow(((n - 1) * size + m), 2.1);
			int tmp3 = ((n - 1) * size + m) % 7;
			complex tmp5 = cpow(((n - 1) * size + m), 2.1);
			int tmp6 = ((n - 1) * size + m) % 7;
			complex tmp4 = tmp5 + 0.5 + tmp6;
			lhs_data1[(m-1) + (n-1)*100 + (1-1)*100*100 + (1-1)*100*100*1] = tmp4;
		
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
		complex complex_one = 1;
		Matrix * V1 = NULL;
		Matrix * lambda1 = NULL;
		Matrix * evals1 = NULL;
		Matrix * evecs1 = NULL;
		eigM(mat1, &evals1, &evecs1);
		lambda1 = scaleM(evals1, &complex_one, COMPLEX);
		V1 = scaleM(evecs1, &complex_one, COMPLEX);
	
	}
	return 0;
}
