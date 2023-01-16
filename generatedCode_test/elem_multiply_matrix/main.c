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
	complex scalar1= (0.5 + 1*I);
	Matrix * tmp1= scaleM(identityM(3), &scalar1, 2);
	Matrix * a= tmp1;
	printM(tmp1);
	complex scalar2= (0.4 - 0.8*I);
	Matrix * tmp2= scaleM(identityM(3), &scalar2, 2);
	Matrix * b= tmp2;
	Matrix * tmp3= transposeM(tmp2);
	b = tmp3;
	printM(b);
	Matrix * tmp4= timesM(tmp1, b);
	Matrix * c= tmp4;
	printM(tmp4);
	Matrix * tmp5= timesM(identityM(3), tmp1);
	Matrix * d= tmp5;
	printM(tmp5);
	int scalar3= 2 * INT_MAX;
	Matrix * tmp6= scaleM(identityM(3), &scalar3, 0);
	Matrix * e= tmp6;
	printM(tmp6);
	return 0;
}
