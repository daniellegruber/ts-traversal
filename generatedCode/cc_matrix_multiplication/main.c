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

int ndim1 = 2;
int dim1[2] = {2,2};
Matrix * a = createM(ndim1, dim1, 2);
complex *input1 = NULL;
input1 = malloc( 4*sizeof(*input1));
input1[0] = 1+1i;
input1[1] = 0.4i;
input1[2] = 9-0.5i;
input1[3] = 16;
writeM( a, 4, input1);
free(input1);


int ndim2 = 2;
int dim2[2] = {2,2};
Matrix * b = createM(ndim2, dim2, 2);
complex *input2 = NULL;
input2 = malloc( 4*sizeof(*input2));
input2[0] = 2;
input2[1] = 0;
input2[2] = 0;
input2[3] = 1i;
writeM( b, 4, input2);
free(input2);

Matrix * mat1 = mtimesM(a, b);
Matrix * c = mat1;
printM(a);
printM(b);
printM(mat1);
return 0;
}