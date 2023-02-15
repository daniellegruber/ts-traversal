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
	int ndim1= 2;
	int dim1[2]= {3,3};
	Matrix * tmp1= onesM(ndim1, dim1);
	double scalar1= 0.5;
	Matrix * tmp2= scaleM(tmp1, &scalar1, 1);
	Matrix * a= tmp2;
	double tmp3;
	indexM(a, &tmp3, 1, 1);
	tmp3 + 1*I;
	double tmp4;
	indexM(a, &tmp4, 1, 5);
	tmp4 + 1*I;
	double tmp5;
	indexM(a, &tmp5, 1, 9);
	tmp5 + 1*I;
	Matrix * tmp6= transposeM(a);
	a = tmp6;
	printM(a);
	int ndim2= 2;
	int dim2[2]= {3,3};
	Matrix * tmp7= onesM(ndim2, dim2);
	double scalar2= -0.5;
	Matrix * tmp8= scaleM(tmp7, &scalar2, 1);
	Matrix * b= tmp8;
	complex tmp9= 0.5 - 1*I;
	complex* lhs_data1 = c_to_c(b);
	lhs_data1[0] = tmp9;
	complex tmp10= 0.5 - 1*I;
	lhs_data1[4] = tmp10;
	complex tmp11= 0.5 - 1*I;
	lhs_data1[8] = tmp11;
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim2; iter1++)
	{
		size1 *= dim2[iter1];
	}
	Matrix *mat1 = createM(ndim2, dim2, 2);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp12= transposeM(mat1);
	b = tmp12;
	printM(b);
	Matrix * tmp13= plusM(a, b);
	Matrix * c= tmp13;
	printM(c);
	Matrix * tmp14= plusM(c, c);
	Matrix * d= tmp14;
	printM(d);
	// overflowTest
	Matrix * tmp15= identityM(3);
	int scalar3= INT_MAX;
	Matrix * tmp16= scaleM(tmp15, &scalar3, 0);
	Matrix * tmp17= identityM(3);
	Matrix * tmp18= plusM(tmp16, tmp17);
	d = tmp18;
	printM(d);
	return 0;
}
