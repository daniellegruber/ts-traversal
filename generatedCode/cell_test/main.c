//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include <main.h>

// Entry-point function
int main(void) {

// Structure for cell arrays
struct cell {
    int type;
    union {
        int ival;
        double dval;
        complex double cval;
        char chval[20];
    } data;
};
int A = 1;

int ndim1 = 2;
int dim1[2] = {1,2};
Matrix * B = createM(ndim1, dim1, 2);
complex *input1 = NULL;
input1 = malloc( 2*sizeof(*input1));
input1[0] = 2.0;
input1[1] = 3 + 5*I;
writeM( B, 2, input1);
free(input1);

struct cell C[3];
C[0].type = 3;
strcpy(C[0].data.chval, "hello world");
C[1].type = 0;
C[1].data.ival = 1;
C[2].type = 1;
C[2].data.dval = 2.0;


for (int iter1 = 0; iter1 < 3; iter1++) {
    switch(C[iter1].type) {
        case 0:
        printf("%d\n", C[iter1].data.ival);
        break;
        
        case 1:
        printf("%f\n", C[iter1].data.dval);
        break;
        
        case 2:
        printf("%f\n", C[iter1].data.cval);
        break;
        
        case 3:
        printf("%s\n", C[iter1].data.chval);
        break;
    }
}

return 0;
}
