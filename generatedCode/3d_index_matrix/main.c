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
int* lhs_data1 = (int *)data1;

for (int k =  1; k <= 5; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
//a(i,j,k) = counter*counter + 0.5;
int tmp2 = counter;
lhs_data1[(j-1) + (i-1)*3 + (k-1)*2*3 + (1-1)*2*3*1] = tmp2;
counter = counter + 1;

}

}

}
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim1; iter1++)
{
	size1 *= dim1[iter1];
}
Matrix *mat1 = createM(ndim1, dim1, 0);
writeM(mat1, size1, lhs_data1);
printM(mat1);
// Normal indexing in C and normal indexing in Octave are the same

for (int k =  1; k <= 5; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
int tmp4;
indexM(mat1, &tmp4, 3, i, j, k);
printf("\n%d", tmp4);

}

}

}
printf("\n%s", "\n");
// Flat indexing in Octave must be matched by normal indexing in C

for (int i =  1; i <= 30; ++ i) {
int d3 = 1;
int d2 = ceil((double) i / (2 * 3));
int tmp = i % (2 * 3);
if (tmp == 0) {
    tmp = 2 * 3;
}
int d0 = tmp % 2;
if (d0 == 0) {
    d0 = 2;
}
int d1 = (tmp - d0)/2 + 1;
int tmp7;
indexM(mat1, &tmp7, 1, d1 + (d0-1) * 3 + (d2-1) * 2 * 3 + (d3-1) * 2 * 3 * 5);
printf("\n%d", tmp7);

}
printf("\n%s", "\n");
// Method 2 to create 3D matrix
// Creates the matrix column-major to match Octave's implementation
int ndim2 = 3;
int dim2[3] = {2, 3, 5};
a = zerosM(ndim2, dim2);
counter = 0;
void *data2 = getdataM(a);
int* lhs_data2 = (int *)data2;

for (int i =  1; i <= 30; ++ i) {
//a(i) = counter*counter + 0.5;
int d3 = 1;
int d2 = ceil((double) i / (2 * 3));
int tmp = i % (2 * 3);
if (tmp == 0) {
    tmp = 2 * 3;
}
int d0 = tmp % 2;
if (d0 == 0) {
    d0 = 2;
}
int d1 = (tmp - d0)/2 + 1;
int tmp11 = counter;
lhs_data2[(d1-1) + (d0-1) * 3 + (d2-1) * 2 * 3 + (d3-1) * 2 * 3 * 5] = tmp11;
counter = counter + 1;

}
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim2; iter2++)
{
	size2 *= dim2[iter2];
}
Matrix *mat2 = createM(ndim2, dim2, 0);
writeM(mat2, size2, lhs_data2);
printM(mat2);
// Normal indexing in C and normal indexing in Octave are the same

for (int k =  1; k <= 5; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
int tmp13;
indexM(mat2, &tmp13, 3, i, j, k);
printf("\n%d", tmp13);

}

}

}
printf("\n%s", "\n");
// Flat indexing in Octave must be matched by normal indexing in C

for (int i =  1; i <= 30; ++ i) {
int d3 = 1;
int d2 = ceil((double) i / (2 * 3));
int tmp = i % (2 * 3);
if (tmp == 0) {
    tmp = 2 * 3;
}
int d0 = tmp % 2;
if (d0 == 0) {
    d0 = 2;
}
int d1 = (tmp - d0)/2 + 1;
int tmp16;
indexM(mat2, &tmp16, 1, d1 + (d0-1) * 3 + (d2-1) * 2 * 3 + (d3-1) * 2 * 3 * 5);
printf("\n%d", tmp16);

}
printf("\n%s", "\n");
return 0;
}
