//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Entry-point function
int main(void) {

//more off
//format short
//source octaveIncludes.m;

Matrix **matrices = NULL;
matrices = malloc(12*sizeof(*matrices));
	        
int ndim1= 2;
int dim1[2]= {1, 10};
matrices[0] = zerosM(ndim1, dim1);
int tmp1= 1;
int* lhs_data1 = i_to_i(zerosM(ndim1, dim1));
lhs_data1[0] = tmp1;
// Write matrix mat1
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim1; iter1++)
{
	size1 *= dim1[iter1];
}
Matrix *mat1 = createM(ndim1, dim1, 0);
writeM(mat1, size1, lhs_data1);
int ndim2= 2;
int dim2[2]= {20, 1};
matrices[1] = onesM(ndim2, dim2);
int ndim3= 2;
int dim3[2]= {1, 10};
matrices[2] = onesM(ndim3, dim3);
int ndim4= 2;
int dim4[2]= {20, 1};
complex scalar1 = (4.5 - 0.5*I);
Matrix * tmp2= scaleM(onesM(ndim4, dim4), &scalar1, 2);
matrices[3] = tmp2;
int ndim5= 2;
int dim5[2]= {1, 10};
matrices[4] = zerosM(ndim5, dim5);
int* lhs_data2 = i_to_i(zerosM(ndim5, dim5));

for (int iter2 =  1; iter2 <= 10; ++ iter2) {
int d3_8 = 1;
int d2_8 = 1;
int d0_8 = iter2 % 1;
if (d0_8 == 0) {
d0_8 = 1;
}
int d1_8 = (iter2 - d0_8)/1 + 1;
int tmp3= iter2;
lhs_data2[(d1_8-1) + (d0_8-1) * 1 + (d2_8-1) * 1 * 1 + (d3_8-1) * 1 * 1 * 1] = tmp3;

}
// Write matrix mat2
int size2 = 1;
for (int iter3 = 0 ; iter3 < ndim5; iter3++)
{
	size2 *= dim5[iter3];
}
Matrix *mat2 = createM(ndim5, dim5, 0);
writeM(mat2, size2, lhs_data2);
matrices[4] = matrices[4];
int ndim6= 2;
int dim6[2]= {1, 10};
matrices[5] = zerosM(ndim6, dim6);
double* lhs_data3 = i_to_d(zerosM(ndim6, dim6));

for (int iter4 =  1; iter4 <= 10; ++ iter4) {
int d3_13 = 1;
int d2_13 = 1;
int d0_13 = iter4 % 1;
if (d0_13 == 0) {
d0_13 = 1;
}
int d1_13 = (iter4 - d0_13)/1 + 1;
double tmp4= iter4 * iter4 + 0.5;
lhs_data3[(d1_13-1) + (d0_13-1) * 1 + (d2_13-1) * 1 * 1 + (d3_13-1) * 1 * 1 * 1] = tmp4;

}
// Write matrix mat3
int size3 = 1;
for (int iter5 = 0 ; iter5 < ndim6; iter5++)
{
	size3 *= dim6[iter5];
}
Matrix *mat3 = createM(ndim6, dim6, 1);
writeM(mat3, size3, lhs_data3);
matrices[5] = matrices[5];
int ndim7= 2;
int dim7[2]= {20, 1};
matrices[6] = onesM(ndim7, dim7);
complex* lhs_data4 = i_to_c(onesM(ndim7, dim7));

for (int iter6 =  1; iter6 <= 20; ++ iter6) {
int d3_18 = 1;
int d2_18 = 1;
int d0_18 = iter6 % 1;
if (d0_18 == 0) {
d0_18 = 1;
}
int d1_18 = (iter6 - d0_18)/1 + 1;
complex tmp5= iter6 * iter6 + 0.5*I;
lhs_data4[(d1_18-1) + (d0_18-1) * 1 + (d2_18-1) * 1 * 1 + (d3_18-1) * 1 * 1 * 1] = tmp5;

}
// Write matrix mat4
int size4 = 1;
for (int iter7 = 0 ; iter7 < ndim7; iter7++)
{
	size4 *= dim7[iter7];
}
Matrix *mat4 = createM(ndim7, dim7, 2);
writeM(mat4, size4, lhs_data4);
matrices[6] = matrices[6];
int ndim8= 2;
int dim8[2]= {20, 1};
matrices[7] = onesM(ndim8, dim8);
int* lhs_data5 = i_to_i(onesM(ndim8, dim8));

for (int iter8 =  1; iter8 <= 20; ++ iter8) {
int d3_23 = 1;
int d2_23 = 1;
int d0_23 = iter8 % 1;
if (d0_23 == 0) {
d0_23 = 1;
}
int d1_23 = (iter8 - d0_23)/1 + 1;
int tmp6= (iter8 - 5) * iter8;
lhs_data5[(d1_23-1) + (d0_23-1) * 1 + (d2_23-1) * 1 * 1 + (d3_23-1) * 1 * 1 * 1] = tmp6;

}
// Write matrix mat5
int size5 = 1;
for (int iter9 = 0 ; iter9 < ndim8; iter9++)
{
	size5 *= dim8[iter9];
}
Matrix *mat5 = createM(ndim8, dim8, 0);
writeM(mat5, size5, lhs_data5);
matrices[7] = matrices[7];
int ndim9= 2;
int dim9[2]= {20, 1};
matrices[8] = onesM(ndim9, dim9);
double* lhs_data6 = i_to_d(onesM(ndim9, dim9));

for (int iter10 =  1; iter10 <= 20; ++ iter10) {
int d3_28 = 1;
int d2_28 = 1;
int d0_28 = iter10 % 1;
if (d0_28 == 0) {
d0_28 = 1;
}
int d1_28 = (iter10 - d0_28)/1 + 1;
double tmp7= (iter10 - 8.5) * iter10 + 0.5;
lhs_data6[(d1_28-1) + (d0_28-1) * 1 + (d2_28-1) * 1 * 1 + (d3_28-1) * 1 * 1 * 1] = tmp7;

}
// Write matrix mat6
int size6 = 1;
for (int iter11 = 0 ; iter11 < ndim9; iter11++)
{
	size6 *= dim9[iter11];
}
Matrix *mat6 = createM(ndim9, dim9, 1);
writeM(mat6, size6, lhs_data6);
matrices[8] = matrices[8];
int ndim10= 2;
int dim10[2]= {1, 10};
matrices[9] = zerosM(ndim10, dim10);
complex* lhs_data7 = i_to_c(zerosM(ndim10, dim10));

for (int iter12 =  1; iter12 <= 10; ++ iter12) {
int d3_33 = 1;
int d2_33 = 1;
int d0_33 = iter12 % 1;
if (d0_33 == 0) {
d0_33 = 1;
}
int d1_33 = (iter12 - d0_33)/1 + 1;
complex tmp8= (iter12 - 5.5) * (iter12) + ((0.5) * (4 - iter12)) * 1*I;
lhs_data7[(d1_33-1) + (d0_33-1) * 1 + (d2_33-1) * 1 * 1 + (d3_33-1) * 1 * 1 * 1] = tmp8;

}
// Write matrix mat7
int size7 = 1;
for (int iter13 = 0 ; iter13 < ndim10; iter13++)
{
	size7 *= dim10[iter13];
}
Matrix *mat7 = createM(ndim10, dim10, 2);
writeM(mat7, size7, lhs_data7);
matrices[9] = matrices[9];

int ndim11 = 2;
int dim11[2] = {1,10};
matrices[10] = createM(ndim11, dim11, 1);
double *input1 = NULL;
input1 = malloc( 10*sizeof(*input1));
input1[0] = 3;
input1[1] = -2;
input1[2] = 0;
input1[3] = 4;
input1[4] = -1;
input1[5] = 0;
input1[6] = 0;
input1[7] = 0;
input1[8] = 1;
input1[9] = 2.5;
writeM( matrices[10], 10, input1);
free(input1);


int ndim12 = 2;
int dim12[2] = {1,10};
matrices[11] = createM(ndim12, dim12, 1);
double *input2 = NULL;
input2 = malloc( 10*sizeof(*input2));
input2[0] = 3;
input2[1] = -2;
input2[2] = 0;
input2[3] = 4;
input2[4] = -1;
input2[5] = 0;
input2[6] = 0;
input2[7] = 0;
input2[8] = 1;
input2[9] = 2.5;
writeM( matrices[11], 10, input2);
free(input2);


int ndim13 = 2;
int dim13[2] = {1,5};
matrices[1] = createM(ndim13, dim13, 0);
int *input3 = NULL;
input3 = malloc( 5*sizeof(*input3));
input3[0] = 1;
input3[1] = 2;
input3[2] = 3;
input3[3] = 4;
input3[4] = 5;
writeM( matrices[1], 5, input3);
free(input3);


for (int iter14 =  1; iter14 <= 13; ++ iter14) {
printf("\n%s\n", "b\n");
int d3_40 = 1;
int d2_40 = 1;
int d0_40 = iter14 % 12;
if (d0_40 == 0) {
d0_40 = 12;
}
int d1_40 = (iter14 - d0_40)/12 + 1;
printM(matrices[(d1_40-1) + (d0_40-1) * 1 + (d2_40-1) * 12 * 1 + (d3_40-1) * 12 * 1 * 1]);

for (int iter15 =  1; iter15 <= 13; ++ iter15) {
printf("\n%s\n", "\na\n");
int d3_41 = 1;
int d2_41 = 1;
int d0_41 = iter15 % 12;
if (d0_41 == 0) {
d0_41 = 12;
}
int d1_41 = (iter15 - d0_41)/12 + 1;
printM(matrices[(d1_41-1) + (d0_41-1) * 1 + (d2_41-1) * 12 * 1 + (d3_41-1) * 12 * 1 * 1]);

for (int iter16 =  1; iter16 <= 13; ++ iter16) {
printf("\n%s\n", "\nx\n");
int d3_42 = 1;
int d2_42 = 1;
int d0_42 = iter16 % 12;
if (d0_42 == 0) {
d0_42 = 12;
}
int d1_42 = (iter16 - d0_42)/12 + 1;
printM(matrices[(d1_42-1) + (d0_42-1) * 1 + (d2_42-1) * 12 * 1 + (d3_42-1) * 12 * 1 * 1]);
//sprintf(stdout, '\n');
printf("\n%s\n", "\n");
int d3_43 = 1;
int d2_43 = 1;
int d0_43 = iter14 % 12;
if (d0_43 == 0) {
d0_43 = 12;
}
int d1_43 = (iter14 - d0_43)/12 + 1;
int d3_44 = 1;
int d2_44 = 1;
int d0_44 = iter15 % 12;
if (d0_44 == 0) {
d0_44 = 12;
}
int d1_44 = (iter15 - d0_44)/12 + 1;
int d3_45 = 1;
int d2_45 = 1;
int d0_45 = iter16 % 12;
if (d0_45 == 0) {
d0_45 = 12;
}
int d1_45 = (iter16 - d0_45)/12 + 1;
int state_size1[]= {(int) fmax(getsizeM(matrices[(d1_43-1) + (d0_43-1) * 1 + (d2_43-1) * 12 * 1 + (d3_43-1) * 12 * 1 * 1]), getsizeM(matrices[(d1_44-1) + (d0_44-1) * 1 + (d2_44-1) * 12 * 1 + (d3_44-1) * 12 * 1 * 1])) - 1};
Matrix * zero1= zerosM(1, state_size1);
Matrix * y= filterM(matrices[(d1_43-1) + (d0_43-1) * 1 + (d2_43-1) * 12 * 1 + (d3_43-1) * 12 * 1 * 1], matrices[(d1_44-1) + (d0_44-1) * 1 + (d2_44-1) * 12 * 1 + (d3_44-1) * 12 * 1 * 1], matrices[(d1_45-1) + (d0_45-1) * 1 + (d2_45-1) * 12 * 1 + (d3_45-1) * 12 * 1 * 1], &zero1);
//[y, sf] = filter(matrices{i}, matrices{j}, matrices{k});
printM(y);
//sprintf(stdout, '\n');
//disp(sf);

}

}

}
return 0;
}
