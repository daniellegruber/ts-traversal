//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>
#include <length.h>
#include <length.h>

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





if (length(dims) > 3)
{
error('Max 3 dimensions for permutation');
}
else if (length(dims) == 2)
{
error('Permutation with 2 dimensions: use transpose instead');
}
newFileName = ;
double tmp3;
indexM(copyfile, &tmp3, , newFileName);
tmp3;
res = obj;
double tmp4;
indexM(obj.dimensions, &tmp4, dims);
 = tmp4;
 = newFileName;
double tmp5;
indexM(memmapfile, &tmp5, , 'writable', , 'format', );
tmpMMO1 = tmp5;
double tmp6;
indexM(memmapfile, &tmp6, , 'writable', true, 'format', );
tmpMMO2 = tmp6;
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
