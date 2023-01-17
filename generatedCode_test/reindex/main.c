//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
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
	
	int ndim19 = 2;
	int dim19[2] = {1,4};
	Matrix * a = createM(ndim19, dim19, 0);
	int *input19 = NULL;
	input19 = malloc( 4*sizeof(*input19));
	input19[0] = 3;
	input19[1] = -5;
	input19[2] = 0;
	input19[3] = 1;
	writeM( a, 4, input19);
	free(input19);
	
	printM(a);
	int_reindexing_tests(a);
	//row_vectors_d
	
	int ndim20 = 2;
	int dim20[2] = {1,4};
	a = createM(ndim20, dim20, 1);
	double *input20 = NULL;
	input20 = malloc( 4*sizeof(*input20));
	input20[0] = 3.25;
	input20[1] = -2;
	input20[2] = 0;
	input20[3] = 10.1;
	writeM( a, 4, input20);
	free(input20);
	
	printM(a);
	double_reindexing_tests(a);
	//row_vectors_c
	
	int ndim21 = 2;
	int dim21[2] = {1,4};
	a = createM(ndim21, dim21, 2);
	complex *input21 = NULL;
	input21 = malloc( 4*sizeof(*input21));
	input21[0] = 3.25;
	input21[1] = -2;
	input21[2] = 0;
	input21[3] = 1 - 1*I;
	writeM( a, 4, input21);
	free(input21);
	
	printM(a);
	complex_reindexing_tests(a);
	//column_vectors_i
	
	int ndim22 = 2;
	int dim22[2] = {4,1};
	a = createM(ndim22, dim22, 0);
	int *input22 = NULL;
	input22 = malloc( 4*sizeof(*input22));
	input22[0] = 3;
	input22[1] = -5;
	input22[2] = 0;
	input22[3] = 1;
	writeM( a, 4, input22);
	free(input22);
	
	printM(a);
	int_reindexing_tests(a);
	//column_vectors_d
	
	int ndim23 = 2;
	int dim23[2] = {4,1};
	a = createM(ndim23, dim23, 1);
	double *input23 = NULL;
	input23 = malloc( 4*sizeof(*input23));
	input23[0] = 3.25;
	input23[1] = -2;
	input23[2] = 0;
	input23[3] = 10.1;
	writeM( a, 4, input23);
	free(input23);
	
	printM(a);
	double_reindexing_tests(a);
	//column_vectors_c
	
	int ndim24 = 2;
	int dim24[2] = {4,1};
	a = createM(ndim24, dim24, 2);
	complex *input24 = NULL;
	input24 = malloc( 4*sizeof(*input24));
	input24[0] = 3.25;
	input24[1] = -2;
	input24[2] = 0;
	input24[3] = 1 - 1*I;
	writeM( a, 4, input24);
	free(input24);
	
	printM(a);
	complex_reindexing_tests(a);
	//matrices_23_i
	
	int ndim25 = 2;
	int dim25[2] = {2,3};
	a = createM(ndim25, dim25, 0);
	int *input25 = NULL;
	input25 = malloc( 6*sizeof(*input25));
	input25[0] = 3;
	input25[1] = -2;
	input25[2] = 0;
	input25[3] = 1;
	input25[4] = 5;
	input25[5] = 10;
	writeM( a, 6, input25);
	free(input25);
	
	printM(a);
	int_reindexing_tests(a);
	//matrices_23_d
	
	int ndim26 = 2;
	int dim26[2] = {2,3};
	a = createM(ndim26, dim26, 1);
	double *input26 = NULL;
	input26 = malloc( 6*sizeof(*input26));
	input26[0] = 3.25;
	input26[1] = -2;
	input26[2] = 0;
	input26[3] = 1;
	input26[4] = 5;
	input26[5] = 10;
	writeM( a, 6, input26);
	free(input26);
	
	printM(a);
	double_reindexing_tests(a);
	//matrices_23_c
	
	int ndim27 = 2;
	int dim27[2] = {2,3};
	a = createM(ndim27, dim27, 2);
	complex *input27 = NULL;
	input27 = malloc( 6*sizeof(*input27));
	input27[0] = 3.25;
	input27[1] = -2;
	input27[2] = 0;
	input27[3] = 1;
	input27[4] = 5 - 1*I;
	input27[5] = 10;
	writeM( a, 6, input27);
	free(input27);
	
	printM(a);
	complex_reindexing_tests(a);
	//matrices_32_i
	
	int ndim28 = 2;
	int dim28[2] = {3,2};
	a = createM(ndim28, dim28, 0);
	int *input28 = NULL;
	input28 = malloc( 6*sizeof(*input28));
	input28[0] = 3;
	input28[1] = -2;
	input28[2] = 0;
	input28[3] = 1;
	input28[4] = 5;
	input28[5] = 10;
	writeM( a, 6, input28);
	free(input28);
	
	printM(a);
	int_reindexing_tests(a);
	//matrices_32_d
	
	int ndim29 = 2;
	int dim29[2] = {3,2};
	a = createM(ndim29, dim29, 1);
	double *input29 = NULL;
	input29 = malloc( 6*sizeof(*input29));
	input29[0] = 3.25;
	input29[1] = -2;
	input29[2] = 0;
	input29[3] = 1;
	input29[4] = 5;
	input29[5] = 10;
	writeM( a, 6, input29);
	free(input29);
	
	printM(a);
	double_reindexing_tests(a);
	//matrices_32_c
	
	int ndim30 = 2;
	int dim30[2] = {3,2};
	a = createM(ndim30, dim30, 2);
	complex *input30 = NULL;
	input30 = malloc( 6*sizeof(*input30));
	input30[0] = 3.25;
	input30[1] = -2;
	input30[2] = 0;
	input30[3] = 1;
	input30[4] = 5 - 1*I;
	input30[5] = 10;
	writeM( a, 6, input30);
	free(input30);
	
	printM(a);
	complex_reindexing_tests(a);
	//matrices_97_i
	int ndim31= 2;
	int dim31[2]= {7, 9};
	a = zerosM(ndim31, dim31);
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 63; ++ iter1) {
		int tmp73= pow((-1), iter1);
		int tmp74= pow(iter1, 2);
		int d0_70 = iter1 % 7;
		if (d0_70 == 0) {
			d0_70 = 7;
		}
		int d1_70 = (iter1 - d0_70)/7 + 1;
		int tmp76= pow((-1), iter1);
		int tmp77= pow(iter1, 2);
		int tmp75= tmp76 * tmp77;
		lhs_data1[(d1_70-1) + (d0_70-1) * 9] = tmp75;
	
	}
	// Write matrix mat19
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim31; iter2++)
	{
		size1 *= dim31[iter2];
	}
	Matrix *mat19 = createM(ndim31, dim31, 0);
	writeM(mat19, size1, lhs_data1);
	Matrix * tmp78= transposeM(mat19);
	a = tmp78;
	printM(a);
	int_reindexing_tests(a);
	//matrices_97_d
	int ndim32= 2;
	int dim32[2]= {7, 9};
	a = zerosM(ndim32, dim32);
	int* lhs_data2 = i_to_i(a);
	for (int iter3 = 1; iter3 <= 63; ++ iter3) {
		int tmp79= pow((-1), iter3);
		int tmp80= pow(iter3, 2);
		int d0_71 = iter3 % 7;
		if (d0_71 == 0) {
			d0_71 = 7;
		}
		int d1_71 = (iter3 - d0_71)/7 + 1;
		int tmp82= pow((-1), iter3);
		int tmp83= pow(iter3, 2);
		int tmp81= tmp82 * tmp83 / 17;
		lhs_data2[(d1_71-1) + (d0_71-1) * 9] = tmp81;
	
	}
	mat19 = mat19;
	// Write matrix mat20
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim32; iter4++)
	{
		size2 *= dim32[iter4];
	}
	Matrix *mat20 = createM(ndim32, dim32, 0);
	writeM(mat20, size2, lhs_data2);
	Matrix * tmp84= transposeM(mat20);
	a = tmp84;
	printM(a);
	double_reindexing_tests(a);
	//matrices_97_c
	int ndim33= 2;
	int dim33[2]= {7, 9};
	a = zerosM(ndim33, dim33);
	complex* lhs_data3 = i_to_c(a);
	for (int iter5 = 1; iter5 <= 63; ++ iter5) {
		int tmp85= pow((-1), iter5);
		int d0_72 = iter5 % 7;
		if (d0_72 == 0) {
			d0_72 = 7;
		}
		int d1_72 = (iter5 - d0_72)/7 + 1;
		int tmp87= pow((-1), iter5);
		complex tmp86= tmp87 * iter5 - iter5 / 17*I;
		lhs_data3[(d1_72-1) + (d0_72-1) * 9] = tmp86;
	
	}
	mat20 = mat20;
	// Write matrix mat21
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim33; iter6++)
	{
		size3 *= dim33[iter6];
	}
	Matrix *mat21 = createM(ndim33, dim33, 2);
	writeM(mat21, size3, lhs_data3);
	Matrix * tmp88= transposeM(mat21);
	a = tmp88;
	printM(a);
	complex_reindexing_tests(a);
	return 0;
}


// Subprograms

void int_reindexing_tests(Matrix * a) {
	Matrix * tmp1= transposeM(a);
	a = tmp1;
	int tmp2;
	indexM(a, &tmp2, 1, 1);
	
	int ndim1 = 2;
	int dim1[2] = {1,1};
	Matrix * mat1 = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 1*sizeof(*input1));
	input1[0] = tmp2;
	writeM( mat1, 1, input1);
	free(input1);
	
	printM(mat1);
	int tmp3;
	indexM(a, &tmp3, 1, 22);
	
	int ndim2 = 2;
	int dim2[2] = {1,1};
	Matrix * mat2 = createM(ndim2, dim2, 0);
	int *input2 = NULL;
	input2 = malloc( 1*sizeof(*input2));
	input2[0] = tmp3;
	writeM( mat2, 1, input2);
	free(input2);
	
	printM(mat2);
	int tmp5;
	indexM(a, &tmp5, 1, 8);
	int tmp6;
	indexM(a, &tmp6, 1, 15);
	
	int ndim3 = 2;
	int dim3[2] = {4,1};
	Matrix * mat3 = createM(ndim3, dim3, 0);
	int *input3 = NULL;
	input3 = malloc( 4*sizeof(*input3));
	input3[0] = tmp2;
	input3[1] = tmp5;
	input3[2] = tmp6;
	input3[3] = tmp3;
	writeM( mat3, 4, input3);
	free(input3);
	
	printM(mat3);
	
	int ndim4 = 2;
	int dim4[2] = {4,1};
	Matrix * mat4 = createM(ndim4, dim4, 0);
	int *input4 = NULL;
	input4 = malloc( 4*sizeof(*input4));
	input4[0] = tmp3;
	input4[1] = tmp6;
	input4[2] = tmp5;
	input4[3] = tmp2;
	writeM( mat4, 4, input4);
	free(input4);
	
	printM(mat4);
	
	int ndim5 = 2;
	int dim5[2] = {3,1};
	Matrix * mat5 = createM(ndim5, dim5, 0);
	int *input5 = NULL;
	input5 = malloc( 3*sizeof(*input5));
	input5[0] = tmp5;
	input5[1] = tmp5;
	input5[2] = tmp5;
	writeM( mat5, 3, input5);
	free(input5);
	
	printM(mat5);
	
	int ndim6 = 2;
	int dim6[2] = {10,1};
	Matrix * mat6 = createM(ndim6, dim6, 0);
	int *input6 = NULL;
	input6 = malloc( 10*sizeof(*input6));
	input6[0] = tmp2;
	input6[1] = tmp5;
	input6[2] = tmp5;
	input6[3] = tmp6;
	input6[4] = tmp6;
	input6[5] = tmp6;
	input6[6] = tmp3;
	input6[7] = tmp3;
	input6[8] = tmp3;
	input6[9] = tmp3;
	writeM( mat6, 10, input6);
	free(input6);
	
	printM(mat6);
}

void double_reindexing_tests(Matrix * a) {
	Matrix * tmp25= transposeM(a);
	a = tmp25;
	int tmp26;
	indexM(a, &tmp26, 1, 1);
	
	int ndim7 = 2;
	int dim7[2] = {1,1};
	Matrix * mat7 = createM(ndim7, dim7, 0);
	int *input7 = NULL;
	input7 = malloc( 1*sizeof(*input7));
	input7[0] = tmp26;
	writeM( mat7, 1, input7);
	free(input7);
	
	printM(mat7);
	int tmp27;
	indexM(a, &tmp27, 1, 22);
	
	int ndim8 = 2;
	int dim8[2] = {1,1};
	Matrix * mat8 = createM(ndim8, dim8, 0);
	int *input8 = NULL;
	input8 = malloc( 1*sizeof(*input8));
	input8[0] = tmp27;
	writeM( mat8, 1, input8);
	free(input8);
	
	printM(mat8);
	int tmp29;
	indexM(a, &tmp29, 1, 8);
	int tmp30;
	indexM(a, &tmp30, 1, 15);
	
	int ndim9 = 2;
	int dim9[2] = {4,1};
	Matrix * mat9 = createM(ndim9, dim9, 0);
	int *input9 = NULL;
	input9 = malloc( 4*sizeof(*input9));
	input9[0] = tmp26;
	input9[1] = tmp29;
	input9[2] = tmp30;
	input9[3] = tmp27;
	writeM( mat9, 4, input9);
	free(input9);
	
	printM(mat9);
	
	int ndim10 = 2;
	int dim10[2] = {4,1};
	Matrix * mat10 = createM(ndim10, dim10, 0);
	int *input10 = NULL;
	input10 = malloc( 4*sizeof(*input10));
	input10[0] = tmp27;
	input10[1] = tmp30;
	input10[2] = tmp29;
	input10[3] = tmp26;
	writeM( mat10, 4, input10);
	free(input10);
	
	printM(mat10);
	
	int ndim11 = 2;
	int dim11[2] = {3,1};
	Matrix * mat11 = createM(ndim11, dim11, 0);
	int *input11 = NULL;
	input11 = malloc( 3*sizeof(*input11));
	input11[0] = tmp29;
	input11[1] = tmp29;
	input11[2] = tmp29;
	writeM( mat11, 3, input11);
	free(input11);
	
	printM(mat11);
	
	int ndim12 = 2;
	int dim12[2] = {10,1};
	Matrix * mat12 = createM(ndim12, dim12, 0);
	int *input12 = NULL;
	input12 = malloc( 10*sizeof(*input12));
	input12[0] = tmp26;
	input12[1] = tmp29;
	input12[2] = tmp29;
	input12[3] = tmp30;
	input12[4] = tmp30;
	input12[5] = tmp30;
	input12[6] = tmp27;
	input12[7] = tmp27;
	input12[8] = tmp27;
	input12[9] = tmp27;
	writeM( mat12, 10, input12);
	free(input12);
	
	printM(mat12);
}

void complex_reindexing_tests(Matrix * a) {
	Matrix * tmp49= transposeM(a);
	a = tmp49;
	complex tmp50;
	indexM(a, &tmp50, 1, 1);
	
	int ndim13 = 2;
	int dim13[2] = {1,1};
	Matrix * mat13 = createM(ndim13, dim13, 2);
	complex *input13 = NULL;
	input13 = malloc( 1*sizeof(*input13));
	input13[0] = tmp50;
	writeM( mat13, 1, input13);
	free(input13);
	
	printM(mat13);
	complex tmp51;
	indexM(a, &tmp51, 1, 22);
	
	int ndim14 = 2;
	int dim14[2] = {1,1};
	Matrix * mat14 = createM(ndim14, dim14, 2);
	complex *input14 = NULL;
	input14 = malloc( 1*sizeof(*input14));
	input14[0] = tmp51;
	writeM( mat14, 1, input14);
	free(input14);
	
	printM(mat14);
	complex tmp53;
	indexM(a, &tmp53, 1, 8);
	complex tmp54;
	indexM(a, &tmp54, 1, 15);
	
	int ndim15 = 2;
	int dim15[2] = {4,1};
	Matrix * mat15 = createM(ndim15, dim15, 2);
	complex *input15 = NULL;
	input15 = malloc( 4*sizeof(*input15));
	input15[0] = tmp50;
	input15[1] = tmp53;
	input15[2] = tmp54;
	input15[3] = tmp51;
	writeM( mat15, 4, input15);
	free(input15);
	
	printM(mat15);
	
	int ndim16 = 2;
	int dim16[2] = {4,1};
	Matrix * mat16 = createM(ndim16, dim16, 2);
	complex *input16 = NULL;
	input16 = malloc( 4*sizeof(*input16));
	input16[0] = tmp51;
	input16[1] = tmp54;
	input16[2] = tmp53;
	input16[3] = tmp50;
	writeM( mat16, 4, input16);
	free(input16);
	
	printM(mat16);
	
	int ndim17 = 2;
	int dim17[2] = {3,1};
	Matrix * mat17 = createM(ndim17, dim17, 2);
	complex *input17 = NULL;
	input17 = malloc( 3*sizeof(*input17));
	input17[0] = tmp53;
	input17[1] = tmp53;
	input17[2] = tmp53;
	writeM( mat17, 3, input17);
	free(input17);
	
	printM(mat17);
	
	int ndim18 = 2;
	int dim18[2] = {10,1};
	Matrix * mat18 = createM(ndim18, dim18, 2);
	complex *input18 = NULL;
	input18 = malloc( 10*sizeof(*input18));
	input18[0] = tmp50;
	input18[1] = tmp53;
	input18[2] = tmp53;
	input18[3] = tmp54;
	input18[4] = tmp54;
	input18[5] = tmp54;
	input18[6] = tmp51;
	input18[7] = tmp51;
	input18[8] = tmp51;
	input18[9] = tmp51;
	writeM( mat18, 10, input18);
	free(input18);
	
	printM(mat18);
}