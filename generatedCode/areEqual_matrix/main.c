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
// trueTest
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
int tmp2 = i * i;
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
Matrix * c = mat2;
printM(mat2);
Matrix * d = mat2;
printM(mat2);
Matrix * mat3 = equalM(mat2, mat2);
Matrix * mat4 = equalM(mat2, mat2);
Matrix * mat5 = andM((mat3), (mat4));
Matrix * mat6 = equalM(mat2, mat2);
Matrix * mat7 = andM(mat5, (mat6));
printM(mat7);
// falseTest
printM(mat2);
printM(mat2);
int ndim2 = 2;
int dim2[2] = {3,3};
c = zerosM(ndim2, dim2);
void *data2 = getdataM(c);
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
int tmp11 = i * i;
lhs_data2[(d1_2-1) + (d0_2-1) * 3 + (d2_2-1) * 3 * 3 + (d3_2-1) * 3 * 3 * 1] = tmp11;

}
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim2; iter2++)
{
	size2 *= dim2[iter2];
}
Matrix *mat8 = createM(ndim2, dim2, 0);
writeM(mat8, size2, lhs_data2);
int d3_3 = 1;
int d2_3 = ceil((double) 2 / (3 * 3));
int tmp_3 = 2 % (3 * 3);
if (tmp_3 == 0) {
    tmp_3 = 3 * 3;
}
int d0_3 = tmp_3 % 3;
if (d0_3 == 0) {
    d0_3 = 3;
}
int d1_3 = (tmp_3 - d0_3)/3 + 1;
int tmp12 = 10;
void *data3 = getdataM(c);
int* lhs_data3 = (int *)data3;
lhs_data3[(d1_3-1) + (d0_3-1) * 3 + (d2_3-1) * 3 * 3 + (d3_3-1) * 3 * 3 * 1] = tmp12;
int size3 = 1;
for (int iter3 = 0 ; iter3 < ndim2; iter3++)
{
	size3 *= dim2[iter3];
}
Matrix *mat9 = createM(ndim2, dim2, 0);
writeM(mat9, size3, lhs_data3);
int d3_4 = 1;
int d2_4 = ceil((double) 3 / (3 * 3));
int tmp_4 = 3 % (3 * 3);
if (tmp_4 == 0) {
    tmp_4 = 3 * 3;
}
int d0_4 = tmp_4 % 3;
if (d0_4 == 0) {
    d0_4 = 3;
}
int d1_4 = (tmp_4 - d0_4)/3 + 1;
int tmp13 = 11;
void *data4 = getdataM(c);
int* lhs_data4 = (int *)data4;
lhs_data4[(d1_4-1) + (d0_4-1) * 3 + (d2_4-1) * 3 * 3 + (d3_4-1) * 3 * 3 * 1] = tmp13;
int size4 = 1;
for (int iter4 = 0 ; iter4 < ndim2; iter4++)
{
	size4 *= dim2[iter4];
}
Matrix *mat10 = createM(ndim2, dim2, 0);
writeM(mat10, size4, lhs_data4);
int d3_5 = 1;
int d2_5 = ceil((double) 6 / (3 * 3));
int tmp_5 = 6 % (3 * 3);
if (tmp_5 == 0) {
    tmp_5 = 3 * 3;
}
int d0_5 = tmp_5 % 3;
if (d0_5 == 0) {
    d0_5 = 3;
}
int d1_5 = (tmp_5 - d0_5)/3 + 1;
int tmp14 = 12;
void *data5 = getdataM(c);
int* lhs_data5 = (int *)data5;
lhs_data5[(d1_5-1) + (d0_5-1) * 3 + (d2_5-1) * 3 * 3 + (d3_5-1) * 3 * 3 * 1] = tmp14;
int size5 = 1;
for (int iter5 = 0 ; iter5 < ndim2; iter5++)
{
	size5 *= dim2[iter5];
}
Matrix *mat11 = createM(ndim2, dim2, 0);
writeM(mat11, size5, lhs_data5);
Matrix * mat12 = transposeM(mat11);
c = mat12;
printM(mat12);
int ndim3 = 2;
int dim3[2] = {3,3};
d = zerosM(ndim3, dim3);
void *data6 = getdataM(d);
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
int tmp17 = i * i;
lhs_data6[(d1_6-1) + (d0_6-1) * 3 + (d2_6-1) * 3 * 3 + (d3_6-1) * 3 * 3 * 1] = tmp17;

}
int size6 = 1;
for (int iter6 = 0 ; iter6 < ndim3; iter6++)
{
	size6 *= dim3[iter6];
}
Matrix *mat13 = createM(ndim3, dim3, 0);
writeM(mat13, size6, lhs_data6);
int d3_7 = 1;
int d2_7 = ceil((double) 4 / (3 * 3));
int tmp_7 = 4 % (3 * 3);
if (tmp_7 == 0) {
    tmp_7 = 3 * 3;
}
int d0_7 = tmp_7 % 3;
if (d0_7 == 0) {
    d0_7 = 3;
}
int d1_7 = (tmp_7 - d0_7)/3 + 1;
int tmp18 = 13;
void *data7 = getdataM(d);
int* lhs_data7 = (int *)data7;
lhs_data7[(d1_7-1) + (d0_7-1) * 3 + (d2_7-1) * 3 * 3 + (d3_7-1) * 3 * 3 * 1] = tmp18;
int size7 = 1;
for (int iter7 = 0 ; iter7 < ndim3; iter7++)
{
	size7 *= dim3[iter7];
}
Matrix *mat14 = createM(ndim3, dim3, 0);
writeM(mat14, size7, lhs_data7);
int d3_8 = 1;
int d2_8 = ceil((double) 7 / (3 * 3));
int tmp_8 = 7 % (3 * 3);
if (tmp_8 == 0) {
    tmp_8 = 3 * 3;
}
int d0_8 = tmp_8 % 3;
if (d0_8 == 0) {
    d0_8 = 3;
}
int d1_8 = (tmp_8 - d0_8)/3 + 1;
int tmp19 = 14;
void *data8 = getdataM(d);
int* lhs_data8 = (int *)data8;
lhs_data8[(d1_8-1) + (d0_8-1) * 3 + (d2_8-1) * 3 * 3 + (d3_8-1) * 3 * 3 * 1] = tmp19;
int size8 = 1;
for (int iter8 = 0 ; iter8 < ndim3; iter8++)
{
	size8 *= dim3[iter8];
}
Matrix *mat15 = createM(ndim3, dim3, 0);
writeM(mat15, size8, lhs_data8);
int d3_9 = 1;
int d2_9 = ceil((double) 8 / (3 * 3));
int tmp_9 = 8 % (3 * 3);
if (tmp_9 == 0) {
    tmp_9 = 3 * 3;
}
int d0_9 = tmp_9 % 3;
if (d0_9 == 0) {
    d0_9 = 3;
}
int d1_9 = (tmp_9 - d0_9)/3 + 1;
int tmp20 = 15;
void *data9 = getdataM(d);
int* lhs_data9 = (int *)data9;
lhs_data9[(d1_9-1) + (d0_9-1) * 3 + (d2_9-1) * 3 * 3 + (d3_9-1) * 3 * 3 * 1] = tmp20;
int size9 = 1;
for (int iter9 = 0 ; iter9 < ndim3; iter9++)
{
	size9 *= dim3[iter9];
}
Matrix *mat16 = createM(ndim3, dim3, 0);
writeM(mat16, size9, lhs_data9);
Matrix * mat17 = transposeM(mat16);
d = mat17;
printM(mat17);
Matrix * mat18 = equalM(mat2, mat2);
Matrix * mat19 = equalM(mat2, mat12);
Matrix * mat20 = andM((mat18), (mat19));
Matrix * mat21 = equalM(mat2, mat17);
Matrix * mat22 = andM(mat20, (mat21));
printM(mat22);
return 0;
}
