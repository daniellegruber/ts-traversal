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

Matrix **matrices = NULL;
matrices = malloc(15*sizeof(*matrices));
	        
int ndim1 = 2;
int dim1[2] = {15, 1};
int ndim2 = 2;
int dim2[2] = {3,3};
matrices[0] = zerosM(ndim2, dim2);
int ndim3 = 2;
int dim3[2] = {3, 3};
int scalar1 = 2;
Matrix * mat1 = scaleM(identityM(3), &scalar1, 0);
matrices[1] = mat1;
int ndim4 = 2;
int dim4[2] = {3, 3};
matrices[2] = identityM(3);
int ndim5 = 2;
int dim5[2] = {3, 3};
complex scalar2 = (4.2 - 0.03*I);
Matrix * mat2 = scaleM(identityM(3), &scalar2, 2);
matrices[3] = mat2;
int ndim6 = 2;
int dim6[2] = {3,3};
matrices[4] = zerosM(ndim6, dim6);
void *data1 = getdataM(matrices[4]);
int* lhs_data1 = (int *)data1;

for (int i =  1; i <= 9; ++ i) {
int d3_6 = 1;
int d2_6 = ceil((double) i / (1 * 1));
int tmp_6 = i % (1 * 1);
if (tmp_6 == 0) {
tmp_6 = 1 * 1;
}
int d0_6 = tmp_6 % 1;
if (d0_6 == 0) {
d0_6 = 1;
}
int d1_6 = (tmp_6 - d0_6)/1 + 1;
int tmp7 = i * i;
lhs_data1[(d1_6-1) + (d0_6-1) * 1 + (d2_6-1) * 1 * 1 + (d3_6-1) * 1 * 1 * 1] = tmp7;

}
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim6; iter1++)
{
	size1 *= dim6[iter1];
}
Matrix *mat3 = createM(ndim6, dim6, 0);
writeM(mat3, size1, lhs_data1);
Matrix * mat4 = transposeM(mat3);
matrices[4] = mat4;
int ndim7 = 2;
int dim7[2] = {3,3};
matrices[5] = zerosM(ndim7, dim7);
void *data2 = getdataM(matrices[5]);
double* lhs_data2 = (double *)data2;

for (int i =  1; i <= 9; ++ i) {
int d3_11 = 1;
int d2_11 = ceil((double) i / (1 * 1));
int tmp_11 = i % (1 * 1);
if (tmp_11 == 0) {
tmp_11 = 1 * 1;
}
int d0_11 = tmp_11 % 1;
if (d0_11 == 0) {
d0_11 = 1;
}
int d1_11 = (tmp_11 - d0_11)/1 + 1;
double tmp9 = i * i + 0.5;
lhs_data2[(d1_11-1) + (d0_11-1) * 1 + (d2_11-1) * 1 * 1 + (d3_11-1) * 1 * 1 * 1] = tmp9;

}
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim7; iter2++)
{
	size2 *= dim7[iter2];
}
Matrix *mat5 = createM(ndim7, dim7, 1);
writeM(mat5, size2, lhs_data2);
Matrix * mat6 = transposeM(mat5);
matrices[5] = mat6;
int ndim8 = 2;
int dim8[2] = {3,3};
matrices[6] = zerosM(ndim8, dim8);
void *data3 = getdataM(matrices[6]);
complex* lhs_data3 = (complex *)data3;

for (int i =  1; i <= 9; ++ i) {
int d3_16 = 1;
int d2_16 = ceil((double) i / (1 * 1));
int tmp_16 = i % (1 * 1);
if (tmp_16 == 0) {
tmp_16 = 1 * 1;
}
int d0_16 = tmp_16 % 1;
if (d0_16 == 0) {
d0_16 = 1;
}
int d1_16 = (tmp_16 - d0_16)/1 + 1;
complex tmp11 = i * i + 0.5*I;
lhs_data3[(d1_16-1) + (d0_16-1) * 1 + (d2_16-1) * 1 * 1 + (d3_16-1) * 1 * 1 * 1] = tmp11;

}
int size3 = 1;
for (int iter3 = 0 ; iter3 < ndim8; iter3++)
{
	size3 *= dim8[iter3];
}
Matrix *mat7 = createM(ndim8, dim8, 2);
writeM(mat7, size3, lhs_data3);
Matrix * mat8 = transposeM(mat7);
matrices[6] = mat8;
int ndim9 = 2;
int dim9[2] = {3,3};
matrices[7] = zerosM(ndim9, dim9);
void *data4 = getdataM(matrices[7]);
int* lhs_data4 = (int *)data4;

for (int i =  1; i <= 9; ++ i) {
int d3_21 = 1;
int d2_21 = ceil((double) i / (1 * 1));
int tmp_21 = i % (1 * 1);
if (tmp_21 == 0) {
tmp_21 = 1 * 1;
}
int d0_21 = tmp_21 % 1;
if (d0_21 == 0) {
d0_21 = 1;
}
int d1_21 = (tmp_21 - d0_21)/1 + 1;
int tmp13 = (i - 5) * i;
lhs_data4[(d1_21-1) + (d0_21-1) * 1 + (d2_21-1) * 1 * 1 + (d3_21-1) * 1 * 1 * 1] = tmp13;

}
int size4 = 1;
for (int iter4 = 0 ; iter4 < ndim9; iter4++)
{
	size4 *= dim9[iter4];
}
Matrix *mat9 = createM(ndim9, dim9, 0);
writeM(mat9, size4, lhs_data4);
Matrix * mat10 = transposeM(mat9);
matrices[7] = mat10;
int ndim10 = 2;
int dim10[2] = {3,3};
matrices[8] = zerosM(ndim10, dim10);
void *data5 = getdataM(matrices[8]);
double* lhs_data5 = (double *)data5;

for (int i =  1; i <= 9; ++ i) {
int d3_26 = 1;
int d2_26 = ceil((double) i / (1 * 1));
int tmp_26 = i % (1 * 1);
if (tmp_26 == 0) {
tmp_26 = 1 * 1;
}
int d0_26 = tmp_26 % 1;
if (d0_26 == 0) {
d0_26 = 1;
}
int d1_26 = (tmp_26 - d0_26)/1 + 1;
double tmp15 = (i - 8.2) * i + 0.5;
lhs_data5[(d1_26-1) + (d0_26-1) * 1 + (d2_26-1) * 1 * 1 + (d3_26-1) * 1 * 1 * 1] = tmp15;

}
int size5 = 1;
for (int iter5 = 0 ; iter5 < ndim10; iter5++)
{
	size5 *= dim10[iter5];
}
Matrix *mat11 = createM(ndim10, dim10, 1);
writeM(mat11, size5, lhs_data5);
Matrix * mat12 = transposeM(mat11);
matrices[8] = mat12;
int ndim11 = 2;
int dim11[2] = {3,3};
matrices[9] = zerosM(ndim11, dim11);
void *data6 = getdataM(matrices[9]);
complex* lhs_data6 = (complex *)data6;

for (int i =  1; i <= 9; ++ i) {
int d3_31 = 1;
int d2_31 = ceil((double) i / (1 * 1));
int tmp_31 = i % (1 * 1);
if (tmp_31 == 0) {
tmp_31 = 1 * 1;
}
int d0_31 = tmp_31 % 1;
if (d0_31 == 0) {
d0_31 = 1;
}
int d1_31 = (tmp_31 - d0_31)/1 + 1;
complex tmp17 = (i - 5.89) * (i) + ((0.5) * (4 - i)) * 1*I;
lhs_data6[(d1_31-1) + (d0_31-1) * 1 + (d2_31-1) * 1 * 1 + (d3_31-1) * 1 * 1 * 1] = tmp17;

}
int size6 = 1;
for (int iter6 = 0 ; iter6 < ndim11; iter6++)
{
	size6 *= dim11[iter6];
}
Matrix *mat13 = createM(ndim11, dim11, 2);
writeM(mat13, size6, lhs_data6);
Matrix * mat14 = transposeM(mat13);
matrices[9] = mat14;

int ndim12 = 2;
int dim12[2] = {3,3};
matrices[10] = createM(ndim12, dim12, 0);
int *input1 = NULL;
input1 = malloc( 9*sizeof(*input1));
input1[0] = 3;
input1[1] = -2;
input1[2] = 0;
input1[3] = 4;
input1[4] = -1;
input1[5] = 0;
input1[6] = 0;
input1[7] = 0;
input1[8] = 1;
writeM( matrices[10], 9, input1);
free(input1);


int ndim13 = 2;
int dim13[2] = {3,3};
matrices[11] = createM(ndim13, dim13, 1);
double *input2 = NULL;
input2 = malloc( 9*sizeof(*input2));
input2[0] = 11.25;
input2[1] = -7.525;
input2[2] = -1.45;
input2[3] = 11;
input2[4] = -6.9;
input2[5] = -2.2;
input2[6] = 5.5;
input2[7] = -5.45;
input2[8] = 2.9;
writeM( matrices[11], 9, input2);
free(input2);

int ndim14 = 2;
int dim14[2] = {3,3};
matrices[12] = zerosM(ndim14, dim14);
void *data7 = getdataM(matrices[12]);
int* lhs_data7 = (int *)data7;

for (int i =  1; i <= 9; ++ i) {
int d3_38 = 1;
int d2_38 = ceil((double) i / (1 * 1));
int tmp_38 = i % (1 * 1);
if (tmp_38 == 0) {
tmp_38 = 1 * 1;
}
int d0_38 = tmp_38 % 1;
if (d0_38 == 0) {
d0_38 = 1;
}
int d1_38 = (tmp_38 - d0_38)/1 + 1;
int tmp19 = (-1) ^ i * i * i;
lhs_data7[(d1_38-1) + (d0_38-1) * 1 + (d2_38-1) * 1 * 1 + (d3_38-1) * 1 * 1 * 1] = tmp19;

}
int size7 = 1;
for (int iter7 = 0 ; iter7 < ndim14; iter7++)
{
	size7 *= dim14[iter7];
}
Matrix *mat15 = createM(ndim14, dim14, 0);
writeM(mat15, size7, lhs_data7);
Matrix * mat16 = transposeM(mat15);
matrices[12] = mat16;
// Non-diagonalizeable matrices

int ndim15 = 2;
int dim15[2] = {3,3};
matrices[13] = createM(ndim15, dim15, 0);
int *input3 = NULL;
input3 = malloc( 9*sizeof(*input3));
input3[0] = 1;
input3[1] = 1;
input3[2] = 0;
input3[3] = 0;
input3[4] = 1;
input3[5] = 0;
input3[6] = 0;
input3[7] = 0;
input3[8] = 0;
writeM( matrices[13], 9, input3);
free(input3);


int ndim16 = 2;
int dim16[2] = {3,3};
matrices[14] = createM(ndim16, dim16, 0);
int *input4 = NULL;
input4 = malloc( 9*sizeof(*input4));
input4[0] = 3;
input4[1] = 4;
input4[2] = 3;
input4[3] = -1;
input4[4] = 0;
input4[5] = -1;
input4[6] = 1;
input4[7] = 2;
input4[8] = 3;
writeM( matrices[14], 9, input4);
free(input4);

// Returns slightly different eigenvectors compared to the C output

for (int index =  1; index <= 14; ++ index) {
printf("\n%s", "Original\n");
int d3_44 = 1;
int d2_44 = ceil((double) index / (15 * 1));
int tmp_44 = index % (15 * 1);
if (tmp_44 == 0) {
tmp_44 = 15 * 1;
}
int d0_44 = tmp_44 % 15;
if (d0_44 == 0) {
d0_44 = 15;
}
int d1_44 = (tmp_44 - d0_44)/15 + 1;
printM(matrices[(d1_44-1) + (d0_44-1) * 1 + (d2_44-1) * 15 * 1 + (d3_44-1) * 15 * 1 * 1]);
int d3_45 = 1;
int d2_45 = ceil((double) index / (15 * 1));
int tmp_45 = index % (15 * 1);
if (tmp_45 == 0) {
tmp_45 = 15 * 1;
}
int d0_45 = tmp_45 % 15;
if (d0_45 == 0) {
d0_45 = 15;
}
int d1_45 = (tmp_45 - d0_45)/15 + 1;
Matrix * V;
Matrix * lambda;
eigM(matrices[(d1_45-1) + (d0_45-1) * 1 + (d2_45-1) * 15 * 1 + (d3_45-1) * 15 * 1 * 1], &V, &lambda);
printf("\n%s", "Eigenvalues:\n");
printM(lambda);
printf("\n%s", "Eigenvectors:\n");
printM(V);

}
return 0;
}
