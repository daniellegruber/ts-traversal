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
	int ndim1 = 3;
	int dim1[3] = {2, 3, 5};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	Matrix * a = tmp1;
	double* lhs_data1 = i_to_d(a);
	int counter = 0;
	// Method 1 to create 3D matrix
	// Creates the matrix row-major to match C's implementation
	// Note that in Octave, the i (row) loop is outside the j (column) loop. this is
	// because Octave is natively column-major, so we must assign carefully.
	for (int k = 1; k <= 5; ++ k) {
		for (int i = 1; i <= 2; ++ i) {
			for (int j = 1; j <= 3; ++ j) {
				double tmp2 = counter * counter + 0.5;
				lhs_data1[(j-1) + (i-1)*3 + (k-1)*2*3 + (1-1)*2*3*1] = tmp2;
				counter = counter + 1;
			
			}
		
		}
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 1);
	writeM(mat1, size1, lhs_data1);
	printM(mat1);
	// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration
	for (int k = 1; k <= 5; ++ k) {
		for (int i = 1; i <= 2; ++ i) {
			for (int j = 1; j <= 3; ++ j) {
				double tmp3;
				indexM(mat1, &tmp3, 3, i, j, k);
				printf("\n%f\n", tmp3);
			
			}
		
		}
	
	}
	sprintf(str, "\n%s\n", "\n");
	// Normal indexing in C and normal indexing in Octave are the same
	for (int k = 1; k <= 5; ++ k) {
		for (int j = 1; j <= 3; ++ j) {
			for (int i = 1; i <= 2; ++ i) {
				double tmp4;
				indexM(mat1, &tmp4, 3, i, j, k);
				printf("\n%f\n", tmp4);
			
			}
		
		}
	
	}
	sprintf(str, "\n%s\n", "\n");
	// Flat indexing in Octave must be matched by normal indexing in C
	for (int i = 1; i <= 30; ++ i) {
		int idx1 = convertSubscript(ndim1, dim1, i);
		double tmp5;
		indexM(mat1, &tmp5, 1, idx1+1);
		printf("\n%f\n", tmp5);
	
	}
	sprintf(str, "\n%s\n", "\n");
	// Method 2 to create 3D matrix
	// Creates the matrix column-major to match Octave's implementation
	int ndim2 = 3;
	int dim2[3] = {2, 3, 5};
	Matrix * tmp6 = zerosM(ndim2, dim2);
	a = tmp6;
	double* lhs_data2 = i_to_d(a);
	counter = 0;
	for (int i = 1; i <= 30; ++ i) {
		double tmp7 = counter * counter + 0.5;
		int idx2 = convertSubscript(ndim2, dim2, i);
		lhs_data2[idx2] = tmp7;
		counter = counter + 1;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 1);
	writeM(mat2, size2, lhs_data2);
	printM(mat2);
	// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration
	for (int k = 1; k <= 5; ++ k) {
		for (int i = 1; i <= 2; ++ i) {
			for (int j = 1; j <= 3; ++ j) {
				double tmp8;
				indexM(mat2, &tmp8, 3, i, j, k);
				printf("\n%f\n", tmp8);
			
			}
		
		}
	
	}
	sprintf(str, "\n%s\n", "\n");
	// Normal indexing in C and normal indexing in Octave are the same
	for (int k = 1; k <= 5; ++ k) {
		for (int j = 1; j <= 3; ++ j) {
			for (int i = 1; i <= 2; ++ i) {
				double tmp9;
				indexM(mat2, &tmp9, 3, i, j, k);
				printf("\n%f\n", tmp9);
			
			}
		
		}
	
	}
	sprintf(str, "\n%s\n", "\n");
	// Flat indexing in Octave must be matched by normal indexing in C
	for (int i = 1; i <= 30; ++ i) {
		int idx3 = convertSubscript(ndim1, dim1, i);
		double tmp10;
		indexM(mat2, &tmp10, 1, idx3+1);
		printf("\n%f\n", tmp10);
	
	}
	sprintf(str, "\n%s\n", "\n");
	return 0;
}
