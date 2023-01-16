//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

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
	int ndim16= 2;
	int dim16[2]= {7, 9};
	a = zerosM(ndim16, dim16);
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 63; ++ iter1) {
		int tmp63= pow((-1), iter1);
		int tmp64= pow(iter1, 2);
		int d0_1 = iter1 % 7;
		if (d0_1 == 0) {
			d0_1 = 7;
		}
		int d1_1 = (iter1 - d0_1)/7 + 1;
		int tmp66= pow((-1), iter1);
		int tmp67= pow(iter1, 2);
		int tmp65= tmp66 * tmp67;
		lhs_data1[(d1_1-1) + (d0_1-1) * 9] = tmp65;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim16; iter2++)
	{
		size1 *= dim16[iter2];
	}
	Matrix *mat1 = createM(ndim16, dim16, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp68= transposeM(mat1);
	a = tmp68;
	printM(a);
	int_stats(a);
	//matrices_97_d
	int ndim17= 2;
	int dim17[2]= {7, 9};
	a = zerosM(ndim17, dim17);
	int* lhs_data2 = i_to_i(a);
	for (int iter3 = 1; iter3 <= 63; ++ iter3) {
		int tmp69= pow((-1), iter3);
		int tmp70= pow(iter3, 2);
		int d0_2 = iter3 % 7;
		if (d0_2 == 0) {
			d0_2 = 7;
		}
		int d1_2 = (iter3 - d0_2)/7 + 1;
		int tmp72= pow((-1), iter3);
		int tmp73= pow(iter3, 2);
		int tmp71= tmp72 * tmp73 / 17;
		lhs_data2[(d1_2-1) + (d0_2-1) * 9] = tmp71;
	
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
	Matrix * tmp74= transposeM(mat2);
	a = tmp74;
	printM(a);
	double_stats(a);
	//matrices_97_c
	int ndim18= 2;
	int dim18[2]= {7, 9};
	a = zerosM(ndim18, dim18);
	complex* lhs_data3 = i_to_c(a);
	for (int iter5 = 1; iter5 <= 63; ++ iter5) {
		int tmp75= pow((-1), iter5);
		int d0_3 = iter5 % 7;
		if (d0_3 == 0) {
			d0_3 = 7;
		}
		int d1_3 = (iter5 - d0_3)/7 + 1;
		int tmp77= pow((-1), iter5);
		complex tmp76= tmp77 * iter5 - iter5 / 17*I;
		lhs_data3[(d1_3-1) + (d0_3-1) * 9] = tmp76;
	
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
	Matrix * tmp78= transposeM(mat3);
	a = tmp78;
	printM(a);
	complex_stats(a);
	//basic_quantile_test
	a = 1;
	100;
	double vec7[101];
	
	for (int i = 0; 0 + 0.01*i < 1; i++) {
		vec7[i] = 0 + 0.01*i;
	}
	                
	Matrix * tmp79= transposeM(quantileM_vec(a, 101, vec7));
	printM(tmp79);
	int ndim19= 2;
	int dim19[2]= {1, 1004};
	Matrix * b= zerosM(ndim19, dim19);
	int* lhs_data4 = i_to_i(b);
	for (int iter7 = 1; iter7 <= 1004; ++ iter7) {
		int d0_4 = iter7 % 1;
		if (d0_4 == 0) {
			d0_4 = 1;
		}
		int d1_4 = (iter7 - d0_4)/1 + 1;
		int tmp80= iter7 * iter7 / 17;
		lhs_data4[(d1_4-1) + (d0_4-1)004] = tmp80;
	
	}
	// Write matrix mat4
	int size4 = 1;
	for (int iter8 = 0 ; iter8 < ndim19; iter8++)
	{
		size4 *= dim19[iter8];
	}
	Matrix *mat4 = createM(ndim19, dim19, 0);
	writeM(mat4, size4, lhs_data4);
	Matrix * tmp81= transposeM(mat4);
	b = tmp81;
	double vec8[101];
	
	for (int i = 0; 0 + 0.01*i < 1; i++) {
		vec8[i] = 0 + 0.01*i;
	}
	                
	Matrix * tmp82= transposeM(quantileM_vec(b, 101, vec8));
	printM(tmp82);
	int ndim20= 2;
	int dim20[2]= {1, 57};
	Matrix * c= zerosM(ndim20, dim20);
	complex* lhs_data5 = c_to_c(c);
	for (int iter9 = 1; iter9 <= 57; ++ iter9) {
		int d0_5 = iter9 % 1;
		if (d0_5 == 0) {
			d0_5 = 1;
		}
		int d1_5 = (iter9 - d0_5)/1 + 1;
		complex tmp83= iter9 - iter9 / 17*I;
		lhs_data5[(d1_5-1) + (d0_5-1) * 57] = tmp83;
	
	}
	// Write matrix mat5
	int size5 = 1;
	for (int iter10 = 0 ; iter10 < ndim20; iter10++)
	{
		size5 *= dim20[iter10];
	}
	Matrix *mat5 = createM(ndim20, dim20, 2);
	writeM(mat5, size5, lhs_data5);
	Matrix * tmp84= transposeM(mat5);
	c = tmp84;
	double vec9[101];
	
	for (int i = 0; 0 + 0.01*i < 1; i++) {
		vec9[i] = 0 + 0.01*i;
	}
	                
	Matrix * tmp85= transposeM(quantileM_vec(c, 101, vec9));
	printM(tmp85);
	return 0;
}


// Subprograms

void normfit(Matrix * a, Matrix ** p_mu, Matrix ** p_sd) {
	Matrix * mu= meanM(a);
	Matrix * sd= stdM(a);
	*p_mu = mu;
	*p_sd = sd;
}

void unifit(Matrix * a, Matrix ** p_ahat, Matrix ** p_bhat) {
	Matrix * ahat= minM(a);
	Matrix * bhat= maxM(a);
	*p_ahat = ahat;
	*p_bhat = bhat;
}

void int_vec_stats(Matrix * a) {
	int index1;
	Matrix * greatest= maxV(a, &index1);
	int * tmp1 = i_to_i(greatest);
	printf("\n%d\n", tmp1[0]);
	printf("max index: %d\n", index1);
	int index2;
	Matrix * least= minV(a, &index2);
	int * tmp2 = i_to_i(least);
	printf("\n%d\n", tmp2[0]);
	printf("min index: %d\n", index2);
	Matrix * mu1= NULL;
	Matrix * sd1= NULL;
	normfit(a, &mu1, &sd1);
	double * tmp3 = d_to_d(mu1);
	printf("mean: %.3f\n", tmp3[0]);
	double * tmp4 = d_to_d(sd1);
	printf("sd: %.3f\n", tmp4[0]);
	Matrix * ahat1= NULL;
	Matrix * bhat1= NULL;
	unifit(a, &ahat1, &bhat1);
	int * tmp5 = i_to_i(ahat1);
	printf("a: %d\n", tmp5[0]);
	int * tmp6 = i_to_i(bhat1);
	printf("b: %d\n", tmp6[0]);
}

void double_vec_stats(Matrix * a) {
	int index3;
	Matrix * greatest= maxV(a, &index3);
	double * tmp7 = d_to_d(greatest);
	printf("\n%d\n", tmp7[0]);
	printf("max index: %d\n", index3);
	int index4;
	Matrix * least= minV(a, &index4);
	double * tmp8 = d_to_d(least);
	printf("\n%d\n", tmp8[0]);
	printf("min index: %d\n", index4);
	Matrix * mu2= NULL;
	Matrix * sd2= NULL;
	normfit(a, &mu2, &sd2);
	double * tmp9 = d_to_d(mu2);
	printf("mean: %.3f\n", tmp9[0]);
	double * tmp10 = d_to_d(sd2);
	printf("sd: %.3f\n", tmp10[0]);
	Matrix * ahat2= NULL;
	Matrix * bhat2= NULL;
	unifit(a, &ahat2, &bhat2);
	int * tmp11 = i_to_i(ahat2);
	printf("a: %.3f\n", tmp11[0]);
	int * tmp12 = i_to_i(bhat2);
	printf("b: %.3f\n", tmp12[0]);
}

void complex_vec_stats(Matrix * a) {
	int index5;
	Matrix * greatest= maxV(a, &index5);
	complex * tmp13 = c_to_c(greatest);
	printf("\n%d\n", tmp13[0]);
	printf("max index: %d\n", index5);
	int index6;
	Matrix * least= minV(a, &index6);
	complex * tmp14 = c_to_c(least);
	printf("\n%d\n", tmp14[0]);
	printf("min index: %d\n", index6);
	Matrix * mu3= NULL;
	Matrix * sd3= NULL;
	normfit(a, &mu3, &sd3);
	double * tmp15 = d_to_d(mu3);
	double tmp16= creal(tmp15[0]);
	double tmp17= cimag(tmp15[0]);
	printf("mean: %.3f + %.3fi\n", tmp16);
	double * tmp18 = d_to_d(sd3);
	double tmp19= creal(tmp18[0]);
	double tmp20= cimag(tmp18[0]);
	printf("sd: %.3f + %.3fi\n", tmp19);
	Matrix * ahat3= NULL;
	Matrix * bhat3= NULL;
	unifit(a, &ahat3, &bhat3);
	int * tmp21 = i_to_i(ahat3);
	double tmp22= creal(tmp21[0]);
	double tmp23= cimag(tmp21[0]);
	printf("a: %.3f + %.3fi\n", tmp22);
	int * tmp24 = i_to_i(bhat3);
	double tmp25= creal(tmp24[0]);
	double tmp26= cimag(tmp24[0]);
	printf("b: %.3f + %.3fi\n", tmp25);
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
	
	Matrix * tmp27= meanM(a);
	printM(tmp27);
	Matrix * tmp28= varM(a);
	printM(tmp28);
	Matrix * tmp29= varM(a, 1);
	printM(tmp29);
	Matrix * tmp30= stdM(a);
	printM(tmp30);
	Matrix * tmp31= stdM(a, 1);
	printM(tmp31);
	Matrix * tmp32= sortM(a, 0);
	printM(tmp32);
	Matrix * tmp33= sortM(a, 1);
	printM(tmp33);
	Matrix * tmp34= medianM(a);
	printM(tmp34);
	Matrix * tmp35= minM(a);
	printM(tmp35);
	Matrix * tmp36= maxM(a);
	printM(tmp36);
	double vec1[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec1[i] = 0.2*i;
	}
	                
	Matrix * tmp37= quantileM_vec(a, 4, vec1);
	printM(tmp37);
	double * vec2= d_to_d(fun_qs);
	Matrix * tmp38= quantileM_vec(a, 10, vec2);
	printM(tmp38);
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
	
	Matrix * tmp39= meanM(a);
	printM(tmp39);
	Matrix * tmp40= varM(a);
	printM(tmp40);
	Matrix * tmp41= varM(a, 1);
	printM(tmp41);
	Matrix * tmp42= stdM(a);
	printM(tmp42);
	Matrix * tmp43= stdM(a, 1);
	printM(tmp43);
	Matrix * tmp44= sortM(a, 0);
	printM(tmp44);
	Matrix * tmp45= sortM(a, 1);
	printM(tmp45);
	Matrix * tmp46= medianM(a);
	printM(tmp46);
	Matrix * tmp47= minM(a);
	printM(tmp47);
	Matrix * tmp48= maxM(a);
	printM(tmp48);
	double vec3[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec3[i] = 0.2*i;
	}
	                
	Matrix * tmp49= quantileM_vec(a, 4, vec3);
	printM(tmp49);
	double * vec4= d_to_d(fun_qs);
	Matrix * tmp50= quantileM_vec(a, 10, vec4);
	printM(tmp50);
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
	
	Matrix * tmp51= meanM(a);
	printM(tmp51);
	Matrix * tmp52= varM(a);
	printM(tmp52);
	Matrix * tmp53= varM(a, 1);
	printM(tmp53);
	Matrix * tmp54= stdM(a);
	printM(tmp54);
	Matrix * tmp55= stdM(a, 1);
	printM(tmp55);
	Matrix * tmp56= sortM(a, 0);
	printM(tmp56);
	Matrix * tmp57= sortM(a, 1);
	printM(tmp57);
	Matrix * tmp58= medianM(a);
	printM(tmp58);
	Matrix * tmp59= minM(a);
	printM(tmp59);
	Matrix * tmp60= maxM(a);
	printM(tmp60);
	double vec5[4]= {};
	
	for (int i = 0; 0.2*i < 1; i ++) {
	    vec5[i] = 0.2*i;
	}
	                
	Matrix * tmp61= quantileM_vec(a, 4, vec5);
	printM(tmp61);
	double * vec6= d_to_d(fun_qs);
	Matrix * tmp62= quantileM_vec(a, 10, vec6);
	printM(tmp62);
}