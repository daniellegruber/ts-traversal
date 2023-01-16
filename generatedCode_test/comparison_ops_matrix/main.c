//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

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
		        
	int ndim1= 2;
	int dim1[2]= {3,3};
	matrices[0] = zerosM(ndim1, dim1);
	int ndim2= 2;
	int dim2[2]= {3,3};
	matrices[1] = onesM(ndim2, dim2);
	matrices[2] = identityM(3);
	complex scalar1= (4.2 - 0.03*I);
	Matrix * tmp1= scaleM(identityM(3), &scalar1, 2);
	matrices[3] = tmp1;
	int ndim3= 2;
	int dim3[2]= {3,3};
	matrices[4] = zerosM(ndim3, dim3);
	int* lhs_data1 = i_to_i(matrices[4]);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int d0_6 = iter1 % 1;
		if (d0_6 == 0) {
			d0_6 = 1;
		}
		int d1_6 = (iter1 - d0_6)/1 + 1;
		int tmp2= iter1 * iter1;
		lhs_data1[(d1_6-1) + (d0_6-1)] = tmp2;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim3; iter2++)
	{
		size1 *= dim3[iter2];
	}
	Matrix *mat1 = createM(ndim3, dim3, 0);
	writeM(mat1, size1, lhs_data1);
	matrices[4] = mat1;
	Matrix * tmp3= transposeM(matrices[4]);
	matrices[4] = tmp3;
	int ndim4= 2;
	int dim4[2]= {3,3};
	matrices[5] = zerosM(ndim4, dim4);
	double* lhs_data2 = i_to_d(matrices[5]);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int d0_12 = iter3 % 1;
		if (d0_12 == 0) {
			d0_12 = 1;
		}
		int d1_12 = (iter3 - d0_12)/1 + 1;
		double tmp4= iter3 * iter3 + 0.5;
		lhs_data2[(d1_12-1) + (d0_12-1)] = tmp4;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim4; iter4++)
	{
		size2 *= dim4[iter4];
	}
	Matrix *mat2 = createM(ndim4, dim4, 1);
	writeM(mat2, size2, lhs_data2);
	matrices[5] = mat2;
	Matrix * tmp5= transposeM(matrices[5]);
	matrices[5] = tmp5;
	int ndim5= 2;
	int dim5[2]= {3,3};
	matrices[6] = zerosM(ndim5, dim5);
	complex* lhs_data3 = i_to_c(matrices[6]);
	for (int iter5 = 1; iter5 <= 9; ++ iter5) {
		int d0_18 = iter5 % 1;
		if (d0_18 == 0) {
			d0_18 = 1;
		}
		int d1_18 = (iter5 - d0_18)/1 + 1;
		complex tmp6= iter5 * iter5 + 0.5*I;
		lhs_data3[(d1_18-1) + (d0_18-1)] = tmp6;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim5; iter6++)
	{
		size3 *= dim5[iter6];
	}
	Matrix *mat3 = createM(ndim5, dim5, 2);
	writeM(mat3, size3, lhs_data3);
	matrices[6] = mat3;
	Matrix * tmp7= transposeM(matrices[6]);
	matrices[6] = tmp7;
	int ndim6= 2;
	int dim6[2]= {3,3};
	matrices[7] = zerosM(ndim6, dim6);
	int* lhs_data4 = i_to_i(matrices[7]);
	for (int iter7 = 1; iter7 <= 9; ++ iter7) {
		int d0_24 = iter7 % 1;
		if (d0_24 == 0) {
			d0_24 = 1;
		}
		int d1_24 = (iter7 - d0_24)/1 + 1;
		int tmp8= (iter7 - 5) * iter7;
		lhs_data4[(d1_24-1) + (d0_24-1)] = tmp8;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter8 = 0 ; iter8 < ndim6; iter8++)
	{
		size4 *= dim6[iter8];
	}
	Matrix *mat4 = createM(ndim6, dim6, 0);
	writeM(mat4, size4, lhs_data4);
	matrices[7] = mat4;
	Matrix * tmp9= transposeM(matrices[7]);
	matrices[7] = tmp9;
	int ndim7= 2;
	int dim7[2]= {3,3};
	matrices[8] = zerosM(ndim7, dim7);
	double* lhs_data5 = i_to_d(matrices[8]);
	for (int iter9 = 1; iter9 <= 9; ++ iter9) {
		int d0_30 = iter9 % 1;
		if (d0_30 == 0) {
			d0_30 = 1;
		}
		int d1_30 = (iter9 - d0_30)/1 + 1;
		double tmp10= (iter9 - 8.2) * iter9 + 0.5;
		lhs_data5[(d1_30-1) + (d0_30-1)] = tmp10;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter10 = 0 ; iter10 < ndim7; iter10++)
	{
		size5 *= dim7[iter10];
	}
	Matrix *mat5 = createM(ndim7, dim7, 1);
	writeM(mat5, size5, lhs_data5);
	matrices[8] = mat5;
	Matrix * tmp11= transposeM(matrices[8]);
	matrices[8] = tmp11;
	int ndim8= 2;
	int dim8[2]= {3,3};
	matrices[9] = zerosM(ndim8, dim8);
	complex* lhs_data6 = i_to_c(matrices[9]);
	for (int iter11 = 1; iter11 <= 9; ++ iter11) {
		int d0_36 = iter11 % 1;
		if (d0_36 == 0) {
			d0_36 = 1;
		}
		int d1_36 = (iter11 - d0_36)/1 + 1;
		complex tmp12= (iter11 - 5.89) * (iter11) + ((0.5) * (4 - iter11)) * 1*I;
		lhs_data6[(d1_36-1) + (d0_36-1)] = tmp12;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter12 = 0 ; iter12 < ndim8; iter12++)
	{
		size6 *= dim8[iter12];
	}
	Matrix *mat6 = createM(ndim8, dim8, 2);
	writeM(mat6, size6, lhs_data6);
	matrices[9] = mat6;
	Matrix * tmp13= transposeM(matrices[9]);
	matrices[9] = tmp13;
	
	int ndim9 = 2;
	int dim9[2] = {3,3};
	matrices[10] = createM(ndim9, dim9, 0);
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
	
	
	int ndim10 = 2;
	int dim10[2] = {3,3};
	matrices[1] = createM(ndim10, dim10, 1);
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
	
	for (int iter13 = 1; iter13 <= 12; ++ iter13) {
		for (int iter14 = 1; iter14 <= 12; ++ iter14) {
			int d0_43 = iter13 % 11;
			if (d0_43 == 0) {
				d0_43 = 11;
			}
			int d1_43 = (iter13 - d0_43)/11 + 1;
			int d0_44 = iter14 % 11;
			if (d0_44 == 0) {
				d0_44 = 11;
			}
			int d1_44 = (iter14 - d0_44)/11 + 1;
			Matrix * tmp14= ltM(matrices[(d1_43-1) + (d0_43-1)], matrices[(d1_44-1) + (d0_44-1)]);
			printM(tmp14);
			int d0_45 = iter13 % 11;
			if (d0_45 == 0) {
				d0_45 = 11;
			}
			int d1_45 = (iter13 - d0_45)/11 + 1;
			int d0_46 = iter14 % 11;
			if (d0_46 == 0) {
				d0_46 = 11;
			}
			int d1_46 = (iter14 - d0_46)/11 + 1;
			Matrix * tmp15= leM(matrices[(d1_45-1) + (d0_45-1)], matrices[(d1_46-1) + (d0_46-1)]);
			printM(tmp15);
			int d0_47 = iter13 % 11;
			if (d0_47 == 0) {
				d0_47 = 11;
			}
			int d1_47 = (iter13 - d0_47)/11 + 1;
			int d0_48 = iter14 % 11;
			if (d0_48 == 0) {
				d0_48 = 11;
			}
			int d1_48 = (iter14 - d0_48)/11 + 1;
			Matrix * tmp16= gtM(matrices[(d1_47-1) + (d0_47-1)], matrices[(d1_48-1) + (d0_48-1)]);
			printM(tmp16);
			int d0_49 = iter13 % 11;
			if (d0_49 == 0) {
				d0_49 = 11;
			}
			int d1_49 = (iter13 - d0_49)/11 + 1;
			int d0_50 = iter14 % 11;
			if (d0_50 == 0) {
				d0_50 = 11;
			}
			int d1_50 = (iter14 - d0_50)/11 + 1;
			Matrix * tmp17= geM(matrices[(d1_49-1) + (d0_49-1)], matrices[(d1_50-1) + (d0_50-1)]);
			printM(tmp17);
			int d0_51 = iter13 % 11;
			if (d0_51 == 0) {
				d0_51 = 11;
			}
			int d1_51 = (iter13 - d0_51)/11 + 1;
			int d0_52 = iter14 % 11;
			if (d0_52 == 0) {
				d0_52 = 11;
			}
			int d1_52 = (iter14 - d0_52)/11 + 1;
			Matrix * tmp18= neM(matrices[(d1_51-1) + (d0_51-1)], matrices[(d1_52-1) + (d0_52-1)]);
			printM(tmp18);
			int d0_53 = iter13 % 11;
			if (d0_53 == 0) {
				d0_53 = 11;
			}
			int d1_53 = (iter13 - d0_53)/11 + 1;
			int d0_54 = iter14 % 11;
			if (d0_54 == 0) {
				d0_54 = 11;
			}
			int d1_54 = (iter14 - d0_54)/11 + 1;
			Matrix * tmp19= equalM(matrices[(d1_53-1) + (d0_53-1)], matrices[(d1_54-1) + (d0_54-1)]);
			printM(tmp19);
			if ((iter13 == 4 || iter13 == 7 || iter13 == 10 || iter14 == 4 || iter14 == 7 || iter14 == 10)) {
				int d0_55 = iter13 % 11;
				if (d0_55 == 0) {
					d0_55 = 11;
				}
				int d1_55 = (iter13 - d0_55)/11 + 1;
				int d0_56 = iter14 % 11;
				if (d0_56 == 0) {
					d0_56 = 11;
				}
				int d1_56 = (iter14 - d0_56)/11 + 1;
				Matrix * tmp20= maxM(matrices[(d1_55-1) + (d0_55-1)], matrices[(d1_56-1) + (d0_56-1)]);
				printM(tmp20);
				int d0_57 = iter13 % 11;
				if (d0_57 == 0) {
					d0_57 = 11;
				}
				int d1_57 = (iter13 - d0_57)/11 + 1;
				int d0_58 = iter14 % 11;
				if (d0_58 == 0) {
					d0_58 = 11;
				}
				int d1_58 = (iter14 - d0_58)/11 + 1;
				Matrix * tmp21= minM(matrices[(d1_57-1) + (d0_57-1)], matrices[(d1_58-1) + (d0_58-1)]);
				printM(tmp21);

				
				} else if ((iter13 == 6 || iter13 == 9 || iter13 == 12 || iter14 == 6 || iter14 == 9 || iter14 == 12)) {
				int d0_59 = iter13 % 11;
				if (d0_59 == 0) {
					d0_59 = 11;
				}
				int d1_59 = (iter13 - d0_59)/11 + 1;
				int d0_60 = iter14 % 11;
				if (d0_60 == 0) {
					d0_60 = 11;
				}
				int d1_60 = (iter14 - d0_60)/11 + 1;
				Matrix * tmp22= maxM(matrices[(d1_59-1) + (d0_59-1)], matrices[(d1_60-1) + (d0_60-1)]);
				printM(tmp22);
				int d0_61 = iter13 % 11;
				if (d0_61 == 0) {
					d0_61 = 11;
				}
				int d1_61 = (iter13 - d0_61)/11 + 1;
				int d0_62 = iter14 % 11;
				if (d0_62 == 0) {
					d0_62 = 11;
				}
				int d1_62 = (iter14 - d0_62)/11 + 1;
				Matrix * tmp23= minM(matrices[(d1_61-1) + (d0_61-1)], matrices[(d1_62-1) + (d0_62-1)]);
				printM(tmp23);

				
				} else {
				int d0_63 = iter13 % 11;
				if (d0_63 == 0) {
					d0_63 = 11;
				}
				int d1_63 = (iter13 - d0_63)/11 + 1;
				int d0_64 = iter14 % 11;
				if (d0_64 == 0) {
					d0_64 = 11;
				}
				int d1_64 = (iter14 - d0_64)/11 + 1;
				Matrix * tmp24= maxM(matrices[(d1_63-1) + (d0_63-1)], matrices[(d1_64-1) + (d0_64-1)]);
				printM(tmp24);
				int d0_65 = iter13 % 11;
				if (d0_65 == 0) {
					d0_65 = 11;
				}
				int d1_65 = (iter13 - d0_65)/11 + 1;
				int d0_66 = iter14 % 11;
				if (d0_66 == 0) {
					d0_66 = 11;
				}
				int d1_66 = (iter14 - d0_66)/11 + 1;
				Matrix * tmp25= minM(matrices[(d1_65-1) + (d0_65-1)], matrices[(d1_66-1) + (d0_66-1)]);
				printM(tmp25);

				
			
			}
		
		}
	
	}
	return 0;
}
