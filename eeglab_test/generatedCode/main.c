//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>

// Entry-point function
int main(void)
{

unknown tmpobj = obj2;
unknown obj2 = obj1;
unknown obj1 = tmpobj;


if (null(obj2,'mmo'))
{



clear;
tmpobj;
}


if (~isEqualM(getDimsM(obj1),getDimsM(obj2)) && null(getDimsM(obj2)) ~= 1)
{
null('Matrix dimensions must agree.');
}
unknown data1 = null(obj1.dataFile,'writable',obj1.writable,'format',{ 'single' obj1.dimensions 'x' });

unknown data2 = null(obj2.dataFile,'writable',obj2.writable,'format',{ 'single' obj2.dimensions 'x' });
data2 = obj2


if (null(obj2,'mmo'))
{

}
else
{

}
// make new memory mapped data file (blank)
// --------------------------------
unknown newFileName = mmo.getnewfilename;

double tmp17;
indexM(fopen, &tmp17, newFileName, 'w');
unknown fid = tmp17;

int * s1 = getDimsM(obj1);

char * ss.type = '()';

void *data = getdataM(ss.subs);

int ndim = 2;
int dim = {1,1};
Matrix * tmp19 = createM(ndim, dim, 3);
double char *input = NULL;
input = malloc( 1*sizeof(*input));
input[0][] = ":";
writeM( tmp19, 1, input);
free(input);

void *data2 = getdataM(tmp19);
ss.subs.data = data;

void *data = getdataM(ss.subs);
unknown tmp20 = index;
memcpy(&data[NaN], tmp20[0]);
ss.subs.data = data;
double tmp25;
indexM(subsref, &tmp25, data1.Data.x, ss);
double tmp26;
indexM(f, &tmp26, tmp25, data2);
unknown tmpdata = tmp26;
double tmp27;
indexM(subsref, &tmp27, data1.Data.x, ss);
double tmp28;
indexM(subsref, &tmp28, data2.Data.x, ss);
double tmp29;
indexM(f, &tmp29, tmp27, tmp28);
tmpdata = tmp29
double tmp30;
indexM(fwrite, &tmp30, fid, tmpdata, 'float');


int index;
for (index =  1; index <= s1(end); ++ index) {


if (null(getDimsM(data2)) == 1)
{

}
else
{

}
tmp30;
}
double tmp31;
indexM(fclose, &tmp31, fid);
tmp31;
// create object
// -------------
double tmp32;
indexM(mmo, &tmp32, newFileName, s1, true, obj1.transposed);
obj3 = tmp32

double tmp33;
indexM(updateWorkspace, &tmp33, obj3);
unknown obj3 = tmp33;

return 0;
}
