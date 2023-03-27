//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

// Function declarations
void two_t_test(Matrix * a, Matrix * b);
void int_vec_stats(Matrix * a);
void double_stats(Matrix * a);

// Entry-point function
int main(void) {

	//more off
	
	//format short
	
	//source octaveIncludes.m;
	
	//pkg load statistics;
	
	//row_vectors_i
	
	printf("\n%s\n", "row_vectors_i");
	
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
	two_t_test(a, tmp2);
	int_vec_stats(a);
	double_stats(a);
	printf("\n%s\n", "--------------------");
	// %row_vectors_d
	
	// disp("row_vectors_d")
	
	// a = [0.5,0.25,0,0.6];
	
	// disp(a);
	
	// two_t_test(a, ones(size(a)));
	
	// double_vec_stats(a);
	
	// double_stats(a);
	
	// disp("--------------------")
	
	// 
	
	// %column_vectors_i
	
	// disp("column_vectors_i")
	
	// a = [3;-5;0;1];
	
	// disp(a);
	
	// int_vec_stats(a);
	
	// double_stats(a);
	
	// disp("--------------------")
	
	// 
	
	// %column_vectors_d
	
	// disp("column_vectors_d")
	
	// a = [0.25;0.5;0;0.6];
	
	// disp(a);
	
	// double_vec_stats(a);
	
	// double_stats(a);
	
	// disp("--------------------")
	
	// 
	
	// %matrices_23_i
	
	// disp("matrices_23_i")
	
	// a=[3,-2,0;1,5,10];
	
	// disp(a);
	
	// double_stats(a);
	
	// disp("--------------------")
	
	// 
	
	// %matrices_23_d
	
	// disp("matrices_23_d")
	
	// a=[3.25,-2,0;1,5,10];
	
	// disp(a);
	
	// double_stats(a);
	
	// disp("--------------------")
	
	// 
	
	// %matrices_32_i
	
	// disp("matrices_32_i")
	
	// a=[3,-2;0,1;5,10];
	
	// disp(a);
	
	// double_stats(a);
	
	// disp("--------------------")
	
	// 
	
	// %matrices_32_d
	
	// disp("matrices_32_d")
	
	// a=[3.25,-2;0,1;5,10];
	
	// disp(a);
	
	// double_stats(a);
	
	// disp("--------------------")
	
	// %matrices_97_i
	
	// a=zeros(7,9);
	
	// for i=1:63
	
	// 	a(i) = (-1)^i*i^2;
	
	// end
	
	// a=a.';
	
	// disp(a);
	
	// double_stats(a);
	
	// 
	
	// %matrices_97_d
	
	// a=zeros(7,9);
	
	// for i=1:63
	
	// 	a(i) = (-1)^i*i^2/17;
	
	// end
	
	// a=a.';
	
	// disp(a);
	
	// double_stats(a);
	
	// 
	
	// %big_matrix
	
	// a=ones(32,32);
	
	// disp(a);
	
	// double_stats(a);
	
	// 
	
	// %big_vector
	
	// a=ones(1010,1);
	
	// disp(a);
	
	// int_vec_stats(a);
	
	// double_stats(a);
	
	return 0;
}


// Subprograms
	
void two_t_test(Matrix * a, Matrix * b) {
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
	
void int_vec_stats(Matrix * a) {
	int index1;
	Matrix * tmp3 = maxV(a, &index1);
	Matrix * greatest = tmp3;
	printM(tmp3);
	printf("max index: %d\n\n", index1);
	int index2;
	Matrix * tmp4 = minV(a, &index2);
	Matrix * least = tmp4;
	printM(tmp4);
	printf("min index: %d\n\n", index2);
	int * tmp5 = i_to_i(tmp4);
	int * tmp6 = i_to_i(tmp3);
	for (double iter1 = tmp5[0]; iter1 <= tmp6[0]; iter1 += 0.5) {
		printf("mu: %.3f\n", iter1);
		bool h2;
		double pval2;
		double *ci2 = NULL;
		ci2 = malloc(2*sizeof(*ci2));
		double tstat2;
		double df2;
		double sd2;
		ttestM(a, iter1, &h2, &pval2, &ci2, &tstat2, &df2, &sd2);
		printf("h: %d\npval: %.2f\nci: %.3f, %.3f\ntstat: %.3f\ndf: %.3f\nsd: %.3f\n", h2, pval2, ci2[1 - 1], ci2[2 - 1], tstat2, df2, sd2);
		Matrix * tmp7 = stdM(a);
		double * tmp8 = d_to_d(tmp7);
		bool h3;
		double pval3;
		double *ci3 = NULL;
		ci3 = malloc(2*sizeof(*ci3));
		double z1;
		double zcrit1;
		ztestM(a, iter1, tmp8[0], &h3, &pval3, &ci3, &z1, &zcrit1);
		printf("h: %d\npval: %.2f\nci: %.3f, %.3f\nz: %.3f\n", h3, pval3, ci3[1 - 1], ci3[2 - 1], z1);
	
	}
	//if var(a, 0, "all") == 0
	
	//    i_range = [0:1.0:(var(a, 0, "all")+5)];
	
	//else 
	
	//    i_range = [0:1.0:2*var(a, 0, "all")];
	
	//end
	
	Matrix * tmp9 = varM(a);
	double * tmp10 = d_to_d(tmp9);
	double vec1[(1)*((int) floor((2 * tmp10[0]-0)/1.0) + 1)];
	
	for (int iter2 = 0; 0 + (1.0)*iter2 <= 2 * tmp10[0]; iter2++) {
		vec1[iter2] = 0 + (1.0)*iter2;
	}
	
	int ndim3 = 2;
	int dim3[2] = {1,0+(int) floor((2 * tmp10[0]-0)/1.0) + 1};
	Matrix * i_range = createM(ndim3, dim3, 1);
	double *input2 = NULL;
	input2 = malloc( (1)*(0+(int) floor((2 * tmp10[0]-0)/1.0) + 1)*sizeof(*input2));
	for (int iter3 = 0; iter3 < (1)*((int) floor((2 * tmp10[0]-0)/1.0) + 1); iter3++) {
	   input2[0 + iter3] = vec1[iter3];
	}
	writeM( i_range, (1)*(0+(int) floor((2 * tmp10[0]-0)/1.0) + 1), input2);
	free(input2);
	
	
	double i;
	for (int iter4 = 1; iter4 <= (1)*(0+(int) floor((2 * tmp10[0]-0)/1.0) + 1); iter4++ ) {
	indexM(i_range, &i, 1, iter4);
		printf("v: %.3f\n", i);
		//[h, pval, ci, stats] = vartest(a, i);
		
		// disp(sprintf("h: %d\npval: %.2f\nci: %.3f, %.3f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, ci(1), ci(2), stats.chisqstat, stats.df));
		
		// disp(sprintf("h: %d\npval: %.2f\nchisqstat: %.3f\ndf: %.3f\n", h, pval, stats.chisqstat, stats.df));
		
	
	}
}
	
void double_stats(Matrix * a) {
	
	int ndim4 = 2;
	int dim4[2] = {1,10};
	Matrix * fun_qs = createM(ndim4, dim4, 1);
	double *input3 = NULL;
	input3 = malloc( 10*sizeof(*input3));
	input3[0] = 0;
	input3[1] = -1;
	input3[2] = 3;
	input3[3] = 0.2;
	input3[4] = 0.9;
	input3[5] = 0.53;
	input3[6] = 0.75;
	input3[7] = 1;
	input3[8] = 0.34;
	input3[9] = 0.17;
	writeM( fun_qs, 10, input3);
	free(input3);
	
	// Beta PDF
	
	for (double iter5 = 0; iter5 <= 0.95; iter5 += 0.05) {
		for (double iter6 = 0; iter6 <= 0.95; iter6 += 0.05) {
			Matrix * tmp11 = betapdfM(a, iter5, iter6);
			printM(tmp11);
		
		}
	
	}
	// Exponential PDF
	
	for (double iter7 = 0.05; iter7 <= 4.95; iter7 += 0.05) {
		Matrix * tmp12 = exppdfM(a, iter7);
		printM(tmp12);
	
	}
	// Chi-square PDF
	
	for (double iter8 = 0.05; iter8 <= 4.95; iter8 += 0.05) {
		printf("n = %.3f\n", iter8);
		Matrix * tmp13 = chi2pdfM(a, iter8);
		printM(tmp13);
	
	}
	// Gamma PDF
	
	for (double iter9 = 0.25; iter9 <= 1.75; iter9 += 0.25) {
		for (double iter10 = 0.25; iter10 <= 1.75; iter10 += 0.25) {
			Matrix * tmp14 = gampdfM(a, iter9, iter10);
			printM(tmp14);
		
		}
	
	}
	// Lognormal PDF
	
	for (double iter11 = -2; iter11 <= 5; iter11 += 0.5) {
		for (double iter12 = 0.5; iter12 <= 5; iter12 += 0.5) {
			Matrix * tmp15 = lognpdfM(a, iter11, iter12);
			printM(tmp15);
		
		}
	
	}
	// Normal PDF
	
	for (double iter13 = -2; iter13 <= 5; iter13 += 0.5) {
		for (double iter14 = 0.5; iter14 <= 5; iter14 += 0.5) {
			Matrix * tmp16 = normpdfM(a, iter13, iter14);
			printM(tmp16);
		
		}
	
	}
	// Uniform discrete PDF
	
	for (int iter15 = 1; iter15 <= 9; ++ iter15) {
		printf("n = %d\n", iter15);
		Matrix * tmp17 = unidpdfM(a, iter15);
		printM(tmp17);
	
	}
}