struct mmo {
	unknown dataFile;
	unknown dimensions;
	bool writable;
	unknown workspace;
	char *type = NULL;
type = malloc(5*sizeof(*type));
	unknown transposed;
	unknown debug;
}

mmo binaryopp(unknown f, mmo obj1, mmo obj2) {




// make new memory mapped data file (blank)
// --------------------------------






tmp18;
// create object
// -------------


return obj3;
}

int checkcopies_local(mmo obj, unknown arg) {


return ncopies;
}

unknown ctranspose(mmo obj, int useconj) {
return res;
}

unknown ndims(mmo obj) {

return res;
}

unknown subsref(mmo obj, unknown s) {




// one dimension input
// -------------------

// deal with transposed data
// -------------------------

// convert : to real sizes
// -----------------------






// non-transposed data
// -------------------




return res;
}

unknown sum(mmo obj, null dim) {





return sumval;
}

mmo unitaryopp(unknown f, mmo obj1, unknown varargin) {
// make new memory mapped data file (blank)
// ----------------------------------------







tmp59;
// copy the data
// -------------


return obj2;
}

mmo mmo(null dataFileIn, null datadims, null writableVal, null transposedVal, null debugVal) {



// check that the file is not empty

// --------------------------------


// test memory map but discards it

// -------------------------------


clear;
test;
// set fields

// ----------







// set workspace

// -------------


//             stack = dbstack;

//             stack(1) = [];

//             stack = rmfield(stack, 'line');

//             dataout.workspace = stack;


return dataout;
}

int checkcopies(mmo obj) {


return ncopies;
}

double mean(mmo obj, null dim) {



return val;
}

Matrix * std(null varargin) {

return val;
}

mmo minus(mmo obj1, mmo obj2) {

return obj3;
}

mmo time(mmo obj1, mmo obj2) {

return obj3;
}

char getnewfilename(void) {

return str;
}

mmo updateWorkspace(mmo obj) {




return obj;
}

int checkworkspace(mmo obj) {





return ncopies;
}

int checkcopies_local(mmo obj, unknown arg) {


return ncopies;
}

mmo binaryopp(unknown f, mmo obj1, mmo obj2) {




// make new memory mapped data file (blank)
// --------------------------------






tmp130;
// create object
// -------------


return obj3;
}

mmo updateWorkspace(mmo obj) {




return obj;
}