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
	Matrix * a= onesM(ndim1, dim1);
	double tmp1= -0.75 + I;
	double* lhs_data1 = d_to_d(a);
	lhs_data1[0] = tmp1;
	double tmp2= -0.75 + I;
	lhs_data1[4] = tmp2;
	double tmp3= -0.75 + I;
	lhs_data1[8] = tmp3;
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 1);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp4= transposeM(mat1);
	Matrix * a= tmp4;
	printM(a);
	int ndim2= 2;
	int dim2[2]= {3,3};
	Matrix * b= onesM(ndim2, dim2);
	double tmp5= 0.5 + I;
	lhs_data1[0] = tmp5;
	double tmp6= 0.5 + I;
	lhs_data1[4] = tmp6;
	double tmp7= 0.5 + I;
	lhs_data1[8] = tmp7;
	Matrix * tmp8= transposeM(b);
	Matrix * b= tmp8;
	printM(b);
	Matrix * tmp9= rdivideM(a, b);
	Matrix * c= tmp9;
	printM(tmp9);
	Matrix * tmp10= rdivideM(identityM(3), a);
	Matrix * d= tmp10;
	printM(tmp10);
	Matrix * tmp11= rdivideM(b, identityM(3));
	Matrix * e= tmp11;
	printM(tmp11);
	Matrix * tmp12= ldivideM(a, b);
	c = tmp12;
	printM(tmp12);
	Matrix * tmp13= ldivideM(identityM(3), a);
	d = tmp13;
	printM(tmp13);
	Matrix * tmp14= ldivideM(b, identityM(3));
	e = tmp14;
	printM(tmp14);
	return 0;
}
