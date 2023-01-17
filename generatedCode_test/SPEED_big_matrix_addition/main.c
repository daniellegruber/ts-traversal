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
	int iterations= 1;
	int size= 1000 * 1000;
	int ndim1= 2;
	int dim1[2]= {1000,1000};
	Matrix * a= onesM(ndim1, dim1);
	int ndim2= 2;
	int dim2[2]= {1000,1000};
	Matrix * b= onesM(ndim2, dim2);
	double* lhs_data1 = d_to_d(a);
	for (int iter1 = 1; iter1 <= size; ++ iter1) {
		int tmp1= pow(iter1, 2);
		int d0_1 = iter1 % 1000;
		if (d0_1 == 0) {
			d0_1 = 1000;
		}
		int d1_1 = (iter1 - d0_1)/1000 + 1;
		int tmp3= pow(iter1, 2);
		double tmp2= tmp3 + 0.5;
		lhs_data1[(d1_1-1) + (d0_1-1)000] = tmp2;
		int tmp4= pow(iter1, 2);
		int d0_2 = iter1 % 1000;
		if (d0_2 == 0) {
			d0_2 = 1000;
		}
		int d1_2 = (iter1 - d0_2)/1000 + 1;
		int tmp6= pow(iter1, 2);
		double tmp5= (tmp6 + 0.5) * i;
		lhs_data1[(d1_2-1) + (d0_2-1)000] = tmp5;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size1 *= dim2[iter2];
	}
	Matrix *mat1 = createM(ndim2, dim2, 1);
	writeM(mat1, size1, lhs_data1);
	for (int iter3 = 1; iter3 <= iterations; ++ iter3) {
		Matrix * tmp7= plusM(b, mat1);
		Matrix * c= tmp7;
		//disp(c);
	
	}
	return 0;
}
