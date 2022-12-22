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


struct cell {
    int type;
    union {
        int ival;
        float fval;
        double dval;
        complex double cval;
        char chval[20];
    } data;
};
struct cell C[2];
C[0].type = 3;
strcpy(C[0].data.chval, "hello world");
C[1].type = 0;
C[1].data.ival = 1;


for (int iter1 = 0; iter1 < 2; iter1++) {
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
