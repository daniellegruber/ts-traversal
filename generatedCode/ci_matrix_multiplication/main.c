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
int dim[2] = {2,2};
Matrix * a = createM(ndim, dim, 0);
int *tmp1 = NULL;
tmp1 = malloc( 4*sizeof(*tmp1));
tmp1[0] = 1;
tmp1[1] = 4;
tmp1[2] = 9;
tmp1[3] = 16;
writeM( a, 4, tmp1);
free(tmp1);


ndim = 2;
dim[2] = {2,2};
Matrix * b = createM(ndim, dim, 2);
complex *tmp2 = NULL;
tmp2 = malloc( 4*sizeof(*tmp2));
tmp2[0] = 2.1+0.5i;
tmp2[1] = 0;
tmp2[2] = 0;
tmp2[3] = 2.1+0.5i;
writeM( b, 4, tmp2);
free(tmp2);

Matrix * tmp3 = mtimesM(b, a)
Matrix * c = tmp3;
printM(a);
printM(b);
printM(c);
return 0;
}
