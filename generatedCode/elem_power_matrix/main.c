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
	int ndim1= 2;
	int dim1[2]= {3,3};
	Matrix * tmp1= zerosM(ndim1, dim1);
	Matrix * a= tmp1;
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int d0_1 = iter1 % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (iter1 - d0_1)/3 + 1;
		int tmp2= iter1;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp2;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim1; iter2++)
	{
		size1 *= dim1[iter2];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp3= transposeM(mat1);
	a = tmp3;
	printM(a);
	Matrix * b= a;
	printM(b);
	Matrix * tmp4= powerM(a, b);
	Matrix * c= tmp4;
	printM(c);
	//id_test
	int ndim2= 2;
	int dim2[2]= {3,3};
	Matrix * tmp5= zerosM(ndim2, dim2);
	a = tmp5;
	int* lhs_data2 = i_to_i(a);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int d0_2 = iter3 % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (iter3 - d0_2)/3 + 1;
		int tmp6= iter3;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp6;
	
	}
	mat1 = mat1;
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim2; iter4++)
	{
		size2 *= dim2[iter4];
	}
	Matrix *mat2 = createM(ndim2, dim2, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp7= transposeM(mat2);
	a = tmp7;
	printM(a);
	int ndim3= 2;
	int dim3[2]= {3,3};
	Matrix * tmp8= zerosM(ndim3, dim3);
	b = tmp8;
	double* lhs_data3 = d_to_d(b);
	for (int iter5 = 1; iter5 <= 9; ++ iter5) {
		int d0_3 = iter5 % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (iter5 - d0_3)/3 + 1;
		double tmp9= iter5 + 0.4;
		lhs_data3[(d1_3-1) + (d0_3-1) * 3] = tmp9;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim3; iter6++)
	{
		size3 *= dim3[iter6];
	}
	Matrix *mat3 = createM(ndim3, dim3, 1);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp10= transposeM(mat3);
	b = tmp10;
	printM(b);
	Matrix * tmp11= powerM(a, b);
	c = tmp11;
	printM(c);
	//neg_id_test
	int ndim4= 2;
	int dim4[2]= {3,3};
	Matrix * tmp12= zerosM(ndim4, dim4);
	a = tmp12;
	int* lhs_data4 = i_to_i(a);
	for (int iter7 = 1; iter7 <= 9; ++ iter7) {
		int d0_4 = iter7 % 3;
		if (d0_4 == 0) {
			d0_4 = 3;
		}
		int d1_4 = (iter7 - d0_4)/3 + 1;
		int tmp13= -iter7;
		lhs_data4[(d1_4-1) + (d0_4-1) * 3] = tmp13;
	
	}
	mat2 = mat2;
	// Write matrix mat4
	int size4 = 1;
	for (int iter8 = 0 ; iter8 < ndim4; iter8++)
	{
		size4 *= dim4[iter8];
	}
	Matrix *mat4 = createM(ndim4, dim4, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp14= transposeM(mat4);
	a = tmp14;
	printM(a);
	int ndim5= 2;
	int dim5[2]= {3,3};
	Matrix * tmp15= zerosM(ndim5, dim5);
	b = tmp15;
	double* lhs_data5 = d_to_d(b);
	for (int iter9 = 1; iter9 <= 9; ++ iter9) {
		int d0_5 = iter9 % 3;
		if (d0_5 == 0) {
			d0_5 = 3;
		}
		int d1_5 = (iter9 - d0_5)/3 + 1;
		double tmp16= iter9 + 0.4;
		lhs_data5[(d1_5-1) + (d0_5-1) * 3] = tmp16;
	
	}
	mat3 = mat3;
	// Write matrix mat5
	int size5 = 1;
	for (int iter10 = 0 ; iter10 < ndim5; iter10++)
	{
		size5 *= dim5[iter10];
	}
	Matrix *mat5 = createM(ndim5, dim5, 1);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp17= transposeM(mat5);
	b = tmp17;
	printM(b);
	Matrix * tmp18= powerM(a, b);
	c = tmp18;
	printM(c);
	//ic_test
	int ndim6= 2;
	int dim6[2]= {3,3};
	Matrix * tmp19= zerosM(ndim6, dim6);
	a = tmp19;
	int* lhs_data6 = i_to_i(a);
	for (int iter11 = 1; iter11 <= 9; ++ iter11) {
		int d0_6 = iter11 % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (iter11 - d0_6)/3 + 1;
		int tmp20= iter11;
		lhs_data6[(d1_6-1) + (d0_6-1) * 3] = tmp20;
	
	}
	mat4 = mat4;
	// Write matrix mat6
	int size6 = 1;
	for (int iter12 = 0 ; iter12 < ndim6; iter12++)
	{
		size6 *= dim6[iter12];
	}
	Matrix *mat6 = createM(ndim6, dim6, 0);
	writeM(mat6, size6, lhs_data6);
	Matrix * tmp21= transposeM(mat6);
	a = tmp21;
	printM(a);
	int ndim7= 2;
	int dim7[2]= {3,3};
	Matrix * tmp22= zerosM(ndim7, dim7);
	b = tmp22;
	complex* lhs_data7 = d_to_c(b);
	for (int iter13 = 1; iter13 <= 9; ++ iter13) {
		int d0_7 = iter13 % 3;
		if (d0_7 == 0) {
			d0_7 = 3;
		}
		int d1_7 = (iter13 - d0_7)/3 + 1;
		complex tmp23= iter13 + 0.4*I;
		lhs_data7[(d1_7-1) + (d0_7-1) * 3] = tmp23;
	
	}
	mat5 = mat5;
	// Write matrix mat7
	int size7 = 1;
	for (int iter14 = 0 ; iter14 < ndim7; iter14++)
	{
		size7 *= dim7[iter14];
	}
	Matrix *mat7 = createM(ndim7, dim7, 2);
	writeM(mat7, size7, lhs_data7);
	Matrix * tmp24= transposeM(mat7);
	b = tmp24;
	printM(b);
	Matrix * tmp25= powerM(a, b);
	c = tmp25;
	printM(c);
	//di_test
	int ndim8= 2;
	int dim8[2]= {3,3};
	Matrix * tmp26= zerosM(ndim8, dim8);
	a = tmp26;
	double* lhs_data8 = i_to_d(a);
	for (int iter15 = 1; iter15 <= 9; ++ iter15) {
		int d0_8 = iter15 % 3;
		if (d0_8 == 0) {
			d0_8 = 3;
		}
		int d1_8 = (iter15 - d0_8)/3 + 1;
		double tmp27= iter15 + 0.4;
		lhs_data8[(d1_8-1) + (d0_8-1) * 3] = tmp27;
	
	}
	mat6 = mat6;
	// Write matrix mat8
	int size8 = 1;
	for (int iter16 = 0 ; iter16 < ndim8; iter16++)
	{
		size8 *= dim8[iter16];
	}
	Matrix *mat8 = createM(ndim8, dim8, 1);
	writeM(mat8, size8, lhs_data8);
	Matrix * tmp28= transposeM(mat8);
	a = tmp28;
	printM(a);
	int ndim9= 2;
	int dim9[2]= {3,3};
	Matrix * tmp29= zerosM(ndim9, dim9);
	b = tmp29;
	int* lhs_data9 = d_to_i(b);
	for (int iter17 = 1; iter17 <= 9; ++ iter17) {
		int d0_9 = iter17 % 3;
		if (d0_9 == 0) {
			d0_9 = 3;
		}
		int d1_9 = (iter17 - d0_9)/3 + 1;
		int tmp30= iter17;
		lhs_data9[(d1_9-1) + (d0_9-1) * 3] = tmp30;
	
	}
	mat7 = mat7;
	// Write matrix mat9
	int size9 = 1;
	for (int iter18 = 0 ; iter18 < ndim9; iter18++)
	{
		size9 *= dim9[iter18];
	}
	Matrix *mat9 = createM(ndim9, dim9, 0);
	writeM(mat9, size9, lhs_data9);
	Matrix * tmp31= transposeM(mat9);
	b = tmp31;
	printM(b);
	Matrix * tmp32= powerM(a, b);
	c = tmp32;
	printM(c);
	//dd_test
	int ndim10= 2;
	int dim10[2]= {3,3};
	Matrix * tmp33= zerosM(ndim10, dim10);
	a = tmp33;
	double* lhs_data10 = i_to_d(a);
	for (int iter19 = 1; iter19 <= 9; ++ iter19) {
		int d0_10 = iter19 % 3;
		if (d0_10 == 0) {
			d0_10 = 3;
		}
		int d1_10 = (iter19 - d0_10)/3 + 1;
		double tmp34= iter19 + 0.4;
		lhs_data10[(d1_10-1) + (d0_10-1) * 3] = tmp34;
	
	}
	mat8 = mat8;
	// Write matrix mat10
	int size10 = 1;
	for (int iter20 = 0 ; iter20 < ndim10; iter20++)
	{
		size10 *= dim10[iter20];
	}
	Matrix *mat10 = createM(ndim10, dim10, 1);
	writeM(mat10, size10, lhs_data10);
	Matrix * tmp35= transposeM(mat10);
	a = tmp35;
	printM(a);
	int ndim11= 2;
	int dim11[2]= {3,3};
	Matrix * tmp36= zerosM(ndim11, dim11);
	b = tmp36;
	double* lhs_data11 = d_to_d(b);
	for (int iter21 = 1; iter21 <= 9; ++ iter21) {
		int d0_11 = iter21 % 3;
		if (d0_11 == 0) {
			d0_11 = 3;
		}
		int d1_11 = (iter21 - d0_11)/3 + 1;
		double tmp37= (iter21 + 0.4);
		lhs_data11[(d1_11-1) + (d0_11-1) * 3] = tmp37;
	
	}
	mat9 = mat9;
	// Write matrix mat11
	int size11 = 1;
	for (int iter22 = 0 ; iter22 < ndim11; iter22++)
	{
		size11 *= dim11[iter22];
	}
	Matrix *mat11 = createM(ndim11, dim11, 1);
	writeM(mat11, size11, lhs_data11);
	Matrix * tmp38= transposeM(mat11);
	b = tmp38;
	printM(b);
	Matrix * tmp39= powerM(a, b);
	c = tmp39;
	printM(c);
	//neg_dd_test
	int ndim12= 2;
	int dim12[2]= {3,3};
	Matrix * tmp40= zerosM(ndim12, dim12);
	a = tmp40;
	double* lhs_data12 = i_to_d(a);
	for (int iter23 = 1; iter23 <= 9; ++ iter23) {
		int d0_12 = iter23 % 3;
		if (d0_12 == 0) {
			d0_12 = 3;
		}
		int d1_12 = (iter23 - d0_12)/3 + 1;
		double tmp41= -(iter23 + 0.4);
		lhs_data12[(d1_12-1) + (d0_12-1) * 3] = tmp41;
	
	}
	mat10 = mat10;
	// Write matrix mat12
	int size12 = 1;
	for (int iter24 = 0 ; iter24 < ndim12; iter24++)
	{
		size12 *= dim12[iter24];
	}
	Matrix *mat12 = createM(ndim12, dim12, 1);
	writeM(mat12, size12, lhs_data12);
	Matrix * tmp42= transposeM(mat12);
	a = tmp42;
	printM(a);
	int ndim13= 2;
	int dim13[2]= {3,3};
	Matrix * tmp43= zerosM(ndim13, dim13);
	b = tmp43;
	double* lhs_data13 = d_to_d(b);
	for (int iter25 = 1; iter25 <= 9; ++ iter25) {
		int d0_13 = iter25 % 3;
		if (d0_13 == 0) {
			d0_13 = 3;
		}
		int d1_13 = (iter25 - d0_13)/3 + 1;
		double tmp44= -(iter25 + 0.4);
		lhs_data13[(d1_13-1) + (d0_13-1) * 3] = tmp44;
	
	}
	mat11 = mat11;
	// Write matrix mat13
	int size13 = 1;
	for (int iter26 = 0 ; iter26 < ndim13; iter26++)
	{
		size13 *= dim13[iter26];
	}
	Matrix *mat13 = createM(ndim13, dim13, 1);
	writeM(mat13, size13, lhs_data13);
	Matrix * tmp45= transposeM(mat13);
	b = tmp45;
	printM(b);
	Matrix * tmp46= powerM(a, b);
	c = tmp46;
	printM(c);
	//dc_test
	int ndim14= 2;
	int dim14[2]= {3,3};
	Matrix * tmp47= zerosM(ndim14, dim14);
	a = tmp47;
	double* lhs_data14 = i_to_d(a);
	for (int iter27 = 1; iter27 <= 9; ++ iter27) {
		int d0_14 = iter27 % 3;
		if (d0_14 == 0) {
			d0_14 = 3;
		}
		int d1_14 = (iter27 - d0_14)/3 + 1;
		double tmp48= iter27 + 0.4;
		lhs_data14[(d1_14-1) + (d0_14-1) * 3] = tmp48;
	
	}
	mat12 = mat12;
	// Write matrix mat14
	int size14 = 1;
	for (int iter28 = 0 ; iter28 < ndim14; iter28++)
	{
		size14 *= dim14[iter28];
	}
	Matrix *mat14 = createM(ndim14, dim14, 1);
	writeM(mat14, size14, lhs_data14);
	Matrix * tmp49= transposeM(mat14);
	a = tmp49;
	printM(a);
	int ndim15= 2;
	int dim15[2]= {3,3};
	Matrix * tmp50= zerosM(ndim15, dim15);
	b = tmp50;
	complex* lhs_data15 = d_to_c(b);
	for (int iter29 = 1; iter29 <= 9; ++ iter29) {
		int d0_15 = iter29 % 3;
		if (d0_15 == 0) {
			d0_15 = 3;
		}
		int d1_15 = (iter29 - d0_15)/3 + 1;
		complex tmp51= iter29 + 0.4*I;
		lhs_data15[(d1_15-1) + (d0_15-1) * 3] = tmp51;
	
	}
	mat13 = mat13;
	// Write matrix mat15
	int size15 = 1;
	for (int iter30 = 0 ; iter30 < ndim15; iter30++)
	{
		size15 *= dim15[iter30];
	}
	Matrix *mat15 = createM(ndim15, dim15, 2);
	writeM(mat15, size15, lhs_data15);
	Matrix * tmp52= transposeM(mat15);
	b = tmp52;
	printM(b);
	Matrix * tmp53= powerM(a, b);
	c = tmp53;
	printM(c);
	//ci_test
	int ndim16= 2;
	int dim16[2]= {3,3};
	Matrix * tmp54= zerosM(ndim16, dim16);
	a = tmp54;
	complex* lhs_data16 = i_to_c(a);
	for (int iter31 = 1; iter31 <= 9; ++ iter31) {
		int d0_16 = iter31 % 3;
		if (d0_16 == 0) {
			d0_16 = 3;
		}
		int d1_16 = (iter31 - d0_16)/3 + 1;
		complex tmp55= iter31 + 1*I;
		lhs_data16[(d1_16-1) + (d0_16-1) * 3] = tmp55;
	
	}
	mat14 = mat14;
	// Write matrix mat16
	int size16 = 1;
	for (int iter32 = 0 ; iter32 < ndim16; iter32++)
	{
		size16 *= dim16[iter32];
	}
	Matrix *mat16 = createM(ndim16, dim16, 2);
	writeM(mat16, size16, lhs_data16);
	Matrix * tmp56= transposeM(mat16);
	a = tmp56;
	printM(a);
	int ndim17= 2;
	int dim17[2]= {3,3};
	Matrix * tmp57= zerosM(ndim17, dim17);
	b = tmp57;
	int* lhs_data17 = d_to_i(b);
	for (int iter33 = 1; iter33 <= 9; ++ iter33) {
		int d0_17 = iter33 % 3;
		if (d0_17 == 0) {
			d0_17 = 3;
		}
		int d1_17 = (iter33 - d0_17)/3 + 1;
		int tmp58= iter33;
		lhs_data17[(d1_17-1) + (d0_17-1) * 3] = tmp58;
	
	}
	mat15 = mat15;
	// Write matrix mat17
	int size17 = 1;
	for (int iter34 = 0 ; iter34 < ndim17; iter34++)
	{
		size17 *= dim17[iter34];
	}
	Matrix *mat17 = createM(ndim17, dim17, 0);
	writeM(mat17, size17, lhs_data17);
	Matrix * tmp59= transposeM(mat17);
	b = tmp59;
	printM(b);
	Matrix * tmp60= powerM(a, b);
	c = tmp60;
	printM(c);
	//cd_test
	int ndim18= 2;
	int dim18[2]= {3,3};
	Matrix * tmp61= zerosM(ndim18, dim18);
	a = tmp61;
	complex* lhs_data18 = i_to_c(a);
	for (int iter35 = 1; iter35 <= 9; ++ iter35) {
		int d0_18 = iter35 % 3;
		if (d0_18 == 0) {
			d0_18 = 3;
		}
		int d1_18 = (iter35 - d0_18)/3 + 1;
		complex tmp62= iter35 + 0.5*I;
		lhs_data18[(d1_18-1) + (d0_18-1) * 3] = tmp62;
	
	}
	mat16 = mat16;
	// Write matrix mat18
	int size18 = 1;
	for (int iter36 = 0 ; iter36 < ndim18; iter36++)
	{
		size18 *= dim18[iter36];
	}
	Matrix *mat18 = createM(ndim18, dim18, 2);
	writeM(mat18, size18, lhs_data18);
	Matrix * tmp63= transposeM(mat18);
	a = tmp63;
	printM(a);
	int ndim19= 2;
	int dim19[2]= {3,3};
	Matrix * tmp64= zerosM(ndim19, dim19);
	b = tmp64;
	double* lhs_data19 = d_to_d(b);
	for (int iter37 = 1; iter37 <= 9; ++ iter37) {
		int d0_19 = iter37 % 3;
		if (d0_19 == 0) {
			d0_19 = 3;
		}
		int d1_19 = (iter37 - d0_19)/3 + 1;
		double tmp65= (iter37 + 0.4);
		lhs_data19[(d1_19-1) + (d0_19-1) * 3] = tmp65;
	
	}
	mat17 = mat17;
	// Write matrix mat19
	int size19 = 1;
	for (int iter38 = 0 ; iter38 < ndim19; iter38++)
	{
		size19 *= dim19[iter38];
	}
	Matrix *mat19 = createM(ndim19, dim19, 1);
	writeM(mat19, size19, lhs_data19);
	Matrix * tmp66= transposeM(mat19);
	b = tmp66;
	printM(b);
	Matrix * tmp67= powerM(a, b);
	c = tmp67;
	printM(c);
	//cc_test
	int ndim20= 2;
	int dim20[2]= {3,3};
	Matrix * tmp68= zerosM(ndim20, dim20);
	a = tmp68;
	complex* lhs_data20 = i_to_c(a);
	for (int iter39 = 1; iter39 <= 9; ++ iter39) {
		int d0_20 = iter39 % 3;
		if (d0_20 == 0) {
			d0_20 = 3;
		}
		int d1_20 = (iter39 - d0_20)/3 + 1;
		complex tmp69= iter39 + 0.4*I;
		lhs_data20[(d1_20-1) + (d0_20-1) * 3] = tmp69;
	
	}
	mat18 = mat18;
	// Write matrix mat20
	int size20 = 1;
	for (int iter40 = 0 ; iter40 < ndim20; iter40++)
	{
		size20 *= dim20[iter40];
	}
	Matrix *mat20 = createM(ndim20, dim20, 2);
	writeM(mat20, size20, lhs_data20);
	Matrix * tmp70= transposeM(mat20);
	a = tmp70;
	printM(a);
	int ndim21= 2;
	int dim21[2]= {3,3};
	Matrix * tmp71= zerosM(ndim21, dim21);
	b = tmp71;
	complex* lhs_data21 = d_to_c(b);
	for (int iter41 = 1; iter41 <= 9; ++ iter41) {
		int d0_21 = iter41 % 3;
		if (d0_21 == 0) {
			d0_21 = 3;
		}
		int d1_21 = (iter41 - d0_21)/3 + 1;
		complex tmp72= iter41 + 0.4*I;
		lhs_data21[(d1_21-1) + (d0_21-1) * 3] = tmp72;
	
	}
	mat19 = mat19;
	// Write matrix mat21
	int size21 = 1;
	for (int iter42 = 0 ; iter42 < ndim21; iter42++)
	{
		size21 *= dim21[iter42];
	}
	Matrix *mat21 = createM(ndim21, dim21, 2);
	writeM(mat21, size21, lhs_data21);
	Matrix * tmp73= transposeM(mat21);
	b = tmp73;
	printM(b);
	Matrix * tmp74= powerM(a, b);
	c = tmp74;
	printM(c);
	//overflow_test
	int ndim22= 2;
	int dim22[2]= {3,3};
	Matrix * tmp75= zerosM(ndim22, dim22);
	a = tmp75;
	int* lhs_data22 = i_to_i(a);
	for (int iter43 = 1; iter43 <= 9; ++ iter43) {
		int d0_22 = iter43 % 3;
		if (d0_22 == 0) {
			d0_22 = 3;
		}
		int d1_22 = (iter43 - d0_22)/3 + 1;
		int tmp76= INT_MAX;
		lhs_data22[(d1_22-1) + (d0_22-1) * 3] = tmp76;
	
	}
	mat20 = mat20;
	// Write matrix mat22
	int size22 = 1;
	for (int iter44 = 0 ; iter44 < ndim22; iter44++)
	{
		size22 *= dim22[iter44];
	}
	Matrix *mat22 = createM(ndim22, dim22, 0);
	writeM(mat22, size22, lhs_data22);
	Matrix * tmp77= transposeM(mat22);
	a = tmp77;
	printM(a);
	int ndim23= 2;
	int dim23[2]= {3,3};
	Matrix * tmp78= onesM(ndim23, dim23);
	int scalar1= 2;
	Matrix * tmp79= scaleM(tmp78, &scalar1, 0);
	b = tmp79;
	printM(a);
	Matrix * tmp80= powerM(a, b);
	c = tmp80;
	printM(c);
	return 0;
}
