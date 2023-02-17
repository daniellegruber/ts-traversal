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
	
	Matrix **matrices = NULL;
	matrices = malloc(12*sizeof(*matrices));
		        
	int ndim1= 2;
	int dim1[2]= {1, 10};
	Matrix * tmp1= zerosM(ndim1, dim1);
	matrices[0] = tmp1;
	int tmp2= 1;
	int* lhs_data1 = i_to_i(matrices[0]);
	lhs_data1[0] = tmp2;
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim1; iter1++)
	{
		size1 *= dim1[iter1];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	int ndim2= 2;
	int dim2[2]= {20, 1};
	Matrix * tmp3= onesM(ndim2, dim2);
	matrices[1] = tmp3;
	int ndim3= 2;
	int dim3[2]= {1, 10};
	Matrix * tmp4= onesM(ndim3, dim3);
	matrices[2] = tmp4;
	int ndim4= 2;
	int dim4[2]= {20, 1};
	Matrix * tmp5= onesM(ndim4, dim4);
	complex scalar1= (4.5 - 0.5*I);
	Matrix * tmp6= scaleM(tmp5, &scalar1, 2);
	matrices[3] = tmp6;
	int ndim5= 2;
	int dim5[2]= {1, 10};
	Matrix * tmp7= zerosM(ndim5, dim5);
	matrices[4] = tmp7;
	int* lhs_data2 = i_to_i(matrices[4]);
	for (int iter2 = 1; iter2 <= 10; ++ iter2) {
		int d0_8 = iter2 % 1;
		if (d0_8 == 0) {
			d0_8 = 1;
		}
		int d1_8 = (iter2 - d0_8)/1 + 1;
		int tmp8= iter2;
		lhs_data2[(d1_8-1) + (d0_8-1) ] = tmp8;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter3 = 0 ; iter3 < ndim5; iter3++)
	{
		size2 *= dim5[iter3];
	}
	Matrix *mat2 = createM(ndim5, dim5, 0);
	writeM(mat2, size2, lhs_data2);
	matrices[4] = matrices[4];
	int ndim6= 2;
	int dim6[2]= {1, 10};
	Matrix * tmp9= zerosM(ndim6, dim6);
	matrices[5] = tmp9;
	double* lhs_data3 = i_to_d(matrices[5]);
	for (int iter4 = 1; iter4 <= 10; ++ iter4) {
		int d0_13 = iter4 % 1;
		if (d0_13 == 0) {
			d0_13 = 1;
		}
		int d1_13 = (iter4 - d0_13)/1 + 1;
		double tmp10= iter4 * iter4 + 0.5;
		lhs_data3[(d1_13-1) + (d0_13-1) ] = tmp10;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter5 = 0 ; iter5 < ndim6; iter5++)
	{
		size3 *= dim6[iter5];
	}
	Matrix *mat3 = createM(ndim6, dim6, 1);
	writeM(mat3, size3, lhs_data3);
	matrices[5] = matrices[5];
	int ndim7= 2;
	int dim7[2]= {20, 1};
	Matrix * tmp11= onesM(ndim7, dim7);
	matrices[6] = tmp11;
	complex* lhs_data4 = i_to_c(matrices[6]);
	for (int iter6 = 1; iter6 <= 20; ++ iter6) {
		int d0_18 = iter6 % 1;
		if (d0_18 == 0) {
			d0_18 = 1;
		}
		int d1_18 = (iter6 - d0_18)/1 + 1;
		complex tmp12= iter6 * iter6 + 0.5*I;
		lhs_data4[(d1_18-1) + (d0_18-1) ] = tmp12;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter7 = 0 ; iter7 < ndim7; iter7++)
	{
		size4 *= dim7[iter7];
	}
	Matrix *mat4 = createM(ndim7, dim7, 2);
	writeM(mat4, size4, lhs_data4);
	matrices[6] = matrices[6];
	int ndim8= 2;
	int dim8[2]= {20, 1};
	Matrix * tmp13= onesM(ndim8, dim8);
	matrices[7] = tmp13;
	int* lhs_data5 = i_to_i(matrices[7]);
	for (int iter8 = 1; iter8 <= 20; ++ iter8) {
		int d0_23 = iter8 % 1;
		if (d0_23 == 0) {
			d0_23 = 1;
		}
		int d1_23 = (iter8 - d0_23)/1 + 1;
		int tmp14= (iter8 - 5) * iter8;
		lhs_data5[(d1_23-1) + (d0_23-1) ] = tmp14;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter9 = 0 ; iter9 < ndim8; iter9++)
	{
		size5 *= dim8[iter9];
	}
	Matrix *mat5 = createM(ndim8, dim8, 0);
	writeM(mat5, size5, lhs_data5);
	matrices[7] = matrices[7];
	int ndim9= 2;
	int dim9[2]= {20, 1};
	Matrix * tmp15= onesM(ndim9, dim9);
	matrices[8] = tmp15;
	double* lhs_data6 = i_to_d(matrices[8]);
	for (int iter10 = 1; iter10 <= 20; ++ iter10) {
		int d0_28 = iter10 % 1;
		if (d0_28 == 0) {
			d0_28 = 1;
		}
		int d1_28 = (iter10 - d0_28)/1 + 1;
		double tmp16= (iter10 - 8.5) * iter10 + 0.5;
		lhs_data6[(d1_28-1) + (d0_28-1) ] = tmp16;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter11 = 0 ; iter11 < ndim9; iter11++)
	{
		size6 *= dim9[iter11];
	}
	Matrix *mat6 = createM(ndim9, dim9, 1);
	writeM(mat6, size6, lhs_data6);
	matrices[8] = matrices[8];
	int ndim10= 2;
	int dim10[2]= {1, 10};
	Matrix * tmp17= zerosM(ndim10, dim10);
	matrices[9] = tmp17;
	complex* lhs_data7 = i_to_c(matrices[9]);
	for (int iter12 = 1; iter12 <= 10; ++ iter12) {
		int d0_33 = iter12 % 1;
		if (d0_33 == 0) {
			d0_33 = 1;
		}
		int d1_33 = (iter12 - d0_33)/1 + 1;
		complex tmp18= (iter12 - 5.5) * (iter12) + ((0.5) * (4 - iter12)) * 1*I;
		lhs_data7[(d1_33-1) + (d0_33-1) ] = tmp18;
	
	}
	// Write matrix mat7
	int size7 = 1;
	for (int iter13 = 0 ; iter13 < ndim10; iter13++)
	{
		size7 *= dim10[iter13];
	}
	Matrix *mat7 = createM(ndim10, dim10, 2);
	writeM(mat7, size7, lhs_data7);
	matrices[9] = matrices[9];
	
	int ndim11 = 2;
	int dim11[2] = {1,10};
	matrices[10] = createM(ndim11, dim11, 1);
	double *input1 = NULL;
	input1 = malloc( 10*sizeof(*input1));
	input1[0] = 3;
	input1[1] = -2;
	input1[2] = 0;
	input1[3] = 4;
	input1[4] = -1;
	input1[5] = 0;
	input1[6] = 0;
	input1[7] = 0;
	input1[8] = 1;
	input1[9] = 2.5;
	writeM( matrices[10], 10, input1);
	free(input1);
	
	
	int ndim12 = 2;
	int dim12[2] = {1,10};
	matrices[11] = createM(ndim12, dim12, 1);
	double *input2 = NULL;
	input2 = malloc( 10*sizeof(*input2));
	input2[0] = 3;
	input2[1] = -2;
	input2[2] = 0;
	input2[3] = 4;
	input2[4] = -1;
	input2[5] = 0;
	input2[6] = 0;
	input2[7] = 0;
	input2[8] = 1;
	input2[9] = 2.5;
	writeM( matrices[11], 10, input2);
	free(input2);
	
	
	int ndim13 = 2;
	int dim13[2] = {1,5};
	matrices[1] = createM(ndim13, dim13, 0);
	int *input3 = NULL;
	input3 = malloc( 5*sizeof(*input3));
	input3[0] = 1;
	input3[1] = 2;
	input3[2] = 3;
	input3[3] = 4;
	input3[4] = 5;
	writeM( matrices[1], 5, input3);
	free(input3);
	
	for (int iter14 = 1; iter14 <= 13; ++ iter14) {
		printf("\n%s\n", "b\n");
		int d0_40 = iter14 % 12;
		if (d0_40 == 0) {
			d0_40 = 12;
		}
		int d1_40 = (iter14 - d0_40)/12 + 1;
		printM(matrices[(d1_40-1) + (d0_40-1) ]);
		for (int iter15 = 1; iter15 <= 13; ++ iter15) {
			printf("\n%s\n", "\na\n");
			int d0_41 = iter15 % 12;
			if (d0_41 == 0) {
				d0_41 = 12;
			}
			int d1_41 = (iter15 - d0_41)/12 + 1;
			printM(matrices[(d1_41-1) + (d0_41-1) ]);
			for (int iter16 = 1; iter16 <= 13; ++ iter16) {
				printf("\n%s\n", "\nx\n");
				int d0_42 = iter16 % 12;
				if (d0_42 == 0) {
					d0_42 = 12;
				}
				int d1_42 = (iter16 - d0_42)/12 + 1;
				printM(matrices[(d1_42-1) + (d0_42-1) ]);
				printf("\n%s\n", "\n");
				int d0_43 = iter14 % 12;
				if (d0_43 == 0) {
					d0_43 = 12;
				}
				int d1_43 = (iter14 - d0_43)/12 + 1;
				int d0_44 = iter15 % 12;
				if (d0_44 == 0) {
					d0_44 = 12;
				}
				int d1_44 = (iter15 - d0_44)/12 + 1;
				int d0_45 = iter16 % 12;
				if (d0_45 == 0) {
					d0_45 = 12;
				}
				int d1_45 = (iter16 - d0_45)/12 + 1;
				int state_size1[1]= {(int) fmax(getsizeM(matrices[(d1_43-1) + (d0_43-1) ]), getsizeM(matrices[(d1_44-1) + (d0_44-1) ])) - 1};
				Matrix * zero1= zerosM(1, state_size1);
				Matrix * tmp19= filterM(matrices[(d1_43-1) + (d0_43-1) ], matrices[(d1_44-1) + (d0_44-1) ], matrices[(d1_45-1) + (d0_45-1) ], &zero1);
				Matrix * y= tmp19;
				complex * tmp20 = c_to_c(tmp19);
				printf("\n%f\n", tmp20[0]);
				printf("\n%s\n", "\n");
				printf("\n%d\n", sf);
			
			}
		
		}
	
	}
	return 0;
}
