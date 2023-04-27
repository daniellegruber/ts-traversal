// Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

	
A_type myfun(Matrix * A) {
	int *A_dim = getDimsM(A);
	int A_dim0 = A_dim[0];
	int A_dim1 = A_dim[1];
	int A_type = gettypeM(A);
	Matrix * tmp1 = ctransposeM(A);
	A_type B = tmp1;
	int ndim1 = getnDimM(B);
	int *dim1 = getDimsM(B);
	int idx1 = convertSubscript(ndim1, dim1, (A_dim1)*(A_dim0));
	A_type tmp2;
	indexM(B, &tmp2, 1, idx1+1);
	printf("\n%d\n", tmp2);
	A_type tmp3;
	indexM(B, &tmp3, 2, A_dim1, 1);
	printf("\n%d\n", tmp3);
	return B;
}