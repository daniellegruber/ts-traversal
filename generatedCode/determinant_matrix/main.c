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
	//test1
	
	int ndim1 = 2;
	int dim1[2] = {1,1};
	Matrix * a = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 1*sizeof(*input1));
	input1[0] = 1;
	writeM( a, 1, input1);
	free(input1);
	
	int * tmp1 = i_to_i(a);
	printf("\n%d\n", tmp1[0]);
	double d1;
	detM(tmp1[0], &d1);
	printf("\n%f\n", d1);
	//test2
	
	int ndim2 = 2;
	int dim2[2] = {2,2};
	a = createM(ndim2, dim2, 2);
	complex *input2 = NULL;
	input2 = malloc( 4*sizeof(*input2));
	input2[0] = 26 + 1*I;
	input2[1] = 3 - 8*I;
	input2[2] = 20*I;
	input2[3] = 1 + 25*I;
	writeM( a, 4, input2);
	free(input2);
	
	printM(a);
	double d2;
	detM(a, &d2);
	printf("\n%f\n", d2);
	//test3
	int ndim3= 2;
	int dim3[2]= {3,3};
	Matrix * tmp2= zerosM(ndim3, dim3);
	a = tmp2;
	int counter= 1;
	int* lhs_data1 = i_to_i(a);
	for (int iter1 = 1; iter1 <= 3; ++ iter1) {
		for (int iter2 = 1; iter2 <= 3; ++ iter2) {
			int tmp3= counter * counter;
			lhs_data1[(iter2-1) + (iter1-1)*3 + (1-1)*3*3 + (1-1)*3*3*1] = tmp3;
			counter = counter + 1;
		
		}
	
	}
	// Write matrix mat1
	int size1 = 1;
	for (int iter3 = 0 ; iter3 < ndim3; iter3++)
	{
		size1 *= dim3[iter3];
	}
	Matrix *mat1 = createM(ndim3, dim3, 0);
	writeM(mat1, size1, lhs_data1);
	mat1 = mat1;
	printM(mat1);
	double d3;
	detM(mat1, &d3);
	printf("%.5f\n", d3);
	//testn
	int ndim4= 2;
	int dim4[2]= {5,5};
	Matrix * tmp4= zerosM(ndim4, dim4);
	a = tmp4;
	counter = 0;
	for (int iter4 = 0; iter4 <= 4; ++ iter4) {
		for (int iter5 = 0; iter5 <= 4; ++ iter5) {
			counter = counter + 1;
			int tmp5= (counter - 1) % 2;
			if ((tmp5 == 0)) {
				int d0_2 = counter % 5;
				if (d0_2 == 0) {
					d0_2 = 5;
				}
				int d1_2 = (counter - d0_2)/5 + 1;
				int tmp7= (counter + iter4) % 7;
				int tmp6= tmp7;
				int* lhs_data2 = i_to_i(a);
				lhs_data2[(d1_2-1) + (d0_2-1) * 5] = tmp6;
				
				// Write matrix mat2
				int size2 = 1;
				for (int iter6 = 0 ; iter6 < ndim4; iter6++)
				{
					size2 *= dim4[iter6];
				}
				Matrix *mat2 = createM(ndim4, dim4, 0);
				writeM(mat2, size2, lhs_data2);
				} else {
				int tmp8= (counter + iter5) % 7;
				int d0_3 = counter % 5;
				if (d0_3 == 0) {
					d0_3 = 5;
				}
				int d1_3 = (counter - d0_3)/5 + 1;
				int tmp10= (counter + iter5) % 7;
				int tmp9= -1 * tmp10;
				lhs_data2[(d1_3-1) + (d0_3-1) * 5] = tmp9;
				
			
			}
		
		}
	
	}
	Matrix * tmp11= transposeM(mat2);
	a = tmp11;
	printM(a);
	double d4;
	detM(a, &d4);
	printf("%.5f\n", d4);
	//non_square
	int ndim5= 2;
	int dim5[2]= {3, 2};
	Matrix * tmp12= zerosM(ndim5, dim5);
	a = tmp12;
	complex tmp13= 26 + 1*I;
	complex* lhs_data3 = i_to_c(a);
	lhs_data3[0] = tmp13;
	complex tmp14= 3 - 8*I;
	lhs_data3[2] = tmp14;
	complex tmp15= 20*I;
	lhs_data3[4] = tmp15;
	complex tmp16= 1 + 25*I;
	lhs_data3[1] = tmp16;
	int tmp17= 0;
	lhs_data3[3] = tmp17;
	int tmp18= 1;
	lhs_data3[5] = tmp18;
	// Write matrix mat3
	int size3 = 1;
	for (int iter7 = 0 ; iter7 < ndim5; iter7++)
	{
		size3 *= dim5[iter7];
	}
	Matrix *mat3 = createM(ndim5, dim5, 2);
	writeM(mat3, size3, lhs_data3);
	Matrix * tmp19= transposeM(mat3);
	a = tmp19;
	printM(a);
	return 0;
}
