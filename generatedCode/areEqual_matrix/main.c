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
	// trueTest
	int ndim1 = 2;
	int dim1[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	Matrix * a = tmp1;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_1 = i % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (i - d0_1)/3 + 1;
		int tmp2 = i * i;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp2;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp3 = transposeM(mat1);
	a = tmp3;
	printM(a);
	Matrix * b = a;
	printM(b);
	Matrix * c = a;
	printM(c);
	Matrix * d = a;
	printM(d);
	Matrix * tmp4 = equalM(a, b);
	Matrix * tmp5 = equalM(a, c);
	Matrix * tmp6 = andM((tmp4), (tmp5));
	Matrix * tmp7 = equalM(a, d);
	Matrix * tmp8 = andM(tmp6, (tmp7));
	printM(tmp8);
	// falseTest
	printM(a);
	printM(b);
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp9 = zerosM(ndim2, dim2);
	c = tmp9;
	int* lhs_data2 = i_to_i(c);
	for (int i = 1; i <= 9; ++ i) {
		int d0_2 = i % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (i - d0_2)/3 + 1;
		int tmp10 = i * i;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp10;
	
	}
	int tmp11 = 10;
	lhs_data2[3] = tmp11;
	int tmp12 = 11;
	lhs_data2[6] = tmp12;
	int tmp13 = 12;
	lhs_data2[7] = tmp13;
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp14 = transposeM(mat2);
	c = tmp14;
	printM(c);
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp15 = zerosM(ndim3, dim3);
	d = tmp15;
	int* lhs_data3 = i_to_i(d);
	for (int i = 1; i <= 9; ++ i) {
		int d0_6 = i % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (i - d0_6)/3 + 1;
		int tmp16 = i * i;
		lhs_data3[(d1_6-1) + (d0_6-1) * 3] = tmp16;
	
	}
	int tmp17 = 13;
	lhs_data3[1] = tmp17;
	int tmp18 = 14;
	lhs_data3[2] = tmp18;
	int tmp19 = 15;
	lhs_data3[5] = tmp19;
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim3; iter3++)
	{
		size3 *= dim3[iter3];
	}
	Matrix *mat3 = createM(ndim3, dim3, 0);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp20 = transposeM(mat3);
	d = tmp20;
	printM(d);
	Matrix * tmp21 = equalM(a, b);
	Matrix * tmp22 = equalM(a, c);
	Matrix * tmp23 = andM((tmp21), (tmp22));
	Matrix * tmp24 = equalM(a, d);
	Matrix * tmp25 = andM(tmp23, (tmp24));
	printM(tmp25);
	return 0;
}
