//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <main.h>

// Function declarations
void myfun1(int f, int g, int* p_F, int* p_G);

// Entry-point function
int main(void)
{


int ndim = 2;
int dim = {2,3};
Matrix * A = createM(ndim, dim, 1);
double float *input = NULL;
input = malloc( 6*sizeof(*input));
input[0] = 1;
input[1] = 2.1;
input[2] = 1;
input[3] = 3;
input[4] = 4;
input[5] = 1;
writeM( A, 6, input);
free(input);

undefined;
Matrix * tmp1 = ctransposeM(A)
Matrix * A_transposed = tmp1;
Matrix * tmp2 = mtimesM(A, A_transposed)
Matrix * B = tmp2;
Matrix * tmp3 = scaleM(3, B, 1)
Matrix * B_scaled = tmp3;
int F;
int G;
myfun1(1, 2, &F, &G);
return 0;
}


// Subprograms

void myfun1(int f, int g, int* p_F, int* p_G)
{
F = f + g
G = f - g
*p_F = F;
*p_G = G;
}