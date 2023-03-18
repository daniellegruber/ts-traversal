//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

// Function declarations
void int_reindexing_tests(Matrix * a);
void double_reindexing_tests(Matrix * a);
void complex_reindexing_tests(Matrix * a);

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
	int_reindexing_tests(a);
	//row_vectors_d
	
	
	int ndim2 = 2;
	int dim2[2] = {1,4};
	a = createM(ndim2, dim2, 1);
	double *input2 = NULL;
	input2 = malloc( 4*sizeof(*input2));
	input2[0] = 3.25;
	input2[1] = -2;
	input2[2] = 0;
	input2[3] = 10.1;
	writeM( a, 4, input2);
	free(input2);
	
	printM(a);
	double_reindexing_tests(a);
	//row_vectors_c
	
	
	int ndim3 = 2;
	int dim3[2] = {1,4};
	a = createM(ndim3, dim3, 2);
	complex *input3 = NULL;
	input3 = malloc( 4*sizeof(*input3));
	input3[0] = 3.25;
	input3[1] = -2;
	input3[2] = 0;
	input3[3] = 1 - 1*I;
	writeM( a, 4, input3);
	free(input3);
	
	printM(a);
	complex_reindexing_tests(a);
	//column_vectors_i
	
	
	int ndim4 = 2;
	int dim4[2] = {4,1};
	a = createM(ndim4, dim4, 0);
	int *input4 = NULL;
	input4 = malloc( 4*sizeof(*input4));
	input4[0] = 3;
	input4[1] = -5;
	input4[2] = 0;
	input4[3] = 1;
	writeM( a, 4, input4);
	free(input4);
	
	printM(a);
	int_reindexing_tests(a);
	//column_vectors_d
	
	
	int ndim5 = 2;
	int dim5[2] = {4,1};
	a = createM(ndim5, dim5, 1);
	double *input5 = NULL;
	input5 = malloc( 4*sizeof(*input5));
	input5[0] = 3.25;
	input5[1] = -2;
	input5[2] = 0;
	input5[3] = 10.1;
	writeM( a, 4, input5);
	free(input5);
	
	printM(a);
	double_reindexing_tests(a);
	//column_vectors_c
	
	
	int ndim6 = 2;
	int dim6[2] = {4,1};
	a = createM(ndim6, dim6, 2);
	complex *input6 = NULL;
	input6 = malloc( 4*sizeof(*input6));
	input6[0] = 3.25;
	input6[1] = -2;
	input6[2] = 0;
	input6[3] = 1 - 1*I;
	writeM( a, 4, input6);
	free(input6);
	
	printM(a);
	complex_reindexing_tests(a);
	//matrices_23_i
	
	
	int ndim7 = 2;
	int dim7[2] = {2,3};
	a = createM(ndim7, dim7, 0);
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
	int_reindexing_tests(a);
	//matrices_23_d
	
	
	int ndim8 = 2;
	int dim8[2] = {2,3};
	a = createM(ndim8, dim8, 1);
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
	double_reindexing_tests(a);
	//matrices_23_c
	
	
	int ndim9 = 2;
	int dim9[2] = {2,3};
	a = createM(ndim9, dim9, 2);
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
	complex_reindexing_tests(a);
	//matrices_32_i
	
	
	int ndim10 = 2;
	int dim10[2] = {3,2};
	a = createM(ndim10, dim10, 0);
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
	int_reindexing_tests(a);
	//matrices_32_d
	
	
	int ndim11 = 2;
	int dim11[2] = {3,2};
	a = createM(ndim11, dim11, 1);
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
	double_reindexing_tests(a);
	//matrices_32_c
	
	
	int ndim12 = 2;
	int dim12[2] = {3,2};
	a = createM(ndim12, dim12, 2);
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
	complex_reindexing_tests(a);
	//matrices_97_i
	
	int ndim13 = 2;
	int dim13[2] = {7, 9};
	Matrix * tmp1 = zerosM(ndim13, dim13);
	a = tmp1;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp2 = pow((-1), i);
		int tmp3 = pow(i, 2);
		int tmp5 = pow((-1), i);
		int tmp6 = pow(i, 2);
		int tmp4 = tmp5 * tmp6;
		int idx1 = convertSubscript(ndim13, dim13, i);
		lhs_data1[idx1] = tmp4;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim13; iter1++)
	{
		size1 *= dim13[iter1];
	}
	Matrix *mat1 = createM(ndim13, dim13, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp7 = transposeM(mat1);
	a = tmp7;
	printM(a);
	int_reindexing_tests(a);
	//matrices_97_d
	
	int ndim14 = 2;
	int dim14[2] = {7, 9};
	Matrix * tmp8 = zerosM(ndim14, dim14);
	a = tmp8;
	double* lhs_data2 = d_to_d(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp9 = pow((-1), i);
		int tmp10 = pow(i, 2);
		int tmp12 = pow((-1), i);
		int tmp13 = pow(i, 2);
		double tmp11 = (double) tmp12 * tmp13 / 17;
		int idx2 = convertSubscript(ndim14, dim14, i);
		lhs_data2[idx2] = tmp11;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim14; iter2++)
	{
		size2 *= dim14[iter2];
	}
	Matrix *mat2 = createM(ndim14, dim14, 1);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp14 = transposeM(mat2);
	a = tmp14;
	printM(a);
	double_reindexing_tests(a);
	//matrices_97_c
	
	int ndim15 = 2;
	int dim15[2] = {7, 9};
	Matrix * tmp15 = zerosM(ndim15, dim15);
	a = tmp15;
	complex* lhs_data3 = c_to_c(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp16 = pow((-1), i);
		int tmp18 = pow((-1), i);
		complex tmp17 = tmp18 * i - ((complex) i) / (17*I);
		int idx3 = convertSubscript(ndim15, dim15, i);
		lhs_data3[idx3] = tmp17;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim15; iter3++)
	{
		size3 *= dim15[iter3];
	}
	Matrix *mat3 = createM(ndim15, dim15, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp19 = transposeM(mat3);
	a = tmp19;
	printM(a);
	complex_reindexing_tests(a);
	return 0;
}


// Subprograms

void int_reindexing_tests(Matrix * a) {
	Matrix * tmp20 = transposeM(a);
	a = tmp20;
	int ndim17 = getnDimM(a);
	int *dim17 = getDimsM(a);
	int idx4 = convertSubscript(ndim17, dim17, 1);
	int tmp21;
	indexM(a, &tmp21, 1, idx4 + 1);
	
	int ndim16 = 2;
	int dim16[2] = {1,1};
	Matrix * mat4 = createM(ndim16, dim16, 0);
	int *input13 = NULL;
	input13 = malloc( 1*sizeof(*input13));
	input13[0] = tmp21;
	writeM( mat4, 1, input13);
	free(input13);
	
	printM(mat4);
	int idx5 = convertSubscript(ndim17, dim17, 4);
	int tmp22;
	indexM(a, &tmp22, 1, idx5 + 1);
	
	int ndim18 = 2;
	int dim18[2] = {1,1};
	Matrix * mat5 = createM(ndim18, dim18, 0);
	int *input14 = NULL;
	input14 = malloc( 1*sizeof(*input14));
	input14[0] = tmp22;
	writeM( mat5, 1, input14);
	free(input14);
	
	printM(mat5);
	int idx6 = convertSubscript(ndim17, dim17, 2);
	int tmp24;
	indexM(a, &tmp24, 1, idx6 + 1);
	int idx7 = convertSubscript(ndim17, dim17, 3);
	int tmp25;
	indexM(a, &tmp25, 1, idx7 + 1);
	
	int ndim19 = 2;
	int dim19[2] = {4,1};
	Matrix * mat6 = createM(ndim19, dim19, 0);
	int *input15 = NULL;
	input15 = malloc( 4*sizeof(*input15));
	input15[0] = tmp21;
	input15[1] = tmp24;
	input15[2] = tmp25;
	input15[3] = tmp22;
	writeM( mat6, 4, input15);
	free(input15);
	
	printM(mat6);
	
	int ndim20 = 2;
	int dim20[2] = {4,1};
	Matrix * mat7 = createM(ndim20, dim20, 0);
	int *input16 = NULL;
	input16 = malloc( 4*sizeof(*input16));
	input16[0] = tmp22;
	input16[1] = tmp25;
	input16[2] = tmp24;
	input16[3] = tmp21;
	writeM( mat7, 4, input16);
	free(input16);
	
	printM(mat7);
	
	int ndim21 = 2;
	int dim21[2] = {3,1};
	Matrix * mat8 = createM(ndim21, dim21, 0);
	int *input17 = NULL;
	input17 = malloc( 3*sizeof(*input17));
	input17[0] = tmp24;
	input17[1] = tmp24;
	input17[2] = tmp24;
	writeM( mat8, 3, input17);
	free(input17);
	
	printM(mat8);
	
	int ndim22 = 2;
	int dim22[2] = {10,1};
	Matrix * mat9 = createM(ndim22, dim22, 0);
	int *input18 = NULL;
	input18 = malloc( 10*sizeof(*input18));
	input18[0] = tmp21;
	input18[1] = tmp24;
	input18[2] = tmp24;
	input18[3] = tmp25;
	input18[4] = tmp25;
	input18[5] = tmp25;
	input18[6] = tmp22;
	input18[7] = tmp22;
	input18[8] = tmp22;
	input18[9] = tmp22;
	writeM( mat9, 10, input18);
	free(input18);
	
	printM(mat9);
}

void double_reindexing_tests(Matrix * a) {
	Matrix * tmp44 = transposeM(a);
	a = tmp44;
	int ndim24 = getnDimM(a);
	int *dim24 = getDimsM(a);
	int idx8 = convertSubscript(ndim24, dim24, 1);
	double tmp45;
	indexM(a, &tmp45, 1, idx8 + 1);
	
	int ndim23 = 2;
	int dim23[2] = {1,1};
	Matrix * mat10 = createM(ndim23, dim23, 1);
	double *input19 = NULL;
	input19 = malloc( 1*sizeof(*input19));
	input19[0] = tmp45;
	writeM( mat10, 1, input19);
	free(input19);
	
	printM(mat10);
	int idx9 = convertSubscript(ndim24, dim24, 4);
	double tmp46;
	indexM(a, &tmp46, 1, idx9 + 1);
	
	int ndim25 = 2;
	int dim25[2] = {1,1};
	Matrix * mat11 = createM(ndim25, dim25, 1);
	double *input20 = NULL;
	input20 = malloc( 1*sizeof(*input20));
	input20[0] = tmp46;
	writeM( mat11, 1, input20);
	free(input20);
	
	printM(mat11);
	int idx10 = convertSubscript(ndim24, dim24, 2);
	double tmp48;
	indexM(a, &tmp48, 1, idx10 + 1);
	int idx11 = convertSubscript(ndim24, dim24, 3);
	double tmp49;
	indexM(a, &tmp49, 1, idx11 + 1);
	
	int ndim26 = 2;
	int dim26[2] = {4,1};
	Matrix * mat12 = createM(ndim26, dim26, 1);
	double *input21 = NULL;
	input21 = malloc( 4*sizeof(*input21));
	input21[0] = tmp45;
	input21[1] = tmp48;
	input21[2] = tmp49;
	input21[3] = tmp46;
	writeM( mat12, 4, input21);
	free(input21);
	
	printM(mat12);
	
	int ndim27 = 2;
	int dim27[2] = {4,1};
	Matrix * mat13 = createM(ndim27, dim27, 1);
	double *input22 = NULL;
	input22 = malloc( 4*sizeof(*input22));
	input22[0] = tmp46;
	input22[1] = tmp49;
	input22[2] = tmp48;
	input22[3] = tmp45;
	writeM( mat13, 4, input22);
	free(input22);
	
	printM(mat13);
	
	int ndim28 = 2;
	int dim28[2] = {3,1};
	Matrix * mat14 = createM(ndim28, dim28, 1);
	double *input23 = NULL;
	input23 = malloc( 3*sizeof(*input23));
	input23[0] = tmp48;
	input23[1] = tmp48;
	input23[2] = tmp48;
	writeM( mat14, 3, input23);
	free(input23);
	
	printM(mat14);
	
	int ndim29 = 2;
	int dim29[2] = {10,1};
	Matrix * mat15 = createM(ndim29, dim29, 1);
	double *input24 = NULL;
	input24 = malloc( 10*sizeof(*input24));
	input24[0] = tmp45;
	input24[1] = tmp48;
	input24[2] = tmp48;
	input24[3] = tmp49;
	input24[4] = tmp49;
	input24[5] = tmp49;
	input24[6] = tmp46;
	input24[7] = tmp46;
	input24[8] = tmp46;
	input24[9] = tmp46;
	writeM( mat15, 10, input24);
	free(input24);
	
	printM(mat15);
}

void complex_reindexing_tests(Matrix * a) {
	Matrix * tmp68 = transposeM(a);
	a = tmp68;
	int ndim31 = getnDimM(a);
	int *dim31 = getDimsM(a);
	int idx12 = convertSubscript(ndim31, dim31, 1);
	complex tmp69;
	indexM(a, &tmp69, 1, idx12 + 1);
	
	int ndim30 = 2;
	int dim30[2] = {1,1};
	Matrix * mat16 = createM(ndim30, dim30, 2);
	complex *input25 = NULL;
	input25 = malloc( 1*sizeof(*input25));
	input25[0] = tmp69;
	writeM( mat16, 1, input25);
	free(input25);
	
	printM(mat16);
	int idx13 = convertSubscript(ndim31, dim31, 4);
	complex tmp70;
	indexM(a, &tmp70, 1, idx13 + 1);
	
	int ndim32 = 2;
	int dim32[2] = {1,1};
	Matrix * mat17 = createM(ndim32, dim32, 2);
	complex *input26 = NULL;
	input26 = malloc( 1*sizeof(*input26));
	input26[0] = tmp70;
	writeM( mat17, 1, input26);
	free(input26);
	
	printM(mat17);
	int idx14 = convertSubscript(ndim31, dim31, 2);
	complex tmp72;
	indexM(a, &tmp72, 1, idx14 + 1);
	int idx15 = convertSubscript(ndim31, dim31, 3);
	complex tmp73;
	indexM(a, &tmp73, 1, idx15 + 1);
	
	int ndim33 = 2;
	int dim33[2] = {4,1};
	Matrix * mat18 = createM(ndim33, dim33, 2);
	complex *input27 = NULL;
	input27 = malloc( 4*sizeof(*input27));
	input27[0] = tmp69;
	input27[1] = tmp72;
	input27[2] = tmp73;
	input27[3] = tmp70;
	writeM( mat18, 4, input27);
	free(input27);
	
	printM(mat18);
	
	int ndim34 = 2;
	int dim34[2] = {4,1};
	Matrix * mat19 = createM(ndim34, dim34, 2);
	complex *input28 = NULL;
	input28 = malloc( 4*sizeof(*input28));
	input28[0] = tmp70;
	input28[1] = tmp73;
	input28[2] = tmp72;
	input28[3] = tmp69;
	writeM( mat19, 4, input28);
	free(input28);
	
	printM(mat19);
	
	int ndim35 = 2;
	int dim35[2] = {3,1};
	Matrix * mat20 = createM(ndim35, dim35, 2);
	complex *input29 = NULL;
	input29 = malloc( 3*sizeof(*input29));
	input29[0] = tmp72;
	input29[1] = tmp72;
	input29[2] = tmp72;
	writeM( mat20, 3, input29);
	free(input29);
	
	printM(mat20);
	
	int ndim36 = 2;
	int dim36[2] = {10,1};
	Matrix * mat21 = createM(ndim36, dim36, 2);
	complex *input30 = NULL;
	input30 = malloc( 10*sizeof(*input30));
	input30[0] = tmp69;
	input30[1] = tmp72;
	input30[2] = tmp72;
	input30[3] = tmp73;
	input30[4] = tmp73;
	input30[5] = tmp73;
	input30[6] = tmp70;
	input30[7] = tmp70;
	input30[8] = tmp70;
	input30[9] = tmp70;
	writeM( mat21, 10, input30);
	free(input30);
	
	printM(mat21);
}