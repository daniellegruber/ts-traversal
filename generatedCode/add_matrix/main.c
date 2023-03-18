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
	// normalTest
	int ndim1 = 2;
	int dim1[2] = {3,3};
	Matrix * tmp1 = onesM(ndim1, dim1);
	double scalar1 = 0.5;
	Matrix * tmp2 = scaleM(tmp1, &scalar1, 1);
	Matrix * a = tmp2;
	complex* lhs_data1 = d_to_c(a);
	complex tmp5;
	indexM(a, &tmp5, 1, 1);
	complex tmp4 = tmp5 + 1*I;
	lhs_data1[0] = tmp4;
	double tmp8;
	indexM(a, &tmp8, 1, 5);
	complex tmp7 = tmp8 + 1*I;
	lhs_data1[4] = tmp7;
	double tmp11;
	indexM(a, &tmp11, 1, 9);
	complex tmp10 = tmp11 + 1*I;
	lhs_data1[8] = tmp10;
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 2);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp12 = transposeM(mat1);
	a = tmp12;
	printM(a);
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp13 = onesM(ndim2, dim2);
	double scalar2 = -0.5;
	Matrix * tmp14 = scaleM(tmp13, &scalar2, 1);
	Matrix * b = tmp14;
	complex* lhs_data2 = d_to_c(b);
	complex tmp15 = 0.5 - 1*I;
	lhs_data2[0] = tmp15;
	complex tmp16 = 0.5 - 1*I;
	lhs_data2[4] = tmp16;
	complex tmp17 = 0.5 - 1*I;
	lhs_data2[8] = tmp17;
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 2);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp18 = transposeM(mat2);
	b = tmp18;
	printM(b);
	Matrix * tmp19 = plusM(a, b);
	Matrix * c = tmp19;
	printM(c);
	Matrix * tmp20 = plusM(c, c);
	Matrix * d = tmp20;
	printM(d);
	// overflowTest
	//d = intmax*eye(3)+eye(3);
	Matrix * tmp21 = identityM(3);
	Matrix * tmp22 = identityM(3);
	Matrix * tmp23 = plusM(tmp21, tmp22);
	d = tmp23;
	printM(d);
	return 0;
}
