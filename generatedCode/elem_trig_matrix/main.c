//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
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
		int tmp4 = pow((-1), (i + 1));
		int tmp3 = (tmp4) * (i - 1);
		int idx1 = convertSubscript(ndim1, dim1, i);
		lhs_data1[idx1] = tmp3;
	
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
	double* lhs_data2 = i_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp13 = pow((-1), (i + 1));
		int tmp15 = pow((-1), (i + 1));
		double tmp14 = (tmp15) * (i + 0.4);
		int idx2 = convertSubscript(ndim2, dim2, i);
		lhs_data2[idx2] = tmp14;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 1);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp16 = transposeM(mat2);
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
	complex* lhs_data3 = i_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp24 = i + 0.5*I;
		int idx3 = convertSubscript(ndim3, dim3, i);
		lhs_data3[idx3] = tmp24;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim3; iter3++)
	{
		size3 *= dim3[iter3];
	}
	Matrix *mat3 = createM(ndim3, dim3, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp25 = transposeM(mat3);
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
