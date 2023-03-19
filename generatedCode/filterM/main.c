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
	
	Matrix **matrices = NULL;
	matrices = malloc(12*sizeof(*matrices));
		        
	int tmp_ndim1 = getnDimM(*matrices);
	int *tmp_dim1 = getDimsM(*matrices);
	int ndim1 = 2;
	int dim1[2] = {1, 10};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	int* lhs_data1 = i_to_i(tmp1);
	matrices[1] = tmp1;
	int tmp2 = 1;
	int idx1 = convertSubscript(ndim1, dim1, 1);
	int idx2 = convertSubscript(ndim1, dim1, 1);
	lhs_data1[idx1] = tmp2;
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
	matrices[2] = tmp3;
	int ndim3 = 2;
	int dim3[2] = {1, 10};
	Matrix * tmp4 = onesM(ndim3, dim3);
	matrices[3] = tmp4;
	int ndim4 = 2;
	int dim4[2] = {20, 1};
	Matrix * tmp5 = onesM(ndim4, dim4);
	complex scalar1 = (4.5 - 0.5*I);
	Matrix * tmp6 = scaleM(tmp5, &scalar1, 2);
	matrices[4] = tmp6;
	int ndim5 = 2;
	int dim5[2] = {1, 10};
	Matrix * tmp7 = zerosM(ndim5, dim5);
	int* lhs_data2 = i_to_i(tmp7);
	matrices[5] = tmp7;
	for (int i = 1; i <= 10; ++ i) {
		int tmp8 = i;
		int idx3 = convertSubscript(ndim5, dim5, i);
		int idx4 = convertSubscript(ndim1, dim1, 5);
		lhs_data2[idx3] = tmp8;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim5; iter2++)
	{
		size2 *= dim5[iter2];
	}
	Matrix *mat2 = createM(ndim5, dim5, 0);
	writeM(mat2, size2, lhs_data2);
	int idx5 = convertSubscript(ndim1, dim1, 5);
	matrices[5] = tmp7;
	int ndim6 = 2;
	int dim6[2] = {1, 10};
	Matrix * tmp9 = zerosM(ndim6, dim6);
	double* lhs_data3 = i_to_d(tmp9);
	matrices[6] = tmp9;
	for (int i = 1; i <= 10; ++ i) {
		double tmp10 = i * i + 0.5;
		int idx6 = convertSubscript(ndim6, dim6, i);
		int idx7 = convertSubscript(ndim1, dim1, 6);
		lhs_data3[idx6] = tmp10;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim6; iter3++)
	{
		size3 *= dim6[iter3];
	}
	Matrix *mat3 = createM(ndim6, dim6, 1);
	writeM(mat3, size3, lhs_data3);
	int idx8 = convertSubscript(ndim1, dim1, 6);
	matrices[6] = tmp9;
	int ndim7 = 2;
	int dim7[2] = {20, 1};
	Matrix * tmp11 = onesM(ndim7, dim7);
	complex* lhs_data4 = i_to_c(tmp11);
	matrices[7] = tmp11;
	for (int i = 1; i <= 20; ++ i) {
		complex tmp12 = i * i + 0.5*I;
		int idx9 = convertSubscript(ndim7, dim7, i);
		int idx10 = convertSubscript(ndim1, dim1, 7);
		lhs_data4[idx9] = tmp12;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim7; iter4++)
	{
		size4 *= dim7[iter4];
	}
	Matrix *mat4 = createM(ndim7, dim7, 2);
	writeM(mat4, size4, lhs_data4);
	int idx11 = convertSubscript(ndim1, dim1, 7);
	matrices[7] = tmp11;
	int ndim8 = 2;
	int dim8[2] = {20, 1};
	Matrix * tmp13 = onesM(ndim8, dim8);
	int* lhs_data5 = i_to_i(tmp13);
	matrices[8] = tmp13;
	for (int i = 1; i <= 20; ++ i) {
		int tmp14 = (i - 5) * i;
		int idx12 = convertSubscript(ndim8, dim8, i);
		int idx13 = convertSubscript(ndim1, dim1, 8);
		lhs_data5[idx12] = tmp14;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim8; iter5++)
	{
		size5 *= dim8[iter5];
	}
	Matrix *mat5 = createM(ndim8, dim8, 0);
	writeM(mat5, size5, lhs_data5);
	int idx14 = convertSubscript(ndim1, dim1, 8);
	matrices[8] = tmp13;
	int ndim9 = 2;
	int dim9[2] = {20, 1};
	Matrix * tmp15 = onesM(ndim9, dim9);
	double* lhs_data6 = i_to_d(tmp15);
	matrices[9] = tmp15;
	for (int i = 1; i <= 20; ++ i) {
		double tmp16 = (i - 8.5) * i + 0.5;
		int idx15 = convertSubscript(ndim9, dim9, i);
		int idx16 = convertSubscript(ndim1, dim1, 9);
		lhs_data6[idx15] = tmp16;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim9; iter6++)
	{
		size6 *= dim9[iter6];
	}
	Matrix *mat6 = createM(ndim9, dim9, 1);
	writeM(mat6, size6, lhs_data6);
	int idx17 = convertSubscript(ndim1, dim1, 9);
	matrices[9] = tmp15;
	int ndim10 = 2;
	int dim10[2] = {1, 10};
	Matrix * tmp17 = zerosM(ndim10, dim10);
	complex* lhs_data7 = i_to_c(tmp17);
	matrices[10] = tmp17;
	for (int i = 1; i <= 10; ++ i) {
		complex tmp18 = (i - 5.5) * (i) + ((0.5) * (4 - i)) * 1*I;
		int idx18 = convertSubscript(ndim10, dim10, i);
		int idx19 = convertSubscript(ndim1, dim1, 10);
		lhs_data7[idx18] = tmp18;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter7 = 0 ; iter7 < ndim10; iter7++)
	{
		size7 *= dim10[iter7];
	}
	Matrix *mat7 = createM(ndim10, dim10, 2);
	writeM(mat7, size7, lhs_data7);
	int idx20 = convertSubscript(ndim1, dim1, 10);
	matrices[10] = tmp17;
	
	int ndim11 = 2;
	int dim11[2] = {1,10};
	matrices[11] = createM(ndim11, dim11, 1);
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
	writeM( matrices[11], 10, input1);
	free(input1);
	
	
	int ndim12 = 2;
	int dim12[2] = {1,10};
	matrices[12] = createM(ndim12, dim12, 1);
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
	writeM( matrices[12], 10, input2);
	free(input2);
	
	
	int ndim13 = 2;
	int dim13[2] = {1,5};
	matrices[13] = createM(ndim13, dim13, 0);
	int *input3 = NULL;
	input3 = malloc( 5*sizeof(*input3));
	input3[0] = 1;
	input3[1] = 2;
	input3[2] = 3;
	input3[3] = 4;
	input3[4] = 5;
	writeM( matrices[13], 5, input3);
	free(input3);
	
	for (int i = 1; i <= 13; ++ i) {
		printf("\n%s\n", 'b\n');
		printM(matrices[i]);
		for (int j = 1; j <= 13; ++ j) {
			printf("\n%s\n", '\na\n');
			printM(matrices[j]);
			for (int k = 1; k <= 13; ++ k) {
				printf("\n%s\n", '\nx\n');
				printM(matrices[k]);
				printf("\n%s\n", '\n');
				//[y, sf] = filter(matrices{i}, matrices{j}, matrices{k});
				int idx21 = convertSubscript(ndim1, dim1, i);
				int idx22 = convertSubscript(ndim1, dim1, j);
				int idx23 = convertSubscript(ndim1, dim1, k);
				int state_size1[1] = {(int) fmax(getsizeM(matrices[idx21]), getsizeM(matrices[idx22])) - 1};
				Matrix * zero1 = zerosM(1, state_size1);
				Matrix * tmp19 = filterM(matrices[idx21], matrices[idx22], matrices[idx23], &zero1);
				Matrix * y = tmp19;
				printM(y);
				printf("\n%s\n", '\n');
				//disp(sf);
			
			}
		
		}
	
	}
	return 0;
}
