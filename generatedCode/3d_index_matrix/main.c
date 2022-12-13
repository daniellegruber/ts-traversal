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
int ndim1 = 3;
int dim1[3] = {2, 3, 5};
Matrix * tmp2 = zerosM(ndim1, dim1);
Matrix * a = tmp2;
int counter = 0;
// Method 1 to create 3D matrix
// Creates the matrix row-major to match C's implementation
// Note that in Octave, the i (row) loop is outside the j (column) loop. this is
double* lhs_data1 = i_to_d(tmp2);
// because Octave is natively column-major, so we must assign carefully.

for (int iter1 =  1; iter1 <= 5; ++ iter1) {

for (int iter2 =  1; iter2 <= 3; ++ iter2) {

for (int iter3 =  1; iter3 <= 2; ++ iter3) {
lhs_data1[(iter2-1) + (iter3-1)*3 + (iter1-1)*2*3 + (1-1)*2*3*1] = counter * counter + 0.5;
//a(i,j,k) = counter;
counter = counter + 1;

}

}

}
int size1 = 1;
for (int iter4 = 0 ; iter4 < ndim1; iter4++)
{
	size1 *= dim1[iter4];
}
Matrix *mat1 = createM(ndim1, dim1, 1);
writeM(mat1, size1, lhs_data1);
printM(mat1);
// Normal indexing in C and normal indexing in Octave are the same

for (int iter5 =  1; iter5 <= 5; ++ iter5) {

for (int iter6 =  1; iter6 <= 3; ++ iter6) {

for (int iter7 =  1; iter7 <= 2; ++ iter7) {
double tmp5;
indexM(mat1, &tmp5, 3, iter7, iter6, iter5);
printf("\n%f\n", tmp5);

}

}

}
printf("\n%s\n", "\n");
// Flat indexing in Octave must be matched by normal indexing in C

for (int iter8 =  1; iter8 <= 30; ++ iter8) {
int d3_3 = 1;
int d2_3 = ceil((double) iter8 / (2 * 3));
int tmp_3 = iter8 % (2 * 3);
if (tmp_3 == 0) {
tmp_3 = 2 * 3;
}
int d0_3 = tmp_3 % 2;
if (d0_3 == 0) {
d0_3 = 2;
}
int d1_3 = (tmp_3 - d0_3)/2 + 1;
double tmp8;
indexM(mat1, &tmp8, 1, (d1_3) + (d0_3-1) * 3 + (d2_3-1) * 2 * 3 + (d3_3-1) * 2 * 3 * 5);
printf("\n%f\n", tmp8);

}
printf("\n%s\n", "\n");
// Method 2 to create 3D matrix
// Creates the matrix column-major to match Octave's implementation
int ndim2 = 3;
int dim2[3] = {2, 3, 5};
Matrix * tmp12 = zerosM(ndim2, dim2);
Matrix * a1 = tmp12;
double* lhs_data2 = i_to_d(tmp12);
counter = 0;

for (int iter9 =  1; iter9 <= 30; ++ iter9) {
int d3_4 = 1;
int d2_4 = ceil((double) iter9 / (2 * 3));
int tmp_4 = iter9 % (2 * 3);
if (tmp_4 == 0) {
tmp_4 = 2 * 3;
}
int d0_4 = tmp_4 % 2;
if (d0_4 == 0) {
d0_4 = 2;
}
int d1_4 = (tmp_4 - d0_4)/2 + 1;
lhs_data2[(d1_4-1) + (d0_4-1) * 3 + (d2_4-1) * 2 * 3 + (d3_4-1) * 2 * 3 * 5] = counter * counter + 0.5;
//a(i) = counter;
counter = counter + 1;

}
int size2 = 1;
for (int iter10 = 0 ; iter10 < ndim2; iter10++)
{
	size2 *= dim2[iter10];
}
Matrix *mat2 = createM(ndim2, dim2, 1);
writeM(mat2, size2, lhs_data2);
printM(mat2);
// Normal indexing in C and normal indexing in Octave are the same

for (int iter11 =  1; iter11 <= 5; ++ iter11) {

for (int iter12 =  1; iter12 <= 3; ++ iter12) {

for (int iter13 =  1; iter13 <= 2; ++ iter13) {
double tmp15;
indexM(mat2, &tmp15, 3, iter13, iter12, iter11);
printf("\n%f\n", tmp15);

}

}

}
printf("\n%s\n", "\n");
// Flat indexing in Octave must be matched by normal indexing in C

for (int iter14 =  1; iter14 <= 30; ++ iter14) {
int d3_6 = 1;
int d2_6 = ceil((double) iter14 / (2 * 3));
int tmp_6 = iter14 % (2 * 3);
if (tmp_6 == 0) {
tmp_6 = 2 * 3;
}
int d0_6 = tmp_6 % 2;
if (d0_6 == 0) {
d0_6 = 2;
}
int d1_6 = (tmp_6 - d0_6)/2 + 1;
double tmp18;
indexM(mat2, &tmp18, 1, (d1_6) + (d0_6-1) * 3 + (d2_6-1) * 2 * 3 + (d3_6-1) * 2 * 3 * 5);
printf("\n%f\n", tmp18);

}
printf("\n%s\n", "\n");
return 0;
}
