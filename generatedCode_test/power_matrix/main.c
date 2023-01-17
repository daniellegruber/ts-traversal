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
	Matrix * a= identityM(3);
	printM(a);
	Matrix * tmp1= mpowerM(a, 0);
	printM(tmp1);
	// d_zero
	int ndim1= 2;
	int dim1[2]= {3, 3};
	a = zerosM(ndim1, dim1);
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int d0_1 = iter1 % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (iter1 - d0_1)/3 + 1;
		int tmp2= iter1 * iter1;
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
	Matrix * tmp4= mpowerM(a, 0);
	printM(tmp4);
	// c_zero
	int ndim2= 2;
	int dim2[2]= {3, 3};
	a = zerosM(ndim2, dim2);
	complex* lhs_data2 = i_to_c(a);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int d0_2 = iter3 % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (iter3 - d0_2)/3 + 1;
		complex tmp5= iter3 * iter3 + 0.5*I;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp5;
	
	}
	mat1 = mat1;
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim2; iter4++)
	{
		size2 *= dim2[iter4];
	}
	Matrix *mat2 = createM(ndim2, dim2, 2);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp6= transposeM(mat2);
	a = tmp6;
	printM(a);
	Matrix * tmp7= mpowerM(a, 0);
	printM(tmp7);
	// i_one
	Matrix * a= identityM(3);
	printM(a);
	Matrix * tmp8= mpowerM(a, 1);
	printM(tmp8);
	// d_one
	int ndim3= 2;
	int dim3[2]= {3, 3};
	a = zerosM(ndim3, dim3);
	int* lhs_data3 = i_to_i(a);
	for (int iter5 = 1; iter5 <= 9; ++ iter5) {
		int d0_3 = iter5 % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (iter5 - d0_3)/3 + 1;
		int tmp9= iter5 * iter5;
		lhs_data3[(d1_3-1) + (d0_3-1) * 3] = tmp9;
	
	}
	mat2 = mat2;
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim3; iter6++)
	{
		size3 *= dim3[iter6];
	}
	Matrix *mat3 = createM(ndim3, dim3, 0);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp10= transposeM(mat3);
	a = tmp10;
	printM(a);
	Matrix * tmp11= mpowerM(a, 1);
	printM(tmp11);
	// c_one
	int ndim4= 2;
	int dim4[2]= {3, 3};
	a = zerosM(ndim4, dim4);
	complex* lhs_data4 = i_to_c(a);
	for (int iter7 = 1; iter7 <= 9; ++ iter7) {
		int d0_4 = iter7 % 3;
		if (d0_4 == 0) {
			d0_4 = 3;
		}
		int d1_4 = (iter7 - d0_4)/3 + 1;
		complex tmp12= iter7 * iter7 + 0.5*I;
		lhs_data4[(d1_4-1) + (d0_4-1) * 3] = tmp12;
	
	}
	mat3 = mat3;
	// Write matrix mat4
	int size4 = 1;
	for (int iter8 = 0 ; iter8 < ndim4; iter8++)
	{
		size4 *= dim4[iter8];
	}
	Matrix *mat4 = createM(ndim4, dim4, 2);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp13= transposeM(mat4);
	a = tmp13;
	printM(a);
	Matrix * tmp14= mpowerM(a, 1);
	printM(tmp14);
	// i_large
	int ndim5= 2;
	int dim5[2]= {3, 3};
	a = zerosM(ndim5, dim5);
	int* lhs_data5 = i_to_i(a);
	for (int iter9 = 1; iter9 <= 9; ++ iter9) {
		int d0_5 = iter9 % 3;
		if (d0_5 == 0) {
			d0_5 = 3;
		}
		int d1_5 = (iter9 - d0_5)/3 + 1;
		int tmp15= iter9 * iter9;
		lhs_data5[(d1_5-1) + (d0_5-1) * 3] = tmp15;
	
	}
	mat4 = mat4;
	// Write matrix mat5
	int size5 = 1;
	for (int iter10 = 0 ; iter10 < ndim5; iter10++)
	{
		size5 *= dim5[iter10];
	}
	Matrix *mat5 = createM(ndim5, dim5, 0);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp16= transposeM(mat5);
	a = tmp16;
	printM(a);
	Matrix * tmp17= mpowerM(a, 20);
	printM(tmp17);
	// i_negative
	int ndim6= 2;
	int dim6[2]= {3, 3};
	a = zerosM(ndim6, dim6);
	int* lhs_data6 = i_to_i(a);
	for (int iter11 = 1; iter11 <= 9; ++ iter11) {
		int d0_6 = iter11 % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (iter11 - d0_6)/3 + 1;
		int tmp18= iter11 * iter11;
		lhs_data6[(d1_6-1) + (d0_6-1) * 3] = tmp18;
	
	}
	mat5 = mat5;
	// Write matrix mat6
	int size6 = 1;
	for (int iter12 = 0 ; iter12 < ndim6; iter12++)
	{
		size6 *= dim6[iter12];
	}
	Matrix *mat6 = createM(ndim6, dim6, 0);
	writeM(mat6, size6, lhs_data6);
	Matrix * tmp19= transposeM(mat6);
	a = tmp19;
	printM(a);
	Matrix * tmp20= mpowerM(a, -20);
	Matrix * tmp21= floorM(tmp20);
	printM(tmp21);
	// d_small
	int ndim7= 2;
	int dim7[2]= {3, 3};
	a = zerosM(ndim7, dim7);
	int* lhs_data7 = i_to_i(a);
	for (int iter13 = 1; iter13 <= 9; ++ iter13) {
		int d0_7 = iter13 % 3;
		if (d0_7 == 0) {
			d0_7 = 3;
		}
		int d1_7 = (iter13 - d0_7)/3 + 1;
		int tmp22= iter13 * iter13;
		lhs_data7[(d1_7-1) + (d0_7-1) * 3] = tmp22;
	
	}
	mat6 = mat6;
	// Write matrix mat7
	int size7 = 1;
	for (int iter14 = 0 ; iter14 < ndim7; iter14++)
	{
		size7 *= dim7[iter14];
	}
	Matrix *mat7 = createM(ndim7, dim7, 0);
	writeM(mat7, size7, lhs_data7);
	Matrix * tmp23= transposeM(mat7);
	a = tmp23;
	printM(a);
	Matrix * tmp24= mpowerM(a, 0.05);
	printM(tmp24);
	// d_negative
	int ndim8= 2;
	int dim8[2]= {3, 3};
	a = zerosM(ndim8, dim8);
	int* lhs_data8 = i_to_i(a);
	for (int iter15 = 1; iter15 <= 9; ++ iter15) {
		int tmp25= pow((-1), iter15);
		int d0_8 = iter15 % 3;
		if (d0_8 == 0) {
			d0_8 = 3;
		}
		int d1_8 = (iter15 - d0_8)/3 + 1;
		int tmp27= pow((-1), iter15);
		int tmp26= (tmp27) * iter15 * iter15;
		lhs_data8[(d1_8-1) + (d0_8-1) * 3] = tmp26;
	
	}
	mat7 = mat7;
	// Write matrix mat8
	int size8 = 1;
	for (int iter16 = 0 ; iter16 < ndim8; iter16++)
	{
		size8 *= dim8[iter16];
	}
	Matrix *mat8 = createM(ndim8, dim8, 0);
	writeM(mat8, size8, lhs_data8);
	Matrix * tmp28= transposeM(mat8);
	a = tmp28;
	printM(a);
	Matrix * tmp29= mpowerM(a, -1.1);
	printM(tmp29);
	// c_large
	int ndim9= 2;
	int dim9[2]= {3, 3};
	a = zerosM(ndim9, dim9);
	complex* lhs_data9 = i_to_c(a);
	for (int iter17 = 1; iter17 <= 9; ++ iter17) {
		int d0_9 = iter17 % 3;
		if (d0_9 == 0) {
			d0_9 = 3;
		}
		int d1_9 = (iter17 - d0_9)/3 + 1;
		complex tmp30= iter17 * iter17 + 0.5*I;
		lhs_data9[(d1_9-1) + (d0_9-1) * 3] = tmp30;
	
	}
	mat8 = mat8;
	// Write matrix mat9
	int size9 = 1;
	for (int iter18 = 0 ; iter18 < ndim9; iter18++)
	{
		size9 *= dim9[iter18];
	}
	Matrix *mat9 = createM(ndim9, dim9, 2);
	writeM(mat9, size9, lhs_data9);
	Matrix * tmp31= transposeM(mat9);
	a = tmp31;
	printM(a);
	Matrix * tmp32= mpowerM(a, (-10 + 7.8*I));
	printM(tmp32);
	// c_small
	int ndim10= 2;
	int dim10[2]= {3, 3};
	a = zerosM(ndim10, dim10);
	complex* lhs_data10 = i_to_c(a);
	for (int iter19 = 1; iter19 <= 9; ++ iter19) {
		int d0_10 = iter19 % 3;
		if (d0_10 == 0) {
			d0_10 = 3;
		}
		int d1_10 = (iter19 - d0_10)/3 + 1;
		complex tmp33= iter19 * iter19 + 0.5*I;
		lhs_data10[(d1_10-1) + (d0_10-1) * 3] = tmp33;
	
	}
	mat9 = mat9;
	// Write matrix mat10
	int size10 = 1;
	for (int iter20 = 0 ; iter20 < ndim10; iter20++)
	{
		size10 *= dim10[iter20];
	}
	Matrix *mat10 = createM(ndim10, dim10, 2);
	writeM(mat10, size10, lhs_data10);
	Matrix * tmp34= transposeM(mat10);
	a = tmp34;
	printM(a);
	Matrix * tmp35= mpowerM(a, (-0.8*I));
	printM(tmp35);
	// brutal_test
	
	Matrix **matrices = NULL;
	matrices = malloc(11*sizeof(*matrices));
		        
	int ndim11= 2;
	int dim11[2]= {3,3};
	matrices[0] = zerosM(ndim11, dim11);
	int ndim12= 2;
	int dim12[2]= {3,3};
	matrices[1] = onesM(ndim12, dim12);
	matrices[2] = identityM(3);
	complex scalar1= (4.2 - 0.03*I);
	Matrix * tmp36= scaleM(identityM(3), &scalar1, 2);
	matrices[3] = tmp36;
	int ndim13= 2;
	int dim13[2]= {3,3};
	matrices[4] = zerosM(ndim13, dim13);
	int* lhs_data11 = i_to_i(matrices[4]);
	for (int iter21 = 1; iter21 <= 9; ++ iter21) {
		int d0_16 = iter21 % 1;
		if (d0_16 == 0) {
			d0_16 = 1;
		}
		int d1_16 = (iter21 - d0_16)/1 + 1;
		int tmp37= iter21 * iter21;
		lhs_data11[(d1_16-1) + (d0_16-1)] = tmp37;
	
	}
	// Write matrix mat11
	int size11 = 1;
	for (int iter22 = 0 ; iter22 < ndim13; iter22++)
	{
		size11 *= dim13[iter22];
	}
	Matrix *mat11 = createM(ndim13, dim13, 0);
	writeM(mat11, size11, lhs_data11);
	matrices[4] = mat11;
	Matrix * tmp38= transposeM(matrices[4]);
	matrices[4] = tmp38;
	int ndim14= 2;
	int dim14[2]= {3,3};
	matrices[5] = zerosM(ndim14, dim14);
	double* lhs_data12 = i_to_d(matrices[5]);
	for (int iter23 = 1; iter23 <= 9; ++ iter23) {
		int d0_22 = iter23 % 1;
		if (d0_22 == 0) {
			d0_22 = 1;
		}
		int d1_22 = (iter23 - d0_22)/1 + 1;
		double tmp39= iter23 * iter23 + 0.5;
		lhs_data12[(d1_22-1) + (d0_22-1)] = tmp39;
	
	}
	// Write matrix mat12
	int size12 = 1;
	for (int iter24 = 0 ; iter24 < ndim14; iter24++)
	{
		size12 *= dim14[iter24];
	}
	Matrix *mat12 = createM(ndim14, dim14, 1);
	writeM(mat12, size12, lhs_data12);
	matrices[5] = mat12;
	Matrix * tmp40= transposeM(matrices[5]);
	matrices[5] = tmp40;
	int ndim15= 2;
	int dim15[2]= {3,3};
	matrices[6] = zerosM(ndim15, dim15);
	complex* lhs_data13 = i_to_c(matrices[6]);
	for (int iter25 = 1; iter25 <= 9; ++ iter25) {
		int d0_28 = iter25 % 1;
		if (d0_28 == 0) {
			d0_28 = 1;
		}
		int d1_28 = (iter25 - d0_28)/1 + 1;
		complex tmp41= iter25 * iter25 + 0.5*I;
		lhs_data13[(d1_28-1) + (d0_28-1)] = tmp41;
	
	}
	// Write matrix mat13
	int size13 = 1;
	for (int iter26 = 0 ; iter26 < ndim15; iter26++)
	{
		size13 *= dim15[iter26];
	}
	Matrix *mat13 = createM(ndim15, dim15, 2);
	writeM(mat13, size13, lhs_data13);
	matrices[6] = mat13;
	Matrix * tmp42= transposeM(matrices[6]);
	matrices[6] = tmp42;
	int ndim16= 2;
	int dim16[2]= {3,3};
	matrices[7] = zerosM(ndim16, dim16);
	int* lhs_data14 = i_to_i(matrices[7]);
	for (int iter27 = 1; iter27 <= 9; ++ iter27) {
		int d0_34 = iter27 % 1;
		if (d0_34 == 0) {
			d0_34 = 1;
		}
		int d1_34 = (iter27 - d0_34)/1 + 1;
		int tmp43= (iter27 - 5) * iter27;
		lhs_data14[(d1_34-1) + (d0_34-1)] = tmp43;
	
	}
	// Write matrix mat14
	int size14 = 1;
	for (int iter28 = 0 ; iter28 < ndim16; iter28++)
	{
		size14 *= dim16[iter28];
	}
	Matrix *mat14 = createM(ndim16, dim16, 0);
	writeM(mat14, size14, lhs_data14);
	matrices[7] = mat14;
	Matrix * tmp44= transposeM(matrices[7]);
	matrices[7] = tmp44;
	int ndim17= 2;
	int dim17[2]= {3,3};
	matrices[8] = zerosM(ndim17, dim17);
	double* lhs_data15 = i_to_d(matrices[8]);
	for (int iter29 = 1; iter29 <= 9; ++ iter29) {
		int d0_40 = iter29 % 1;
		if (d0_40 == 0) {
			d0_40 = 1;
		}
		int d1_40 = (iter29 - d0_40)/1 + 1;
		double tmp45= (iter29 - 8.2) * iter29 + 0.5;
		lhs_data15[(d1_40-1) + (d0_40-1)] = tmp45;
	
	}
	// Write matrix mat15
	int size15 = 1;
	for (int iter30 = 0 ; iter30 < ndim17; iter30++)
	{
		size15 *= dim17[iter30];
	}
	Matrix *mat15 = createM(ndim17, dim17, 1);
	writeM(mat15, size15, lhs_data15);
	matrices[8] = mat15;
	Matrix * tmp46= transposeM(matrices[8]);
	matrices[8] = tmp46;
	int ndim18= 2;
	int dim18[2]= {3,3};
	matrices[9] = zerosM(ndim18, dim18);
	complex* lhs_data16 = i_to_c(matrices[9]);
	for (int iter31 = 1; iter31 <= 9; ++ iter31) {
		int d0_46 = iter31 % 1;
		if (d0_46 == 0) {
			d0_46 = 1;
		}
		int d1_46 = (iter31 - d0_46)/1 + 1;
		complex tmp47= (iter31 - 5.89) * (iter31) + ((0.5) * (4 - iter31)) * 1*I;
		lhs_data16[(d1_46-1) + (d0_46-1)] = tmp47;
	
	}
	// Write matrix mat16
	int size16 = 1;
	for (int iter32 = 0 ; iter32 < ndim18; iter32++)
	{
		size16 *= dim18[iter32];
	}
	Matrix *mat16 = createM(ndim18, dim18, 2);
	writeM(mat16, size16, lhs_data16);
	matrices[9] = mat16;
	Matrix * tmp48= transposeM(matrices[9]);
	matrices[9] = tmp48;
	
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
		printf("\n%s\n", 'Original\n');
		int d0_53 = iter33 % 11;
		if (d0_53 == 0) {
			d0_53 = 11;
		}
		int d1_53 = (iter33 - d0_53)/11 + 1;
		printM(matrices[(d1_53-1) + (d0_53-1)]);
		printf("\n%s\n", 'Integer exponents\n');
		for (int iter34 = -4; iter34 <= 4; ++ iter34) {
			int d0_54 = iter33 % 11;
			if (d0_54 == 0) {
				d0_54 = 11;
			}
			int d1_54 = (iter33 - d0_54)/11 + 1;
			Matrix * tmp49= mpowerM(matrices[(d1_54-1) + (d0_54-1)], iter31);
			printM(tmp49);
		
		}
		printf("\n%s\n", 'Double exponents\n');
		for (int iter35 = -3; iter35 <= 1.9; iter35 += 0.2) {
			printf("\n%s\n", 'Exponent: %.4f\n');
			int d0_55 = iter33 % 11;
			if (d0_55 == 0) {
				d0_55 = 11;
			}
			int d1_55 = (iter33 - d0_55)/11 + 1;
			Matrix * tmp50= mpowerM(matrices[(d1_55-1) + (d0_55-1)], iter31);
			printM(tmp50);
		
		}
		printf("\n%s\n", 'Complex exponents\n');
		for (int iter36 = -3; iter36 <= 3; iter36 += 0.2) {
			for (int iter37 = -3; iter37 <= 3; iter37 += 0.2) {
				if (iter37 == 0) {
					
				
				}
				printf("\n%s\n", 'Exponent: %.4f + %.4fi\n');
				int d0_56 = iter33 % 11;
				if (d0_56 == 0) {
					d0_56 = 11;
				}
				int d1_56 = (iter33 - d0_56)/11 + 1;
				Matrix * tmp51= mpowerM(matrices[(d1_56-1) + (d0_56-1)], (iter31 + ji));
				printf("\n%d\n", tmp51);
			
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
