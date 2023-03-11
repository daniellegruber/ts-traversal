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
	//ii_test
	int ndim1 = 2;
	int dim1[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	Matrix * a = tmp1;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_1 = i % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (i - d0_1)/3 + 1;
		int tmp2 = i;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp2;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp3 = transposeM(mat1);
	a = tmp3;
	printM(a);
	Matrix * b = a;
	printM(b);
	Matrix * tmp4 = powerM(a, b);
	Matrix * c = tmp4;
	printM(c);
	//id_test
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp5 = zerosM(ndim2, dim2);
	a = tmp5;
	int* lhs_data2 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_2 = i % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (i - d0_2)/3 + 1;
		int tmp6 = i;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp6;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp7 = transposeM(mat2);
	a = tmp7;
	printM(a);
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp8 = zerosM(ndim3, dim3);
	b = tmp8;
	double* lhs_data3 = d_to_d(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_3 = i % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (i - d0_3)/3 + 1;
		double tmp9 = i + 0.4;
		lhs_data3[(d1_3-1) + (d0_3-1) * 3] = tmp9;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim3; iter3++)
	{
		size3 *= dim3[iter3];
	}
	Matrix *mat3 = createM(ndim3, dim3, 1);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp10 = transposeM(mat3);
	b = tmp10;
	printM(b);
	Matrix * tmp11 = powerM(a, b);
	c = tmp11;
	printM(c);
	//neg_id_test
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp12 = zerosM(ndim4, dim4);
	a = tmp12;
	int* lhs_data4 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_4 = i % 3;
		if (d0_4 == 0) {
			d0_4 = 3;
		}
		int d1_4 = (i - d0_4)/3 + 1;
		int tmp13 = -i;
		lhs_data4[(d1_4-1) + (d0_4-1) * 3] = tmp13;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim4; iter4++)
	{
		size4 *= dim4[iter4];
	}
	Matrix *mat4 = createM(ndim4, dim4, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp14 = transposeM(mat4);
	a = tmp14;
	printM(a);
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp15 = zerosM(ndim5, dim5);
	b = tmp15;
	double* lhs_data5 = d_to_d(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_5 = i % 3;
		if (d0_5 == 0) {
			d0_5 = 3;
		}
		int d1_5 = (i - d0_5)/3 + 1;
		double tmp16 = i + 0.4;
		lhs_data5[(d1_5-1) + (d0_5-1) * 3] = tmp16;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim5; iter5++)
	{
		size5 *= dim5[iter5];
	}
	Matrix *mat5 = createM(ndim5, dim5, 1);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp17 = transposeM(mat5);
	b = tmp17;
	printM(b);
	Matrix * tmp18 = powerM(a, b);
	c = tmp18;
	printM(c);
	//ic_test
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp19 = zerosM(ndim6, dim6);
	a = tmp19;
	int* lhs_data6 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_6 = i % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (i - d0_6)/3 + 1;
		int tmp20 = i;
		lhs_data6[(d1_6-1) + (d0_6-1) * 3] = tmp20;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim6; iter6++)
	{
		size6 *= dim6[iter6];
	}
	Matrix *mat6 = createM(ndim6, dim6, 0);
	writeM(mat6, size6, lhs_data6);
	Matrix * tmp21 = transposeM(mat6);
	a = tmp21;
	printM(a);
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp22 = zerosM(ndim7, dim7);
	b = tmp22;
	complex* lhs_data7 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_7 = i % 3;
		if (d0_7 == 0) {
			d0_7 = 3;
		}
		int d1_7 = (i - d0_7)/3 + 1;
		complex tmp23 = i + 0.4*I;
		lhs_data7[(d1_7-1) + (d0_7-1) * 3] = tmp23;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter7 = 0 ; iter7 < ndim7; iter7++)
	{
		size7 *= dim7[iter7];
	}
	Matrix *mat7 = createM(ndim7, dim7, 2);
	writeM(mat7, size7, lhs_data7);
	Matrix * tmp24 = transposeM(mat7);
	b = tmp24;
	printM(b);
	Matrix * tmp25 = powerM(a, b);
	c = tmp25;
	printM(c);
	//di_test
	int ndim8 = 2;
	int dim8[2] = {3,3};
	Matrix * tmp26 = zerosM(ndim8, dim8);
	a = tmp26;
	double* lhs_data8 = d_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_8 = i % 3;
		if (d0_8 == 0) {
			d0_8 = 3;
		}
		int d1_8 = (i - d0_8)/3 + 1;
		double tmp27 = i + 0.4;
		lhs_data8[(d1_8-1) + (d0_8-1) * 3] = tmp27;
	
	}
	// Write matrix mat8
	int size8 = 1;
	for (int iter8 = 0 ; iter8 < ndim8; iter8++)
	{
		size8 *= dim8[iter8];
	}
	Matrix *mat8 = createM(ndim8, dim8, 1);
	writeM(mat8, size8, lhs_data8);
	Matrix * tmp28 = transposeM(mat8);
	a = tmp28;
	printM(a);
	int ndim9 = 2;
	int dim9[2] = {3,3};
	Matrix * tmp29 = zerosM(ndim9, dim9);
	b = tmp29;
	int* lhs_data9 = i_to_i(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_9 = i % 3;
		if (d0_9 == 0) {
			d0_9 = 3;
		}
		int d1_9 = (i - d0_9)/3 + 1;
		int tmp30 = i;
		lhs_data9[(d1_9-1) + (d0_9-1) * 3] = tmp30;
	
	}
	// Write matrix mat9
	int size9 = 1;
	for (int iter9 = 0 ; iter9 < ndim9; iter9++)
	{
		size9 *= dim9[iter9];
	}
	Matrix *mat9 = createM(ndim9, dim9, 0);
	writeM(mat9, size9, lhs_data9);
	Matrix * tmp31 = transposeM(mat9);
	b = tmp31;
	printM(b);
	Matrix * tmp32 = powerM(a, b);
	c = tmp32;
	printM(c);
	//dd_test
	int ndim10 = 2;
	int dim10[2] = {3,3};
	Matrix * tmp33 = zerosM(ndim10, dim10);
	a = tmp33;
	double* lhs_data10 = d_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_10 = i % 3;
		if (d0_10 == 0) {
			d0_10 = 3;
		}
		int d1_10 = (i - d0_10)/3 + 1;
		double tmp34 = i + 0.4;
		lhs_data10[(d1_10-1) + (d0_10-1) * 3] = tmp34;
	
	}
	// Write matrix mat10
	int size10 = 1;
	for (int iter10 = 0 ; iter10 < ndim10; iter10++)
	{
		size10 *= dim10[iter10];
	}
	Matrix *mat10 = createM(ndim10, dim10, 1);
	writeM(mat10, size10, lhs_data10);
	Matrix * tmp35 = transposeM(mat10);
	a = tmp35;
	printM(a);
	int ndim11 = 2;
	int dim11[2] = {3,3};
	Matrix * tmp36 = zerosM(ndim11, dim11);
	b = tmp36;
	double* lhs_data11 = d_to_d(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_11 = i % 3;
		if (d0_11 == 0) {
			d0_11 = 3;
		}
		int d1_11 = (i - d0_11)/3 + 1;
		double tmp37 = (i + 0.4);
		lhs_data11[(d1_11-1) + (d0_11-1) * 3] = tmp37;
	
	}
	// Write matrix mat11
	int size11 = 1;
	for (int iter11 = 0 ; iter11 < ndim11; iter11++)
	{
		size11 *= dim11[iter11];
	}
	Matrix *mat11 = createM(ndim11, dim11, 1);
	writeM(mat11, size11, lhs_data11);
	Matrix * tmp38 = transposeM(mat11);
	b = tmp38;
	printM(b);
	Matrix * tmp39 = powerM(a, b);
	c = tmp39;
	printM(c);
	//neg_dd_test
	int ndim12 = 2;
	int dim12[2] = {3,3};
	Matrix * tmp40 = zerosM(ndim12, dim12);
	a = tmp40;
	double* lhs_data12 = d_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_12 = i % 3;
		if (d0_12 == 0) {
			d0_12 = 3;
		}
		int d1_12 = (i - d0_12)/3 + 1;
		double tmp41 = -(i + 0.4);
		lhs_data12[(d1_12-1) + (d0_12-1) * 3] = tmp41;
	
	}
	// Write matrix mat12
	int size12 = 1;
	for (int iter12 = 0 ; iter12 < ndim12; iter12++)
	{
		size12 *= dim12[iter12];
	}
	Matrix *mat12 = createM(ndim12, dim12, 1);
	writeM(mat12, size12, lhs_data12);
	Matrix * tmp42 = transposeM(mat12);
	a = tmp42;
	printM(a);
	int ndim13 = 2;
	int dim13[2] = {3,3};
	Matrix * tmp43 = zerosM(ndim13, dim13);
	b = tmp43;
	double* lhs_data13 = d_to_d(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_13 = i % 3;
		if (d0_13 == 0) {
			d0_13 = 3;
		}
		int d1_13 = (i - d0_13)/3 + 1;
		double tmp44 = -(i + 0.4);
		lhs_data13[(d1_13-1) + (d0_13-1) * 3] = tmp44;
	
	}
	// Write matrix mat13
	int size13 = 1;
	for (int iter13 = 0 ; iter13 < ndim13; iter13++)
	{
		size13 *= dim13[iter13];
	}
	Matrix *mat13 = createM(ndim13, dim13, 1);
	writeM(mat13, size13, lhs_data13);
	Matrix * tmp45 = transposeM(mat13);
	b = tmp45;
	printM(b);
	Matrix * tmp46 = powerM(a, b);
	c = tmp46;
	printM(c);
	//dc_test
	int ndim14 = 2;
	int dim14[2] = {3,3};
	Matrix * tmp47 = zerosM(ndim14, dim14);
	a = tmp47;
	double* lhs_data14 = d_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_14 = i % 3;
		if (d0_14 == 0) {
			d0_14 = 3;
		}
		int d1_14 = (i - d0_14)/3 + 1;
		double tmp48 = i + 0.4;
		lhs_data14[(d1_14-1) + (d0_14-1) * 3] = tmp48;
	
	}
	// Write matrix mat14
	int size14 = 1;
	for (int iter14 = 0 ; iter14 < ndim14; iter14++)
	{
		size14 *= dim14[iter14];
	}
	Matrix *mat14 = createM(ndim14, dim14, 1);
	writeM(mat14, size14, lhs_data14);
	Matrix * tmp49 = transposeM(mat14);
	a = tmp49;
	printM(a);
	int ndim15 = 2;
	int dim15[2] = {3,3};
	Matrix * tmp50 = zerosM(ndim15, dim15);
	b = tmp50;
	complex* lhs_data15 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_15 = i % 3;
		if (d0_15 == 0) {
			d0_15 = 3;
		}
		int d1_15 = (i - d0_15)/3 + 1;
		complex tmp51 = i + 0.4*I;
		lhs_data15[(d1_15-1) + (d0_15-1) * 3] = tmp51;
	
	}
	// Write matrix mat15
	int size15 = 1;
	for (int iter15 = 0 ; iter15 < ndim15; iter15++)
	{
		size15 *= dim15[iter15];
	}
	Matrix *mat15 = createM(ndim15, dim15, 2);
	writeM(mat15, size15, lhs_data15);
	Matrix * tmp52 = transposeM(mat15);
	b = tmp52;
	printM(b);
	Matrix * tmp53 = powerM(a, b);
	c = tmp53;
	printM(c);
	//ci_test
	int ndim16 = 2;
	int dim16[2] = {3,3};
	Matrix * tmp54 = zerosM(ndim16, dim16);
	a = tmp54;
	complex* lhs_data16 = c_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_16 = i % 3;
		if (d0_16 == 0) {
			d0_16 = 3;
		}
		int d1_16 = (i - d0_16)/3 + 1;
		complex tmp55 = i + 1*I;
		lhs_data16[(d1_16-1) + (d0_16-1) * 3] = tmp55;
	
	}
	// Write matrix mat16
	int size16 = 1;
	for (int iter16 = 0 ; iter16 < ndim16; iter16++)
	{
		size16 *= dim16[iter16];
	}
	Matrix *mat16 = createM(ndim16, dim16, 2);
	writeM(mat16, size16, lhs_data16);
	Matrix * tmp56 = transposeM(mat16);
	a = tmp56;
	printM(a);
	int ndim17 = 2;
	int dim17[2] = {3,3};
	Matrix * tmp57 = zerosM(ndim17, dim17);
	b = tmp57;
	int* lhs_data17 = i_to_i(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_17 = i % 3;
		if (d0_17 == 0) {
			d0_17 = 3;
		}
		int d1_17 = (i - d0_17)/3 + 1;
		int tmp58 = i;
		lhs_data17[(d1_17-1) + (d0_17-1) * 3] = tmp58;
	
	}
	// Write matrix mat17
	int size17 = 1;
	for (int iter17 = 0 ; iter17 < ndim17; iter17++)
	{
		size17 *= dim17[iter17];
	}
	Matrix *mat17 = createM(ndim17, dim17, 0);
	writeM(mat17, size17, lhs_data17);
	Matrix * tmp59 = transposeM(mat17);
	b = tmp59;
	printM(b);
	Matrix * tmp60 = powerM(a, b);
	c = tmp60;
	printM(c);
	//cd_test
	int ndim18 = 2;
	int dim18[2] = {3,3};
	Matrix * tmp61 = zerosM(ndim18, dim18);
	a = tmp61;
	complex* lhs_data18 = c_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_18 = i % 3;
		if (d0_18 == 0) {
			d0_18 = 3;
		}
		int d1_18 = (i - d0_18)/3 + 1;
		complex tmp62 = i + 0.5*I;
		lhs_data18[(d1_18-1) + (d0_18-1) * 3] = tmp62;
	
	}
	// Write matrix mat18
	int size18 = 1;
	for (int iter18 = 0 ; iter18 < ndim18; iter18++)
	{
		size18 *= dim18[iter18];
	}
	Matrix *mat18 = createM(ndim18, dim18, 2);
	writeM(mat18, size18, lhs_data18);
	Matrix * tmp63 = transposeM(mat18);
	a = tmp63;
	printM(a);
	int ndim19 = 2;
	int dim19[2] = {3,3};
	Matrix * tmp64 = zerosM(ndim19, dim19);
	b = tmp64;
	double* lhs_data19 = d_to_d(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_19 = i % 3;
		if (d0_19 == 0) {
			d0_19 = 3;
		}
		int d1_19 = (i - d0_19)/3 + 1;
		double tmp65 = (i + 0.4);
		lhs_data19[(d1_19-1) + (d0_19-1) * 3] = tmp65;
	
	}
	// Write matrix mat19
	int size19 = 1;
	for (int iter19 = 0 ; iter19 < ndim19; iter19++)
	{
		size19 *= dim19[iter19];
	}
	Matrix *mat19 = createM(ndim19, dim19, 1);
	writeM(mat19, size19, lhs_data19);
	Matrix * tmp66 = transposeM(mat19);
	b = tmp66;
	printM(b);
	Matrix * tmp67 = powerM(a, b);
	c = tmp67;
	printM(c);
	//cc_test
	int ndim20 = 2;
	int dim20[2] = {3,3};
	Matrix * tmp68 = zerosM(ndim20, dim20);
	a = tmp68;
	complex* lhs_data20 = c_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_20 = i % 3;
		if (d0_20 == 0) {
			d0_20 = 3;
		}
		int d1_20 = (i - d0_20)/3 + 1;
		complex tmp69 = i + 0.4*I;
		lhs_data20[(d1_20-1) + (d0_20-1) * 3] = tmp69;
	
	}
	// Write matrix mat20
	int size20 = 1;
	for (int iter20 = 0 ; iter20 < ndim20; iter20++)
	{
		size20 *= dim20[iter20];
	}
	Matrix *mat20 = createM(ndim20, dim20, 2);
	writeM(mat20, size20, lhs_data20);
	Matrix * tmp70 = transposeM(mat20);
	a = tmp70;
	printM(a);
	int ndim21 = 2;
	int dim21[2] = {3,3};
	Matrix * tmp71 = zerosM(ndim21, dim21);
	b = tmp71;
	complex* lhs_data21 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_21 = i % 3;
		if (d0_21 == 0) {
			d0_21 = 3;
		}
		int d1_21 = (i - d0_21)/3 + 1;
		complex tmp72 = i + 0.4*I;
		lhs_data21[(d1_21-1) + (d0_21-1) * 3] = tmp72;
	
	}
	// Write matrix mat21
	int size21 = 1;
	for (int iter21 = 0 ; iter21 < ndim21; iter21++)
	{
		size21 *= dim21[iter21];
	}
	Matrix *mat21 = createM(ndim21, dim21, 2);
	writeM(mat21, size21, lhs_data21);
	Matrix * tmp73 = transposeM(mat21);
	b = tmp73;
	printM(b);
	Matrix * tmp74 = powerM(a, b);
	c = tmp74;
	printM(c);
	//overflow_test
	int ndim22 = 2;
	int dim22[2] = {3,3};
	Matrix * tmp75 = zerosM(ndim22, dim22);
	a = tmp75;
	int* lhs_data22 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_22 = i % 3;
		if (d0_22 == 0) {
			d0_22 = 3;
		}
		int d1_22 = (i - d0_22)/3 + 1;
		int tmp76 = INT_MAX;
		lhs_data22[(d1_22-1) + (d0_22-1) * 3] = tmp76;
	
	}
	// Write matrix mat22
	int size22 = 1;
	for (int iter22 = 0 ; iter22 < ndim22; iter22++)
	{
		size22 *= dim22[iter22];
	}
	Matrix *mat22 = createM(ndim22, dim22, 0);
	writeM(mat22, size22, lhs_data22);
	Matrix * tmp77 = transposeM(mat22);
	a = tmp77;
	printM(a);
	int ndim23 = 2;
	int dim23[2] = {3,3};
	Matrix * tmp78 = onesM(ndim23, dim23);
	int scalar1 = 2;
	Matrix * tmp79 = scaleM(tmp78, &scalar1, 0);
	b = tmp79;
	printM(a);
	Matrix * tmp80 = powerM(a, b);
	c = tmp80;
	printM(c);
	return 0;
}
