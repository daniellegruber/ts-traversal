//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "./main.h"

// Function declarations
void normfit(Matrix * a, unknown* p_mu, unknown* p_sd);
void unifit(Matrix * a, unknown* p_ahat, unknown* p_bhat);
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
	int ndim16= 2;
	int dim16[2]= {7, 9};
	Matrix * tmp101= zerosM(ndim16, dim16);
	a = tmp101;
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 63; ++ iter1) {
		int tmp102= pow((-1), iter1);
		int tmp103= pow(iter1, 2);
		int d0_1 = iter1 % 7;
		if (d0_1 == 0) {
			d0_1 = 7;
		}
		int d1_1 = (iter1 - d0_1)/7 + 1;
		int tmp105= pow((-1), iter1);
		int tmp106= pow(iter1, 2);
		int tmp104= tmp105 * tmp106;
		lhs_data1[(d1_1-1) + (d0_1-1) * 9] = tmp104;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim16; iter2++)
	{
		size1 *= dim16[iter2];
	}
	Matrix *mat1 = createM(ndim16, dim16, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp107= transposeM(mat1);
	a = tmp107;
	printM(a);
	int_stats(a);
	//matrices_97_d
	int ndim17= 2;
	int dim17[2]= {7, 9};
	Matrix * tmp108= zerosM(ndim17, dim17);
	a = tmp108;
	int* lhs_data2 = i_to_i(a);
	for (int iter3 = 1; iter3 <= 63; ++ iter3) {
		int tmp109= pow((-1), iter3);
		int tmp110= pow(iter3, 2);
		int d0_2 = iter3 % 7;
		if (d0_2 == 0) {
			d0_2 = 7;
		}
		int d1_2 = (iter3 - d0_2)/7 + 1;
		int tmp112= pow((-1), iter3);
		int tmp113= pow(iter3, 2);
		int tmp111= tmp112 * tmp113 / 17;
		lhs_data2[(d1_2-1) + (d0_2-1) * 9] = tmp111;
	
	}
	mat1 = mat1;
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim17; iter4++)
	{
		size2 *= dim17[iter4];
	}
	Matrix *mat2 = createM(ndim17, dim17, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp114= transposeM(mat2);
	a = tmp114;
	printM(a);
	double_stats(a);
	//matrices_97_c
	int ndim18= 2;
	int dim18[2]= {7, 9};
	Matrix * tmp115= zerosM(ndim18, dim18);
	a = tmp115;
	complex* lhs_data3 = i_to_c(a);
	for (int iter5 = 1; iter5 <= 63; ++ iter5) {
		int tmp116= pow((-1), iter5);
		int d0_3 = iter5 % 7;
		if (d0_3 == 0) {
			d0_3 = 7;
		}
		int d1_3 = (iter5 - d0_3)/7 + 1;
		int tmp118= pow((-1), iter5);
		complex tmp117= tmp118 * iter5 - iter5 / 17*I;
		lhs_data3[(d1_3-1) + (d0_3-1) * 9] = tmp117;
	
	}
	mat2 = mat2;
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim18; iter6++)
	{
		size3 *= dim18[iter6];
	}
	Matrix *mat3 = createM(ndim18, dim18, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp119= transposeM(mat3);
	a = tmp119;
	printM(a);
	complex_stats(a);
	//basic_quantile_test
	a = 1;
	100;
	double vec7[101];
	
	for (int i = 0; 0 + 0.01*i < 1; i++) {
		vec7[i] = 0 + 0.01*i;
	}
	                
	Matrix * tmp120= quantileM_vec(a, 101, vec7);
	Matrix * tmp121= transposeM(tmp120);
	printM(tmp121);
	int ndim19= 2;
	int dim19[2]= {1, 1004};
	Matrix * tmp122= zerosM(ndim19, dim19);
	Matrix * b= tmp122;
	int* lhs_data4 = i_to_i(b);
	for (int iter7 = 1; iter7 <= 1004; ++ iter7) {
		int d0_4 = iter7 % 1;
		if (d0_4 == 0) {
			d0_4 = 1;
		}
		int d1_4 = (iter7 - d0_4)/1 + 1;
		int tmp123= iter7 * iter7 / 17;
		lhs_data4[(d1_4-1) + (d0_4-1)004] = tmp123;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter8 = 0 ; iter8 < ndim19; iter8++)
	{
		size4 *= dim19[iter8];
	}
	Matrix *mat4 = createM(ndim19, dim19, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp124= transposeM(mat4);
	b = tmp124;
	double vec8[101];
	
	for (int i = 0; 0 + 0.01*i < 1; i++) {
		vec8[i] = 0 + 0.01*i;
	}
	                
	Matrix * tmp125= quantileM_vec(b, 101, vec8);
	Matrix * tmp126= transposeM(tmp125);
	printM(tmp126);
	int ndim20= 2;
	int dim20[2]= {1, 57};
	Matrix * tmp127= zerosM(ndim20, dim20);
	Matrix * c= tmp127;
	complex* lhs_data5 = c_to_c(c);
	for (int iter9 = 1; iter9 <= 57; ++ iter9) {
		int d0_5 = iter9 % 1;
		if (d0_5 == 0) {
			d0_5 = 1;
		}
		int d1_5 = (iter9 - d0_5)/1 + 1;
		complex tmp128= iter9 - iter9 / 17*I;
		lhs_data5[(d1_5-1) + (d0_5-1) * 57] = tmp128;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter10 = 0 ; iter10 < ndim20; iter10++)
	{
		size5 *= dim20[iter10];
	}
	Matrix *mat5 = createM(ndim20, dim20, 2);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp129= transposeM(mat5);
	c = tmp129;
	double vec9[101];
	
	for (int i = 0; 0 + 0.01*i < 1; i++) {
		vec9[i] = 0 + 0.01*i;
	}
	                
	Matrix * tmp130= quantileM_vec(c, 101, vec9);
	Matrix * tmp131= transposeM(tmp130);
	printM(tmp131);
	return 0;
}


// Subprograms

void normfit(Matrix * a, unknown* p_mu, unknown* p_sd) {
	Matrix * tmp1= meanM(a);
	Matrix * mu= tmp1;
	Matrix * tmp2= stdM(a);
	Matrix * sd= tmp2;
	complex * tmp3 = c_to_c(mu);
	complex * tmp4 = c_to_c(sd);
	*p_mu = tmp3[0];
	*p_sd = tmp4[0];
}

void unifit(Matrix * a, unknown* p_ahat, unknown* p_bhat) {
	Matrix * tmp5= minM(a);
	Matrix * ahat= tmp5;
	Matrix * tmp6= maxM(a);
	Matrix * bhat= tmp6;
	complex * tmp7 = c_to_c(ahat);
	complex * tmp8 = c_to_c(bhat);
	*p_ahat = tmp7[0];
	*p_bhat = tmp8[0];
}

void int_vec_stats(Matrix * a) {
	int index1;
	Matrix * tmp9= maxV(a, &index1);
	Matrix * greatest= tmp9;
	int * tmp10 = i_to_i(tmp9);
	printf("\n%d\n", tmp10[0]);
	printf("max index: %d\n", index1);
	int index2;
	Matrix * tmp11= minV(a, &index2);
	Matrix * least= tmp11;
	int * tmp12 = i_to_i(tmp11);
	printf("\n%d\n", tmp12[0]);
	printf("min index: %d\n", index2);
	Matrix * mu1= NULL;
	Matrix * sd1= NULL;
	normfit(a, &mu1, &sd1);
	double * tmp13 = d_to_d(mu1);
	printf("mean: %.3f\n", tmp13[0]);
	double * tmp14 = d_to_d(sd1);
	printf("sd: %.3f\n", tmp14[0]);
	Matrix * ahat1= NULL;
	Matrix * bhat1= NULL;
	unifit(a, &ahat1, &bhat1);
	int * tmp15 = i_to_i(ahat1);
	printf("a: %d\n", tmp15[0]);
	int * tmp16 = i_to_i(bhat1);
	printf("b: %d\n", tmp16[0]);
}

void double_vec_stats(Matrix * a) {
	int index3;
	Matrix * tmp17= maxV(a, &index3);
	Matrix * greatest= tmp17;
	double * tmp18 = d_to_d(tmp17);
	printf("\n%d\n", tmp18[0]);
	printf("max index: %d\n", index3);
	int index4;
	Matrix * tmp19= minV(a, &index4);
	Matrix * least= tmp19;
	double * tmp20 = d_to_d(tmp19);
	printf("\n%d\n", tmp20[0]);
	printf("min index: %d\n", index4);
	Matrix * mu2= NULL;
	Matrix * sd2= NULL;
	normfit(a, &mu2, &sd2);
	double * tmp21 = d_to_d(mu2);
	printf("mean: %.3f\n", tmp21[0]);
	double * tmp22 = d_to_d(sd2);
	printf("sd: %.3f\n", tmp22[0]);
	Matrix * ahat2= NULL;
	Matrix * bhat2= NULL;
	unifit(a, &ahat2, &bhat2);
	double * tmp23 = d_to_d(ahat2);
	printf("a: %.3f\n", tmp23[0]);
	double * tmp24 = d_to_d(bhat2);
	printf("b: %.3f\n", tmp24[0]);
}

void complex_vec_stats(Matrix * a) {
	int index5;
	Matrix * tmp25= maxV(a, &index5);
	Matrix * greatest= tmp25;
	complex * tmp26 = c_to_c(tmp25);
	printf("\n%d\n", tmp26[0]);
	printf("max index: %d\n", index5);
	int index6;
	Matrix * tmp27= minV(a, &index6);
	Matrix * least= tmp27;
	complex * tmp28 = c_to_c(tmp27);
	printf("\n%d\n", tmp28[0]);
	printf("min index: %d\n", index6);
	Matrix * mu3= NULL;
	Matrix * sd3= NULL;
	normfit(a, &mu3, &sd3);
	complex * tmp29 = c_to_c(mu3);
	double tmp30= creal(tmp29[0]);
	double tmp31= cimag(tmp29[0]);
	printf("mean: %.3f + %.3fi\n", tmp30);
	complex * tmp32 = c_to_c(sd3);
	double tmp33= creal(tmp32[0]);
	double tmp34= cimag(tmp32[0]);
	printf("sd: %.3f + %.3fi\n", tmp33);
	Matrix * ahat3= NULL;
	Matrix * bhat3= NULL;
	unifit(a, &ahat3, &bhat3);
	complex * tmp35 = c_to_c(ahat3);
	double tmp36= creal(tmp35[0]);
	double tmp37= cimag(tmp35[0]);
	printf("a: %.3f + %.3fi\n", tmp36);
	complex * tmp38 = c_to_c(bhat3);
	double tmp39= creal(tmp38[0]);
	double tmp40= cimag(tmp38[0]);
	printf("b: %.3f + %.3fi\n", tmp39);
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
	
	Matrix * tmp41= meanM(a);
	double * tmp42 = d_to_d(tmp41);
	printf("\n%d\n", tmp42[0]);
	Matrix * tmp43= varM(a);
	double * tmp44 = d_to_d(tmp43);
	printf("\n%d\n", tmp44[0]);
	Matrix * tmp45= varM(a);
	double * tmp46 = d_to_d(tmp45);
	printf("\n%d\n", tmp46[0]);
	Matrix * tmp47= stdM(a);
	double * tmp48 = d_to_d(tmp47);
	printf("\n%d\n", tmp48[0]);
	Matrix * tmp49= stdM(a);
	double * tmp50 = d_to_d(tmp49);
	printf("\n%d\n", tmp50[0]);
	Matrix * tmp51= sortM(a, 0);
	printM(tmp51);
	Matrix * tmp52= sortM(a, 1);
	printM(tmp52);
	Matrix * tmp53= medianM(a);
	int * tmp54 = i_to_i(tmp53);
	printf("\n%d\n", tmp54[0]);
	Matrix * tmp55= minM(a);
	int * tmp56 = i_to_i(tmp55);
	printf("\n%d\n", tmp56[0]);
	Matrix * tmp57= maxM(a);
	int * tmp58 = i_to_i(tmp57);
	printf("\n%d\n", tmp58[0]);
	double vec1[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec1[i] = 0.2*i;
	}
	                
	Matrix * tmp59= quantileM_vec(a, 4, vec1);
	printM(tmp59);
	double * vec2= d_to_d(fun_qs);
	Matrix * tmp60= quantileM_vec(a, 10, vec2);
	printM(tmp60);
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
	
	Matrix * tmp61= meanM(a);
	double * tmp62 = d_to_d(tmp61);
	printf("\n%d\n", tmp62[0]);
	Matrix * tmp63= varM(a);
	double * tmp64 = d_to_d(tmp63);
	printf("\n%d\n", tmp64[0]);
	Matrix * tmp65= varM(a);
	double * tmp66 = d_to_d(tmp65);
	printf("\n%d\n", tmp66[0]);
	Matrix * tmp67= stdM(a);
	double * tmp68 = d_to_d(tmp67);
	printf("\n%d\n", tmp68[0]);
	Matrix * tmp69= stdM(a);
	double * tmp70 = d_to_d(tmp69);
	printf("\n%d\n", tmp70[0]);
	Matrix * tmp71= sortM(a, 0);
	printM(tmp71);
	Matrix * tmp72= sortM(a, 1);
	printM(tmp72);
	Matrix * tmp73= medianM(a);
	int * tmp74 = i_to_i(tmp73);
	printf("\n%d\n", tmp74[0]);
	Matrix * tmp75= minM(a);
	int * tmp76 = i_to_i(tmp75);
	printf("\n%d\n", tmp76[0]);
	Matrix * tmp77= maxM(a);
	int * tmp78 = i_to_i(tmp77);
	printf("\n%d\n", tmp78[0]);
	double vec3[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec3[i] = 0.2*i;
	}
	                
	Matrix * tmp79= quantileM_vec(a, 4, vec3);
	printM(tmp79);
	double * vec4= d_to_d(fun_qs);
	Matrix * tmp80= quantileM_vec(a, 10, vec4);
	printM(tmp80);
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
	
	Matrix * tmp81= meanM(a);
	complex * tmp82 = c_to_c(tmp81);
	printf("\n%d\n", tmp82[0]);
	Matrix * tmp83= varM(a);
	complex * tmp84 = c_to_c(tmp83);
	printf("\n%d\n", tmp84[0]);
	Matrix * tmp85= varM(a);
	complex * tmp86 = c_to_c(tmp85);
	printf("\n%d\n", tmp86[0]);
	Matrix * tmp87= stdM(a);
	complex * tmp88 = c_to_c(tmp87);
	printf("\n%d\n", tmp88[0]);
	Matrix * tmp89= stdM(a);
	complex * tmp90 = c_to_c(tmp89);
	printf("\n%d\n", tmp90[0]);
	Matrix * tmp91= sortM(a, 0);
	printM(tmp91);
	Matrix * tmp92= sortM(a, 1);
	printM(tmp92);
	Matrix * tmp93= medianM(a);
	complex * tmp94 = c_to_c(tmp93);
	printf("\n%d\n", tmp94[0]);
	Matrix * tmp95= minM(a);
	complex * tmp96 = c_to_c(tmp95);
	printf("\n%d\n", tmp96[0]);
	Matrix * tmp97= maxM(a);
	complex * tmp98 = c_to_c(tmp97);
	printf("\n%d\n", tmp98[0]);
	double vec5[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec5[i] = 0.2*i;
	}
	                
	Matrix * tmp99= quantileM_vec(a, 4, vec5);
	printM(tmp99);
	double * vec6= d_to_d(fun_qs);
	Matrix * tmp100= quantileM_vec(a, 10, vec6);
	printM(tmp100);
}