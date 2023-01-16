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
	int dim1[2]= {3, 3};
	Matrix * a= onesM(ndim1, dim1);
	int ndim2= 2;
	int dim2[2]= {1, 6};
	Matrix * b= onesM(ndim2, dim2);
	int ndim3= 2;
	int dim3[2]= {4, 1};
	Matrix * c= onesM(ndim3, dim3);
	printM(a);
	printM(b);
	printM(c);
	return 0;
}
