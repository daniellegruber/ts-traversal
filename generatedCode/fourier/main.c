//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

// Function declarations
void fourier_script(Matrix * a);
void fourier_vec_script(Matrix * a);

// Entry-point function
int main(void) {

	//more off
	//format short
	//source octaveIncludes.m;
	//row_vectors_i
	
	int ndim1 = 2;
	int dim1[2] = {1,4};
	Matrix * a = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 4*sizeof(*input1));
	input1[0] = 3;
	input1[1] = -5;
	input1[2] = 0;
	input1[3] = 1;
	writeM( a, 4, input1);
	free(input1);
	
	printM(a);
	fourier_vec_script(a);
	fourier_script(a);
	//row_vectors_d
	
	int ndim2 = 2;
	int dim2[2] = {1,4};
	Matrix * a = createM(ndim2, dim2, 1);
	double *input2 = NULL;
	input2 = malloc( 4*sizeof(*input2));
	input2[0] = 3.25;
	input2[1] = -2;
	input2[2] = 0;
	input2[3] = 10.1;
	writeM( a, 4, input2);
	free(input2);
	
	printM(a);
	fourier_vec_script(a);
	fourier_script(a);
	//row_vectors_c
	
	int ndim3 = 2;
	int dim3[2] = {1,4};
	Matrix * a = createM(ndim3, dim3, 2);
	complex *input3 = NULL;
	input3 = malloc( 4*sizeof(*input3));
	input3[0] = 3.25;
	input3[1] = -2;
	input3[2] = 0;
	input3[3] = 1 - 1*I;
	writeM( a, 4, input3);
	free(input3);
	
	printM(a);
	fourier_vec_script(a);
	fourier_script(a);
	//column_vectors_i
	
	int ndim4 = 2;
	int dim4[2] = {4,1};
	Matrix * a = createM(ndim4, dim4, 0);
	int *input4 = NULL;
	input4 = malloc( 4*sizeof(*input4));
	input4[0] = 3;
	input4[1] = -5;
	input4[2] = 0;
	input4[3] = 1;
	writeM( a, 4, input4);
	free(input4);
	
	printM(a);
	fourier_vec_script(a);
	fourier_script(a);
	//column_vectors_d
	
	int ndim5 = 2;
	int dim5[2] = {4,1};
	Matrix * a = createM(ndim5, dim5, 1);
	double *input5 = NULL;
	input5 = malloc( 4*sizeof(*input5));
	input5[0] = 3.25;
	input5[1] = -2;
	input5[2] = 0;
	input5[3] = 10.1;
	writeM( a, 4, input5);
	free(input5);
	
	printM(a);
	fourier_vec_script(a);
	fourier_script(a);
	//column_vectors_c
	
	int ndim6 = 2;
	int dim6[2] = {4,1};
	Matrix * a = createM(ndim6, dim6, 2);
	complex *input6 = NULL;
	input6 = malloc( 4*sizeof(*input6));
	input6[0] = 3.25;
	input6[1] = -2;
	input6[2] = 0;
	input6[3] = 1 - 1*I;
	writeM( a, 4, input6);
	free(input6);
	
	printM(a);
	fourier_vec_script(a);
	fourier_script(a);
	//matrices_23_i
	
	int ndim7 = 2;
	int dim7[2] = {2,3};
	Matrix * a = createM(ndim7, dim7, 0);
	int *input7 = NULL;
	input7 = malloc( 6*sizeof(*input7));
	input7[0] = 3;
	input7[1] = -2;
	input7[2] = 0;
	input7[3] = 1;
	input7[4] = 5;
	input7[5] = 10;
	writeM( a, 6, input7);
	free(input7);
	
	printM(a);
	fourier_script(a);
	//matrices_23_d
	
	int ndim8 = 2;
	int dim8[2] = {2,3};
	Matrix * a = createM(ndim8, dim8, 1);
	double *input8 = NULL;
	input8 = malloc( 6*sizeof(*input8));
	input8[0] = 3.25;
	input8[1] = -2;
	input8[2] = 0;
	input8[3] = 1;
	input8[4] = 5;
	input8[5] = 10;
	writeM( a, 6, input8);
	free(input8);
	
	printM(a);
	fourier_script(a);
	//matrices_23_c
	
	int ndim9 = 2;
	int dim9[2] = {2,3};
	Matrix * a = createM(ndim9, dim9, 2);
	complex *input9 = NULL;
	input9 = malloc( 6*sizeof(*input9));
	input9[0] = 3.25;
	input9[1] = -2;
	input9[2] = 0;
	input9[3] = 1;
	input9[4] = 5 - 1*I;
	input9[5] = 10;
	writeM( a, 6, input9);
	free(input9);
	
	printM(a);
	fourier_script(a);
	//matrices_32_i
	
	int ndim10 = 2;
	int dim10[2] = {3,2};
	Matrix * a = createM(ndim10, dim10, 0);
	int *input10 = NULL;
	input10 = malloc( 6*sizeof(*input10));
	input10[0] = 3;
	input10[1] = -2;
	input10[2] = 0;
	input10[3] = 1;
	input10[4] = 5;
	input10[5] = 10;
	writeM( a, 6, input10);
	free(input10);
	
	printM(a);
	fourier_script(a);
	//matrices_32_d
	
	int ndim11 = 2;
	int dim11[2] = {3,2};
	Matrix * a = createM(ndim11, dim11, 1);
	double *input11 = NULL;
	input11 = malloc( 6*sizeof(*input11));
	input11[0] = 3.25;
	input11[1] = -2;
	input11[2] = 0;
	input11[3] = 1;
	input11[4] = 5;
	input11[5] = 10;
	writeM( a, 6, input11);
	free(input11);
	
	printM(a);
	fourier_script(a);
	//matrices_32_c
	
	int ndim12 = 2;
	int dim12[2] = {3,2};
	Matrix * a = createM(ndim12, dim12, 2);
	complex *input12 = NULL;
	input12 = malloc( 6*sizeof(*input12));
	input12[0] = 3.25;
	input12[1] = -2;
	input12[2] = 0;
	input12[3] = 1;
	input12[4] = 5 - 1*I;
	input12[5] = 10;
	writeM( a, 6, input12);
	free(input12);
	
	printM(a);
	fourier_script(a);
	//matrices_97_i
	int ndim13 = 2;
	int dim13[2] = {7, 9};
	Matrix * tmp5 = zerosM(ndim13, dim13);
	a = tmp5;
	int* lhs_data1 = i_to_i(a);
	for (int iter2 = 1; iter2 <= 63; ++ iter2) {
		int tmp6 = pow((-1), iter2);
		int tmp7 = pow(iter2, 2);
		int tmp9 = pow((-1), iter2);
		int tmp10 = pow(iter2, 2);
		int tmp8 = tmp9 * tmp10;
		int idx1 = convertSubscript(ndim13, dim13, iter2);
		lhs_data1[idx1] = tmp8;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter3 = 0 ; iter3 < ndim13; iter3++)
	{
		size1 *= dim13[iter3];
	}
	Matrix *mat1 = createM(ndim13, dim13, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp11 = transposeM(mat1);
	lhs_data1 = tmp11;
	printM(a);
	fourier_script(a);
	//matrices_97_d
	int ndim14 = 2;
	int dim14[2] = {7, 9};
	Matrix * tmp12 = zerosM(ndim14, dim14);
	a = tmp12;
	int* lhs_data2 = i_to_i(a);
	for (int iter4 = 1; iter4 <= 63; ++ iter4) {
		int tmp13 = pow((-1), iter4);
		int tmp14 = pow(iter4, 2);
		int tmp16 = pow((-1), iter4);
		int tmp17 = pow(iter4, 2);
		int tmp15 = (double) tmp16 * tmp17 / 17;
		int idx2 = convertSubscript(ndim14, dim14, iter4);
		lhs_data2[idx2] = tmp15;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter5 = 0 ; iter5 < ndim14; iter5++)
	{
		size2 *= dim14[iter5];
	}
	Matrix *mat2 = createM(ndim14, dim14, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp18 = transposeM(mat2);
	lhs_data2 = tmp18;
	printM(a);
	fourier_script(a);
	//matrices_97_c
	int ndim15 = 2;
	int dim15[2] = {7, 9};
	Matrix * tmp19 = zerosM(ndim15, dim15);
	a = tmp19;
	complex* lhs_data3 = i_to_c(a);
	for (int iter6 = 1; iter6 <= 63; ++ iter6) {
		int tmp20 = pow((-1), iter6);
		int tmp22 = pow((-1), iter6);
		complex tmp21 = tmp22 * iter6 - ((complex) iter6) / (17*I);
		int idx3 = convertSubscript(ndim15, dim15, iter6);
		lhs_data3[idx3] = tmp21;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter7 = 0 ; iter7 < ndim15; iter7++)
	{
		size3 *= dim15[iter7];
	}
	Matrix *mat3 = createM(ndim15, dim15, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp23 = transposeM(mat3);
	lhs_data3 = tmp23;
	printM(a);
	fourier_script(a);
	return 0;
}


// Subprograms

void fourier_script(Matrix * a) {
	Matrix * tmp1 = fftM(a);
	printM(tmp1);
	Matrix * tmp2 = ifftM(a);
	printM(tmp2);
}

void fourier_vec_script(Matrix * a) {
	for (int iter1 = 1; iter1 <= 20; ++ iter1) {
		Matrix * tmp3 = fftM(a);
		printM(tmp3);
		Matrix * tmp4 = ifftM(a);
		printM(tmp4);
	
	}
}