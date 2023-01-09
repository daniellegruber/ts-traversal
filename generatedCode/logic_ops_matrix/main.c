//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Entry-point function
int main(void) {

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
input1[2] = 10*I;
input1[3] = 10.102;
input1[4] = 10.102 + 0.5*I;
input1[5] = -12*I;
input1[6] = -0.0002 - 0.1*I;
input1[7] = -100.01*I;
input1[8] = 81;
writeM( a, 9, input1);
free(input1);

printM(a);
Matrix * tmp1= notM(a);
printM(tmp1);
int ndim2= 2;
int dim2[2]= {3,3};
Matrix * tmp2= notM(zerosM(ndim2, dim2));
printM(tmp2);
int ndim3= 2;
int dim3[2]= {3,3};
Matrix * tmp3= notM(onesM(ndim3, dim3));
printM(tmp3);
int ndim4= 2;
int dim4= {3, 3};
Matrix * tmp4= notM(identityM(3));
printM(tmp4);
int ndim5= 2;
int dim5[2]= {3,3};
Matrix * tmp5= andM(a, zerosM(ndim5, dim5));
printM(tmp5);
int ndim6= 2;
int dim6= {3, 3};
Matrix * tmp6= notM(identityM(3));
Matrix * tmp7= andM(a, tmp6);
printM(tmp7);
int ndim7= 2;
int dim7[2]= {3,3};
int ndim8= 2;
int dim8[2]= {3,3};
Matrix * tmp8= notM(onesM(ndim8, dim8));
Matrix * tmp9= orM(zerosM(ndim7, dim7), tmp8);
printM(tmp9);
int ndim9= 2;
int dim9[2]= {3,3};
Matrix * tmp10= notM(onesM(ndim9, dim9));
int ndim10= 2;
int dim10= {3, 3};
Matrix * tmp11= orM(tmp10, identityM(3));
printM(tmp11);
return 0;
}
