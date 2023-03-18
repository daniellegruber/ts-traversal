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
	int ndim1 = 4;
	int dim1[4] = {2, 3, 4, 5};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	Matrix * a = tmp1;
	double* lhs_data1 = i_to_d(a);
	int counter = 0;
	// Method 1 to create 4D matrix
	// Creates the matrix row-major to match C's implementation
	// Note that in Octave, the i (row) loop is outside the j (column) loop. this is
	// because Octave is natively column-major, so we must assign carefully.
	for (int l = 1; l <= 5; ++ l) {
		for (int k = 1; k <= 4; ++ k) {
			for (int i = 1; i <= 2; ++ i) {
				for (int j = 1; j <= 3; ++ j) {
					double tmp2 = counter + 0.5;
					lhs_data1[(j-1) + (i-1)*3 + (k-1)*2*3 + (l-1)*2*3*4] = tmp2;
					counter = counter + 1;
				
				}
			
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
	for (int l = 1; l <= 5; ++ l) {
		for (int k = 1; k <= 4; ++ k) {
			for (int i = 1; i <= 2; ++ i) {
				for (int j = 1; j <= 3; ++ j) {
					double tmp3;
					indexM(mat1, &tmp3, 4, i, j, k, l);
					printf("\n%f\n", tmp3);
				
				}
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Normal indexing in C and normal indexing in Octave are the same
	for (int l = 1; l <= 5; ++ l) {
		for (int k = 1; k <= 4; ++ k) {
			for (int j = 1; j <= 3; ++ j) {
				for (int i = 1; i <= 2; ++ i) {
					double tmp4;
					indexM(mat1, &tmp4, 4, i, j, k, l);
					printf("\n%f\n", tmp4);
				
				}
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Flat indexing in Octave must be matched by normal indexing in C
	for (int i = 1; i <= 120; ++ i) {
		int d3_4 = ceil((double) i / (2 * 3 * 4));
		int d2_4 = ((int) ceil((double) i / (2 * 3))) % 4;
		if (d2_4 == 0) {
			d2_4 = 4;
		}
		int tmp_4 = i % (2 * 3);
		if (tmp_4 == 0) {
			tmp_4 = 2 * 3;
		}
		int d0_4 = tmp_4 % 2;
		if (d0_4 == 0) {
			d0_4 = 2;
		}
		int d1_4 = (tmp_4 - d0_4)/2 + 1;
		double tmp5;
		indexM(mat1, &tmp5, 1, (d1_4) + (d0_4-1) * 3 + (d2_4-1) * 2 * 3 + (d3_4-1) * 2 * 3 * 4);
		printf("\n%f\n", tmp5);
	
	}
	printf("\n%s\n", "\n");
	// Method 2 to create 4D matrix
	// Creates the matrix column-major to match Octave's implementation
	int ndim2 = 4;
	int dim2[4] = {2, 3, 4, 5};
	Matrix * tmp6 = zerosM(ndim2, dim2);
	a = tmp6;
	double* lhs_data2 = i_to_d(a);
	counter = 0;
	for (int i = 1; i <= 120; ++ i) {
		int d3_5 = ceil((double) i / (2 * 3 * 4));
		int d2_5 = ((int) ceil((double) i / (2 * 3))) % 4;
		if (d2_5 == 0) {
			d2_5 = 4;
		}
		int tmp_5 = i % (2 * 3);
		if (tmp_5 == 0) {
			tmp_5 = 2 * 3;
		}
		int d0_5 = tmp_5 % 2;
		if (d0_5 == 0) {
			d0_5 = 2;
		}
		int d1_5 = (tmp_5 - d0_5)/2 + 1;
		double tmp7 = counter + 0.5;
		lhs_data2[(d1_5-1) + (d0_5-1) * 3 + (d2_5-1) * 2 * 3 + (d3_5-1) * 2 * 3 * 4] = tmp7;
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
	for (int l = 1; l <= 5; ++ l) {
		for (int k = 1; k <= 4; ++ k) {
			for (int i = 1; i <= 2; ++ i) {
				for (int j = 1; j <= 3; ++ j) {
					double tmp8;
					indexM(mat2, &tmp8, 4, i, j, k, l);
					printf("\n%f\n", tmp8);
				
				}
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Normal indexing in C and normal indexing in Octave are the same
	for (int l = 1; l <= 5; ++ l) {
		for (int k = 1; k <= 4; ++ k) {
			for (int j = 1; j <= 3; ++ j) {
				for (int i = 1; i <= 2; ++ i) {
					double tmp9;
					indexM(mat2, &tmp9, 4, i, j, k, l);
					printf("\n%f\n", tmp9);
				
				}
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Flat indexing in Octave must be matched by normal indexing in C
	for (int i = 1; i <= 120; ++ i) {
		int d3_8 = ceil((double) i / (2 * 3 * 4));
		int d2_8 = ((int) ceil((double) i / (2 * 3))) % 4;
		if (d2_8 == 0) {
			d2_8 = 4;
		}
		int tmp_8 = i % (2 * 3);
		if (tmp_8 == 0) {
			tmp_8 = 2 * 3;
		}
		int d0_8 = tmp_8 % 2;
		if (d0_8 == 0) {
			d0_8 = 2;
		}
		int d1_8 = (tmp_8 - d0_8)/2 + 1;
		double tmp10;
		indexM(mat2, &tmp10, 1, (d1_8) + (d0_8-1) * 3 + (d2_8-1) * 2 * 3 + (d3_8-1) * 2 * 3 * 4);
		printf("\n%f\n", tmp10);
	
	}
	printf("\n%s\n", "\n");
	return 0;
}
