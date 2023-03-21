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
	// i_zero
	Matrix * tmp1 = identityM(3);
	Matrix * a = tmp1;
	printM(a);
	int exponent1 = 0;
	Matrix * tmp2 = mpowerM(a, &exponent1, 0);
	printM(tmp2);
	// d_zero
	int ndim1 = 2;
	int dim1[2] = {3, 3};
	Matrix * tmp3 = zerosM(ndim1, dim1);
	a = tmp3;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp4 = i * i;
		int idx1 = convertSubscript(ndim1, dim1, i);
		lhs_data1[idx1] = tmp4;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp5 = transposeM(mat1);
	a = tmp5;
	printM(a);
	int exponent2 = 0;
	Matrix * tmp6 = mpowerM(a, &exponent2, 0);
	printM(tmp6);
	// c_zero
	int ndim2 = 2;
	int dim2[2] = {3, 3};
	Matrix * tmp7 = zerosM(ndim2, dim2);
	a = tmp7;
	complex* lhs_data2 = i_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp8 = i * i + 0.5*I;
		int idx2 = convertSubscript(ndim2, dim2, i);
		lhs_data2[idx2] = tmp8;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 2);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp9 = transposeM(mat2);
	a = tmp9;
	printM(a);
	int exponent3 = 0;
	Matrix * tmp10 = mpowerM(a, &exponent3, 2);
	printM(tmp10);
	// i_one
	Matrix * tmp11 = identityM(3);
	a = tmp11;
	printM(a);
	int exponent4 = 1;
	Matrix * tmp12 = mpowerM(a, &exponent4, 0);
	printM(tmp12);
	// d_one
	int ndim3 = 2;
	int dim3[2] = {3, 3};
	Matrix * tmp13 = zerosM(ndim3, dim3);
	a = tmp13;
	int* lhs_data3 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp14 = i * i;
		int idx3 = convertSubscript(ndim3, dim3, i);
		lhs_data3[idx3] = tmp14;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim3; iter3++)
	{
		size3 *= dim3[iter3];
	}
	Matrix *mat3 = createM(ndim3, dim3, 0);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp15 = transposeM(mat3);
	a = tmp15;
	printM(a);
	int exponent5 = 1;
	Matrix * tmp16 = mpowerM(a, &exponent5, 0);
	printM(tmp16);
	// c_one
	int ndim4 = 2;
	int dim4[2] = {3, 3};
	Matrix * tmp17 = zerosM(ndim4, dim4);
	a = tmp17;
	complex* lhs_data4 = i_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp18 = i * i + 0.5*I;
		int idx4 = convertSubscript(ndim4, dim4, i);
		lhs_data4[idx4] = tmp18;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim4; iter4++)
	{
		size4 *= dim4[iter4];
	}
	Matrix *mat4 = createM(ndim4, dim4, 2);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp19 = transposeM(mat4);
	a = tmp19;
	printM(a);
	int exponent6 = 1;
	Matrix * tmp20 = mpowerM(a, &exponent6, 2);
	printM(tmp20);
	// i_large
	int ndim5 = 2;
	int dim5[2] = {3, 3};
	Matrix * tmp21 = zerosM(ndim5, dim5);
	a = tmp21;
	int* lhs_data5 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp22 = i * i;
		int idx5 = convertSubscript(ndim5, dim5, i);
		lhs_data5[idx5] = tmp22;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim5; iter5++)
	{
		size5 *= dim5[iter5];
	}
	Matrix *mat5 = createM(ndim5, dim5, 0);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp23 = transposeM(mat5);
	a = tmp23;
	printM(a);
	int exponent7 = 20;
	Matrix * tmp24 = mpowerM(a, &exponent7, 0);
	printM(tmp24);
	// i_negative
	int ndim6 = 2;
	int dim6[2] = {3, 3};
	Matrix * tmp25 = zerosM(ndim6, dim6);
	a = tmp25;
	int* lhs_data6 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp26 = i * i;
		int idx6 = convertSubscript(ndim6, dim6, i);
		lhs_data6[idx6] = tmp26;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim6; iter6++)
	{
		size6 *= dim6[iter6];
	}
	Matrix *mat6 = createM(ndim6, dim6, 0);
	writeM(mat6, size6, lhs_data6);
	Matrix * tmp27 = transposeM(mat6);
	a = tmp27;
	printM(a);
	int exponent8 = -20;
	Matrix * tmp28 = mpowerM(a, &exponent8, 0);
	Matrix * tmp29 = floorM(tmp28);
	printM(tmp29);
	// d_small
	int ndim7 = 2;
	int dim7[2] = {3, 3};
	Matrix * tmp30 = zerosM(ndim7, dim7);
	a = tmp30;
	int* lhs_data7 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp31 = i * i;
		int idx7 = convertSubscript(ndim7, dim7, i);
		lhs_data7[idx7] = tmp31;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter7 = 0 ; iter7 < ndim7; iter7++)
	{
		size7 *= dim7[iter7];
	}
	Matrix *mat7 = createM(ndim7, dim7, 0);
	writeM(mat7, size7, lhs_data7);
	Matrix * tmp32 = transposeM(mat7);
	a = tmp32;
	printM(a);
	double exponent9 = 0.05;
	Matrix * tmp33 = mpowerM(a, &exponent9, 1);
	printM(tmp33);
	// d_negative
	int ndim8 = 2;
	int dim8[2] = {3, 3};
	Matrix * tmp34 = zerosM(ndim8, dim8);
	a = tmp34;
	int* lhs_data8 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp35 = pow((-1), i);
		int tmp37 = pow((-1), i);
		int tmp36 = (tmp37) * i * i;
		int idx8 = convertSubscript(ndim8, dim8, i);
		lhs_data8[idx8] = tmp36;
	
	}
	// Write matrix mat8
	int size8 = 1;
	for (int iter8 = 0 ; iter8 < ndim8; iter8++)
	{
		size8 *= dim8[iter8];
	}
	Matrix *mat8 = createM(ndim8, dim8, 0);
	writeM(mat8, size8, lhs_data8);
	Matrix * tmp38 = transposeM(mat8);
	a = tmp38;
	printM(a);
	double exponent10 = -1.1;
	Matrix * tmp39 = mpowerM(a, &exponent10, 1);
	printM(tmp39);
	// c_large
	int ndim9 = 2;
	int dim9[2] = {3, 3};
	Matrix * tmp40 = zerosM(ndim9, dim9);
	a = tmp40;
	complex* lhs_data9 = i_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp41 = i * i + 0.5*I;
		int idx9 = convertSubscript(ndim9, dim9, i);
		lhs_data9[idx9] = tmp41;
	
	}
	// Write matrix mat9
	int size9 = 1;
	for (int iter9 = 0 ; iter9 < ndim9; iter9++)
	{
		size9 *= dim9[iter9];
	}
	Matrix *mat9 = createM(ndim9, dim9, 2);
	writeM(mat9, size9, lhs_data9);
	Matrix * tmp42 = transposeM(mat9);
	a = tmp42;
	printM(a);
	complex exponent11 = (-10 + 7.8*I);
	Matrix * tmp43 = mpowerM(a, &exponent11, 2);
	printM(tmp43);
	// c_small
	int ndim10 = 2;
	int dim10[2] = {3, 3};
	Matrix * tmp44 = zerosM(ndim10, dim10);
	a = tmp44;
	complex* lhs_data10 = i_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp45 = i * i + 0.5*I;
		int idx10 = convertSubscript(ndim10, dim10, i);
		lhs_data10[idx10] = tmp45;
	
	}
	// Write matrix mat10
	int size10 = 1;
	for (int iter10 = 0 ; iter10 < ndim10; iter10++)
	{
		size10 *= dim10[iter10];
	}
	Matrix *mat10 = createM(ndim10, dim10, 2);
	writeM(mat10, size10, lhs_data10);
	Matrix * tmp46 = transposeM(mat10);
	a = tmp46;
	printM(a);
	complex exponent12 = (-0.8*I);
	Matrix * tmp47 = mpowerM(a, &exponent12, 2);
	printM(tmp47);
	// brutal_test
	
	Matrix **matrices = NULL;
	matrices = malloc(11*sizeof(*matrices));
		        
	int ndim11 = 2;
	int dim11[2] = {11,1};
	int idx11 = convertSubscript(ndim11, dim11, 1);
	int ndim12 = 2;
	int dim12[2] = {3,3};
	Matrix * tmp48 = zerosM(ndim12, dim12);
	matrices[idx11] = tmp48;
	int idx12 = convertSubscript(ndim11, dim11, 2);
	int ndim13 = 2;
	int dim13[2] = {3,3};
	Matrix * tmp49 = onesM(ndim13, dim13);
	matrices[idx12] = tmp49;
	int idx13 = convertSubscript(ndim11, dim11, 3);
	Matrix * tmp50 = identityM(3);
	matrices[idx13] = tmp50;
	int idx14 = convertSubscript(ndim11, dim11, 4);
	Matrix * tmp51 = identityM(3);
	complex scalar1 = (4.2 - 0.03*I);
	Matrix * tmp52 = scaleM(tmp51, &scalar1, 2);
	matrices[idx14] = tmp52;
	int idx15 = convertSubscript(ndim11, dim11, 5);
	int ndim14 = 2;
	int dim14[2] = {3,3};
	Matrix * tmp53 = zerosM(ndim14, dim14);
	matrices[idx15] = tmp53;
	int* lhs_data11 = i_to_i(matrices[idx15]);
	for (int i = 1; i <= 9; ++ i) {
		int tmp54 = i * i;
		int idx16 = convertSubscript(ndim14, dim14, i);
		lhs_data11[idx16] = tmp54;
	
	}
	// Write matrix mat11
	int size11 = 1;
	for (int iter11 = 0 ; iter11 < ndim14; iter11++)
	{
		size11 *= dim14[iter11];
	}
	Matrix *mat11 = createM(ndim14, dim14, 0);
	writeM(mat11, size11, lhs_data11);
	matrices[idx15] = mat11;
	Matrix * tmp55 = transposeM(matrices[idx15]);
	matrices[idx15] = tmp55;
	int idx17 = convertSubscript(ndim11, dim11, 6);
	int ndim15 = 2;
	int dim15[2] = {3,3};
	Matrix * tmp56 = zerosM(ndim15, dim15);
	matrices[idx17] = tmp56;
	double* lhs_data12 = i_to_d(matrices[idx17]);
	for (int i = 1; i <= 9; ++ i) {
		double tmp57 = i * i + 0.5;
		int idx18 = convertSubscript(ndim15, dim15, i);
		lhs_data12[idx18] = tmp57;
	
	}
	// Write matrix mat12
	int size12 = 1;
	for (int iter12 = 0 ; iter12 < ndim15; iter12++)
	{
		size12 *= dim15[iter12];
	}
	Matrix *mat12 = createM(ndim15, dim15, 1);
	writeM(mat12, size12, lhs_data12);
	matrices[idx17] = mat12;
	Matrix * tmp58 = transposeM(matrices[idx17]);
	matrices[idx17] = tmp58;
	int idx19 = convertSubscript(ndim11, dim11, 7);
	int ndim16 = 2;
	int dim16[2] = {3,3};
	Matrix * tmp59 = zerosM(ndim16, dim16);
	matrices[idx19] = tmp59;
	complex* lhs_data13 = i_to_c(matrices[idx19]);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp60 = i * i + 0.5*I;
		int idx20 = convertSubscript(ndim16, dim16, i);
		lhs_data13[idx20] = tmp60;
	
	}
	// Write matrix mat13
	int size13 = 1;
	for (int iter13 = 0 ; iter13 < ndim16; iter13++)
	{
		size13 *= dim16[iter13];
	}
	Matrix *mat13 = createM(ndim16, dim16, 2);
	writeM(mat13, size13, lhs_data13);
	matrices[idx19] = mat13;
	Matrix * tmp61 = transposeM(matrices[idx19]);
	matrices[idx19] = tmp61;
	int idx21 = convertSubscript(ndim11, dim11, 8);
	int ndim17 = 2;
	int dim17[2] = {3,3};
	Matrix * tmp62 = zerosM(ndim17, dim17);
	matrices[idx21] = tmp62;
	int* lhs_data14 = i_to_i(matrices[idx21]);
	for (int i = 1; i <= 9; ++ i) {
		int tmp63 = (i - 5) * i;
		int idx22 = convertSubscript(ndim17, dim17, i);
		lhs_data14[idx22] = tmp63;
	
	}
	// Write matrix mat14
	int size14 = 1;
	for (int iter14 = 0 ; iter14 < ndim17; iter14++)
	{
		size14 *= dim17[iter14];
	}
	Matrix *mat14 = createM(ndim17, dim17, 0);
	writeM(mat14, size14, lhs_data14);
	matrices[idx21] = mat14;
	Matrix * tmp64 = transposeM(matrices[idx21]);
	matrices[idx21] = tmp64;
	int idx23 = convertSubscript(ndim11, dim11, 9);
	int ndim18 = 2;
	int dim18[2] = {3,3};
	Matrix * tmp65 = zerosM(ndim18, dim18);
	matrices[idx23] = tmp65;
	double* lhs_data15 = i_to_d(matrices[idx23]);
	for (int i = 1; i <= 9; ++ i) {
		double tmp66 = (i - 8.2) * i + 0.5;
		int idx24 = convertSubscript(ndim18, dim18, i);
		lhs_data15[idx24] = tmp66;
	
	}
	// Write matrix mat15
	int size15 = 1;
	for (int iter15 = 0 ; iter15 < ndim18; iter15++)
	{
		size15 *= dim18[iter15];
	}
	Matrix *mat15 = createM(ndim18, dim18, 1);
	writeM(mat15, size15, lhs_data15);
	matrices[idx23] = mat15;
	Matrix * tmp67 = transposeM(matrices[idx23]);
	matrices[idx23] = tmp67;
	int idx25 = convertSubscript(ndim11, dim11, 10);
	int ndim19 = 2;
	int dim19[2] = {3,3};
	Matrix * tmp68 = zerosM(ndim19, dim19);
	matrices[idx25] = tmp68;
	complex* lhs_data16 = i_to_c(matrices[idx25]);
	for (int i = 1; i <= 9; ++ i) {
		complex tmp69 = (i - 5.89) * (i) + ((0.5) * (4 - i)) * 1*I;
		int idx26 = convertSubscript(ndim19, dim19, i);
		lhs_data16[idx26] = tmp69;
	
	}
	// Write matrix mat16
	int size16 = 1;
	for (int iter16 = 0 ; iter16 < ndim19; iter16++)
	{
		size16 *= dim19[iter16];
	}
	Matrix *mat16 = createM(ndim19, dim19, 2);
	writeM(mat16, size16, lhs_data16);
	matrices[idx25] = mat16;
	Matrix * tmp70 = transposeM(matrices[idx25]);
	matrices[idx25] = tmp70;
	int idx27 = convertSubscript(ndim11, dim11, 11);
	
	int ndim20 = 2;
	int dim20[2] = {3,3};
	matrices[idx27] = createM(ndim20, dim20, 0);
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
	writeM( matrices[idx27], 9, input1);
	free(input1);
	
	int idx28 = convertSubscript(ndim11, dim11, 12);
	
	int ndim21 = 2;
	int dim21[2] = {3,3};
	matrices[idx28] = createM(ndim21, dim21, 1);
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
	writeM( matrices[idx28], 9, input2);
	free(input2);
	
	for (int index = 3; index <= 12; ++ index) {
		printf("\n%s\n", "Original\n");
		int idx29 = convertSubscript(ndim11, dim11, index);
		printM(matrices[idx29]);
		printf("\n%s\n", "Integer exponents\n");
		for (int i = -4; i <= 4; ++ i) {
			Matrix * tmp71 = mpowerM(matrices[idx29], &i, 0);
			printM(tmp71);
		
		}
		printf("\n%s\n", "Double exponents\n");
		for (int i = -3; i <= 1.9; i += 0.2) {
			printf("\n%s\n", "Exponent: %.4f\n", i);
			Matrix * tmp72 = mpowerM(matrices[idx29], &i, 0);
			printM(tmp72);
		
		}
		printf("\n%s\n", "Complex exponents\n");
		for (int i = -3; i <= 3; i += 0.2) {
			for (int j = -3; j <= 3; j += 0.2) {
				if (j == 0) {
					
				
				}
				char *mystr1 = NULL;
				mystr1 = malloc(50*sizeof(*mystr1));
				sprintf(mystr1, "Exponent: %.4f + %.4fi\n", i, j);
				printf("\n%s\n", mystr1);
				complex exponent13 = (i + j * 1*I);
				Matrix * tmp73 = mpowerM(matrices[idx29], &exponent13, 2);
				printM(tmp73);
			
			}
		
		}
	
	}
	// % non_diag1
	// a = [1,1;0,1];
	// disp(a);
	// disp(a^1.5);
	// % non_diag2
	// a = [3,4,3;-1,0,-1;1,2,3];
	// disp(a);
	// disp(a^-4.25);
	return 0;
}
