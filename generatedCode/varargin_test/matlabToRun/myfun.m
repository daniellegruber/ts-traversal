function B = myfun(fileID, A, varargin)
% Inputs:
%   A: int matrix
% Varargin:
%   a: int
%   b: int
%   c: double
% Outputs:
%   B: int matrix

B = 2*A;

if nargin > 3
    a = varargin{1};
    b = varargin{2};
    c = varargin{3};
    dispArr(fileID, sprintf("a: %d\nb: %d\nc: %.4f\n", a, b, c));
    
elseif nargin > 2
    a = varargin{1};
    b = varargin{2};
    dispArr(fileID, sprintf("a: %d\nb: %d\n", a, b);
    
elseif nargin > 1
    a = varargin{1};
    dispArr(fileID, sprintf("a: %d\n", a));
else 
    dispArr(fileID, "No extra inputs")
    
end

end