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
	// trueTest
	int ndim1= 2;
	int dim1[2]= {3,3};
	Matrix * a= zerosM(ndim1, dim1);
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int d0_1 = iter1 % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (iter1 - d0_1)/3 + 1;
		int tmp1= iter1 * iter1;
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp1;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim1; iter2++)
	{
		size1 *= dim1[iter2];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp2= transposeM(mat1);
	a = tmp2;
	printM(a);
	Matrix * b= a;
	printM(b);
	Matrix * c= a;
	printM(c);
	Matrix * d= a;
	printM(d);
	Matrix * tmp3= equalM(a, b);
	Matrix * tmp4= equalM(a, c);
	Matrix * tmp5= andM((tmp3), (tmp4));
	Matrix * tmp6= equalM(a, d);
	Matrix * tmp7= andM(tmp5, (tmp6));
	printM(tmp7);
	// falseTest
	printM(a);
	printM(b);
	int ndim2= 2;
	int dim2[2]= {3,3};
	c = zerosM(ndim2, dim2);
	int* lhs_data2 = i_to_i(c);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int d0_2 = iter3 % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (iter3 - d0_2)/3 + 1;
		int tmp8= iter3 * iter3;
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp8;
	
	}
	int tmp9= 10;
	int* lhs_data3 = i_to_i(mat2);
	lhs_data3[3] = tmp9;
	int tmp10= 11;
	lhs_data3[6] = tmp10;
	int tmp11= 12;
	lhs_data3[7] = tmp11;
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim2; iter4++)
	{
		size2 *= dim2[iter4];
	}
	Matrix *mat2 = createM(ndim2, dim2, 0);
	writeM(mat2, size2, lhs_data2);
	mat2 = mat2;
	Matrix * tmp12= transposeM(mat3);
	c = tmp12;
	printM(c);
	int ndim3= 2;
	int dim3[2]= {3,3};
	d = zerosM(ndim3, dim3);
	int* lhs_data4 = i_to_i(d);
	for (int iter6 = 1; iter6 <= 9; ++ iter6) {
		int d0_6 = iter6 % 3;
		if (d0_6 == 0) {
			d0_6 = 3;
		}
		int d1_6 = (iter6 - d0_6)/3 + 1;
		int tmp13= iter6 * iter6;
		lhs_data4[(d1_6-1) + (d0_6-1) * 3] = tmp13;
	
	}
	int tmp14= 13;
	int* lhs_data5 = i_to_i(mat4);
	lhs_data5[1] = tmp14;
	int tmp15= 14;
	lhs_data5[2] = tmp15;
	int tmp16= 15;
	lhs_data5[5] = tmp16;
	// Write matrix mat4
	int size4 = 1;
	for (int iter7 = 0 ; iter7 < ndim3; iter7++)
	{
		size4 *= dim3[iter7];
	}
	Matrix *mat4 = createM(ndim3, dim3, 0);
	writeM(mat4, size4, lhs_data4);
	mat4 = mat4;
	Matrix * tmp17= transposeM(mat5);
	d = tmp17;
	printM(d);
	Matrix * tmp18= equalM(a, b);
	Matrix * tmp19= equalM(a, c);
	Matrix * tmp20= andM((tmp18), (tmp19));
	Matrix * tmp21= equalM(a, d);
	Matrix * tmp22= andM(tmp20, (tmp21));
	printM(tmp22);
	return 0;
}
