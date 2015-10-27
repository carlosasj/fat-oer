function get_slider_value(slider) {
    console.log("oi");
    var sli = $(slider);
    var value_raw = sli.val();
    var list_values = sli.data('listvalues').split(';');
    console.log(parseInt(list_values[value_raw]));
    return parseInt(list_values[value_raw]);
}

function calc_disksize(number, size, result, unit) {
    $(number).keyup(function() {
        var num_val = $(this).val();
        var size_val = get_slider_value(size);
        $(result).text((num_val*size_val)+unit);
    });

    $(size).change(function() {
        var num_val = $(number).val();
        var size_val = get_slider_value(this);
        $(result).text((num_val*size_val)+unit);
    });

}


$(document).ready(function() {
    calc_disksize("#disk-blocknumber", "#disk-blocksize", "#display-disksize", " KB");
});
