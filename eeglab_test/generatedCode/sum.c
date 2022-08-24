//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>

// Function declarations
void sum(unknown a, int dim, * p_s);

// Entry-point function
int sum(void)
{

// Initialize variables
int dim;
 s;

// sum() - sum of memory mapped underlying array
//
// Author: Arnaud Delorme, SCCN, INC, UCSD, Nov. 2008
// Copyright (C) 2008 Arnaud Delorme, SCCN, INC, UCSD
//
// This file is part of EEGLAB, see http://www.eeglab.org
// for the documentation and details.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
// this list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
// this list of conditions and the following disclaimer in the documentation
// and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
// THE POSSIBILITY OF SUCH DAMAGE.
double tmp3;
indexM(strcmpi, &tmp3, , 'transposed');
double tmp5;
indexM(alldim, &tmp5, dim);
double tmp6;
indexM(permute, &tmp6, s, );
return 0;
}


// Subprograms

void sum(unknown a, int dim, * p_s)
{
*p_s = s;

if (nargin < 2)
{
dim = 1;
}
//b = (:,:,:);

if (~tmp3)
{
s = 
sum(, dim, );
}
else
{
;

if (
length(
size(a, ), ) == 3)
{
dim = tmp5;
s = 
sum(, dim, );
s = tmp6;
}
else
{

if (dim == 1)
{
dim = 2;
}
else
{

}
s = 
sum(, dim, )';
}
}
return;

// do pnts by pnts if dim = 1
//     if dim == 1 & length(
//         
//         s = zeros(size(a,2), size(a,3));
//         for i=1:size(a,2)
//             s(i,:) = mean(a.data.data.x(:,i,:));
//         end
//     elseif dim == 1
//          s = zeros(size(a,1), size(a,1));
//         for i=1:size(a,1)
//             s(i,:) = mean(a.data.data.x(:,:,:));
//         end
//        
//         
//     s = builtin('sum', rand(10,10), dim);
//if length(size(a)) > 2
//else s = sum(a(:,:,:), dim);
//end
}