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
		int d0_1 = i % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (i - d0_1)/3 + 1;
		int tmp4 = i * i;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp4;
	
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_2 = i % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (i - d0_2)/3 + 1;
		complex tmp8 = i * i + 0.5*I;
		lhs_data1[(d1_2-1) + (d0_2-1) * 3] = tmp8;
	
	}
	Matrix * tmp9 = transposeM(a);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_3 = i % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (i - d0_3)/3 + 1;
		int tmp14 = i * i;
		lhs_data1[(d1_3-1) + (d0_3-1) * 3] = tmp14;
	
	}
	Matrix * tmp15 = transposeM(a);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_4 = i % 3;
		if (d0_4 == 0) {
			d0_4 = 3;
		}
		int d1_4 = (i - d0_4)/3 + 1;
		complex tmp18 = i * i + 0.5*I;
		lhs_data1[(d1_4-1) + (d0_4-1) * 3] = tmp18;
	
	}
	Matrix * tmp19 = transposeM(a);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_5 = i % 3;
		if (d0_5 == 0) {
			d0_5 = 3;
		}
		int d1_5 = (i - d0_5)/3 + 1;
		int tmp22 = i * i;
		lhs_data1[(d1_5-1) + (d0_5-1) * 3] = tmp22;
	
	}
	Matrix * tmp23 = transposeM(a);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_6 = i % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (i - d0_6)/3 + 1;
		int tmp26 = i * i;
		lhs_data1[(d1_6-1) + (d0_6-1) * 3] = tmp26;
	
	}
	Matrix * tmp27 = transposeM(a);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_7 = i % 3;
		if (d0_7 == 0) {
			d0_7 = 3;
		}
		int d1_7 = (i - d0_7)/3 + 1;
		int tmp31 = i * i;
		lhs_data1[(d1_7-1) + (d0_7-1) * 3] = tmp31;
	
	}
	Matrix * tmp32 = transposeM(a);
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
	for (int i = 1; i <= 9; ++ i) {
		int tmp35 = pow((-1), i);
		int d0_8 = i % 3;
		if (d0_8 == 0) {
			d0_8 = 3;
		}
		int d1_8 = (i - d0_8)/3 + 1;
		int tmp37 = pow((-1), i);
		int tmp36 = (tmp37) * i * i;
		lhs_data1[(d1_8-1) + (d0_8-1) * 3] = tmp36;
	
	}
	Matrix * tmp38 = transposeM(a);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_9 = i % 3;
		if (d0_9 == 0) {
			d0_9 = 3;
		}
		int d1_9 = (i - d0_9)/3 + 1;
		complex tmp41 = i * i + 0.5*I;
		lhs_data1[(d1_9-1) + (d0_9-1) * 3] = tmp41;
	
	}
	Matrix * tmp42 = transposeM(a);
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
	for (int i = 1; i <= 9; ++ i) {
		int d0_10 = i % 3;
		if (d0_10 == 0) {
			d0_10 = 3;
		}
		int d1_10 = (i - d0_10)/3 + 1;
		complex tmp45 = i * i + 0.5*I;
		lhs_data1[(d1_10-1) + (d0_10-1) * 3] = tmp45;
	
	}
	Matrix * tmp46 = transposeM(a);
	a = tmp46;
	printM(a);
	complex exponent12 = (-0.8*I);
	Matrix * tmp47 = mpowerM(a, &exponent12, 2);
	printM(tmp47);
	// brutal_test
	
	Matrix **matrices = NULL;
	matrices = malloc(11*sizeof(*matrices));
		        
	int ndim11 = 2;
	int dim11[2] = {3,3};
	Matrix * tmp48 = zerosM(ndim11, dim11);
	matrices[0] = tmp48;
	int ndim12 = 2;
	int dim12[2] = {3,3};
	Matrix * tmp49 = onesM(ndim12, dim12);
	matrices[1] = tmp49;
	Matrix * tmp50 = identityM(3);
	matrices[2] = tmp50;
	Matrix * tmp51 = identityM(3);
	complex scalar1 = (4.2 - 0.03*I);
	Matrix * tmp52 = scaleM(tmp51, &scalar1, 2);
	matrices[3] = tmp52;
	int ndim13 = 2;
	int dim13[2] = {3,3};
	Matrix * tmp53 = zerosM(ndim13, dim13);
	matrices[4] = tmp53;
	for (int i = 1; i <= 9; ++ i) {
		int d0_16 = i % 1;
		if (d0_16 == 0) {
			d0_16 = 1;
		}
		int d1_16 = (i - d0_16)/1 + 1;
		int tmp54 = i * i;
		lhs_data1[(d1_16-1) + (d0_16-1) ] = tmp54;
	
	}
	Matrix * tmp55 = transposeM(matrices[4]);
	matrices[4] = tmp55;
	int ndim14 = 2;
	int dim14[2] = {3,3};
	Matrix * tmp56 = zerosM(ndim14, dim14);
	matrices[5] = tmp56;
	for (int i = 1; i <= 9; ++ i) {
		int d0_20 = i % 1;
		if (d0_20 == 0) {
			d0_20 = 1;
		}
		int d1_20 = (i - d0_20)/1 + 1;
		double tmp57 = i * i + 0.5;
		lhs_data1[(d1_20-1) + (d0_20-1) ] = tmp57;
	
	}
	Matrix * tmp58 = transposeM(matrices[5]);
	matrices[5] = tmp58;
	int ndim15 = 2;
	int dim15[2] = {3,3};
	Matrix * tmp59 = zerosM(ndim15, dim15);
	matrices[6] = tmp59;
	for (int i = 1; i <= 9; ++ i) {
		int d0_24 = i % 1;
		if (d0_24 == 0) {
			d0_24 = 1;
		}
		int d1_24 = (i - d0_24)/1 + 1;
		complex tmp60 = i * i + 0.5*I;
		lhs_data1[(d1_24-1) + (d0_24-1) ] = tmp60;
	
	}
	Matrix * tmp61 = transposeM(matrices[6]);
	matrices[6] = tmp61;
	int ndim16 = 2;
	int dim16[2] = {3,3};
	Matrix * tmp62 = zerosM(ndim16, dim16);
	matrices[7] = tmp62;
	for (int i = 1; i <= 9; ++ i) {
		int d0_28 = i % 1;
		if (d0_28 == 0) {
			d0_28 = 1;
		}
		int d1_28 = (i - d0_28)/1 + 1;
		int tmp63 = (i - 5) * i;
		lhs_data1[(d1_28-1) + (d0_28-1) ] = tmp63;
	
	}
	Matrix * tmp64 = transposeM(matrices[7]);
	matrices[7] = tmp64;
	int ndim17 = 2;
	int dim17[2] = {3,3};
	Matrix * tmp65 = zerosM(ndim17, dim17);
	matrices[8] = tmp65;
	for (int i = 1; i <= 9; ++ i) {
		int d0_32 = i % 1;
		if (d0_32 == 0) {
			d0_32 = 1;
		}
		int d1_32 = (i - d0_32)/1 + 1;
		double tmp66 = (i - 8.2) * i + 0.5;
		lhs_data1[(d1_32-1) + (d0_32-1) ] = tmp66;
	
	}
	Matrix * tmp67 = transposeM(matrices[8]);
	matrices[8] = tmp67;
	int ndim18 = 2;
	int dim18[2] = {3,3};
	Matrix * tmp68 = zerosM(ndim18, dim18);
	matrices[9] = tmp68;
	for (int i = 1; i <= 9; ++ i) {
		int d0_36 = i % 1;
		if (d0_36 == 0) {
			d0_36 = 1;
		}
		int d1_36 = (i - d0_36)/1 + 1;
		complex tmp69 = (i - 5.89) * (i) + ((0.5) * (4 - i)) * 1*I;
		lhs_data1[(d1_36-1) + (d0_36-1) ] = tmp69;
	
	}
	Matrix * tmp70 = transposeM(matrices[9]);
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
	
	for (int index = 3; index <= 12; ++ index) {
		printf("\n%s\n", "Original\n");
		int d0_41 = index % 11;
		if (d0_41 == 0) {
			d0_41 = 11;
		}
		int d1_41 = (index - d0_41)/11 + 1;
		printM(matrices[(d1_41-1) + (d0_41-1) ]);
		printf("\n%s\n", "Integer exponents\n");
		for (int i = -4; i <= 4; ++ i) {
			int d0_42 = index % 11;
			if (d0_42 == 0) {
				d0_42 = 11;
			}
			int d1_42 = (index - d0_42)/11 + 1;
			Matrix * tmp71 = mpowerM(matrices[(d1_42-1) + (d0_42-1) ], &i, 0);
			printM(tmp71);
		
		}
		printf("\n%s\n", "Double exponents\n");
		for (int i = -3; i <= 1.9; i += 0.2) {
			printf("\n%s\n", "Exponent: %.4f\n", i);
			int d0_43 = index % 11;
			if (d0_43 == 0) {
				d0_43 = 11;
			}
			int d1_43 = (index - d0_43)/11 + 1;
			Matrix * tmp72 = mpowerM(matrices[(d1_43-1) + (d0_43-1) ], &i, 0);
			printM(tmp72);
		
		}
		printf("\n%s\n", "Complex exponents\n");
		for (int i = -3; i <= 3; i += 0.2) {
			for (int j = -3; j <= 3; j += 0.2) {
				if (j == 0) {
					
				
				}
				printf("\n%s\n", "Exponent: %.4f + %.4fi\n", i, j);
				int d0_44 = index % 11;
				if (d0_44 == 0) {
					d0_44 = 11;
				}
				int d1_44 = (index - d0_44)/11 + 1;
				complex exponent13 = (i + j * 1*I);
				Matrix * tmp73 = mpowerM(matrices[(d1_44-1) + (d0_44-1) ], &exponent13, 2);
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
