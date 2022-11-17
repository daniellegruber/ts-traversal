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
void *data1 = getdataM(a);
int* lhs_data1 = (int *)data1;

for (int k =  1; k <= 5; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
int tmp2 = counter;
lhs_data1[(k-1) * 2 * 3 + (j-1) + (i-1) * 3] = tmp2;
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
printM(a);

for (int k =  1; k <= 5; ++ k) {

for (int j =  1; j <= 3; ++ j) {

for (int i =  1; i <= 2; ++ i) {
int tmp4;
indexM(a, &tmp4, 3, i, j, k);
printf("\n%d", tmp4);

}

}

}
return 0;
}
