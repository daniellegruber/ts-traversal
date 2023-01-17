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
		        
	int ndim1= 2;
	int dim1[2]= {1, 10};
	matrices[0] = zerosM(ndim1, dim1);
	int ndim2= 2;
	int dim2[2]= {20, 1};
	matrices[1] = onesM(ndim2, dim2);
	int ndim3= 2;
	int dim3[2]= {1, 10};
	matrices[2] = onesM(ndim3, dim3);
	int ndim4= 2;
	int dim4[2]= {20, 1};
	complex scalar1= (4.5 - 0.5*I);
	Matrix * tmp1= scaleM(onesM(ndim4, dim4), &scalar1, 2);
	matrices[3] = tmp1;
	int ndim5= 2;
	int dim5[2]= {1, 10};
	matrices[4] = zerosM(ndim5, dim5);
	int* lhs_data1 = i_to_i(matrices[4]);
	for (int iter1 = 1; iter1 <= 10; ++ iter1) {
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
	for (int iter2 = 0 ; iter2 < ndim5; iter2++)
	{
		size1 *= dim5[iter2];
	}
	Matrix *mat1 = createM(ndim5, dim5, 0);
	writeM(mat1, size1, lhs_data1);
	matrices[4] = mat1;
	matrices[4] = matrices[4];
	int ndim6= 2;
	int dim6[2]= {1, 10};
	matrices[5] = zerosM(ndim6, dim6);
	double* lhs_data2 = i_to_d(matrices[5]);
	for (int iter3 = 1; iter3 <= 10; ++ iter3) {
		int d0_12 = iter3 % 1;
		if (d0_12 == 0) {
			d0_12 = 1;
		}
		int d1_12 = (iter3 - d0_12)/1 + 1;
		double tmp3= iter3 * iter3 + 0.5;
		lhs_data2[(d1_12-1) + (d0_12-1)] = tmp3;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim6; iter4++)
	{
		size2 *= dim6[iter4];
	}
	Matrix *mat2 = createM(ndim6, dim6, 1);
	writeM(mat2, size2, lhs_data2);
	matrices[5] = mat2;
	matrices[5] = matrices[5];
	int ndim7= 2;
	int dim7[2]= {20, 1};
	matrices[6] = onesM(ndim7, dim7);
	complex* lhs_data3 = i_to_c(matrices[6]);
	for (int iter5 = 1; iter5 <= 20; ++ iter5) {
		int d0_18 = iter5 % 1;
		if (d0_18 == 0) {
			d0_18 = 1;
		}
		int d1_18 = (iter5 - d0_18)/1 + 1;
		complex tmp4= iter5 * iter5 + 0.5*I;
		lhs_data3[(d1_18-1) + (d0_18-1)] = tmp4;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim7; iter6++)
	{
		size3 *= dim7[iter6];
	}
	Matrix *mat3 = createM(ndim7, dim7, 2);
	writeM(mat3, size3, lhs_data3);
	matrices[6] = mat3;
	matrices[6] = matrices[6];
	int ndim8= 2;
	int dim8[2]= {20, 1};
	matrices[7] = onesM(ndim8, dim8);
	int* lhs_data4 = i_to_i(matrices[7]);
	for (int iter7 = 1; iter7 <= 20; ++ iter7) {
		int d0_24 = iter7 % 1;
		if (d0_24 == 0) {
			d0_24 = 1;
		}
		int d1_24 = (iter7 - d0_24)/1 + 1;
		int tmp5= (iter7 - 5) * iter7;
		lhs_data4[(d1_24-1) + (d0_24-1)] = tmp5;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter8 = 0 ; iter8 < ndim8; iter8++)
	{
		size4 *= dim8[iter8];
	}
	Matrix *mat4 = createM(ndim8, dim8, 0);
	writeM(mat4, size4, lhs_data4);
	matrices[7] = mat4;
	matrices[7] = matrices[7];
	int ndim9= 2;
	int dim9[2]= {20, 1};
	matrices[8] = onesM(ndim9, dim9);
	double* lhs_data5 = i_to_d(matrices[8]);
	for (int iter9 = 1; iter9 <= 20; ++ iter9) {
		int d0_30 = iter9 % 1;
		if (d0_30 == 0) {
			d0_30 = 1;
		}
		int d1_30 = (iter9 - d0_30)/1 + 1;
		double tmp6= (iter9 - 8.5) * iter9 + 0.5;
		lhs_data5[(d1_30-1) + (d0_30-1)] = tmp6;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter10 = 0 ; iter10 < ndim9; iter10++)
	{
		size5 *= dim9[iter10];
	}
	Matrix *mat5 = createM(ndim9, dim9, 1);
	writeM(mat5, size5, lhs_data5);
	matrices[8] = mat5;
	matrices[8] = matrices[8];
	int ndim10= 2;
	int dim10[2]= {1, 10};
	matrices[9] = zerosM(ndim10, dim10);
	complex* lhs_data6 = i_to_c(matrices[9]);
	for (int iter11 = 1; iter11 <= 10; ++ iter11) {
		int d0_36 = iter11 % 1;
		if (d0_36 == 0) {
			d0_36 = 1;
		}
		int d1_36 = (iter11 - d0_36)/1 + 1;
		complex tmp7= (iter11 - 5.5) * (iter11) + ((0.5) * (4 - iter11)) * 1*I;
		lhs_data6[(d1_36-1) + (d0_36-1)] = tmp7;
	
	}
	// Write matrix mat6
	int size6 = 1;
	for (int iter12 = 0 ; iter12 < ndim10; iter12++)
	{
		size6 *= dim10[iter12];
	}
	Matrix *mat6 = createM(ndim10, dim10, 2);
	writeM(mat6, size6, lhs_data6);
	matrices[9] = mat6;
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
	
	for (int iter13 = 1; iter13 <= 12; ++ iter13) {
		printf("\n%s\n", 'i\n');
		int d0_43 = iter13 % 11;
		if (d0_43 == 0) {
			d0_43 = 11;
		}
		int d1_43 = (iter13 - d0_43)/11 + 1;
		printM(matrices[(d1_43-1) + (d0_43-1)]);
		for (int iter14 = 1; iter14 <= 12; ++ iter14) {
			printf("\n%s\n", 'j\n');
			int d0_44 = iter14 % 11;
			if (d0_44 == 0) {
				d0_44 = 11;
			}
			int d1_44 = (iter14 - d0_44)/11 + 1;
			printM(matrices[(d1_44-1) + (d0_44-1)]);
			printf("\n%s\n", '\n\n');
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
			Matrix * tmp8= xcorrM(matrices[(d1_45-1) + (d0_45-1)], matrices[(d1_46-1) + (d0_46-1)], 0, "none");
			printM(tmp8);
			int d0_47 = iter13 % 11;
			if (d0_47 == 0) {
				d0_47 = 11;
			}
			int d1_47 = (iter13 - d0_47)/11 + 1;
			int * tmp9= getDimsM(matrices[(d1_47-1) + (d0_47-1)]);
			int d0_48 = iter13 % 11;
			if (d0_48 == 0) {
				d0_48 = 11;
			}
			int d1_48 = (iter13 - d0_48)/11 + 1;
			int * tmp10= getDimsM(matrices[(d1_48-1) + (d0_48-1)]);
			int d0_49 = iter14 % 11;
			if (d0_49 == 0) {
				d0_49 = 11;
			}
			int d1_49 = (iter14 - d0_49)/11 + 1;
			int * tmp11= getDimsM(matrices[(d1_49-1) + (d0_49-1)]);
			int d0_50 = iter14 % 11;
			if (d0_50 == 0) {
				d0_50 = 11;
			}
			int d1_50 = (iter14 - d0_50)/11 + 1;
			int * tmp12= getDimsM(matrices[(d1_50-1) + (d0_50-1)]);
			if ((iter13 > 1 && iter14 > 1 && tmp9[0] * tmp10[1] == tmp11[0] * tmp12[1])) {
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
				Matrix * tmp13= xcorrM(matrices[(d1_51-1) + (d0_51-1)], matrices[(d1_52-1) + (d0_52-1)], 0, "unbiased");
				printM(tmp13);
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
				Matrix * tmp14= xcorrM(matrices[(d1_53-1) + (d0_53-1)], matrices[(d1_54-1) + (d0_54-1)], 0, "biased");
				printM(tmp14);
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
				Matrix * tmp15= xcorrM(matrices[(d1_55-1) + (d0_55-1)], matrices[(d1_56-1) + (d0_56-1)], 0, "coeff");
				printM(tmp15);
				
				
				
			
			}
			for (int iter15 = 9; iter15 <= 21; ++ iter15) {
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
				Matrix * tmp16= xcorrM(matrices[(d1_57-1) + (d0_57-1)], matrices[(d1_58-1) + (d0_58-1)], iter15, "none");
				printM(tmp16);
				int d0_59 = iter13 % 11;
				if (d0_59 == 0) {
					d0_59 = 11;
				}
				int d1_59 = (iter13 - d0_59)/11 + 1;
				int * tmp17= getDimsM(matrices[(d1_59-1) + (d0_59-1)]);
				int d0_60 = iter13 % 11;
				if (d0_60 == 0) {
					d0_60 = 11;
				}
				int d1_60 = (iter13 - d0_60)/11 + 1;
				int * tmp18= getDimsM(matrices[(d1_60-1) + (d0_60-1)]);
				int d0_61 = iter14 % 11;
				if (d0_61 == 0) {
					d0_61 = 11;
				}
				int d1_61 = (iter14 - d0_61)/11 + 1;
				int * tmp19= getDimsM(matrices[(d1_61-1) + (d0_61-1)]);
				int d0_62 = iter14 % 11;
				if (d0_62 == 0) {
					d0_62 = 11;
				}
				int d1_62 = (iter14 - d0_62)/11 + 1;
				int * tmp20= getDimsM(matrices[(d1_62-1) + (d0_62-1)]);
				if ((iter13 > 1 && iter14 > 1 && tmp17[0] * tmp18[1] == tmp19[0] * tmp20[1])) {
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
					Matrix * tmp21= xcorrM(matrices[(d1_63-1) + (d0_63-1)], matrices[(d1_64-1) + (d0_64-1)], iter15, "unbiased");
					printM(tmp21);
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
					Matrix * tmp22= xcorrM(matrices[(d1_65-1) + (d0_65-1)], matrices[(d1_66-1) + (d0_66-1)], iter15, "biased");
					printM(tmp22);
					int d0_67 = iter13 % 11;
					if (d0_67 == 0) {
						d0_67 = 11;
					}
					int d1_67 = (iter13 - d0_67)/11 + 1;
					int d0_68 = iter14 % 11;
					if (d0_68 == 0) {
						d0_68 = 11;
					}
					int d1_68 = (iter14 - d0_68)/11 + 1;
					Matrix * tmp23= xcorrM(matrices[(d1_67-1) + (d0_67-1)], matrices[(d1_68-1) + (d0_68-1)], iter15, "coeff");
					printM(tmp23);
					
					
					
				
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
