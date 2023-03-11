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
	double* lhs_data2 = d_to_d(a);
	counter = 1;
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 6; ++ j) {
			double tmp7 = counter * counter + 0.5;
			lhs_data2[(j-1) + (i-1)*6 + (1-1)*3*6 + (1-1)*3*6*1] = tmp7;
			counter = counter + 1;
		
		}
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 1);
	writeM(mat2, size2, lhs_data2);
	printM(mat2);
	Matrix * tmp8 = transposeM(mat2);
	printM(tmp8);
	Matrix * tmp9 = transposeM(mat2);
	b = tmp9;
	Matrix * tmp10 = transposeM(b);
	printM(tmp10);
	// complex_test
	int ndim3 = 2;
	int dim3[2] = {3, 6};
	Matrix * tmp11 = zerosM(ndim3, dim3);
	a = tmp11;
	complex* lhs_data3 = c_to_c(a);
	counter = 1;
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 6; ++ j) {
			complex tmp12 = counter * counter + 0.5 - 0.5*I;
			lhs_data3[(j-1) + (i-1)*6 + (1-1)*3*6 + (1-1)*3*6*1] = tmp12;
			counter = counter + 1;
		
		}
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim3; iter3++)
	{
		size3 *= dim3[iter3];
	}
	Matrix *mat3 = createM(ndim3, dim3, 2);
	writeM(mat3, size3, lhs_data3);
	printM(mat3);
	Matrix * tmp13 = transposeM(mat3);
	printM(tmp13);
	Matrix * tmp14 = transposeM(mat3);
	b = tmp14;
	Matrix * tmp15 = transposeM(b);
	printM(tmp15);
	// complex_conjugate_test
	int ndim4 = 2;
	int dim4[2] = {3, 6};
	Matrix * tmp16 = zerosM(ndim4, dim4);
	a = tmp16;
	complex* lhs_data4 = c_to_c(a);
	counter = 1;
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 6; ++ j) {
			complex tmp17 = counter * counter + 0.5 - 0.5*I;
			lhs_data4[(j-1) + (i-1)*6 + (1-1)*3*6 + (1-1)*3*6*1] = tmp17;
			counter = counter + 1;
		
		}
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim4; iter4++)
	{
		size4 *= dim4[iter4];
	}
	Matrix *mat4 = createM(ndim4, dim4, 2);
	writeM(mat4, size4, lhs_data4);
	printM(mat4);
	Matrix * tmp18 = ctransposeM(mat4);
	printM(tmp18);
	Matrix * tmp19 = ctransposeM(mat4);
	b = tmp19;
	Matrix * tmp20 = ctransposeM(b);
	printM(tmp20);
	return 0;
}
