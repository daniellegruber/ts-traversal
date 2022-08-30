//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>

// Entry-point function
int main(void)
{

sortM(A,1);
sortM(A,0);
Matrix * B = zerosM(2,{2, 2});

void *data = getdataM(C);
Matrix * tmp4 = zerosM(1,{3});
void *data2 = getdataM(tmp4);
memcpy(&data[1], data2[0]);
C.data = data;

bool* restrict h;
double* restrict pval;
double* restrict * ci;
double* restrict tstat;
double* restrict df;
double* restrict sd;
ttestM(x,0,h,pval,ci,tstat,df,sd);

int ndim = 2;
int dim = {2,3};
Matrix * A = createM(ndim, dim, 0);
double int *input = NULL;
input = malloc( 6*sizeof(*input));
input[0] = 1;
input[1] = 2;
input[2] = 3;
input[3] = 4;
input[4] = 5;
input[5] = 6;
writeM( A, 6, input);
free(input);


void *data = getdataM(A);

int ndim = 2;
int dim = {2,2};
Matrix * tmp7 = createM(ndim, dim, 0);
double int *input = NULL;
input = malloc( 4*sizeof(*input));
input[0] = 1;
input[1] = 2;
input[2] = 3;
input[3] = 4;
writeM( tmp7, 4, input);
free(input);

void *data2 = getdataM(tmp7);
memcpy(&data[1], data2[0]);
memcpy(&data[3], data2[1]);
memcpy(&data[2], data2[2]);
memcpy(&data[4], data2[3]);
A.data = data;

int a = strcmp('hello','world');

int b = getsizeM(A);

int * c = getDimsM(A);

Matrix * M = maxM(A);

int* restrict I;
M = maxV(A,I)

return 0;
}
