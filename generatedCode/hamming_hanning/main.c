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
	int iterations = 3;
	for (int iter1 = 1; iter1 <= iterations; ++ iter1) {
		double *tmp1 = NULL;
		tmp1 = malloc(iter1*sizeof(*tmp1));
		tmp1 = hamming(iter1);
		for (int i = 0 ; i < iter1 ; i++) {
		printf("\n%f\n", tmp1[i]);
		}
		double *tmp2 = NULL;
		tmp2 = malloc(iter1*sizeof(*tmp2));
		tmp2 = periodichamming(iter1);
		for (int i = 0 ; i < iter1 ; i++) {
		printf("\n%f\n", tmp2[i]);
		}
		double *tmp3 = NULL;
		tmp3 = malloc(iter1*sizeof(*tmp3));
		tmp3 = hanning(iter1);
		for (int i = 0 ; i < iter1 ; i++) {
		printf("\n%f\n", tmp3[i]);
		}
		double *tmp4 = NULL;
		tmp4 = malloc(iter1*sizeof(*tmp4));
		tmp4 = periodichanning(iter1);
		for (int i = 0 ; i < iter1 ; i++) {
		printf("\n%f\n", tmp4[i]);
		}
	
	}
	return 0;
}
