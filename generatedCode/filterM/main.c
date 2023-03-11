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
	int* lhs_data1 = i_to_i(tmp1);
	matrices[0] = tmp1;
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
	int* lhs_data2 = i_to_i(tmp7);
	matrices[4] = tmp7;
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
	matrices[4] = tmp7;
	int ndim6 = 2;
	int dim6[2] = {1, 10};
	Matrix * tmp9 = zerosM(ndim6, dim6);
	double* lhs_data3 = i_to_d(tmp9);
	matrices[5] = tmp9;
	for (int i = 1; i <= 10; ++ i) {
		int d0_13 = i % 1;
		if (d0_13 == 0) {
			d0_13 = 1;
		}
		int d1_13 = (i - d0_13)/1 + 1;
		double tmp10 = i * i + 0.5;
		lhs_data3[(d1_13-1) + (d0_13-1) ] = tmp10;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim6; iter3++)
	{
		size3 *= dim6[iter3];
	}
	Matrix *mat3 = createM(ndim6, dim6, 1);
	writeM(mat3, size3, lhs_data3);
	matrices[5] = tmp9;
	int ndim7 = 2;
	int dim7[2] = {20, 1};
	Matrix * tmp11 = onesM(ndim7, dim7);
	complex* lhs_data4 = i_to_c(tmp11);
	matrices[6] = tmp11;
	for (int i = 1; i <= 20; ++ i) {
		int d0_18 = i % 1;
		if (d0_18 == 0) {
			d0_18 = 1;
		}
		int d1_18 = (i - d0_18)/1 + 1;
		complex tmp12 = i * i + 0.5*I;
		lhs_data4[(d1_18-1) + (d0_18-1) ] = tmp12;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim7; iter4++)
	{
		size4 *= dim7[iter4];
	}
	Matrix *mat4 = createM(ndim7, dim7, 2);
	writeM(mat4, size4, lhs_data4);
	matrices[6] = tmp11;
	int ndim8 = 2;
	int dim8[2] = {20, 1};
	Matrix * tmp13 = onesM(ndim8, dim8);
	int* lhs_data5 = i_to_i(tmp13);
	matrices[7] = tmp13;
	for (int i = 1; i <= 20; ++ i) {
		int d0_23 = i % 1;
		if (d0_23 == 0) {
			d0_23 = 1;
		}
		int d1_23 = (i - d0_23)/1 + 1;
		int tmp14 = (i - 5) * i;
		lhs_data5[(d1_23-1) + (d0_23-1) ] = tmp14;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim8; iter5++)
	{
		size5 *= dim8[iter5];
	}
	Matrix *mat5 = createM(ndim8, dim8, 0);
	writeM(mat5, size5, lhs_data5);
	matrices[7] = tmp13;
	int ndim9 = 2;
	int dim9[2] = {20, 1};
	Matrix * tmp15 = onesM(ndim9, dim9);
	double* lhs_data6 = i_to_d(tmp15);
	matrices[8] = tmp15;
	for (int i = 1; i <= 20; ++ i) {
		int d0_28 = i % 1;
		if (d0_28 == 0) {
			d0_28 = 1;
		}
		int d1_28 = (i - d0_28)/1 + 1;
		double tmp16 = (i - 8.5) * i + 0.5;
		lhs_data6[(d1_28-1) + (d0_28-1) ] = tmp16;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim9; iter6++)
	{
		size6 *= dim9[iter6];
	}
	Matrix *mat6 = createM(ndim9, dim9, 1);
	writeM(mat6, size6, lhs_data6);
	matrices[8] = tmp15;
	int ndim10 = 2;
	int dim10[2] = {1, 10};
	Matrix * tmp17 = zerosM(ndim10, dim10);
	complex* lhs_data7 = i_to_c(tmp17);
	matrices[9] = tmp17;
	for (int i = 1; i <= 10; ++ i) {
		int d0_33 = i % 1;
		if (d0_33 == 0) {
			d0_33 = 1;
		}
		int d1_33 = (i - d0_33)/1 + 1;
		complex tmp18 = (i - 5.5) * (i) + ((0.5) * (4 - i)) * 1*I;
		lhs_data7[(d1_33-1) + (d0_33-1) ] = tmp18;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter7 = 0 ; iter7 < ndim10; iter7++)
	{
		size7 *= dim10[iter7];
	}
	Matrix *mat7 = createM(ndim10, dim10, 2);
	writeM(mat7, size7, lhs_data7);
	matrices[9] = tmp17;
	
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
		int d0_40 = i % 12;
		if (d0_40 == 0) {
			d0_40 = 12;
		}
		int d1_40 = (i - d0_40)/12 + 1;
		printM(matrices[(d1_40-1) + (d0_40-1) ]);
		for (int j = 1; j <= 13; ++ j) {
			printf("\n%s\n", "\na\n");
			int d0_41 = j % 12;
			if (d0_41 == 0) {
				d0_41 = 12;
			}
			int d1_41 = (j - d0_41)/12 + 1;
			printM(matrices[(d1_41-1) + (d0_41-1) ]);
			for (int k = 1; k <= 13; ++ k) {
				printf("\n%s\n", "\nx\n");
				int d0_42 = k % 12;
				if (d0_42 == 0) {
					d0_42 = 12;
				}
				int d1_42 = (k - d0_42)/12 + 1;
				printM(matrices[(d1_42-1) + (d0_42-1) ]);
				printf("\n%s\n", "\n");
				int d0_43 = i % 12;
				if (d0_43 == 0) {
					d0_43 = 12;
				}
				int d1_43 = (i - d0_43)/12 + 1;
				int d0_44 = j % 12;
				if (d0_44 == 0) {
					d0_44 = 12;
				}
				int d1_44 = (j - d0_44)/12 + 1;
				int d0_45 = k % 12;
				if (d0_45 == 0) {
					d0_45 = 12;
				}
				int d1_45 = (k - d0_45)/12 + 1;
				int state_size1[1] = {(int) fmax(getsizeM(matrices[(d1_43-1) + (d0_43-1) ]), getsizeM(matrices[(d1_44-1) + (d0_44-1) ])) - 1};
				Matrix * zero1 = zerosM(1, state_size1);
				Matrix * tmp19 = filterM(matrices[(d1_43-1) + (d0_43-1) ], matrices[(d1_44-1) + (d0_44-1) ], matrices[(d1_45-1) + (d0_45-1) ], &zero1);
				Matrix * y = tmp19;
				printM(tmp19);
				printf("\n%s\n", "\n");
				printf("\n%d\n", sf);
			
			}
		
		}
	
	}
	return 0;
}
