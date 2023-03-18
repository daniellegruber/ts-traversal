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
	Matrix * tmp1 = onesM(ndim1, dim1);
	printM(tmp1);
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp2 = zerosM(ndim2, dim2);
	Matrix * a = tmp2;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_1 = i % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (i - d0_1)/3 + 1;
		int tmp3 = i;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp3;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim2; iter1++)
	{
		size1 *= dim2[iter1];
	}
	Matrix *mat1 = createM(ndim2, dim2, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp4 = transposeM(mat1);
	a = tmp4;
	printM(a);
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp5 = zerosM(ndim3, dim3);
	Matrix * b = tmp5;
	complex* lhs_data2 = i_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_2 = i % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (i - d0_2)/3 + 1;
		complex tmp6 = i + i * 1*I;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp6;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim3; iter2++)
	{
		size2 *= dim3[iter2];
	}
	Matrix *mat2 = createM(ndim3, dim3, 2);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp7 = transposeM(mat2);
	b = tmp7;
	printM(b);
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp8 = onesM(ndim4, dim4);
	int scalar1 = 2;
	Matrix * tmp9 = scaleM(tmp8, &scalar1, 0);
	printM(tmp9);
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp10 = onesM(ndim5, dim5);
	double scalar2 = 2.1;
	Matrix * tmp11 = scaleM(tmp10, &scalar2, 1);
	printM(tmp11);
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp12 = onesM(ndim6, dim6);
	complex scalar3 = (2.1 + 1*I);
	Matrix * tmp13 = scaleM(tmp12, &scalar3, 2);
	printM(tmp13);
	int scalar4 = 2;
	Matrix * tmp14 = scaleM(a, &scalar4, 0);
	printM(tmp14);
	double scalar5 = 2.1;
	Matrix * tmp15 = scaleM(a, &scalar5, 1);
	printM(tmp15);
	complex scalar6 = (2.1 + 1*I);
	Matrix * tmp16 = scaleM(a, &scalar6, 2);
	printM(tmp16);
	int scalar7 = 2;
	Matrix * tmp17 = scaleM(b, &scalar7, 2);
	printM(tmp17);
	double scalar8 = 2.1;
	Matrix * tmp18 = scaleM(b, &scalar8, 2);
	printM(tmp18);
	complex scalar9 = (2.1 + 1*I);
	Matrix * tmp19 = scaleM(b, &scalar9, 2);
	printM(tmp19);
	//disp(2*INT_MAX*ones(3));
	//disp(2*INT_MIN*ones(3));
	return 0;
}
