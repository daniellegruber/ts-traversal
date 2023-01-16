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
	//ldivide_test1
	
	int ndim1 = 2;
	int dim1[2] = {2,2};
	Matrix * a = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 4*sizeof(*input1));
	input1[0] = 1;
	input1[1] = 4;
	input1[2] = 9;
	input1[3] = 16;
	writeM( a, 4, input1);
	free(input1);
	
	
	int ndim2 = 2;
	int dim2[2] = {2,2};
	Matrix * b = createM(ndim2, dim2, 1);
	double *input2 = NULL;
	input2 = malloc( 4*sizeof(*input2));
	input2[0] = 2.1 + 0.5 * i;
	input2[1] = 0;
	input2[2] = 0;
	input2[3] = 2.1 + 0.5 * i;
	writeM( b, 4, input2);
	free(input2);
	
	Matrix * tmp1= mldivideM(a, b);
	Matrix * c= tmp1;
	printM(a);
	printM(b);
	printM(tmp1);
	//ldivide_test2
	int ndim3= 2;
	int dim3= {2, 2};
	Matrix * a= identityM(2);
	
	int ndim4 = 2;
	int dim4[2] = {2,2};
	b = createM(ndim4, dim4, 1);
	double *input3 = NULL;
	input3 = malloc( 4*sizeof(*input3));
	input3[0] = 2.1 + 0.5 * i;
	input3[1] = 0;
	input3[2] = 0;
	input3[3] = 2.1 + 0.5 * i;
	writeM( b, 4, input3);
	free(input3);
	
	Matrix * tmp2= mldivideM(a, b);
	c = tmp2;
	printM(a);
	printM(b);
	printM(tmp2);
	//ldivide_test3
	
	int ndim5 = 2;
	int dim5[2] = {2,2};
	a = createM(ndim5, dim5, 1);
	double *input4 = NULL;
	input4 = malloc( 4*sizeof(*input4));
	input4[0] = 2.1 + 0.5 * i;
	input4[1] = 0;
	input4[2] = 0;
	input4[3] = 2.1 + 0.5 * i;
	writeM( a, 4, input4);
	free(input4);
	
	
	int ndim6 = 2;
	int dim6[2] = {2,2};
	b = createM(ndim6, dim6, 1);
	double *input5 = NULL;
	input5 = malloc( 4*sizeof(*input5));
	input5[0] = 2.1 + 0.5 * i;
	input5[1] = 0;
	input5[2] = 0;
	input5[3] = 2.1 + 0.5 * i;
	writeM( b, 4, input5);
	free(input5);
	
	Matrix * tmp3= mldivideM(a, b);
	c = tmp3;
	printM(a);
	printM(b);
	printM(tmp3);
	//rdivide_test1
	
	int ndim7 = 2;
	int dim7[2] = {2,2};
	a = createM(ndim7, dim7, 0);
	int *input6 = NULL;
	input6 = malloc( 4*sizeof(*input6));
	input6[0] = 1;
	input6[1] = 4;
	input6[2] = 9;
	input6[3] = 16;
	writeM( a, 4, input6);
	free(input6);
	
	
	int ndim8 = 2;
	int dim8[2] = {2,2};
	b = createM(ndim8, dim8, 1);
	double *input7 = NULL;
	input7 = malloc( 4*sizeof(*input7));
	input7[0] = 2.1 + 0.5 * i;
	input7[1] = 0;
	input7[2] = 0;
	input7[3] = 2.1 + 0.5 * i;
	writeM( b, 4, input7);
	free(input7);
	
	Matrix * tmp4= mrdivideM(a, b);
	c = tmp4;
	printM(a);
	printM(b);
	printM(tmp4);
	//rdivide_test2
	int ndim9= 2;
	int dim9= {2, 2};
	Matrix * a= identityM(2);
	
	int ndim10 = 2;
	int dim10[2] = {2,2};
	b = createM(ndim10, dim10, 1);
	double *input8 = NULL;
	input8 = malloc( 4*sizeof(*input8));
	input8[0] = 2.1 + 0.5 * i;
	input8[1] = 0;
	input8[2] = 0;
	input8[3] = 2.1 + 0.5 * i;
	writeM( b, 4, input8);
	free(input8);
	
	Matrix * tmp5= mrdivideM(a, b);
	c = tmp5;
	printM(a);
	printM(b);
	printM(tmp5);
	//rdivide_test3
	
	int ndim11 = 2;
	int dim11[2] = {2,2};
	a = createM(ndim11, dim11, 1);
	double *input9 = NULL;
	input9 = malloc( 4*sizeof(*input9));
	input9[0] = 2.1 + 0.5 * i;
	input9[1] = 0;
	input9[2] = 0;
	input9[3] = 2.1 + 0.5 * i;
	writeM( a, 4, input9);
	free(input9);
	
	
	int ndim12 = 2;
	int dim12[2] = {2,2};
	b = createM(ndim12, dim12, 1);
	double *input10 = NULL;
	input10 = malloc( 4*sizeof(*input10));
	input10[0] = 2.1 + 0.5 * i;
	input10[1] = 0;
	input10[2] = 0;
	input10[3] = 2.1 + 0.5 * i;
	writeM( b, 4, input10);
	free(input10);
	
	Matrix * tmp6= mrdivideM(a, b);
	c = tmp6;
	printM(a);
	printM(b);
	printM(tmp6);
	//divide_by_zero
	int ndim13= 2;
	int dim13[2]= {2,2};
	a = zerosM(ndim13, dim13);
	
	int ndim14 = 2;
	int dim14[2] = {2,2};
	b = createM(ndim14, dim14, 1);
	double *input11 = NULL;
	input11 = malloc( 4*sizeof(*input11));
	input11[0] = 2.1 + 0.5 * i;
	input11[1] = 0;
	input11[2] = 0;
	input11[3] = 2.1 + 0.5 * i;
	writeM( b, 4, input11);
	free(input11);
	
	Matrix * tmp7= mrdivideM(b, a);
	c = tmp7;
	printM(a);
	printM(b);
	return 0;
}
