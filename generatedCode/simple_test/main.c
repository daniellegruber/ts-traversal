//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Function declarations
void myfun1(int f, int g, int* p_F, int* p_G);

// Entry-point function
int main(void) {

	
	int ndim1 = 2;
	int dim1[2] = {2,3};
	Matrix * A = createM(ndim1, dim1, 1);
	double *input1 = NULL;
	input1 = malloc( 6*sizeof(*input1));
	input1[0] = 1;
	input1[1] = 2.1;
	input1[2] = 1;
	input1[3] = 3;
	input1[4] = 4;
	input1[5] = 1;
	writeM( A, 6, input1);
	free(input1);
	
	Matrix * tmp1= ctransposeM(A);
	Matrix * tmp2= mtimesM(A, tmp1);
	Matrix * B= tmp2;
	int scalar1 = 3;
	Matrix * tmp3= scaleM(tmp2, &scalar1, 1);
	Matrix * C= tmp3;
	int F1;
	int G1;
	myfun1(1, 2, &F1, &G1);
	return 0;
}


// Subprograms

void myfun1(int f, int g, int* p_F, int* p_G) {
	int F= f + g;
	int G= f - g;
	*p_F = F;
	*p_G = G;
}