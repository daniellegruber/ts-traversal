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
	matrices = malloc(15*sizeof(*matrices));
		        
	int ndim1 = 2;
	int dim1[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	matrices[0] = tmp1;
	Matrix * tmp2 = identityM(3);
	int scalar1 = 2;
	Matrix * tmp3 = scaleM(tmp2, &scalar1, 0);
	matrices[1] = tmp3;
	Matrix * tmp4 = identityM(3);
	matrices[2] = tmp4;
	Matrix * tmp5 = identityM(3);
	complex scalar2 = (4.2 - 0.03*I);
	Matrix * tmp6 = scaleM(tmp5, &scalar2, 2);
	matrices[3] = tmp6;
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp7 = zerosM(ndim2, dim2);
	matrices[4] = tmp7;
	int* lhs_data1 = i_to_i(matrices[4]);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int d0_6 = iter1 % 1;
		if (d0_6 == 0) {
			d0_6 = 1;
		}
		int d1_6 = (iter1 - d0_6)/1 + 1;
		int tmp8 = iter1 * iter1;
		lhs_data1[(d1_6-1) + (d0_6-1) ] = tmp8;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size1 *= dim2[iter2];
	}
	Matrix *mat1 = createM(ndim2, dim2, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp9 = transposeM(matrices[4]);
	matrices[4] = tmp9;
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp10 = zerosM(ndim3, dim3);
	matrices[5] = tmp10;
	double* lhs_data2 = i_to_d(matrices[5]);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int d0_11 = iter3 % 1;
		if (d0_11 == 0) {
			d0_11 = 1;
		}
		int d1_11 = (iter3 - d0_11)/1 + 1;
		double tmp11 = iter3 * iter3 + 0.5;
		lhs_data2[(d1_11-1) + (d0_11-1) ] = tmp11;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim3; iter4++)
	{
		size2 *= dim3[iter4];
	}
	Matrix *mat2 = createM(ndim3, dim3, 1);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp12 = transposeM(matrices[5]);
	matrices[5] = tmp12;
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp13 = zerosM(ndim4, dim4);
	matrices[6] = tmp13;
	complex* lhs_data3 = i_to_c(matrices[6]);
	for (int iter5 = 1; iter5 <= 9; ++ iter5) {
		int d0_16 = iter5 % 1;
		if (d0_16 == 0) {
			d0_16 = 1;
		}
		int d1_16 = (iter5 - d0_16)/1 + 1;
		complex tmp14 = iter5 * iter5 + 0.5*I;
		lhs_data3[(d1_16-1) + (d0_16-1) ] = tmp14;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim4; iter6++)
	{
		size3 *= dim4[iter6];
	}
	Matrix *mat3 = createM(ndim4, dim4, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp15 = transposeM(matrices[6]);
	matrices[6] = tmp15;
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp16 = zerosM(ndim5, dim5);
	matrices[7] = tmp16;
	int* lhs_data4 = i_to_i(matrices[7]);
	for (int iter7 = 1; iter7 <= 9; ++ iter7) {
		int d0_21 = iter7 % 1;
		if (d0_21 == 0) {
			d0_21 = 1;
		}
		int d1_21 = (iter7 - d0_21)/1 + 1;
		int tmp17 = (iter7 - 5) * iter7;
		lhs_data4[(d1_21-1) + (d0_21-1) ] = tmp17;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter8 = 0 ; iter8 < ndim5; iter8++)
	{
		size4 *= dim5[iter8];
	}
	Matrix *mat4 = createM(ndim5, dim5, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp18 = transposeM(matrices[7]);
	matrices[7] = tmp18;
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp19 = zerosM(ndim6, dim6);
	matrices[8] = tmp19;
	double* lhs_data5 = i_to_d(matrices[8]);
	for (int iter9 = 1; iter9 <= 9; ++ iter9) {
		int d0_26 = iter9 % 1;
		if (d0_26 == 0) {
			d0_26 = 1;
		}
		int d1_26 = (iter9 - d0_26)/1 + 1;
		double tmp20 = (iter9 - 8.2) * iter9 + 0.5;
		lhs_data5[(d1_26-1) + (d0_26-1) ] = tmp20;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter10 = 0 ; iter10 < ndim6; iter10++)
	{
		size5 *= dim6[iter10];
	}
	Matrix *mat5 = createM(ndim6, dim6, 1);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp21 = transposeM(matrices[8]);
	matrices[8] = tmp21;
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp22 = zerosM(ndim7, dim7);
	matrices[9] = tmp22;
	complex* lhs_data6 = i_to_c(matrices[9]);
	for (int iter11 = 1; iter11 <= 9; ++ iter11) {
		int d0_31 = iter11 % 1;
		if (d0_31 == 0) {
			d0_31 = 1;
		}
		int d1_31 = (iter11 - d0_31)/1 + 1;
		complex tmp23 = (iter11 - 5.89) * (iter11) + ((0.5) * (4 - iter11)) * 1*I;
		lhs_data6[(d1_31-1) + (d0_31-1) ] = tmp23;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter12 = 0 ; iter12 < ndim7; iter12++)
	{
		size6 *= dim7[iter12];
	}
	Matrix *mat6 = createM(ndim7, dim7, 2);
	writeM(mat6, size6, lhs_data6);
	Matrix * tmp24 = transposeM(matrices[9]);
	matrices[9] = tmp24;
	
	int ndim8 = 2;
	int dim8[2] = {3,3};
	matrices[10] = createM(ndim8, dim8, 0);
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
	writeM( matrices[10], 9, input1);
	free(input1);
	
	
	int ndim9 = 2;
	int dim9[2] = {3,3};
	matrices[11] = createM(ndim9, dim9, 1);
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
	writeM( matrices[11], 9, input2);
	free(input2);
	
	int ndim10 = 2;
	int dim10[2] = {3,3};
	Matrix * tmp25 = zerosM(ndim10, dim10);
	matrices[12] = tmp25;
	int* lhs_data7 = i_to_i(matrices[12]);
	for (int iter13 = 1; iter13 <= 9; ++ iter13) {
		int tmp26 = pow((-1), iter13);
		int d0_38 = iter13 % 1;
		if (d0_38 == 0) {
			d0_38 = 1;
		}
		int d1_38 = (iter13 - d0_38)/1 + 1;
		int tmp28 = pow((-1), iter13);
		int tmp27 = tmp28 * iter13 * iter13;
		lhs_data7[(d1_38-1) + (d0_38-1) ] = tmp27;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter14 = 0 ; iter14 < ndim10; iter14++)
	{
		size7 *= dim10[iter14];
	}
	Matrix *mat7 = createM(ndim10, dim10, 0);
	writeM(mat7, size7, lhs_data7);
	Matrix * tmp29 = transposeM(matrices[12]);
	matrices[12] = tmp29;
	// Non-diagonalizeable matrices
	
	int ndim11 = 2;
	int dim11[2] = {3,3};
	matrices[13] = createM(ndim11, dim11, 0);
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
	writeM( matrices[13], 9, input3);
	free(input3);
	
	
	int ndim12 = 2;
	int dim12[2] = {3,3};
	matrices[14] = createM(ndim12, dim12, 0);
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
	writeM( matrices[14], 9, input4);
	free(input4);
	
	// Returns slightly different eigenvectors compared to the C output
	for (int iter15 = 1; iter15 <= 14; ++ iter15) {
		printf("\n%s\n", "Original\n");
		int d0_44 = iter15 % 15;
		if (d0_44 == 0) {
			d0_44 = 15;
		}
		int d1_44 = (iter15 - d0_44)/15 + 1;
		printM(matrices[(d1_44-1) + (d0_44-1) ]);
		int d0_45 = iter15 % 15;
		if (d0_45 == 0) {
			d0_45 = 15;
		}
		int d1_45 = (iter15 - d0_45)/15 + 1;
		complex complex_one = 1;
		Matrix * V1 = NULL;
		Matrix * lambda1 = NULL;
		Matrix * evals1 = NULL;
		Matrix * evecs1 = NULL;
		eigM(matrices[(d1_45-1) + (d0_45-1) ], &evals1, &evecs1);
		lambda1 = scaleM(evals1, &complex_one, COMPLEX);
		V1 = scaleM(evecs1, &complex_one, COMPLEX);
		printf("\n%s\n", "Eigenvalues:\n");
		printM(lambda1);
		printf("\n%s\n", "Eigenvectors:\n");
		printM(V1);
	
	}
	return 0;
}
