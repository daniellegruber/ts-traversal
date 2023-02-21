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
	
	Matrix **matrices = NULL;
	matrices = malloc(12*sizeof(*matrices));
		        
	int ndim1 = 2;
	int dim1[2] = {1, 10};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	matrices[0] = tmp1;
	int* lhs_data1 = i_to_i(matrices[0]);
	int tmp2 = 1;
	lhs_data1[0] = tmp2;
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	int ndim2 = 2;
	int dim2[2] = {20, 1};
	Matrix * tmp3 = onesM(ndim2, dim2);
	matrices[1] = tmp3;
	int ndim3 = 2;
	int dim3[2] = {1, 10};
	Matrix * tmp4 = onesM(ndim3, dim3);
	matrices[2] = tmp4;
	int ndim4 = 2;
	int dim4[2] = {20, 1};
	Matrix * tmp5 = onesM(ndim4, dim4);
	complex scalar1 = (4.5 - 0.5*I);
	Matrix * tmp6 = scaleM(tmp5, &scalar1, 2);
	matrices[3] = tmp6;
	int ndim5 = 2;
	int dim5[2] = {1, 10};
	Matrix * tmp7 = zerosM(ndim5, dim5);
	matrices[4] = tmp7;
	int* lhs_data2 = i_to_i(matrices[4]);
	for (int i = 1; i <= 10; ++ i) {
		int d0_8 = i % 1;
		if (d0_8 == 0) {
			d0_8 = 1;
		}
		int d1_8 = (i - d0_8)/1 + 1;
		int tmp8 = i;
		lhs_data2[(d1_8-1) + (d0_8-1) ] = tmp8;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim5; iter2++)
	{
		size2 *= dim5[iter2];
	}
	Matrix *mat2 = createM(ndim5, dim5, 0);
	writeM(mat2, size2, lhs_data2);
	matrices[4] = matrices[4];
	int ndim6 = 2;
	int dim6[2] = {1, 10};
	Matrix * tmp9 = zerosM(ndim6, dim6);
	matrices[5] = tmp9;
	for (int i = 1; i <= 10; ++ i) {
		int d0_13 = i % 1;
		if (d0_13 == 0) {
			d0_13 = 1;
		}
		int d1_13 = (i - d0_13)/1 + 1;
		double tmp10 = i * i + 0.5;
		lhs_data2[(d1_13-1) + (d0_13-1) ] = tmp10;
	
	}
	matrices[5] = matrices[5];
	int ndim7 = 2;
	int dim7[2] = {20, 1};
	Matrix * tmp11 = onesM(ndim7, dim7);
	matrices[6] = tmp11;
	for (int i = 1; i <= 20; ++ i) {
		int d0_17 = i % 1;
		if (d0_17 == 0) {
			d0_17 = 1;
		}
		int d1_17 = (i - d0_17)/1 + 1;
		complex tmp12 = i * i + 0.5*I;
		lhs_data2[(d1_17-1) + (d0_17-1) ] = tmp12;
	
	}
	matrices[6] = matrices[6];
	int ndim8 = 2;
	int dim8[2] = {20, 1};
	Matrix * tmp13 = onesM(ndim8, dim8);
	matrices[7] = tmp13;
	for (int i = 1; i <= 20; ++ i) {
		int d0_21 = i % 1;
		if (d0_21 == 0) {
			d0_21 = 1;
		}
		int d1_21 = (i - d0_21)/1 + 1;
		int tmp14 = (i - 5) * i;
		lhs_data2[(d1_21-1) + (d0_21-1) ] = tmp14;
	
	}
	matrices[7] = matrices[7];
	int ndim9 = 2;
	int dim9[2] = {20, 1};
	Matrix * tmp15 = onesM(ndim9, dim9);
	matrices[8] = tmp15;
	for (int i = 1; i <= 20; ++ i) {
		int d0_25 = i % 1;
		if (d0_25 == 0) {
			d0_25 = 1;
		}
		int d1_25 = (i - d0_25)/1 + 1;
		double tmp16 = (i - 8.5) * i + 0.5;
		lhs_data2[(d1_25-1) + (d0_25-1) ] = tmp16;
	
	}
	matrices[8] = matrices[8];
	int ndim10 = 2;
	int dim10[2] = {1, 10};
	Matrix * tmp17 = zerosM(ndim10, dim10);
	matrices[9] = tmp17;
	for (int i = 1; i <= 10; ++ i) {
		int d0_29 = i % 1;
		if (d0_29 == 0) {
			d0_29 = 1;
		}
		int d1_29 = (i - d0_29)/1 + 1;
		complex tmp18 = (i - 5.5) * (i) + ((0.5) * (4 - i)) * 1*I;
		lhs_data2[(d1_29-1) + (d0_29-1) ] = tmp18;
	
	}
	matrices[9] = matrices[9];
	
	int ndim11 = 2;
	int dim11[2] = {1,10};
	matrices[10] = createM(ndim11, dim11, 1);
	double *input1 = NULL;
	input1 = malloc( 10*sizeof(*input1));
	input1[0] = 3;
	input1[1] = -2;
	input1[2] = 0;
	input1[3] = 4;
	input1[4] = -1;
	input1[5] = 0;
	input1[6] = 0;
	input1[7] = 0;
	input1[8] = 1;
	input1[9] = 2.5;
	writeM( matrices[10], 10, input1);
	free(input1);
	
	
	int ndim12 = 2;
	int dim12[2] = {1,10};
	matrices[11] = createM(ndim12, dim12, 1);
	double *input2 = NULL;
	input2 = malloc( 10*sizeof(*input2));
	input2[0] = 3;
	input2[1] = -2;
	input2[2] = 0;
	input2[3] = 4;
	input2[4] = -1;
	input2[5] = 0;
	input2[6] = 0;
	input2[7] = 0;
	input2[8] = 1;
	input2[9] = 2.5;
	writeM( matrices[11], 10, input2);
	free(input2);
	
	
	int ndim13 = 2;
	int dim13[2] = {1,5};
	matrices[1] = createM(ndim13, dim13, 0);
	int *input3 = NULL;
	input3 = malloc( 5*sizeof(*input3));
	input3[0] = 1;
	input3[1] = 2;
	input3[2] = 3;
	input3[3] = 4;
	input3[4] = 5;
	writeM( matrices[1], 5, input3);
	free(input3);
	
	for (int i = 1; i <= 13; ++ i) {
		printf("\n%s\n", "b\n");
		int d0_35 = i % 12;
		if (d0_35 == 0) {
			d0_35 = 12;
		}
		int d1_35 = (i - d0_35)/12 + 1;
		printM(matrices[(d1_35-1) + (d0_35-1) ]);
		for (int j = 1; j <= 13; ++ j) {
			printf("\n%s\n", "\na\n");
			int d0_36 = j % 12;
			if (d0_36 == 0) {
				d0_36 = 12;
			}
			int d1_36 = (j - d0_36)/12 + 1;
			printM(matrices[(d1_36-1) + (d0_36-1) ]);
			for (int k = 1; k <= 13; ++ k) {
				printf("\n%s\n", "\nx\n");
				int d0_37 = k % 12;
				if (d0_37 == 0) {
					d0_37 = 12;
				}
				int d1_37 = (k - d0_37)/12 + 1;
				printM(matrices[(d1_37-1) + (d0_37-1) ]);
				printf("\n%s\n", "\n");
				int d0_38 = i % 12;
				if (d0_38 == 0) {
					d0_38 = 12;
				}
				int d1_38 = (i - d0_38)/12 + 1;
				int d0_39 = j % 12;
				if (d0_39 == 0) {
					d0_39 = 12;
				}
				int d1_39 = (j - d0_39)/12 + 1;
				int d0_40 = k % 12;
				if (d0_40 == 0) {
					d0_40 = 12;
				}
				int d1_40 = (k - d0_40)/12 + 1;
				int state_size1[1] = {(int) fmax(getsizeM(matrices[(d1_38-1) + (d0_38-1) ]), getsizeM(matrices[(d1_39-1) + (d0_39-1) ])) - 1};
				Matrix * zero1 = zerosM(1, state_size1);
				Matrix * tmp19 = filterM(matrices[(d1_38-1) + (d0_38-1) ], matrices[(d1_39-1) + (d0_39-1) ], matrices[(d1_40-1) + (d0_40-1) ], &zero1);
				Matrix * y = tmp19;
				printM(tmp19);
				printf("\n%s\n", "\n");
				printf("\n%d\n", sf);
			
			}
		
		}
	
	}
	return 0;
}
