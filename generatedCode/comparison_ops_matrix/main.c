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
	// %lt
	// a = zeros(3);
	// for i=1:9
	// 	a(i) = i*i;
	// end
	// a(1) -= 1;
	// a(5) -= 1;
	// a(9) -= 1;
	// a = a.';
	// disp(a);
	// b = zeros(3);
	// for i=1:9
	// 	b(i) = i*i;
	// end
	// b(5) = 25.5;
	// b = b.';
	// disp(b);
	// disp(a < b);
	// %le
	// a = zeros(3);
	// for i=1:9
	// 	a(i) = (i*i)+1;
	// end
	// a(1) -= 1;
	// a(5) -= 1;
	// a(9) -= 1;
	// a = a.';
	// disp(a);
	// b = zeros(3);
	// for i=1:9
	// 	b(i) = i*i;
	// end
	// b(5) = 25.5;
	// b = b.';
	// disp(b);
	// disp(a <= b);
	// %gt
	// a = zeros(3);
	// for i=1:9
	// 	a(i) = i*i;
	// end
	// a(1) += 1;
	// a(5) += 1;
	// a(9) += 1;
	// a = a.';
	// disp(a);
	// b = zeros(3);
	// for i=1:9
	// 	b(i) = i*i;
	// end
	// b = b.';
	// disp(b);
	// disp(a > b);
	// %ge
	// a = zeros(3);
	// for i=1:9
	// 	a(i) = (i*i)-1;
	// end
	// a(1) += 1;
	// a(5) += 1;
	// a(9) += 1;
	// a = a.';
	// disp(a);
	// b = zeros(3);
	// for i=1:9
	// 	b(i) = i*i;
	// end
	// b = b.';
	// disp(b);
	// disp(a >= b);
	// %ne
	// a = zeros(3);
	// for i=1:9
	// 	a(i) = i*i;
	// end
	// a(1) *= 2;
	// a(9) *= 9;
	// a = a.';
	// disp(a);
	// b = zeros(3);
	// for i=1:9
	// 	b(i) = i*i;
	// end
	// b(5) = 25.5;
	// b = b.';
	// disp(b);
	// disp(a ~= b);
	// %pairwise_max
	// a = zeros(3);
	// for i=1:9
	// 	a(i) = i*i;
	// end
	// a(1) *= 2;
	// a(9) *= 19;
	// a = a.';
	// disp(a);
	// b = zeros(3);
	// for i=1:9
	// 	b(i) = i*i+4i;
	// end
	// b(5) = 25.5;
	// b = b.';
	// disp(b);
	// disp(max(a,b));
	// %pairwise_min
	// a = zeros(3);
	// for i=1:9
	// 	a(i) = i*i;
	// end
	// a(1) *= 2;
	// a(9) *= 19;
	// a = a.';
	// disp(a);
	// b = zeros(3);
	// for i=1:9
	// 	b(i) = i*i+4i;
	// end
	// b(5) = 25.5;
	// b = b.';
	// disp(b);
	// disp(min(a,b));
	//brutal_test
	
	Matrix **matrices = NULL;
	matrices = malloc(11*sizeof(*matrices));
		        
	int ndim1 = 2;
	int dim1[2] = {11,1};
	int idx1 = convertSubscript(ndim1, dim1, 1);
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim2, dim2);
	matrices[idx1] = tmp1;
	int idx2 = convertSubscript(ndim1, dim1, 2);
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp2 = onesM(ndim3, dim3);
	matrices[idx2] = tmp2;
	int idx3 = convertSubscript(ndim1, dim1, 3);
	Matrix * tmp3 = identityM(3);
	matrices[idx3] = tmp3;
	int idx4 = convertSubscript(ndim1, dim1, 4);
	Matrix * tmp4 = identityM(3);
	complex scalar1 = (4.2 - 0.03*I);
	Matrix * tmp5 = scaleM(tmp4, &scalar1, 2);
	matrices[idx4] = tmp5;
	int idx5 = convertSubscript(ndim1, dim1, 5);
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp6 = zerosM(ndim4, dim4);
	int* lhs_data1 = i_to_i(tmp6);
	matrices[idx5] = tmp6;
	for (int i = 1; i <= 9; ++ i) {
		int tmp7 = i * i;
		int idx6 = convertSubscript(ndim4, dim4, i);
		lhs_data1[idx6] = tmp7;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim4; iter1++)
	{
		size1 *= dim4[iter1];
	}
	Matrix *mat1 = createM(ndim4, dim4, 0);
	writeM(mat1, size1, lhs_data1);
	int idx7 = convertSubscript(ndim1, dim1, 5);
	int idx8 = convertSubscript(ndim1, dim1, 5);
	Matrix * tmp8 = transposeM(tmp6);
	matrices[idx7] = tmp8;
	int idx9 = convertSubscript(ndim1, dim1, 6);
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp9 = zerosM(ndim5, dim5);
	double* lhs_data2 = i_to_d(tmp9);
	matrices[idx9] = tmp9;
	for (int i = 1; i <= 9; ++ i) {
		double tmp10 = i * i + 0.5;
		int idx10 = convertSubscript(ndim5, dim5, i);
		lhs_data2[idx10] = tmp10;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim5; iter2++)
	{
		size2 *= dim5[iter2];
	}
	Matrix *mat2 = createM(ndim5, dim5, 1);
	writeM(mat2, size2, lhs_data2);
	int idx11 = convertSubscript(ndim1, dim1, 6);
	int idx12 = convertSubscript(ndim1, dim1, 6);
	Matrix * tmp11 = transposeM(tmp9);
	matrices[idx11] = tmp11;
	int idx13 = convertSubscript(ndim1, dim1, 7);
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp12 = zerosM(ndim6, dim6);
	complex* lhs_data3 = i_to_c(tmp12);
	matrices[idx13] = tmp12;
	for (int i = 1; i <= 9; ++ i) {
		complex tmp13 = i * i + 0.5*I;
		int idx14 = convertSubscript(ndim6, dim6, i);
		lhs_data3[idx14] = tmp13;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim6; iter3++)
	{
		size3 *= dim6[iter3];
	}
	Matrix *mat3 = createM(ndim6, dim6, 2);
	writeM(mat3, size3, lhs_data3);
	int idx15 = convertSubscript(ndim1, dim1, 7);
	int idx16 = convertSubscript(ndim1, dim1, 7);
	Matrix * tmp14 = transposeM(tmp12);
	matrices[idx15] = tmp14;
	int idx17 = convertSubscript(ndim1, dim1, 8);
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp15 = zerosM(ndim7, dim7);
	int* lhs_data4 = i_to_i(tmp15);
	matrices[idx17] = tmp15;
	for (int i = 1; i <= 9; ++ i) {
		int tmp16 = (i - 5) * i;
		int idx18 = convertSubscript(ndim7, dim7, i);
		lhs_data4[idx18] = tmp16;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim7; iter4++)
	{
		size4 *= dim7[iter4];
	}
	Matrix *mat4 = createM(ndim7, dim7, 0);
	writeM(mat4, size4, lhs_data4);
	int idx19 = convertSubscript(ndim1, dim1, 8);
	int idx20 = convertSubscript(ndim1, dim1, 8);
	Matrix * tmp17 = transposeM(tmp15);
	matrices[idx19] = tmp17;
	int idx21 = convertSubscript(ndim1, dim1, 9);
	int ndim8 = 2;
	int dim8[2] = {3,3};
	Matrix * tmp18 = zerosM(ndim8, dim8);
	double* lhs_data5 = i_to_d(tmp18);
	matrices[idx21] = tmp18;
	for (int i = 1; i <= 9; ++ i) {
		double tmp19 = (i - 8.2) * i + 0.5;
		int idx22 = convertSubscript(ndim8, dim8, i);
		lhs_data5[idx22] = tmp19;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim8; iter5++)
	{
		size5 *= dim8[iter5];
	}
	Matrix *mat5 = createM(ndim8, dim8, 1);
	writeM(mat5, size5, lhs_data5);
	int idx23 = convertSubscript(ndim1, dim1, 9);
	int idx24 = convertSubscript(ndim1, dim1, 9);
	Matrix * tmp20 = transposeM(tmp18);
	matrices[idx23] = tmp20;
	int idx25 = convertSubscript(ndim1, dim1, 10);
	int ndim9 = 2;
	int dim9[2] = {3,3};
	Matrix * tmp21 = zerosM(ndim9, dim9);
	complex* lhs_data6 = i_to_c(tmp21);
	matrices[idx25] = tmp21;
	for (int i = 1; i <= 9; ++ i) {
		complex tmp22 = (i - 5.89) * (i) + ((0.5) * (4 - i)) * 1*I;
		int idx26 = convertSubscript(ndim9, dim9, i);
		lhs_data6[idx26] = tmp22;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim9; iter6++)
	{
		size6 *= dim9[iter6];
	}
	Matrix *mat6 = createM(ndim9, dim9, 2);
	writeM(mat6, size6, lhs_data6);
	int idx27 = convertSubscript(ndim1, dim1, 10);
	int idx28 = convertSubscript(ndim1, dim1, 10);
	Matrix * tmp23 = transposeM(tmp21);
	matrices[idx27] = tmp23;
	int idx29 = convertSubscript(ndim1, dim1, 11);
	
	int ndim10 = 2;
	int dim10[2] = {3,3};
	matrices[idx29] = createM(ndim10, dim10, 0);
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
	writeM( matrices[idx29], 9, input1);
	free(input1);
	
	int idx30 = convertSubscript(ndim1, dim1, 12);
	
	int ndim11 = 2;
	int dim11[2] = {3,3};
	matrices[idx30] = createM(ndim11, dim11, 1);
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
	writeM( matrices[idx30], 9, input2);
	free(input2);
	
	for (int i = 1; i <= 12; ++ i) {
		for (int j = 1; j <= 12; ++ j) {
			int idx31 = convertSubscript(ndim1, dim1, i);
			int idx32 = convertSubscript(ndim1, dim1, j);
			Matrix * tmp24 = ltM(matrices[idx31], matrices[idx32]);
			printM(tmp24);
			int idx33 = convertSubscript(ndim1, dim1, i);
			int idx34 = convertSubscript(ndim1, dim1, j);
			Matrix * tmp25 = leM(matrices[idx33], matrices[idx34]);
			printM(tmp25);
			int idx35 = convertSubscript(ndim1, dim1, i);
			int idx36 = convertSubscript(ndim1, dim1, j);
			Matrix * tmp26 = gtM(matrices[idx35], matrices[idx36]);
			printM(tmp26);
			int idx37 = convertSubscript(ndim1, dim1, i);
			int idx38 = convertSubscript(ndim1, dim1, j);
			Matrix * tmp27 = geM(matrices[idx37], matrices[idx38]);
			printM(tmp27);
			int idx39 = convertSubscript(ndim1, dim1, i);
			int idx40 = convertSubscript(ndim1, dim1, j);
			Matrix * tmp28 = neM(matrices[idx39], matrices[idx40]);
			printM(tmp28);
			int idx41 = convertSubscript(ndim1, dim1, i);
			int idx42 = convertSubscript(ndim1, dim1, j);
			Matrix * tmp29 = equalM(matrices[idx41], matrices[idx42]);
			printM(tmp29);
			if ((i == 4 || i == 7 || i == 10 || j == 4 || j == 7 || j == 10)) {
				int idx43 = convertSubscript(ndim1, dim1, i);
				int idx44 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp30 = pairwise_maxM(matrices[idx43], matrices[idx44]);
				printM(tmp30);
				int idx45 = convertSubscript(ndim1, dim1, i);
				int idx46 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp31 = pairwise_minM(matrices[idx45], matrices[idx46]);
				printM(tmp31);

				
				} else if ((i == 6 || i == 9 || i == 12 || j == 6 || j == 9 || j == 12)) {
				int idx47 = convertSubscript(ndim1, dim1, i);
				int idx48 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp32 = pairwise_maxM(matrices[idx47], matrices[idx48]);
				printM(tmp32);
				int idx49 = convertSubscript(ndim1, dim1, i);
				int idx50 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp33 = pairwise_minM(matrices[idx49], matrices[idx50]);
				printM(tmp33);

				
				} else {
				int idx51 = convertSubscript(ndim1, dim1, i);
				int idx52 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp34 = pairwise_maxM(matrices[idx51], matrices[idx52]);
				printM(tmp34);
				int idx53 = convertSubscript(ndim1, dim1, i);
				int idx54 = convertSubscript(ndim1, dim1, j);
				Matrix * tmp35 = pairwise_minM(matrices[idx53], matrices[idx54]);
				printM(tmp35);

				
			
			}
		
		}
	
	}
	return 0;
}
