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
int dim1[2] = {8, 8};
Matrix * a = identityM(8);
int ndim2 = 2;
int dim2[2] = {4, 4};
Matrix * b = identityM(4);
int ndim3 = 2;
int dim3[2] = {1, 1};
Matrix * c = identityM(1);
printM(a);
printM(b);
printM(c);
return 0;
}
