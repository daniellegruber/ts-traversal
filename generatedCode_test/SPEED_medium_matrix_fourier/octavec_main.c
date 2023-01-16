//
//  SPEED_medium_matrix_fourier.c
//  Octave-C
//
//  Created by Zach Taylor on 8/19/21.
//

#include <stdio.h>
#include <stdlib.h>
#include <float.h>
#include <tgmath.h>
#include <matrix.h>

// Speedtest: Fast-fourier transform a medium-sized double matrix
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
		input[i] = pow((i+1),2.1)+0.5+((i+1)%7);
	}

	writeM(tmp, size, input);
	free(input); // writeM copies the input into the matrix, so it can be freed immediately

	// The meat of the speed test
	int iterations = 100;
	Matrix **fouriers = NULL;
	fouriers = malloc(iterations*sizeof(*fouriers));

	// FFT the matrix
	for (int i = 0 ; i < iterations ; i++)
	{
		fouriers[i] = fftM(tmp);
	}

	// Clean up the matrices
	if (!destroyM(tmp))
	{
		fprintf(stderr, "Failed to destroy matrix\n");
		flag = false;
	}

	for (int i = 0 ; i < iterations ; i++)
	{
		if (!destroyM(fouriers[i]))
		{
			fprintf(stderr, "Failed to destroy matrix\n");
			flag = false;
		}
	}
	free(fouriers);

	return(flag);
}