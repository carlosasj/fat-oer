function refresh_i18n() {
    $("[data-i18n]").each(function () {
        var prop = $(this).data('i18n');
        $(this).text($.i18n.prop(prop))
    });
}


// leave blank to use default language (en)
function changeLanguage(lang) {
    lang = lang || ""; // if no language is set, use default (en)
    console.log("Lang >> "+lang);
    $.i18n.properties({
        name    : 'Messages',
        path    : 'languages/',
        mode    : 'both',
        language: lang,
        callback: refresh_i18n
    });
}

$(document).ready(function(){
    // Initialize with default language
    changeLanguage();
    refresh_i18n();

    $('#languageSelector').click(function () {
        var sel = $('#languageSelector').prop('checked') ? "en" : "pt";
        changeLanguage(sel);
    });
});