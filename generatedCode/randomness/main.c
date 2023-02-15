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
	// rand_test
	Matrix * tmp1= randM(2, {"seed", 1});
	tmp1;
	Matrix * tmp2= randM(2, {3, 4});
	Matrix * a= tmp2;
	Matrix * tmp3= randM(2, {"seed","seed"});
	Matrix * s1= tmp3;
	Matrix * tmp4= randM(2, {"seed", 1});
	tmp4;
	Matrix * tmp5= randM(2, {3, 4});
	Matrix * b= tmp5;
	Matrix * tmp6= randM(2, {"seed","seed"});
	Matrix * s2= tmp6;
	//randi_test
	Matrix * tmp7= randM(2, {"seed", "reset"});
	tmp7;
	Matrix * tmp8= randiM(2, {3, 4}, 0, 10);
	a = tmp8;
	printf("\n%d\n", a <= 10);
	//randn_test
	Matrix * tmp9= randM(2, {"seed", "reset"});
	tmp9;
	Matrix * tmp10= randnM(2, {1000,1000});
	a = tmp10;
	Matrix * tmp11= meanM(a);
	Matrix * mu= tmp11;
	Matrix * tmp12= varM(a);
	Matrix * sigma= tmp12;
	return 0;
}
