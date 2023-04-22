// Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <matrix.h>
#include "../convertSubscript.h"
#include "./main.h"
#include "./mmo.h"

// Structs
struct mmo {
	null dataFileIn;
	null datadims;
	null writableVal;
	null transposedVal;
	null debugVal;
}
struct mmo {
	null dataFileIn;
	null datadims;
	null writableVal;
	null transposedVal;
	null debugVal;
}

// Entry-point function
int main(void) {

	
	int ndim1 = 2;
	int dim1[2] = {1,3};
	Matrix * dim = createM(ndim1, dim1, 0);
	int *input1 = NULL;
	input1 = malloc( 3*sizeof(*input1));
	input1[0] = 64;
	input1[1] = 1024;
	input1[2] = 50;
	writeM( dim, 3, input1);
	free(input1);
	
	undefined stack = dbstack;
	removeValue(stack, 0
	heterogeneous obj.workspace = stack;
	int vec1[-1];
	
	for (int iter1 = 0; iter1 < -1; iter1++) {
		vec1[iter1] = 3 + (1)*iter1;
	}
	int ndim2 = getnDimM(obj.dimensions);
	int *dim2 = getDimsM(obj.dimensions);
	unknown tmp1;
	indexM(obj.dimensions, &tmp1, 0, );
	if (null <= 2 || null) {
		int res1 = 2;
		
		} else {
		
	
	}
	int vec2[-1];
	
	for (int iter2 = 0; iter2 < -1; iter2++) {
		vec2[iter2] = 3 + (1)*iter2;
	}
	int ndim3 = getnDimM(obj.dimensions);
	int *dim3 = getDimsM(obj.dimensions);
	unknown tmp2;
	indexM(obj.dimensions, &tmp2, 0, );
	if (null <= 2 || null) {
		res1 = 2;
		
		} else {
		
	
	}
	if (obj.transposed) {
		if (fabs(null - 2) > 1e-6 && fabs(null - 3) > 1e-6) {
			
		
		}
		if (fabs(null - 2) < 1e-6) {
			
			} else {
			
		
		}

		
		} else {
		unknown tmpdimensions = obj.dimensions;
		
	
	}
	unknown s = tmpdimensions;
	if (nargin > 1) {
		if (dim > null) {
			unknown s = 1;
			
			} else {
			int ndim4 = getnDimM(s);
			int *dim4 = getDimsM(s);
			int idx1 = convertSubscript(ndim4, dim4, dim);
			int tmp3;
			indexM(s, &tmp3, 1, idx1+1);
			tmp3;
			
		
		}
		
		} else {
		if (nargout > 1) {
			
			int ndim5 = 2;
			int dim5[2] = {1,17};
			s = createM(ndim5, dim5, 0);
			int *input2 = NULL;
			input2 = malloc( 17*sizeof(*input2));
			input2[0] = s;
			input2[1] = 1;
			input2[2] = 1;
			input2[3] = 1;
			input2[4] = 1;
			input2[5] = 1;
			input2[6] = 1;
			input2[7] = 1;
			input2[8] = 1;
			input2[9] = 1;
			input2[10] = 1;
			input2[11] = 1;
			input2[12] = 1;
			input2[13] = 1;
			input2[14] = 1;
			input2[15] = 1;
			input2[16] = 1;
			writeM( s, 17, input2);
			free(input2);
			
			Matrix * alls = s;
			int ndim6 = getnDimM(s);
			int *dim6 = getDimsM(s);
			int idx2 = convertSubscript(ndim6, dim6, 1);
			int tmp4;
			indexM(s, &tmp4, 1, idx2+1);
			tmp4;
			Matrix * tmp5 = maxM(nargout, 1);
			unknown * tmp6 = u_to_u(tmp5);
			for (int iter3 = 1; iter3 <= tmp6[0] - 1; iter3++) {
				int ndim7 = 2;
				int dim7[2] = {1,1};
				int idx3 = convertSubscript(ndim7, dim7, index);
				int ndim8 = getnDimM(alls);
				int *dim8 = getDimsM(alls);
				int idx4 = convertSubscript(ndim8, dim8, index + 1);
				unknown tmp7;
				indexM(alls, &tmp7, 1, idx4+1);
				tmp7;
			
			}
			
			
			
			
		
		}
		
	
	}
	return 0;
}
