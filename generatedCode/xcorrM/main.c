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
	//pkg load signal;
	
	Matrix **matrices = NULL;
	matrices = malloc(11*sizeof(*matrices));
		        
	int ndim1 = getnDimM(*matrices);
	int *dim1 = getDimsM(*matrices);
	int ndim2 = 2;
	int dim2[2] = {1, 10};
	Matrix * tmp1 = zerosM(ndim2, dim2);
	matrices[1] = tmp1;
	int ndim3 = 2;
	int dim3[2] = {20, 1};
	Matrix * tmp2 = onesM(ndim3, dim3);
	matrices[2] = tmp2;
	int ndim4 = 2;
	int dim4[2] = {1, 10};
	Matrix * tmp3 = onesM(ndim4, dim4);
	matrices[3] = tmp3;
	int ndim5 = 2;
	int dim5[2] = {20, 1};
	Matrix * tmp4 = onesM(ndim5, dim5);
	complex scalar1 = (4.5 - 0.5*I);
	Matrix * tmp5 = scaleM(tmp4, &scalar1, 2);
	matrices[4] = tmp5;
	int ndim6 = 2;
	int dim6[2] = {1, 10};
	Matrix * tmp6 = zerosM(ndim6, dim6);
	matrices[5] = tmp6;
	int* lhs_data1 = i_to_i(matrices[5]);
	for (int i = 1; i <= 10; ++ i) {
		int tmp7 = i * i;
		int idx1 = convertSubscript(ndim6, dim6, i);
		lhs_data1[idx1] = tmp7;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim6; iter1++)
	{
		size1 *= dim6[iter1];
	}
	Matrix *mat1 = createM(ndim6, dim6, 0);
	writeM(mat1, size1, lhs_data1);
	int idx2 = convertSubscript(ndim1, dim1, 5);
	matrices[5] = tmp6;
	int ndim7 = 2;
	int dim7[2] = {1, 10};
	Matrix * tmp8 = zerosM(ndim7, dim7);
	matrices[6] = tmp8;
	double* lhs_data2 = i_to_d(matrices[6]);
	for (int i = 1; i <= 10; ++ i) {
		double tmp9 = i * i + 0.5;
		int idx3 = convertSubscript(ndim7, dim7, i);
		lhs_data2[idx3] = tmp9;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim7; iter2++)
	{
		size2 *= dim7[iter2];
	}
	Matrix *mat2 = createM(ndim7, dim7, 1);
	writeM(mat2, size2, lhs_data2);
	int idx4 = convertSubscript(ndim1, dim1, 6);
	matrices[6] = tmp8;
	int ndim8 = 2;
	int dim8[2] = {20, 1};
	Matrix * tmp10 = onesM(ndim8, dim8);
	matrices[7] = tmp10;
	complex* lhs_data3 = i_to_c(matrices[7]);
	for (int i = 1; i <= 20; ++ i) {
		complex tmp11 = i * i + 0.5*I;
		int idx5 = convertSubscript(ndim8, dim8, i);
		lhs_data3[idx5] = tmp11;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim8; iter3++)
	{
		size3 *= dim8[iter3];
	}
	Matrix *mat3 = createM(ndim8, dim8, 2);
	writeM(mat3, size3, lhs_data3);
	int idx6 = convertSubscript(ndim1, dim1, 7);
	matrices[7] = tmp10;
	int ndim9 = 2;
	int dim9[2] = {20, 1};
	Matrix * tmp12 = onesM(ndim9, dim9);
	matrices[8] = tmp12;
	int* lhs_data4 = i_to_i(matrices[8]);
	for (int i = 1; i <= 20; ++ i) {
		int tmp13 = (i - 5) * i;
		int idx7 = convertSubscript(ndim9, dim9, i);
		lhs_data4[idx7] = tmp13;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim9; iter4++)
	{
		size4 *= dim9[iter4];
	}
	Matrix *mat4 = createM(ndim9, dim9, 0);
	writeM(mat4, size4, lhs_data4);
	int idx8 = convertSubscript(ndim1, dim1, 8);
	matrices[8] = tmp12;
	int ndim10 = 2;
	int dim10[2] = {20, 1};
	Matrix * tmp14 = onesM(ndim10, dim10);
	matrices[9] = tmp14;
	double* lhs_data5 = i_to_d(matrices[9]);
	for (int i = 1; i <= 20; ++ i) {
		double tmp15 = (i - 8.5) * i + 0.5;
		int idx9 = convertSubscript(ndim10, dim10, i);
		lhs_data5[idx9] = tmp15;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim10; iter5++)
	{
		size5 *= dim10[iter5];
	}
	Matrix *mat5 = createM(ndim10, dim10, 1);
	writeM(mat5, size5, lhs_data5);
	int idx10 = convertSubscript(ndim1, dim1, 9);
	matrices[9] = tmp14;
	int ndim11 = 2;
	int dim11[2] = {1, 10};
	Matrix * tmp16 = zerosM(ndim11, dim11);
	matrices[10] = tmp16;
	complex* lhs_data6 = i_to_c(matrices[10]);
	for (int i = 1; i <= 10; ++ i) {
		complex tmp17 = (i - 5.5) * (i) + ((0.5) * (4 - i)) * 1*I;
		int idx11 = convertSubscript(ndim11, dim11, i);
		lhs_data6[idx11] = tmp17;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim11; iter6++)
	{
		size6 *= dim11[iter6];
	}
	Matrix *mat6 = createM(ndim11, dim11, 2);
	writeM(mat6, size6, lhs_data6);
	int idx12 = convertSubscript(ndim1, dim1, 10);
	matrices[10] = tmp16;
	
	int ndim12 = 2;
	int dim12[2] = {1,10};
	matrices[11] = createM(ndim12, dim12, 1);
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
	writeM( matrices[11], 10, input1);
	free(input1);
	
	
	int ndim13 = 2;
	int dim13[2] = {1,10};
	matrices[12] = createM(ndim13, dim13, 1);
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
	writeM( matrices[12], 10, input2);
	free(input2);
	
	for (int index = 1; index <= 12; ++ index) {
		printf("\n%s\n", "i\n");
		printM(matrices[index]);
		for (int j = 1; j <= 12; ++ j) {
			printf("\n%s\n", "j\n");
			printM(matrices[j]);
			printf("\n%s\n", "\n\n");
			Matrix * tmp18 = xcorrM(matrices[index], matrices[j], 0, "none");
			printM(tmp18);
			int * tmp19 = getDimsM(matrices[index]);
			int * tmp20 = getDimsM(matrices[index]);
			int * tmp21 = getDimsM(matrices[j]);
			int * tmp22 = getDimsM(matrices[j]);
			if ((index > 1 && j > 1 && tmp19[0] * tmp20[1] == tmp21[0] * tmp22[1])) {
				Matrix * tmp23 = xcorrM(matrices[index], matrices[j], 0, "unbiased");
				printM(tmp23);
				Matrix * tmp24 = xcorrM(matrices[index], matrices[j], 0, "biased");
				printM(tmp24);
				Matrix * tmp25 = xcorrM(matrices[index], matrices[j], 0, "coeff");
				printM(tmp25);
				
				
				
			
			}
			for (int k = 9; k <= 21; ++ k) {
				Matrix * tmp26 = xcorrM(matrices[index], matrices[j], k, "none");
				printM(tmp26);
				int * tmp27 = getDimsM(matrices[index]);
				int * tmp28 = getDimsM(matrices[index]);
				int * tmp29 = getDimsM(matrices[j]);
				int * tmp30 = getDimsM(matrices[j]);
				if ((index > 1 && j > 1 && tmp27[0] * tmp28[1] == tmp29[0] * tmp30[1])) {
					Matrix * tmp31 = xcorrM(matrices[index], matrices[j], k, "unbiased");
					printM(tmp31);
					Matrix * tmp32 = xcorrM(matrices[index], matrices[j], k, "biased");
					printM(tmp32);
					Matrix * tmp33 = xcorrM(matrices[index], matrices[j], k, "coeff");
					printM(tmp33);
					
					
					
				
				}
			
			}
		
		}
	
	}
	// for index=1:1
	// 	% sprintf(stdout, 'i\n');
	// 	% disp(matrices{index});
	// 	for j=1:12
	// 		index = j;
	// 		sprintf(stdout, 'j\n');
	// 		disp(matrices{j});
	// 		sprintf(stdout, '\n\n');
	// 		disp(xcorr(matrices{index}, matrices{j}, 'none'));
	// 		if (index > 1 && j > 1 && size(matrices{index})(1)*size(matrices{index})(2) == size(matrices{j})(1)*size(matrices{j})(2))
	// 			disp(xcorr(matrices{index}, matrices{j}, 'unbiased'));
	// 			disp(xcorr(matrices{index}, matrices{j}, 'biased'));
	// 			disp(xcorr(matrices{index}, matrices{j}, 'coeff'));
	// 		end
	// 		for k=9:21
	// 			disp(xcorr(matrices{index}, matrices{j}, k, 'none'));
	// 			if (index > 1 && j > 1 && size(matrices{index})(1)*size(matrices{index})(2) == size(matrices{j})(1)*size(matrices{j})(2))
	// 				disp(xcorr(matrices{index}, matrices{j}, k, 'unbiased'));
	// 				disp(xcorr(matrices{index}, matrices{j}, k, 'biased'));
	// 				disp(xcorr(matrices{index}, matrices{j}, k, 'coeff'));
	// 			end
	// 		end
	// 	end
	// end
	return 0;
}
