function [F, G] = myfun1(f,g)
    F = f + g;
    G = f - g;
    for i = 1:2:5
        disp(i);
    end
end