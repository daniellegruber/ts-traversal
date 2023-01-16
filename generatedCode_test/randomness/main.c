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
	// rand_test
	randM(2, {"seed", 1});
	Matrix * a= randM(2, {3, 4});
	Matrix * s1= randM(2, {"seed","seed"});
	randM(2, {"seed", 1});
	Matrix * b= randM(2, {3, 4});
	Matrix * s2= randM(2, {"seed","seed"});
	//randi_test
	randM(2, {"seed", "reset"});
	Matrix * a= randiM(2, {3, 4}, 0, 10);
	printf("\n%d\n", a <= 10);
	//randn_test
	randM(2, {"seed", "reset"});
	Matrix * a= randnM(2, {1000,1000});
	Matrix * mu= meanM(a);
	Matrix * sigma= varM(a);
	return 0;
}
