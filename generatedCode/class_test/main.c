// Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

// Entry-point function
int main(void) {

	
	int ndim1 = 2;
	int dim1[2] = {1,3};
	Matrix * dim = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 3*sizeof(*input1));
	input1[0] = 64;
	input1[1] = 1024;
	input1[2] = 50;
	writeM( dim, 3, input1);
	free(input1);
	
	undefined mat1[] = {};
	int ndim2 = getnDimM(mmo);
	int *dim2 = getDimsM(mmo);
	undefined mat2[] = {};
	undefined mat3[] = {};
	unknown tmp1;
	indexM(mmo, &tmp1, 2, mat3, dim);
	tmp1;
	return 0;
}
