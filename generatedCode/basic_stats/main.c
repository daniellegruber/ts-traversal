//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "./main.h"

// Function declarations
void normfit(Matrix * a, complex* p_mu, complex* p_sd);
void unifit(Matrix * a, complex* p_ahat, complex* p_bhat);
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
	Matrix * tmp89= zerosM(ndim16, dim16);
	a = tmp89;
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 63; ++ iter1) {
		int tmp90= pow((-1), iter1);
		int tmp91= pow(iter1, 2);
		int d0_1 = iter1 % 7;
		if (d0_1 == 0) {
			d0_1 = 7;
		}
		int d1_1 = (iter1 - d0_1)/7 + 1;
		int tmp93= pow((-1), iter1);
		int tmp94= pow(iter1, 2);
		int tmp92= tmp93 * tmp94;
		lhs_data1[(d1_1-1) + (d0_1-1) * 9] = tmp92;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim16; iter2++)
	{
		size1 *= dim16[iter2];
	}
	Matrix *mat1 = createM(ndim16, dim16, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp95= transposeM(mat1);
	a = tmp95;
	printM(a);
	int_stats(a);
	//matrices_97_d
	int ndim17= 2;
	int dim17[2]= {7, 9};
	Matrix * tmp96= zerosM(ndim17, dim17);
	a = tmp96;
	int* lhs_data2 = i_to_i(a);
	for (int iter3 = 1; iter3 <= 63; ++ iter3) {
		int tmp97= pow((-1), iter3);
		int tmp98= pow(iter3, 2);
		int d0_2 = iter3 % 7;
		if (d0_2 == 0) {
			d0_2 = 7;
		}
		int d1_2 = (iter3 - d0_2)/7 + 1;
		int tmp100= pow((-1), iter3);
		int tmp101= pow(iter3, 2);
		int tmp99= tmp100 * tmp101 / 17;
		lhs_data2[(d1_2-1) + (d0_2-1) * 9] = tmp99;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim17; iter4++)
	{
		size2 *= dim17[iter4];
	}
	Matrix *mat2 = createM(ndim17, dim17, 0);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp102= transposeM(mat2);
	a = tmp102;
	printM(a);
	double_stats(a);
	//matrices_97_c
	int ndim18= 2;
	int dim18[2]= {7, 9};
	Matrix * tmp103= zerosM(ndim18, dim18);
	a = tmp103;
	complex* lhs_data3 = c_to_c(a);
	for (int iter5 = 1; iter5 <= 63; ++ iter5) {
		int tmp104= pow((-1), iter5);
		int d0_3 = iter5 % 7;
		if (d0_3 == 0) {
			d0_3 = 7;
		}
		int d1_3 = (iter5 - d0_3)/7 + 1;
		int tmp106= pow((-1), iter5);
		complex tmp105= tmp106 * iter5 - iter5 / 17*I;
		lhs_data3[(d1_3-1) + (d0_3-1) * 9] = tmp105;
	
	}
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim18; iter6++)
	{
		size3 *= dim18[iter6];
	}
	Matrix *mat3 = createM(ndim18, dim18, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp107= transposeM(mat3);
	a = tmp107;
	printM(a);
	complex_stats(a);
	//basic_quantile_test
	int vec7[100];
	
	for (int iter7 = 0; 1 + 1*iter7 <= 100; iter7++) {
		vec7[iter7] = 1 + 1*iter7;
	}
	
	int ndim19 = 2;
	int dim19[2] = {1,100};
	a = createM(ndim19, dim19, 0);
	int *input16 = NULL;
	input16 = malloc( 100*sizeof(*input16));
	for (int iter8 = 0; iter8 < 100; iter8++) {
	   input16[0 + iter8] = vec7[iter8];
	}
	writeM( a, 100, input16);
	free(input16);
	
	double vec8[101];
	
	for (int iter9 = 0; 0 + 0.01*iter9 <= 1; iter9++) {
		vec8[iter9] = 0 + 0.01*iter9;
	}
	Matrix * tmp108= quantileM_vec(a, 101, vec8);
	Matrix * tmp109= transposeM(tmp108);
	printM(tmp109);
	int ndim20= 2;
	int dim20[2]= {1, 1004};
	Matrix * tmp110= zerosM(ndim20, dim20);
	Matrix * b= tmp110;
	int* lhs_data4 = i_to_i(b);
	for (int iter10 = 1; iter10 <= 1004; ++ iter10) {
		int d0_4 = iter10 % 1;
		if (d0_4 == 0) {
			d0_4 = 1;
		}
		int d1_4 = (iter10 - d0_4)/1 + 1;
		int tmp111= iter10 * iter10 / 17;
		lhs_data4[(d1_4-1) + (d0_4-1) * 1004] = tmp111;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter11 = 0 ; iter11 < ndim20; iter11++)
	{
		size4 *= dim20[iter11];
	}
	Matrix *mat4 = createM(ndim20, dim20, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp112= transposeM(mat4);
	b = tmp112;
	double vec9[101];
	
	for (int iter12 = 0; 0 + 0.01*iter12 <= 1; iter12++) {
		vec9[iter12] = 0 + 0.01*iter12;
	}
	Matrix * tmp113= quantileM_vec(b, 101, vec9);
	Matrix * tmp114= transposeM(tmp113);
	printM(tmp114);
	int ndim21= 2;
	int dim21[2]= {1, 57};
	Matrix * tmp115= zerosM(ndim21, dim21);
	Matrix * c= tmp115;
	complex* lhs_data5 = c_to_c(c);
	for (int iter13 = 1; iter13 <= 57; ++ iter13) {
		int d0_5 = iter13 % 1;
		if (d0_5 == 0) {
			d0_5 = 1;
		}
		int d1_5 = (iter13 - d0_5)/1 + 1;
		complex tmp116= iter13 - iter13 / 17*I;
		lhs_data5[(d1_5-1) + (d0_5-1) * 57] = tmp116;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter14 = 0 ; iter14 < ndim21; iter14++)
	{
		size5 *= dim21[iter14];
	}
	Matrix *mat5 = createM(ndim21, dim21, 2);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp117= transposeM(mat5);
	c = tmp117;
	double vec10[101];
	
	for (int iter15 = 0; 0 + 0.01*iter15 <= 1; iter15++) {
		vec10[iter15] = 0 + 0.01*iter15;
	}
	Matrix * tmp118= quantileM_vec(c, 101, vec10);
	Matrix * tmp119= transposeM(tmp118);
	printM(tmp119);
	return 0;
}


// Subprograms

void normfit(Matrix * a, complex* p_mu, complex* p_sd) {
	Matrix * tmp1= meanM(a);
	Matrix * mu= tmp1;
	Matrix * tmp2= stdM(a);
	Matrix * sd= tmp2;
	complex * tmp3 = c_to_c(mu);
	complex * tmp4 = c_to_c(sd);
	*p_mu = tmp3[0];
	*p_sd = tmp4[0];
}

void unifit(Matrix * a, complex* p_ahat, complex* p_bhat) {
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
	complex mu1;
	complex sd1;
	normfit(a, &mu1, &sd1);
	printf("mean: %.3f\n", mu1);
	printf("sd: %.3f\n", sd1);
	complex ahat1;
	complex bhat1;
	unifit(a, &ahat1, &bhat1);
	printf("a: %d\n", ahat1);
	printf("b: %d\n", bhat1);
}

void double_vec_stats(Matrix * a) {
	int index3;
	Matrix * tmp13= maxV(a, &index3);
	Matrix * greatest= tmp13;
	double * tmp14 = d_to_d(tmp13);
	printf("\n%f\n", tmp14[0]);
	printf("max index: %d\n", index3);
	int index4;
	Matrix * tmp15= minV(a, &index4);
	Matrix * least= tmp15;
	double * tmp16 = d_to_d(tmp15);
	printf("\n%f\n", tmp16[0]);
	printf("min index: %d\n", index4);
	complex mu2;
	complex sd2;
	normfit(a, &mu2, &sd2);
	printf("mean: %.3f\n", mu2);
	printf("sd: %.3f\n", sd2);
	complex ahat2;
	complex bhat2;
	unifit(a, &ahat2, &bhat2);
	printf("a: %.3f\n", ahat2);
	printf("b: %.3f\n", bhat2);
}

void complex_vec_stats(Matrix * a) {
	int index5;
	Matrix * tmp17= maxV(a, &index5);
	Matrix * greatest= tmp17;
	complex * tmp18 = c_to_c(tmp17);
	printf("\n%f\n", tmp18[0]);
	printf("max index: %d\n", index5);
	int index6;
	Matrix * tmp19= minV(a, &index6);
	Matrix * least= tmp19;
	complex * tmp20 = c_to_c(tmp19);
	printf("\n%f\n", tmp20[0]);
	printf("min index: %d\n", index6);
	complex mu3;
	complex sd3;
	normfit(a, &mu3, &sd3);
	double tmp21= creal(mu3);
	double tmp22= cimag(mu3);
	printf("mean: %.3f + %.3fi\n", tmp21, tmp22);
	double tmp23= creal(sd3);
	double tmp24= cimag(sd3);
	printf("sd: %.3f + %.3fi\n", tmp23, tmp24);
	complex ahat3;
	complex bhat3;
	unifit(a, &ahat3, &bhat3);
	double tmp25= creal(ahat3);
	double tmp26= cimag(ahat3);
	printf("a: %.3f + %.3fi\n", tmp25, tmp26);
	double tmp27= creal(bhat3);
	double tmp28= cimag(bhat3);
	printf("b: %.3f + %.3fi\n", tmp27, tmp28);
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
	
	Matrix * tmp29= meanM(a);
	double * tmp30 = d_to_d(tmp29);
	printf("\n%f\n", tmp30[0]);
	Matrix * tmp31= varM(a);
	double * tmp32 = d_to_d(tmp31);
	printf("\n%f\n", tmp32[0]);
	Matrix * tmp33= varM(a);
	double * tmp34 = d_to_d(tmp33);
	printf("\n%f\n", tmp34[0]);
	Matrix * tmp35= stdM(a);
	double * tmp36 = d_to_d(tmp35);
	printf("\n%f\n", tmp36[0]);
	Matrix * tmp37= stdM(a);
	double * tmp38 = d_to_d(tmp37);
	printf("\n%f\n", tmp38[0]);
	Matrix * tmp39= sortM(a, 0);
	printM(tmp39);
	Matrix * tmp40= sortM(a, 1);
	printM(tmp40);
	Matrix * tmp41= medianM(a);
	int * tmp42 = i_to_i(tmp41);
	printf("\n%d\n", tmp42[0]);
	Matrix * tmp43= minM(a);
	int * tmp44 = i_to_i(tmp43);
	printf("\n%d\n", tmp44[0]);
	Matrix * tmp45= maxM(a);
	int * tmp46 = i_to_i(tmp45);
	printf("\n%d\n", tmp46[0]);
	double vec1[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec1[i] = 0.2*i;
	}
	                
	Matrix * tmp47= quantileM_vec(a, 4, vec1);
	printM(tmp47);
	double * vec2= d_to_d(fun_qs);
	Matrix * tmp48= quantileM_vec(a, 10, vec2);
	printM(tmp48);
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
	
	Matrix * tmp49= meanM(a);
	double * tmp50 = d_to_d(tmp49);
	printf("\n%f\n", tmp50[0]);
	Matrix * tmp51= varM(a);
	double * tmp52 = d_to_d(tmp51);
	printf("\n%f\n", tmp52[0]);
	Matrix * tmp53= varM(a);
	double * tmp54 = d_to_d(tmp53);
	printf("\n%f\n", tmp54[0]);
	Matrix * tmp55= stdM(a);
	double * tmp56 = d_to_d(tmp55);
	printf("\n%f\n", tmp56[0]);
	Matrix * tmp57= stdM(a);
	double * tmp58 = d_to_d(tmp57);
	printf("\n%f\n", tmp58[0]);
	Matrix * tmp59= sortM(a, 0);
	printM(tmp59);
	Matrix * tmp60= sortM(a, 1);
	printM(tmp60);
	Matrix * tmp61= medianM(a);
	int * tmp62 = i_to_i(tmp61);
	printf("\n%d\n", tmp62[0]);
	Matrix * tmp63= minM(a);
	int * tmp64 = i_to_i(tmp63);
	printf("\n%d\n", tmp64[0]);
	Matrix * tmp65= maxM(a);
	int * tmp66 = i_to_i(tmp65);
	printf("\n%d\n", tmp66[0]);
	double vec3[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec3[i] = 0.2*i;
	}
	                
	Matrix * tmp67= quantileM_vec(a, 4, vec3);
	printM(tmp67);
	double * vec4= d_to_d(fun_qs);
	Matrix * tmp68= quantileM_vec(a, 10, vec4);
	printM(tmp68);
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
	
	Matrix * tmp69= meanM(a);
	complex * tmp70 = c_to_c(tmp69);
	printf("\n%f\n", tmp70[0]);
	Matrix * tmp71= varM(a);
	complex * tmp72 = c_to_c(tmp71);
	printf("\n%f\n", tmp72[0]);
	Matrix * tmp73= varM(a);
	complex * tmp74 = c_to_c(tmp73);
	printf("\n%f\n", tmp74[0]);
	Matrix * tmp75= stdM(a);
	complex * tmp76 = c_to_c(tmp75);
	printf("\n%f\n", tmp76[0]);
	Matrix * tmp77= stdM(a);
	complex * tmp78 = c_to_c(tmp77);
	printf("\n%f\n", tmp78[0]);
	Matrix * tmp79= sortM(a, 0);
	printM(tmp79);
	Matrix * tmp80= sortM(a, 1);
	printM(tmp80);
	Matrix * tmp81= medianM(a);
	complex * tmp82 = c_to_c(tmp81);
	printf("\n%f\n", tmp82[0]);
	Matrix * tmp83= minM(a);
	complex * tmp84 = c_to_c(tmp83);
	printf("\n%f\n", tmp84[0]);
	Matrix * tmp85= maxM(a);
	complex * tmp86 = c_to_c(tmp85);
	printf("\n%f\n", tmp86[0]);
	double vec5[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec5[i] = 0.2*i;
	}
	                
	Matrix * tmp87= quantileM_vec(a, 4, vec5);
	printM(tmp87);
	double * vec6= d_to_d(fun_qs);
	Matrix * tmp88= quantileM_vec(a, 10, vec6);
	printM(tmp88);
}