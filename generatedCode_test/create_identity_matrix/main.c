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
	Matrix * a= identityM(8);
	Matrix * b= identityM(4);
	Matrix * c= identityM(1);
	printM(a);
	printM(b);
	int * tmp1 = i_to_i(c);
	printf("\n%d\n", tmp1[0]);
	return 0;
}
