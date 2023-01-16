//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Entry-point function
int main(void) {

	//more off
	//format short
	//source octaveIncludes.m;
	int ndim1= 2;
	int dim1[2]= {3,3};
	double scalar1= 0.5;
	Matrix * tmp1= scaleM(onesM(ndim1, dim1), &scalar1, 1);
	Matrix * a= tmp1;
	double tmp2;
	indexM(tmp1, &tmp2, 1, 1);
	tmp2 + I;
	double tmp3;
	indexM(tmp1, &tmp3, 1, 5);
	tmp3 + I;
	double tmp4;
	indexM(tmp1, &tmp4, 1, 9);
	tmp4 + I;
	Matrix * tmp5= transposeM(tmp1);
	a = tmp5;
	printM(a);
	int ndim2= 2;
	int dim2[2]= {3,3};
	double scalar2= 0.5;
	Matrix * tmp6= scaleM(onesM(ndim2, dim2), &scalar2, 1);
	Matrix * b= tmp6;
	double tmp7= -0.5 + I;
	double* lhs_data1 = d_to_d(tmp6);
	lhs_data1[0] = tmp7;
	double tmp8= -0.5 + I;
	lhs_data1[4] = tmp8;
	double tmp9= -0.5 + I;
	lhs_data1[8] = tmp9;
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim2; iter1++)
	{
		size1 *= dim2[iter1];
	}
	Matrix *mat1 = createM(ndim2, dim2, 1);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp10= transposeM(mat1);
	b = tmp10;
	printM(b);
	Matrix * tmp11= minusM(a, b);
	Matrix * c= tmp11;
	printM(tmp11);
	Matrix * tmp12= minusM(identityM(3), a);
	Matrix * d= tmp12;
	printM(tmp12);
	int scalar3= INT_MIN;
	Matrix * tmp13= scaleM(identityM(3), &scalar3, 0);
	Matrix * tmp14= minusM(tmp13, identityM(3));
	Matrix * e= tmp14;
	printM(tmp14);
	return 0;
}
