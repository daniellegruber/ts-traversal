//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>

// Entry-point function
int main(void)
{

obj2;
obj1;
tmpobj;


if (null(obj2, 'mmo'))
{



clear;
tmpobj;
}


if (~isEqualM(getDimsM(obj1), getDimsM(obj2)) && null(getDimsM(obj2)) ~= 1)
{
null('Matrix dimensions must agree.');
}
unknown data1 = null(obj1.dataFile, 'writable', obj1.writable, 'format', { 'single' obj1.dimensions 'x' });

unknown data2 = null(obj2.dataFile, 'writable', obj2.writable, 'format', { 'single' obj2.dimensions 'x' });
obj2;


if (null(obj2, 'mmo'))
{

}
else
{

}
// make new memory mapped data file (blank)
// --------------------------------
mmo.getnewfilename;

double tmp85;
indexM(fopen, &tmp85, newFileName, 'w');
tmp85;

int * s1 = getDimsM(obj1);

'()';


int ndim = 2;
int dim = {1,1};
Matrix * tmp87 = createM(ndim, dim, 3);
double char *input = NULL;
input = malloc( 1*sizeof(*input));
input[0][] = ":";
writeM( tmp87, 1, input);
free(input);

undefined;
void *data = getdataM(ss.subs);
ss.subs.data = data;

index;
void *data = getdataM(ss.subs);
memcpy(&data[NaN], tmp88[0]);
ss.subs.data = data;
double tmp99;
indexM(subsref, &tmp99, data1.Data.x, ss);
double tmp100;
indexM(subsref, &tmp100, data1.Data.x, ss);
double tmp101;
indexM(subsref, &tmp101, data1.Data.x, ss);
double tmp102;
indexM(f, &tmp102, tmp101, data2);
tmp102;
double tmp103;
indexM(subsref, &tmp103, data1.Data.x, ss);
double tmp104;
indexM(subsref, &tmp104, data1.Data.x, ss);
double tmp105;
indexM(subsref, &tmp105, data2.Data.x, ss);
double tmp106;
indexM(subsref, &tmp106, data2.Data.x, ss);
double tmp107;
indexM(subsref, &tmp107, data1.Data.x, ss);
double tmp108;
indexM(subsref, &tmp108, data2.Data.x, ss);
double tmp109;
indexM(f, &tmp109, tmp107, tmp108);
tmp109;
double tmp110;
indexM(fwrite, &tmp110, fid, tmpdata, 'float');


int index;
for (index =  1; index <= s1(end); ++ index) {


if (null(getDimsM(data2)) == 1)
{

}
else
{

}
tmp110;
}
double tmp111;
indexM(fclose, &tmp111, fid);
tmp111;
// create object
// -------------
double tmp112;
indexM(mmo, &tmp112, newFileName, s1, true, obj1.transposed);
tmp112;

double tmp113;
indexM(updateWorkspace, &tmp113, obj3);
tmp113;

return 0;
}
