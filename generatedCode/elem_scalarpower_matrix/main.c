//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Entry-point function
int main(void)
{

//more off
//format short
//source octaveIncludes.m;
//ii_test
int exponent = 3;
int ndim1 = 2;
int dim1[2] = {3,3};
Matrix * a = zerosM(ndim1, dim1);
void *data1 = getdataM(a);
int* lhs_data1 = (int *)data1;

for (int i =  1; i <= 9; ++ i) {
int mat1 = pow((-1), (i + 1));
int d3_1 = 1;
int d2_1 = ceil((double) i / (3 * 3));
int tmp_1 = i % (3 * 3);
if (tmp_1 == 0) {
tmp_1 = 3 * 3;
}
int d0_1 = tmp_1 % 3;
if (d0_1 == 0) {
d0_1 = 3;
}
int d1_1 = (tmp_1 - d0_1)/3 + 1;
int mat2 = pow((-1), (i + 1));
int tmp2 = (mat2) * i;
lhs_data1[(d1_1-1) + (d0_1-1) * 3 + (d2_1-1) * 3 * 3 + (d3_1-1) * 3 * 3 * 1] = tmp2;

}
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim1; iter1++)
{
	size1 *= dim1[iter1];
}
Matrix *mat3 = createM(ndim1, dim1, 0);
writeM(mat3, size1, lhs_data1);
Matrix * mat4 = transposeM(mat3);
a = mat4;
//printM(mat4);
int ndim2 = 2;
int dim2[2] = {3,3};
Matrix * b = zerosM(ndim2, dim2);
void *data2 = getdataM(b);
int* lhs_data2 = (int *)data2;

for (int i =  1; i <= 9; ++ i) {
int mat5 = pow((-1), (i + 1));
int d3_2 = 1;
int d2_2 = ceil((double) i / (3 * 3));
int tmp_2 = i % (3 * 3);
if (tmp_2 == 0) {
tmp_2 = 3 * 3;
}
int d0_2 = tmp_2 % 3;
if (d0_2 == 0) {
d0_2 = 3;
}
int d1_2 = (tmp_2 - d0_2)/3 + 1;
int mat6 = pow((-1), (i + 1));
int mat7 = pow(((mat6) * i), exponent);
int tmp5 = mat7;
lhs_data2[(d1_2-1) + (d0_2-1) * 3 + (d2_2-1) * 3 * 3 + (d3_2-1) * 3 * 3 * 1] = tmp5;

}
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim2; iter2++)
{
	size2 *= dim2[iter2];
}
Matrix *mat8 = createM(ndim2, dim2, 0);
writeM(mat8, size2, lhs_data2);
Matrix * mat9 = transposeM(mat8);
b = mat9;
//printM(mat9);
Matrix * mat10 = scalarpowerM(mat4, &exponent, 0);
Matrix * c = mat10;
//printM(mat10);
//id_test
double exponent1 = 1.2;
int ndim3 = 2;
int dim3[2] = {3,3};
a = zerosM(ndim3, dim3);
void *data3 = getdataM(mat4);
int* lhs_data3 = (int *)data3;

for (int i =  1; i <= 9; ++ i) {
int d3_3 = 1;
int d2_3 = ceil((double) i / (3 * 3));
int tmp_3 = i % (3 * 3);
if (tmp_3 == 0) {
tmp_3 = 3 * 3;
}
int d0_3 = tmp_3 % 3;
if (d0_3 == 0) {
d0_3 = 3;
}
int d1_3 = (tmp_3 - d0_3)/3 + 1;
int tmp9 = i;
lhs_data3[(d1_3-1) + (d0_3-1) * 3 + (d2_3-1) * 3 * 3 + (d3_3-1) * 3 * 3 * 1] = tmp9;

}
int size3 = 1;
for (int iter3 = 0 ; iter3 < ndim3; iter3++)
{
	size3 *= dim3[iter3];
}
Matrix *mat11 = createM(ndim3, dim3, 0);
writeM(mat11, size3, lhs_data3);
Matrix * mat12 = transposeM(mat11);
a = mat12;
//printM(mat12);
int ndim4 = 2;
int dim4[2] = {3,3};
b = zerosM(ndim4, dim4);
void *data4 = getdataM(mat9);
complex* lhs_data4 = (complex *)data4;

for (int i =  1; i <= 9; ++ i) {
int d3_4 = 1;
int d2_4 = ceil((double) i / (3 * 3));
int tmp_4 = i % (3 * 3);
if (tmp_4 == 0) {
tmp_4 = 3 * 3;
}
int d0_4 = tmp_4 % 3;
if (d0_4 == 0) {
d0_4 = 3;
}
int d1_4 = (tmp_4 - d0_4)/3 + 1;
complex mat13 = cpow(i, exponent1);
complex tmp12 = mat13;
lhs_data4[(d1_4-1) + (d0_4-1) * 3 + (d2_4-1) * 3 * 3 + (d3_4-1) * 3 * 3 * 1] = tmp12;

}
int size4 = 1;
for (int iter4 = 0 ; iter4 < ndim4; iter4++)
{
	size4 *= dim4[iter4];
}
Matrix *mat14 = createM(ndim4, dim4, 2);
writeM(mat14, size4, lhs_data4);
Matrix * mat15 = transposeM(mat14);
Matrix * b1 = mat15;
//printM(mat15);
Matrix * mat16 = scalarpowerM(mat12, &exponent1, 1);
Matrix * c1 = mat16;
//printM(mat16);
//neg_id_test
double exponent2 = 1.2;
int ndim5 = 2;
int dim5[2] = {3,3};
a = zerosM(ndim5, dim5);
void *data5 = getdataM(mat12);
int* lhs_data5 = (int *)data5;

for (int i =  1; i <= 9; ++ i) {
int mat17 = pow((-1), (i + 1));
int d3_5 = 1;
int d2_5 = ceil((double) i / (3 * 3));
int tmp_5 = i % (3 * 3);
if (tmp_5 == 0) {
tmp_5 = 3 * 3;
}
int d0_5 = tmp_5 % 3;
if (d0_5 == 0) {
d0_5 = 3;
}
int d1_5 = (tmp_5 - d0_5)/3 + 1;
int mat18 = pow((-1), (i + 1));
int tmp16 = (mat18) * i;
lhs_data5[(d1_5-1) + (d0_5-1) * 3 + (d2_5-1) * 3 * 3 + (d3_5-1) * 3 * 3 * 1] = tmp16;

}
int size5 = 1;
for (int iter5 = 0 ; iter5 < ndim5; iter5++)
{
	size5 *= dim5[iter5];
}
Matrix *mat19 = createM(ndim5, dim5, 0);
writeM(mat19, size5, lhs_data5);
Matrix * mat20 = transposeM(mat19);
a = mat20;
//printM(mat20);
int ndim6 = 2;
int dim6[2] = {3,3};
b = zerosM(ndim6, dim6);
void *data6 = getdataM(mat15);
complex* lhs_data6 = (complex *)data6;

for (int i =  1; i <= 9; ++ i) {
int mat21 = pow((-1), (i + 1));
int d3_6 = 1;
int d2_6 = ceil((double) i / (3 * 3));
int tmp_6 = i % (3 * 3);
if (tmp_6 == 0) {
tmp_6 = 3 * 3;
}
int d0_6 = tmp_6 % 3;
if (d0_6 == 0) {
d0_6 = 3;
}
int d1_6 = (tmp_6 - d0_6)/3 + 1;
int mat22 = pow((-1), (i + 1));
complex mat23 = cpow(((mat22) * i), exponent2);
complex tmp19 = mat23;
lhs_data6[(d1_6-1) + (d0_6-1) * 3 + (d2_6-1) * 3 * 3 + (d3_6-1) * 3 * 3 * 1] = tmp19;

}
int size6 = 1;
for (int iter6 = 0 ; iter6 < ndim6; iter6++)
{
	size6 *= dim6[iter6];
}
Matrix *mat24 = createM(ndim6, dim6, 2);
writeM(mat24, size6, lhs_data6);
Matrix * mat25 = transposeM(mat24);
Matrix * b2 = mat25;
//printM(mat25);
Matrix * mat26 = scalarpowerM(mat20, &exponent2, 1);
Matrix * c2 = mat26;
//printM(mat26);
//ic_test
complex exponent3 = 4 + 0.3*I;
int ndim7 = 2;
int dim7[2] = {3,3};
a = zerosM(ndim7, dim7);
void *data7 = getdataM(mat20);
int* lhs_data7 = (int *)data7;

for (int i =  1; i <= 9; ++ i) {
int d3_7 = 1;
int d2_7 = ceil((double) i / (3 * 3));
int tmp_7 = i % (3 * 3);
if (tmp_7 == 0) {
tmp_7 = 3 * 3;
}
int d0_7 = tmp_7 % 3;
if (d0_7 == 0) {
d0_7 = 3;
}
int d1_7 = (tmp_7 - d0_7)/3 + 1;
int tmp23 = i;
lhs_data7[(d1_7-1) + (d0_7-1) * 3 + (d2_7-1) * 3 * 3 + (d3_7-1) * 3 * 3 * 1] = tmp23;

}
int size7 = 1;
for (int iter7 = 0 ; iter7 < ndim7; iter7++)
{
	size7 *= dim7[iter7];
}
Matrix *mat27 = createM(ndim7, dim7, 0);
writeM(mat27, size7, lhs_data7);
Matrix * mat28 = transposeM(mat27);
a = mat28;
//printM(mat28);
int ndim8 = 2;
int dim8[2] = {3,3};
b = zerosM(ndim8, dim8);
void *data8 = getdataM(mat25);
complex* lhs_data8 = (complex *)data8;

for (int i =  1; i <= 9; ++ i) {
int d3_8 = 1;
int d2_8 = ceil((double) i / (3 * 3));
int tmp_8 = i % (3 * 3);
if (tmp_8 == 0) {
tmp_8 = 3 * 3;
}
int d0_8 = tmp_8 % 3;
if (d0_8 == 0) {
d0_8 = 3;
}
int d1_8 = (tmp_8 - d0_8)/3 + 1;
complex mat29 = cpow(i, exponent3);
complex tmp26 = mat29;
lhs_data8[(d1_8-1) + (d0_8-1) * 3 + (d2_8-1) * 3 * 3 + (d3_8-1) * 3 * 3 * 1] = tmp26;

}
int size8 = 1;
for (int iter8 = 0 ; iter8 < ndim8; iter8++)
{
	size8 *= dim8[iter8];
}
Matrix *mat30 = createM(ndim8, dim8, 2);
writeM(mat30, size8, lhs_data8);
Matrix * mat31 = transposeM(mat30);
Matrix * b3 = mat31;
//printM(mat31);
Matrix * mat32 = scalarpowerM(mat28, &exponent3, 2);
Matrix * c3 = mat32;
//printM(mat32);
//di_test
exponent = 5;
int ndim9 = 2;
int dim9[2] = {3,3};
a = zerosM(ndim9, dim9);
void *data9 = getdataM(mat28);
double* lhs_data9 = (double *)data9;

for (int i =  1; i <= 9; ++ i) {
int mat33 = pow((-1), (i + 1));
int d3_9 = 1;
int d2_9 = ceil((double) i / (3 * 3));
int tmp_9 = i % (3 * 3);
if (tmp_9 == 0) {
tmp_9 = 3 * 3;
}
int d0_9 = tmp_9 % 3;
if (d0_9 == 0) {
d0_9 = 3;
}
int d1_9 = (tmp_9 - d0_9)/3 + 1;
int mat34 = pow((-1), (i + 1));
double tmp30 = (mat34) * (i + 0.4);
lhs_data9[(d1_9-1) + (d0_9-1) * 3 + (d2_9-1) * 3 * 3 + (d3_9-1) * 3 * 3 * 1] = tmp30;

}
int size9 = 1;
for (int iter9 = 0 ; iter9 < ndim9; iter9++)
{
	size9 *= dim9[iter9];
}
Matrix *mat35 = createM(ndim9, dim9, 1);
writeM(mat35, size9, lhs_data9);
Matrix * mat36 = transposeM(mat35);
Matrix * a1 = mat36;
//printM(mat36);
int ndim10 = 2;
int dim10[2] = {3,3};
b = zerosM(ndim10, dim10);
void *data10 = getdataM(mat31);
complex* lhs_data10 = (complex *)data10;

for (int i =  1; i <= 9; ++ i) {
int mat37 = pow((-1), (i + 1));
int d3_10 = 1;
int d2_10 = ceil((double) i / (3 * 3));
int tmp_10 = i % (3 * 3);
if (tmp_10 == 0) {
tmp_10 = 3 * 3;
}
int d0_10 = tmp_10 % 3;
if (d0_10 == 0) {
d0_10 = 3;
}
int d1_10 = (tmp_10 - d0_10)/3 + 1;
int mat38 = pow((-1), (i + 1));
complex mat39 = cpow(((mat38) * (i + 0.4)), exponent3);
complex tmp33 = mat39;
lhs_data10[(d1_10-1) + (d0_10-1) * 3 + (d2_10-1) * 3 * 3 + (d3_10-1) * 3 * 3 * 1] = tmp33;

}
int size10 = 1;
for (int iter10 = 0 ; iter10 < ndim10; iter10++)
{
	size10 *= dim10[iter10];
}
Matrix *mat40 = createM(ndim10, dim10, 2);
writeM(mat40, size10, lhs_data10);
Matrix * mat41 = transposeM(mat40);
Matrix * b4 = mat41;
printM(mat41);
Matrix * mat42 = scalarpowerM(mat36, &exponent3, 2);
Matrix * c4 = mat42;
printM(mat42);
//dd_test
double exponent4 = 1.4;
int ndim11 = 2;
int dim11[2] = {3,3};
a = zerosM(ndim11, dim11);
void *data11 = getdataM(mat36);
double* lhs_data11 = (double *)data11;

for (int i =  1; i <= 9; ++ i) {
int d3_11 = 1;
int d2_11 = ceil((double) i / (3 * 3));
int tmp_11 = i % (3 * 3);
if (tmp_11 == 0) {
tmp_11 = 3 * 3;
}
int d0_11 = tmp_11 % 3;
if (d0_11 == 0) {
d0_11 = 3;
}
int d1_11 = (tmp_11 - d0_11)/3 + 1;
double tmp37 = (i + 0.4);
lhs_data11[(d1_11-1) + (d0_11-1) * 3 + (d2_11-1) * 3 * 3 + (d3_11-1) * 3 * 3 * 1] = tmp37;

}
int size11 = 1;
for (int iter11 = 0 ; iter11 < ndim11; iter11++)
{
	size11 *= dim11[iter11];
}
Matrix *mat43 = createM(ndim11, dim11, 1);
writeM(mat43, size11, lhs_data11);
Matrix * mat44 = transposeM(mat43);
Matrix * a2 = mat44;
//printM(mat44);
int ndim12 = 2;
int dim12[2] = {3,3};
b = zerosM(ndim12, dim12);
void *data12 = getdataM(mat41);
complex* lhs_data12 = (complex *)data12;

for (int i =  1; i <= 9; ++ i) {
int d3_12 = 1;
int d2_12 = ceil((double) i / (3 * 3));
int tmp_12 = i % (3 * 3);
if (tmp_12 == 0) {
tmp_12 = 3 * 3;
}
int d0_12 = tmp_12 % 3;
if (d0_12 == 0) {
d0_12 = 3;
}
int d1_12 = (tmp_12 - d0_12)/3 + 1;
complex mat45 = cpow((i + 0.4), exponent4);
complex tmp40 = mat45;
lhs_data12[(d1_12-1) + (d0_12-1) * 3 + (d2_12-1) * 3 * 3 + (d3_12-1) * 3 * 3 * 1] = tmp40;

}
int size12 = 1;
for (int iter12 = 0 ; iter12 < ndim12; iter12++)
{
	size12 *= dim12[iter12];
}
Matrix *mat46 = createM(ndim12, dim12, 2);
writeM(mat46, size12, lhs_data12);
Matrix * mat47 = transposeM(mat46);
Matrix * b5 = mat47;
//printM(mat47);
Matrix * mat48 = scalarpowerM(mat44, &exponent4, 1);
Matrix * c5 = mat48;
//printM(mat48);
//neg_dd_test
double exponent5 = 1.4;
int ndim13 = 2;
int dim13[2] = {3,3};
a = zerosM(ndim13, dim13);
void *data13 = getdataM(mat44);
double* lhs_data13 = (double *)data13;

for (int i =  1; i <= 9; ++ i) {
int mat49 = pow((-1), (i + 1));
int d3_13 = 1;
int d2_13 = ceil((double) i / (3 * 3));
int tmp_13 = i % (3 * 3);
if (tmp_13 == 0) {
tmp_13 = 3 * 3;
}
int d0_13 = tmp_13 % 3;
if (d0_13 == 0) {
d0_13 = 3;
}
int d1_13 = (tmp_13 - d0_13)/3 + 1;
int mat50 = pow((-1), (i + 1));
double tmp44 = (mat50) * (i + 0.4);
lhs_data13[(d1_13-1) + (d0_13-1) * 3 + (d2_13-1) * 3 * 3 + (d3_13-1) * 3 * 3 * 1] = tmp44;

}
int size13 = 1;
for (int iter13 = 0 ; iter13 < ndim13; iter13++)
{
	size13 *= dim13[iter13];
}
Matrix *mat51 = createM(ndim13, dim13, 1);
writeM(mat51, size13, lhs_data13);
Matrix * mat52 = transposeM(mat51);
Matrix * a3 = mat52;
//printM(mat52);
int ndim14 = 2;
int dim14[2] = {3,3};
b = zerosM(ndim14, dim14);
void *data14 = getdataM(mat47);
complex* lhs_data14 = (complex *)data14;

for (int i =  1; i <= 9; ++ i) {
int mat53 = pow((-1), (i + 1));
int d3_14 = 1;
int d2_14 = ceil((double) i / (3 * 3));
int tmp_14 = i % (3 * 3);
if (tmp_14 == 0) {
tmp_14 = 3 * 3;
}
int d0_14 = tmp_14 % 3;
if (d0_14 == 0) {
d0_14 = 3;
}
int d1_14 = (tmp_14 - d0_14)/3 + 1;
int mat54 = pow((-1), (i + 1));
complex mat55 = cpow(((mat54) * (i + 0.4)), exponent5);
complex tmp47 = mat55;
lhs_data14[(d1_14-1) + (d0_14-1) * 3 + (d2_14-1) * 3 * 3 + (d3_14-1) * 3 * 3 * 1] = tmp47;

}
int size14 = 1;
for (int iter14 = 0 ; iter14 < ndim14; iter14++)
{
	size14 *= dim14[iter14];
}
Matrix *mat56 = createM(ndim14, dim14, 2);
writeM(mat56, size14, lhs_data14);
Matrix * mat57 = transposeM(mat56);
Matrix * b6 = mat57;
//printM(mat57);
Matrix * mat58 = scalarpowerM(mat52, &exponent5, 1);
Matrix * c6 = mat58;
//printM(mat58);
//dc_test
complex exponent6 = -0.5*I;
int ndim15 = 2;
int dim15[2] = {3,3};
a = zerosM(ndim15, dim15);
void *data15 = getdataM(mat52);
double* lhs_data15 = (double *)data15;

for (int i =  1; i <= 9; ++ i) {
int d3_15 = 1;
int d2_15 = ceil((double) i / (3 * 3));
int tmp_15 = i % (3 * 3);
if (tmp_15 == 0) {
tmp_15 = 3 * 3;
}
int d0_15 = tmp_15 % 3;
if (d0_15 == 0) {
d0_15 = 3;
}
int d1_15 = (tmp_15 - d0_15)/3 + 1;
double tmp51 = i + 0.4;
lhs_data15[(d1_15-1) + (d0_15-1) * 3 + (d2_15-1) * 3 * 3 + (d3_15-1) * 3 * 3 * 1] = tmp51;

}
int size15 = 1;
for (int iter15 = 0 ; iter15 < ndim15; iter15++)
{
	size15 *= dim15[iter15];
}
Matrix *mat59 = createM(ndim15, dim15, 1);
writeM(mat59, size15, lhs_data15);
Matrix * mat60 = transposeM(mat59);
Matrix * a4 = mat60;
//printM(mat60);
int ndim16 = 2;
int dim16[2] = {3,3};
b = zerosM(ndim16, dim16);
void *data16 = getdataM(mat57);
complex* lhs_data16 = (complex *)data16;

for (int i =  1; i <= 9; ++ i) {
int d3_16 = 1;
int d2_16 = ceil((double) i / (3 * 3));
int tmp_16 = i % (3 * 3);
if (tmp_16 == 0) {
tmp_16 = 3 * 3;
}
int d0_16 = tmp_16 % 3;
if (d0_16 == 0) {
d0_16 = 3;
}
int d1_16 = (tmp_16 - d0_16)/3 + 1;
complex mat61 = cpow((i + 0.4), exponent6);
complex tmp54 = mat61;
lhs_data16[(d1_16-1) + (d0_16-1) * 3 + (d2_16-1) * 3 * 3 + (d3_16-1) * 3 * 3 * 1] = tmp54;

}
int size16 = 1;
for (int iter16 = 0 ; iter16 < ndim16; iter16++)
{
	size16 *= dim16[iter16];
}
Matrix *mat62 = createM(ndim16, dim16, 2);
writeM(mat62, size16, lhs_data16);
Matrix * mat63 = transposeM(mat62);
Matrix * b7 = mat63;
//printM(mat63);
Matrix * mat64 = scalarpowerM(mat60, &exponent6, 2);
Matrix * c7 = mat64;
//printM(mat64);
//ci_test
exponent = 3;
int ndim17 = 2;
int dim17[2] = {3,3};
a = zerosM(ndim17, dim17);
void *data17 = getdataM(mat60);
complex* lhs_data17 = (complex *)data17;

for (int i =  1; i <= 9; ++ i) {
int d3_17 = 1;
int d2_17 = ceil((double) i / (3 * 3));
int tmp_17 = i % (3 * 3);
if (tmp_17 == 0) {
tmp_17 = 3 * 3;
}
int d0_17 = tmp_17 % 3;
if (d0_17 == 0) {
d0_17 = 3;
}
int d1_17 = (tmp_17 - d0_17)/3 + 1;
complex tmp58 = i + 0.5*I;
lhs_data17[(d1_17-1) + (d0_17-1) * 3 + (d2_17-1) * 3 * 3 + (d3_17-1) * 3 * 3 * 1] = tmp58;

}
int size17 = 1;
for (int iter17 = 0 ; iter17 < ndim17; iter17++)
{
	size17 *= dim17[iter17];
}
Matrix *mat65 = createM(ndim17, dim17, 2);
writeM(mat65, size17, lhs_data17);
Matrix * mat66 = transposeM(mat65);
Matrix * a5 = mat66;
//printM(mat66);
int ndim18 = 2;
int dim18[2] = {3,3};
b = zerosM(ndim18, dim18);
void *data18 = getdataM(mat63);
complex* lhs_data18 = (complex *)data18;

for (int i =  1; i <= 9; ++ i) {
int d3_18 = 1;
int d2_18 = ceil((double) i / (3 * 3));
int tmp_18 = i % (3 * 3);
if (tmp_18 == 0) {
tmp_18 = 3 * 3;
}
int d0_18 = tmp_18 % 3;
if (d0_18 == 0) {
d0_18 = 3;
}
int d1_18 = (tmp_18 - d0_18)/3 + 1;
complex mat67 = cpow((i + 0.5*I), exponent6);
complex tmp61 = mat67;
lhs_data18[(d1_18-1) + (d0_18-1) * 3 + (d2_18-1) * 3 * 3 + (d3_18-1) * 3 * 3 * 1] = tmp61;

}
int size18 = 1;
for (int iter18 = 0 ; iter18 < ndim18; iter18++)
{
	size18 *= dim18[iter18];
}
Matrix *mat68 = createM(ndim18, dim18, 2);
writeM(mat68, size18, lhs_data18);
Matrix * mat69 = transposeM(mat68);
Matrix * b8 = mat69;
//printM(mat69);
Matrix * mat70 = scalarpowerM(mat66, &exponent6, 2);
Matrix * c8 = mat70;
//printM(mat70);
//cd_test
double exponent7 = -0.9;
int ndim19 = 2;
int dim19[2] = {3,3};
a = zerosM(ndim19, dim19);
void *data19 = getdataM(mat66);
complex* lhs_data19 = (complex *)data19;

for (int i =  1; i <= 9; ++ i) {
int d3_19 = 1;
int d2_19 = ceil((double) i / (3 * 3));
int tmp_19 = i % (3 * 3);
if (tmp_19 == 0) {
tmp_19 = 3 * 3;
}
int d0_19 = tmp_19 % 3;
if (d0_19 == 0) {
d0_19 = 3;
}
int d1_19 = (tmp_19 - d0_19)/3 + 1;
complex tmp65 = i + 0.5*I;
lhs_data19[(d1_19-1) + (d0_19-1) * 3 + (d2_19-1) * 3 * 3 + (d3_19-1) * 3 * 3 * 1] = tmp65;

}
int size19 = 1;
for (int iter19 = 0 ; iter19 < ndim19; iter19++)
{
	size19 *= dim19[iter19];
}
Matrix *mat71 = createM(ndim19, dim19, 2);
writeM(mat71, size19, lhs_data19);
Matrix * mat72 = transposeM(mat71);
Matrix * a6 = mat72;
//printM(mat72);
int ndim20 = 2;
int dim20[2] = {3,3};
b = zerosM(ndim20, dim20);
void *data20 = getdataM(mat69);
complex* lhs_data20 = (complex *)data20;

for (int i =  1; i <= 9; ++ i) {
int d3_20 = 1;
int d2_20 = ceil((double) i / (3 * 3));
int tmp_20 = i % (3 * 3);
if (tmp_20 == 0) {
tmp_20 = 3 * 3;
}
int d0_20 = tmp_20 % 3;
if (d0_20 == 0) {
d0_20 = 3;
}
int d1_20 = (tmp_20 - d0_20)/3 + 1;
complex mat73 = cpow((i + 0.5*I), exponent7);
complex tmp68 = mat73;
lhs_data20[(d1_20-1) + (d0_20-1) * 3 + (d2_20-1) * 3 * 3 + (d3_20-1) * 3 * 3 * 1] = tmp68;

}
int size20 = 1;
for (int iter20 = 0 ; iter20 < ndim20; iter20++)
{
	size20 *= dim20[iter20];
}
Matrix *mat74 = createM(ndim20, dim20, 2);
writeM(mat74, size20, lhs_data20);
Matrix * mat75 = transposeM(mat74);
Matrix * b9 = mat75;
//printM(mat75);
Matrix * mat76 = scalarpowerM(mat72, &exponent7, 2);
Matrix * c9 = mat76;
//printM(mat76);
//cc_test
complex exponent8 = 2 - 2*I;
int ndim21 = 2;
int dim21[2] = {3,3};
a = zerosM(ndim21, dim21);
void *data21 = getdataM(mat72);
complex* lhs_data21 = (complex *)data21;

for (int i =  1; i <= 9; ++ i) {
int d3_21 = 1;
int d2_21 = ceil((double) i / (3 * 3));
int tmp_21 = i % (3 * 3);
if (tmp_21 == 0) {
tmp_21 = 3 * 3;
}
int d0_21 = tmp_21 % 3;
if (d0_21 == 0) {
d0_21 = 3;
}
int d1_21 = (tmp_21 - d0_21)/3 + 1;
complex tmp72 = i + 0.5*I;
lhs_data21[(d1_21-1) + (d0_21-1) * 3 + (d2_21-1) * 3 * 3 + (d3_21-1) * 3 * 3 * 1] = tmp72;

}
int size21 = 1;
for (int iter21 = 0 ; iter21 < ndim21; iter21++)
{
	size21 *= dim21[iter21];
}
Matrix *mat77 = createM(ndim21, dim21, 2);
writeM(mat77, size21, lhs_data21);
Matrix * mat78 = transposeM(mat77);
Matrix * a7 = mat78;
//printM(mat78);
int ndim22 = 2;
int dim22[2] = {3,3};
b = zerosM(ndim22, dim22);
void *data22 = getdataM(mat75);
complex* lhs_data22 = (complex *)data22;

for (int i =  1; i <= 9; ++ i) {
int d3_22 = 1;
int d2_22 = ceil((double) i / (3 * 3));
int tmp_22 = i % (3 * 3);
if (tmp_22 == 0) {
tmp_22 = 3 * 3;
}
int d0_22 = tmp_22 % 3;
if (d0_22 == 0) {
d0_22 = 3;
}
int d1_22 = (tmp_22 - d0_22)/3 + 1;
complex mat79 = cpow((i + 0.5*I), exponent8);
complex tmp75 = mat79;
lhs_data22[(d1_22-1) + (d0_22-1) * 3 + (d2_22-1) * 3 * 3 + (d3_22-1) * 3 * 3 * 1] = tmp75;

}
int size22 = 1;
for (int iter22 = 0 ; iter22 < ndim22; iter22++)
{
	size22 *= dim22[iter22];
}
Matrix *mat80 = createM(ndim22, dim22, 2);
writeM(mat80, size22, lhs_data22);
Matrix * mat81 = transposeM(mat80);
Matrix * b10 = mat81;
//printM(mat81);
Matrix * mat82 = scalarpowerM(mat78, &exponent8, 2);
Matrix * c10 = mat82;
//printM(mat82);
//overflow_test
exponent = 2;
int ndim23 = 2;
int dim23[2] = {3,3};
a = zerosM(ndim23, dim23);
void *data23 = getdataM(mat78);
int* lhs_data23 = (int *)data23;

for (int i =  1; i <= 9; ++ i) {
int d3_23 = 1;
int d2_23 = ceil((double) i / (3 * 3));
int tmp_23 = i % (3 * 3);
if (tmp_23 == 0) {
tmp_23 = 3 * 3;
}
int d0_23 = tmp_23 % 3;
if (d0_23 == 0) {
d0_23 = 3;
}
int d1_23 = (tmp_23 - d0_23)/3 + 1;
int tmp79 = INT_MAX;
lhs_data23[(d1_23-1) + (d0_23-1) * 3 + (d2_23-1) * 3 * 3 + (d3_23-1) * 3 * 3 * 1] = tmp79;

}
int size23 = 1;
for (int iter23 = 0 ; iter23 < ndim23; iter23++)
{
	size23 *= dim23[iter23];
}
Matrix *mat83 = createM(ndim23, dim23, 0);
writeM(mat83, size23, lhs_data23);
Matrix * mat84 = transposeM(mat83);
a = mat84;
//printM(mat84);
int ndim24 = 2;
int dim24[2] = {3,3};
b = zerosM(ndim24, dim24);
void *data24 = getdataM(mat81);
complex* lhs_data24 = (complex *)data24;

for (int i =  1; i <= 9; ++ i) {
int d3_24 = 1;
int d2_24 = ceil((double) i / (3 * 3));
int tmp_24 = i % (3 * 3);
if (tmp_24 == 0) {
tmp_24 = 3 * 3;
}
int d0_24 = tmp_24 % 3;
if (d0_24 == 0) {
d0_24 = 3;
}
int d1_24 = (tmp_24 - d0_24)/3 + 1;
complex mat85 = cpow(INT_MAX, exponent8);
complex tmp82 = mat85;
lhs_data24[(d1_24-1) + (d0_24-1) * 3 + (d2_24-1) * 3 * 3 + (d3_24-1) * 3 * 3 * 1] = tmp82;

}
int size24 = 1;
for (int iter24 = 0 ; iter24 < ndim24; iter24++)
{
	size24 *= dim24[iter24];
}
Matrix *mat86 = createM(ndim24, dim24, 2);
writeM(mat86, size24, lhs_data24);
Matrix * mat87 = transposeM(mat86);
Matrix * b11 = mat87;
//printM(mat87);
Matrix * mat88 = scalarpowerM(mat84, &exponent8, 2);
Matrix * c11 = mat88;
//printM(mat88);
//underflow_test
exponent = 2;
int ndim25 = 2;
int dim25[2] = {3,3};
a = zerosM(ndim25, dim25);
void *data25 = getdataM(mat84);
int* lhs_data25 = (int *)data25;

for (int i =  1; i <= 9; ++ i) {
int d3_25 = 1;
int d2_25 = ceil((double) i / (3 * 3));
int tmp_25 = i % (3 * 3);
if (tmp_25 == 0) {
tmp_25 = 3 * 3;
}
int d0_25 = tmp_25 % 3;
if (d0_25 == 0) {
d0_25 = 3;
}
int d1_25 = (tmp_25 - d0_25)/3 + 1;
int tmp86 = INT_MIN;
lhs_data25[(d1_25-1) + (d0_25-1) * 3 + (d2_25-1) * 3 * 3 + (d3_25-1) * 3 * 3 * 1] = tmp86;

}
int size25 = 1;
for (int iter25 = 0 ; iter25 < ndim25; iter25++)
{
	size25 *= dim25[iter25];
}
Matrix *mat89 = createM(ndim25, dim25, 0);
writeM(mat89, size25, lhs_data25);
Matrix * mat90 = transposeM(mat89);
a = mat90;
//printM(mat90);
int ndim26 = 2;
int dim26[2] = {3,3};
b = zerosM(ndim26, dim26);
void *data26 = getdataM(mat87);
complex* lhs_data26 = (complex *)data26;

for (int i =  1; i <= 9; ++ i) {
int d3_26 = 1;
int d2_26 = ceil((double) i / (3 * 3));
int tmp_26 = i % (3 * 3);
if (tmp_26 == 0) {
tmp_26 = 3 * 3;
}
int d0_26 = tmp_26 % 3;
if (d0_26 == 0) {
d0_26 = 3;
}
int d1_26 = (tmp_26 - d0_26)/3 + 1;
complex mat91 = cpow(INT_MIN, exponent8);
complex tmp89 = mat91;
lhs_data26[(d1_26-1) + (d0_26-1) * 3 + (d2_26-1) * 3 * 3 + (d3_26-1) * 3 * 3 * 1] = tmp89;

}
int size26 = 1;
for (int iter26 = 0 ; iter26 < ndim26; iter26++)
{
	size26 *= dim26[iter26];
}
Matrix *mat92 = createM(ndim26, dim26, 2);
writeM(mat92, size26, lhs_data26);
Matrix * mat93 = transposeM(mat92);
Matrix * b12 = mat93;
//printM(mat93);
Matrix * mat94 = scalarpowerM(mat90, &exponent8, 2);
Matrix * c12 = mat94;
//printM(mat94);
return 0;
}
