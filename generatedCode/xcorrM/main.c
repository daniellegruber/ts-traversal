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
	matrices[4] = tmp6;
	int* lhs_data1 = i_to_i(matrices[4]);
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
	matrices[4] = matrices[4];
	int ndim6 = 2;
	int dim6[2] = {1, 10};
	Matrix * tmp8 = zerosM(ndim6, dim6);
	matrices[5] = tmp8;
	for (int i = 1; i <= 10; ++ i) {
		int d0_11 = i % 1;
		if (d0_11 == 0) {
			d0_11 = 1;
		}
		int d1_11 = (i - d0_11)/1 + 1;
		double tmp9 = i * i + 0.5;
		lhs_data1[(d1_11-1) + (d0_11-1) ] = tmp9;
	
	}
	matrices[5] = matrices[5];
	int ndim7 = 2;
	int dim7[2] = {20, 1};
	Matrix * tmp10 = onesM(ndim7, dim7);
	matrices[6] = tmp10;
	for (int i = 1; i <= 20; ++ i) {
		int d0_15 = i % 1;
		if (d0_15 == 0) {
			d0_15 = 1;
		}
		int d1_15 = (i - d0_15)/1 + 1;
		complex tmp11 = i * i + 0.5*I;
		lhs_data1[(d1_15-1) + (d0_15-1) ] = tmp11;
	
	}
	matrices[6] = matrices[6];
	int ndim8 = 2;
	int dim8[2] = {20, 1};
	Matrix * tmp12 = onesM(ndim8, dim8);
	matrices[7] = tmp12;
	for (int i = 1; i <= 20; ++ i) {
		int d0_19 = i % 1;
		if (d0_19 == 0) {
			d0_19 = 1;
		}
		int d1_19 = (i - d0_19)/1 + 1;
		int tmp13 = (i - 5) * i;
		lhs_data1[(d1_19-1) + (d0_19-1) ] = tmp13;
	
	}
	matrices[7] = matrices[7];
	int ndim9 = 2;
	int dim9[2] = {20, 1};
	Matrix * tmp14 = onesM(ndim9, dim9);
	matrices[8] = tmp14;
	for (int i = 1; i <= 20; ++ i) {
		int d0_23 = i % 1;
		if (d0_23 == 0) {
			d0_23 = 1;
		}
		int d1_23 = (i - d0_23)/1 + 1;
		double tmp15 = (i - 8.5) * i + 0.5;
		lhs_data1[(d1_23-1) + (d0_23-1) ] = tmp15;
	
	}
	matrices[8] = matrices[8];
	int ndim10 = 2;
	int dim10[2] = {1, 10};
	Matrix * tmp16 = zerosM(ndim10, dim10);
	matrices[9] = tmp16;
	for (int i = 1; i <= 10; ++ i) {
		int d0_27 = i % 1;
		if (d0_27 == 0) {
			d0_27 = 1;
		}
		int d1_27 = (i - d0_27)/1 + 1;
		complex tmp17 = (i - 5.5) * (i) + ((0.5) * (4 - i)) * 1*I;
		lhs_data1[(d1_27-1) + (d0_27-1) ] = tmp17;
	
	}
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
		int d0_32 = index % 11;
		if (d0_32 == 0) {
			d0_32 = 11;
		}
		int d1_32 = (index - d0_32)/11 + 1;
		printM(matrices[(d1_32-1) + (d0_32-1) ]);
		for (int j = 1; j <= 12; ++ j) {
			printf("\n%s\n", "j\n");
			int d0_33 = j % 11;
			if (d0_33 == 0) {
				d0_33 = 11;
			}
			int d1_33 = (j - d0_33)/11 + 1;
			printM(matrices[(d1_33-1) + (d0_33-1) ]);
			printf("\n%s\n", "\n\n");
			int d0_34 = index % 11;
			if (d0_34 == 0) {
				d0_34 = 11;
			}
			int d1_34 = (index - d0_34)/11 + 1;
			int d0_35 = j % 11;
			if (d0_35 == 0) {
				d0_35 = 11;
			}
			int d1_35 = (j - d0_35)/11 + 1;
			Matrix * tmp18 = xcorrM(matrices[(d1_34-1) + (d0_34-1) ], matrices[(d1_35-1) + (d0_35-1) ], 0, "none");
			printM(tmp18);
			int d0_36 = index % 11;
			if (d0_36 == 0) {
				d0_36 = 11;
			}
			int d1_36 = (index - d0_36)/11 + 1;
			int * tmp19 = getDimsM(matrices[(d1_36-1) + (d0_36-1) ]);
			int d0_37 = index % 11;
			if (d0_37 == 0) {
				d0_37 = 11;
			}
			int d1_37 = (index - d0_37)/11 + 1;
			int * tmp20 = getDimsM(matrices[(d1_37-1) + (d0_37-1) ]);
			int d0_38 = j % 11;
			if (d0_38 == 0) {
				d0_38 = 11;
			}
			int d1_38 = (j - d0_38)/11 + 1;
			int * tmp21 = getDimsM(matrices[(d1_38-1) + (d0_38-1) ]);
			int d0_39 = j % 11;
			if (d0_39 == 0) {
				d0_39 = 11;
			}
			int d1_39 = (j - d0_39)/11 + 1;
			int * tmp22 = getDimsM(matrices[(d1_39-1) + (d0_39-1) ]);
			if ((index > 1 && j > 1 && tmp19[0] * tmp20[1] == tmp21[0] * tmp22[1])) {
				int d0_40 = index % 11;
				if (d0_40 == 0) {
					d0_40 = 11;
				}
				int d1_40 = (index - d0_40)/11 + 1;
				int d0_41 = j % 11;
				if (d0_41 == 0) {
					d0_41 = 11;
				}
				int d1_41 = (j - d0_41)/11 + 1;
				Matrix * tmp23 = xcorrM(matrices[(d1_40-1) + (d0_40-1) ], matrices[(d1_41-1) + (d0_41-1) ], 0, "unbiased");
				printM(tmp23);
				int d0_42 = index % 11;
				if (d0_42 == 0) {
					d0_42 = 11;
				}
				int d1_42 = (index - d0_42)/11 + 1;
				int d0_43 = j % 11;
				if (d0_43 == 0) {
					d0_43 = 11;
				}
				int d1_43 = (j - d0_43)/11 + 1;
				Matrix * tmp24 = xcorrM(matrices[(d1_42-1) + (d0_42-1) ], matrices[(d1_43-1) + (d0_43-1) ], 0, "biased");
				printM(tmp24);
				int d0_44 = index % 11;
				if (d0_44 == 0) {
					d0_44 = 11;
				}
				int d1_44 = (index - d0_44)/11 + 1;
				int d0_45 = j % 11;
				if (d0_45 == 0) {
					d0_45 = 11;
				}
				int d1_45 = (j - d0_45)/11 + 1;
				Matrix * tmp25 = xcorrM(matrices[(d1_44-1) + (d0_44-1) ], matrices[(d1_45-1) + (d0_45-1) ], 0, "coeff");
				printM(tmp25);
				
				
				
			
			}
			for (int k = 9; k <= 21; ++ k) {
				int d0_46 = index % 11;
				if (d0_46 == 0) {
					d0_46 = 11;
				}
				int d1_46 = (index - d0_46)/11 + 1;
				int d0_47 = j % 11;
				if (d0_47 == 0) {
					d0_47 = 11;
				}
				int d1_47 = (j - d0_47)/11 + 1;
				Matrix * tmp26 = xcorrM(matrices[(d1_46-1) + (d0_46-1) ], matrices[(d1_47-1) + (d0_47-1) ], k, "none");
				printM(tmp26);
				int d0_48 = index % 11;
				if (d0_48 == 0) {
					d0_48 = 11;
				}
				int d1_48 = (index - d0_48)/11 + 1;
				int * tmp27 = getDimsM(matrices[(d1_48-1) + (d0_48-1) ]);
				int d0_49 = index % 11;
				if (d0_49 == 0) {
					d0_49 = 11;
				}
				int d1_49 = (index - d0_49)/11 + 1;
				int * tmp28 = getDimsM(matrices[(d1_49-1) + (d0_49-1) ]);
				int d0_50 = j % 11;
				if (d0_50 == 0) {
					d0_50 = 11;
				}
				int d1_50 = (j - d0_50)/11 + 1;
				int * tmp29 = getDimsM(matrices[(d1_50-1) + (d0_50-1) ]);
				int d0_51 = j % 11;
				if (d0_51 == 0) {
					d0_51 = 11;
				}
				int d1_51 = (j - d0_51)/11 + 1;
				int * tmp30 = getDimsM(matrices[(d1_51-1) + (d0_51-1) ]);
				if ((index > 1 && j > 1 && tmp27[0] * tmp28[1] == tmp29[0] * tmp30[1])) {
					int d0_52 = index % 11;
					if (d0_52 == 0) {
						d0_52 = 11;
					}
					int d1_52 = (index - d0_52)/11 + 1;
					int d0_53 = j % 11;
					if (d0_53 == 0) {
						d0_53 = 11;
					}
					int d1_53 = (j - d0_53)/11 + 1;
					Matrix * tmp31 = xcorrM(matrices[(d1_52-1) + (d0_52-1) ], matrices[(d1_53-1) + (d0_53-1) ], k, "unbiased");
					printM(tmp31);
					int d0_54 = index % 11;
					if (d0_54 == 0) {
						d0_54 = 11;
					}
					int d1_54 = (index - d0_54)/11 + 1;
					int d0_55 = j % 11;
					if (d0_55 == 0) {
						d0_55 = 11;
					}
					int d1_55 = (j - d0_55)/11 + 1;
					Matrix * tmp32 = xcorrM(matrices[(d1_54-1) + (d0_54-1) ], matrices[(d1_55-1) + (d0_55-1) ], k, "biased");
					printM(tmp32);
					int d0_56 = index % 11;
					if (d0_56 == 0) {
						d0_56 = 11;
					}
					int d1_56 = (index - d0_56)/11 + 1;
					int d0_57 = j % 11;
					if (d0_57 == 0) {
						d0_57 = 11;
					}
					int d1_57 = (j - d0_57)/11 + 1;
					Matrix * tmp33 = xcorrM(matrices[(d1_56-1) + (d0_56-1) ], matrices[(d1_57-1) + (d0_57-1) ], k, "coeff");
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
