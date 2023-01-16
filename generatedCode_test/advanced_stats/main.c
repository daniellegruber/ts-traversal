//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Function declarations
void two_t_test(Matrix * a, Matrix * b);
void int_vec_stats(Matrix * a);
void double_vec_stats(Matrix * a);
void double_stats(Matrix * a);

// Entry-point function
int main(void) {

	//more off
	//format short
	//source octaveIncludes.m;
	//pkg load statistics;
	//row_vectors_i
	
	int ndim2 = 2;
	int dim2[2] = {1,4};
	Matrix * a = createM(ndim2, dim2, 0);
	int *input2 = NULL;
	input2 = malloc( 4*sizeof(*input2));
	input2[0] = 3;
	input2[1] = -5;
	input2[2] = 0;
	input2[3] = 1;
	writeM( a, 4, input2);
	free(input2);
	
	printM(a);
	int * tmp14= getDimsM(a);
	int ndim3= 2;
	int dim3[2]= {tmp14,tmp14};
	Matrix * tmp15= onesM(ndim3, dim3);
	two_t_test(a, tmp15);
	int_vec_stats(a);
	double_stats(a);
	//row_vectors_d
	
	int ndim4 = 2;
	int dim4[2] = {1,4};
	a = createM(ndim4, dim4, 1);
	double *input3 = NULL;
	input3 = malloc( 4*sizeof(*input3));
	input3[0] = 0.5;
	input3[1] = 0.25;
	input3[2] = 0;
	input3[3] = 0.6;
	writeM( a, 4, input3);
	free(input3);
	
	printM(a);
	int * tmp16= getDimsM(a);
	int ndim5= 2;
	int dim5[2]= {tmp16,tmp16};
	Matrix * tmp17= onesM(ndim5, dim5);
	two_t_test(a, tmp17);
	double_vec_stats(a);
	double_stats(a);
	//column_vectors_i
	
	int ndim6 = 2;
	int dim6[2] = {4,1};
	a = createM(ndim6, dim6, 0);
	int *input4 = NULL;
	input4 = malloc( 4*sizeof(*input4));
	input4[0] = 3;
	input4[1] = -5;
	input4[2] = 0;
	input4[3] = 1;
	writeM( a, 4, input4);
	free(input4);
	
	printM(a);
	int_vec_stats(a);
	double_stats(a);
	//column_vectors_d
	
	int ndim7 = 2;
	int dim7[2] = {4,1};
	a = createM(ndim7, dim7, 1);
	double *input5 = NULL;
	input5 = malloc( 4*sizeof(*input5));
	input5[0] = 0.25;
	input5[1] = 0.5;
	input5[2] = 0;
	input5[3] = 0.6;
	writeM( a, 4, input5);
	free(input5);
	
	printM(a);
	double_vec_stats(a);
	double_stats(a);
	//matrices_23_i
	
	int ndim8 = 2;
	int dim8[2] = {2,3};
	a = createM(ndim8, dim8, 0);
	int *input6 = NULL;
	input6 = malloc( 6*sizeof(*input6));
	input6[0] = 3;
	input6[1] = -2;
	input6[2] = 0;
	input6[3] = 1;
	input6[4] = 5;
	input6[5] = 10;
	writeM( a, 6, input6);
	free(input6);
	
	printM(a);
	double_stats(a);
	//matrices_23_d
	
	int ndim9 = 2;
	int dim9[2] = {2,3};
	a = createM(ndim9, dim9, 1);
	double *input7 = NULL;
	input7 = malloc( 6*sizeof(*input7));
	input7[0] = 3.25;
	input7[1] = -2;
	input7[2] = 0;
	input7[3] = 1;
	input7[4] = 5;
	input7[5] = 10;
	writeM( a, 6, input7);
	free(input7);
	
	printM(a);
	double_stats(a);
	//matrices_32_i
	
	int ndim10 = 2;
	int dim10[2] = {3,2};
	a = createM(ndim10, dim10, 0);
	int *input8 = NULL;
	input8 = malloc( 6*sizeof(*input8));
	input8[0] = 3;
	input8[1] = -2;
	input8[2] = 0;
	input8[3] = 1;
	input8[4] = 5;
	input8[5] = 10;
	writeM( a, 6, input8);
	free(input8);
	
	printM(a);
	double_stats(a);
	//matrices_32_d
	
	int ndim11 = 2;
	int dim11[2] = {3,2};
	a = createM(ndim11, dim11, 1);
	double *input9 = NULL;
	input9 = malloc( 6*sizeof(*input9));
	input9[0] = 3.25;
	input9[1] = -2;
	input9[2] = 0;
	input9[3] = 1;
	input9[4] = 5;
	input9[5] = 10;
	writeM( a, 6, input9);
	free(input9);
	
	printM(a);
	double_stats(a);
	//matrices_97_i
	int ndim12= 2;
	int dim12[2]= {7, 9};
	a = zerosM(ndim12, dim12);
	int* lhs_data1 = i_to_i(a);
	for (int iter16 = 1; iter16 <= 63; ++ iter16) {
		int tmp18= pow((-1), iter16);
		int tmp19= pow(iter16, 2);
		int d0_1 = iter16 % 7;
		if (d0_1 == 0) {
			d0_1 = 7;
		}
		int d1_1 = (iter16 - d0_1)/7 + 1;
		int tmp21= pow((-1), iter16);
		int tmp22= pow(iter16, 2);
		int tmp20= tmp21 * tmp22;
		lhs_data1[(d1_1-1) + (d0_1-1) * 9] = tmp20;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter17 = 0 ; iter17 < ndim12; iter17++)
	{
		size1 *= dim12[iter17];
	}
	Matrix *mat1 = createM(ndim12, dim12, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp23= transposeM(mat1);
	a = tmp23;
	printM(a);
	double_stats(a);
	//matrices_97_d
	int ndim13= 2;
	int dim13[2]= {7, 9};
	a = zerosM(ndim13, dim13);
	int* lhs_data2 = i_to_i(a);
	for (int iter18 = 1; iter18 <= 63; ++ iter18) {
		int tmp24= pow((-1), iter18);
		int tmp25= pow(iter18, 2);
		int d0_2 = iter18 % 7;
		if (d0_2 == 0) {
			d0_2 = 7;
		}
		int d1_2 = (iter18 - d0_2)/7 + 1;
		int tmp27= pow((-1), iter18);
		int tmp28= pow(iter18, 2);
		int tmp26= tmp27 * tmp28 / 17;
		lhs_data2[(d1_2-1) + (d0_2-1) * 9] = tmp26;
	
	}
	mat1 = mat1;
	// Write matrix mat2
	int size2 = 1;
	for (int iter19 = 0 ; iter19 < ndim13; iter19++)
	{
		size2 *= dim13[iter19];
	}
	Matrix *mat2 = createM(ndim13, dim13, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp29= transposeM(mat2);
	a = tmp29;
	printM(a);
	double_stats(a);
	//big_matrix
	int ndim14= 2;
	int dim14[2]= {32, 32};
	Matrix * a= onesM(ndim14, dim14);
	printM(a);
	double_stats(a);
	//big_vector
	int ndim15= 2;
	int dim15[2]= {1010, 1};
	Matrix * a= onesM(ndim15, dim15);
	printM(a);
	int_vec_stats(a);
	double_stats(a);
	return 0;
}


// Subprograms

void two_t_test(Matrix * a, Matrix * b) {
	bool h1;
	double pval1;
	double ci1;
	double tstat1;
	double df1;
	double sd1;
	ttestM_xy(a, b, &h1, &pval1, &ci1, &tstat1, &df1, &sd1);
	printf("h: %d\npval: %.2f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h1);
}

void int_vec_stats(Matrix * a) {
	int index1;
	Matrix * greatest= maxV(a, &index1);
	int * tmp1 = i_to_i(greatest);
	printf("\n%d\n", tmp1[0]);
	printf("max index: %d\n\n", index1);
	int index2;
	Matrix * least= minV(a, &index2);
	int * tmp2 = i_to_i(least);
	printf("\n%d\n", tmp2[0]);
	printf("min index: %d\n\n", index2);
	for (int iter1 = least; iter1 <= greatest; iter1 += 0.5) {
		printf("mu: %.3f\n", iter1);
		bool h2;
		double pval2;
		double ci2;
		double tstat2;
		double df2;
		double sd2;
		ttestM(a, iter1, &h2, &pval2, &ci2, &tstat2, &df2, &sd2);
		// sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, ci(1), ci(2), stats.tstat, stats.df, stats.sd);
		Matrix * tmp3= stdM(a, 1);
		bool h3;
		double pval3;
		double z1;
		double z2;
		double zcrit1;
		ztestM(a, iter1, tmp3, &h3, &pval3, &z1, &z2, &zcrit1);
		// sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\nzcrit: %.3f\n", h, pval, ci(1), ci(2), z, zcrit);
	
	}
	for (int iter2 = (var(a, 1)-5); iter2 <= (var(a, 1)+5); iter2 += 1.0) {
		printf("v: %.3f\n", iter2);
		bool h4;
		double pval4;
		double ci3;
		double chisqstat1;
		double df3;
		vartestM(a, iter2, &h4, &pval4, &ci3, &chisqstat1, &df3);
		// sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df);
		// sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df);
	
	}
}

void double_vec_stats(Matrix * a) {
	int index3;
	Matrix * greatest= maxV(a, &index3);
	double * tmp4 = d_to_d(greatest);
	printf("\n%d\n", tmp4[0]);
	printf("max index: %d\n", index3);
	int index4;
	Matrix * least= minV(a, &index4);
	double * tmp5 = d_to_d(least);
	printf("\n%d\n", tmp5[0]);
	printf("min index: %d\n", index4);
	for (int iter3 = least; iter3 <= greatest; iter3 += 0.5) {
		printf("mu: %.3f\n", iter3);
		bool h5;
		double pval5;
		double ci4;
		double tstat3;
		double df4;
		double sd3;
		ttestM(a, iter3, &h5, &pval5, &ci4, &tstat3, &df4, &sd3);
		// sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, ci(1), ci(2), stats.tstat, stats.df, stats.sd);
		Matrix * tmp6= stdM(a, 1);
		bool h6;
		double pval6;
		double z3;
		double z4;
		double zcrit2;
		ztestM(a, iter3, tmp6, &h6, &pval6, &z3, &z4, &zcrit2);
		// sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\nzcrit: %.3f\n", h, pval, ci(1), ci(2), z, zcrit);
	
	}
	for (int iter4 = (var(a, 1)-5); iter4 <= (var(a, 1)+5); iter4 += 1.0) {
		printf("v: %.3f\n", iter4);
		bool h7;
		double pval7;
		double ci5;
		double chisqstat2;
		double df5;
		vartestM(a, iter4, &h7, &pval7, &ci5, &chisqstat2, &df5);
		// sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df);
		// sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df);
	
	}
}

void double_stats(Matrix * a) {
	
	int ndim1 = 2;
	int dim1[2] = {1,10};
	Matrix * fun_qs = createM(ndim1, dim1, 1);
	double *input1 = NULL;
	input1 = malloc( 10*sizeof(*input1));
	input1[0] = 0;
	input1[1] = -1;
	input1[2] = 3;
	input1[3] = 0.2;
	input1[4] = 0.9;
	input1[5] = 0.53;
	input1[6] = 0.75;
	input1[7] = 1;
	input1[8] = 0.34;
	input1[9] = 0.17;
	writeM( fun_qs, 10, input1);
	free(input1);
	
	// Beta PDF
	for (int iter5 = 0; iter5 <= 0.95; iter5 += 0.05) {
		for (int iter6 = 0; iter6 <= 0.95; iter6 += 0.05) {
			Matrix * tmp7= betapdfM(a, iter5, iter6);
			printM(tmp7);
		
		}
	
	}
	// Exponential PDF
	for (int iter7 = 0.05; iter7 <= 4.95; iter7 += 0.05) {
		Matrix * tmp8= exppdfM(a, iter7);
		printM(tmp8);
	
	}
	// Chi-square PDF
	for (int iter8 = 0.05; iter8 <= 4.95; iter8 += 0.05) {
		printf("n = %.3f\n", iter8);
		Matrix * tmp9= chi2pdfM(a, iter8);
		printM(tmp9);
	
	}
	// Gamma PDF
	for (int iter9 = 0.25; iter9 <= 1.75; iter9 += 0.25) {
		for (int iter10 = 0.25; iter10 <= 1.75; iter10 += 0.25) {
			Matrix * tmp10= gampdfM(a, iter9, iter6);
			printM(tmp10);
		
		}
	
	}
	// Lognormal PDF
	for (int iter11 = -2; iter11 <= 5; iter11 += 0.5) {
		for (int iter12 = 0.5; iter12 <= 5; iter12 += 0.5) {
			Matrix * tmp11= lognpdfM(a, iter11, iter12);
			printM(tmp11);
		
		}
	
	}
	// Normal PDF
	for (int iter13 = -2; iter13 <= 5; iter13 += 0.5) {
		for (int iter14 = 0.5; iter14 <= 5; iter14 += 0.5) {
			Matrix * tmp12= normpdfM(a, iter13, iter12);
			printM(tmp12);
		
		}
	
	}
	// Uniform discrete PDF
	for (int iter15 = 1; iter15 <= 9; ++ iter15) {
		printf("n = %d\n", iter15);
		Matrix * tmp13= unidpdfM(a, iter15);
		printM(tmp13);
	
	}
}