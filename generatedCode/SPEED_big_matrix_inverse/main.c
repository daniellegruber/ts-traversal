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
	for (int iter1 = 1; iter1 <= size; ++ iter1) {
		for (int iter2 = 1; iter2 <= size; ++ iter2) {
			complex tmp2 = cpow(((iter1 - 1) * size + iter2), 2.1);
			int tmp3 = ((iter1 - 1) * size + iter2) % 7;
			complex tmp5 = cpow(((iter1 - 1) * size + iter2), 2.1);
			int tmp6 = ((iter1 - 1) * size + iter2) % 7;
			complex tmp4 = tmp5 + 0.5 + tmp6;
			lhs_data1[(iter2-1) + (iter1-1)*1000 + (1-1)*1000*1000 + (1-1)*1000*1000*1] = tmp4;
		
		}
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter3 = 0 ; iter3 < ndim1; iter3++)
	{
		size1 *= dim1[iter3];
	}
	Matrix *mat1 = createM(ndim1, dim1, 2);
	writeM(mat1, size1, lhs_data1);
	for (int iter4 = 1; iter4 <= iterations; ++ iter4) {
		Matrix * tmp7 = invertM(mat1);
		Matrix * b = tmp7;
	
	}
	return 0;
}
