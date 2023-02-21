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
	matrices[4] = tmp6;
	int* lhs_data1 = i_to_i(matrices[4]);
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
	Matrix * tmp8 = transposeM(matrices[4]);
	matrices[4] = tmp8;
	int ndim4 = 2;
	int dim4[2] = {3,3};
	Matrix * tmp9 = zerosM(ndim4, dim4);
	matrices[5] = tmp9;
	for (int i = 1; i <= 9; ++ i) {
		int d0_11 = i % 1;
		if (d0_11 == 0) {
			d0_11 = 1;
		}
		int d1_11 = (i - d0_11)/1 + 1;
		double tmp10 = i * i + 0.5;
		lhs_data1[(d1_11-1) + (d0_11-1) ] = tmp10;
	
	}
	Matrix * tmp11 = transposeM(matrices[5]);
	matrices[5] = tmp11;
	int ndim5 = 2;
	int dim5[2] = {3,3};
	Matrix * tmp12 = zerosM(ndim5, dim5);
	matrices[6] = tmp12;
	for (int i = 1; i <= 9; ++ i) {
		int d0_15 = i % 1;
		if (d0_15 == 0) {
			d0_15 = 1;
		}
		int d1_15 = (i - d0_15)/1 + 1;
		complex tmp13 = i * i + 0.5*I;
		lhs_data1[(d1_15-1) + (d0_15-1) ] = tmp13;
	
	}
	Matrix * tmp14 = transposeM(matrices[6]);
	matrices[6] = tmp14;
	int ndim6 = 2;
	int dim6[2] = {3,3};
	Matrix * tmp15 = zerosM(ndim6, dim6);
	matrices[7] = tmp15;
	for (int i = 1; i <= 9; ++ i) {
		int d0_19 = i % 1;
		if (d0_19 == 0) {
			d0_19 = 1;
		}
		int d1_19 = (i - d0_19)/1 + 1;
		int tmp16 = (i - 5) * i;
		lhs_data1[(d1_19-1) + (d0_19-1) ] = tmp16;
	
	}
	Matrix * tmp17 = transposeM(matrices[7]);
	matrices[7] = tmp17;
	int ndim7 = 2;
	int dim7[2] = {3,3};
	Matrix * tmp18 = zerosM(ndim7, dim7);
	matrices[8] = tmp18;
	for (int i = 1; i <= 9; ++ i) {
		int d0_23 = i % 1;
		if (d0_23 == 0) {
			d0_23 = 1;
		}
		int d1_23 = (i - d0_23)/1 + 1;
		double tmp19 = (i - 8.2) * i + 0.5;
		lhs_data1[(d1_23-1) + (d0_23-1) ] = tmp19;
	
	}
	Matrix * tmp20 = transposeM(matrices[8]);
	matrices[8] = tmp20;
	int ndim8 = 2;
	int dim8[2] = {3,3};
	Matrix * tmp21 = zerosM(ndim8, dim8);
	matrices[9] = tmp21;
	for (int i = 1; i <= 9; ++ i) {
		int d0_27 = i % 1;
		if (d0_27 == 0) {
			d0_27 = 1;
		}
		int d1_27 = (i - d0_27)/1 + 1;
		complex tmp22 = (i - 5.89) * (i) + ((0.5) * (4 - i)) * 1*I;
		lhs_data1[(d1_27-1) + (d0_27-1) ] = tmp22;
	
	}
	Matrix * tmp23 = transposeM(matrices[9]);
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
			int d0_32 = i % 11;
			if (d0_32 == 0) {
				d0_32 = 11;
			}
			int d1_32 = (i - d0_32)/11 + 1;
			int d0_33 = j % 11;
			if (d0_33 == 0) {
				d0_33 = 11;
			}
			int d1_33 = (j - d0_33)/11 + 1;
			Matrix * tmp24 = ltM(matrices[(d1_32-1) + (d0_32-1) ], matrices[(d1_33-1) + (d0_33-1) ]);
			printM(tmp24);
			int d0_34 = i % 11;
			if (d0_34 == 0) {
				d0_34 = 11;
			}
			int d1_34 = (i - d0_34)/11 + 1;
			int d0_35 = j % 11;
			if (d0_35 == 0) {
				d0_35 = 11;
			}
			int d1_35 = (j - d0_35)/11 + 1;
			Matrix * tmp25 = leM(matrices[(d1_34-1) + (d0_34-1) ], matrices[(d1_35-1) + (d0_35-1) ]);
			printM(tmp25);
			int d0_36 = i % 11;
			if (d0_36 == 0) {
				d0_36 = 11;
			}
			int d1_36 = (i - d0_36)/11 + 1;
			int d0_37 = j % 11;
			if (d0_37 == 0) {
				d0_37 = 11;
			}
			int d1_37 = (j - d0_37)/11 + 1;
			Matrix * tmp26 = gtM(matrices[(d1_36-1) + (d0_36-1) ], matrices[(d1_37-1) + (d0_37-1) ]);
			printM(tmp26);
			int d0_38 = i % 11;
			if (d0_38 == 0) {
				d0_38 = 11;
			}
			int d1_38 = (i - d0_38)/11 + 1;
			int d0_39 = j % 11;
			if (d0_39 == 0) {
				d0_39 = 11;
			}
			int d1_39 = (j - d0_39)/11 + 1;
			Matrix * tmp27 = geM(matrices[(d1_38-1) + (d0_38-1) ], matrices[(d1_39-1) + (d0_39-1) ]);
			printM(tmp27);
			int d0_40 = i % 11;
			if (d0_40 == 0) {
				d0_40 = 11;
			}
			int d1_40 = (i - d0_40)/11 + 1;
			int d0_41 = j % 11;
			if (d0_41 == 0) {
				d0_41 = 11;
			}
			int d1_41 = (j - d0_41)/11 + 1;
			Matrix * tmp28 = neM(matrices[(d1_40-1) + (d0_40-1) ], matrices[(d1_41-1) + (d0_41-1) ]);
			printM(tmp28);
			int d0_42 = i % 11;
			if (d0_42 == 0) {
				d0_42 = 11;
			}
			int d1_42 = (i - d0_42)/11 + 1;
			int d0_43 = j % 11;
			if (d0_43 == 0) {
				d0_43 = 11;
			}
			int d1_43 = (j - d0_43)/11 + 1;
			Matrix * tmp29 = equalM(matrices[(d1_42-1) + (d0_42-1) ], matrices[(d1_43-1) + (d0_43-1) ]);
			printM(tmp29);
			if ((i == 4 || i == 7 || i == 10 || j == 4 || j == 7 || j == 10)) {
				int d0_44 = i % 11;
				if (d0_44 == 0) {
					d0_44 = 11;
				}
				int d1_44 = (i - d0_44)/11 + 1;
				int d0_45 = j % 11;
				if (d0_45 == 0) {
					d0_45 = 11;
				}
				int d1_45 = (j - d0_45)/11 + 1;
				Matrix * tmp30 = pairwise_maxM(matrices[(d1_44-1) + (d0_44-1) ], matrices[(d1_45-1) + (d0_45-1) ]);
				printM(tmp30);
				int d0_46 = i % 11;
				if (d0_46 == 0) {
					d0_46 = 11;
				}
				int d1_46 = (i - d0_46)/11 + 1;
				int d0_47 = j % 11;
				if (d0_47 == 0) {
					d0_47 = 11;
				}
				int d1_47 = (j - d0_47)/11 + 1;
				Matrix * tmp31 = pairwise_minM(matrices[(d1_46-1) + (d0_46-1) ], matrices[(d1_47-1) + (d0_47-1) ]);
				printM(tmp31);

				
				} else if ((i == 6 || i == 9 || i == 12 || j == 6 || j == 9 || j == 12)) {
				int d0_48 = i % 11;
				if (d0_48 == 0) {
					d0_48 = 11;
				}
				int d1_48 = (i - d0_48)/11 + 1;
				int d0_49 = j % 11;
				if (d0_49 == 0) {
					d0_49 = 11;
				}
				int d1_49 = (j - d0_49)/11 + 1;
				Matrix * tmp32 = pairwise_maxM(matrices[(d1_48-1) + (d0_48-1) ], matrices[(d1_49-1) + (d0_49-1) ]);
				printM(tmp32);
				int d0_50 = i % 11;
				if (d0_50 == 0) {
					d0_50 = 11;
				}
				int d1_50 = (i - d0_50)/11 + 1;
				int d0_51 = j % 11;
				if (d0_51 == 0) {
					d0_51 = 11;
				}
				int d1_51 = (j - d0_51)/11 + 1;
				Matrix * tmp33 = pairwise_minM(matrices[(d1_50-1) + (d0_50-1) ], matrices[(d1_51-1) + (d0_51-1) ]);
				printM(tmp33);

				
				} else {
				int d0_52 = i % 11;
				if (d0_52 == 0) {
					d0_52 = 11;
				}
				int d1_52 = (i - d0_52)/11 + 1;
				int d0_53 = j % 11;
				if (d0_53 == 0) {
					d0_53 = 11;
				}
				int d1_53 = (j - d0_53)/11 + 1;
				Matrix * tmp34 = pairwise_maxM(matrices[(d1_52-1) + (d0_52-1) ], matrices[(d1_53-1) + (d0_53-1) ]);
				printM(tmp34);
				int d0_54 = i % 11;
				if (d0_54 == 0) {
					d0_54 = 11;
				}
				int d1_54 = (i - d0_54)/11 + 1;
				int d0_55 = j % 11;
				if (d0_55 == 0) {
					d0_55 = 11;
				}
				int d1_55 = (j - d0_55)/11 + 1;
				Matrix * tmp35 = pairwise_minM(matrices[(d1_54-1) + (d0_54-1) ], matrices[(d1_55-1) + (d0_55-1) ]);
				printM(tmp35);

				
			
			}
		
		}
	
	}
	return 0;
}
