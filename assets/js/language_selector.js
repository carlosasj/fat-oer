function getJson(msg) {

}

function refresh_i18n() {
    $("[data-i18n]").each(function () {
        var prop = $(this).data('i18n');
        $(this).text($.i18n.prop(prop))
    });
}


// leave blank to use default language (en)
function changeLanguage(lang) {
    lang = lang || "en"; // if no language is set, use default (en)
    console.log("Lang >> "+lang);
    $.i18n.properties({
        path    : 'languages/',
        mode    : 'both',
        language: lang,
        callback: refresh_i18n
    });
}

function updatePairText(id, value){
    $('#'+id).val(value);
}

function updatePairSlider(id, value){
    $('#'+id)[0].MaterialSlider.change(value);
}

function updateChart(id, value){
    console.log($('#'+id)[0].data);
    // var seg0 = $('#'+id)[0].segments[0].value;
    // var seg1 = $('#'+id)[0].segments[1].value;
    // var total = seg0+seg1;
    //
    // $('#'+id)[0].segments[0].value = total-value;
    // $('#'+id)[0].segments[1].value = value;
    // $('#'+id)[0].update();
}

$(document).ready(function(){
    // Initialize with default language
    changeLanguage();

    $('#languageSelector').click(function () {
        var sel = $('#languageSelector').prop('checked') ? "en" : "pt";
        changeLanguage(sel);
    });

    $('[data-control-pair][type="text"]').keyup(function updatePair() {
        var pairID = $(this).data('control-pair');
        updatePairSlider(pairID, $(this).val());
        updateChart('chart-memory-1', $(this).val());
    });

    $('[data-control-pair][type="range"]').mousemove(function updatePair() {
        var pairID = $(this).data('control-pair');
        updatePairText(pairID, $(this).val());
        updateChart('chart-memory-1', $(this).val());
    });

    var data = [
        {
            value: 1,
            color: "#EEEEEE",
            highlight: "#F2F2F2",
            label: "Livre"
        },
        {
            value: 1,
            color:"#46BFBD",
            highlight: "#5AD3D1",
            label: "Consumido"
        },
    ]
    var context = $('#chart-memory-1').get(0).getContext("2d");
    var chartMemory1 = new Chart(context).Doughnut(data,{
        animateRotate : false,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> MB",
    });


});
