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
		        
	int ndim1 = 2;
	int dim1[2] = {11,1};
	int idx1 = convertSubscript(ndim1, dim1, 1);
	int ndim2 = 2;
	int dim2[2] = {1, 10};
	Matrix * tmp1 = zerosM(ndim2, dim2);
	matrices[idx1] = tmp1;
	int idx2 = convertSubscript(ndim1, dim1, 2);
	int ndim3 = 2;
	int dim3[2] = {20, 1};
	Matrix * tmp2 = onesM(ndim3, dim3);
	matrices[idx2] = tmp2;
	int idx3 = convertSubscript(ndim1, dim1, 3);
	int ndim4 = 2;
	int dim4[2] = {1, 10};
	Matrix * tmp3 = onesM(ndim4, dim4);
	matrices[idx3] = tmp3;
	int idx4 = convertSubscript(ndim1, dim1, 4);
	int ndim5 = 2;
	int dim5[2] = {20, 1};
	Matrix * tmp4 = onesM(ndim5, dim5);
	complex scalar1 = (4.5 - 0.5*I);
	Matrix * tmp5 = scaleM(tmp4, &scalar1, 2);
	matrices[idx4] = tmp5;
	int idx5 = convertSubscript(ndim1, dim1, 5);
	int ndim6 = 2;
	int dim6[2] = {1, 10};
	Matrix * tmp6 = zerosM(ndim6, dim6);
	int* lhs_data1 = i_to_i(tmp6);
	matrices[idx5] = tmp6;
	for (int i = 1; i <= 10; ++ i) {
		int tmp7 = i * i;
		int idx6 = convertSubscript(ndim6, dim6, i);
		lhs_data1[idx6] = tmp7;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim6; iter1++)
	{
		size1 *= dim6[iter1];
	}
	Matrix *mat1 = createM(ndim6, dim6, 0);
	writeM(mat1, size1, lhs_data1);
	int idx7 = convertSubscript(ndim1, dim1, 5);
	int idx8 = convertSubscript(ndim1, dim1, 5);
	matrices[idx7] = tmp6;
	int idx9 = convertSubscript(ndim1, dim1, 6);
	int ndim7 = 2;
	int dim7[2] = {1, 10};
	Matrix * tmp8 = zerosM(ndim7, dim7);
	double* lhs_data2 = i_to_d(tmp8);
	matrices[idx9] = tmp8;
	for (int i = 1; i <= 10; ++ i) {
		double tmp9 = i * i + 0.5;
		int idx10 = convertSubscript(ndim7, dim7, i);
		lhs_data2[idx10] = tmp9;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim7; iter2++)
	{
		size2 *= dim7[iter2];
	}
	Matrix *mat2 = createM(ndim7, dim7, 1);
	writeM(mat2, size2, lhs_data2);
	int idx11 = convertSubscript(ndim1, dim1, 6);
	int idx12 = convertSubscript(ndim1, dim1, 6);
	matrices[idx11] = tmp8;
	int idx13 = convertSubscript(ndim1, dim1, 7);
	int ndim8 = 2;
	int dim8[2] = {20, 1};
	Matrix * tmp10 = onesM(ndim8, dim8);
	complex* lhs_data3 = i_to_c(tmp10);
	matrices[idx13] = tmp10;
	for (int i = 1; i <= 20; ++ i) {
		complex tmp11 = i * i + 0.5*I;
		int idx14 = convertSubscript(ndim8, dim8, i);
		lhs_data3[idx14] = tmp11;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim8; iter3++)
	{
		size3 *= dim8[iter3];
	}
	Matrix *mat3 = createM(ndim8, dim8, 2);
	writeM(mat3, size3, lhs_data3);
	int idx15 = convertSubscript(ndim1, dim1, 7);
	int idx16 = convertSubscript(ndim1, dim1, 7);
	matrices[idx15] = tmp10;
	int idx17 = convertSubscript(ndim1, dim1, 8);
	int ndim9 = 2;
	int dim9[2] = {20, 1};
	Matrix * tmp12 = onesM(ndim9, dim9);
	int* lhs_data4 = i_to_i(tmp12);
	matrices[idx17] = tmp12;
	for (int i = 1; i <= 20; ++ i) {
		int tmp13 = (i - 5) * i;
		int idx18 = convertSubscript(ndim9, dim9, i);
		lhs_data4[idx18] = tmp13;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim9; iter4++)
	{
		size4 *= dim9[iter4];
	}
	Matrix *mat4 = createM(ndim9, dim9, 0);
	writeM(mat4, size4, lhs_data4);
	int idx19 = convertSubscript(ndim1, dim1, 8);
	int idx20 = convertSubscript(ndim1, dim1, 8);
	matrices[idx19] = tmp12;
	int idx21 = convertSubscript(ndim1, dim1, 9);
	int ndim10 = 2;
	int dim10[2] = {20, 1};
	Matrix * tmp14 = onesM(ndim10, dim10);
	double* lhs_data5 = i_to_d(tmp14);
	matrices[idx21] = tmp14;
	for (int i = 1; i <= 20; ++ i) {
		double tmp15 = (i - 8.5) * i + 0.5;
		int idx22 = convertSubscript(ndim10, dim10, i);
		lhs_data5[idx22] = tmp15;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim10; iter5++)
	{
		size5 *= dim10[iter5];
	}
	Matrix *mat5 = createM(ndim10, dim10, 1);
	writeM(mat5, size5, lhs_data5);
	int idx23 = convertSubscript(ndim1, dim1, 9);
	int idx24 = convertSubscript(ndim1, dim1, 9);
	matrices[idx23] = tmp14;
	int idx25 = convertSubscript(ndim1, dim1, 10);
	int ndim11 = 2;
	int dim11[2] = {1, 10};
	Matrix * tmp16 = zerosM(ndim11, dim11);
	complex* lhs_data6 = i_to_c(tmp16);
	matrices[idx25] = tmp16;
	for (int i = 1; i <= 10; ++ i) {
		complex tmp17 = (i - 5.5) * (i) + ((0.5) * (4 - i)) * 1*I;
		int idx26 = convertSubscript(ndim11, dim11, i);
		lhs_data6[idx26] = tmp17;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim11; iter6++)
	{
		size6 *= dim11[iter6];
	}
	Matrix *mat6 = createM(ndim11, dim11, 2);
	writeM(mat6, size6, lhs_data6);
	int idx27 = convertSubscript(ndim1, dim1, 10);
	int idx28 = convertSubscript(ndim1, dim1, 10);
	matrices[idx27] = tmp16;
	int idx29 = convertSubscript(ndim1, dim1, 11);
	
	int ndim12 = 2;
	int dim12[2] = {1,10};
	matrices[idx29] = createM(ndim12, dim12, 1);
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
	writeM( matrices[idx29], 10, input1);
	free(input1);
	
	int idx30 = convertSubscript(ndim1, dim1, 12);
	
	int ndim13 = 2;
	int dim13[2] = {1,10};
	matrices[idx30] = createM(ndim13, dim13, 1);
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
	writeM( matrices[idx30], 10, input2);
	free(input2);
	
	for (int index = 1; index <= 12; ++ index) {
		printf("\n%s\n", "i\n");
		int idx31 = convertSubscript(ndim1, dim1, index);
		printM(matrices[idx31]);
		for (int j = 1; j <= 12; ++ j) {
			printf("\n%s\n", "j\n");
			int idx32 = convertSubscript(ndim1, dim1, j);
			printM(matrices[idx32]);
			printf("\n%s\n", "\n\n");
			int idx33 = convertSubscript(ndim1, dim1, index);
			int idx34 = convertSubscript(ndim1, dim1, j);
			Matrix * tmp18 = xcorrM(matrices[idx33], matrices[idx34], 0, "none");
			printM(tmp18);
			int idx35 = convertSubscript(ndim1, dim1, index);
			int * dim14 = getDimsM(matrices[idx35]);
			int idx36 = convertSubscript(ndim1, dim1, index);
			int * dim15 = getDimsM(matrices[idx36]);
			int idx37 = convertSubscript(ndim1, dim1, j);
			int * dim16 = getDimsM(matrices[idx37]);
			int idx38 = convertSubscript(ndim1, dim1, j);
			int * dim17 = getDimsM(matrices[idx38]);
			if ((index > 1 && j > 1 && dim14[0] * dim15[1] == dim16[0] * dim17[1])) {
				int idx39 = convertSubscript(ndim1, dim1, index);
				int idx40 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp23 = xcorrM(matrices[idx39], matrices[idx40], 0, "unbiased");
				printM(tmp23);
				int idx41 = convertSubscript(ndim1, dim1, index);
				int idx42 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp24 = xcorrM(matrices[idx41], matrices[idx42], 0, "biased");
				printM(tmp24);
				int idx43 = convertSubscript(ndim1, dim1, index);
				int idx44 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp25 = xcorrM(matrices[idx43], matrices[idx44], 0, "coeff");
				printM(tmp25);
				
				
				
			
			}
			for (int k = 9; k <= 21; ++ k) {
				int idx45 = convertSubscript(ndim1, dim1, index);
				int idx46 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp26 = xcorrM(matrices[idx45], matrices[idx46], k, "none");
				printM(tmp26);
				int idx47 = convertSubscript(ndim1, dim1, index);
				int * dim18 = getDimsM(matrices[idx47]);
				int idx48 = convertSubscript(ndim1, dim1, index);
				int * dim19 = getDimsM(matrices[idx48]);
				int idx49 = convertSubscript(ndim1, dim1, j);
				int * dim20 = getDimsM(matrices[idx49]);
				int idx50 = convertSubscript(ndim1, dim1, j);
				int * dim21 = getDimsM(matrices[idx50]);
				if ((index > 1 && j > 1 && dim18[0] * dim19[1] == dim20[0] * dim21[1])) {
					int idx51 = convertSubscript(ndim1, dim1, index);
					int idx52 = convertSubscript(ndim1, dim1, j);
					Matrix * tmp31 = xcorrM(matrices[idx51], matrices[idx52], k, "unbiased");
					printM(tmp31);
					int idx53 = convertSubscript(ndim1, dim1, index);
					int idx54 = convertSubscript(ndim1, dim1, j);
					Matrix * tmp32 = xcorrM(matrices[idx53], matrices[idx54], k, "biased");
					printM(tmp32);
					int idx55 = convertSubscript(ndim1, dim1, index);
					int idx56 = convertSubscript(ndim1, dim1, j);
					Matrix * tmp33 = xcorrM(matrices[idx55], matrices[idx56], k, "coeff");
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
