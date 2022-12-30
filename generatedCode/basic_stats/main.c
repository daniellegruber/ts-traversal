//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Function declarations
void normfit2(Matrix * a, Matrix ** p_mu, Matrix ** p_sd);
void unifit2(Matrix * a, Matrix ** p_ahat, Matrix ** p_bhat);
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
int ndim13= 2;
int dim13[2]= {7, 9};
a = zerosM(ndim13, dim13);
int* lhs_data1 = i_to_i(a);

for (int iter1 =  1; iter1 <= 63; ++ iter1) {
int tmp1= pow((-1), iter1);
int tmp2= pow(iter1, 2);
int d3_1 = 1;
int d2_1 = 1;
int d0_1 = iter1 % 7;
if (d0_1 == 0) {
d0_1 = 7;
}
int d1_1 = (iter1 - d0_1)/7 + 1;
int tmp4= pow((-1), iter1);
int tmp5= pow(iter1, 2);
int tmp3= tmp4 * tmp5;
lhs_data1[(d1_1-1) + (d0_1-1) * 9 + (d2_1-1) * 7 * 9 + (d3_1-1) * 7 * 9 * 1] = tmp3;

}
// Write matrix mat1
int size1 = 1;
for (int iter2 = 0 ; iter2 < ndim13; iter2++)
{
	size1 *= dim13[iter2];
}
Matrix *mat1 = createM(ndim13, dim13, 0);
writeM(mat1, size1, lhs_data1);
Matrix * tmp6= transposeM(mat1);
a = tmp6;
printM(a);
int_stats(a);
//matrices_97_d
int ndim14= 2;
int dim14[2]= {7, 9};
a = zerosM(ndim14, dim14);
int* lhs_data2 = i_to_i(a);

for (int iter3 =  1; iter3 <= 63; ++ iter3) {
int tmp7= pow((-1), iter3);
int tmp8= pow(iter3, 2);
int d3_2 = 1;
int d2_2 = 1;
int d0_2 = iter3 % 7;
if (d0_2 == 0) {
d0_2 = 7;
}
int d1_2 = (iter3 - d0_2)/7 + 1;
int tmp10= pow((-1), iter3);
int tmp11= pow(iter3, 2);
int tmp9= tmp10 * tmp11 / 17;
lhs_data2[(d1_2-1) + (d0_2-1) * 9 + (d2_2-1) * 7 * 9 + (d3_2-1) * 7 * 9 * 1] = tmp9;

}
// Write matrix mat2
int size2 = 1;
for (int iter4 = 0 ; iter4 < ndim14; iter4++)
{
	size2 *= dim14[iter4];
}
Matrix *mat2 = createM(ndim14, dim14, 0);
writeM(mat2, size2, lhs_data2);
Matrix * tmp12= transposeM(mat2);
a = tmp12;
printM(a);
double_stats(a);
//matrices_97_c
int ndim15= 2;
int dim15[2]= {7, 9};
a = zerosM(ndim15, dim15);
complex* lhs_data3 = i_to_c(a);

for (int iter5 =  1; iter5 <= 63; ++ iter5) {
int tmp13= pow((-1), iter5);
int d3_3 = 1;
int d2_3 = 1;
int d0_3 = iter5 % 7;
if (d0_3 == 0) {
d0_3 = 7;
}
int d1_3 = (iter5 - d0_3)/7 + 1;
int tmp15= pow((-1), iter5);
complex tmp14= tmp15 * iter5 - iter5 / 17 * 1*I;
lhs_data3[(d1_3-1) + (d0_3-1) * 9 + (d2_3-1) * 7 * 9 + (d3_3-1) * 7 * 9 * 1] = tmp14;

}
// Write matrix mat3
int size3 = 1;
for (int iter6 = 0 ; iter6 < ndim15; iter6++)
{
	size3 *= dim15[iter6];
}
Matrix *mat3 = createM(ndim15, dim15, 2);
writeM(mat3, size3, lhs_data3);
Matrix * tmp16= transposeM(mat3);
a = tmp16;
printM(a);
complex_stats(a);
//basic_quantile_test
a = 1;
100;
double vec1[101];

for (int i = 0; 0 + 0.01*i < 1; i++) {
    vec1[i] = 0 + 0.01*i;
}
                
Matrix * tmp17= transposeM(quantileM_vec(a, 101, vec1));
printM(tmp17);
int ndim16= 2;
int dim16[2]= {1, 1004};
Matrix * b= zerosM(ndim16, dim16);
int* lhs_data4 = i_to_i(b);

for (int iter7 =  1; iter7 <= 1004; ++ iter7) {
int d3_4 = 1;
int d2_4 = 1;
int d0_4 = iter7 % 1;
if (d0_4 == 0) {
d0_4 = 1;
}
int d1_4 = (iter7 - d0_4)/1 + 1;
int tmp18= iter7 * iter7 / 17;
lhs_data4[(d1_4-1) + (d0_4-1) * 1004 + (d2_4-1) * 1 * 1004 + (d3_4-1) * 1 * 1004 * 1] = tmp18;

}
// Write matrix mat4
int size4 = 1;
for (int iter8 = 0 ; iter8 < ndim16; iter8++)
{
	size4 *= dim16[iter8];
}
Matrix *mat4 = createM(ndim16, dim16, 0);
writeM(mat4, size4, lhs_data4);
Matrix * tmp19= transposeM(mat4);
b = tmp19;
double vec2[101];

for (int i = 0; 0 + 0.01*i < 1; i++) {
    vec2[i] = 0 + 0.01*i;
}
                
Matrix * tmp20= transposeM(quantileM_vec(b, 101, vec2));
printM(tmp20);
int ndim17= 2;
int dim17[2]= {1, 57};
Matrix * c= zerosM(ndim17, dim17);
complex* lhs_data5 = c_to_c(c);

for (int iter9 =  1; iter9 <= 57; ++ iter9) {
int d3_5 = 1;
int d2_5 = 1;
int d0_5 = iter9 % 1;
if (d0_5 == 0) {
d0_5 = 1;
}
int d1_5 = (iter9 - d0_5)/1 + 1;
complex tmp21= iter9 - iter9 / 17 * 1*I;
lhs_data5[(d1_5-1) + (d0_5-1) * 57 + (d2_5-1) * 1 * 57 + (d3_5-1) * 1 * 57 * 1] = tmp21;

}
// Write matrix mat5
int size5 = 1;
for (int iter10 = 0 ; iter10 < ndim17; iter10++)
{
	size5 *= dim17[iter10];
}
Matrix *mat5 = createM(ndim17, dim17, 2);
writeM(mat5, size5, lhs_data5);
Matrix * tmp22= transposeM(mat5);
c = tmp22;
double vec3[101];

for (int i = 0; 0 + 0.01*i < 1; i++) {
    vec3[i] = 0 + 0.01*i;
}
                
Matrix * tmp23= transposeM(quantileM_vec(c, 101, vec3));
printM(tmp23);
return 0;
}


// Subprograms

void normfit2(Matrix * a, Matrix ** p_mu, Matrix ** p_sd) {
Matrix * mu= meanM(a);
Matrix * sd= stdM(a);
*p_mu = mu;
*p_sd = sd;
}

void unifit2(Matrix * a, Matrix ** p_ahat, Matrix ** p_bhat) {
Matrix * ahat= minM(a);
Matrix * bhat= maxM(a);
*p_ahat = ahat;
*p_bhat = bhat;
}

void int_vec_stats(Matrix * a) {
int index1;
Matrix * greatest= maxV(a, &index1);
int * tmp24 = i_to_i(greatest);
printf("\n%d\n", tmp24[0]);
printf("max index: %d\n", index1);
int index2;
Matrix * least= minV(a, &index2);
int * tmp25 = i_to_i(least);
printf("\n%d\n", tmp25[0]);
printf("min index: %d\n", index2);
Matrix * mu1= NULL;
Matrix * sd1= NULL;
normfit2(a, &mu1, &sd1);
double * tmp26 = d_to_d(mu1);
printf("mean: %.3f\n", tmp26[0]);
double * tmp27 = d_to_d(sd1);
printf("sd: %.3f\n", tmp27[0]);
Matrix * ahat1= NULL;
Matrix * bhat1= NULL;
unifit2(a, &ahat1, &bhat1);
int * tmp28 = i_to_i(ahat1);
printf("a: %d\n", tmp28[0]);
int * tmp29 = i_to_i(bhat1);
printf("b: %d\n", tmp29[0]);
}

void double_vec_stats(Matrix * a) {
int index3;
Matrix * greatest= maxV(a, &index3);
double * tmp30 = d_to_d(greatest);
printf("\n%d\n", tmp30[0]);
printf("max index: %d\n", index3);
int index4;
Matrix * least= minV(a, &index4);
double * tmp31 = d_to_d(least);
printf("\n%d\n", tmp31[0]);
printf("min index: %d\n", index4);
Matrix * mu2= NULL;
Matrix * sd2= NULL;
normfit2(a, &mu2, &sd2);
double * tmp32 = d_to_d(mu2);
printf("mean: %.3f\n", tmp32[0]);
double * tmp33 = d_to_d(sd2);
printf("sd: %.3f\n", tmp33[0]);
Matrix * ahat2= NULL;
Matrix * bhat2= NULL;
unifit2(a, &ahat2, &bhat2);
int * tmp34 = i_to_i(ahat2);
printf("a: %.3f\n", tmp34[0]);
int * tmp35 = i_to_i(bhat2);
printf("b: %.3f\n", tmp35[0]);
}

void complex_vec_stats(Matrix * a) {
int index5;
Matrix * greatest= maxV(a, &index5);
complex * tmp36 = c_to_c(greatest);
printf("\n%d\n", tmp36[0]);
printf("max index: %d\n", index5);
int index6;
Matrix * least= minV(a, &index6);
complex * tmp37 = c_to_c(least);
printf("\n%d\n", tmp37[0]);
printf("min index: %d\n", index6);
Matrix * mu3= NULL;
Matrix * sd3= NULL;
normfit2(a, &mu3, &sd3);
double * tmp38 = d_to_d(mu3);
double tmp39= creal(tmp38[0]);
double tmp40= cimag(tmp38[0]);
printf("mean: %.3f + %.3fi\n", tmp39);
double * tmp41 = d_to_d(sd3);
double tmp42= creal(tmp41[0]);
double tmp43= cimag(tmp41[0]);
printf("sd: %.3f + %.3fi\n", tmp42);
Matrix * ahat3= NULL;
Matrix * bhat3= NULL;
unifit2(a, &ahat3, &bhat3);
int * tmp44 = i_to_i(ahat3);
double tmp45= creal(tmp44[0]);
double tmp46= cimag(tmp44[0]);
printf("a: %.3f + %.3fi\n", tmp45);
int * tmp47 = i_to_i(bhat3);
double tmp48= creal(tmp47[0]);
double tmp49= cimag(tmp47[0]);
printf("b: %.3f + %.3fi\n", tmp48);
}

void int_stats(Matrix * a) {

int ndim18 = 2;
int dim18[2] = {1,10};
Matrix * fun_qs = createM(ndim18, dim18, 1);
double *input13 = NULL;
input13 = malloc( 10*sizeof(*input13));
input13[0] = 0;
input13[1] = -1;
input13[2] = 3;
input13[3] = 0.2;
input13[4] = 0.9;
input13[5] = 0.53;
input13[6] = 0.75;
input13[7] = 1;
input13[8] = 0.34;
input13[9] = 0.17;
writeM( fun_qs, 10, input13);
free(input13);

Matrix * tmp50= meanM(a);
printM(tmp50);
Matrix * tmp51= varM(a);
printM(tmp51);
//disp(var(a,1));
Matrix * tmp52= stdM(a);
printM(tmp52);
//disp(std(a,1));
Matrix * tmp53= sortM(a, 0);
printM(tmp53);
Matrix * tmp54= sortM(a, 1);
printM(tmp54);
Matrix * tmp55= medianM(a);
printM(tmp55);
Matrix * tmp56= minM(a);
printM(tmp56);
Matrix * tmp57= maxM(a);
printM(tmp57);
double vec4[3] = {0.25, 0.5, 0.75};
Matrix * tmp58= quantileM_vec(a, 3, vec4);
printM(tmp58);
double * vec5= d_to_d(fun_qs);
Matrix * tmp59= quantileM_vec(a, 10, vec5);
printM(tmp59);
}

void double_stats(Matrix * a) {

int ndim19 = 2;
int dim19[2] = {1,10};
Matrix * fun_qs = createM(ndim19, dim19, 1);
double *input14 = NULL;
input14 = malloc( 10*sizeof(*input14));
input14[0] = 0;
input14[1] = -1;
input14[2] = 3;
input14[3] = 0.2;
input14[4] = 0.9;
input14[5] = 0.53;
input14[6] = 0.75;
input14[7] = 1;
input14[8] = 0.34;
input14[9] = 0.17;
writeM( fun_qs, 10, input14);
free(input14);

Matrix * tmp60= meanM(a);
printM(tmp60);
Matrix * tmp61= varM(a);
printM(tmp61);
//disp(var(a,1));
Matrix * tmp62= stdM(a);
printM(tmp62);
//disp(std(a,1));
Matrix * tmp63= sortM(a, 0);
printM(tmp63);
Matrix * tmp64= sortM(a, 1);
printM(tmp64);
Matrix * tmp65= medianM(a);
printM(tmp65);
Matrix * tmp66= minM(a);
printM(tmp66);
Matrix * tmp67= maxM(a);
printM(tmp67);
double vec6[3] = {0.25, 0.5, 0.75};
Matrix * tmp68= quantileM_vec(a, 3, vec6);
printM(tmp68);
double * vec7= d_to_d(fun_qs);
Matrix * tmp69= quantileM_vec(a, 10, vec7);
printM(tmp69);
}

void complex_stats(Matrix * a) {

int ndim20 = 2;
int dim20[2] = {1,10};
Matrix * fun_qs = createM(ndim20, dim20, 1);
double *input15 = NULL;
input15 = malloc( 10*sizeof(*input15));
input15[0] = 0;
input15[1] = -1;
input15[2] = 3;
input15[3] = 0.2;
input15[4] = 0.9;
input15[5] = 0.53;
input15[6] = 0.75;
input15[7] = 1;
input15[8] = 0.34;
input15[9] = 0.17;
writeM( fun_qs, 10, input15);
free(input15);

Matrix * tmp70= meanM(a);
printM(tmp70);
Matrix * tmp71= varM(a);
printM(tmp71);
//disp(var(a,1));
Matrix * tmp72= stdM(a);
printM(tmp72);
//disp(std(a,1));
Matrix * tmp73= sortM(a, 0);
printM(tmp73);
Matrix * tmp74= sortM(a, 1);
printM(tmp74);
Matrix * tmp75= medianM(a);
printM(tmp75);
Matrix * tmp76= minM(a);
printM(tmp76);
Matrix * tmp77= maxM(a);
printM(tmp77);
double vec8[3]= {};

for (int i = 0; 0.25*i < 1; i ++) {
    vec8[i] = 0.25*i;
}
                
Matrix * tmp78= quantileM_vec(a, 3, vec8);
printM(tmp78);
double * vec9= d_to_d(fun_qs);
Matrix * tmp79= quantileM_vec(a, 10, vec9);
printM(tmp79);
}