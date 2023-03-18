//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "./main.h"
#include "./myfun3.h"

// Function declarations
void myfun1(int f, int g, int* p_F, int* p_G);
void myfun2(void);

// Entry-point function
int main(void) {

	int F1;
	int G1;
	myfun1(1, 2, &F1, &G1);
	int b = myfun3(4);
	printf("\n%d\n", b);
	return 0;
}


// Subprograms

void myfun1(int f, int g, int* p_F, int* p_G) {
	int F = f + g;
	int G = f - g;
	for (int i = 1; i <= 5; i += 2) {
		printf("\n%d\n", i);
	
	}
	*p_F = F;
	*p_G = G;
}

void myfun2(void) {
	char outstr[13] = "hello world";
}