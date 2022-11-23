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
int ndim1 = 4;
int dim1[4] = {2, 3, 4, 5};
Matrix * a = zerosM(ndim1, dim1);
int counter = 0;
// Method 1 to create 4D matrix
// Creates the matrix row-major to match C's implementation
// Note that in Octave, the i (row) loop is outside the j (column) loop. this is
// because Octave is natively column-major, so we must assign carefully.
void *data1 = getdataM(a);
int* lhs_data1 = (int *)data1;

for (int l =  1; l <= 5; ++ l) {

for (int k =  1; k <= 4; ++ k) {

for (int i =  1; i <= 2; ++ i) {

for (int j =  1; j <= 3; ++ j) {
//a(i,j,k,l) = counter + 0.5;
int tmp2 = counter;
lhs_data1[(j-1) + (i-1)*3 + (k-1)*2*3 + (l-1)*2*3*4] = tmp2;
counter = counter + 1;

}

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
// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration

for (int l =  1; l <= 5; ++ l) {

for (int k =  1; k <= 4; ++ k) {

for (int i =  1; i <= 2; ++ i) {

for (int j =  1; j <= 3; ++ j) {
int tmp4;
indexM(mat1, &tmp4, 4, i, j, k, l);
printf("\n%d", tmp4);

}

}

}

}
printf("\n%s", "\n");
// Normal indexing in C and normal indexing in Octave are the same

for (int l =  1; l <= 5; ++ l) {

for (int k =  1; k <= 4; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
int tmp7;
indexM(mat1, &tmp7, 4, i, j, k, l);
printf("\n%d", tmp7);

}

}

}

}
printf("\n%s", "\n");
// Flat indexing in Octave must be matched by normal indexing in C

for (int i =  1; i <= 120; ++ i) {
int d3_4 = ceil((double) i / (2 * 3 * 4));
int d2_4 = ((int) ceil((double) i / (2 * 3))) % 4;
if (d2_4 == 0) {
    d2_4 = 4;
}
int tmp_4 = i % (2 * 3);
if (tmp_4 == 0) {
    tmp_4 = 2 * 3;
}
int d0_4 = tmp_4 % 2;
if (d0_4 == 0) {
    d0_4 = 2;
}
int d1_4 = (tmp_4 - d0_4)/2 + 1;
int tmp10;
indexM(mat1, &tmp10, 1, d1_4 + (d0_4-1) * 3 + (d2_4-1) * 2 * 3 + (d3_4-1) * 2 * 3 * 4);
printf("\n%d", tmp10);

}
printf("\n%s", "\n");
// Method 2 to create 4D matrix
// Creates the matrix column-major to match Octave's implementation
int ndim2 = 4;
int dim2[4] = {2, 3, 4, 5};
a = zerosM(ndim2, dim2);
counter = 0;
void *data2 = getdataM(a);
int* lhs_data2 = (int *)data2;

for (int i =  1; i <= 120; ++ i) {
//a(i) = counter+0.5;
int d3_5 = ceil((double) i / (2 * 3 * 4));
int d2_5 = ((int) ceil((double) i / (2 * 3))) % 4;
if (d2_5 == 0) {
    d2_5 = 4;
}
int tmp_5 = i % (2 * 3);
if (tmp_5 == 0) {
    tmp_5 = 2 * 3;
}
int d0_5 = tmp_5 % 2;
if (d0_5 == 0) {
    d0_5 = 2;
}
int d1_5 = (tmp_5 - d0_5)/2 + 1;
int tmp14 = counter;
lhs_data2[(d1_5-1) + (d0_5-1) * 3 + (d2_5-1) * 2 * 3 + (d3_5-1) * 2 * 3 * 4] = tmp14;
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
// Flat indexing in C must be must be matched in Octave by flipping the row & column iteration

for (int l =  1; l <= 5; ++ l) {

for (int k =  1; k <= 4; ++ k) {

for (int i =  1; i <= 2; ++ i) {

for (int j =  1; j <= 3; ++ j) {
int tmp16;
indexM(mat2, &tmp16, 4, i, j, k, l);
printf("\n%d", tmp16);

}

}

}

}
printf("\n%s", "\n");
// Normal indexing in C and normal indexing in Octave are the same

for (int l =  1; l <= 5; ++ l) {

for (int k =  1; k <= 4; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
int tmp19;
indexM(mat2, &tmp19, 4, i, j, k, l);
printf("\n%d", tmp19);

}

}

}

}
printf("\n%s", "\n");
// Flat indexing in Octave must be matched by normal indexing in C

for (int i =  1; i <= 120; ++ i) {
int d3_8 = ceil((double) i / (2 * 3 * 4));
int d2_8 = ((int) ceil((double) i / (2 * 3))) % 4;
if (d2_8 == 0) {
    d2_8 = 4;
}
int tmp_8 = i % (2 * 3);
if (tmp_8 == 0) {
    tmp_8 = 2 * 3;
}
int d0_8 = tmp_8 % 2;
if (d0_8 == 0) {
    d0_8 = 2;
}
int d1_8 = (tmp_8 - d0_8)/2 + 1;
int tmp22;
indexM(mat2, &tmp22, 1, d1_8 + (d0_8-1) * 3 + (d2_8-1) * 2 * 3 + (d3_8-1) * 2 * 3 * 4);
printf("\n%d", tmp22);

}
printf("\n%s", "\n");
return 0;
}
