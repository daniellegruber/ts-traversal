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
	int ndim1= 3;
	int dim1[3]= {2, 3, 5};
	Matrix * a= zerosM(ndim1, dim1);
	int counter= 0;
	// Method 1 to create 3D matrix
	// Creates the matrix row-major to match C's implementation
	// Note that in Octave, the i (row) loop is outside the j (column) loop. this is
	// because Octave is natively column-major, so we must assign carefully.
	double* lhs_data1 = d_to_d(a);
	for (int iter1 = 1; iter1 <= 5; ++ iter1) {
		for (int iter2 = 1; iter2 <= 2; ++ iter2) {
			for (int iter3 = 1; iter3 <= 3; ++ iter3) {
				double tmp1= counter * counter + 0.5;
				lhs_data1[(iter3-1) + (iter2-1)*3 + (iter1-1)*2*3 + (1-1)*2*3*1] = tmp1;
				counter = counter + 1;
			
			}
		
		}
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter4 = 0 ; iter4 < ndim1; iter4++)
	{
		size1 *= dim1[iter4];
	}
	Matrix *mat1 = createM(ndim1, dim1, 1);
	writeM(mat1, size1, lhs_data1);
	mat1 = mat1;
	printM(mat1);
	// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration
	for (int iter5 = 1; iter5 <= 5; ++ iter5) {
		for (int iter6 = 1; iter6 <= 2; ++ iter6) {
			for (int iter7 = 1; iter7 <= 3; ++ iter7) {
				double tmp2;
				indexM(mat1, &tmp2, 3, iter6, iter7, iter5);
				printf("\n%f\n", tmp2);
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Normal indexing in C and normal indexing in Octave are the same
	for (int iter8 = 1; iter8 <= 5; ++ iter8) {
		for (int iter9 = 1; iter9 <= 3; ++ iter9) {
			for (int iter10 = 1; iter10 <= 2; ++ iter10) {
				double tmp3;
				indexM(mat1, &tmp3, 3, iter10, iter9, iter8);
				printf("\n%f\n", tmp3);
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Flat indexing in Octave must be matched by normal indexing in C
	for (int iter11 = 1; iter11 <= 30; ++ iter11) {
		int d2_4 = ceil((double) iter11 / (2 * 3));
		int tmp_4 = iter11 % (2 * 3);
		if (tmp_4 == 0) {
			tmp_4 = 2 * 3;
		}
		int d0_4 = tmp_4 % 2;
		if (d0_4 == 0) {
			d0_4 = 2;
		}
		int d1_4 = (tmp_4 - d0_4)/2 + 1;
		double tmp4;
		indexM(mat1, &tmp4, 1, (d1_4) + (d0_4-1) * 3 + (d2_4-1) * 2 * 3);
		printf("\n%f\n", tmp4);
	
	}
	printf("\n%s\n", "\n");
	// Method 2 to create 3D matrix
	// Creates the matrix column-major to match Octave's implementation
	int ndim2= 3;
	int dim2[3]= {2, 3, 5};
	a = zerosM(ndim2, dim2);
	counter = 0;
	double* lhs_data2 = d_to_d(a);
	for (int iter12 = 1; iter12 <= 30; ++ iter12) {
		int d2_5 = ceil((double) iter12 / (2 * 3));
		int tmp_5 = iter12 % (2 * 3);
		if (tmp_5 == 0) {
			tmp_5 = 2 * 3;
		}
		int d0_5 = tmp_5 % 2;
		if (d0_5 == 0) {
			d0_5 = 2;
		}
		int d1_5 = (tmp_5 - d0_5)/2 + 1;
		double tmp5= counter * counter + 0.5;
		lhs_data2[(d1_5-1) + (d0_5-1) * 3 + (d2_5-1) * 2 * 3] = tmp5;
		counter = counter + 1;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter13 = 0 ; iter13 < ndim2; iter13++)
	{
		size2 *= dim2[iter13];
	}
	Matrix *mat2 = createM(ndim2, dim2, 1);
	writeM(mat2, size2, lhs_data2);
	printM(mat2);
	// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration
	for (int iter14 = 1; iter14 <= 5; ++ iter14) {
		for (int iter15 = 1; iter15 <= 2; ++ iter15) {
			for (int iter16 = 1; iter16 <= 3; ++ iter16) {
				double tmp6;
				indexM(mat2, &tmp6, 3, iter15, iter16, iter14);
				printf("\n%f\n", tmp6);
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Normal indexing in C and normal indexing in Octave are the same
	for (int iter17 = 1; iter17 <= 5; ++ iter17) {
		for (int iter18 = 1; iter18 <= 3; ++ iter18) {
			for (int iter19 = 1; iter19 <= 2; ++ iter19) {
				double tmp7;
				indexM(mat2, &tmp7, 3, iter19, iter18, iter17);
				printf("\n%f\n", tmp7);
			
			}
		
		}
	
	}
	printf("\n%s\n", "\n");
	// Flat indexing in Octave must be matched by normal indexing in C
	for (int iter20 = 1; iter20 <= 30; ++ iter20) {
		int d2_8 = ceil((double) iter20 / (2 * 3));
		int tmp_8 = iter20 % (2 * 3);
		if (tmp_8 == 0) {
			tmp_8 = 2 * 3;
		}
		int d0_8 = tmp_8 % 2;
		if (d0_8 == 0) {
			d0_8 = 2;
		}
		int d1_8 = (tmp_8 - d0_8)/2 + 1;
		double tmp8;
		indexM(mat2, &tmp8, 1, (d1_8) + (d0_8-1) * 3 + (d2_8-1) * 2 * 3);
		printf("\n%f\n", tmp8);
	
	}
	printf("\n%s\n", "\n");
	return 0;
}
