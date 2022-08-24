//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>

// Entry-point function
int permute(void)
{

// Initialize variables
unknown newFileName;
unknown res;
unknown res.dimensions;
unknown res.dataFile;
unknown tmpMMO1;
unknown tmpMMO2;
unknown d;
char * s.type;

double tmp2;
indexM(error, &tmp2, 'Max 3 dimensions for permutation');
double tmp4;
indexM(error, &tmp4, 'Permutation with 2 dimensions: use transpose instead');


if (
length(dims, ) > 3)
{
tmp2;
}
else if (
length(dims, ) == 2)
{
tmp4;
}
newFileName = ;
double tmp5;
indexM(copyfile, &tmp5, , newFileName);
tmp5;
res = obj;
double tmp6;
indexM(obj.dimensions, &tmp6, dims);
 = tmp6;
 = newFileName;
double tmp7;
indexM(memmapfile, &tmp7, , 'writable', , 'format', );
tmpMMO1 = tmp7;
double tmp8;
indexM(memmapfile, &tmp8, , 'writable', true, 'format', );
tmpMMO2 = tmp8;
// copy the data
// -------------
d = ;
 = '()';
// slower versions below
// for i1 = 1:obj.dimensions(1)
//     for i2 = 1:obj.dimensions(3)
//         s.type = '()';
//         s.subs = { i1 ':' i2 };
//         tmpdata = subsref(tmpMMO1.Data.x,s);
//         if all(dims == [2 1 3]), tmpMMO2.Data.x( :,i1,i2) = tmpdata; end
//         if all(dims == [2 3 1]), tmpMMO2.Data.x( :,i2,i1) = tmpdata; end
//         
//         if all(dims == [1 2 3]), tmpMMO2.Data.x(i1, :,i2) = tmpdata; end
//         if all(dims == [3 2 1]), tmpMMO2.Data.x(i2, :,i1) = tmpdata; end
//         
//         if all(dims == [1 3 2]), tmpMMO2.Data.x(i1,i2, :) = tmpdata; end
//         if all(dims == [3 1 2]), tmpMMO2.Data.x(i2,i1, :) = tmpdata; end
//     end
// end
// 
// for i1 = 1:obj.dimensions(2)
//     for i2 = 1:obj.dimensions(3)
//         s.type = '()';
//         s.subs = { ':' i1 i2 };
//         tmpdata = subsref(tmpMMO1.Data.x,s);
//         if all(dims == [1 2 3]), tmpMMO2.Data.x( :,i1,i2) = tmpdata; end
//         if all(dims == [1 3 2]), tmpMMO2.Data.x( :,i2,i1) = tmpdata; end
//         if all(dims == [2 1 3]), tmpMMO2.Data.x(i1, :,i2) = tmpdata; end
//         if all(dims == [2 3 1]), tmpMMO2.Data.x(i1,i2, :) = tmpdata; end
//         if all(dims == [3 2 1]), tmpMMO2.Data.x(i2,i1, :) = tmpdata; end
//         if all(dims == [3 1 2]), tmpMMO2.Data.x(i2, :,i1) = tmpdata; end
//     end
// end
return 0;
}
