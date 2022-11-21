//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Function declarations
void fourier_script(Matrix * a);
void fourier_vec_script(Matrix * a);

// Entry-point function
int main(void)
{

//more off
//format short
//source octaveIncludes.m;
//row_vectors_i

int ndim1 = 2;
int dim1[2] = {1,4};
Matrix * a = createM(ndim1, dim1, 0);
int *input1 = NULL;
input1 = malloc( 4*sizeof(*input1));
input1[0] = 3;
input1[1] = -5;
input1[2] = 0;
input1[3] = 1;
writeM( a, 4, input1);
free(input1);

printM(a);
fourier_vec_script(a);
fourier_script(a);
//row_vectors_d

int ndim2 = 2;
int dim2[2] = {1,4};
a = createM(ndim2, dim2, 1);
double *input2 = NULL;
input2 = malloc( 4*sizeof(*input2));
input2[0] = 3.25;
input2[1] = -2;
input2[2] = 0;
input2[3] = 10.1;
writeM( a, 4, input2);
free(input2);

printM(a);
fourier_vec_script(a);
fourier_script(a);
//row_vectors_c

int ndim3 = 2;
int dim3[2] = {1,4};
a = createM(ndim3, dim3, 2);
complex *input3 = NULL;
input3 = malloc( 4*sizeof(*input3));
input3[0] = 3.25;
input3[1] = -2;
input3[2] = 0;
input3[3] = 1-1i;
writeM( a, 4, input3);
free(input3);

printM(a);
fourier_vec_script(a);
fourier_script(a);
//column_vectors_i

int ndim4 = 2;
int dim4[2] = {4,1};
a = createM(ndim4, dim4, 0);
int *input4 = NULL;
input4 = malloc( 4*sizeof(*input4));
input4[0] = 3;
input4[1] = -5;
input4[2] = 0;
input4[3] = 1;
writeM( a, 4, input4);
free(input4);

printM(a);
fourier_vec_script(a);
fourier_script(a);
//column_vectors_d

int ndim5 = 2;
int dim5[2] = {4,1};
a = createM(ndim5, dim5, 1);
double *input5 = NULL;
input5 = malloc( 4*sizeof(*input5));
input5[0] = 3.25;
input5[1] = -2;
input5[2] = 0;
input5[3] = 10.1;
writeM( a, 4, input5);
free(input5);

printM(a);
fourier_vec_script(a);
fourier_script(a);
//column_vectors_c

int ndim6 = 2;
int dim6[2] = {4,1};
a = createM(ndim6, dim6, 2);
complex *input6 = NULL;
input6 = malloc( 4*sizeof(*input6));
input6[0] = 3.25;
input6[1] = -2;
input6[2] = 0;
input6[3] = 1-1i;
writeM( a, 4, input6);
free(input6);

printM(a);
fourier_vec_script(a);
fourier_script(a);
//matrices_23_i

int ndim7 = 2;
int dim7[2] = {2,3};
a = createM(ndim7, dim7, 0);
int *input7 = NULL;
input7 = malloc( 6*sizeof(*input7));
input7[0] = 3;
input7[1] = -2;
input7[2] = 0;
input7[3] = 1;
input7[4] = 5;
input7[5] = 10;
writeM( a, 6, input7);
free(input7);

printM(a);
fourier_script(a);
//matrices_23_d

int ndim8 = 2;
int dim8[2] = {2,3};
a = createM(ndim8, dim8, 1);
double *input8 = NULL;
input8 = malloc( 6*sizeof(*input8));
input8[0] = 3.25;
input8[1] = -2;
input8[2] = 0;
input8[3] = 1;
input8[4] = 5;
input8[5] = 10;
writeM( a, 6, input8);
free(input8);

printM(a);
fourier_script(a);
//matrices_23_c

int ndim9 = 2;
int dim9[2] = {2,3};
a = createM(ndim9, dim9, 2);
complex *input9 = NULL;
input9 = malloc( 6*sizeof(*input9));
input9[0] = 3.25;
input9[1] = -2;
input9[2] = 0;
input9[3] = 1;
input9[4] = 5-1i;
input9[5] = 10;
writeM( a, 6, input9);
free(input9);

printM(a);
fourier_script(a);
//matrices_32_i

int ndim10 = 2;
int dim10[2] = {3,2};
a = createM(ndim10, dim10, 0);
int *input10 = NULL;
input10 = malloc( 6*sizeof(*input10));
input10[0] = 3;
input10[1] = -2;
input10[2] = 0;
input10[3] = 1;
input10[4] = 5;
input10[5] = 10;
writeM( a, 6, input10);
free(input10);

printM(a);
fourier_script(a);
//matrices_32_d

int ndim11 = 2;
int dim11[2] = {3,2};
a = createM(ndim11, dim11, 1);
double *input11 = NULL;
input11 = malloc( 6*sizeof(*input11));
input11[0] = 3.25;
input11[1] = -2;
input11[2] = 0;
input11[3] = 1;
input11[4] = 5;
input11[5] = 10;
writeM( a, 6, input11);
free(input11);

printM(a);
fourier_script(a);
//matrices_32_c

int ndim12 = 2;
int dim12[2] = {3,2};
a = createM(ndim12, dim12, 2);
complex *input12 = NULL;
input12 = malloc( 6*sizeof(*input12));
input12[0] = 3.25;
input12[1] = -2;
input12[2] = 0;
input12[3] = 1;
input12[4] = 5-1i;
input12[5] = 10;
writeM( a, 6, input12);
free(input12);

printM(a);
fourier_script(a);
//matrices_97_i
int ndim13 = 2;
int dim13[2] = {7, 9};
a = zerosM(ndim13, dim13);
void *data1 = getdataM(a);
int* lhs_data1 = (int *)data1;

for (int k =  1; k <= 63; ++ k) {
int d2 = ceil((double) k / (9 * 7));
int tmp = k % (9 * 7);
if (tmp == 0) {
    tmp = 9 * 7;
}
int d0 = tmp % 9;
if (d0 == 0) {
    d0 = 9;
}
int d1 = (tmp - d0)/9 + 1;
int tmp14 = (-1) ^ k * k ^ 2;
lhs_data1[(d2-1) * 9 * 7 + (d1-1) + (d0-1) * 7] = tmp14;

}
int size1 = 1;
for (int iter1 = 0 ; iter1 < ndim13; iter1++)
{
	size1 *= dim13[iter1];
}
Matrix *mat1 = createM(ndim13, dim13, 0);
writeM(mat1, size1, lhs_data1);
Matrix * mat2 = transposeM(mat1);
a = mat2;
printM(mat2);
fourier_script(mat2);
//matrices_97_d
int ndim14 = 2;
int dim14[2] = {7, 9};
a = zerosM(ndim14, dim14);
void *data2 = getdataM(a);
int* lhs_data2 = (int *)data2;

for (int k =  1; k <= 63; ++ k) {
int d2 = ceil((double) k / (9 * 7));
int tmp = k % (9 * 7);
if (tmp == 0) {
    tmp = 9 * 7;
}
int d0 = tmp % 9;
if (d0 == 0) {
    d0 = 9;
}
int d1 = (tmp - d0)/9 + 1;
int tmp17 = ((-1) ^ k) * k ^ 2 / 17;
lhs_data2[(d2-1) * 9 * 7 + (d1-1) + (d0-1) * 7] = tmp17;
// (-1)^k*k^2/17;

}
int size2 = 1;
for (int iter2 = 0 ; iter2 < ndim14; iter2++)
{
	size2 *= dim14[iter2];
}
Matrix *mat3 = createM(ndim14, dim14, 0);
writeM(mat3, size2, lhs_data2);
Matrix * mat4 = transposeM(mat3);
a = mat4;
printM(mat4);
fourier_script(mat4);
//matrices_97_c
int ndim15 = 2;
int dim15[2] = {7, 9};
a = zerosM(ndim15, dim15);
void *data3 = getdataM(a);
complex* lhs_data3 = (complex *)data3;

for (int k =  1; k <= 63; ++ k) {
int d2 = ceil((double) k / (9 * 7));
int tmp = k % (9 * 7);
if (tmp == 0) {
    tmp = 9 * 7;
}
int d0 = tmp % 9;
if (d0 == 0) {
    d0 = 9;
}
int d1 = (tmp - d0)/9 + 1;
complex tmp20 = ((-1) ^ k) * k - k / 17*I;
lhs_data3[(d2-1) * 9 * 7 + (d1-1) + (d0-1) * 7] = tmp20;
// (-1)^k*k-k/17i;

}
int size3 = 1;
for (int iter3 = 0 ; iter3 < ndim15; iter3++)
{
	size3 *= dim15[iter3];
}
Matrix *mat5 = createM(ndim15, dim15, 2);
writeM(mat5, size3, lhs_data3);
Matrix * mat6 = transposeM(mat5);
a = mat6;
printM(mat6);
fourier_script(mat6);
return 0;
}


// Subprograms

void fourier_script(Matrix * a) {
int ndim16 = 2;
int dim16[2] = {7,9};
printM(fftM(a));
int ndim17 = 2;
int dim17[2] = {7,9};
printM(ifftM(a));
}

void fourier_vec_script(Matrix * a) {

for (int i =  1; i <= 20; ++ i) {
int ndim18 = 2;
int dim18[2] = {7,9};
printM(fftM(a));
int ndim19 = 2;
int dim19[2] = {7,9};
printM(ifftM(a));

}
}