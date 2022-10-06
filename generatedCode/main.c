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
int ndim = 3;
int dim[3] = {2, 3, 5};
Matrix * a = zerosM(ndim, dim);
int counter = 0;
// Methods 1 and 2 to create & assign values to the matrices are equivalent
// Method 1 to create 3D matrix
void *data = getdataM(a);

int k;
for (k =  1; k <= 5; ++ k) {

int j;
for (j =  1; j <= 3; ++ j) {

int i;
for (i =  1; i <= 2; ++ i) {
float tmp4 = counter * counter + 0.5;
memcpy(&data[(k-1) * 2 * 3 + (j-1) * 2 + (i - 1)], &tmp4, 1);
a.data = data;
//counter++;
counter = counter + 1;

}

}

}
// Method 2 to create 3D matrix
// for i=1:30
// 	a(i) = counter*counter + 0.5;
// 	counter++;
// end

int i;
for (i =  1; i <= 30; ++ i) {
double tmp11;
indexM(a, &tmp11, i);
printf("%d", tmp11);

}
//printf("\n");
// Note that it iterates over j then i then k, since Octave matrices are stored column-major

int j;
for (j =  1; j <= 3; ++ j) {

int i;
for (i =  1; i <= 2; ++ i) {

int k;
for (k =  1; k <= 5; ++ k) {
double tmp14;
indexM(a, &tmp14, i, j, k);
printf("%d", tmp14);

}

}

}
return 0;
}
