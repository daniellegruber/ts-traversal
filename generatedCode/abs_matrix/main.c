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

int ndim = 2;
int dim = {3,3};
Matrix * a = createM(ndim, dim, 2);
double complex *input = NULL;
input = malloc( 9*sizeof(*input));
input[0] = 0;
input[1] = 10;
input[2] = 10i;
input[3] = 10.102;
input[4] = 10.102+0.5i;
input[5] = -12i;
input[6] = -0.0002-0.1i;
input[7] = -100.01i;
input[8] = 81;
writeM( a, 9, input);
free(input);

Matrix * b = absM(a);
printM(a);
printM(b);
//complexDisp(a);
//doubleDisp(b);
return 0;
}
