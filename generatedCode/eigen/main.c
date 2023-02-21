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
	for (int i = 1; i <= 9; ++ i) {
		int d0_6 = i % 1;
		if (d0_6 == 0) {
			d0_6 = 1;
		}
		int d1_6 = (i - d0_6)/1 + 1;
		int tmp8 = i * i;
		lhs_data1[(d1_6-1) + (d0_6-1) ] = tmp8;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim2; iter1++)
	{
		size1 *= dim2[iter1];
	}
	Matrix *mat1 = createM(ndim2, dim2, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp9 = transposeM(matrices[4]);
	matrices[4] = tmp9;
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp10 = zerosM(ndim3, dim3);
	matrices[5] = tmp10;
	for (int i = 1; i <= 9; ++ i) {
		int d0_11 = i % 1;
		if (d0_11 == 0) {
			d0_11 = 1;
		}
		int d1_11 = (i - d0_11)/1 + 1;
		double tmp11 = i * i + 0.5;
		lhs_data1[(d1_11-1) + (d0_11-1) ] = tmp11;
	
	}
	Matrix * tmp12 = transposeM(matrices[5]);
	matrices[5] = tmp12;
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp13 = zerosM(ndim4, dim4);
	matrices[6] = tmp13;
	for (int i = 1; i <= 9; ++ i) {
		int d0_15 = i % 1;
		if (d0_15 == 0) {
			d0_15 = 1;
		}
		int d1_15 = (i - d0_15)/1 + 1;
		complex tmp14 = i * i + 0.5*I;
		lhs_data1[(d1_15-1) + (d0_15-1) ] = tmp14;
	
	}
	Matrix * tmp15 = transposeM(matrices[6]);
	matrices[6] = tmp15;
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp16 = zerosM(ndim5, dim5);
	matrices[7] = tmp16;
	for (int i = 1; i <= 9; ++ i) {
		int d0_19 = i % 1;
		if (d0_19 == 0) {
			d0_19 = 1;
		}
		int d1_19 = (i - d0_19)/1 + 1;
		int tmp17 = (i - 5) * i;
		lhs_data1[(d1_19-1) + (d0_19-1) ] = tmp17;
	
	}
	Matrix * tmp18 = transposeM(matrices[7]);
	matrices[7] = tmp18;
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp19 = zerosM(ndim6, dim6);
	matrices[8] = tmp19;
	for (int i = 1; i <= 9; ++ i) {
		int d0_23 = i % 1;
		if (d0_23 == 0) {
			d0_23 = 1;
		}
		int d1_23 = (i - d0_23)/1 + 1;
		double tmp20 = (i - 8.2) * i + 0.5;
		lhs_data1[(d1_23-1) + (d0_23-1) ] = tmp20;
	
	}
	Matrix * tmp21 = transposeM(matrices[8]);
	matrices[8] = tmp21;
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp22 = zerosM(ndim7, dim7);
	matrices[9] = tmp22;
	for (int i = 1; i <= 9; ++ i) {
		int d0_27 = i % 1;
		if (d0_27 == 0) {
			d0_27 = 1;
		}
		int d1_27 = (i - d0_27)/1 + 1;
		complex tmp23 = (i - 5.89) * (i) + ((0.5) * (4 - i)) * 1*I;
		lhs_data1[(d1_27-1) + (d0_27-1) ] = tmp23;
	
	}
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
	for (int i = 1; i <= 9; ++ i) {
		int tmp26 = pow((-1), i);
		int d0_33 = i % 1;
		if (d0_33 == 0) {
			d0_33 = 1;
		}
		int d1_33 = (i - d0_33)/1 + 1;
		int tmp28 = pow((-1), i);
		int tmp27 = tmp28 * i * i;
		lhs_data1[(d1_33-1) + (d0_33-1) ] = tmp27;
	
	}
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
	for (int index = 1; index <= 14; ++ index) {
		printf("\n%s\n", "Original\n");
		int d0_38 = index % 15;
		if (d0_38 == 0) {
			d0_38 = 15;
		}
		int d1_38 = (index - d0_38)/15 + 1;
		printM(matrices[(d1_38-1) + (d0_38-1) ]);
		int d0_39 = index % 15;
		if (d0_39 == 0) {
			d0_39 = 15;
		}
		int d1_39 = (index - d0_39)/15 + 1;
		complex complex_one = 1;
		Matrix * V1 = NULL;
		Matrix * lambda1 = NULL;
		Matrix * evals1 = NULL;
		Matrix * evecs1 = NULL;
		eigM(matrices[(d1_39-1) + (d0_39-1) ], &evals1, &evecs1);
		lambda1 = scaleM(evals1, &complex_one, COMPLEX);
		V1 = scaleM(evecs1, &complex_one, COMPLEX);
		printf("\n%s\n", "Eigenvalues:\n");
		printM(lambda1);
		printf("\n%s\n", "Eigenvectors:\n");
		printM(V1);
	
	}
	return 0;
}
