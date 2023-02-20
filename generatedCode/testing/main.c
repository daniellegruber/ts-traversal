//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "./main.h"

// Entry-point function
int main(void) {

<<<<<<< HEAD
	int vec1[5];
	
	for (int iter1 = 0; 1 + 1*iter1 <= 5; iter1++) {
=======
	int vec1[100];
	
	for (int iter1 = 0; 1 + 1*iter1 <= 100; iter1++) {
>>>>>>> 97db0fcb01c01fa4c840575d4d54ea867c46ec4f
		vec1[iter1] = 1 + 1*iter1;
	}
	
	int ndim1 = 2;
<<<<<<< HEAD
	int dim1[2] = {1,5};
	Matrix * a = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 5*sizeof(*input1));
	for (int iter2 = 0; iter2 < 5; iter2++) {
	   input1[0 + iter2] = vec1[iter2];
	}
	writeM( a, 5, input1);
	free(input1);
	
	int vec2[5];
	
	for (int iter3 = 0; 6 + 1*iter3 <= 10; iter3++) {
		vec2[iter3] = 6 + 1*iter3;
	}
	
	int ndim2 = 2;
	int dim2[2] = {1,5};
	Matrix * b = createM(ndim2, dim2, 0);
	int *input2 = NULL;
	input2 = malloc( 5*sizeof(*input2));
	for (int iter4 = 0; iter4 < 5; iter4++) {
	   input2[0 + iter4] = vec2[iter4];
	}
	writeM( b, 5, input2);
	free(input2);
	
	Matrix * tmp1 = ltM(a, b);
	printM(tmp1);
	int ndim3 = 2;
	int dim3[2] = {1,5};
	int scalar1 = 10;
	Matrix * tmp2 = scaleM(onesM(ndim3, dim3), &scalar1, 0);
	Matrix * tmp3 = leM(a, tmp2);
	printM(tmp3);
	Matrix * tmp4 = plusM(a, b);
	printM(tmp4);
=======
	int dim1[2] = {1,100};
	Matrix * a = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 100*sizeof(*input1));
	for (int iter2 = 0; iter2 < 100; iter2++) {
	   input1[0 + iter2] = vec1[iter2];
	}
	writeM( a, 100, input1);
	free(input1);
	
	printM(a);
	int vec2[3];
	
	for (int iter3 = 0; 1 + 1*iter3 <= 3; iter3++) {
		vec2[iter3] = 1 + 1*iter3;
	}
	int vec3[3];
	
	for (int iter5 = 0; 7 + 3*iter5 <= 15; iter5++) {
		vec3[iter5] = 7 + 3*iter5;
	}
	
	int ndim2 = 2;
	int dim2[2] = {1,6};
	Matrix * b = createM(ndim2, dim2, 0);
	int *input2 = NULL;
	input2 = malloc( 6*sizeof(*input2));
	for (int iter4 = 0; iter4 < 3; iter4++) {
	   input2[0 + iter4] = vec2[iter4];
	}
	for (int iter6 = 0; iter6 < 3; iter6++) {
	   input2[3 + iter6] = vec3[iter6];
	}
	writeM( b, 6, input2);
	free(input2);
	
	printM(b);
>>>>>>> 97db0fcb01c01fa4c840575d4d54ea867c46ec4f
	return 0;
}
