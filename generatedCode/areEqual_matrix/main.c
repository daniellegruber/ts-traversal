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
double* lhs_data1 = (double *)data1;

for (int i =  1; i <= 9; ++ i) {
double tmp2;
indexM(a, &tmp2, 1, i);
tmp2 = i * i;
lhs_data1[i] = tmp2;

}
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim1; iter1++)
{
	size1 *= dim1[iter1];
}
Matrix *mat1 = createM(ndim1, dim1, DOUBLE);
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
double* lhs_data2 = (double *)data2;

for (int i =  1; i <= 9; ++ i) {
double tmp11;
indexM(mat2, &tmp11, 1, i);
tmp11 = i * i;
lhs_data2[i] = tmp11;

}
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim2; iter2++)
{
	size2 *= dim2[iter2];
}
Matrix *mat8 = createM(ndim2, dim2, DOUBLE);
writeM(mat8, size2, lhs_data2);
double tmp12;
indexM(mat8, &tmp12, 1, 2);
tmp12 = 10;
void *data3 = getdataM(c);
double* lhs_data3 = (double *)data3;
lhs_data3[2] = tmp12;
int size3 = 1;
for (int iter3 = 0 ; iter3 < ndim2; iter3++)
{
	size3 *= dim2[iter3];
}
Matrix *mat9 = createM(ndim2, dim2, DOUBLE);
writeM(mat9, size3, lhs_data3);
double tmp13;
indexM(mat9, &tmp13, 1, 3);
tmp13 = 11;
void *data4 = getdataM(c);
double* lhs_data4 = (double *)data4;
lhs_data4[3] = tmp13;
int size4 = 1;
for (int iter4 = 0 ; iter4 < ndim2; iter4++)
{
	size4 *= dim2[iter4];
}
Matrix *mat10 = createM(ndim2, dim2, DOUBLE);
writeM(mat10, size4, lhs_data4);
double tmp14;
indexM(mat10, &tmp14, 1, 6);
tmp14 = 12;
void *data5 = getdataM(c);
double* lhs_data5 = (double *)data5;
lhs_data5[6] = tmp14;
int size5 = 1;
for (int iter5 = 0 ; iter5 < ndim2; iter5++)
{
	size5 *= dim2[iter5];
}
Matrix *mat11 = createM(ndim2, dim2, DOUBLE);
writeM(mat11, size5, lhs_data5);
Matrix * mat12 = transposeM(mat11);
c = mat12;
printM(mat12);
int ndim3 = 2;
int dim3[2] = {3,3};
d = zerosM(ndim3, dim3);
void *data6 = getdataM(d);
double* lhs_data6 = (double *)data6;

for (int i =  1; i <= 9; ++ i) {
double tmp17;
indexM(mat2, &tmp17, 1, i);
tmp17 = i * i;
lhs_data6[i] = tmp17;

}
int size6 = 1;
for (int iter6 = 0 ; iter6 < ndim3; iter6++)
{
	size6 *= dim3[iter6];
}
Matrix *mat13 = createM(ndim3, dim3, DOUBLE);
writeM(mat13, size6, lhs_data6);
double tmp18;
indexM(mat13, &tmp18, 1, 4);
tmp18 = 13;
void *data7 = getdataM(d);
double* lhs_data7 = (double *)data7;
lhs_data7[4] = tmp18;
int size7 = 1;
for (int iter7 = 0 ; iter7 < ndim3; iter7++)
{
	size7 *= dim3[iter7];
}
Matrix *mat14 = createM(ndim3, dim3, DOUBLE);
writeM(mat14, size7, lhs_data7);
double tmp19;
indexM(mat14, &tmp19, 1, 7);
tmp19 = 14;
void *data8 = getdataM(d);
double* lhs_data8 = (double *)data8;
lhs_data8[7] = tmp19;
int size8 = 1;
for (int iter8 = 0 ; iter8 < ndim3; iter8++)
{
	size8 *= dim3[iter8];
}
Matrix *mat15 = createM(ndim3, dim3, DOUBLE);
writeM(mat15, size8, lhs_data8);
double tmp20;
indexM(mat15, &tmp20, 1, 8);
tmp20 = 15;
void *data9 = getdataM(d);
double* lhs_data9 = (double *)data9;
lhs_data9[8] = tmp20;
int size9 = 1;
for (int iter9 = 0 ; iter9 < ndim3; iter9++)
{
	size9 *= dim3[iter9];
}
Matrix *mat16 = createM(ndim3, dim3, DOUBLE);
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
