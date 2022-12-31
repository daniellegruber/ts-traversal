//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Entry-point function
int main(void) {


int ndim1 = 2;
int dim1[2] = {1,3};
Matrix * A = createM(ndim1, dim1, 0);
int *input1 = NULL;
input1 = malloc( 3*sizeof(*input1));
input1[0] = 1;
input1[1] = 2;
input1[2] = 3;
writeM( A, 3, input1);
free(input1);

int tmp1;
indexM(A, &tmp1, 1, 1);
tmp1;
//A(1:end)
return 0;
}
