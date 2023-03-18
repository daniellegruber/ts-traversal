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
	matrices = malloc(15*sizeof(*matrices));
		        
	int ndim1 = getnDimM(*matrices);
	int *dim1 = getDimsM(*matrices);
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim2, dim2);
	matrices[1] = tmp1;
	Matrix * tmp2 = identityM(3);
	int scalar1 = 2;
	Matrix * tmp3 = scaleM(tmp2, &scalar1, 0);
	matrices[2] = tmp3;
	Matrix * tmp4 = identityM(3);
	matrices[3] = tmp4;
	Matrix * tmp5 = identityM(3);
	complex scalar2 = (4.2 - 0.03*I);
	Matrix * tmp6 = scaleM(tmp5, &scalar2, 2);
	matrices[4] = tmp6;
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp7 = zerosM(ndim3, dim3);
	matrices[5] = tmp7;
	int* lhs_data1 = i_to_i(matrices[5]);
	for (int i = 1; i <= 9; ++ i) {
		int tmp8 = i * i;
		int idx1 = convertSubscript(ndim3, dim3, i);
		lhs_data1[idx1] = tmp8;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim3; iter1++)
	{
		size1 *= dim3[iter1];
	}
	Matrix *mat1 = createM(ndim3, dim3, 0);
	writeM(mat1, size1, lhs_data1);
	int idx2 = convertSubscript(ndim1, dim1, 5);
	Matrix * tmp9 = transposeM(tmp7);
	matrices[5] = tmp9;
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp10 = zerosM(ndim4, dim4);
	matrices[6] = tmp10;
	double* lhs_data2 = i_to_d(matrices[6]);
	for (int i = 1; i <= 9; ++ i) {
		double tmp11 = i * i + 0.5;
		int idx3 = convertSubscript(ndim4, dim4, i);
		lhs_data2[idx3] = tmp11;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim4; iter2++)
	{
		size2 *= dim4[iter2];
	}
	Matrix *mat2 = createM(ndim4, dim4, 1);
	writeM(mat2, size2, lhs_data2);
	int idx4 = convertSubscript(ndim1, dim1, 6);
	Matrix * tmp12 = transposeM(tmp10);
	matrices[6] = tmp12;
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp13 = zerosM(ndim5, dim5);
	matrices[7] = tmp13;
	complex* lhs_data3 = i_to_c(matrices[7]);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp14 = i * i + 0.5*I;
		int idx5 = convertSubscript(ndim5, dim5, i);
		lhs_data3[idx5] = tmp14;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim5; iter3++)
	{
		size3 *= dim5[iter3];
	}
	Matrix *mat3 = createM(ndim5, dim5, 2);
	writeM(mat3, size3, lhs_data3);
	int idx6 = convertSubscript(ndim1, dim1, 7);
	Matrix * tmp15 = transposeM(tmp13);
	matrices[7] = tmp15;
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp16 = zerosM(ndim6, dim6);
	matrices[8] = tmp16;
	int* lhs_data4 = i_to_i(matrices[8]);
	for (int i = 1; i <= 9; ++ i) {
		int tmp17 = (i - 5) * i;
		int idx7 = convertSubscript(ndim6, dim6, i);
		lhs_data4[idx7] = tmp17;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim6; iter4++)
	{
		size4 *= dim6[iter4];
	}
	Matrix *mat4 = createM(ndim6, dim6, 0);
	writeM(mat4, size4, lhs_data4);
	int idx8 = convertSubscript(ndim1, dim1, 8);
	Matrix * tmp18 = transposeM(tmp16);
	matrices[8] = tmp18;
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp19 = zerosM(ndim7, dim7);
	matrices[9] = tmp19;
	double* lhs_data5 = i_to_d(matrices[9]);
	for (int i = 1; i <= 9; ++ i) {
		double tmp20 = (i - 8.2) * i + 0.5;
		int idx9 = convertSubscript(ndim7, dim7, i);
		lhs_data5[idx9] = tmp20;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim7; iter5++)
	{
		size5 *= dim7[iter5];
	}
	Matrix *mat5 = createM(ndim7, dim7, 1);
	writeM(mat5, size5, lhs_data5);
	int idx10 = convertSubscript(ndim1, dim1, 9);
	Matrix * tmp21 = transposeM(tmp19);
	matrices[9] = tmp21;
	int ndim8 = 2;
	int dim8[2] = {3,3};
	Matrix * tmp22 = zerosM(ndim8, dim8);
	matrices[10] = tmp22;
	complex* lhs_data6 = i_to_c(matrices[10]);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp23 = (i - 5.89) * (i) + ((0.5) * (4 - i)) * 1*I;
		int idx11 = convertSubscript(ndim8, dim8, i);
		lhs_data6[idx11] = tmp23;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim8; iter6++)
	{
		size6 *= dim8[iter6];
	}
	Matrix *mat6 = createM(ndim8, dim8, 2);
	writeM(mat6, size6, lhs_data6);
	int idx12 = convertSubscript(ndim1, dim1, 10);
	Matrix * tmp24 = transposeM(tmp22);
	matrices[10] = tmp24;
	
	int ndim9 = 2;
	int dim9[2] = {3,3};
	matrices[11] = createM(ndim9, dim9, 0);
	int *input1 = NULL;
	input1 = malloc( 9*sizeof(*input1));
	input1[0] = 3;
	input1[1] = -2;
	input1[2] = 0;
	input1[3] = 4;
	input1[4] = -1;
	input1[5] = 0;
	input1[6] = 0;
	input1[7] = 0;
	input1[8] = 1;
	writeM( matrices[11], 9, input1);
	free(input1);
	
	
	int ndim10 = 2;
	int dim10[2] = {3,3};
	matrices[12] = createM(ndim10, dim10, 1);
	double *input2 = NULL;
	input2 = malloc( 9*sizeof(*input2));
	input2[0] = 11.25;
	input2[1] = -7.525;
	input2[2] = -1.45;
	input2[3] = 11;
	input2[4] = -6.9;
	input2[5] = -2.2;
	input2[6] = 5.5;
	input2[7] = -5.45;
	input2[8] = 2.9;
	writeM( matrices[12], 9, input2);
	free(input2);
	
	int ndim11 = 2;
	int dim11[2] = {3,3};
	Matrix * tmp25 = zerosM(ndim11, dim11);
	matrices[13] = tmp25;
	int* lhs_data7 = i_to_i(matrices[13]);
	for (int i = 1; i <= 9; ++ i) {
		int tmp26 = pow((-1), i);
		int tmp28 = pow((-1), i);
		int tmp27 = tmp28 * i * i;
		int idx13 = convertSubscript(ndim11, dim11, i);
		lhs_data7[idx13] = tmp27;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter7 = 0 ; iter7 < ndim11; iter7++)
	{
		size7 *= dim11[iter7];
	}
	Matrix *mat7 = createM(ndim11, dim11, 0);
	writeM(mat7, size7, lhs_data7);
	int idx14 = convertSubscript(ndim1, dim1, 13);
	Matrix * tmp29 = transposeM(tmp25);
	matrices[13] = tmp29;
	// Non-diagonalizeable matrices
	
	int ndim12 = 2;
	int dim12[2] = {3,3};
	matrices[14] = createM(ndim12, dim12, 0);
	int *input3 = NULL;
	input3 = malloc( 9*sizeof(*input3));
	input3[0] = 1;
	input3[1] = 1;
	input3[2] = 0;
	input3[3] = 0;
	input3[4] = 1;
	input3[5] = 0;
	input3[6] = 0;
	input3[7] = 0;
	input3[8] = 0;
	writeM( matrices[14], 9, input3);
	free(input3);
	
	
	int ndim13 = 2;
	int dim13[2] = {3,3};
	matrices[15] = createM(ndim13, dim13, 0);
	int *input4 = NULL;
	input4 = malloc( 9*sizeof(*input4));
	input4[0] = 3;
	input4[1] = 4;
	input4[2] = 3;
	input4[3] = -1;
	input4[4] = 0;
	input4[5] = -1;
	input4[6] = 1;
	input4[7] = 2;
	input4[8] = 3;
	writeM( matrices[15], 9, input4);
	free(input4);
	
	// Returns slightly different eigenvectors compared to the C output
	for (int index = 1; index <= 14; ++ index) {
		printf("\n%s\n", "Original\n");
		printM(matrices[index]);
		int idx15 = convertSubscript(ndim1, dim1, index);
		complex complex_one = 1;
		Matrix * V1 = NULL;
		Matrix * lambda1 = NULL;
		Matrix * evals1 = NULL;
		Matrix * evecs1 = NULL;
		eigM(matrices[idx15], &evals1, &evecs1);
		lambda1 = scaleM(evals1, &complex_one, COMPLEX);
		V1 = scaleM(evecs1, &complex_one, COMPLEX);
		printf("\n%s\n", "Eigenvalues:\n");
		printM(lambda1);
		printf("\n%s\n", "Eigenvectors:\n");
		printM(V1);
	
	}
	return 0;
}
