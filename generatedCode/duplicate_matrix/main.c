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
int dim1[2] = {3,3};
Matrix * a = createM(ndim1, dim1, 2);
complex *input1 = NULL;
input1 = malloc( 9*sizeof(*input1));
input1[0] = 0;
input1[1] = 10;
input1[2] = 10i;
input1[3] = 10.102;
input1[4] = 10.102+0.5i;
input1[5] = -12i;
input1[6] = -0.0002-0.1i;
input1[7] = -100.01i;
input1[8] = 81;
writeM( a, 9, input1);
free(input1);

printM(a);
Matrix * b = a;
printM(b);
Matrix * c = a;
printM(c);
return 0;
}
