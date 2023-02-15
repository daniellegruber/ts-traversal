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
	Matrix * tmp2= zerosM(ndim2, dim2);
	Matrix * a= tmp2;
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int d0_1 = iter1 % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (iter1 - d0_1)/3 + 1;
		int tmp3= iter1;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp3;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim2; iter2++)
	{
		size1 *= dim2[iter2];
	}
	Matrix *mat1 = createM(ndim2, dim2, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp4= transposeM(mat1);
	a = tmp4;
	printM(a);
	int ndim3= 2;
	int dim3[2]= {3,3};
	Matrix * tmp5= zerosM(ndim3, dim3);
	Matrix * b= tmp5;
	complex* lhs_data2 = c_to_c(b);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int d0_2 = iter3 % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (iter3 - d0_2)/3 + 1;
		complex tmp6= iter3 + iter3 * 1*I;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp6;
	
	}
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim3; iter4++)
	{
		size2 *= dim3[iter4];
	}
	Matrix *mat2 = createM(ndim3, dim3, 2);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp7= transposeM(mat2);
	b = tmp7;
	printM(b);
	int ndim4= 2;
	int dim4[2]= {3,3};
	Matrix * tmp8= onesM(ndim4, dim4);
	int scalar1= 2;
	Matrix * tmp9= scaleM(tmp8, &scalar1, 0);
	printM(tmp9);
	int ndim5= 2;
	int dim5[2]= {3,3};
	Matrix * tmp10= onesM(ndim5, dim5);
	double scalar2= 2.1;
	Matrix * tmp11= scaleM(tmp10, &scalar2, 1);
	printM(tmp11);
	int ndim6= 2;
	int dim6[2]= {3,3};
	Matrix * tmp12= onesM(ndim6, dim6);
	complex scalar3= (2.1 + 1*I);
	Matrix * tmp13= scaleM(tmp12, &scalar3, 2);
	printM(tmp13);
	int scalar4= 2;
	Matrix * tmp14= scaleM(a, &scalar4, 0);
	printM(tmp14);
	double scalar5= 2.1;
	Matrix * tmp15= scaleM(a, &scalar5, 1);
	printM(tmp15);
	complex scalar6= (2.1 + 1*I);
	Matrix * tmp16= scaleM(a, &scalar6, 2);
	printM(tmp16);
	int scalar7= 2;
	Matrix * tmp17= scaleM(b, &scalar7, 2);
	printM(tmp17);
	double scalar8= 2.1;
	Matrix * tmp18= scaleM(b, &scalar8, 2);
	printM(tmp18);
	complex scalar9= (2.1 + 1*I);
	Matrix * tmp19= scaleM(b, &scalar9, 2);
	printM(tmp19);
	int ndim7= 2;
	int dim7[2]= {3,3};
	Matrix * tmp20= onesM(ndim7, dim7);
	int scalar10= 2 * INT_MAX;
	Matrix * tmp21= scaleM(tmp20, &scalar10, 0);
	printM(tmp21);
	int ndim8= 2;
	int dim8[2]= {3,3};
	Matrix * tmp22= onesM(ndim8, dim8);
	int scalar11= 2 * INT_MIN;
	Matrix * tmp23= scaleM(tmp22, &scalar11, 0);
	printM(tmp23);
	return 0;
}
