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
        result = $(result);

        var fattype = result.attr('data-fattype');
        var is_valid = check_max_disk_size(size_val, num_val, fattype);

        result.text((num_val*size_val)+unit);

        if (!is_valid) {
            result.parent().addClass("disk-size-invalid");
            result.addClass("disk-size-invalid");
        }
        else {
            result.parent().removeClass("disk-size-invalid");
            result.removeClass("disk-size-invalid");
        }
    });

    $(size).change(function() {
        var num_val = $(number).val();
        var size_val = get_slider_value(this);
        result = $(result);

        var fattype = result.attr('data-fattype');
        var is_valid = check_max_disk_size(size_val, num_val, fattype);

        result.text((num_val*size_val)+unit);

        if (!is_valid) {
            result.parent().addClass("disk-size-invalid");
        }
        else {
            result.parent().removeClass("disk-size-invalid");
        }
    });
}

var fats = {
    12: {
        0.5: 4096,
        1: 4096,
        2: 4096,
        4: 4096,
    },
    16: {
        2: 65536,
        4: 65536,
        8: 65536,
        16: 65536,
        32: 65536,
    },
    32: {
        4: 262144,
        8: 262144,
        16: 131072,
        32: 65536,
    },
}

function check_max_disk_size(blocksize, blocknumber, type) {
    return blocknumber <= fats[type][blocksize];
}

function updateSlider(slider, value) {
    slider = $(slider);
    slider[0].MaterialSlider.change(value);
    slider.trigger("change");
}


$(document).ready(function() {
    calc_disksize("#disk-blocknumber", "#disk-blocksize", "#display-disksize", " KB");
});
