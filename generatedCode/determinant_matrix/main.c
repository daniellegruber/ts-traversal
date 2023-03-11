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
	//test1
	
	int ndim1 = 2;
	int dim1[2] = {1,1};
	Matrix * a = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 1*sizeof(*input1));
	input1[0] = 1;
	writeM( a, 1, input1);
	free(input1);
	
	printM(a);
	double d1;
	detM(a, &d1);
	printf("\n%f\n", d1);
	//test2
	
	int ndim2 = 2;
	int dim2[2] = {2,2};
	a = createM(ndim2, dim2, 2);
	complex *input2 = NULL;
	input2 = malloc( 4*sizeof(*input2));
	input2[0] = 26 + 1*I;
	input2[1] = 3 - 8*I;
	input2[2] = 20*I;
	input2[3] = 1 + 25*I;
	writeM( a, 4, input2);
	free(input2);
	
	printM(a);
	double d2;
	detM(a, &d2);
	printf("\n%f\n", d2);
	//test3
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim3, dim3);
	a = tmp1;
	int* lhs_data1 = i_to_i(a);
	int counter = 1;
	for (int i = 1; i <= 3; ++ i) {
		for (int j = 1; j <= 3; ++ j) {
			int tmp2 = counter * counter;
			lhs_data1[(j-1) + (i-1)*3 + (1-1)*3*3 + (1-1)*3*3*1] = tmp2;
			counter = counter + 1;
		
		}
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim3; iter1++)
	{
		size1 *= dim3[iter1];
	}
	Matrix *mat1 = createM(ndim3, dim3, 0);
	writeM(mat1, size1, lhs_data1);
	printM(mat1);
	double d3;
	detM(mat1, &d3);
	printf("%.5f\n", d3);
	//testn
	int ndim4 = 2;
	int dim4[2] = {5,5};
	Matrix * tmp3 = zerosM(ndim4, dim4);
	a = tmp3;
	int* lhs_data2 = i_to_i(a);
	counter = 0;
	for (int i = 0; i <= 4; ++ i) {
		for (int j = 0; j <= 4; ++ j) {
			counter = counter + 1;
			int tmp4 = (counter - 1) % 2;
			if ((tmp4 == 0)) {
				int d0_2 = counter % 5;
				if (d0_2 == 0) {
					d0_2 = 5;
				}
				int d1_2 = (counter - d0_2)/5 + 1;
				int tmp6 = (counter + i) % 7;
				int tmp5 = tmp6;
				lhs_data2[(d1_2-1) + (d0_2-1) * 5] = tmp5;
				
				} else {
				int tmp7 = (counter + j) % 7;
				int d0_3 = counter % 5;
				if (d0_3 == 0) {
					d0_3 = 5;
				}
				int d1_3 = (counter - d0_3)/5 + 1;
				int tmp9 = (counter + j) % 7;
				int tmp8 = -1 * tmp9;
				lhs_data2[(d1_3-1) + (d0_3-1) * 5] = tmp8;
				
			
			}
		
		}
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim4; iter2++)
	{
		size2 *= dim4[iter2];
	}
	Matrix *mat2 = createM(ndim4, dim4, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp10 = transposeM(mat2);
	a = tmp10;
	printM(a);
	double d4;
	detM(a, &d4);
	printf("%.5f\n", d4);
	//non_square
	int ndim5 = 2;
	int dim5[2] = {3, 2};
	Matrix * tmp11 = zerosM(ndim5, dim5);
	a = tmp11;
	complex* lhs_data3 = i_to_c(a);
	complex tmp12 = 26 + 1*I;
	lhs_data3[0] = tmp12;
	complex tmp13 = 3 - 8*I;
	lhs_data3[2] = tmp13;
	complex tmp14 = 20*I;
	lhs_data3[4] = tmp14;
	complex tmp15 = 1 + 25*I;
	lhs_data3[1] = tmp15;
	int tmp16 = 0;
	lhs_data3[3] = tmp16;
	int tmp17 = 1;
	lhs_data3[5] = tmp17;
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim5; iter3++)
	{
		size3 *= dim5[iter3];
	}
	Matrix *mat3 = createM(ndim5, dim5, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp18 = transposeM(mat3);
	a = tmp18;
	printM(a);
	return 0;
}
