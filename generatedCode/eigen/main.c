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
int dim1[2] = {3,3};
Matrix * tmp3 = zerosM(ndim1, dim1);
matrices[0] = tmp3;
int ndim2 = 2;
int dim2[2] = {3, 3};
Matrix * tmp5 = identityM(3);
int scalar1 = 2;
Matrix * mat1 = scaleM(tmp5, &scalar1, 0);
matrices[1] = mat1;
int ndim3 = 2;
int dim3[2] = {3, 3};
Matrix * tmp7 = identityM(3);
matrices[2] = tmp7;
int ndim4 = 2;
int dim4[2] = {3, 3};
Matrix * tmp9 = identityM(3);
complex scalar2 = (4.2 - 0.03*I);
Matrix * mat2 = scaleM(tmp9, &scalar2, 2);
matrices[3] = mat2;
int ndim5 = 2;
int dim5[2] = {3,3};
Matrix * tmp11 = zerosM(ndim5, dim5);
matrices[4] = tmp11;
int* lhs_data1 = i_to_i(tmp11);

for (int iter1 =  1; iter1 <= 9; ++ iter1) {
int d3_6 = 1;
int d2_6 = 1;
int d0_6 = iter1 % 1;
if (d0_6 == 0) {
d0_6 = 1;
}
int d1_6 = (iter1 - d0_6)/1 + 1;
int tmp12 = iter1 * iter1;
lhs_data1[(d1_6-1) + (d0_6-1) * 1 + (d2_6-1) * 1 * 1 + (d3_6-1) * 1 * 1 * 1] = iter1 * iter1;

}
int size1 = 1;
for (int iter2 = 0 ; iter2 < ndim5; iter2++)
{
	size1 *= dim5[iter2];
}
Matrix *mat3 = createM(ndim5, dim5, 0);
writeM(mat3, size1, lhs_data1);
Matrix * mat4 = transposeM(mat3);
matrices[4] = mat4;
int ndim6 = 2;
int dim6[2] = {3,3};
Matrix * tmp14 = zerosM(ndim6, dim6);
matrices[5] = tmp14;
double* lhs_data2 = i_to_d(tmp14);

for (int iter3 =  1; iter3 <= 9; ++ iter3) {
int d3_11 = 1;
int d2_11 = 1;
int d0_11 = iter3 % 1;
if (d0_11 == 0) {
d0_11 = 1;
}
int d1_11 = (iter3 - d0_11)/1 + 1;
double tmp15 = iter3 * iter3 + 0.5;
lhs_data2[(d1_11-1) + (d0_11-1) * 1 + (d2_11-1) * 1 * 1 + (d3_11-1) * 1 * 1 * 1] = iter3 * iter3 + 0.5;

}
int size2 = 1;
for (int iter4 = 0 ; iter4 < ndim6; iter4++)
{
	size2 *= dim6[iter4];
}
Matrix *mat5 = createM(ndim6, dim6, 1);
writeM(mat5, size2, lhs_data2);
Matrix * mat6 = transposeM(mat5);
matrices[5] = mat6;
int ndim7 = 2;
int dim7[2] = {3,3};
Matrix * tmp17 = zerosM(ndim7, dim7);
matrices[6] = tmp17;
complex* lhs_data3 = i_to_c(tmp17);

for (int iter5 =  1; iter5 <= 9; ++ iter5) {
int d3_16 = 1;
int d2_16 = 1;
int d0_16 = iter5 % 1;
if (d0_16 == 0) {
d0_16 = 1;
}
int d1_16 = (iter5 - d0_16)/1 + 1;
complex tmp18 = iter5 * iter5 + 0.5*I;
lhs_data3[(d1_16-1) + (d0_16-1) * 1 + (d2_16-1) * 1 * 1 + (d3_16-1) * 1 * 1 * 1] = iter5 * iter5 + 0.5*I;

}
int size3 = 1;
for (int iter6 = 0 ; iter6 < ndim7; iter6++)
{
	size3 *= dim7[iter6];
}
Matrix *mat7 = createM(ndim7, dim7, 2);
writeM(mat7, size3, lhs_data3);
Matrix * mat8 = transposeM(mat7);
matrices[6] = mat8;
int ndim8 = 2;
int dim8[2] = {3,3};
Matrix * tmp20 = zerosM(ndim8, dim8);
matrices[7] = tmp20;
int* lhs_data4 = i_to_i(tmp20);

for (int iter7 =  1; iter7 <= 9; ++ iter7) {
int d3_21 = 1;
int d2_21 = 1;
int d0_21 = iter7 % 1;
if (d0_21 == 0) {
d0_21 = 1;
}
int d1_21 = (iter7 - d0_21)/1 + 1;
int tmp21 = (iter7 - 5) * iter7;
lhs_data4[(d1_21-1) + (d0_21-1) * 1 + (d2_21-1) * 1 * 1 + (d3_21-1) * 1 * 1 * 1] = (iter7 - 5) * iter7;

}
int size4 = 1;
for (int iter8 = 0 ; iter8 < ndim8; iter8++)
{
	size4 *= dim8[iter8];
}
Matrix *mat9 = createM(ndim8, dim8, 0);
writeM(mat9, size4, lhs_data4);
Matrix * mat10 = transposeM(mat9);
matrices[7] = mat10;
int ndim9 = 2;
int dim9[2] = {3,3};
Matrix * tmp23 = zerosM(ndim9, dim9);
matrices[8] = tmp23;
double* lhs_data5 = i_to_d(tmp23);

for (int iter9 =  1; iter9 <= 9; ++ iter9) {
int d3_26 = 1;
int d2_26 = 1;
int d0_26 = iter9 % 1;
if (d0_26 == 0) {
d0_26 = 1;
}
int d1_26 = (iter9 - d0_26)/1 + 1;
double tmp24 = (iter9 - 8.2) * iter9 + 0.5;
lhs_data5[(d1_26-1) + (d0_26-1) * 1 + (d2_26-1) * 1 * 1 + (d3_26-1) * 1 * 1 * 1] = (iter9 - 8.2) * iter9 + 0.5;

}
int size5 = 1;
for (int iter10 = 0 ; iter10 < ndim9; iter10++)
{
	size5 *= dim9[iter10];
}
Matrix *mat11 = createM(ndim9, dim9, 1);
writeM(mat11, size5, lhs_data5);
Matrix * mat12 = transposeM(mat11);
matrices[8] = mat12;
int ndim10 = 2;
int dim10[2] = {3,3};
Matrix * tmp26 = zerosM(ndim10, dim10);
matrices[9] = tmp26;
complex* lhs_data6 = i_to_c(tmp26);

for (int iter11 =  1; iter11 <= 9; ++ iter11) {
int d3_31 = 1;
int d2_31 = 1;
int d0_31 = iter11 % 1;
if (d0_31 == 0) {
d0_31 = 1;
}
int d1_31 = (iter11 - d0_31)/1 + 1;
complex tmp27 = (iter11 - 5.89) * (iter11) + ((0.5) * (4 - iter11)) * 1*I;
lhs_data6[(d1_31-1) + (d0_31-1) * 1 + (d2_31-1) * 1 * 1 + (d3_31-1) * 1 * 1 * 1] = (iter11 - 5.89) * (iter11) + ((0.5) * (4 - iter11)) * 1*I;

}
int size6 = 1;
for (int iter12 = 0 ; iter12 < ndim10; iter12++)
{
	size6 *= dim10[iter12];
}
Matrix *mat13 = createM(ndim10, dim10, 2);
writeM(mat13, size6, lhs_data6);
Matrix * mat14 = transposeM(mat13);
matrices[9] = mat14;

int ndim11 = 2;
int dim11[2] = {3,3};
matrices[10] = createM(ndim11, dim11, 0);
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


int ndim12 = 2;
int dim12[2] = {3,3};
matrices[11] = createM(ndim12, dim12, 1);
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

int ndim13 = 2;
int dim13[2] = {3,3};
Matrix * tmp29 = zerosM(ndim13, dim13);
matrices[12] = tmp29;
int* lhs_data7 = i_to_i(tmp29);

for (int iter13 =  1; iter13 <= 9; ++ iter13) {
int mat15 = pow((-1), iter13);
int d3_38 = 1;
int d2_38 = 1;
int d0_38 = iter13 % 1;
if (d0_38 == 0) {
d0_38 = 1;
}
int d1_38 = (iter13 - d0_38)/1 + 1;
int mat16 = pow((-1), iter13);
int tmp30 = mat16 * iter13 * iter13;
lhs_data7[(d1_38-1) + (d0_38-1) * 1 + (d2_38-1) * 1 * 1 + (d3_38-1) * 1 * 1 * 1] = mat16 * iter13 * iter13;

}
int size7 = 1;
for (int iter14 = 0 ; iter14 < ndim13; iter14++)
{
	size7 *= dim13[iter14];
}
Matrix *mat17 = createM(ndim13, dim13, 0);
writeM(mat17, size7, lhs_data7);
Matrix * mat18 = transposeM(mat17);
matrices[12] = mat18;
// Non-diagonalizeable matrices

int ndim14 = 2;
int dim14[2] = {3,3};
matrices[13] = createM(ndim14, dim14, 0);
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


int ndim15 = 2;
int dim15[2] = {3,3};
matrices[14] = createM(ndim15, dim15, 0);
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

for (int iter15 =  1; iter15 <= 14; ++ iter15) {
printf("\n%s\n", "Original\n");
int d3_44 = 1;
int d2_44 = 1;
int d0_44 = iter15 % 15;
if (d0_44 == 0) {
d0_44 = 15;
}
int d1_44 = (iter15 - d0_44)/15 + 1;
printM(matrices[(d1_44-1) + (d0_44-1) * 1 + (d2_44-1) * 15 * 1 + (d3_44-1) * 15 * 1 * 1]);
int d3_45 = 1;
int d2_45 = 1;
int d0_45 = iter15 % 15;
if (d0_45 == 0) {
d0_45 = 15;
}
int d1_45 = (iter15 - d0_45)/15 + 1;
complex complex_one = 1;
Matrix * V1 = NULL;
Matrix * lambda1 = NULL;
Matrix * evals1 = NULL;
Matrix * evecs1 = NULL;
eigM(matrices[(d1_45-1) + (d0_45-1) * 1 + (d2_45-1) * 15 * 1 + (d3_45-1) * 15 * 1 * 1], &evals1, &evecs1);
lambda1 = scaleM(evals1, &complex_one, COMPLEX);
V1 = scaleM(evecs1, &complex_one, COMPLEX);
printf("\n%s\n", "Eigenvalues:\n");
printM(lambda1);
printf("\n%s\n", "Eigenvectors:\n");
printM(V1);

}
return 0;
}
