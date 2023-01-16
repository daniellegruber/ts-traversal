//
//  SPEED_medium_matrix_multiplication.c
//  Octave-C
//
//  Created by Zach Taylor on 8/19/21.
//

#include <stdio.h>
#include <stdlib.h>
#include <float.h>
#include <tgmath.h>
#include <matrix.h>

// Speedtest: multiply a complex matrix by a double matrix
int main() 
{
	bool flag = true;

	// Initialize matrix metadata
	int ndim = 2;
	int dim[2] = {100,100};

	// Initialize matrix
	Matrix *tmp = createM(ndim, dim, DOUBLE);
	if (tmp == NULL)
	{
		fprintf(stderr, "Could not create matrix\n");
		return(false);
	}

	// Create the matrix data and write it
	int size = 100*100;
	double *input = NULL;
	input = malloc(size*sizeof(*input));
	for (int i = 0 ; i < size ; i++)
	{
		input[i] = (i+1)*(i+1)+0.5;
	}

	writeM(tmp, size, input);
	free(input); // writeM copies the input into the matrix, so it can be freed immediately


	// Initialize the second matrix
	Matrix *tmp2 = createM(ndim, dim, COMPLEX);
	if (tmp2 == NULL)
	{
		fprintf(stderr, "Could not create matrix\n");
		return(false);
	}

	// Create the matrix data and write it
	double complex *input2 = NULL;
	input2 = malloc(size*sizeof(*input2));
	for (int i = 0 ; i < size ; i++)
	{
		input2[i] = ((i+1)*(i+1)+0.5)*I;
	}

	writeM(tmp2, size, input2);
	free(input2); // writeM copies the input into the matrix, so it can be freed immediately


	// The meat of the speed test
	int iterations = 100;
	Matrix **products = NULL;
	products = malloc(iterations*sizeof(*products));

	// Multiply the two matrices together <iterations> number of times
	// Multiplying two matrices together generates a third matrix
	for (int i = 0 ; i < iterations ; i++)
	{
		products[i] = mtimesM(tmp2, tmp);
		//printM(products[i]);
	}

	// Clean up all the product matrices created in the loop
	for (int i = 0 ; i < iterations ; i++)
	{
		if (!destroyM(products[i]))
		{
			fprintf(stderr, "Failed to destroy matrix\n");
			flag = false;
		}
	}
	free(products);

	// Clean up the original matrices
	if (!destroyM(tmp))
	{
		fprintf(stderr, "Failed to destroy matrix\n");
		flag = false;
	}

	if (!destroyM(tmp2))
	{
		fprintf(stderr, "Failed to destroy matrix\n");
		flag = false;
	}

	return(flag);
}
