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
int ndim1 = 2;
int dim1[2] = {3,3};
Matrix * a = onesM(ndim1, dim1);
complex tmp2 = -0.75 + 1*I;
void *data1 = getdataM(a);
complex* lhs_data1 = (complex *)data1;
lhs_data1[0] = tmp2;
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim1; iter1++)
{
	size1 *= dim1[iter1];
}
Matrix *mat1 = createM(ndim1, dim1, 2);
writeM(mat1, size1, lhs_data1);
complex tmp3 = -0.75 + 1*I;
void *data2 = getdataM(mat1);
complex* lhs_data2 = (complex *)data2;
lhs_data2[4] = tmp3;
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim1; iter2++)
{
	size2 *= dim1[iter2];
}
Matrix *mat2 = createM(ndim1, dim1, 2);
writeM(mat2, size2, lhs_data2);
complex tmp4 = -0.75 + 1*I;
void *data3 = getdataM(mat2);
complex* lhs_data3 = (complex *)data3;
lhs_data3[8] = tmp4;
int size3 = 1;
for (int iter3 = 0 ; iter3 < ndim1; iter3++)
{
	size3 *= dim1[iter3];
}
Matrix *mat3 = createM(ndim1, dim1, 2);
writeM(mat3, size3, lhs_data3);
Matrix * mat4 = transposeM(mat3);
a = mat4;
printM(mat4);
int ndim2 = 2;
int dim2[2] = {3,3};
Matrix * b = onesM(ndim2, dim2);
complex tmp7 = 0.5 + 1*I;
void *data4 = getdataM(b);
complex* lhs_data4 = (complex *)data4;
lhs_data4[0] = tmp7;
int size4 = 1;
for (int iter4 = 0 ; iter4 < ndim2; iter4++)
{
	size4 *= dim2[iter4];
}
Matrix *mat5 = createM(ndim2, dim2, 2);
writeM(mat5, size4, lhs_data4);
complex tmp8 = 0.5 + 1*I;
void *data5 = getdataM(mat5);
complex* lhs_data5 = (complex *)data5;
lhs_data5[4] = tmp8;
int size5 = 1;
for (int iter5 = 0 ; iter5 < ndim2; iter5++)
{
	size5 *= dim2[iter5];
}
Matrix *mat6 = createM(ndim2, dim2, 2);
writeM(mat6, size5, lhs_data5);
complex tmp9 = 0.5 + 1*I;
void *data6 = getdataM(mat6);
complex* lhs_data6 = (complex *)data6;
lhs_data6[8] = tmp9;
int size6 = 1;
for (int iter6 = 0 ; iter6 < ndim2; iter6++)
{
	size6 *= dim2[iter6];
}
Matrix *mat7 = createM(ndim2, dim2, 2);
writeM(mat7, size6, lhs_data6);
Matrix * mat8 = transposeM(mat7);
b = mat8;
printM(mat8);
Matrix * mat9 = rdivideM(mat4, mat8);
Matrix * c = mat9;
printM(mat9);
int ndim3 = 2;
int dim3[2] = {3, 3};
Matrix * mat10 = rdivideM(identityM(3), mat4);
Matrix * d = mat10;
printM(mat10);
int ndim4 = 2;
int dim4[2] = {3, 3};
Matrix * mat11 = rdivideM(mat8, identityM(3));
Matrix * e = mat11;
printM(mat11);
Matrix * mat12 = ldivideM(mat4, mat8);
c = mat12;
printM(mat12);
int ndim5 = 2;
int dim5[2] = {3, 3};
Matrix * mat13 = ldivideM(identityM(3), mat4);
d = mat13;
printM(mat13);
int ndim6 = 2;
int dim6[2] = {3, 3};
Matrix * mat14 = ldivideM(mat8, identityM(3));
e = mat14;
printM(mat14);
return 0;
}
