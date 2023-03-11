function dispArr(A)
    numStart="@";
    numEnd="";
    if prod(size(A)) == 1
        fprintf('"%s%.4f%s"\n', numStart, A, numEnd)
    elseif ~isreal(A)
        real_A = num2cell(real(A));
        imag_A = num2cell(imag(A));
        neg_idx = imag(A) < 0;
        inf_idx = isinf(A);
        plus_arr = repmat(" + ", size(A));
        i_arr = repmat("i", size(A));
        plus_arr(neg_idx) = " ";
        real_A1 = cellfun(@(x) sprintf("%.4f", x), real_A);
        imag_A1 = cellfun(@(x) sprintf("%.4f", x), imag_A);
        real_A1 = strrep(real_A1, "-0.0000", "0.0000");
        imag_A1 = strrep(imag_A1, "-0.0000", "0.0000");
        imag_A1(inf_idx) = "";
        plus_arr(inf_idx) = "";
        i_arr(inf_idx) = "";
        disp(numStart + real_A1 + plus_arr + imag_A1 + i_arr + numEnd);
    elseif isinteger(A)
        disp(cellfun(@(x) sprintf("%s%d%s", numStart, x, numEnd), num2cell(A)));
    else
        disp(cellfun(@(x) sprintf("%s%.4f%s", numStart, x, numEnd), num2cell(A)));
    end
end