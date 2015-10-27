$('#sidecardSelector').click(function () {
    var value = $(this).is(':checked');
    if (value) {
        $('.sidecard').addClass('show-sidecard');
        $('.maincard').addClass('mdl-cell mdl-cell--9-col-desktop');
        $('.maincard').removeClass('mdl-cell--12-col-desktop');
    }
    else {
        $('.sidecard').removeClass('show-sidecard');
        $('.maincard').removeClass('mdl-cell mdl-cell--9-col-desktop');
        $('.maincard').addClass('mdl-cell--12-col-desktop');
    }
});
