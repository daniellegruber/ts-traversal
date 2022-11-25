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
int ndim1 = 2;
int dim1[2] = {3,3};
Matrix * a = zerosM(ndim1, dim1);
void *data1 = getdataM(a);
int* lhs_data1 = (int *)data1;

for (int i =  1; i <= 9; ++ i) {
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
int tmp2 = i;
lhs_data1[(d1_1-1) + (d0_1-1) * 3 + (d2_1-1) * 3 * 3 + (d3_1-1) * 3 * 3 * 1] = tmp2;

}
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim1; iter1++)
{
	size1 *= dim1[iter1];
}
Matrix *mat1 = createM(ndim1, dim1, 0);
writeM(mat1, size1, lhs_data1);
Matrix * mat2 = transposeM(mat1);
a = mat2;
printM(mat2);
Matrix * b = mat2;
printM(mat2);
Matrix * mat3 = powerM(mat2, mat2);
Matrix * c = mat3;
printM(mat3);
//id_test
int ndim2 = 2;
int dim2[2] = {3,3};
a = zerosM(ndim2, dim2);
void *data2 = getdataM(mat2);
int* lhs_data2 = (int *)data2;

for (int i =  1; i <= 9; ++ i) {
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
int tmp7 = i;
lhs_data2[(d1_2-1) + (d0_2-1) * 3 + (d2_2-1) * 3 * 3 + (d3_2-1) * 3 * 3 * 1] = tmp7;

}
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim2; iter2++)
{
	size2 *= dim2[iter2];
}
Matrix *mat4 = createM(ndim2, dim2, 0);
writeM(mat4, size2, lhs_data2);
Matrix * mat5 = transposeM(mat4);
a = mat5;
printM(mat5);
int ndim3 = 2;
int dim3[2] = {3,3};
b = zerosM(ndim3, dim3);
void *data3 = getdataM(mat2);
double* lhs_data3 = (double *)data3;

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
double tmp10 = i + 0.4;
lhs_data3[(d1_3-1) + (d0_3-1) * 3 + (d2_3-1) * 3 * 3 + (d3_3-1) * 3 * 3 * 1] = tmp10;

}
int size3 = 1;
for (int iter3 = 0 ; iter3 < ndim3; iter3++)
{
	size3 *= dim3[iter3];
}
Matrix *mat6 = createM(ndim3, dim3, 1);
writeM(mat6, size3, lhs_data3);
Matrix * mat7 = transposeM(mat6);
b = mat7;
printM(mat7);
Matrix * mat8 = powerM(mat5, mat7);
c = mat8;
printM(mat8);
//neg_id_test
int ndim4 = 2;
int dim4[2] = {3,3};
a = zerosM(ndim4, dim4);
void *data4 = getdataM(mat5);
int* lhs_data4 = (int *)data4;

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
int tmp14 = -i;
lhs_data4[(d1_4-1) + (d0_4-1) * 3 + (d2_4-1) * 3 * 3 + (d3_4-1) * 3 * 3 * 1] = tmp14;

}
int size4 = 1;
for (int iter4 = 0 ; iter4 < ndim4; iter4++)
{
	size4 *= dim4[iter4];
}
Matrix *mat9 = createM(ndim4, dim4, 0);
writeM(mat9, size4, lhs_data4);
Matrix * mat10 = transposeM(mat9);
a = mat10;
printM(mat10);
int ndim5 = 2;
int dim5[2] = {3,3};
b = zerosM(ndim5, dim5);
void *data5 = getdataM(mat7);
double* lhs_data5 = (double *)data5;

for (int i =  1; i <= 9; ++ i) {
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
double tmp17 = i + 0.4;
lhs_data5[(d1_5-1) + (d0_5-1) * 3 + (d2_5-1) * 3 * 3 + (d3_5-1) * 3 * 3 * 1] = tmp17;

}
int size5 = 1;
for (int iter5 = 0 ; iter5 < ndim5; iter5++)
{
	size5 *= dim5[iter5];
}
Matrix *mat11 = createM(ndim5, dim5, 1);
writeM(mat11, size5, lhs_data5);
Matrix * mat12 = transposeM(mat11);
b = mat12;
printM(mat12);
Matrix * mat13 = powerM(mat10, mat12);
c = mat13;
printM(mat13);
//ic_test
int ndim6 = 2;
int dim6[2] = {3,3};
a = zerosM(ndim6, dim6);
void *data6 = getdataM(mat10);
int* lhs_data6 = (int *)data6;

for (int i =  1; i <= 9; ++ i) {
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
int tmp21 = i;
lhs_data6[(d1_6-1) + (d0_6-1) * 3 + (d2_6-1) * 3 * 3 + (d3_6-1) * 3 * 3 * 1] = tmp21;

}
int size6 = 1;
for (int iter6 = 0 ; iter6 < ndim6; iter6++)
{
	size6 *= dim6[iter6];
}
Matrix *mat14 = createM(ndim6, dim6, 0);
writeM(mat14, size6, lhs_data6);
Matrix * mat15 = transposeM(mat14);
a = mat15;
printM(mat15);
int ndim7 = 2;
int dim7[2] = {3,3};
b = zerosM(ndim7, dim7);
void *data7 = getdataM(mat12);
complex* lhs_data7 = (complex *)data7;

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
complex tmp24 = i + 0.4*I;
lhs_data7[(d1_7-1) + (d0_7-1) * 3 + (d2_7-1) * 3 * 3 + (d3_7-1) * 3 * 3 * 1] = tmp24;

}
int size7 = 1;
for (int iter7 = 0 ; iter7 < ndim7; iter7++)
{
	size7 *= dim7[iter7];
}
Matrix *mat16 = createM(ndim7, dim7, 2);
writeM(mat16, size7, lhs_data7);
Matrix * mat17 = transposeM(mat16);
b = mat17;
printM(mat17);
Matrix * mat18 = powerM(mat15, mat17);
c = mat18;
printM(mat18);
//di_test
int ndim8 = 2;
int dim8[2] = {3,3};
a = zerosM(ndim8, dim8);
void *data8 = getdataM(mat15);
double* lhs_data8 = (double *)data8;

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
double tmp28 = i + 0.4;
lhs_data8[(d1_8-1) + (d0_8-1) * 3 + (d2_8-1) * 3 * 3 + (d3_8-1) * 3 * 3 * 1] = tmp28;

}
int size8 = 1;
for (int iter8 = 0 ; iter8 < ndim8; iter8++)
{
	size8 *= dim8[iter8];
}
Matrix *mat19 = createM(ndim8, dim8, 1);
writeM(mat19, size8, lhs_data8);
Matrix * mat20 = transposeM(mat19);
a = mat20;
printM(mat20);
int ndim9 = 2;
int dim9[2] = {3,3};
b = zerosM(ndim9, dim9);
void *data9 = getdataM(mat17);
int* lhs_data9 = (int *)data9;

for (int i =  1; i <= 9; ++ i) {
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
int tmp31 = i;
lhs_data9[(d1_9-1) + (d0_9-1) * 3 + (d2_9-1) * 3 * 3 + (d3_9-1) * 3 * 3 * 1] = tmp31;

}
int size9 = 1;
for (int iter9 = 0 ; iter9 < ndim9; iter9++)
{
	size9 *= dim9[iter9];
}
Matrix *mat21 = createM(ndim9, dim9, 0);
writeM(mat21, size9, lhs_data9);
Matrix * mat22 = transposeM(mat21);
b = mat22;
printM(mat22);
Matrix * mat23 = powerM(mat20, mat22);
c = mat23;
printM(mat23);
//dd_test
int ndim10 = 2;
int dim10[2] = {3,3};
a = zerosM(ndim10, dim10);
void *data10 = getdataM(mat20);
double* lhs_data10 = (double *)data10;

for (int i =  1; i <= 9; ++ i) {
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
double tmp35 = i + 0.4;
lhs_data10[(d1_10-1) + (d0_10-1) * 3 + (d2_10-1) * 3 * 3 + (d3_10-1) * 3 * 3 * 1] = tmp35;

}
int size10 = 1;
for (int iter10 = 0 ; iter10 < ndim10; iter10++)
{
	size10 *= dim10[iter10];
}
Matrix *mat24 = createM(ndim10, dim10, 1);
writeM(mat24, size10, lhs_data10);
Matrix * mat25 = transposeM(mat24);
a = mat25;
printM(mat25);
int ndim11 = 2;
int dim11[2] = {3,3};
b = zerosM(ndim11, dim11);
void *data11 = getdataM(mat22);
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
double tmp38 = (i + 0.4);
lhs_data11[(d1_11-1) + (d0_11-1) * 3 + (d2_11-1) * 3 * 3 + (d3_11-1) * 3 * 3 * 1] = tmp38;

}
int size11 = 1;
for (int iter11 = 0 ; iter11 < ndim11; iter11++)
{
	size11 *= dim11[iter11];
}
Matrix *mat26 = createM(ndim11, dim11, 1);
writeM(mat26, size11, lhs_data11);
Matrix * mat27 = transposeM(mat26);
b = mat27;
printM(mat27);
Matrix * mat28 = powerM(mat25, mat27);
c = mat28;
printM(mat28);
//neg_dd_test
int ndim12 = 2;
int dim12[2] = {3,3};
a = zerosM(ndim12, dim12);
void *data12 = getdataM(mat25);
double* lhs_data12 = (double *)data12;

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
double tmp42 = -(i + 0.4);
lhs_data12[(d1_12-1) + (d0_12-1) * 3 + (d2_12-1) * 3 * 3 + (d3_12-1) * 3 * 3 * 1] = tmp42;

}
int size12 = 1;
for (int iter12 = 0 ; iter12 < ndim12; iter12++)
{
	size12 *= dim12[iter12];
}
Matrix *mat29 = createM(ndim12, dim12, 1);
writeM(mat29, size12, lhs_data12);
Matrix * mat30 = transposeM(mat29);
a = mat30;
printM(mat30);
int ndim13 = 2;
int dim13[2] = {3,3};
b = zerosM(ndim13, dim13);
void *data13 = getdataM(mat27);
double* lhs_data13 = (double *)data13;

for (int i =  1; i <= 9; ++ i) {
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
double tmp45 = -(i + 0.4);
lhs_data13[(d1_13-1) + (d0_13-1) * 3 + (d2_13-1) * 3 * 3 + (d3_13-1) * 3 * 3 * 1] = tmp45;

}
int size13 = 1;
for (int iter13 = 0 ; iter13 < ndim13; iter13++)
{
	size13 *= dim13[iter13];
}
Matrix *mat31 = createM(ndim13, dim13, 1);
writeM(mat31, size13, lhs_data13);
Matrix * mat32 = transposeM(mat31);
b = mat32;
printM(mat32);
Matrix * mat33 = powerM(mat30, mat32);
c = mat33;
printM(mat33);
//dc_test
int ndim14 = 2;
int dim14[2] = {3,3};
a = zerosM(ndim14, dim14);
void *data14 = getdataM(mat30);
double* lhs_data14 = (double *)data14;

for (int i =  1; i <= 9; ++ i) {
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
double tmp49 = i + 0.4;
lhs_data14[(d1_14-1) + (d0_14-1) * 3 + (d2_14-1) * 3 * 3 + (d3_14-1) * 3 * 3 * 1] = tmp49;

}
int size14 = 1;
for (int iter14 = 0 ; iter14 < ndim14; iter14++)
{
	size14 *= dim14[iter14];
}
Matrix *mat34 = createM(ndim14, dim14, 1);
writeM(mat34, size14, lhs_data14);
Matrix * mat35 = transposeM(mat34);
a = mat35;
printM(mat35);
int ndim15 = 2;
int dim15[2] = {3,3};
b = zerosM(ndim15, dim15);
void *data15 = getdataM(mat32);
complex* lhs_data15 = (complex *)data15;

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
complex tmp52 = i + 0.4*I;
lhs_data15[(d1_15-1) + (d0_15-1) * 3 + (d2_15-1) * 3 * 3 + (d3_15-1) * 3 * 3 * 1] = tmp52;

}
int size15 = 1;
for (int iter15 = 0 ; iter15 < ndim15; iter15++)
{
	size15 *= dim15[iter15];
}
Matrix *mat36 = createM(ndim15, dim15, 2);
writeM(mat36, size15, lhs_data15);
Matrix * mat37 = transposeM(mat36);
b = mat37;
printM(mat37);
Matrix * mat38 = powerM(mat35, mat37);
c = mat38;
printM(mat38);
//ci_test
int ndim16 = 2;
int dim16[2] = {3,3};
a = zerosM(ndim16, dim16);
void *data16 = getdataM(mat35);
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
complex tmp56 = i + 1*I;
lhs_data16[(d1_16-1) + (d0_16-1) * 3 + (d2_16-1) * 3 * 3 + (d3_16-1) * 3 * 3 * 1] = tmp56;

}
int size16 = 1;
for (int iter16 = 0 ; iter16 < ndim16; iter16++)
{
	size16 *= dim16[iter16];
}
Matrix *mat39 = createM(ndim16, dim16, 2);
writeM(mat39, size16, lhs_data16);
Matrix * mat40 = transposeM(mat39);
a = mat40;
printM(mat40);
int ndim17 = 2;
int dim17[2] = {3,3};
b = zerosM(ndim17, dim17);
void *data17 = getdataM(mat37);
int* lhs_data17 = (int *)data17;

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
int tmp59 = i;
lhs_data17[(d1_17-1) + (d0_17-1) * 3 + (d2_17-1) * 3 * 3 + (d3_17-1) * 3 * 3 * 1] = tmp59;

}
int size17 = 1;
for (int iter17 = 0 ; iter17 < ndim17; iter17++)
{
	size17 *= dim17[iter17];
}
Matrix *mat41 = createM(ndim17, dim17, 0);
writeM(mat41, size17, lhs_data17);
Matrix * mat42 = transposeM(mat41);
b = mat42;
printM(mat42);
Matrix * mat43 = powerM(mat40, mat42);
c = mat43;
printM(mat43);
//cd_test
int ndim18 = 2;
int dim18[2] = {3,3};
a = zerosM(ndim18, dim18);
void *data18 = getdataM(mat40);
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
complex tmp63 = i + 0.5*I;
lhs_data18[(d1_18-1) + (d0_18-1) * 3 + (d2_18-1) * 3 * 3 + (d3_18-1) * 3 * 3 * 1] = tmp63;

}
int size18 = 1;
for (int iter18 = 0 ; iter18 < ndim18; iter18++)
{
	size18 *= dim18[iter18];
}
Matrix *mat44 = createM(ndim18, dim18, 2);
writeM(mat44, size18, lhs_data18);
Matrix * mat45 = transposeM(mat44);
a = mat45;
printM(mat45);
int ndim19 = 2;
int dim19[2] = {3,3};
b = zerosM(ndim19, dim19);
void *data19 = getdataM(mat42);
double* lhs_data19 = (double *)data19;

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
double tmp66 = (i + 0.4);
lhs_data19[(d1_19-1) + (d0_19-1) * 3 + (d2_19-1) * 3 * 3 + (d3_19-1) * 3 * 3 * 1] = tmp66;

}
int size19 = 1;
for (int iter19 = 0 ; iter19 < ndim19; iter19++)
{
	size19 *= dim19[iter19];
}
Matrix *mat46 = createM(ndim19, dim19, 1);
writeM(mat46, size19, lhs_data19);
Matrix * mat47 = transposeM(mat46);
b = mat47;
printM(mat47);
Matrix * mat48 = powerM(mat45, mat47);
c = mat48;
printM(mat48);
//cc_test
int ndim20 = 2;
int dim20[2] = {3,3};
a = zerosM(ndim20, dim20);
void *data20 = getdataM(mat45);
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
complex tmp70 = i + 0.4*I;
lhs_data20[(d1_20-1) + (d0_20-1) * 3 + (d2_20-1) * 3 * 3 + (d3_20-1) * 3 * 3 * 1] = tmp70;

}
int size20 = 1;
for (int iter20 = 0 ; iter20 < ndim20; iter20++)
{
	size20 *= dim20[iter20];
}
Matrix *mat49 = createM(ndim20, dim20, 2);
writeM(mat49, size20, lhs_data20);
Matrix * mat50 = transposeM(mat49);
a = mat50;
printM(mat50);
int ndim21 = 2;
int dim21[2] = {3,3};
b = zerosM(ndim21, dim21);
void *data21 = getdataM(mat47);
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
complex tmp73 = i + 0.4*I;
lhs_data21[(d1_21-1) + (d0_21-1) * 3 + (d2_21-1) * 3 * 3 + (d3_21-1) * 3 * 3 * 1] = tmp73;

}
int size21 = 1;
for (int iter21 = 0 ; iter21 < ndim21; iter21++)
{
	size21 *= dim21[iter21];
}
Matrix *mat51 = createM(ndim21, dim21, 2);
writeM(mat51, size21, lhs_data21);
Matrix * mat52 = transposeM(mat51);
b = mat52;
printM(mat52);
Matrix * mat53 = powerM(mat50, mat52);
c = mat53;
printM(mat53);
//overflow_test
int ndim22 = 2;
int dim22[2] = {3,3};
a = zerosM(ndim22, dim22);
void *data22 = getdataM(mat50);
int* lhs_data22 = (int *)data22;

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
int tmp77 = INT_MAX;
lhs_data22[(d1_22-1) + (d0_22-1) * 3 + (d2_22-1) * 3 * 3 + (d3_22-1) * 3 * 3 * 1] = tmp77;

}
int size22 = 1;
for (int iter22 = 0 ; iter22 < ndim22; iter22++)
{
	size22 *= dim22[iter22];
}
Matrix *mat54 = createM(ndim22, dim22, 0);
writeM(mat54, size22, lhs_data22);
Matrix * mat55 = transposeM(mat54);
a = mat55;
printM(mat55);
int ndim23 = 2;
int dim23[2] = {3,3};
int scalar1 = 2;
Matrix * mat56 = scaleM(onesM(ndim23, dim23), &scalar1, 0);
b = mat56;
printM(mat55);
Matrix * mat57 = powerM(mat55, mat56);
c = mat57;
printM(mat57);
return 0;
}
