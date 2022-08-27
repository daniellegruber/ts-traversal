//Link
#include <stdio.h>
#include <stdbool.h>
#include <complex.h>
#include <string.h>

// Entry-point function
int main(void)
{

// Initialize variables
unknown tmpobj;
unknown obj2;
unknown obj1;
unknown data1;
unknown data2;
unknown newFileName;
unknown fid;
unknown s1;
char * ss.type;
unknown tmpdata;
unknown obj3;

Matrix * tmp1 = null(obj2,'mmo');


if (tmp1)
{
tmpobj = obj2;
obj2 = obj1;
obj1 = tmpobj;
clear;
tmpobj;
}
Matrix * tmp4 = null(obj1);
Matrix * tmp5 = null(obj2);
double tmp6;
indexM(isequal, &tmp6, tmp4, tmp5);
Matrix * tmp8 = null(obj2);
Matrix * tmp9 = null(tmp8);
Matrix * tmp10 = null('Matrix dimensions must agree.');


if (~tmp6 && tmp9 ~= 1)
{
tmp10;
}
Matrix * tmp11 = null(obj1.dataFile,'writable',obj1.writable,'format',);
data1 = tmp11;
Matrix * tmp12 = null(obj2,'mmo');
Matrix * tmp13 = null(obj2.dataFile,'writable',obj2.writable,'format',);


if (tmp12)
{
data2 = tmp13;
}
else
{
data2 = obj2;
}
// make new memory mapped data file (blank)
// --------------------------------
newFileName = mmo.getnewfilename;
double tmp14;
indexM(fopen, &tmp14, newFileName, 'w');
fid = tmp14;
Matrix * tmp15 = null(obj1);
s1 = tmp15;
ss.type = '()';

int ndim = 2;
int dim = {1,1};
Matrix * ss.subs(1:length(s1)-1) = createM(ndim, dim, 3);
double char *input = NULL;
input = malloc( 1*sizeof(*input));
input[0][] = ":";
writeM( ss.subs(1:length(s1)-1), 1, input);
free(input);

Matrix * tmp16 = null(s1);
double tmp17;
indexM(ss.subs, &tmp17, tmp16);
Matrix * tmp19 = null(data2);
Matrix * tmp20 = null(tmp19);
double tmp21;
indexM(subsref, &tmp21, data1.Data.x, ss);
double tmp22;
indexM(f, &tmp22, tmp21, data2);
double tmp23;
indexM(subsref, &tmp23, data1.Data.x, ss);
double tmp24;
indexM(subsref, &tmp24, data2.Data.x, ss);
double tmp25;
indexM(f, &tmp25, tmp23, tmp24);
double tmp26;
indexM(fwrite, &tmp26, fid, tmpdata, 'float');


int index;
for (index =  1; index <= s1(end); ++ index) {
tmp17 = index;

if (tmp20 == 1)
{
tmpdata = tmp22;
}
else
{
tmpdata = tmp25;
}
tmp26;
}
double tmp27;
indexM(fclose, &tmp27, fid);
tmp27;
// create object
// -------------
mmo;
double tmp28;
indexM(updateWorkspace, &tmp28, obj3);
obj3 = tmp28;
return 0;
}
