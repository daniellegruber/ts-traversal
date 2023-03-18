//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
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
	
	int ndim4 = 2;
	int dim4[2] = {1,4};
	Matrix * a = createM(ndim4, dim4, 0);
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
	//row_vectors_d
	
	int ndim5 = 2;
	int dim5[2] = {1,4};
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
	//row_vectors_c
	
	int ndim6 = 2;
	int dim6[2] = {1,4};
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
	//column_vectors_i
	
	int ndim7 = 2;
	int dim7[2] = {4,1};
	a = createM(ndim7, dim7, 0);
	int *input7 = NULL;
	input7 = malloc( 4*sizeof(*input7));
	input7[0] = 3;
	input7[1] = -5;
	input7[2] = 0;
	input7[3] = 1;
	writeM( a, 4, input7);
	free(input7);
	
	printM(a);
	int_vec_stats(a);
	int_stats(a);
	//column_vectors_d
	
	int ndim8 = 2;
	int dim8[2] = {4,1};
	a = createM(ndim8, dim8, 1);
	double *input8 = NULL;
	input8 = malloc( 4*sizeof(*input8));
	input8[0] = 3.25;
	input8[1] = -2;
	input8[2] = 0;
	input8[3] = 10.1;
	writeM( a, 4, input8);
	free(input8);
	
	printM(a);
	double_vec_stats(a);
	double_stats(a);
	//column_vectors_c
	
	int ndim9 = 2;
	int dim9[2] = {4,1};
	a = createM(ndim9, dim9, 2);
	complex *input9 = NULL;
	input9 = malloc( 4*sizeof(*input9));
	input9[0] = 3.25;
	input9[1] = -2;
	input9[2] = 0;
	input9[3] = 1 - 1*I;
	writeM( a, 4, input9);
	free(input9);
	
	printM(a);
	complex_vec_stats(a);
	complex_stats(a);
	//matrices_23_i
	
	int ndim10 = 2;
	int dim10[2] = {2,3};
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
	//matrices_23_d
	
	int ndim11 = 2;
	int dim11[2] = {2,3};
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
	//matrices_23_c
	
	int ndim12 = 2;
	int dim12[2] = {2,3};
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
	//matrices_32_i
	
	int ndim13 = 2;
	int dim13[2] = {3,2};
	a = createM(ndim13, dim13, 0);
	int *input13 = NULL;
	input13 = malloc( 6*sizeof(*input13));
	input13[0] = 3;
	input13[1] = -2;
	input13[2] = 0;
	input13[3] = 1;
	input13[4] = 5;
	input13[5] = 10;
	writeM( a, 6, input13);
	free(input13);
	
	printM(a);
	int_stats(a);
	//matrices_32_d
	
	int ndim14 = 2;
	int dim14[2] = {3,2};
	a = createM(ndim14, dim14, 1);
	double *input14 = NULL;
	input14 = malloc( 6*sizeof(*input14));
	input14[0] = 3.25;
	input14[1] = -2;
	input14[2] = 0;
	input14[3] = 1;
	input14[4] = 5;
	input14[5] = 10;
	writeM( a, 6, input14);
	free(input14);
	
	printM(a);
	double_stats(a);
	//matrices_32_c
	
	int ndim15 = 2;
	int dim15[2] = {3,2};
	a = createM(ndim15, dim15, 2);
	complex *input15 = NULL;
	input15 = malloc( 6*sizeof(*input15));
	input15[0] = 3.25;
	input15[1] = -2;
	input15[2] = 0;
	input15[3] = 1;
	input15[4] = 5 - 1*I;
	input15[5] = 10;
	writeM( a, 6, input15);
	free(input15);
	
	printM(a);
	complex_stats(a);
	//matrices_97_i
	int ndim16 = 2;
	int dim16[2] = {7, 9};
	Matrix * tmp59 = zerosM(ndim16, dim16);
	a = tmp59;
	int* lhs_data1 = i_to_i(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp60 = pow((-1), i);
		int tmp61 = pow(i, 2);
		int d0_1 = i % 7;
		if (d0_1 == 0) {
			d0_1 = 7;
		}
		int d1_1 = (i - d0_1)/7 + 1;
		int tmp63 = pow((-1), i);
		int tmp64 = pow(i, 2);
		int tmp62 = tmp63 * tmp64;
		lhs_data1[(d1_1-1) + (d0_1-1) * 9] = tmp62;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter1 = 0 ; iter1 < ndim16; iter1++)
	{
		size1 *= dim16[iter1];
	}
	Matrix *mat1 = createM(ndim16, dim16, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp65 = transposeM(mat1);
	a = tmp65;
	printM(a);
	int_stats(a);
	//matrices_97_d
	int ndim17 = 2;
	int dim17[2] = {7, 9};
	Matrix * tmp66 = zerosM(ndim17, dim17);
	a = tmp66;
	int* lhs_data2 = i_to_i(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp67 = pow((-1), i);
		int tmp68 = pow(i, 2);
		int d0_2 = i % 7;
		if (d0_2 == 0) {
			d0_2 = 7;
		}
		int d1_2 = (i - d0_2)/7 + 1;
		int tmp70 = pow((-1), i);
		int tmp71 = pow(i, 2);
		int tmp69 = (double) tmp70 * tmp71 / 17;
		lhs_data2[(d1_2-1) + (d0_2-1) * 9] = tmp69;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter2 = 0 ; iter2 < ndim17; iter2++)
	{
		size2 *= dim17[iter2];
	}
	Matrix *mat2 = createM(ndim17, dim17, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp72 = transposeM(mat2);
	a = tmp72;
	printM(a);
	double_stats(a);
	//matrices_97_c
	int ndim18 = 2;
	int dim18[2] = {7, 9};
	Matrix * tmp73 = zerosM(ndim18, dim18);
	a = tmp73;
	complex* lhs_data3 = i_to_c(a);
	for (int i = 1; i <= 63; ++ i) {
		int tmp74 = pow((-1), i);
		int d0_3 = i % 7;
		if (d0_3 == 0) {
			d0_3 = 7;
		}
		int d1_3 = (i - d0_3)/7 + 1;
		int tmp76 = pow((-1), i);
		complex tmp75 = tmp76 * i - ((complex) i) / (17*I);
		lhs_data3[(d1_3-1) + (d0_3-1) * 9] = tmp75;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter3 = 0 ; iter3 < ndim18; iter3++)
	{
		size3 *= dim18[iter3];
	}
	Matrix *mat3 = createM(ndim18, dim18, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp77 = transposeM(mat3);
	a = tmp77;
	printM(a);
	complex_stats(a);
	//basic_quantile_test
	int vec7[100];
	
	for (int iter4 = 0; 1 + 1*iter4 <= 100; iter4++) {
		vec7[iter4] = 1 + 1*iter4;
	}
	
	int ndim19 = 2;
	int dim19[2] = {1,100};
	a = createM(ndim19, dim19, 0);
	int *input16 = NULL;
	input16 = malloc( 100*sizeof(*input16));
	for (int iter5 = 0; iter5 < 100; iter5++) {
	   input16[0 + iter5] = vec7[iter5];
	}
	writeM( a, 100, input16);
	free(input16);
	
	double vec8[101];
	
	for (int iter6 = 0; 0 + 0.01*iter6 <= 1; iter6++) {
		vec8[iter6] = 0 + 0.01*iter6;
	}
	Matrix * tmp78 = quantileM_vec(a, 101, vec8);
	Matrix * tmp79 = transposeM(tmp78);
	printM(tmp79);
	int ndim20 = 2;
	int dim20[2] = {1, 1004};
	Matrix * tmp80 = zerosM(ndim20, dim20);
	Matrix * b = tmp80;
	int* lhs_data4 = i_to_i(b);
	for (int i = 1; i <= 1004; ++ i) {
		int d0_4 = i % 1;
		if (d0_4 == 0) {
			d0_4 = 1;
		}
		int d1_4 = (i - d0_4)/1 + 1;
		int tmp81 = (double) i * i / 17;
		lhs_data4[(d1_4-1) + (d0_4-1) * 1004] = tmp81;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter7 = 0 ; iter7 < ndim20; iter7++)
	{
		size4 *= dim20[iter7];
	}
	Matrix *mat4 = createM(ndim20, dim20, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp82 = transposeM(mat4);
	b = tmp82;
	double vec9[101];
	
	for (int iter8 = 0; 0 + 0.01*iter8 <= 1; iter8++) {
		vec9[iter8] = 0 + 0.01*iter8;
	}
	Matrix * tmp83 = quantileM_vec(b, 101, vec9);
	Matrix * tmp84 = transposeM(tmp83);
	printM(tmp84);
	int ndim21 = 2;
	int dim21[2] = {1, 57};
	Matrix * tmp85 = zerosM(ndim21, dim21);
	Matrix * c = tmp85;
	complex* lhs_data5 = i_to_c(c);
	for (int i = 1; i <= 57; ++ i) {
		int d0_5 = i % 1;
		if (d0_5 == 0) {
			d0_5 = 1;
		}
		int d1_5 = (i - d0_5)/1 + 1;
		complex tmp86 = i - ((complex) i) / (17*I);
		lhs_data5[(d1_5-1) + (d0_5-1) * 57] = tmp86;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter9 = 0 ; iter9 < ndim21; iter9++)
	{
		size5 *= dim21[iter9];
	}
	Matrix *mat5 = createM(ndim21, dim21, 2);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp87 = transposeM(mat5);
	c = tmp87;
	double vec10[101];
	
	for (int iter10 = 0; 0 + 0.01*iter10 <= 1; iter10++) {
		vec10[iter10] = 0 + 0.01*iter10;
	}
	Matrix * tmp88 = quantileM_vec(c, 101, vec10);
	Matrix * tmp89 = transposeM(tmp88);
	printM(tmp89);
	return 0;
}


// Subprograms

void normfit(Matrix * a, Matrix ** p_mu, Matrix ** p_sd) {
	Matrix * tmp1 = meanM(a);
	Matrix * mu = tmp1;
	Matrix * tmp2 = stdM(a);
	Matrix * sd = tmp2;
	*p_mu = mu;
	*p_sd = sd;
}

void unifit(Matrix * a, Matrix ** p_ahat, Matrix ** p_bhat) {
	Matrix * tmp3 = minM(a);
	Matrix * ahat = tmp3;
	Matrix * tmp4 = maxM(a);
	Matrix * bhat = tmp4;
	*p_ahat = ahat;
	*p_bhat = bhat;
}

void int_vec_stats(Matrix * a) {
	int index1;
	Matrix * tmp5 = maxV(a, &index1);
	Matrix * greatest = tmp5;
	printM(tmp5);
	printf("max index: %d\n", index1);
	int index2;
	Matrix * tmp6 = minV(a, &index2);
	Matrix * least = tmp6;
	printM(tmp6);
	printf("min index: %d\n", index2);
	Matrix * mu1 = NULL;
	Matrix * sd1 = NULL;
	normfit(a, &mu1, &sd1);
	printM(mu1);
	printM(sd1);
	Matrix * ahat1 = NULL;
	Matrix * bhat1 = NULL;
	unifit(a, &ahat1, &bhat1);
	printM(ahat1);
	printM(bhat1);
}

void double_vec_stats(Matrix * a) {
	int index3;
	Matrix * tmp7 = maxV(a, &index3);
	Matrix * greatest = tmp7;
	printM(tmp7);
	printf("max index: %d\n", index3);
	int index4;
	Matrix * tmp8 = minV(a, &index4);
	Matrix * least = tmp8;
	printM(tmp8);
	printf("min index: %d\n", index4);
	Matrix * mu2 = NULL;
	Matrix * sd2 = NULL;
	normfit(a, &mu2, &sd2);
	printM(mu2);
	printM(sd2);
	Matrix * ahat2 = NULL;
	Matrix * bhat2 = NULL;
	unifit(a, &ahat2, &bhat2);
	printM(ahat2);
	printM(bhat2);
}

void complex_vec_stats(Matrix * a) {
	int index5;
	Matrix * tmp9 = maxV(a, &index5);
	Matrix * greatest = tmp9;
	printM(tmp9);
	printf("max index: %d\n", index5);
	int index6;
	Matrix * tmp10 = minV(a, &index6);
	Matrix * least = tmp10;
	printM(tmp10);
	printf("min index: %d\n", index6);
	Matrix * mu3 = NULL;
	Matrix * sd3 = NULL;
	normfit(a, &mu3, &sd3);
	complex * tmp11 = c_to_c(mu3);
	double tmp12 = creal(tmp11[0]);
	double tmp13 = cimag(tmp11[0]);
	printf("mean: %.3f + %.3fi\n", tmp12, tmp13);
	complex * tmp14 = c_to_c(sd3);
	double tmp15 = creal(tmp14[0]);
	double tmp16 = cimag(tmp14[0]);
	printf("sd: %.3f + %.3fi\n", tmp15, tmp16);
	Matrix * ahat3 = NULL;
	Matrix * bhat3 = NULL;
	unifit(a, &ahat3, &bhat3);
	complex * tmp17 = c_to_c(ahat3);
	double tmp18 = creal(tmp17[0]);
	double tmp19 = cimag(tmp17[0]);
	printf("a: %.3f + %.3fi\n", tmp18, tmp19);
	complex * tmp20 = c_to_c(bhat3);
	double tmp21 = creal(tmp20[0]);
	double tmp22 = cimag(tmp20[0]);
	printf("b: %.3f + %.3fi\n", tmp21, tmp22);
}

void int_stats(Matrix * a) {
	
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
	
	Matrix * tmp23 = meanM(a);
	printM(tmp23);
	Matrix * tmp24 = varM(a);
	printM(tmp24);
	Matrix * tmp25 = varM(a);
	printM(tmp25);
	Matrix * tmp26 = stdM(a);
	printM(tmp26);
	Matrix * tmp27 = stdM(a);
	printM(tmp27);
	Matrix * tmp28 = sortM(a, 0);
	printM(tmp28);
	Matrix * tmp29 = sortM(a, 1);
	printM(tmp29);
	Matrix * tmp30 = medianM(a);
	printM(tmp30);
	Matrix * tmp31 = minM(a);
	printM(tmp31);
	Matrix * tmp32 = maxM(a);
	printM(tmp32);
	double vec1[4] = {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec1[i] = 0.2*i;
	}
	                
	Matrix * tmp33 = quantileM_vec(a, 4, vec1);
	printM(tmp33);
	double * vec2 = d_to_d(fun_qs);
	Matrix * tmp34 = quantileM_vec(a, 10, vec2);
	printM(tmp34);
}

void double_stats(Matrix * a) {
	
	int ndim2 = 2;
	int dim2[2] = {1,10};
	Matrix * fun_qs = createM(ndim2, dim2, 1);
	double *input2 = NULL;
	input2 = malloc( 10*sizeof(*input2));
	input2[0] = 0;
	input2[1] = -1;
	input2[2] = 3;
	input2[3] = 0.2;
	input2[4] = 0.9;
	input2[5] = 0.53;
	input2[6] = 0.75;
	input2[7] = 1;
	input2[8] = 0.34;
	input2[9] = 0.17;
	writeM( fun_qs, 10, input2);
	free(input2);
	
	Matrix * tmp35 = meanM(a);
	printM(tmp35);
	Matrix * tmp36 = varM(a);
	printM(tmp36);
	Matrix * tmp37 = varM(a);
	printM(tmp37);
	Matrix * tmp38 = stdM(a);
	printM(tmp38);
	Matrix * tmp39 = stdM(a);
	printM(tmp39);
	Matrix * tmp40 = sortM(a, 0);
	printM(tmp40);
	Matrix * tmp41 = sortM(a, 1);
	printM(tmp41);
	Matrix * tmp42 = medianM(a);
	printM(tmp42);
	Matrix * tmp43 = minM(a);
	printM(tmp43);
	Matrix * tmp44 = maxM(a);
	printM(tmp44);
	double vec3[4] = {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec3[i] = 0.2*i;
	}
	                
	Matrix * tmp45 = quantileM_vec(a, 4, vec3);
	printM(tmp45);
	double * vec4 = d_to_d(fun_qs);
	Matrix * tmp46 = quantileM_vec(a, 10, vec4);
	printM(tmp46);
}

void complex_stats(Matrix * a) {
	
	int ndim3 = 2;
	int dim3[2] = {1,10};
	Matrix * fun_qs = createM(ndim3, dim3, 1);
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
	
	Matrix * tmp47 = meanM(a);
	printM(tmp47);
	Matrix * tmp48 = varM(a);
	printM(tmp48);
	Matrix * tmp49 = varM(a);
	printM(tmp49);
	Matrix * tmp50 = stdM(a);
	printM(tmp50);
	Matrix * tmp51 = stdM(a);
	printM(tmp51);
	Matrix * tmp52 = sortM(a, 0);
	printM(tmp52);
	Matrix * tmp53 = sortM(a, 1);
	printM(tmp53);
	Matrix * tmp54 = medianM(a);
	printM(tmp54);
	Matrix * tmp55 = minM(a);
	printM(tmp55);
	Matrix * tmp56 = maxM(a);
	printM(tmp56);
	double vec5[4] = {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec5[i] = 0.2*i;
	}
	                
	Matrix * tmp57 = quantileM_vec(a, 4, vec5);
	printM(tmp57);
	double * vec6 = d_to_d(fun_qs);
	Matrix * tmp58 = quantileM_vec(a, 10, vec6);
	printM(tmp58);
}