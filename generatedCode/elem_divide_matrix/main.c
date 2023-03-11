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
	Matrix * a = tmp1;
	complex* lhs_data1 = c_to_c(a);
	complex tmp2 = -0.75 + 1*I;
	lhs_data1[0] = tmp2;
	complex tmp3 = -0.75 + 1*I;
	lhs_data1[4] = tmp3;
	complex tmp4 = -0.75 + 1*I;
	lhs_data1[8] = tmp4;
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 2);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp5 = transposeM(mat1);
	a = tmp5;
	printM(a);
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp6 = onesM(ndim2, dim2);
	Matrix * b = tmp6;
	complex* lhs_data2 = c_to_c(b);
	complex tmp7 = 0.5 + 1*I;
	lhs_data2[0] = tmp7;
	complex tmp8 = 0.5 + 1*I;
	lhs_data2[4] = tmp8;
	complex tmp9 = 0.5 + 1*I;
	lhs_data2[8] = tmp9;
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 2);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp10 = transposeM(mat2);
	b = tmp10;
	printM(b);
	Matrix * tmp11 = rdivideM(a, b);
	Matrix * c = tmp11;
	printM(c);
	Matrix * tmp12 = identityM(3);
	Matrix * tmp13 = rdivideM(tmp12, a);
	Matrix * d = tmp13;
	printM(d);
	Matrix * tmp14 = identityM(3);
	Matrix * tmp15 = rdivideM(b, tmp14);
	Matrix * e = tmp15;
	printM(e);
	Matrix * tmp16 = ldivideM(a, b);
	c = tmp16;
	printM(c);
	Matrix * tmp17 = identityM(3);
	Matrix * tmp18 = ldivideM(tmp17, a);
	d = tmp18;
	printM(d);
	Matrix * tmp19 = identityM(3);
	Matrix * tmp20 = ldivideM(b, tmp19);
	e = tmp20;
	printM(e);
	return 0;
}
