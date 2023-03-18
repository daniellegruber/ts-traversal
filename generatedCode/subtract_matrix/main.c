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
	int ndim1 = 2;
	int dim1[2] = {3,3};
	Matrix * tmp1 = onesM(ndim1, dim1);
	double scalar1 = 0.5;
	Matrix * tmp2 = scaleM(tmp1, &scalar1, 1);
	Matrix * a = tmp2;
	int ndim2 = getnDimM(a);
	int *dim2 = getDimsM(a);
	int idx1 = convertSubscript(ndim2, dim2, 1);
	double tmp3;
	indexM(a, &tmp3, 1, idx1 + 1);
	tmp3 + I;
	int idx2 = convertSubscript(ndim2, dim2, 5);
	double tmp4;
	indexM(a, &tmp4, 1, idx2 + 1);
	tmp4 + I;
	int idx3 = convertSubscript(ndim2, dim2, 9);
	double tmp5;
	indexM(a, &tmp5, 1, idx3 + 1);
	tmp5 + I;
	Matrix * tmp6 = transposeM(a);
	a = tmp6;
	printM(a);
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp7 = onesM(ndim3, dim3);
	double scalar2 = 0.5;
	Matrix * tmp8 = scaleM(tmp7, &scalar2, 1);
	Matrix * b = tmp8;
	double* lhs_data1 = d_to_d(b);
	int ndim4 = getnDimM(b);
	int *dim4 = getDimsM(b);
	double tmp9 = -0.5 + I;
	int idx4 = convertSubscript(ndim4, dim4, 1);
	lhs_data1[idx4] = tmp9;
	double tmp10 = -0.5 + I;
	int idx5 = convertSubscript(ndim4, dim4, 5);
	lhs_data1[idx5] = tmp10;
	double tmp11 = -0.5 + I;
	int idx6 = convertSubscript(ndim4, dim4, 9);
	lhs_data1[idx6] = tmp11;
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim4; iter1++)
	{
		size1 *= dim4[iter1];
	}
	Matrix *mat1 = createM(ndim4, dim4, 1);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp12 = transposeM(mat1);
	b = tmp12;
	printM(b);
	Matrix * tmp13 = minusM(a, b);
	Matrix * c = tmp13;
	printM(c);
	Matrix * tmp14 = identityM(3);
	Matrix * tmp15 = minusM(tmp14, a);
	Matrix * d = tmp15;
	printM(d);
	//e = INT_MIN*eye(3)-eye(3);
	//disp(e);
	return 0;
}
