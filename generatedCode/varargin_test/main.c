// Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

// Function declarations
Matrix * myfun(Matrix * A, int n_varargin, ...);

// Entry-point function
int main(void) {

	
	int ndim1 = 2;
	int dim1[2] = {1,3};
	Matrix * A = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 3*sizeof(*input1));
	input1[0] = 1;
	input1[1] = 2;
	input1[2] = 3;
	writeM( A, 3, input1);
	free(input1);
	
	Matrix * B = myfun(A, 3, 3, A, 4.1);
	B = myfun(A, 1, 2);
	return 0;
}


// Subprograms
	
Matrix * myfun(Matrix * A, int n_varargin, ...) {
	va_list varargin;
	va_start(varargin, n_varargin);
	// Inputs:
	//   A: int matrix
	// Varargin:
	//   a: int
	//   b: int
	//   c: double
	// Outputs:
	//   B: int matrix
	int scalar1 = 2;
	Matrix * tmp1 = scaleM(A, &scalar1, 0);
	Matrix * B = tmp1;
	if ((n_varargin + 1) > 3) {
		int a = va_arg(varargin, int);
		int b = va_arg(varargin, int);
		int c = va_arg(varargin, double);
		printf("a: %d\nb: %d\nc: %.4f\n", a, b, c);
		
		
		
		
		} else if ((n_varargin + 1) > 2) {
		int a = va_arg(varargin, int);
		int b = va_arg(varargin, int);
		printf("a: %d\nb: %d\n", a, b);
		
		
		
		} else if ((n_varargin + 1) > 1) {
		int a = va_arg(varargin, int);
		printf("a: %d\n", a);

		
		} else {
		printf("\n%s\n", "No extra inputs");
		
	
	}
	va_end(varargin);
	return B;
}