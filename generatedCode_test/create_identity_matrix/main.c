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
	int dim1= {8, 8};
	Matrix * a= identityM(8);
	int ndim2= 2;
	int dim2= {4, 4};
	Matrix * b= identityM(4);
	int ndim3= 2;
	int dim3= {1, 1};
	Matrix * c= identityM(1);
	printM(a);
	printM(b);
	int * tmp1 = i_to_i(c);
	printf("\n%d\n", tmp1[0]);
	return 0;
}
