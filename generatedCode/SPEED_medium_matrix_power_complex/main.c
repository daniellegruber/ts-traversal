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
	double exponent = 20.48 + I;
	int size = 100 * 100;
	int ndim1 = 2;
	int dim1[2] = {100,100};
	Matrix * tmp1 = onesM(ndim1, dim1);
	Matrix * a = tmp1;
	double* lhs_data1 = d_to_d(a);
	for (int iter1 = 1; iter1 <= size; ++ iter1) {
		int tmp2 = pow(iter1, 2);
		int d0_1 = iter1 % 100;
		if (d0_1 == 0) {
			d0_1 = 100;
		}
		int d1_1 = (iter1 - d0_1)/100 + 1;
<<<<<<< HEAD
		int tmp4 = pow(iter1, 2);
		double tmp3 = tmp4 + 0.5;
=======
		int tmp4= pow(iter1, 2);
		double tmp3= tmp4 + 0.5;
>>>>>>> 97db0fcb01c01fa4c840575d4d54ea867c46ec4f
		lhs_data1[(d1_1-1) + (d0_1-1) * 100] = tmp3;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim1; iter2++)
	{
		size1 *= dim1[iter2];
	}
	Matrix *mat1 = createM(ndim1, dim1, 1);
	writeM(mat1, size1, lhs_data1);
	for (int iter3 = 1; iter3 <= iterations; ++ iter3) {
<<<<<<< HEAD
		Matrix * tmp5 = mpowerM(mat1, &exponent, 1);
		Matrix * c = tmp5;
=======
		Matrix * tmp5= mpowerM(mat1, &exponent, 1);
		Matrix * c= tmp5;
>>>>>>> 97db0fcb01c01fa4c840575d4d54ea867c46ec4f
		//disp(c);
	
	}
	return 0;
}
