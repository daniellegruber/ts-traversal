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
// trueTest
int ndim = 2;
int dim[2] = {3,3};
Matrix * a = zerosM(ndim, dim);
void *data = getdataM(a);
double* lhs_data = (double *)data;

int i;
for (i =  1; i <= 9; ++ i) {
int tmp2 = i * i;
lhs_data[i] = tmp2;

}
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp5 = createM(ndim, dim, DOUBLE);
writeM(tmp5, size, lhs_data);
printM(tmp5);
Matrix * tmp6 = transposeM(tmp5)
Matrix * tmp5 = tmp6;
printM(tmp5);
Matrix * b = tmp5;
printM(b);
Matrix * c = tmp5;
printM(c);
Matrix * d = tmp5;
printM(d);
Matrix * tmp13 = equalM(tmp5, b)
Matrix * tmp14 = equalM(tmp5, b)
Matrix * tmp15 = equalM(tmp5, c)
Matrix * tmp16 = equalM(tmp5, c)
Matrix * tmp17 = equalM(tmp5, b)
Matrix * tmp18 = equalM(tmp5, c)
Matrix * tmp20 = equalM(tmp5, b)
Matrix * tmp21 = equalM(tmp5, b)
Matrix * tmp22 = equalM(tmp5, c)
Matrix * tmp23 = equalM(tmp5, c)
Matrix * tmp24 = equalM(tmp5, b)
Matrix * tmp25 = equalM(tmp5, c)
Matrix * tmp26 = equalM(tmp5, d)
Matrix * tmp27 = equalM(tmp5, d)
Matrix * tmp29 = equalM(tmp5, b)
Matrix * tmp30 = equalM(tmp5, b)
Matrix * tmp31 = equalM(tmp5, c)
Matrix * tmp32 = equalM(tmp5, c)
Matrix * tmp33 = equalM(tmp5, b)
Matrix * tmp34 = equalM(tmp5, c)
Matrix * tmp35 = equalM(tmp5, d)
Matrix * tmp38 = equalM(tmp5, b)
Matrix * tmp39 = equalM(tmp5, b)
Matrix * tmp40 = equalM(tmp5, c)
Matrix * tmp41 = equalM(tmp5, c)
Matrix * tmp42 = equalM(tmp5, b)
Matrix * tmp43 = equalM(tmp5, c)
Matrix * tmp45 = equalM(tmp5, b)
Matrix * tmp46 = equalM(tmp5, b)
Matrix * tmp47 = equalM(tmp5, c)
Matrix * tmp48 = equalM(tmp5, c)
Matrix * tmp49 = equalM(tmp5, b)
Matrix * tmp50 = equalM(tmp5, c)
Matrix * tmp51 = equalM(tmp5, d)
Matrix * tmp52 = equalM(tmp5, d)
Matrix * tmp54 = equalM(tmp5, b)
Matrix * tmp55 = equalM(tmp5, b)
Matrix * tmp56 = equalM(tmp5, c)
Matrix * tmp57 = equalM(tmp5, c)
Matrix * tmp58 = equalM(tmp5, b)
Matrix * tmp59 = equalM(tmp5, c)
Matrix * tmp60 = equalM(tmp5, d)
printf("\n%d", (tmp58) & (tmp59) & (tmp60));
// falseTest
printM(tmp5);
printM(b);
int ndim = 2;
int dim[2] = {3,3};
c = zerosM(ndim, dim);
void *data = getdataM(c);
double* lhs_data = (double *)data;

int i;
for (i =  1; i <= 9; ++ i) {
int tmp65 = i * i;
lhs_data[i] = tmp65;

}
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp68 = createM(ndim, dim, DOUBLE);
writeM(tmp68, size, lhs_data);
printM(tmp68);
int tmp69 = 10;
void *data = getdataM(c);
double* lhs_data = (double *)data;
lhs_data[2] = tmp69;
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp70 = createM(ndim, dim, DOUBLE);
writeM(tmp70, size, lhs_data);
printM(tmp70);
int tmp71 = 11;
void *data = getdataM(c);
double* lhs_data = (double *)data;
lhs_data[3] = tmp71;
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp72 = createM(ndim, dim, DOUBLE);
writeM(tmp72, size, lhs_data);
printM(tmp72);
int tmp73 = 12;
void *data = getdataM(c);
double* lhs_data = (double *)data;
lhs_data[6] = tmp73;
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp74 = createM(ndim, dim, DOUBLE);
writeM(tmp74, size, lhs_data);
printM(tmp74);
Matrix * tmp75 = transposeM(tmp68)
Matrix * tmp68 = tmp75;
printM(tmp68);
int ndim = 2;
int dim[2] = {3,3};
d = zerosM(ndim, dim);
void *data = getdataM(d);
double* lhs_data = (double *)data;

int i;
for (i =  1; i <= 9; ++ i) {
int tmp78 = i * i;
lhs_data[i] = tmp78;

}
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp81 = createM(ndim, dim, DOUBLE);
writeM(tmp81, size, lhs_data);
printM(tmp81);
int tmp82 = 13;
void *data = getdataM(d);
double* lhs_data = (double *)data;
lhs_data[4] = tmp82;
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp83 = createM(ndim, dim, DOUBLE);
writeM(tmp83, size, lhs_data);
printM(tmp83);
int tmp84 = 14;
void *data = getdataM(d);
double* lhs_data = (double *)data;
lhs_data[7] = tmp84;
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp85 = createM(ndim, dim, DOUBLE);
writeM(tmp85, size, lhs_data);
printM(tmp85);
int tmp86 = 15;
void *data = getdataM(d);
double* lhs_data = (double *)data;
lhs_data[8] = tmp86;
int size = 1;
for (int i = 0 ; i < ndim ; i++)
{
	size *= dim[i];
}
Matrix *tmp87 = createM(ndim, dim, DOUBLE);
writeM(tmp87, size, lhs_data);
printM(tmp87);
Matrix * tmp88 = transposeM(tmp81)
Matrix * tmp81 = tmp88;
printM(tmp81);
Matrix * tmp92 = equalM(tmp5, b)
Matrix * tmp93 = equalM(tmp5, b)
Matrix * tmp94 = equalM(tmp5, tmp68)
Matrix * tmp95 = equalM(tmp5, tmp68)
Matrix * tmp96 = equalM(tmp5, b)
Matrix * tmp97 = equalM(tmp5, tmp68)
Matrix * tmp99 = equalM(tmp5, b)
Matrix * tmp100 = equalM(tmp5, b)
Matrix * tmp101 = equalM(tmp5, tmp68)
Matrix * tmp102 = equalM(tmp5, tmp68)
Matrix * tmp103 = equalM(tmp5, b)
Matrix * tmp104 = equalM(tmp5, tmp68)
Matrix * tmp105 = equalM(tmp5, tmp81)
Matrix * tmp106 = equalM(tmp5, tmp81)
Matrix * tmp108 = equalM(tmp5, b)
Matrix * tmp109 = equalM(tmp5, b)
Matrix * tmp110 = equalM(tmp5, tmp68)
Matrix * tmp111 = equalM(tmp5, tmp68)
Matrix * tmp112 = equalM(tmp5, b)
Matrix * tmp113 = equalM(tmp5, tmp68)
Matrix * tmp114 = equalM(tmp5, tmp81)
Matrix * tmp117 = equalM(tmp5, b)
Matrix * tmp118 = equalM(tmp5, b)
Matrix * tmp119 = equalM(tmp5, tmp68)
Matrix * tmp120 = equalM(tmp5, tmp68)
Matrix * tmp121 = equalM(tmp5, b)
Matrix * tmp122 = equalM(tmp5, tmp68)
Matrix * tmp124 = equalM(tmp5, b)
Matrix * tmp125 = equalM(tmp5, b)
Matrix * tmp126 = equalM(tmp5, tmp68)
Matrix * tmp127 = equalM(tmp5, tmp68)
Matrix * tmp128 = equalM(tmp5, b)
Matrix * tmp129 = equalM(tmp5, tmp68)
Matrix * tmp130 = equalM(tmp5, tmp81)
Matrix * tmp131 = equalM(tmp5, tmp81)
Matrix * tmp133 = equalM(tmp5, b)
Matrix * tmp134 = equalM(tmp5, b)
Matrix * tmp135 = equalM(tmp5, tmp68)
Matrix * tmp136 = equalM(tmp5, tmp68)
Matrix * tmp137 = equalM(tmp5, b)
Matrix * tmp138 = equalM(tmp5, tmp68)
Matrix * tmp139 = equalM(tmp5, tmp81)
printf("\n%d", (tmp137) & (tmp138) & (tmp139));
return 0;
}
