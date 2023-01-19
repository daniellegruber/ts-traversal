//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "./main.h"

// Entry-point function
int main(void) {

	//more off
	//format short
	//source octaveIncludes.m;
	int ndim1= 2;
	int dim1[2]= {3,3};
	Matrix * tmp1= onesM(ndim1, dim1);
	printM(tmp1);
	int ndim2= 2;
	int dim2[2]= {3,3};
	Matrix * a= zerosM(ndim2, dim2);
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int d0_1 = iter1 % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (iter1 - d0_1)/3 + 1;
		int tmp2= iter1;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp2;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size1 *= dim2[iter2];
	}
	Matrix *mat1 = createM(ndim2, dim2, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp3= transposeM(mat1);
	a = tmp3;
	printM(a);
	int ndim3= 2;
	int dim3[2]= {3,3};
	Matrix * b= zerosM(ndim3, dim3);
	complex* lhs_data2 = c_to_c(b);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int d0_2 = iter3 % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (iter3 - d0_2)/3 + 1;
		complex tmp4= iter3 + iter3 * 1*I;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp4;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim3; iter4++)
	{
		size2 *= dim3[iter4];
	}
	Matrix *mat2 = createM(ndim3, dim3, 2);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp5= transposeM(mat2);
	b = tmp5;
	printM(b);
	int ndim4= 2;
	int dim4[2]= {3,3};
	int scalar1= 2;
	Matrix * tmp6= scaleM(onesM(ndim4, dim4), &scalar1, 0);
	printM(tmp6);
	int ndim5= 2;
	int dim5[2]= {3,3};
	double scalar2= 2.1;
	Matrix * tmp7= scaleM(onesM(ndim5, dim5), &scalar2, 1);
	printM(tmp7);
	int ndim6= 2;
	int dim6[2]= {3,3};
	complex scalar3= (2.1 + 1*I);
	Matrix * tmp8= scaleM(onesM(ndim6, dim6), &scalar3, 2);
	printM(tmp8);
	int scalar4= 2;
	Matrix * tmp9= scaleM(a, &scalar4, 0);
	printM(tmp9);
	double scalar5= 2.1;
	Matrix * tmp10= scaleM(a, &scalar5, 1);
	printM(tmp10);
	complex scalar6= (2.1 + 1*I);
	Matrix * tmp11= scaleM(a, &scalar6, 2);
	printM(tmp11);
	int scalar7= 2;
	Matrix * tmp12= scaleM(b, &scalar7, 2);
	printM(tmp12);
	double scalar8= 2.1;
	Matrix * tmp13= scaleM(b, &scalar8, 2);
	printM(tmp13);
	complex scalar9= (2.1 + 1*I);
	Matrix * tmp14= scaleM(b, &scalar9, 2);
	printM(tmp14);
	int ndim7= 2;
	int dim7[2]= {3,3};
	int scalar10= 2 * INT_MAX;
	Matrix * tmp15= scaleM(onesM(ndim7, dim7), &scalar10, 0);
	printM(tmp15);
	int ndim8= 2;
	int dim8[2]= {3,3};
	int scalar11= 2 * INT_MIN;
	Matrix * tmp16= scaleM(onesM(ndim8, dim8), &scalar11, 0);
	printM(tmp16);
	return 0;
}
