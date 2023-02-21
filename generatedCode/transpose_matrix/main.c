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
	// int_test
	int ndim1 = 2;
	int dim1[2] = {3, 6};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	Matrix * a = tmp1;
	int* lhs_data1 = i_to_i(a);
	int counter = 1;
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 6; ++ j) {
			int tmp2 = counter * counter;
			lhs_data1[(j-1) + (i-1)*6 + (1-1)*3*6 + (1-1)*3*6*1] = tmp2;
			counter = counter + 1;
		
		}
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	printM(mat1);
	Matrix * tmp3 = transposeM(mat1);
	printM(tmp3);
	Matrix * tmp4 = transposeM(mat1);
	Matrix * b = tmp4;
	Matrix * tmp5 = transposeM(b);
	printM(tmp5);
	// double_test
	int ndim2 = 2;
	int dim2[2] = {3, 6};
	Matrix * tmp6 = zerosM(ndim2, dim2);
	a = tmp6;
	counter = 1;
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 6; ++ j) {
			double tmp7 = counter * counter + 0.5;
			lhs_data1[(j-1) + (i-1)*6 + (1-1)*3*6 + (1-1)*3*6*1] = tmp7;
			counter = counter + 1;
		
		}
	
	}
	printM(a);
	Matrix * tmp8 = transposeM(a);
	printM(tmp8);
	Matrix * tmp9 = transposeM(a);
	b = tmp9;
	Matrix * tmp10 = transposeM(b);
	printM(tmp10);
	// complex_test
	int ndim3 = 2;
	int dim3[2] = {3, 6};
	Matrix * tmp11 = zerosM(ndim3, dim3);
	a = tmp11;
	counter = 1;
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 6; ++ j) {
			complex tmp12 = counter * counter + 0.5 - 0.5*I;
			lhs_data1[(j-1) + (i-1)*6 + (1-1)*3*6 + (1-1)*3*6*1] = tmp12;
			counter = counter + 1;
		
		}
	
	}
	printM(a);
	Matrix * tmp13 = transposeM(a);
	printM(tmp13);
	Matrix * tmp14 = transposeM(a);
	b = tmp14;
	Matrix * tmp15 = transposeM(b);
	printM(tmp15);
	// complex_conjugate_test
	int ndim4 = 2;
	int dim4[2] = {3, 6};
	Matrix * tmp16 = zerosM(ndim4, dim4);
	a = tmp16;
	counter = 1;
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 6; ++ j) {
			complex tmp17 = counter * counter + 0.5 - 0.5*I;
			lhs_data1[(j-1) + (i-1)*6 + (1-1)*3*6 + (1-1)*3*6*1] = tmp17;
			counter = counter + 1;
		
		}
	
	}
	printM(a);
	Matrix * tmp18 = ctransposeM(a);
	printM(tmp18);
	Matrix * tmp19 = ctransposeM(a);
	b = tmp19;
	Matrix * tmp20 = ctransposeM(b);
	printM(tmp20);
	return 0;
}
