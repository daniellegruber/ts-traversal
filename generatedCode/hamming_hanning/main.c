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
	int iterations = 100;
	for (int i = 1; i <= iterations; ++ i) {
		double * tmp1 = hamming(i);
		printf("\n%f\n", tmp1);
		double * tmp2 = periodichamming(i);
		printf("\n%f\n", tmp2);
		double * tmp3 = hanning(i);
		printf("\n%f\n", tmp3);
		double * tmp4 = periodichanning(i);
		printf("\n%f\n", tmp4);
	
	}
	return 0;
}
