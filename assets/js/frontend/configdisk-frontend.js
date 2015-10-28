function get_slider_value(slider) {
    var sli = $(slider);
    var value_raw = sli.val();
    var list_values = sli.data('listvalues').split(';');
    var value = parseInt(list_values[value_raw]);
    return (value==0) ? 0.5 : value;
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

function updateSlider(slider, value) {
    slider = $(slider);
    slider[0].MaterialSlider.change(value);
    slider.trigger("change");
}


$(document).ready(function() {
    calc_disksize("#disk-blocknumber", "#disk-blocksize", "#display-disksize", " KB");
});
