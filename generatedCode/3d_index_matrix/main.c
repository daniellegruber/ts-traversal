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
Matrix * a = zerosM(ndim1, dim1);
int counter = 0;
// Method 1 to create 3D matrix
// Creates the matrix row-major to match C's implementation
// Note that in Octave, the i (row) loop is outside the j (column) loop. this is
// because Octave is natively column-major, so we must assign carefully.
void *data1 = getdataM(a);
double* lhs_data1 = (double *)data1;

for (int k =  1; k <= 5; ++ k) {

for (int i =  1; i <= 2; ++ i) {

for (int j =  1; j <= 3; ++ j) {
float tmp4 = counter * counter + 0.5;
lhs_data1[(k-1) * 2 * 3 + (j-1) * 2 + (i - 1)] = tmp4;
counter = counter + 1;

}

}

}
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim1; iter1++)
{
	size1 *= dim1[iter1];
}
Matrix *mat1 = createM(ndim1, dim1, DOUBLE);
writeM(mat1, size1, lhs_data1);
printM(mat1);
// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration

for (int k =  1; k <= 5; ++ k) {

for (int i =  1; i <= 2; ++ i) {

for (int j =  1; j <= 3; ++ j) {
double tmp12;
indexM(mat1, &tmp12, 3, i, j, k);
printf("\n%f", tmp12);

}

}

}
printf("\n%s", "\n");
// Normal indexing in C and normal indexing in Octave are the same

for (int k =  1; k <= 5; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
double tmp16;
indexM(mat1, &tmp16, 3, i, j, k);
double tmp17;
indexM(mat1, &tmp17, 3, i, j, k);
printf("\n%f", tmp17);

}

}

}
printf("\n%s", "\n");
// Flat indexing in Octave must be matched by normal indexing in C

for (int i =  1; i <= 30; ++ i) {
double tmp20;
indexM(mat1, &tmp20, 1, i);
printf("\n%f", tmp20);

}
printf("\n%s", "\n");
// Method 2 to create 3D matrix
// Creates the matrix column-major to match Octave's implementation
int ndim2 = 3;
int dim2[3] = {2, 3, 5};
a = zerosM(ndim2, dim2);
counter = 0;
void *data2 = getdataM(a);
double* lhs_data2 = (double *)data2;

for (int i =  1; i <= 30; ++ i) {
float tmp27 = counter * counter + 0.5;
lhs_data2[i] = tmp27;
counter = counter + 1;

}
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim2; iter2++)
{
	size2 *= dim2[iter2];
}
Matrix *mat2 = createM(ndim2, dim2, DOUBLE);
writeM(mat2, size2, lhs_data2);
printM(mat2);
// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration

for (int k =  1; k <= 5; ++ k) {

for (int i =  1; i <= 2; ++ i) {

for (int j =  1; j <= 3; ++ j) {
double tmp35;
indexM(mat2, &tmp35, 3, i, j, k);
double tmp36;
indexM(mat2, &tmp36, 3, i, j, k);
printf("\n%f", tmp36);

}

}

}
printf("\n%s", "\n");
// Normal indexing in C and normal indexing in Octave are the same

for (int k =  1; k <= 5; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
double tmp39;
indexM(mat2, &tmp39, 3, i, j, k);
double tmp40;
indexM(mat2, &tmp40, 3, i, j, k);
printf("\n%f", tmp40);

}

}

}
printf("\n%s", "\n");
// Flat indexing in Octave must be matched by normal indexing in C

for (int i =  1; i <= 30; ++ i) {
double tmp43;
indexM(mat2, &tmp43, 1, i);
double tmp44;
indexM(mat2, &tmp44, 1, i);
printf("\n%f", tmp44);

}
printf("\n%s", "\n");
return 0;
}
