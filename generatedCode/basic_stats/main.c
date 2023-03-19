//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"

// Function declarations
void normfit(Matrix * a, Matrix ** p_mu, Matrix ** p_sd);
void unifit(Matrix * a, Matrix ** p_ahat, Matrix ** p_bhat);
void int_vec_stats(Matrix * a);
void double_vec_stats(Matrix * a);
void complex_vec_stats(Matrix * a);
void int_stats(Matrix * a);
void double_stats(Matrix * a);
void complex_stats(Matrix * a);

// Entry-point function
int main(void) {

	//more off
	
	//format short
	
	//source octaveIncludes.m;
	
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
	int_vec_stats(a);
	int_stats(a);
	//row_vectors_d
	
	
	int ndim2 = 2;
	int dim2[2] = {1,4};
	a = createM(ndim2, dim2, 1);
	double *input2 = NULL;
	input2 = malloc( 4*sizeof(*input2));
	input2[0] = 3.25;
	input2[1] = -2;
	input2[2] = 0;
	input2[3] = 10.1;
	writeM( a, 4, input2);
	free(input2);
	
	printM(a);
	double_vec_stats(a);
	double_stats(a);
	//row_vectors_c
	
	
	int ndim3 = 2;
	int dim3[2] = {1,4};
	a = createM(ndim3, dim3, 2);
	complex *input3 = NULL;
	input3 = malloc( 4*sizeof(*input3));
	input3[0] = 3.25;
	input3[1] = -2;
	input3[2] = 0;
	input3[3] = 1 - 1*I;
	writeM( a, 4, input3);
	free(input3);
	
	printM(a);
	complex_vec_stats(a);
	complex_stats(a);
	//column_vectors_i
	
	
	int ndim4 = 2;
	int dim4[2] = {4,1};
	a = createM(ndim4, dim4, 0);
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
	int_stats(a);
	//column_vectors_d
	
	
	int ndim5 = 2;
	int dim5[2] = {4,1};
	a = createM(ndim5, dim5, 1);
	double *input5 = NULL;
	input5 = malloc( 4*sizeof(*input5));
	input5[0] = 3.25;
	input5[1] = -2;
	input5[2] = 0;
	input5[3] = 10.1;
	writeM( a, 4, input5);
	free(input5);
	
	printM(a);
	double_vec_stats(a);
	double_stats(a);
	//column_vectors_c
	
	
	int ndim6 = 2;
	int dim6[2] = {4,1};
	a = createM(ndim6, dim6, 2);
	complex *input6 = NULL;
	input6 = malloc( 4*sizeof(*input6));
	input6[0] = 3.25;
	input6[1] = -2;
	input6[2] = 0;
	input6[3] = 1 - 1*I;
	writeM( a, 4, input6);
	free(input6);
	
	printM(a);
	complex_vec_stats(a);
	complex_stats(a);
	//matrices_23_i
	
	
	int ndim7 = 2;
	int dim7[2] = {2,3};
	a = createM(ndim7, dim7, 0);
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
	int_stats(a);
	//matrices_23_d
	
	
	int ndim8 = 2;
	int dim8[2] = {2,3};
	a = createM(ndim8, dim8, 1);
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
	double_stats(a);
	//matrices_23_c
	
	
	int ndim9 = 2;
	int dim9[2] = {2,3};
	a = createM(ndim9, dim9, 2);
	complex *input9 = NULL;
	input9 = malloc( 6*sizeof(*input9));
	input9[0] = 3.25;
	input9[1] = -2;
	input9[2] = 0;
	input9[3] = 1;
	input9[4] = 5 - 1*I;
	input9[5] = 10;
	writeM( a, 6, input9);
	free(input9);
	
	printM(a);
	complex_stats(a);
	//matrices_32_i
	
	
	int ndim10 = 2;
	int dim10[2] = {3,2};
	a = createM(ndim10, dim10, 0);
	int *input10 = NULL;
	input10 = malloc( 6*sizeof(*input10));
	input10[0] = 3;
	input10[1] = -2;
	input10[2] = 0;
	input10[3] = 1;
	input10[4] = 5;
	input10[5] = 10;
	writeM( a, 6, input10);
	free(input10);
	
	printM(a);
	int_stats(a);
	//matrices_32_d
	
	
	int ndim11 = 2;
	int dim11[2] = {3,2};
	a = createM(ndim11, dim11, 1);
	double *input11 = NULL;
	input11 = malloc( 6*sizeof(*input11));
	input11[0] = 3.25;
	input11[1] = -2;
	input11[2] = 0;
	input11[3] = 1;
	input11[4] = 5;
	input11[5] = 10;
	writeM( a, 6, input11);
	free(input11);
	
	printM(a);
	double_stats(a);
	//matrices_32_c
	
	
	int ndim12 = 2;
	int dim12[2] = {3,2};
	a = createM(ndim12, dim12, 2);
	complex *input12 = NULL;
	input12 = malloc( 6*sizeof(*input12));
	input12[0] = 3.25;
	input12[1] = -2;
	input12[2] = 0;
	input12[3] = 1;
	input12[4] = 5 - 1*I;
	input12[5] = 10;
	writeM( a, 6, input12);
	free(input12);
	
	printM(a);
	complex_stats(a);
	//matrices_97_i
	
	int ndim13 = 2;
	int dim13[2] = {7, 9};
	Matrix * tmp1 = zerosM(ndim13, dim13);
	a = tmp1;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp2 = pow((-1), i);
		int tmp3 = pow(i, 2);
		int tmp5 = pow((-1), i);
		int tmp6 = pow(i, 2);
		int tmp4 = tmp5 * tmp6;
		int idx1 = convertSubscript(ndim13, dim13, i);
		lhs_data1[idx1] = tmp4;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim13; iter1++)
	{
		size1 *= dim13[iter1];
	}
	Matrix *mat1 = createM(ndim13, dim13, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp7 = transposeM(mat1);
	a = tmp7;
	printM(a);
	int_stats(a);
	//matrices_97_d
	
	int ndim14 = 2;
	int dim14[2] = {7, 9};
	Matrix * tmp8 = zerosM(ndim14, dim14);
	a = tmp8;
	int* lhs_data2 = i_to_i(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp9 = pow((-1), i);
		int tmp10 = pow(i, 2);
		int tmp12 = pow((-1), i);
		int tmp13 = pow(i, 2);
		int tmp11 = (double) tmp12 * tmp13 / 17;
		int idx2 = convertSubscript(ndim14, dim14, i);
		lhs_data2[idx2] = tmp11;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim14; iter2++)
	{
		size2 *= dim14[iter2];
	}
	Matrix *mat2 = createM(ndim14, dim14, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp14 = transposeM(mat2);
	a = tmp14;
	printM(a);
	double_stats(a);
	//matrices_97_c
	
	int ndim15 = 2;
	int dim15[2] = {7, 9};
	Matrix * tmp15 = zerosM(ndim15, dim15);
	a = tmp15;
	complex* lhs_data3 = i_to_c(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp16 = pow((-1), i);
		int tmp18 = pow((-1), i);
		complex tmp17 = tmp18 * i - ((complex) i) / (17*I);
		int idx3 = convertSubscript(ndim15, dim15, i);
		lhs_data3[idx3] = tmp17;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim15; iter3++)
	{
		size3 *= dim15[iter3];
	}
	Matrix *mat3 = createM(ndim15, dim15, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp19 = transposeM(mat3);
	a = tmp19;
	printM(a);
	complex_stats(a);
	//basic_quantile_test
	
	int vec1[100];
	
	for (int iter4 = 0; 1 + 1*iter4 <= 100; iter4++) {
		vec1[iter4] = 1 + 1*iter4;
	}
	
	int ndim16 = 2;
	int dim16[2] = {1,100};
	a = createM(ndim16, dim16, 0);
	int *input13 = NULL;
	input13 = malloc( 100*sizeof(*input13));
	for (int iter5 = 0; iter5 < 100; iter5++) {
	   input13[0 + iter5] = vec1[iter5];
	}
	writeM( a, 100, input13);
	free(input13);
	
	double vec2[101];
	
	for (int iter6 = 0; 0 + 0.01*iter6 <= 1; iter6++) {
		vec2[iter6] = 0 + 0.01*iter6;
	}
	Matrix * tmp20 = quantileM_vec(a, 101, vec2);
	Matrix * tmp21 = transposeM(tmp20);
	printM(tmp21);
	int ndim17 = 2;
	int dim17[2] = {1, 1004};
	Matrix * tmp22 = zerosM(ndim17, dim17);
	Matrix * b = tmp22;
	int* lhs_data4 = i_to_i(b);
	for (int i = 1; i <= 1004; ++ i) {
		int tmp23 = (double) i * i / 17;
		int idx4 = convertSubscript(ndim17, dim17, i);
		lhs_data4[idx4] = tmp23;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter7 = 0 ; iter7 < ndim17; iter7++)
	{
		size4 *= dim17[iter7];
	}
	Matrix *mat4 = createM(ndim17, dim17, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp24 = transposeM(mat4);
	b = tmp24;
	double vec3[101];
	
	for (int iter8 = 0; 0 + 0.01*iter8 <= 1; iter8++) {
		vec3[iter8] = 0 + 0.01*iter8;
	}
	Matrix * tmp25 = quantileM_vec(b, 101, vec3);
	Matrix * tmp26 = transposeM(tmp25);
	printM(tmp26);
	int ndim18 = 2;
	int dim18[2] = {1, 57};
	Matrix * tmp27 = zerosM(ndim18, dim18);
	Matrix * c = tmp27;
	complex* lhs_data5 = i_to_c(c);
	for (int i = 1; i <= 57; ++ i) {
		complex tmp28 = i - ((complex) i) / (17*I);
		int idx5 = convertSubscript(ndim18, dim18, i);
		lhs_data5[idx5] = tmp28;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter9 = 0 ; iter9 < ndim18; iter9++)
	{
		size5 *= dim18[iter9];
	}
	Matrix *mat5 = createM(ndim18, dim18, 2);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp29 = transposeM(mat5);
	c = tmp29;
	//disp(quantile(c, 0:0.01:1).');
	
	return 0;
}


// Subprograms

void normfit(Matrix * a, Matrix ** p_mu, Matrix ** p_sd) {
	Matrix * tmp30 = meanM(a);
	Matrix * mu = tmp30;
	Matrix * tmp31 = stdM(a);
	Matrix * sd = tmp31;
	*p_mu = mu;
	*p_sd = sd;
}

void unifit(Matrix * a, Matrix ** p_ahat, Matrix ** p_bhat) {
	Matrix * tmp32 = minM(a);
	Matrix * ahat = tmp32;
	Matrix * tmp33 = maxM(a);
	Matrix * bhat = tmp33;
	*p_ahat = ahat;
	*p_bhat = bhat;
}

void int_vec_stats(Matrix * a) {
	int index1;
	Matrix * tmp34 = maxV(a, &index1);
	Matrix * greatest = tmp34;
	printM(tmp34);
	sprintf(str, "max index: %d\n", index1);
	int index2;
	Matrix * tmp35 = minV(a, &index2);
	Matrix * least = tmp35;
	printM(tmp35);
	sprintf(str, "min index: %d\n", index2);
	Matrix * mu1 = NULL;
	Matrix * sd1 = NULL;
	normfit(a, &mu1, &sd1);
	sprintf(str, "mean: %.3f\n", mu1);
	sprintf(str, "sd: %.3f\n", sd1);
	Matrix * ahat1 = NULL;
	Matrix * bhat1 = NULL;
	unifit(a, &ahat1, &bhat1);
	sprintf(str, "a: %d\n", ahat1);
	sprintf(str, "b: %d\n", bhat1);
}

void double_vec_stats(Matrix * a) {
	int index3;
	Matrix * tmp36 = maxV(a, &index3);
	Matrix * greatest = tmp36;
	printM(tmp36);
	sprintf(str, "max index: %d\n", index3);
	int index4;
	Matrix * tmp37 = minV(a, &index4);
	Matrix * least = tmp37;
	printM(tmp37);
	sprintf(str, "min index: %d\n", index4);
	Matrix * mu2 = NULL;
	Matrix * sd2 = NULL;
	normfit(a, &mu2, &sd2);
	sprintf(str, "mean: %.3f\n", mu2);
	sprintf(str, "sd: %.3f\n", sd2);
	Matrix * ahat2 = NULL;
	Matrix * bhat2 = NULL;
	unifit(a, &ahat2, &bhat2);
	sprintf(str, "a: %.3f\n", ahat2);
	sprintf(str, "b: %.3f\n", bhat2);
}

void complex_vec_stats(Matrix * a) {
	int index5;
	Matrix * tmp38 = maxV(a, &index5);
	Matrix * greatest = tmp38;
	printM(tmp38);
	sprintf(str, "max index: %d\n", index5);
	int index6;
	Matrix * tmp39 = minV(a, &index6);
	Matrix * least = tmp39;
	printM(tmp39);
	sprintf(str, "min index: %d\n", index6);
	Matrix * mu3 = NULL;
	Matrix * sd3 = NULL;
	normfit(a, &mu3, &sd3);
	complex * tmp40 = c_to_c(mu3);
	double tmp41 = creal(tmp40[0]);
	double tmp42 = cimag(tmp40[0]);
	sprintf(str, "mean: %.3f + %.3fi\n", tmp41, tmp42);
	complex * tmp43 = c_to_c(sd3);
	double tmp44 = creal(tmp43[0]);
	double tmp45 = cimag(tmp43[0]);
	sprintf(str, "sd: %.3f + %.3fi\n", tmp44, tmp45);
	Matrix * ahat3 = NULL;
	Matrix * bhat3 = NULL;
	unifit(a, &ahat3, &bhat3);
	complex * tmp46 = c_to_c(ahat3);
	double tmp47 = creal(tmp46[0]);
	double tmp48 = cimag(tmp46[0]);
	sprintf(str, "a: %.3f + %.3fi\n", tmp47, tmp48);
	complex * tmp49 = c_to_c(bhat3);
	double tmp50 = creal(tmp49[0]);
	double tmp51 = cimag(tmp49[0]);
	sprintf(str, "b: %.3f + %.3fi\n", tmp50, tmp51);
}

void int_stats(Matrix * a) {
	
	int ndim19 = 2;
	int dim19[2] = {1,8};
	Matrix * fun_qs = createM(ndim19, dim19, 1);
	double *input14 = NULL;
	input14 = malloc( 8*sizeof(*input14));
	input14[0] = 0;
	input14[1] = 0.2;
	input14[2] = 0.9;
	input14[3] = 0.53;
	input14[4] = 0.75;
	input14[5] = 1;
	input14[6] = 0.34;
	input14[7] = 0.17;
	writeM( fun_qs, 8, input14);
	free(input14);
	
	Matrix * tmp52 = meanM(a);
	printM(tmp52);
	Matrix * tmp53 = varM(a);
	printM(tmp53);
	Matrix * tmp54 = varM(a);
	printM(tmp54);
	Matrix * tmp55 = stdM(a);
	printM(tmp55);
	Matrix * tmp56 = stdM(a);
	printM(tmp56);
	Matrix * tmp57 = sortM(a, 0);
	printM(tmp57);
	Matrix * tmp58 = sortM(a, 1);
	printM(tmp58);
	Matrix * tmp59 = medianM(a);
	printM(tmp59);
	Matrix * tmp60 = minM(a);
	printM(tmp60);
	Matrix * tmp61 = maxM(a);
	printM(tmp61);
	double vec4[4] = {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec4[i] = 0.2*i;
	}
	                
	Matrix * tmp62 = quantileM_vec(a, 4, vec4);
	printM(tmp62);
	double * vec5 = d_to_d(fun_qs);
	Matrix * tmp63 = quantileM_vec(a, 8, vec5);
	printM(tmp63);
}

void double_stats(Matrix * a) {
	
	int ndim20 = 2;
	int dim20[2] = {1,8};
	Matrix * fun_qs = createM(ndim20, dim20, 1);
	double *input15 = NULL;
	input15 = malloc( 8*sizeof(*input15));
	input15[0] = 0;
	input15[1] = 0.2;
	input15[2] = 0.9;
	input15[3] = 0.53;
	input15[4] = 0.75;
	input15[5] = 1;
	input15[6] = 0.34;
	input15[7] = 0.17;
	writeM( fun_qs, 8, input15);
	free(input15);
	
	Matrix * tmp64 = meanM(a);
	printM(tmp64);
	Matrix * tmp65 = varM(a);
	printM(tmp65);
	Matrix * tmp66 = varM(a);
	printM(tmp66);
	Matrix * tmp67 = stdM(a);
	printM(tmp67);
	Matrix * tmp68 = stdM(a);
	printM(tmp68);
	Matrix * tmp69 = sortM(a, 0);
	printM(tmp69);
	Matrix * tmp70 = sortM(a, 1);
	printM(tmp70);
	Matrix * tmp71 = medianM(a);
	printM(tmp71);
	Matrix * tmp72 = minM(a);
	printM(tmp72);
	Matrix * tmp73 = maxM(a);
	printM(tmp73);
	double vec6[4] = {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec6[i] = 0.2*i;
	}
	                
	Matrix * tmp74 = quantileM_vec(a, 4, vec6);
	printM(tmp74);
	double * vec7 = d_to_d(fun_qs);
	Matrix * tmp75 = quantileM_vec(a, 8, vec7);
	printM(tmp75);
}

void complex_stats(Matrix * a) {
	
	int ndim21 = 2;
	int dim21[2] = {1,8};
	Matrix * fun_qs = createM(ndim21, dim21, 1);
	double *input16 = NULL;
	input16 = malloc( 8*sizeof(*input16));
	input16[0] = 0;
	input16[1] = 0.2;
	input16[2] = 0.9;
	input16[3] = 0.53;
	input16[4] = 0.75;
	input16[5] = 1;
	input16[6] = 0.34;
	input16[7] = 0.17;
	writeM( fun_qs, 8, input16);
	free(input16);
	
	Matrix * tmp76 = meanM(a);
	printM(tmp76);
	Matrix * tmp77 = varM(a);
	printM(tmp77);
	Matrix * tmp78 = varM(a);
	printM(tmp78);
	Matrix * tmp79 = stdM(a);
	printM(tmp79);
	Matrix * tmp80 = stdM(a);
	printM(tmp80);
	Matrix * tmp81 = sortM(a, 0);
	printM(tmp81);
	Matrix * tmp82 = sortM(a, 1);
	printM(tmp82);
	Matrix * tmp83 = medianM(a);
	printM(tmp83);
	Matrix * tmp84 = minM(a);
	printM(tmp84);
	Matrix * tmp85 = maxM(a);
	printM(tmp85);
	//disp(quantile(a, 4));
	
	//disp(quantile(a, fun_qs));
	
}