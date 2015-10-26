function calc_disksize(number, size, result, unit) {
    $(number+", "+size).keyup(function() {
        var num_val = $(number).val();
        var size_val = $(size).val();
        $(result).text((num_val*size_val)+unit);
    });
}

$(document).ready(function() {
    calc_disksize("#disk-blocknumber", "#disk-blocksize", "#display-disksize", " KB");
});
