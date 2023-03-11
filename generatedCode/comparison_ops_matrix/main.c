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
	int dim1[2] = {3,3};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	matrices[0] = tmp1;
	int ndim2 = 2;
	int dim2[2] = {3,3};
	Matrix * tmp2 = onesM(ndim2, dim2);
	matrices[1] = tmp2;
	Matrix * tmp3 = identityM(3);
	matrices[2] = tmp3;
	Matrix * tmp4 = identityM(3);
	complex scalar1 = (4.2 - 0.03*I);
	Matrix * tmp5 = scaleM(tmp4, &scalar1, 2);
	matrices[3] = tmp5;
	int ndim3 = 2;
	int dim3[2] = {3,3};
	Matrix * tmp6 = zerosM(ndim3, dim3);
	int* lhs_data1 = i_to_i(tmp6);
	matrices[4] = tmp6;
	for (int i = 1; i <= 9; ++ i) {
		int d0_6 = i % 1;
		if (d0_6 == 0) {
			d0_6 = 1;
		}
		int d1_6 = (i - d0_6)/1 + 1;
		int tmp7 = i * i;
		lhs_data1[(d1_6-1) + (d0_6-1) ] = tmp7;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim3; iter1++)
	{
		size1 *= dim3[iter1];
	}
	Matrix *mat1 = createM(ndim3, dim3, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp8 = transposeM(tmp6);
	matrices[4] = tmp8;
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp9 = zerosM(ndim4, dim4);
	double* lhs_data2 = i_to_d(tmp9);
	matrices[5] = tmp9;
	for (int i = 1; i <= 9; ++ i) {
		int d0_11 = i % 1;
		if (d0_11 == 0) {
			d0_11 = 1;
		}
		int d1_11 = (i - d0_11)/1 + 1;
		double tmp10 = i * i + 0.5;
		lhs_data2[(d1_11-1) + (d0_11-1) ] = tmp10;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim4; iter2++)
	{
		size2 *= dim4[iter2];
	}
	Matrix *mat2 = createM(ndim4, dim4, 1);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp11 = transposeM(tmp9);
	matrices[5] = tmp11;
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp12 = zerosM(ndim5, dim5);
	complex* lhs_data3 = i_to_c(tmp12);
	matrices[6] = tmp12;
	for (int i = 1; i <= 9; ++ i) {
		int d0_16 = i % 1;
		if (d0_16 == 0) {
			d0_16 = 1;
		}
		int d1_16 = (i - d0_16)/1 + 1;
		complex tmp13 = i * i + 0.5*I;
		lhs_data3[(d1_16-1) + (d0_16-1) ] = tmp13;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim5; iter3++)
	{
		size3 *= dim5[iter3];
	}
	Matrix *mat3 = createM(ndim5, dim5, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp14 = transposeM(tmp12);
	matrices[6] = tmp14;
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp15 = zerosM(ndim6, dim6);
	int* lhs_data4 = i_to_i(tmp15);
	matrices[7] = tmp15;
	for (int i = 1; i <= 9; ++ i) {
		int d0_21 = i % 1;
		if (d0_21 == 0) {
			d0_21 = 1;
		}
		int d1_21 = (i - d0_21)/1 + 1;
		int tmp16 = (i - 5) * i;
		lhs_data4[(d1_21-1) + (d0_21-1) ] = tmp16;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim6; iter4++)
	{
		size4 *= dim6[iter4];
	}
	Matrix *mat4 = createM(ndim6, dim6, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp17 = transposeM(tmp15);
	matrices[7] = tmp17;
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp18 = zerosM(ndim7, dim7);
	double* lhs_data5 = i_to_d(tmp18);
	matrices[8] = tmp18;
	for (int i = 1; i <= 9; ++ i) {
		int d0_26 = i % 1;
		if (d0_26 == 0) {
			d0_26 = 1;
		}
		int d1_26 = (i - d0_26)/1 + 1;
		double tmp19 = (i - 8.2) * i + 0.5;
		lhs_data5[(d1_26-1) + (d0_26-1) ] = tmp19;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim7; iter5++)
	{
		size5 *= dim7[iter5];
	}
	Matrix *mat5 = createM(ndim7, dim7, 1);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp20 = transposeM(tmp18);
	matrices[8] = tmp20;
	int ndim8 = 2;
	int dim8[2] = {3,3};
	Matrix * tmp21 = zerosM(ndim8, dim8);
	complex* lhs_data6 = i_to_c(tmp21);
	matrices[9] = tmp21;
	for (int i = 1; i <= 9; ++ i) {
		int d0_31 = i % 1;
		if (d0_31 == 0) {
			d0_31 = 1;
		}
		int d1_31 = (i - d0_31)/1 + 1;
		complex tmp22 = (i - 5.89) * (i) + ((0.5) * (4 - i)) * 1*I;
		lhs_data6[(d1_31-1) + (d0_31-1) ] = tmp22;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim8; iter6++)
	{
		size6 *= dim8[iter6];
	}
	Matrix *mat6 = createM(ndim8, dim8, 2);
	writeM(mat6, size6, lhs_data6);
	Matrix * tmp23 = transposeM(tmp21);
	matrices[9] = tmp23;
	
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
	
	for (int i = 1; i <= 12; ++ i) {
		for (int j = 1; j <= 12; ++ j) {
			int d0_37 = i % 11;
			if (d0_37 == 0) {
				d0_37 = 11;
			}
			int d1_37 = (i - d0_37)/11 + 1;
			int d0_38 = j % 11;
			if (d0_38 == 0) {
				d0_38 = 11;
			}
			int d1_38 = (j - d0_38)/11 + 1;
			Matrix * tmp24 = ltM(matrices[(d1_37-1) + (d0_37-1) ], matrices[(d1_38-1) + (d0_38-1) ]);
			printM(tmp24);
			int d0_39 = i % 11;
			if (d0_39 == 0) {
				d0_39 = 11;
			}
			int d1_39 = (i - d0_39)/11 + 1;
			int d0_40 = j % 11;
			if (d0_40 == 0) {
				d0_40 = 11;
			}
			int d1_40 = (j - d0_40)/11 + 1;
			Matrix * tmp25 = leM(matrices[(d1_39-1) + (d0_39-1) ], matrices[(d1_40-1) + (d0_40-1) ]);
			printM(tmp25);
			int d0_41 = i % 11;
			if (d0_41 == 0) {
				d0_41 = 11;
			}
			int d1_41 = (i - d0_41)/11 + 1;
			int d0_42 = j % 11;
			if (d0_42 == 0) {
				d0_42 = 11;
			}
			int d1_42 = (j - d0_42)/11 + 1;
			Matrix * tmp26 = gtM(matrices[(d1_41-1) + (d0_41-1) ], matrices[(d1_42-1) + (d0_42-1) ]);
			printM(tmp26);
			int d0_43 = i % 11;
			if (d0_43 == 0) {
				d0_43 = 11;
			}
			int d1_43 = (i - d0_43)/11 + 1;
			int d0_44 = j % 11;
			if (d0_44 == 0) {
				d0_44 = 11;
			}
			int d1_44 = (j - d0_44)/11 + 1;
			Matrix * tmp27 = geM(matrices[(d1_43-1) + (d0_43-1) ], matrices[(d1_44-1) + (d0_44-1) ]);
			printM(tmp27);
			int d0_45 = i % 11;
			if (d0_45 == 0) {
				d0_45 = 11;
			}
			int d1_45 = (i - d0_45)/11 + 1;
			int d0_46 = j % 11;
			if (d0_46 == 0) {
				d0_46 = 11;
			}
			int d1_46 = (j - d0_46)/11 + 1;
			Matrix * tmp28 = neM(matrices[(d1_45-1) + (d0_45-1) ], matrices[(d1_46-1) + (d0_46-1) ]);
			printM(tmp28);
			int d0_47 = i % 11;
			if (d0_47 == 0) {
				d0_47 = 11;
			}
			int d1_47 = (i - d0_47)/11 + 1;
			int d0_48 = j % 11;
			if (d0_48 == 0) {
				d0_48 = 11;
			}
			int d1_48 = (j - d0_48)/11 + 1;
			Matrix * tmp29 = equalM(matrices[(d1_47-1) + (d0_47-1) ], matrices[(d1_48-1) + (d0_48-1) ]);
			printM(tmp29);
			if ((i == 4 || i == 7 || i == 10 || j == 4 || j == 7 || j == 10)) {
				int d0_49 = i % 11;
				if (d0_49 == 0) {
					d0_49 = 11;
				}
				int d1_49 = (i - d0_49)/11 + 1;
				int d0_50 = j % 11;
				if (d0_50 == 0) {
					d0_50 = 11;
				}
				int d1_50 = (j - d0_50)/11 + 1;
				Matrix * tmp30 = pairwise_maxM(matrices[(d1_49-1) + (d0_49-1) ], matrices[(d1_50-1) + (d0_50-1) ]);
				printM(tmp30);
				int d0_51 = i % 11;
				if (d0_51 == 0) {
					d0_51 = 11;
				}
				int d1_51 = (i - d0_51)/11 + 1;
				int d0_52 = j % 11;
				if (d0_52 == 0) {
					d0_52 = 11;
				}
				int d1_52 = (j - d0_52)/11 + 1;
				Matrix * tmp31 = pairwise_minM(matrices[(d1_51-1) + (d0_51-1) ], matrices[(d1_52-1) + (d0_52-1) ]);
				printM(tmp31);

				
				} else if ((i == 6 || i == 9 || i == 12 || j == 6 || j == 9 || j == 12)) {
				int d0_53 = i % 11;
				if (d0_53 == 0) {
					d0_53 = 11;
				}
				int d1_53 = (i - d0_53)/11 + 1;
				int d0_54 = j % 11;
				if (d0_54 == 0) {
					d0_54 = 11;
				}
				int d1_54 = (j - d0_54)/11 + 1;
				Matrix * tmp32 = pairwise_maxM(matrices[(d1_53-1) + (d0_53-1) ], matrices[(d1_54-1) + (d0_54-1) ]);
				printM(tmp32);
				int d0_55 = i % 11;
				if (d0_55 == 0) {
					d0_55 = 11;
				}
				int d1_55 = (i - d0_55)/11 + 1;
				int d0_56 = j % 11;
				if (d0_56 == 0) {
					d0_56 = 11;
				}
				int d1_56 = (j - d0_56)/11 + 1;
				Matrix * tmp33 = pairwise_minM(matrices[(d1_55-1) + (d0_55-1) ], matrices[(d1_56-1) + (d0_56-1) ]);
				printM(tmp33);

				
				} else {
				int d0_57 = i % 11;
				if (d0_57 == 0) {
					d0_57 = 11;
				}
				int d1_57 = (i - d0_57)/11 + 1;
				int d0_58 = j % 11;
				if (d0_58 == 0) {
					d0_58 = 11;
				}
				int d1_58 = (j - d0_58)/11 + 1;
				Matrix * tmp34 = pairwise_maxM(matrices[(d1_57-1) + (d0_57-1) ], matrices[(d1_58-1) + (d0_58-1) ]);
				printM(tmp34);
				int d0_59 = i % 11;
				if (d0_59 == 0) {
					d0_59 = 11;
				}
				int d1_59 = (i - d0_59)/11 + 1;
				int d0_60 = j % 11;
				if (d0_60 == 0) {
					d0_60 = 11;
				}
				int d1_60 = (j - d0_60)/11 + 1;
				Matrix * tmp35 = pairwise_minM(matrices[(d1_59-1) + (d0_59-1) ], matrices[(d1_60-1) + (d0_60-1) ]);
				printM(tmp35);

				
			
			}
		
		}
	
	}
	return 0;
}
