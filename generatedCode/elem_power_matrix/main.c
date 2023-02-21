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
	for (int i = 1; i <= 9; ++ i) {
		int d0_2 = i % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (i - d0_2)/3 + 1;
		int tmp6 = i;
		lhs_data1[(d1_2-1) + (d0_2-1) * 3] = tmp6;
	
	}
	Matrix * tmp7 = transposeM(a);
	a = tmp7;
	printM(a);
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp8 = zerosM(ndim3, dim3);
	b = tmp8;
	for (int i = 1; i <= 9; ++ i) {
		int d0_3 = i % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (i - d0_3)/3 + 1;
		double tmp9 = i + 0.4;
		lhs_data1[(d1_3-1) + (d0_3-1) * 3] = tmp9;
	
	}
	Matrix * tmp10 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_4 = i % 3;
		if (d0_4 == 0) {
			d0_4 = 3;
		}
		int d1_4 = (i - d0_4)/3 + 1;
		int tmp13 = -i;
		lhs_data1[(d1_4-1) + (d0_4-1) * 3] = tmp13;
	
	}
	Matrix * tmp14 = transposeM(a);
	a = tmp14;
	printM(a);
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp15 = zerosM(ndim5, dim5);
	b = tmp15;
	for (int i = 1; i <= 9; ++ i) {
		int d0_5 = i % 3;
		if (d0_5 == 0) {
			d0_5 = 3;
		}
		int d1_5 = (i - d0_5)/3 + 1;
		double tmp16 = i + 0.4;
		lhs_data1[(d1_5-1) + (d0_5-1) * 3] = tmp16;
	
	}
	Matrix * tmp17 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_6 = i % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (i - d0_6)/3 + 1;
		int tmp20 = i;
		lhs_data1[(d1_6-1) + (d0_6-1) * 3] = tmp20;
	
	}
	Matrix * tmp21 = transposeM(a);
	a = tmp21;
	printM(a);
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp22 = zerosM(ndim7, dim7);
	b = tmp22;
	for (int i = 1; i <= 9; ++ i) {
		int d0_7 = i % 3;
		if (d0_7 == 0) {
			d0_7 = 3;
		}
		int d1_7 = (i - d0_7)/3 + 1;
		complex tmp23 = i + 0.4*I;
		lhs_data1[(d1_7-1) + (d0_7-1) * 3] = tmp23;
	
	}
	Matrix * tmp24 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_8 = i % 3;
		if (d0_8 == 0) {
			d0_8 = 3;
		}
		int d1_8 = (i - d0_8)/3 + 1;
		double tmp27 = i + 0.4;
		lhs_data1[(d1_8-1) + (d0_8-1) * 3] = tmp27;
	
	}
	Matrix * tmp28 = transposeM(a);
	a = tmp28;
	printM(a);
	int ndim9 = 2;
	int dim9[2] = {3,3};
	Matrix * tmp29 = zerosM(ndim9, dim9);
	b = tmp29;
	for (int i = 1; i <= 9; ++ i) {
		int d0_9 = i % 3;
		if (d0_9 == 0) {
			d0_9 = 3;
		}
		int d1_9 = (i - d0_9)/3 + 1;
		int tmp30 = i;
		lhs_data1[(d1_9-1) + (d0_9-1) * 3] = tmp30;
	
	}
	Matrix * tmp31 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_10 = i % 3;
		if (d0_10 == 0) {
			d0_10 = 3;
		}
		int d1_10 = (i - d0_10)/3 + 1;
		double tmp34 = i + 0.4;
		lhs_data1[(d1_10-1) + (d0_10-1) * 3] = tmp34;
	
	}
	Matrix * tmp35 = transposeM(a);
	a = tmp35;
	printM(a);
	int ndim11 = 2;
	int dim11[2] = {3,3};
	Matrix * tmp36 = zerosM(ndim11, dim11);
	b = tmp36;
	for (int i = 1; i <= 9; ++ i) {
		int d0_11 = i % 3;
		if (d0_11 == 0) {
			d0_11 = 3;
		}
		int d1_11 = (i - d0_11)/3 + 1;
		double tmp37 = (i + 0.4);
		lhs_data1[(d1_11-1) + (d0_11-1) * 3] = tmp37;
	
	}
	Matrix * tmp38 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_12 = i % 3;
		if (d0_12 == 0) {
			d0_12 = 3;
		}
		int d1_12 = (i - d0_12)/3 + 1;
		double tmp41 = -(i + 0.4);
		lhs_data1[(d1_12-1) + (d0_12-1) * 3] = tmp41;
	
	}
	Matrix * tmp42 = transposeM(a);
	a = tmp42;
	printM(a);
	int ndim13 = 2;
	int dim13[2] = {3,3};
	Matrix * tmp43 = zerosM(ndim13, dim13);
	b = tmp43;
	for (int i = 1; i <= 9; ++ i) {
		int d0_13 = i % 3;
		if (d0_13 == 0) {
			d0_13 = 3;
		}
		int d1_13 = (i - d0_13)/3 + 1;
		double tmp44 = -(i + 0.4);
		lhs_data1[(d1_13-1) + (d0_13-1) * 3] = tmp44;
	
	}
	Matrix * tmp45 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_14 = i % 3;
		if (d0_14 == 0) {
			d0_14 = 3;
		}
		int d1_14 = (i - d0_14)/3 + 1;
		double tmp48 = i + 0.4;
		lhs_data1[(d1_14-1) + (d0_14-1) * 3] = tmp48;
	
	}
	Matrix * tmp49 = transposeM(a);
	a = tmp49;
	printM(a);
	int ndim15 = 2;
	int dim15[2] = {3,3};
	Matrix * tmp50 = zerosM(ndim15, dim15);
	b = tmp50;
	for (int i = 1; i <= 9; ++ i) {
		int d0_15 = i % 3;
		if (d0_15 == 0) {
			d0_15 = 3;
		}
		int d1_15 = (i - d0_15)/3 + 1;
		complex tmp51 = i + 0.4*I;
		lhs_data1[(d1_15-1) + (d0_15-1) * 3] = tmp51;
	
	}
	Matrix * tmp52 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_16 = i % 3;
		if (d0_16 == 0) {
			d0_16 = 3;
		}
		int d1_16 = (i - d0_16)/3 + 1;
		complex tmp55 = i + 1*I;
		lhs_data1[(d1_16-1) + (d0_16-1) * 3] = tmp55;
	
	}
	Matrix * tmp56 = transposeM(a);
	a = tmp56;
	printM(a);
	int ndim17 = 2;
	int dim17[2] = {3,3};
	Matrix * tmp57 = zerosM(ndim17, dim17);
	b = tmp57;
	for (int i = 1; i <= 9; ++ i) {
		int d0_17 = i % 3;
		if (d0_17 == 0) {
			d0_17 = 3;
		}
		int d1_17 = (i - d0_17)/3 + 1;
		int tmp58 = i;
		lhs_data1[(d1_17-1) + (d0_17-1) * 3] = tmp58;
	
	}
	Matrix * tmp59 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_18 = i % 3;
		if (d0_18 == 0) {
			d0_18 = 3;
		}
		int d1_18 = (i - d0_18)/3 + 1;
		complex tmp62 = i + 0.5*I;
		lhs_data1[(d1_18-1) + (d0_18-1) * 3] = tmp62;
	
	}
	Matrix * tmp63 = transposeM(a);
	a = tmp63;
	printM(a);
	int ndim19 = 2;
	int dim19[2] = {3,3};
	Matrix * tmp64 = zerosM(ndim19, dim19);
	b = tmp64;
	for (int i = 1; i <= 9; ++ i) {
		int d0_19 = i % 3;
		if (d0_19 == 0) {
			d0_19 = 3;
		}
		int d1_19 = (i - d0_19)/3 + 1;
		double tmp65 = (i + 0.4);
		lhs_data1[(d1_19-1) + (d0_19-1) * 3] = tmp65;
	
	}
	Matrix * tmp66 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_20 = i % 3;
		if (d0_20 == 0) {
			d0_20 = 3;
		}
		int d1_20 = (i - d0_20)/3 + 1;
		complex tmp69 = i + 0.4*I;
		lhs_data1[(d1_20-1) + (d0_20-1) * 3] = tmp69;
	
	}
	Matrix * tmp70 = transposeM(a);
	a = tmp70;
	printM(a);
	int ndim21 = 2;
	int dim21[2] = {3,3};
	Matrix * tmp71 = zerosM(ndim21, dim21);
	b = tmp71;
	for (int i = 1; i <= 9; ++ i) {
		int d0_21 = i % 3;
		if (d0_21 == 0) {
			d0_21 = 3;
		}
		int d1_21 = (i - d0_21)/3 + 1;
		complex tmp72 = i + 0.4*I;
		lhs_data1[(d1_21-1) + (d0_21-1) * 3] = tmp72;
	
	}
	Matrix * tmp73 = transposeM(b);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_22 = i % 3;
		if (d0_22 == 0) {
			d0_22 = 3;
		}
		int d1_22 = (i - d0_22)/3 + 1;
		int tmp76 = INT_MAX;
		lhs_data1[(d1_22-1) + (d0_22-1) * 3] = tmp76;
	
	}
	Matrix * tmp77 = transposeM(a);
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
