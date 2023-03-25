//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

// Function declarations
void two_t_test_intint(Matrix * a, Matrix * b);
void two_t_test_doubleint(Matrix * a, Matrix * b);
void int_vec_stats(Matrix * a);
void double_vec_stats(Matrix * a);
void double_stats_int(Matrix * a);
void double_stats_double(Matrix * a);

// Entry-point function
int main(void) {

	//more off
	//format short
	//source octaveIncludes.m;
	//pkg load statistics;
	//row_vectors_i
	
	int ndim1 = 2;
	int dim1[2] = {1,4};
	Matrix * a = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 4*sizeof(*input1));
	input1[0] = 3;
	input1[1] = -5;
	input1[2] = 0;
	input1[3] = 1;
	writeM( a, 4, input1);
	free(input1);
	
	printM(a);
	int * dim2 = getDimsM(a);
	int ndim2 = 2;
	Matrix * tmp2 = onesM(ndim2, dim2);
	two_t_test_intint(a, tmp2);
	int_vec_stats(a);
	double_stats_int(a);
	//row_vectors_d
	
	int ndim3 = 2;
	int dim3[2] = {1,4};
	a = createM(ndim3, dim3, 1);
	double *input2 = NULL;
	input2 = malloc( 4*sizeof(*input2));
	input2[0] = 0.5;
	input2[1] = 0.25;
	input2[2] = 0;
	input2[3] = 0.6;
	writeM( a, 4, input2);
	free(input2);
	
	printM(a);
	int * dim4 = getDimsM(a);
	int ndim4 = 2;
	Matrix * tmp4 = onesM(ndim4, dim4);
	two_t_test_doubleint(a, tmp4);
	double_vec_stats(a);
	double_stats_double(a);
	//column_vectors_i
	
	int ndim5 = 2;
	int dim5[2] = {4,1};
	a = createM(ndim5, dim5, 0);
	int *input3 = NULL;
	input3 = malloc( 4*sizeof(*input3));
	input3[0] = 3;
	input3[1] = -5;
	input3[2] = 0;
	input3[3] = 1;
	writeM( a, 4, input3);
	free(input3);
	
	printM(a);
	int_vec_stats(a);
	double_stats_int(a);
	//column_vectors_d
	
	int ndim6 = 2;
	int dim6[2] = {4,1};
	a = createM(ndim6, dim6, 1);
	double *input4 = NULL;
	input4 = malloc( 4*sizeof(*input4));
	input4[0] = 0.25;
	input4[1] = 0.5;
	input4[2] = 0;
	input4[3] = 0.6;
	writeM( a, 4, input4);
	free(input4);
	
	printM(a);
	double_vec_stats(a);
	double_stats_double(a);
	//matrices_23_i
	
	int ndim7 = 2;
	int dim7[2] = {2,3};
	a = createM(ndim7, dim7, 0);
	int *input5 = NULL;
	input5 = malloc( 6*sizeof(*input5));
	input5[0] = 3;
	input5[1] = -2;
	input5[2] = 0;
	input5[3] = 1;
	input5[4] = 5;
	input5[5] = 10;
	writeM( a, 6, input5);
	free(input5);
	
	printM(a);
	double_stats_int(a);
	//matrices_23_d
	
	int ndim8 = 2;
	int dim8[2] = {2,3};
	a = createM(ndim8, dim8, 1);
	double *input6 = NULL;
	input6 = malloc( 6*sizeof(*input6));
	input6[0] = 3.25;
	input6[1] = -2;
	input6[2] = 0;
	input6[3] = 1;
	input6[4] = 5;
	input6[5] = 10;
	writeM( a, 6, input6);
	free(input6);
	
	printM(a);
	double_stats_double(a);
	//matrices_32_i
	
	int ndim9 = 2;
	int dim9[2] = {3,2};
	a = createM(ndim9, dim9, 0);
	int *input7 = NULL;
	input7 = malloc( 6*sizeof(*input7));
	input7[0] = 3;
	input7[1] = -2;
	input7[2] = 0;
	input7[3] = 1;
	input7[4] = 5;
	input7[5] = 10;
	writeM( a, 6, input7);
	free(input7);
	
	printM(a);
	double_stats_int(a);
	//matrices_32_d
	
	int ndim10 = 2;
	int dim10[2] = {3,2};
	a = createM(ndim10, dim10, 1);
	double *input8 = NULL;
	input8 = malloc( 6*sizeof(*input8));
	input8[0] = 3.25;
	input8[1] = -2;
	input8[2] = 0;
	input8[3] = 1;
	input8[4] = 5;
	input8[5] = 10;
	writeM( a, 6, input8);
	free(input8);
	
	printM(a);
	double_stats_double(a);
	//matrices_97_i
	int ndim11 = 2;
	int dim11[2] = {7, 9};
	Matrix * tmp5 = zerosM(ndim11, dim11);
	a = tmp5;
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 63; ++ iter1) {
		int tmp6 = pow((-1), iter1);
		int tmp7 = pow(iter1, 2);
		int tmp9 = pow((-1), iter1);
		int tmp10 = pow(iter1, 2);
		int tmp8 = tmp9 * tmp10;
		int idx1 = convertSubscript(ndim11, dim11, iter1);
		lhs_data1[idx1] = tmp8;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim11; iter2++)
	{
		size1 *= dim11[iter2];
	}
	Matrix *mat1 = createM(ndim11, dim11, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp11 = transposeM(mat1);
	a = tmp11;
	printM(a);
	double_stats_int(a);
	//matrices_97_d
	int ndim12 = 2;
	int dim12[2] = {7, 9};
	Matrix * tmp12 = zerosM(ndim12, dim12);
	a = tmp12;
	double* lhs_data2 = i_to_d(a);
	for (int iter3 = 1; iter3 <= 63; ++ iter3) {
		int tmp13 = pow((-1), iter3);
		int tmp14 = pow(iter3, 2);
		int tmp16 = pow((-1), iter3);
		int tmp17 = pow(iter3, 2);
		double tmp15 = (double) tmp16 * tmp17 / 17;
		int idx2 = convertSubscript(ndim12, dim12, iter3);
		lhs_data2[idx2] = tmp15;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim12; iter4++)
	{
		size2 *= dim12[iter4];
	}
	Matrix *mat2 = createM(ndim12, dim12, 1);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp18 = transposeM(mat2);
	a = tmp18;
	printM(a);
	double_stats_double(a);
	//big_matrix
	int ndim13 = 2;
	int dim13[2] = {32, 32};
	Matrix * tmp19 = onesM(ndim13, dim13);
	a = tmp19;
	printM(a);
	double_stats_int(a);
	//big_vector
	int ndim14 = 2;
	int dim14[2] = {1010, 1};
	Matrix * tmp20 = onesM(ndim14, dim14);
	a = tmp20;
	printM(a);
	int_vec_stats(a);
	double_stats_int(a);
	return 0;
}


// Subprograms

void two_t_test_intint(Matrix * a, Matrix * b) {
	bool h1;
	double pval1;
	double *ci1 = NULL;
	ci1 = malloc(2*sizeof(*ci1));
	double tstat1;
	double df1;
	double sd1;
	ttestM_xy(a, b, &h1, &pval1, &ci1, &tstat1, &df1, &sd1);
	printf("h: %d\npval: %.2f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h1, pval1, tstat1, df1, sd1);
}

void two_t_test_doubleint(Matrix * a, Matrix * b) {
	bool h2;
	double pval2;
	double *ci2 = NULL;
	ci2 = malloc(2*sizeof(*ci2));
	double tstat2;
	double df2;
	double sd2;
	ttestM_xy(a, b, &h2, &pval2, &ci2, &tstat2, &df2, &sd2);
	printf("h: %d\npval: %.2f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h2, pval2, tstat2, df2, sd2);
}

void int_vec_stats(Matrix * a) {
	int index1;
	Matrix * tmp21 = maxV(a, &index1);
	Matrix * greatest = tmp21;
	printM(tmp21);
	printf("max index: %d\n\n", index1);
	int index2;
	Matrix * tmp22 = minV(a, &index2);
	Matrix * least = tmp22;
	printM(tmp22);
	printf("min index: %d\n\n", index2);
	int * tmp23 = i_to_i(tmp22);
	int * tmp24 = i_to_i(tmp21);
	for (double iter5 = tmp23[0]; iter5 <= tmp24[0]; iter5 += 0.5) {
		printf("mu: %.3f\n", iter5);
		bool h3;
		double pval3;
		double *ci3 = NULL;
		ci3 = malloc(2*sizeof(*ci3));
		double tstat3;
		double df3;
		double sd3;
		ttestM(a, iter5, &h3, &pval3, &ci3, &tstat3, &df3, &sd3);
		// disp(sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, ci(1), ci(2), stats.tstat, stats.df, stats.sd));
		Matrix * tmp25 = stdM(a);
		double * tmp26 = d_to_d(tmp25);
		bool h4;
		double pval4;
		double *z1 = NULL;
		z1 = malloc(2*sizeof(*z1));
		double z2;
		double zcrit1;
		ztestM(a, iter5, tmp26[0], &h4, &pval4, &z1, &z2, &zcrit1);
		// disp(sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\nzcrit: %.3f\n", h, pval, ci(1), ci(2), z, zcrit));
	
	}
	Matrix * tmp27 = varM(a);
	double * tmp28 = d_to_d(tmp27);
	Matrix * tmp29 = varM(a);
	double * tmp30 = d_to_d(tmp29);
	for (double iter6 = (tmp28[0] - 5); iter6 <= (tmp30[0] + 5); iter6 += 1.0) {
		printf("v: %.3f\n", iter6);
		bool h5;
		double pval5;
		double *ci4 = NULL;
		ci4 = malloc(2*sizeof(*ci4));
		double chisqstat1;
		double df4;
		vartestM(a, iter6, &h5, &pval5, &ci4, &chisqstat1, &df4);
		// disp(sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df));
		// disp(sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df));
	
	}
}

void double_vec_stats(Matrix * a) {
	int index3;
	Matrix * tmp31 = maxV(a, &index3);
	Matrix * greatest = tmp31;
	printM(tmp31);
	printf("max index: %d\n", index3);
	int index4;
	Matrix * tmp32 = minV(a, &index4);
	Matrix * least = tmp32;
	printM(tmp32);
	printf("min index: %d\n", index4);
	double * tmp33 = d_to_d(tmp32);
	double * tmp34 = d_to_d(tmp31);
	for (double iter7 = tmp33[0]; iter7 <= tmp34[0]; iter7 += 0.5) {
		printf("mu: %.3f\n", iter7);
		bool h6;
		double pval6;
		double *ci5 = NULL;
		ci5 = malloc(2*sizeof(*ci5));
		double tstat4;
		double df5;
		double sd4;
		ttestM(a, iter7, &h6, &pval6, &ci5, &tstat4, &df5, &sd4);
		// disp(sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h, pval, ci(1), ci(2), stats.tstat, stats.df, stats.sd));
		Matrix * tmp35 = stdM(a);
		double * tmp36 = d_to_d(tmp35);
		bool h7;
		double pval7;
		double *z3 = NULL;
		z3 = malloc(2*sizeof(*z3));
		double z4;
		double zcrit2;
		ztestM(a, iter7, tmp36[0], &h7, &pval7, &z3, &z4, &zcrit2);
		// disp(sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\nzcrit: %.3f\n", h, pval, ci(1), ci(2), z, zcrit));
	
	}
	Matrix * tmp37 = varM(a);
	double * tmp38 = d_to_d(tmp37);
	Matrix * tmp39 = varM(a);
	double * tmp40 = d_to_d(tmp39);
	for (double iter8 = (tmp38[0] - 5); iter8 <= (tmp40[0] + 5); iter8 += 1.0) {
		printf("v: %.3f\n", iter8);
		bool h8;
		double pval8;
		double *ci6 = NULL;
		ci6 = malloc(2*sizeof(*ci6));
		double chisqstat2;
		double df6;
		vartestM(a, iter8, &h8, &pval8, &ci6, &chisqstat2, &df6);
		// disp(sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df));
		// disp(sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df));
	
	}
}

void double_stats_int(Matrix * a) {
	
	int ndim15 = 2;
	int dim15[2] = {1,10};
	Matrix * fun_qs = createM(ndim15, dim15, 1);
	double *input9 = NULL;
	input9 = malloc( 10*sizeof(*input9));
	input9[0] = 0;
	input9[1] = -1;
	input9[2] = 3;
	input9[3] = 0.2;
	input9[4] = 0.9;
	input9[5] = 0.53;
	input9[6] = 0.75;
	input9[7] = 1;
	input9[8] = 0.34;
	input9[9] = 0.17;
	writeM( fun_qs, 10, input9);
	free(input9);
	
	// Beta PDF
	for (double iter9 = 0; iter9 <= 0.95; iter9 += 0.05) {
		for (double iter10 = 0; iter10 <= 0.95; iter10 += 0.05) {
			Matrix * tmp41 = betapdfM(a, iter9, iter10);
			printM(tmp41);
		
		}
	
	}
	// Exponential PDF
	for (double iter11 = 0.05; iter11 <= 4.95; iter11 += 0.05) {
		Matrix * tmp42 = exppdfM(a, iter11);
		printM(tmp42);
	
	}
	// Chi-square PDF
	for (double iter12 = 0.05; iter12 <= 4.95; iter12 += 0.05) {
		printf("n = %.3f\n", iter12);
		Matrix * tmp43 = chi2pdfM(a, iter12);
		printM(tmp43);
	
	}
	// Gamma PDF
	for (double iter13 = 0.25; iter13 <= 1.75; iter13 += 0.25) {
		for (double iter14 = 0.25; iter14 <= 1.75; iter14 += 0.25) {
			Matrix * tmp44 = gampdfM(a, iter13, iter14);
			printM(tmp44);
		
		}
	
	}
	// Lognormal PDF
	for (double iter15 = -2; iter15 <= 5; iter15 += 0.5) {
		for (double iter16 = 0.5; iter16 <= 5; iter16 += 0.5) {
			Matrix * tmp45 = lognpdfM(a, iter15, iter16);
			printM(tmp45);
		
		}
	
	}
	// Normal PDF
	for (double iter17 = -2; iter17 <= 5; iter17 += 0.5) {
		for (double iter18 = 0.5; iter18 <= 5; iter18 += 0.5) {
			Matrix * tmp46 = normpdfM(a, iter17, iter18);
			printM(tmp46);
		
		}
	
	}
	// Uniform discrete PDF
	for (int iter19 = 1; iter19 <= 9; ++ iter19) {
		printf("n = %d\n", iter19);
		Matrix * tmp47 = unidpdfM(a, iter19);
		printM(tmp47);
	
	}
}

void double_stats_double(Matrix * a) {
	
	int ndim16 = 2;
	int dim16[2] = {1,10};
	Matrix * fun_qs = createM(ndim16, dim16, 1);
	double *input10 = NULL;
	input10 = malloc( 10*sizeof(*input10));
	input10[0] = 0;
	input10[1] = -1;
	input10[2] = 3;
	input10[3] = 0.2;
	input10[4] = 0.9;
	input10[5] = 0.53;
	input10[6] = 0.75;
	input10[7] = 1;
	input10[8] = 0.34;
	input10[9] = 0.17;
	writeM( fun_qs, 10, input10);
	free(input10);
	
	// Beta PDF
	for (double iter20 = 0; iter20 <= 0.95; iter20 += 0.05) {
		for (double iter21 = 0; iter21 <= 0.95; iter21 += 0.05) {
			Matrix * tmp48 = betapdfM(a, iter20, iter21);
			printM(tmp48);
		
		}
	
	}
	// Exponential PDF
	for (double iter22 = 0.05; iter22 <= 4.95; iter22 += 0.05) {
		Matrix * tmp49 = exppdfM(a, iter22);
		printM(tmp49);
	
	}
	// Chi-square PDF
	for (double iter23 = 0.05; iter23 <= 4.95; iter23 += 0.05) {
		printf("n = %.3f\n", iter23);
		Matrix * tmp50 = chi2pdfM(a, iter23);
		printM(tmp50);
	
	}
	// Gamma PDF
	for (double iter24 = 0.25; iter24 <= 1.75; iter24 += 0.25) {
		for (double iter25 = 0.25; iter25 <= 1.75; iter25 += 0.25) {
			Matrix * tmp51 = gampdfM(a, iter24, iter25);
			printM(tmp51);
		
		}
	
	}
	// Lognormal PDF
	for (double iter26 = -2; iter26 <= 5; iter26 += 0.5) {
		for (double iter27 = 0.5; iter27 <= 5; iter27 += 0.5) {
			Matrix * tmp52 = lognpdfM(a, iter26, iter27);
			printM(tmp52);
		
		}
	
	}
	// Normal PDF
	for (double iter28 = -2; iter28 <= 5; iter28 += 0.5) {
		for (double iter29 = 0.5; iter29 <= 5; iter29 += 0.5) {
			Matrix * tmp53 = normpdfM(a, iter28, iter29);
			printM(tmp53);
		
		}
	
	}
	// Uniform discrete PDF
	for (int iter30 = 1; iter30 <= 9; ++ iter30) {
		printf("n = %d\n", iter30);
		Matrix * tmp54 = unidpdfM(a, iter30);
		printM(tmp54);
	
	}
}