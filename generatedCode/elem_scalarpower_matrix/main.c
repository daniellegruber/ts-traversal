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
	int exponent = 3;
	int ndim1 = 2;
	int dim1[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	Matrix * a = tmp1;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp2 = pow((-1), (i + 1));
		int d0_1 = i % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (i - d0_1)/3 + 1;
		int tmp4 = pow((-1), (i + 1));
		int tmp3 = (tmp4) * i;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp3;
	
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
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp6 = zerosM(ndim2, dim2);
	Matrix * b = tmp6;
	int* lhs_data2 = i_to_i(b);
	for (int i = 1; i <= 9; ++ i) {
		int tmp7 = pow((-1), (i + 1));
		int d0_2 = i % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (i - d0_2)/3 + 1;
		int tmp9 = pow((-1), (i + 1));
		int tmp10 = pow(((tmp9) * i), exponent);
		int tmp8 = tmp10;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp8;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size2 *= dim2[iter2];
	}
	Matrix *mat2 = createM(ndim2, dim2, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp11 = transposeM(mat2);
	b = tmp11;
	printM(b);
	Matrix * tmp12 = scalarpowerM(a, &exponent, 0);
	Matrix * c = tmp12;
	printM(c);
	//id_test
	exponent = 1.2;
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp13 = zerosM(ndim3, dim3);
	a = tmp13;
	int* lhs_data3 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_3 = i % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (i - d0_3)/3 + 1;
		int tmp14 = i;
		lhs_data3[(d1_3-1) + (d0_3-1) * 3] = tmp14;
	
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
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp16 = zerosM(ndim4, dim4);
	b = tmp16;
	complex* lhs_data4 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_4 = i % 3;
		if (d0_4 == 0) {
			d0_4 = 3;
		}
		int d1_4 = (i - d0_4)/3 + 1;
		complex tmp18 = cpow(i, exponent);
		complex tmp17 = tmp18;
		lhs_data4[(d1_4-1) + (d0_4-1) * 3] = tmp17;
	
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
	b = tmp19;
	printM(b);
	Matrix * tmp20 = scalarpowerM(a, &exponent, 1);
	c = tmp20;
	printM(c);
	//neg_id_test
	exponent = 1.2;
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp21 = zerosM(ndim5, dim5);
	a = tmp21;
	int* lhs_data5 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp22 = pow((-1), (i + 1));
		int d0_5 = i % 3;
		if (d0_5 == 0) {
			d0_5 = 3;
		}
		int d1_5 = (i - d0_5)/3 + 1;
		int tmp24 = pow((-1), (i + 1));
		int tmp23 = (tmp24) * i;
		lhs_data5[(d1_5-1) + (d0_5-1) * 3] = tmp23;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim5; iter5++)
	{
		size5 *= dim5[iter5];
	}
	Matrix *mat5 = createM(ndim5, dim5, 0);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp25 = transposeM(mat5);
	a = tmp25;
	printM(a);
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp26 = zerosM(ndim6, dim6);
	b = tmp26;
	complex* lhs_data6 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int tmp27 = pow((-1), (i + 1));
		int d0_6 = i % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (i - d0_6)/3 + 1;
		int tmp29 = pow((-1), (i + 1));
		complex tmp30 = cpow(((tmp29) * i), exponent);
		complex tmp28 = tmp30;
		lhs_data6[(d1_6-1) + (d0_6-1) * 3] = tmp28;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim6; iter6++)
	{
		size6 *= dim6[iter6];
	}
	Matrix *mat6 = createM(ndim6, dim6, 2);
	writeM(mat6, size6, lhs_data6);
	Matrix * tmp31 = transposeM(mat6);
	b = tmp31;
	printM(b);
	Matrix * tmp32 = scalarpowerM(a, &exponent, 1);
	c = tmp32;
	printM(c);
	//ic_test
	exponent = 4 + 0.3*I;
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp33 = zerosM(ndim7, dim7);
	a = tmp33;
	int* lhs_data7 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_7 = i % 3;
		if (d0_7 == 0) {
			d0_7 = 3;
		}
		int d1_7 = (i - d0_7)/3 + 1;
		int tmp34 = i;
		lhs_data7[(d1_7-1) + (d0_7-1) * 3] = tmp34;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter7 = 0 ; iter7 < ndim7; iter7++)
	{
		size7 *= dim7[iter7];
	}
	Matrix *mat7 = createM(ndim7, dim7, 0);
	writeM(mat7, size7, lhs_data7);
	Matrix * tmp35 = transposeM(mat7);
	a = tmp35;
	printM(a);
	int ndim8 = 2;
	int dim8[2] = {3,3};
	Matrix * tmp36 = zerosM(ndim8, dim8);
	b = tmp36;
	complex* lhs_data8 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_8 = i % 3;
		if (d0_8 == 0) {
			d0_8 = 3;
		}
		int d1_8 = (i - d0_8)/3 + 1;
		complex tmp38 = cpow(i, exponent);
		complex tmp37 = tmp38;
		lhs_data8[(d1_8-1) + (d0_8-1) * 3] = tmp37;
	
	}
	// Write matrix mat8
	int size8 = 1;
	for (int iter8 = 0 ; iter8 < ndim8; iter8++)
	{
		size8 *= dim8[iter8];
	}
	Matrix *mat8 = createM(ndim8, dim8, 2);
	writeM(mat8, size8, lhs_data8);
	Matrix * tmp39 = transposeM(mat8);
	b = tmp39;
	printM(b);
	Matrix * tmp40 = scalarpowerM(a, &exponent, 2);
	c = tmp40;
	printM(c);
	//di_test
	exponent = 5;
	int ndim9 = 2;
	int dim9[2] = {3,3};
	Matrix * tmp41 = zerosM(ndim9, dim9);
	a = tmp41;
	double* lhs_data9 = d_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp42 = pow((-1), (i + 1));
		int d0_9 = i % 3;
		if (d0_9 == 0) {
			d0_9 = 3;
		}
		int d1_9 = (i - d0_9)/3 + 1;
		int tmp44 = pow((-1), (i + 1));
		double tmp43 = (tmp44) * (i + 0.4);
		lhs_data9[(d1_9-1) + (d0_9-1) * 3] = tmp43;
	
	}
	// Write matrix mat9
	int size9 = 1;
	for (int iter9 = 0 ; iter9 < ndim9; iter9++)
	{
		size9 *= dim9[iter9];
	}
	Matrix *mat9 = createM(ndim9, dim9, 1);
	writeM(mat9, size9, lhs_data9);
	Matrix * tmp45 = transposeM(mat9);
	a = tmp45;
	printM(a);
	int ndim10 = 2;
	int dim10[2] = {3,3};
	Matrix * tmp46 = zerosM(ndim10, dim10);
	b = tmp46;
	double* lhs_data10 = d_to_d(b);
	for (int i = 1; i <= 9; ++ i) {
		int tmp47 = pow((-1), (i + 1));
		int d0_10 = i % 3;
		if (d0_10 == 0) {
			d0_10 = 3;
		}
		int d1_10 = (i - d0_10)/3 + 1;
		int tmp49 = pow((-1), (i + 1));
		double tmp50 = pow(((tmp49) * (i + 0.4)), exponent);
		double tmp48 = tmp50;
		lhs_data10[(d1_10-1) + (d0_10-1) * 3] = tmp48;
	
	}
	// Write matrix mat10
	int size10 = 1;
	for (int iter10 = 0 ; iter10 < ndim10; iter10++)
	{
		size10 *= dim10[iter10];
	}
	Matrix *mat10 = createM(ndim10, dim10, 1);
	writeM(mat10, size10, lhs_data10);
	Matrix * tmp51 = transposeM(mat10);
	b = tmp51;
	printM(b);
	Matrix * tmp52 = scalarpowerM(a, &exponent, 1);
	c = tmp52;
	printM(c);
	//dd_test
	exponent = 1.4;
	int ndim11 = 2;
	int dim11[2] = {3,3};
	Matrix * tmp53 = zerosM(ndim11, dim11);
	a = tmp53;
	double* lhs_data11 = d_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_11 = i % 3;
		if (d0_11 == 0) {
			d0_11 = 3;
		}
		int d1_11 = (i - d0_11)/3 + 1;
		double tmp54 = (i + 0.4);
		lhs_data11[(d1_11-1) + (d0_11-1) * 3] = tmp54;
	
	}
	// Write matrix mat11
	int size11 = 1;
	for (int iter11 = 0 ; iter11 < ndim11; iter11++)
	{
		size11 *= dim11[iter11];
	}
	Matrix *mat11 = createM(ndim11, dim11, 1);
	writeM(mat11, size11, lhs_data11);
	Matrix * tmp55 = transposeM(mat11);
	a = tmp55;
	printM(a);
	int ndim12 = 2;
	int dim12[2] = {3,3};
	Matrix * tmp56 = zerosM(ndim12, dim12);
	b = tmp56;
	complex* lhs_data12 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_12 = i % 3;
		if (d0_12 == 0) {
			d0_12 = 3;
		}
		int d1_12 = (i - d0_12)/3 + 1;
		complex tmp58 = cpow((i + 0.4), exponent);
		complex tmp57 = tmp58;
		lhs_data12[(d1_12-1) + (d0_12-1) * 3] = tmp57;
	
	}
	// Write matrix mat12
	int size12 = 1;
	for (int iter12 = 0 ; iter12 < ndim12; iter12++)
	{
		size12 *= dim12[iter12];
	}
	Matrix *mat12 = createM(ndim12, dim12, 2);
	writeM(mat12, size12, lhs_data12);
	Matrix * tmp59 = transposeM(mat12);
	b = tmp59;
	printM(b);
	Matrix * tmp60 = scalarpowerM(a, &exponent, 1);
	c = tmp60;
	printM(c);
	//neg_dd_test
	exponent = 1.4;
	int ndim13 = 2;
	int dim13[2] = {3,3};
	Matrix * tmp61 = zerosM(ndim13, dim13);
	a = tmp61;
	double* lhs_data13 = d_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int tmp62 = pow((-1), (i + 1));
		int d0_13 = i % 3;
		if (d0_13 == 0) {
			d0_13 = 3;
		}
		int d1_13 = (i - d0_13)/3 + 1;
		int tmp64 = pow((-1), (i + 1));
		double tmp63 = (tmp64) * (i + 0.4);
		lhs_data13[(d1_13-1) + (d0_13-1) * 3] = tmp63;
	
	}
	// Write matrix mat13
	int size13 = 1;
	for (int iter13 = 0 ; iter13 < ndim13; iter13++)
	{
		size13 *= dim13[iter13];
	}
	Matrix *mat13 = createM(ndim13, dim13, 1);
	writeM(mat13, size13, lhs_data13);
	Matrix * tmp65 = transposeM(mat13);
	a = tmp65;
	printM(a);
	int ndim14 = 2;
	int dim14[2] = {3,3};
	Matrix * tmp66 = zerosM(ndim14, dim14);
	b = tmp66;
	complex* lhs_data14 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int tmp67 = pow((-1), (i + 1));
		int d0_14 = i % 3;
		if (d0_14 == 0) {
			d0_14 = 3;
		}
		int d1_14 = (i - d0_14)/3 + 1;
		int tmp69 = pow((-1), (i + 1));
		complex tmp70 = cpow(((tmp69) * (i + 0.4)), exponent);
		complex tmp68 = tmp70;
		lhs_data14[(d1_14-1) + (d0_14-1) * 3] = tmp68;
	
	}
	// Write matrix mat14
	int size14 = 1;
	for (int iter14 = 0 ; iter14 < ndim14; iter14++)
	{
		size14 *= dim14[iter14];
	}
	Matrix *mat14 = createM(ndim14, dim14, 2);
	writeM(mat14, size14, lhs_data14);
	Matrix * tmp71 = transposeM(mat14);
	b = tmp71;
	printM(b);
	Matrix * tmp72 = scalarpowerM(a, &exponent, 1);
	c = tmp72;
	printM(c);
	//dc_test
	exponent = -0.5*I;
	int ndim15 = 2;
	int dim15[2] = {3,3};
	Matrix * tmp73 = zerosM(ndim15, dim15);
	a = tmp73;
	double* lhs_data15 = d_to_d(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_15 = i % 3;
		if (d0_15 == 0) {
			d0_15 = 3;
		}
		int d1_15 = (i - d0_15)/3 + 1;
		double tmp74 = i + 0.4;
		lhs_data15[(d1_15-1) + (d0_15-1) * 3] = tmp74;
	
	}
	// Write matrix mat15
	int size15 = 1;
	for (int iter15 = 0 ; iter15 < ndim15; iter15++)
	{
		size15 *= dim15[iter15];
	}
	Matrix *mat15 = createM(ndim15, dim15, 1);
	writeM(mat15, size15, lhs_data15);
	Matrix * tmp75 = transposeM(mat15);
	a = tmp75;
	printM(a);
	int ndim16 = 2;
	int dim16[2] = {3,3};
	Matrix * tmp76 = zerosM(ndim16, dim16);
	b = tmp76;
	complex* lhs_data16 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_16 = i % 3;
		if (d0_16 == 0) {
			d0_16 = 3;
		}
		int d1_16 = (i - d0_16)/3 + 1;
		complex tmp78 = cpow((i + 0.4), exponent);
		complex tmp77 = tmp78;
		lhs_data16[(d1_16-1) + (d0_16-1) * 3] = tmp77;
	
	}
	// Write matrix mat16
	int size16 = 1;
	for (int iter16 = 0 ; iter16 < ndim16; iter16++)
	{
		size16 *= dim16[iter16];
	}
	Matrix *mat16 = createM(ndim16, dim16, 2);
	writeM(mat16, size16, lhs_data16);
	Matrix * tmp79 = transposeM(mat16);
	b = tmp79;
	printM(b);
	Matrix * tmp80 = scalarpowerM(a, &exponent, 2);
	c = tmp80;
	printM(c);
	//ci_test
	exponent = 3;
	int ndim17 = 2;
	int dim17[2] = {3,3};
	Matrix * tmp81 = zerosM(ndim17, dim17);
	a = tmp81;
	complex* lhs_data17 = c_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_17 = i % 3;
		if (d0_17 == 0) {
			d0_17 = 3;
		}
		int d1_17 = (i - d0_17)/3 + 1;
		complex tmp82 = i + 0.5*I;
		lhs_data17[(d1_17-1) + (d0_17-1) * 3] = tmp82;
	
	}
	// Write matrix mat17
	int size17 = 1;
	for (int iter17 = 0 ; iter17 < ndim17; iter17++)
	{
		size17 *= dim17[iter17];
	}
	Matrix *mat17 = createM(ndim17, dim17, 2);
	writeM(mat17, size17, lhs_data17);
	Matrix * tmp83 = transposeM(mat17);
	a = tmp83;
	printM(a);
	int ndim18 = 2;
	int dim18[2] = {3,3};
	Matrix * tmp84 = zerosM(ndim18, dim18);
	b = tmp84;
	complex* lhs_data18 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_18 = i % 3;
		if (d0_18 == 0) {
			d0_18 = 3;
		}
		int d1_18 = (i - d0_18)/3 + 1;
		complex tmp86 = cpow((i + 0.5*I), exponent);
		complex tmp85 = tmp86;
		lhs_data18[(d1_18-1) + (d0_18-1) * 3] = tmp85;
	
	}
	// Write matrix mat18
	int size18 = 1;
	for (int iter18 = 0 ; iter18 < ndim18; iter18++)
	{
		size18 *= dim18[iter18];
	}
	Matrix *mat18 = createM(ndim18, dim18, 2);
	writeM(mat18, size18, lhs_data18);
	Matrix * tmp87 = transposeM(mat18);
	b = tmp87;
	printM(b);
	Matrix * tmp88 = scalarpowerM(a, &exponent, 2);
	c = tmp88;
	printM(c);
	//cd_test
	exponent = -0.9;
	int ndim19 = 2;
	int dim19[2] = {3,3};
	Matrix * tmp89 = zerosM(ndim19, dim19);
	a = tmp89;
	complex* lhs_data19 = c_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_19 = i % 3;
		if (d0_19 == 0) {
			d0_19 = 3;
		}
		int d1_19 = (i - d0_19)/3 + 1;
		complex tmp90 = i + 0.5*I;
		lhs_data19[(d1_19-1) + (d0_19-1) * 3] = tmp90;
	
	}
	// Write matrix mat19
	int size19 = 1;
	for (int iter19 = 0 ; iter19 < ndim19; iter19++)
	{
		size19 *= dim19[iter19];
	}
	Matrix *mat19 = createM(ndim19, dim19, 2);
	writeM(mat19, size19, lhs_data19);
	Matrix * tmp91 = transposeM(mat19);
	a = tmp91;
	printM(a);
	int ndim20 = 2;
	int dim20[2] = {3,3};
	Matrix * tmp92 = zerosM(ndim20, dim20);
	b = tmp92;
	complex* lhs_data20 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_20 = i % 3;
		if (d0_20 == 0) {
			d0_20 = 3;
		}
		int d1_20 = (i - d0_20)/3 + 1;
		complex tmp94 = cpow((i + 0.5*I), exponent);
		complex tmp93 = tmp94;
		lhs_data20[(d1_20-1) + (d0_20-1) * 3] = tmp93;
	
	}
	// Write matrix mat20
	int size20 = 1;
	for (int iter20 = 0 ; iter20 < ndim20; iter20++)
	{
		size20 *= dim20[iter20];
	}
	Matrix *mat20 = createM(ndim20, dim20, 2);
	writeM(mat20, size20, lhs_data20);
	Matrix * tmp95 = transposeM(mat20);
	b = tmp95;
	printM(b);
	Matrix * tmp96 = scalarpowerM(a, &exponent, 2);
	c = tmp96;
	printM(c);
	//cc_test
	exponent = 2 - 2*I;
	int ndim21 = 2;
	int dim21[2] = {3,3};
	Matrix * tmp97 = zerosM(ndim21, dim21);
	a = tmp97;
	complex* lhs_data21 = c_to_c(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_21 = i % 3;
		if (d0_21 == 0) {
			d0_21 = 3;
		}
		int d1_21 = (i - d0_21)/3 + 1;
		complex tmp98 = i + 0.5*I;
		lhs_data21[(d1_21-1) + (d0_21-1) * 3] = tmp98;
	
	}
	// Write matrix mat21
	int size21 = 1;
	for (int iter21 = 0 ; iter21 < ndim21; iter21++)
	{
		size21 *= dim21[iter21];
	}
	Matrix *mat21 = createM(ndim21, dim21, 2);
	writeM(mat21, size21, lhs_data21);
	Matrix * tmp99 = transposeM(mat21);
	a = tmp99;
	printM(a);
	int ndim22 = 2;
	int dim22[2] = {3,3};
	Matrix * tmp100 = zerosM(ndim22, dim22);
	b = tmp100;
	complex* lhs_data22 = c_to_c(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_22 = i % 3;
		if (d0_22 == 0) {
			d0_22 = 3;
		}
		int d1_22 = (i - d0_22)/3 + 1;
		complex tmp102 = cpow((i + 0.5*I), exponent);
		complex tmp101 = tmp102;
		lhs_data22[(d1_22-1) + (d0_22-1) * 3] = tmp101;
	
	}
	// Write matrix mat22
	int size22 = 1;
	for (int iter22 = 0 ; iter22 < ndim22; iter22++)
	{
		size22 *= dim22[iter22];
	}
	Matrix *mat22 = createM(ndim22, dim22, 2);
	writeM(mat22, size22, lhs_data22);
	Matrix * tmp103 = transposeM(mat22);
	b = tmp103;
	printM(b);
	Matrix * tmp104 = scalarpowerM(a, &exponent, 2);
	c = tmp104;
	printM(c);
	//overflow_test
	exponent = 2;
	int ndim23 = 2;
	int dim23[2] = {3,3};
	Matrix * tmp105 = zerosM(ndim23, dim23);
	a = tmp105;
	int* lhs_data23 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_23 = i % 3;
		if (d0_23 == 0) {
			d0_23 = 3;
		}
		int d1_23 = (i - d0_23)/3 + 1;
		int tmp106 = INT_MAX;
		lhs_data23[(d1_23-1) + (d0_23-1) * 3] = tmp106;
	
	}
	// Write matrix mat23
	int size23 = 1;
	for (int iter23 = 0 ; iter23 < ndim23; iter23++)
	{
		size23 *= dim23[iter23];
	}
	Matrix *mat23 = createM(ndim23, dim23, 0);
	writeM(mat23, size23, lhs_data23);
	Matrix * tmp107 = transposeM(mat23);
	a = tmp107;
	printM(a);
	int ndim24 = 2;
	int dim24[2] = {3,3};
	Matrix * tmp108 = zerosM(ndim24, dim24);
	b = tmp108;
	int* lhs_data24 = i_to_i(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_24 = i % 3;
		if (d0_24 == 0) {
			d0_24 = 3;
		}
		int d1_24 = (i - d0_24)/3 + 1;
		int tmp110 = pow(INT_MAX, exponent);
		int tmp109 = tmp110;
		lhs_data24[(d1_24-1) + (d0_24-1) * 3] = tmp109;
	
	}
	// Write matrix mat24
	int size24 = 1;
	for (int iter24 = 0 ; iter24 < ndim24; iter24++)
	{
		size24 *= dim24[iter24];
	}
	Matrix *mat24 = createM(ndim24, dim24, 0);
	writeM(mat24, size24, lhs_data24);
	Matrix * tmp111 = transposeM(mat24);
	b = tmp111;
	printM(b);
	Matrix * tmp112 = scalarpowerM(a, &exponent, 0);
	c = tmp112;
	printM(c);
	//underflow_test
	exponent = 2;
	int ndim25 = 2;
	int dim25[2] = {3,3};
	Matrix * tmp113 = zerosM(ndim25, dim25);
	a = tmp113;
	int* lhs_data25 = i_to_i(a);
	for (int i = 1; i <= 9; ++ i) {
		int d0_25 = i % 3;
		if (d0_25 == 0) {
			d0_25 = 3;
		}
		int d1_25 = (i - d0_25)/3 + 1;
		int tmp114 = INT_MIN;
		lhs_data25[(d1_25-1) + (d0_25-1) * 3] = tmp114;
	
	}
	// Write matrix mat25
	int size25 = 1;
	for (int iter25 = 0 ; iter25 < ndim25; iter25++)
	{
		size25 *= dim25[iter25];
	}
	Matrix *mat25 = createM(ndim25, dim25, 0);
	writeM(mat25, size25, lhs_data25);
	Matrix * tmp115 = transposeM(mat25);
	a = tmp115;
	printM(a);
	int ndim26 = 2;
	int dim26[2] = {3,3};
	Matrix * tmp116 = zerosM(ndim26, dim26);
	b = tmp116;
	int* lhs_data26 = i_to_i(b);
	for (int i = 1; i <= 9; ++ i) {
		int d0_26 = i % 3;
		if (d0_26 == 0) {
			d0_26 = 3;
		}
		int d1_26 = (i - d0_26)/3 + 1;
		int tmp118 = pow(INT_MIN, exponent);
		int tmp117 = tmp118;
		lhs_data26[(d1_26-1) + (d0_26-1) * 3] = tmp117;
	
	}
	// Write matrix mat26
	int size26 = 1;
	for (int iter26 = 0 ; iter26 < ndim26; iter26++)
	{
		size26 *= dim26[iter26];
	}
	Matrix *mat26 = createM(ndim26, dim26, 0);
	writeM(mat26, size26, lhs_data26);
	Matrix * tmp119 = transposeM(mat26);
	b = tmp119;
	printM(b);
	Matrix * tmp120 = scalarpowerM(a, &exponent, 0);
	c = tmp120;
	printM(c);
	return 0;
}
