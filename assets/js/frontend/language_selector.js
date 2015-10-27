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
    //console.log("Lang >> "+lang);
    $.i18n.properties({
        path    : 'languages/',
        mode    : 'both',
        language: lang,
        callback: refresh_i18n
    });
}

function browserSupportsStorage() {
    return (typeof(Storage) !== "undefined")
}

$(document).ready(function(){

    var lang = "en";

    if (browserSupportsStorage()){
        lang = localStorage.getItem("language") || "en";
        localStorage.setItem("language", lang)
    }

    // Initialize with default language
    changeLanguage(lang);

    $('#languageSelector').click(function () {
        var sel = $('#languageSelector').prop('checked') ? "en" : "pt";
        localStorage.setItem("language", sel);
        changeLanguage(sel);
    });
});
