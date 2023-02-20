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
	double* lhs_data1 = d_to_d(a);
	int counter = 0;
	// Method 1 to create 4D matrix
	// Creates the matrix row-major to match C's implementation
	// Note that in Octave, the i (row) loop is outside the j (column) loop. this is
	// because Octave is natively column-major, so we must assign carefully.
	for (int iter1 = 1; iter1 <= 5; ++ iter1) {
		for (int iter2 = 1; iter2 <= 4; ++ iter2) {
			for (int iter3 = 1; iter3 <= 2; ++ iter3) {
				for (int iter4 = 1; iter4 <= 3; ++ iter4) {
					double tmp2 = counter + 0.5;
					lhs_data1[(iter4-1) + (iter3-1)*3 + (iter2-1)*2*3 + (iter1-1)*2*3*4] = tmp2;
					counter = counter + 1;
				
				}
			
			}
		
		}
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter5 = 0 ; iter5 < ndim1; iter5++)
	{
		size1 *= dim1[iter5];
	}
	Matrix *mat1 = createM(ndim1, dim1, 1);
	writeM(mat1, size1, lhs_data1);
	printM(mat1);
	// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration
	for (int iter6 = 1; iter6 <= 5; ++ iter6) {
		for (int iter7 = 1; iter7 <= 4; ++ iter7) {
			for (int iter8 = 1; iter8 <= 2; ++ iter8) {
				for (int iter9 = 1; iter9 <= 3; ++ iter9) {
					double tmp3;
					indexM(mat1, &tmp3, 4, iter8, iter9, iter7, iter6);
					printf("\n%f\n", tmp3);
				
				}
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Normal indexing in C and normal indexing in Octave are the same
	for (int iter10 = 1; iter10 <= 5; ++ iter10) {
		for (int iter11 = 1; iter11 <= 4; ++ iter11) {
			for (int iter12 = 1; iter12 <= 3; ++ iter12) {
				for (int iter13 = 1; iter13 <= 2; ++ iter13) {
					double tmp4;
					indexM(mat1, &tmp4, 4, iter13, iter12, iter11, iter10);
					printf("\n%f\n", tmp4);
				
				}
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Flat indexing in Octave must be matched by normal indexing in C
	for (int iter14 = 1; iter14 <= 120; ++ iter14) {
		int d3_4 = ceil((double) iter14 / (2 * 3 * 4));
		int d2_4 = ((int) ceil((double) iter14 / (2 * 3))) % 4;
		if (d2_4 == 0) {
			d2_4 = 4;
		}
		int tmp_4 = iter14 % (2 * 3);
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
	double* lhs_data2 = d_to_d(a);
	counter = 0;
	for (int iter15 = 1; iter15 <= 120; ++ iter15) {
		int d3_5 = ceil((double) iter15 / (2 * 3 * 4));
		int d2_5 = ((int) ceil((double) iter15 / (2 * 3))) % 4;
		if (d2_5 == 0) {
			d2_5 = 4;
		}
		int tmp_5 = iter15 % (2 * 3);
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
	for (int iter16 = 0 ; iter16 < ndim2; iter16++)
	{
		size2 *= dim2[iter16];
	}
	Matrix *mat2 = createM(ndim2, dim2, 1);
	writeM(mat2, size2, lhs_data2);
	printM(mat2);
	// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration
	for (int iter17 = 1; iter17 <= 5; ++ iter17) {
		for (int iter18 = 1; iter18 <= 4; ++ iter18) {
			for (int iter19 = 1; iter19 <= 2; ++ iter19) {
				for (int iter20 = 1; iter20 <= 3; ++ iter20) {
					double tmp8;
					indexM(mat2, &tmp8, 4, iter15, iter20, iter18, iter17);
					printf("\n%f\n", tmp8);
				
				}
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Normal indexing in C and normal indexing in Octave are the same
	for (int iter21 = 1; iter21 <= 5; ++ iter21) {
		for (int iter22 = 1; iter22 <= 4; ++ iter22) {
			for (int iter23 = 1; iter23 <= 3; ++ iter23) {
				for (int iter24 = 1; iter24 <= 2; ++ iter24) {
					double tmp9;
					indexM(mat2, &tmp9, 4, iter15, iter23, iter22, iter21);
					printf("\n%f\n", tmp9);
				
				}
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Flat indexing in Octave must be matched by normal indexing in C
	for (int iter25 = 1; iter25 <= 120; ++ iter25) {
		int d3_8 = ceil((double) iter25 / (2 * 3 * 4));
		int d2_8 = ((int) ceil((double) iter25 / (2 * 3))) % 4;
		if (d2_8 == 0) {
			d2_8 = 4;
		}
		int tmp_8 = iter25 % (2 * 3);
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
