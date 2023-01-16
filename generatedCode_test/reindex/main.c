//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

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
	
	int ndim16 = 2;
	int dim16[2] = {1,4};
	Matrix * a = createM(ndim16, dim16, 0);
	int *input16 = NULL;
	input16 = malloc( 4*sizeof(*input16));
	input16[0] = 3;
	input16[1] = -5;
	input16[2] = 0;
	input16[3] = 1;
	writeM( a, 4, input16);
	free(input16);
	
	printM(a);
	int_reindexing_tests(a);
	//row_vectors_d
	
	int ndim17 = 2;
	int dim17[2] = {1,4};
	a = createM(ndim17, dim17, 1);
	double *input17 = NULL;
	input17 = malloc( 4*sizeof(*input17));
	input17[0] = 3.25;
	input17[1] = -2;
	input17[2] = 0;
	input17[3] = 10.1;
	writeM( a, 4, input17);
	free(input17);
	
	printM(a);
	double_reindexing_tests(a);
	//row_vectors_c
	
	int ndim18 = 2;
	int dim18[2] = {1,4};
	a = createM(ndim18, dim18, 2);
	complex *input18 = NULL;
	input18 = malloc( 4*sizeof(*input18));
	input18[0] = 3.25;
	input18[1] = -2;
	input18[2] = 0;
	input18[3] = 1 - 1*I;
	writeM( a, 4, input18);
	free(input18);
	
	printM(a);
	complex_reindexing_tests(a);
	//column_vectors_i
	
	int ndim19 = 2;
	int dim19[2] = {4,1};
	a = createM(ndim19, dim19, 0);
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
	//column_vectors_d
	
	int ndim20 = 2;
	int dim20[2] = {4,1};
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
	//column_vectors_c
	
	int ndim21 = 2;
	int dim21[2] = {4,1};
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
	//matrices_23_i
	
	int ndim22 = 2;
	int dim22[2] = {2,3};
	a = createM(ndim22, dim22, 0);
	int *input22 = NULL;
	input22 = malloc( 6*sizeof(*input22));
	input22[0] = 3;
	input22[1] = -2;
	input22[2] = 0;
	input22[3] = 1;
	input22[4] = 5;
	input22[5] = 10;
	writeM( a, 6, input22);
	free(input22);
	
	printM(a);
	int_reindexing_tests(a);
	//matrices_23_d
	
	int ndim23 = 2;
	int dim23[2] = {2,3};
	a = createM(ndim23, dim23, 1);
	double *input23 = NULL;
	input23 = malloc( 6*sizeof(*input23));
	input23[0] = 3.25;
	input23[1] = -2;
	input23[2] = 0;
	input23[3] = 1;
	input23[4] = 5;
	input23[5] = 10;
	writeM( a, 6, input23);
	free(input23);
	
	printM(a);
	double_reindexing_tests(a);
	//matrices_23_c
	
	int ndim24 = 2;
	int dim24[2] = {2,3};
	a = createM(ndim24, dim24, 2);
	complex *input24 = NULL;
	input24 = malloc( 6*sizeof(*input24));
	input24[0] = 3.25;
	input24[1] = -2;
	input24[2] = 0;
	input24[3] = 1;
	input24[4] = 5 - 1*I;
	input24[5] = 10;
	writeM( a, 6, input24);
	free(input24);
	
	printM(a);
	complex_reindexing_tests(a);
	//matrices_32_i
	
	int ndim25 = 2;
	int dim25[2] = {3,2};
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
	//matrices_32_d
	
	int ndim26 = 2;
	int dim26[2] = {3,2};
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
	//matrices_32_c
	
	int ndim27 = 2;
	int dim27[2] = {3,2};
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
	//matrices_97_i
	int ndim28= 2;
	int dim28[2]= {7, 9};
	a = zerosM(ndim28, dim28);
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 63; ++ iter1) {
		int tmp55= pow((-1), iter1);
		int tmp56= pow(iter1, 2);
		int d0_52 = iter1 % 7;
		if (d0_52 == 0) {
			d0_52 = 7;
		}
		int d1_52 = (iter1 - d0_52)/7 + 1;
		int tmp58= pow((-1), iter1);
		int tmp59= pow(iter1, 2);
		int tmp57= tmp58 * tmp59;
		lhs_data1[(d1_52-1) + (d0_52-1) * 9] = tmp57;
	
	}
	// Write matrix mat16
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim28; iter2++)
	{
		size1 *= dim28[iter2];
	}
	Matrix *mat16 = createM(ndim28, dim28, 0);
	writeM(mat16, size1, lhs_data1);
	Matrix * tmp60= transposeM(mat16);
	a = tmp60;
	printM(a);
	int_reindexing_tests(a);
	//matrices_97_d
	int ndim29= 2;
	int dim29[2]= {7, 9};
	a = zerosM(ndim29, dim29);
	int* lhs_data2 = i_to_i(a);
	for (int iter3 = 1; iter3 <= 63; ++ iter3) {
		int tmp61= pow((-1), iter3);
		int tmp62= pow(iter3, 2);
		int d0_53 = iter3 % 7;
		if (d0_53 == 0) {
			d0_53 = 7;
		}
		int d1_53 = (iter3 - d0_53)/7 + 1;
		int tmp64= pow((-1), iter3);
		int tmp65= pow(iter3, 2);
		int tmp63= tmp64 * tmp65 / 17;
		lhs_data2[(d1_53-1) + (d0_53-1) * 9] = tmp63;
	
	}
	mat16 = mat16;
	// Write matrix mat17
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim29; iter4++)
	{
		size2 *= dim29[iter4];
	}
	Matrix *mat17 = createM(ndim29, dim29, 0);
	writeM(mat17, size2, lhs_data2);
	Matrix * tmp66= transposeM(mat17);
	a = tmp66;
	printM(a);
	double_reindexing_tests(a);
	//matrices_97_c
	int ndim30= 2;
	int dim30[2]= {7, 9};
	a = zerosM(ndim30, dim30);
	complex* lhs_data3 = c_to_c(a);
	for (int iter5 = 1; iter5 <= 63; ++ iter5) {
		int tmp67= pow((-1), iter5);
		int d0_54 = iter5 % 7;
		if (d0_54 == 0) {
			d0_54 = 7;
		}
		int d1_54 = (iter5 - d0_54)/7 + 1;
		int tmp69= pow((-1), iter5);
		complex tmp68= tmp69 * iter5 - iter5 / 17*I;
		lhs_data3[(d1_54-1) + (d0_54-1) * 9] = tmp68;
	
	}
	mat17 = mat17;
	// Write matrix mat18
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim30; iter6++)
	{
		size3 *= dim30[iter6];
	}
	Matrix *mat18 = createM(ndim30, dim30, 2);
	writeM(mat18, size3, lhs_data3);
	Matrix * tmp70= transposeM(mat18);
	a = tmp70;
	printM(a);
	complex_reindexing_tests(a);
	return 0;
}


// Subprograms

void int_reindexing_tests(Matrix * a) {
	Matrix * tmp1= transposeM(a);
	Matrix * a= tmp1;
	int tmp2;
	indexM(tmp1, &tmp2, 1, 1);
	
	int ndim1 = 2;
	int dim1[2] = {NaN,NaN};
	Matrix * mat1 = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( NaN*sizeof(*input1));
	input1[0] = tmp2;
	writeM( mat1, NaN, input1);
	free(input1);
	
	printM(mat1);
	int tmp3;
	indexM(tmp1, &tmp3, 1, 22);
	
	int ndim2 = 2;
	int dim2[2] = {NaN,NaN};
	Matrix * mat2 = createM(ndim2, dim2, 0);
	int *input2 = NULL;
	input2 = malloc( NaN*sizeof(*input2));
	input2[0] = tmp3;
	writeM( mat2, NaN, input2);
	free(input2);
	
	printM(mat2);
	int vec1[NaN] = {a(1), a(2), a(3), a(4)};
	printf("\n%d\n", vec1);
	int vec2[NaN] = {a(4), a(3), a(2), a(1)};
	printf("\n%d\n", vec2);
	int tmp4;
	indexM(tmp1, &tmp4, 1, 8);
	
	int ndim3 = 2;
	int dim3[2] = {NaN,NaN};
	Matrix * mat3 = createM(ndim3, dim3, 0);
	int *input3 = NULL;
	input3 = malloc( NaN*sizeof(*input3));
	input3[0] = tmp4;
	input3[1] = tmp4;
	input3[2] = tmp4;
	writeM( mat3, NaN, input3);
	free(input3);
	
	printM(mat3);
	int vec3[NaN] = {a(1), a(2), a(2), a(3), a(3), a(3), a(4), a(4), a(4), a(4)};
	printf("\n%d\n", vec3);
}

void double_reindexing_tests(Matrix * a) {
	Matrix * tmp7= transposeM(a);
	Matrix * a= tmp7;
	int tmp8;
	indexM(tmp7, &tmp8, 1, 1);
	
	int ndim4 = 2;
	int dim4[2] = {NaN,NaN};
	Matrix * mat4 = createM(ndim4, dim4, 0);
	int *input4 = NULL;
	input4 = malloc( NaN*sizeof(*input4));
	input4[0] = tmp8;
	writeM( mat4, NaN, input4);
	free(input4);
	
	printM(mat4);
	int tmp9;
	indexM(tmp7, &tmp9, 1, 22);
	
	int ndim5 = 2;
	int dim5[2] = {NaN,NaN};
	Matrix * mat5 = createM(ndim5, dim5, 0);
	int *input5 = NULL;
	input5 = malloc( NaN*sizeof(*input5));
	input5[0] = tmp9;
	writeM( mat5, NaN, input5);
	free(input5);
	
	printM(mat5);
	int tmp11;
	indexM(tmp7, &tmp11, 1, 8);
	int tmp12;
	indexM(tmp7, &tmp12, 1, 15);
	
	int ndim6 = 2;
	int dim6[2] = {NaN,NaN};
	Matrix * mat6 = createM(ndim6, dim6, 0);
	int *input6 = NULL;
	input6 = malloc( NaN*sizeof(*input6));
	input6[0] = tmp8;
	input6[1] = tmp11;
	input6[2] = tmp12;
	input6[3] = tmp9;
	writeM( mat6, NaN, input6);
	free(input6);
	
	printM(mat6);
	
	int ndim7 = 2;
	int dim7[2] = {NaN,NaN};
	Matrix * mat7 = createM(ndim7, dim7, 0);
	int *input7 = NULL;
	input7 = malloc( NaN*sizeof(*input7));
	input7[0] = tmp9;
	input7[1] = tmp12;
	input7[2] = tmp11;
	input7[3] = tmp8;
	writeM( mat7, NaN, input7);
	free(input7);
	
	printM(mat7);
	
	int ndim8 = 2;
	int dim8[2] = {NaN,NaN};
	Matrix * mat8 = createM(ndim8, dim8, 0);
	int *input8 = NULL;
	input8 = malloc( NaN*sizeof(*input8));
	input8[0] = tmp11;
	input8[1] = tmp11;
	input8[2] = tmp11;
	writeM( mat8, NaN, input8);
	free(input8);
	
	printM(mat8);
	
	int ndim9 = 2;
	int dim9[2] = {NaN,NaN};
	Matrix * mat9 = createM(ndim9, dim9, 0);
	int *input9 = NULL;
	input9 = malloc( NaN*sizeof(*input9));
	input9[0] = tmp8;
	input9[1] = tmp11;
	input9[2] = tmp11;
	input9[3] = tmp12;
	input9[4] = tmp12;
	input9[5] = tmp12;
	input9[6] = tmp9;
	input9[7] = tmp9;
	input9[8] = tmp9;
	input9[9] = tmp9;
	writeM( mat9, NaN, input9);
	free(input9);
	
	printM(mat9);
}

void complex_reindexing_tests(Matrix * a) {
	Matrix * tmp31= transposeM(a);
	Matrix * a= tmp31;
	complex tmp32;
	indexM(tmp31, &tmp32, 1, 1);
	
	int ndim10 = 2;
	int dim10[2] = {NaN,NaN};
	Matrix * mat10 = createM(ndim10, dim10, 2);
	complex *input10 = NULL;
	input10 = malloc( NaN*sizeof(*input10));
	input10[0] = tmp32;
	writeM( mat10, NaN, input10);
	free(input10);
	
	printM(mat10);
	complex tmp33;
	indexM(tmp31, &tmp33, 1, 22);
	
	int ndim11 = 2;
	int dim11[2] = {NaN,NaN};
	Matrix * mat11 = createM(ndim11, dim11, 2);
	complex *input11 = NULL;
	input11 = malloc( NaN*sizeof(*input11));
	input11[0] = tmp33;
	writeM( mat11, NaN, input11);
	free(input11);
	
	printM(mat11);
	complex tmp35;
	indexM(tmp31, &tmp35, 1, 8);
	complex tmp36;
	indexM(tmp31, &tmp36, 1, 15);
	
	int ndim12 = 2;
	int dim12[2] = {NaN,NaN};
	Matrix * mat12 = createM(ndim12, dim12, 2);
	complex *input12 = NULL;
	input12 = malloc( NaN*sizeof(*input12));
	input12[0] = tmp32;
	input12[1] = tmp35;
	input12[2] = tmp36;
	input12[3] = tmp33;
	writeM( mat12, NaN, input12);
	free(input12);
	
	printM(mat12);
	
	int ndim13 = 2;
	int dim13[2] = {NaN,NaN};
	Matrix * mat13 = createM(ndim13, dim13, 2);
	complex *input13 = NULL;
	input13 = malloc( NaN*sizeof(*input13));
	input13[0] = tmp33;
	input13[1] = tmp36;
	input13[2] = tmp35;
	input13[3] = tmp32;
	writeM( mat13, NaN, input13);
	free(input13);
	
	printM(mat13);
	
	int ndim14 = 2;
	int dim14[2] = {NaN,NaN};
	Matrix * mat14 = createM(ndim14, dim14, 2);
	complex *input14 = NULL;
	input14 = malloc( NaN*sizeof(*input14));
	input14[0] = tmp35;
	input14[1] = tmp35;
	input14[2] = tmp35;
	writeM( mat14, NaN, input14);
	free(input14);
	
	printM(mat14);
	
	int ndim15 = 2;
	int dim15[2] = {NaN,NaN};
	Matrix * mat15 = createM(ndim15, dim15, 2);
	complex *input15 = NULL;
	input15 = malloc( NaN*sizeof(*input15));
	input15[0] = tmp32;
	input15[1] = tmp35;
	input15[2] = tmp35;
	input15[3] = tmp36;
	input15[4] = tmp36;
	input15[5] = tmp36;
	input15[6] = tmp33;
	input15[7] = tmp33;
	input15[8] = tmp33;
	input15[9] = tmp33;
	writeM( mat15, NaN, input15);
	free(input15);
	
	printM(mat15);
}