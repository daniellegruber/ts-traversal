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
	//int_test
	int exponent= 3;
	int ndim1= 2;
	int dim1[2]= {3,3};
	Matrix * a= zerosM(ndim1, dim1);
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 9; ++ iter1) {
		int tmp1= pow((-1), (iter1 + 1));
		int d0_1 = iter1 % 3;
		if (d0_1 == 0) {
			d0_1 = 3;
		}
		int d1_1 = (iter1 - d0_1)/3 + 1;
		int tmp3= pow((-1), (iter1 + 1));
		int tmp2= (tmp3) * (iter1 - 1);
		lhs_data1[(d1_1-1) + (d0_1-1) * 3] = tmp2;
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter2 = 0 ; iter2 < ndim1; iter2++)
	{
		size1 *= dim1[iter2];
	}
	Matrix *mat1 = createM(ndim1, dim1, 0);
	writeM(mat1, size1, lhs_data1);
	Matrix * tmp4= transposeM(mat1);
	a = tmp4;
	printM(a);
	Matrix * tmp5= sinM(a);
	printM(tmp5);
	Matrix * tmp6= sindM(a);
	printM(tmp6);
	Matrix * tmp7= cosM(a);
	printM(tmp7);
	Matrix * tmp8= cosdM(a);
	printM(tmp8);
	Matrix * tmp9= tanM(a);
	printM(tmp9);
	Matrix * tmp10= tandM(a);
	printM(tmp10);
	//double_test
	int ndim2= 2;
	int dim2[2]= {3,3};
	a = zerosM(ndim2, dim2);
	double* lhs_data2 = i_to_d(a);
	for (int iter3 = 1; iter3 <= 9; ++ iter3) {
		int tmp11= pow((-1), (iter3 + 1));
		int d0_2 = iter3 % 3;
		if (d0_2 == 0) {
			d0_2 = 3;
		}
		int d1_2 = (iter3 - d0_2)/3 + 1;
		int tmp13= pow((-1), (iter3 + 1));
		double tmp12= (tmp13) * (iter3 + 0.4);
		lhs_data2[(d1_2-1) + (d0_2-1) * 3] = tmp12;
	
	}
	mat1 = mat1;
	// Write matrix mat2
	int size2 = 1;
	for (int iter4 = 0 ; iter4 < ndim2; iter4++)
	{
		size2 *= dim2[iter4];
	}
	Matrix *mat2 = createM(ndim2, dim2, 1);
	writeM(mat2, size2, lhs_data2);
	Matrix * tmp14= transposeM(mat2);
	a = tmp14;
	printM(a);
	Matrix * tmp15= sinM(a);
	printM(tmp15);
	Matrix * tmp16= sindM(a);
	printM(tmp16);
	Matrix * tmp17= cosM(a);
	printM(tmp17);
	Matrix * tmp18= cosdM(a);
	printM(tmp18);
	Matrix * tmp19= tanM(a);
	printM(tmp19);
	Matrix * tmp20= tandM(a);
	printM(tmp20);
	//complex_test
	exponent = 1.2;
	int ndim3= 2;
	int dim3[2]= {3,3};
	a = zerosM(ndim3, dim3);
	complex* lhs_data3 = i_to_c(a);
	for (int iter5 = 1; iter5 <= 9; ++ iter5) {
		int d0_3 = iter5 % 3;
		if (d0_3 == 0) {
			d0_3 = 3;
		}
		int d1_3 = (iter5 - d0_3)/3 + 1;
		complex tmp21= iter5 + 0.5*I;
		lhs_data3[(d1_3-1) + (d0_3-1) * 3] = tmp21;
	
	}
	mat2 = mat2;
	// Write matrix mat3
	int size3 = 1;
	for (int iter6 = 0 ; iter6 < ndim3; iter6++)
	{
		size3 *= dim3[iter6];
	}
	Matrix *mat3 = createM(ndim3, dim3, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp22= transposeM(mat3);
	a = tmp22;
	printM(a);
	Matrix * tmp23= sinM(a);
	printM(tmp23);
	Matrix * tmp24= sindM(a);
	printM(tmp24);
	Matrix * tmp25= cosM(a);
	printM(tmp25);
	Matrix * tmp26= cosdM(a);
	printM(tmp26);
	Matrix * tmp27= tanM(a);
	printM(tmp27);
	Matrix * tmp28= tandM(a);
	printM(tmp28);
	return 0;
}
