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
	// i_zero
	Matrix * tmp1= identityM(3);
	Matrix * a= tmp1;
	printM(a);
	int exponent1= 0;
	Matrix * tmp2= mpowerM(a, &exponent1, 0);
	printM(tmp2);
	// d_zero
	int ndim1= 2;
	int dim1[2]= {3, 3};
	Matrix * tmp3= zerosM(ndim1, dim1);
	a = tmp3;
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int d0_1 = iter1 % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (iter1 - d0_1)/3 + 1;
		int tmp4= iter1 * iter1;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp4;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim1; iter2++)
	{
		size1 *= dim1[iter2];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp5= transposeM(mat1);
	a = tmp5;
	printM(a);
	int exponent2= 0;
	Matrix * tmp6= mpowerM(a, &exponent2, 0);
	printM(tmp6);
	// c_zero
	int ndim2= 2;
	int dim2[2]= {3, 3};
	Matrix * tmp7= zerosM(ndim2, dim2);
	a = tmp7;
	complex* lhs_data2 = c_to_c(a);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int d0_2 = iter3 % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (iter3 - d0_2)/3 + 1;
		complex tmp8= iter3 * iter3 + 0.5*I;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp8;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim2; iter4++)
	{
		size2 *= dim2[iter4];
	}
	Matrix *mat2 = createM(ndim2, dim2, 2);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp9= transposeM(mat2);
	a = tmp9;
	printM(a);
	int exponent3= 0;
	Matrix * tmp10= mpowerM(a, &exponent3, 2);
	printM(tmp10);
	// i_one
	Matrix * tmp11= identityM(3);
	a = tmp11;
	printM(a);
	int exponent4= 1;
	Matrix * tmp12= mpowerM(a, &exponent4, 0);
	printM(tmp12);
	// d_one
	int ndim3= 2;
	int dim3[2]= {3, 3};
	Matrix * tmp13= zerosM(ndim3, dim3);
	a = tmp13;
	int* lhs_data3 = i_to_i(a);
	for (int iter5 = 1; iter5 <= 9; ++ iter5) {
		int d0_3 = iter5 % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (iter5 - d0_3)/3 + 1;
		int tmp14= iter5 * iter5;
		lhs_data3[(d1_3-1) + (d0_3-1) * 3] = tmp14;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim3; iter6++)
	{
		size3 *= dim3[iter6];
	}
	Matrix *mat3 = createM(ndim3, dim3, 0);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp15= transposeM(mat3);
	a = tmp15;
	printM(a);
	int exponent5= 1;
	Matrix * tmp16= mpowerM(a, &exponent5, 0);
	printM(tmp16);
	// c_one
	int ndim4= 2;
	int dim4[2]= {3, 3};
	Matrix * tmp17= zerosM(ndim4, dim4);
	a = tmp17;
	complex* lhs_data4 = c_to_c(a);
	for (int iter7 = 1; iter7 <= 9; ++ iter7) {
		int d0_4 = iter7 % 3;
		if (d0_4 == 0) {
			d0_4 = 3;
		}
		int d1_4 = (iter7 - d0_4)/3 + 1;
		complex tmp18= iter7 * iter7 + 0.5*I;
		lhs_data4[(d1_4-1) + (d0_4-1) * 3] = tmp18;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter8 = 0 ; iter8 < ndim4; iter8++)
	{
		size4 *= dim4[iter8];
	}
	Matrix *mat4 = createM(ndim4, dim4, 2);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp19= transposeM(mat4);
	a = tmp19;
	printM(a);
	int exponent6= 1;
	Matrix * tmp20= mpowerM(a, &exponent6, 2);
	printM(tmp20);
	// i_large
	int ndim5= 2;
	int dim5[2]= {3, 3};
	Matrix * tmp21= zerosM(ndim5, dim5);
	a = tmp21;
	int* lhs_data5 = i_to_i(a);
	for (int iter9 = 1; iter9 <= 9; ++ iter9) {
		int d0_5 = iter9 % 3;
		if (d0_5 == 0) {
			d0_5 = 3;
		}
		int d1_5 = (iter9 - d0_5)/3 + 1;
		int tmp22= iter9 * iter9;
		lhs_data5[(d1_5-1) + (d0_5-1) * 3] = tmp22;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter10 = 0 ; iter10 < ndim5; iter10++)
	{
		size5 *= dim5[iter10];
	}
	Matrix *mat5 = createM(ndim5, dim5, 0);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp23= transposeM(mat5);
	a = tmp23;
	printM(a);
	int exponent7= 20;
	Matrix * tmp24= mpowerM(a, &exponent7, 0);
	printM(tmp24);
	// i_negative
	int ndim6= 2;
	int dim6[2]= {3, 3};
	Matrix * tmp25= zerosM(ndim6, dim6);
	a = tmp25;
	int* lhs_data6 = i_to_i(a);
	for (int iter11 = 1; iter11 <= 9; ++ iter11) {
		int d0_6 = iter11 % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (iter11 - d0_6)/3 + 1;
		int tmp26= iter11 * iter11;
		lhs_data6[(d1_6-1) + (d0_6-1) * 3] = tmp26;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter12 = 0 ; iter12 < ndim6; iter12++)
	{
		size6 *= dim6[iter12];
	}
	Matrix *mat6 = createM(ndim6, dim6, 0);
	writeM(mat6, size6, lhs_data6);
	Matrix * tmp27= transposeM(mat6);
	a = tmp27;
	printM(a);
	int exponent8= -20;
	Matrix * tmp28= mpowerM(a, &exponent8, 0);
	Matrix * tmp29= floorM(tmp28);
	printM(tmp29);
	// d_small
	int ndim7= 2;
	int dim7[2]= {3, 3};
	Matrix * tmp30= zerosM(ndim7, dim7);
	a = tmp30;
	int* lhs_data7 = i_to_i(a);
	for (int iter13 = 1; iter13 <= 9; ++ iter13) {
		int d0_7 = iter13 % 3;
		if (d0_7 == 0) {
			d0_7 = 3;
		}
		int d1_7 = (iter13 - d0_7)/3 + 1;
		int tmp31= iter13 * iter13;
		lhs_data7[(d1_7-1) + (d0_7-1) * 3] = tmp31;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter14 = 0 ; iter14 < ndim7; iter14++)
	{
		size7 *= dim7[iter14];
	}
	Matrix *mat7 = createM(ndim7, dim7, 0);
	writeM(mat7, size7, lhs_data7);
	Matrix * tmp32= transposeM(mat7);
	a = tmp32;
	printM(a);
	double exponent9= 0.05;
	Matrix * tmp33= mpowerM(a, &exponent9, 1);
	printM(tmp33);
	// d_negative
	int ndim8= 2;
	int dim8[2]= {3, 3};
	Matrix * tmp34= zerosM(ndim8, dim8);
	a = tmp34;
	int* lhs_data8 = i_to_i(a);
	for (int iter15 = 1; iter15 <= 9; ++ iter15) {
		int tmp35= pow((-1), iter15);
		int d0_8 = iter15 % 3;
		if (d0_8 == 0) {
			d0_8 = 3;
		}
		int d1_8 = (iter15 - d0_8)/3 + 1;
		int tmp37= pow((-1), iter15);
		int tmp36= (tmp37) * iter15 * iter15;
		lhs_data8[(d1_8-1) + (d0_8-1) * 3] = tmp36;
	
	}
	// Write matrix mat8
	int size8 = 1;
	for (int iter16 = 0 ; iter16 < ndim8; iter16++)
	{
		size8 *= dim8[iter16];
	}
	Matrix *mat8 = createM(ndim8, dim8, 0);
	writeM(mat8, size8, lhs_data8);
	Matrix * tmp38= transposeM(mat8);
	a = tmp38;
	printM(a);
	double exponent10= -1.1;
	Matrix * tmp39= mpowerM(a, &exponent10, 1);
	printM(tmp39);
	// c_large
	int ndim9= 2;
	int dim9[2]= {3, 3};
	Matrix * tmp40= zerosM(ndim9, dim9);
	a = tmp40;
	complex* lhs_data9 = c_to_c(a);
	for (int iter17 = 1; iter17 <= 9; ++ iter17) {
		int d0_9 = iter17 % 3;
		if (d0_9 == 0) {
			d0_9 = 3;
		}
		int d1_9 = (iter17 - d0_9)/3 + 1;
		complex tmp41= iter17 * iter17 + 0.5*I;
		lhs_data9[(d1_9-1) + (d0_9-1) * 3] = tmp41;
	
	}
	// Write matrix mat9
	int size9 = 1;
	for (int iter18 = 0 ; iter18 < ndim9; iter18++)
	{
		size9 *= dim9[iter18];
	}
	Matrix *mat9 = createM(ndim9, dim9, 2);
	writeM(mat9, size9, lhs_data9);
	Matrix * tmp42= transposeM(mat9);
	a = tmp42;
	printM(a);
	complex exponent11= (-10 + 7.8*I);
	Matrix * tmp43= mpowerM(a, &exponent11, 2);
	printM(tmp43);
	// c_small
	int ndim10= 2;
	int dim10[2]= {3, 3};
	Matrix * tmp44= zerosM(ndim10, dim10);
	a = tmp44;
	complex* lhs_data10 = c_to_c(a);
	for (int iter19 = 1; iter19 <= 9; ++ iter19) {
		int d0_10 = iter19 % 3;
		if (d0_10 == 0) {
			d0_10 = 3;
		}
		int d1_10 = (iter19 - d0_10)/3 + 1;
		complex tmp45= iter19 * iter19 + 0.5*I;
		lhs_data10[(d1_10-1) + (d0_10-1) * 3] = tmp45;
	
	}
	// Write matrix mat10
	int size10 = 1;
	for (int iter20 = 0 ; iter20 < ndim10; iter20++)
	{
		size10 *= dim10[iter20];
	}
	Matrix *mat10 = createM(ndim10, dim10, 2);
	writeM(mat10, size10, lhs_data10);
	Matrix * tmp46= transposeM(mat10);
	a = tmp46;
	printM(a);
	complex exponent12= (-0.8*I);
	Matrix * tmp47= mpowerM(a, &exponent12, 2);
	printM(tmp47);
	// brutal_test
	
	Matrix **matrices = NULL;
	matrices = malloc(11*sizeof(*matrices));
		        
	int ndim11= 2;
	int dim11[2]= {3,3};
	Matrix * tmp48= zerosM(ndim11, dim11);
	matrices[0] = tmp48;
	int ndim12= 2;
	int dim12[2]= {3,3};
	Matrix * tmp49= onesM(ndim12, dim12);
	matrices[1] = tmp49;
	Matrix * tmp50= identityM(3);
	matrices[2] = tmp50;
	Matrix * tmp51= identityM(3);
	complex scalar1= (4.2 - 0.03*I);
	Matrix * tmp52= scaleM(tmp51, &scalar1, 2);
	matrices[3] = tmp52;
	int ndim13= 2;
	int dim13[2]= {3,3};
	Matrix * tmp53= zerosM(ndim13, dim13);
	matrices[4] = tmp53;
	int* lhs_data11 = i_to_i(matrices[4]);
	for (int iter21 = 1; iter21 <= 9; ++ iter21) {
		int d0_16 = iter21 % 1;
		if (d0_16 == 0) {
			d0_16 = 1;
		}
		int d1_16 = (iter21 - d0_16)/1 + 1;
		int tmp54= iter21 * iter21;
		lhs_data11[(d1_16-1) + (d0_16-1) ] = tmp54;
	
	}
	// Write matrix mat11
	int size11 = 1;
	for (int iter22 = 0 ; iter22 < ndim13; iter22++)
	{
		size11 *= dim13[iter22];
	}
	Matrix *mat11 = createM(ndim13, dim13, 0);
	writeM(mat11, size11, lhs_data11);
	Matrix * tmp55= transposeM(matrices[4]);
	matrices[4] = tmp55;
	int ndim14= 2;
	int dim14[2]= {3,3};
	Matrix * tmp56= zerosM(ndim14, dim14);
	matrices[5] = tmp56;
	double* lhs_data12 = i_to_d(matrices[5]);
	for (int iter23 = 1; iter23 <= 9; ++ iter23) {
		int d0_21 = iter23 % 1;
		if (d0_21 == 0) {
			d0_21 = 1;
		}
		int d1_21 = (iter23 - d0_21)/1 + 1;
		double tmp57= iter23 * iter23 + 0.5;
		lhs_data12[(d1_21-1) + (d0_21-1) ] = tmp57;
	
	}
	// Write matrix mat12
	int size12 = 1;
	for (int iter24 = 0 ; iter24 < ndim14; iter24++)
	{
		size12 *= dim14[iter24];
	}
	Matrix *mat12 = createM(ndim14, dim14, 1);
	writeM(mat12, size12, lhs_data12);
	Matrix * tmp58= transposeM(matrices[5]);
	matrices[5] = tmp58;
	int ndim15= 2;
	int dim15[2]= {3,3};
	Matrix * tmp59= zerosM(ndim15, dim15);
	matrices[6] = tmp59;
	complex* lhs_data13 = i_to_c(matrices[6]);
	for (int iter25 = 1; iter25 <= 9; ++ iter25) {
		int d0_26 = iter25 % 1;
		if (d0_26 == 0) {
			d0_26 = 1;
		}
		int d1_26 = (iter25 - d0_26)/1 + 1;
		complex tmp60= iter25 * iter25 + 0.5*I;
		lhs_data13[(d1_26-1) + (d0_26-1) ] = tmp60;
	
	}
	// Write matrix mat13
	int size13 = 1;
	for (int iter26 = 0 ; iter26 < ndim15; iter26++)
	{
		size13 *= dim15[iter26];
	}
	Matrix *mat13 = createM(ndim15, dim15, 2);
	writeM(mat13, size13, lhs_data13);
	Matrix * tmp61= transposeM(matrices[6]);
	matrices[6] = tmp61;
	int ndim16= 2;
	int dim16[2]= {3,3};
	Matrix * tmp62= zerosM(ndim16, dim16);
	matrices[7] = tmp62;
	int* lhs_data14 = i_to_i(matrices[7]);
	for (int iter27 = 1; iter27 <= 9; ++ iter27) {
		int d0_31 = iter27 % 1;
		if (d0_31 == 0) {
			d0_31 = 1;
		}
		int d1_31 = (iter27 - d0_31)/1 + 1;
		int tmp63= (iter27 - 5) * iter27;
		lhs_data14[(d1_31-1) + (d0_31-1) ] = tmp63;
	
	}
	// Write matrix mat14
	int size14 = 1;
	for (int iter28 = 0 ; iter28 < ndim16; iter28++)
	{
		size14 *= dim16[iter28];
	}
	Matrix *mat14 = createM(ndim16, dim16, 0);
	writeM(mat14, size14, lhs_data14);
	Matrix * tmp64= transposeM(matrices[7]);
	matrices[7] = tmp64;
	int ndim17= 2;
	int dim17[2]= {3,3};
	Matrix * tmp65= zerosM(ndim17, dim17);
	matrices[8] = tmp65;
	double* lhs_data15 = i_to_d(matrices[8]);
	for (int iter29 = 1; iter29 <= 9; ++ iter29) {
		int d0_36 = iter29 % 1;
		if (d0_36 == 0) {
			d0_36 = 1;
		}
		int d1_36 = (iter29 - d0_36)/1 + 1;
		double tmp66= (iter29 - 8.2) * iter29 + 0.5;
		lhs_data15[(d1_36-1) + (d0_36-1) ] = tmp66;
	
	}
	// Write matrix mat15
	int size15 = 1;
	for (int iter30 = 0 ; iter30 < ndim17; iter30++)
	{
		size15 *= dim17[iter30];
	}
	Matrix *mat15 = createM(ndim17, dim17, 1);
	writeM(mat15, size15, lhs_data15);
	Matrix * tmp67= transposeM(matrices[8]);
	matrices[8] = tmp67;
	int ndim18= 2;
	int dim18[2]= {3,3};
	Matrix * tmp68= zerosM(ndim18, dim18);
	matrices[9] = tmp68;
	complex* lhs_data16 = i_to_c(matrices[9]);
	for (int iter31 = 1; iter31 <= 9; ++ iter31) {
		int d0_41 = iter31 % 1;
		if (d0_41 == 0) {
			d0_41 = 1;
		}
		int d1_41 = (iter31 - d0_41)/1 + 1;
		complex tmp69= (iter31 - 5.89) * (iter31) + ((0.5) * (4 - iter31)) * 1*I;
		lhs_data16[(d1_41-1) + (d0_41-1) ] = tmp69;
	
	}
	// Write matrix mat16
	int size16 = 1;
	for (int iter32 = 0 ; iter32 < ndim18; iter32++)
	{
		size16 *= dim18[iter32];
	}
	Matrix *mat16 = createM(ndim18, dim18, 2);
	writeM(mat16, size16, lhs_data16);
	Matrix * tmp70= transposeM(matrices[9]);
	matrices[9] = tmp70;
	
	int ndim19 = 2;
	int dim19[2] = {3,3};
	matrices[10] = createM(ndim19, dim19, 0);
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
	
	
	int ndim20 = 2;
	int dim20[2] = {3,3};
	matrices[1] = createM(ndim20, dim20, 1);
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
	writeM( matrices[1], 9, input2);
	free(input2);
	
	for (int iter33 = 3; iter33 <= 12; ++ iter33) {
		printf("\n%s\n", "Original\n");
		int d0_47 = iter33 % 11;
		if (d0_47 == 0) {
			d0_47 = 11;
		}
		int d1_47 = (iter33 - d0_47)/11 + 1;
		printM(matrices[(d1_47-1) + (d0_47-1) ]);
		printf("\n%s\n", "Integer exponents\n");
		for (int iter34 = -4; iter34 <= 4; ++ iter34) {
			int d0_48 = iter33 % 11;
			if (d0_48 == 0) {
				d0_48 = 11;
			}
			int d1_48 = (iter33 - d0_48)/11 + 1;
			Matrix * tmp71= mpowerM(matrices[(d1_48-1) + (d0_48-1) ], &iter34, 0);
			printM(tmp71);
		
		}
		printf("\n%s\n", "Double exponents\n");
		for (int iter35 = -3; iter35 <= 1.9; iter35 += 0.2) {
			printf("\n%s\n", "Exponent: %.4f\n", iter35);
			int d0_49 = iter33 % 11;
			if (d0_49 == 0) {
				d0_49 = 11;
			}
			int d1_49 = (iter33 - d0_49)/11 + 1;
			Matrix * tmp72= mpowerM(matrices[(d1_49-1) + (d0_49-1) ], &iter35, 0);
			printM(tmp72);
		
		}
		printf("\n%s\n", "Complex exponents\n");
		for (int iter36 = -3; iter36 <= 3; iter36 += 0.2) {
			for (int iter37 = -3; iter37 <= 3; iter37 += 0.2) {
				if (iter37 == 0) {
					
				
				}
				printf("\n%s\n", "Exponent: %.4f + %.4fi\n", iter36, iter37);
				int d0_50 = iter33 % 11;
				if (d0_50 == 0) {
					d0_50 = 11;
				}
				int d1_50 = (iter33 - d0_50)/11 + 1;
				complex exponent13= (iter36 + iter37 * 1*I);
				Matrix * tmp73= mpowerM(matrices[(d1_50-1) + (d0_50-1) ], &exponent13, 2);
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
