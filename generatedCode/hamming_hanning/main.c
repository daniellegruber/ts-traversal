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
	int iterations= 100;
	for (int iter1 = 1; iter1 <= iterations; ++ iter1) {
		double * tmp1= hamming(iter1);
		printf("\n%f\n", tmp1);
		double * tmp2= periodichamming(iter1);
		printf("\n%f\n", tmp2);
		double * tmp3= hanning(iter1);
		printf("\n%f\n", tmp3);
		double * tmp4= periodichanning(iter1);
		printf("\n%f\n", tmp4);
	
	}
	return 0;
}
