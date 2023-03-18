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
	//pkg load signal;
	
	Matrix **matrices = NULL;
	matrices = malloc(11*sizeof(*matrices));
		        
	int ndim1 = 2;
	int dim1[2] = {1, 10};
	Matrix * tmp1 = zerosM(ndim1, dim1);
	matrices[0] = tmp1;
	int ndim2 = 2;
	int dim2[2] = {20, 1};
	Matrix * tmp2 = onesM(ndim2, dim2);
	matrices[1] = tmp2;
	int ndim3 = 2;
	int dim3[2] = {1, 10};
	Matrix * tmp3 = onesM(ndim3, dim3);
	matrices[2] = tmp3;
	int ndim4 = 2;
	int dim4[2] = {20, 1};
	Matrix * tmp4 = onesM(ndim4, dim4);
	complex scalar1 = (4.5 - 0.5*I);
	Matrix * tmp5 = scaleM(tmp4, &scalar1, 2);
	matrices[3] = tmp5;
	int ndim5 = 2;
	int dim5[2] = {1, 10};
	Matrix * tmp6 = zerosM(ndim5, dim5);
	int* lhs_data1 = i_to_i(tmp6);
	matrices[4] = tmp6;
	for (int i = 1; i <= 10; ++ i) {
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
	for (int iter1 = 0 ; iter1 < ndim5; iter1++)
	{
		size1 *= dim5[iter1];
	}
	Matrix *mat1 = createM(ndim5, dim5, 0);
	writeM(mat1, size1, lhs_data1);
	matrices[4] = tmp6;
	int ndim6 = 2;
	int dim6[2] = {1, 10};
	Matrix * tmp8 = zerosM(ndim6, dim6);
	double* lhs_data2 = i_to_d(tmp8);
	matrices[5] = tmp8;
	for (int i = 1; i <= 10; ++ i) {
		int d0_11 = i % 1;
		if (d0_11 == 0) {
			d0_11 = 1;
		}
		int d1_11 = (i - d0_11)/1 + 1;
		double tmp9 = i * i + 0.5;
		lhs_data2[(d1_11-1) + (d0_11-1) ] = tmp9;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim6; iter2++)
	{
		size2 *= dim6[iter2];
	}
	Matrix *mat2 = createM(ndim6, dim6, 1);
	writeM(mat2, size2, lhs_data2);
	matrices[5] = tmp8;
	int ndim7 = 2;
	int dim7[2] = {20, 1};
	Matrix * tmp10 = onesM(ndim7, dim7);
	complex* lhs_data3 = i_to_c(tmp10);
	matrices[6] = tmp10;
	for (int i = 1; i <= 20; ++ i) {
		int d0_16 = i % 1;
		if (d0_16 == 0) {
			d0_16 = 1;
		}
		int d1_16 = (i - d0_16)/1 + 1;
		complex tmp11 = i * i + 0.5*I;
		lhs_data3[(d1_16-1) + (d0_16-1) ] = tmp11;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim7; iter3++)
	{
		size3 *= dim7[iter3];
	}
	Matrix *mat3 = createM(ndim7, dim7, 2);
	writeM(mat3, size3, lhs_data3);
	matrices[6] = tmp10;
	int ndim8 = 2;
	int dim8[2] = {20, 1};
	Matrix * tmp12 = onesM(ndim8, dim8);
	int* lhs_data4 = i_to_i(tmp12);
	matrices[7] = tmp12;
	for (int i = 1; i <= 20; ++ i) {
		int d0_21 = i % 1;
		if (d0_21 == 0) {
			d0_21 = 1;
		}
		int d1_21 = (i - d0_21)/1 + 1;
		int tmp13 = (i - 5) * i;
		lhs_data4[(d1_21-1) + (d0_21-1) ] = tmp13;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter4 = 0 ; iter4 < ndim8; iter4++)
	{
		size4 *= dim8[iter4];
	}
	Matrix *mat4 = createM(ndim8, dim8, 0);
	writeM(mat4, size4, lhs_data4);
	matrices[7] = tmp12;
	int ndim9 = 2;
	int dim9[2] = {20, 1};
	Matrix * tmp14 = onesM(ndim9, dim9);
	double* lhs_data5 = i_to_d(tmp14);
	matrices[8] = tmp14;
	for (int i = 1; i <= 20; ++ i) {
		int d0_26 = i % 1;
		if (d0_26 == 0) {
			d0_26 = 1;
		}
		int d1_26 = (i - d0_26)/1 + 1;
		double tmp15 = (i - 8.5) * i + 0.5;
		lhs_data5[(d1_26-1) + (d0_26-1) ] = tmp15;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter5 = 0 ; iter5 < ndim9; iter5++)
	{
		size5 *= dim9[iter5];
	}
	Matrix *mat5 = createM(ndim9, dim9, 1);
	writeM(mat5, size5, lhs_data5);
	matrices[8] = tmp14;
	int ndim10 = 2;
	int dim10[2] = {1, 10};
	Matrix * tmp16 = zerosM(ndim10, dim10);
	complex* lhs_data6 = i_to_c(tmp16);
	matrices[9] = tmp16;
	for (int i = 1; i <= 10; ++ i) {
		int d0_31 = i % 1;
		if (d0_31 == 0) {
			d0_31 = 1;
		}
		int d1_31 = (i - d0_31)/1 + 1;
		complex tmp17 = (i - 5.5) * (i) + ((0.5) * (4 - i)) * 1*I;
		lhs_data6[(d1_31-1) + (d0_31-1) ] = tmp17;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter6 = 0 ; iter6 < ndim10; iter6++)
	{
		size6 *= dim10[iter6];
	}
	Matrix *mat6 = createM(ndim10, dim10, 2);
	writeM(mat6, size6, lhs_data6);
	matrices[9] = tmp16;
	
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
	matrices[1] = createM(ndim12, dim12, 1);
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
	writeM( matrices[1], 10, input2);
	free(input2);
	
	for (int index = 1; index <= 12; ++ index) {
		printf("\n%s\n", "i\n");
		int d0_37 = index % 11;
		if (d0_37 == 0) {
			d0_37 = 11;
		}
		int d1_37 = (index - d0_37)/11 + 1;
		printM(matrices[(d1_37-1) + (d0_37-1) ]);
		for (int j = 1; j <= 12; ++ j) {
			printf("\n%s\n", "j\n");
			int d0_38 = j % 11;
			if (d0_38 == 0) {
				d0_38 = 11;
			}
			int d1_38 = (j - d0_38)/11 + 1;
			printM(matrices[(d1_38-1) + (d0_38-1) ]);
			printf("\n%s\n", "\n\n");
			int d0_39 = index % 11;
			if (d0_39 == 0) {
				d0_39 = 11;
			}
			int d1_39 = (index - d0_39)/11 + 1;
			int d0_40 = j % 11;
			if (d0_40 == 0) {
				d0_40 = 11;
			}
			int d1_40 = (j - d0_40)/11 + 1;
			Matrix * tmp18 = xcorrM(matrices[(d1_39-1) + (d0_39-1) ], matrices[(d1_40-1) + (d0_40-1) ], 0, "none");
			printM(tmp18);
			int d0_41 = index % 11;
			if (d0_41 == 0) {
				d0_41 = 11;
			}
			int d1_41 = (index - d0_41)/11 + 1;
			int * tmp19 = getDimsM(matrices[(d1_41-1) + (d0_41-1) ]);
			int d0_42 = index % 11;
			if (d0_42 == 0) {
				d0_42 = 11;
			}
			int d1_42 = (index - d0_42)/11 + 1;
			int * tmp20 = getDimsM(matrices[(d1_42-1) + (d0_42-1) ]);
			int d0_43 = j % 11;
			if (d0_43 == 0) {
				d0_43 = 11;
			}
			int d1_43 = (j - d0_43)/11 + 1;
			int * tmp21 = getDimsM(matrices[(d1_43-1) + (d0_43-1) ]);
			int d0_44 = j % 11;
			if (d0_44 == 0) {
				d0_44 = 11;
			}
			int d1_44 = (j - d0_44)/11 + 1;
			int * tmp22 = getDimsM(matrices[(d1_44-1) + (d0_44-1) ]);
			if ((index > 1 && j > 1 && tmp19[0] * tmp20[1] == tmp21[0] * tmp22[1])) {
				int d0_45 = index % 11;
				if (d0_45 == 0) {
					d0_45 = 11;
				}
				int d1_45 = (index - d0_45)/11 + 1;
				int d0_46 = j % 11;
				if (d0_46 == 0) {
					d0_46 = 11;
				}
				int d1_46 = (j - d0_46)/11 + 1;
				Matrix * tmp23 = xcorrM(matrices[(d1_45-1) + (d0_45-1) ], matrices[(d1_46-1) + (d0_46-1) ], 0, "unbiased");
				printM(tmp23);
				int d0_47 = index % 11;
				if (d0_47 == 0) {
					d0_47 = 11;
				}
				int d1_47 = (index - d0_47)/11 + 1;
				int d0_48 = j % 11;
				if (d0_48 == 0) {
					d0_48 = 11;
				}
				int d1_48 = (j - d0_48)/11 + 1;
				Matrix * tmp24 = xcorrM(matrices[(d1_47-1) + (d0_47-1) ], matrices[(d1_48-1) + (d0_48-1) ], 0, "biased");
				printM(tmp24);
				int d0_49 = index % 11;
				if (d0_49 == 0) {
					d0_49 = 11;
				}
				int d1_49 = (index - d0_49)/11 + 1;
				int d0_50 = j % 11;
				if (d0_50 == 0) {
					d0_50 = 11;
				}
				int d1_50 = (j - d0_50)/11 + 1;
				Matrix * tmp25 = xcorrM(matrices[(d1_49-1) + (d0_49-1) ], matrices[(d1_50-1) + (d0_50-1) ], 0, "coeff");
				printM(tmp25);
				
				
				
			
			}
			for (int k = 9; k <= 21; ++ k) {
				int d0_51 = index % 11;
				if (d0_51 == 0) {
					d0_51 = 11;
				}
				int d1_51 = (index - d0_51)/11 + 1;
				int d0_52 = j % 11;
				if (d0_52 == 0) {
					d0_52 = 11;
				}
				int d1_52 = (j - d0_52)/11 + 1;
				Matrix * tmp26 = xcorrM(matrices[(d1_51-1) + (d0_51-1) ], matrices[(d1_52-1) + (d0_52-1) ], k, "none");
				printM(tmp26);
				int d0_53 = index % 11;
				if (d0_53 == 0) {
					d0_53 = 11;
				}
				int d1_53 = (index - d0_53)/11 + 1;
				int * tmp27 = getDimsM(matrices[(d1_53-1) + (d0_53-1) ]);
				int d0_54 = index % 11;
				if (d0_54 == 0) {
					d0_54 = 11;
				}
				int d1_54 = (index - d0_54)/11 + 1;
				int * tmp28 = getDimsM(matrices[(d1_54-1) + (d0_54-1) ]);
				int d0_55 = j % 11;
				if (d0_55 == 0) {
					d0_55 = 11;
				}
				int d1_55 = (j - d0_55)/11 + 1;
				int * tmp29 = getDimsM(matrices[(d1_55-1) + (d0_55-1) ]);
				int d0_56 = j % 11;
				if (d0_56 == 0) {
					d0_56 = 11;
				}
				int d1_56 = (j - d0_56)/11 + 1;
				int * tmp30 = getDimsM(matrices[(d1_56-1) + (d0_56-1) ]);
				if ((index > 1 && j > 1 && tmp27[0] * tmp28[1] == tmp29[0] * tmp30[1])) {
					int d0_57 = index % 11;
					if (d0_57 == 0) {
						d0_57 = 11;
					}
					int d1_57 = (index - d0_57)/11 + 1;
					int d0_58 = j % 11;
					if (d0_58 == 0) {
						d0_58 = 11;
					}
					int d1_58 = (j - d0_58)/11 + 1;
					Matrix * tmp31 = xcorrM(matrices[(d1_57-1) + (d0_57-1) ], matrices[(d1_58-1) + (d0_58-1) ], k, "unbiased");
					printM(tmp31);
					int d0_59 = index % 11;
					if (d0_59 == 0) {
						d0_59 = 11;
					}
					int d1_59 = (index - d0_59)/11 + 1;
					int d0_60 = j % 11;
					if (d0_60 == 0) {
						d0_60 = 11;
					}
					int d1_60 = (j - d0_60)/11 + 1;
					Matrix * tmp32 = xcorrM(matrices[(d1_59-1) + (d0_59-1) ], matrices[(d1_60-1) + (d0_60-1) ], k, "biased");
					printM(tmp32);
					int d0_61 = index % 11;
					if (d0_61 == 0) {
						d0_61 = 11;
					}
					int d1_61 = (index - d0_61)/11 + 1;
					int d0_62 = j % 11;
					if (d0_62 == 0) {
						d0_62 = 11;
					}
					int d1_62 = (j - d0_62)/11 + 1;
					Matrix * tmp33 = xcorrM(matrices[(d1_61-1) + (d0_61-1) ], matrices[(d1_62-1) + (d0_62-1) ], k, "coeff");
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
