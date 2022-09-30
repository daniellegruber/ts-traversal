//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <main.h>

// Entry-point function
int main(void)
{

more;
off;
format;
short;
source;
octaveIncludes.m;
a = zerosM(3, {2, 3, 5});
int counter = 0;
// Methods 1 and 2 to create & assign values to the matrices are equivalent
// Method 1 to create 3D matrix

int k;
for (k =  1; k <= 5; ++ k) {

int j;
for (j =  1; j <= 3; ++ j) {

int i;
for (i =  1; i <= 2; ++ i) {
float tmp4 = counter * counter + 0.5;
void *data = getdataM(a);
memcpy(&data[(k-1) * 2 * 3 + (j-1) * 2 + (i - 1)], tmp4);
a.data = data;
//counter++;
counter = counter + 1;

}

}

}

null
// Method 2 to create 3D matrix
// for i=1:30
// 	a(i) = counter*counter + 0.5;
// 	counter++;
// end

int i;
for (i =  1; i <= 30; ++ i) {
double tmp11;
indexM(a, &tmp11, i);
double tmp12;
indexM(a, &tmp12, i);
double tmp13;
indexM(a, &tmp13, i);
double tmp14;
indexM(disp, &tmp14, tmp13);
tmp14;

}

null
double tmp15;
indexM(printf, &tmp15, "\n");
tmp15;
// Note that it iterates over j then i then k, since Octave matrices are stored column-major

int j;
for (j =  1; j <= 3; ++ j) {

int i;
for (i =  1; i <= 2; ++ i) {

int k;
for (k =  1; k <= 5; ++ k) {
double tmp16;
indexM(a, &tmp16, i, j, k);
double tmp17;
indexM(a, &tmp17, i, j, k);
double tmp18;
indexM(a, &tmp18, i, j, k);
double tmp19;
indexM(disp, &tmp19, tmp18);
tmp19;

}

}

}

null
return 0;
}
