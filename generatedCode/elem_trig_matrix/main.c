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
	//int_test
	int exponent = 3;
	int ndim1 = 2;
	int dim1[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	Matrix * a = tmp1;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp2 = pow((-1), (i + 1));
		int d0_1 = i % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (i - d0_1)/3 + 1;
		int tmp4 = pow((-1), (i + 1));
		int tmp3 = (tmp4) * (i - 1);
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp3;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp5 = transposeM(mat1);
	a = tmp5;
	printM(a);
	Matrix * tmp6 = sinM(a);
	printM(tmp6);
	Matrix * tmp7 = sindM(a);
	printM(tmp7);
	Matrix * tmp8 = cosM(a);
	printM(tmp8);
	Matrix * tmp9 = cosdM(a);
	printM(tmp9);
	Matrix * tmp10 = tanM(a);
	printM(tmp10);
	Matrix * tmp11 = tandM(a);
	printM(tmp11);
	//double_test
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp12 = zerosM(ndim2, dim2);
	a = tmp12;
	for (int i = 1; i <= 9; ++ i) {
		int tmp13 = pow((-1), (i + 1));
		int d0_2 = i % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (i - d0_2)/3 + 1;
		int tmp15 = pow((-1), (i + 1));
		double tmp14 = (tmp15) * (i + 0.4);
		lhs_data1[(d1_2-1) + (d0_2-1) * 3] = tmp14;
	
	}
	Matrix * tmp16 = transposeM(a);
	a = tmp16;
	printM(a);
	Matrix * tmp17 = sinM(a);
	printM(tmp17);
	Matrix * tmp18 = sindM(a);
	printM(tmp18);
	Matrix * tmp19 = cosM(a);
	printM(tmp19);
	Matrix * tmp20 = cosdM(a);
	printM(tmp20);
	Matrix * tmp21 = tanM(a);
	printM(tmp21);
	Matrix * tmp22 = tandM(a);
	printM(tmp22);
	//complex_test
	exponent = 1.2;
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp23 = zerosM(ndim3, dim3);
	a = tmp23;
	for (int i = 1; i <= 9; ++ i) {
		int d0_3 = i % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (i - d0_3)/3 + 1;
		complex tmp24 = i + 0.5*I;
		lhs_data1[(d1_3-1) + (d0_3-1) * 3] = tmp24;
	
	}
	Matrix * tmp25 = transposeM(a);
	a = tmp25;
	printM(a);
	Matrix * tmp26 = sinM(a);
	printM(tmp26);
	Matrix * tmp27 = sindM(a);
	printM(tmp27);
	Matrix * tmp28 = cosM(a);
	printM(tmp28);
	Matrix * tmp29 = cosdM(a);
	printM(tmp29);
	Matrix * tmp30 = tanM(a);
	printM(tmp30);
	Matrix * tmp31 = tandM(a);
	printM(tmp31);
	return 0;
}
