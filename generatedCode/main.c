//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <general_test.h>
#include <general_test.h>
#include <myfun3.h>

// Function declarations
void myfun1(unknown f, unknown g, unknown* p_F, unknown* p_G);
unknown myfun2(void);

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


int ndim = 2;
int dim = {4,3};
Matrix * B = createM(ndim, dim, 1);
double float *input = NULL;
input = malloc( 12*sizeof(*input));
input[0] = A;
input[1] = A;
writeM( B, 12, input);
free(input);

undefined;

Matrix * tmp1 = mtimesM(B, A)
Matrix * C = tmp1;

Matrix * tmp2 = scaleM(3, C, 1)
Matrix * C_scaled = tmp2;

float a = 2.5;

bool c = a < b;

complex d = 1 + 3.444*I;


int ndim = 2;
int dim = {1,2};
Matrix * D = createM(ndim, dim, 3);
double char *input = NULL;
input = malloc( 2*sizeof(*input));
input[0][] = "hello";
input[1][] = "world";
writeM( D, 2, input);
free(input);

undefined;

Matrix * tmp5 = ctransposeM(D)
Matrix * E = tmp5;

unknown * restrict F;
unknown * restrict G;
myfun1(1, 2, F, G);


struct cell0 {
char f0[2];
int f1;
}

cell0 H;
strcpy(H.f0, "hello");
H.f1 = 1;

undefined;

double tmp6;
indexM(A, &tmp6, {1, 2}, {1, 2, 3});
tmp6;

// This is a comment


if (a)
{
b;
}
else if (c)
{
d;
}
else
{
f;
}
Matrix * myarr = zerosM(2, {2, 3});

unknown * restrict F;
unknown * restrict G;
myfun1(f, g, F, G);

unknown b = myfun3(a);




int ndim = 2;
int dim = {1,3};
Matrix * i = createM(ndim, dim, 0);
double int *input = NULL;
input = malloc( 3*sizeof(*input));
input[0] = 2;
input[1] = 7;
input[2] = 9;
writeM( i, 3, input);
free(input);


int tmp9;
for (tmp9 = 1; tmp9 <= 3; ++tmp9) {
indexM(tmp8, &i, tmp8 -> ndim=1, tmp9);
a;
}
unknown F = f + g;
unknown G = f - g;
return 0;
}


// Subprograms

void myfun1(unknown f, unknown g, unknown* p_F, unknown* p_G)
{
*p_F = F;
*p_G = G;





int i;
for (i =  1; i <= 5; i += 2) {
a;
}
}

unknown myfun2(void);
{
char * outstr = "hello world";


}