function refresh_i18n() {
    $("[data-i18n]").each(function () {
        var prop = $(this).data('i18n');
        $(this).text($.i18n.prop(prop))
    }
    );
}

$('#languageSelector').click(function () {
    changeLanguage($('#languageSelector').prop('checked') ? "en" : "pt");
    refresh_i18n();
}
);

// leave blank to use default language (en)
function changeLanguage(lang) {
    lang = lang || ''; // if no language is set, use default (en)

    $.i18n.properties({
        name    : 'Messages',
        path    : 'languages/',
        mode    : 'both',
        language: lang,
        callback: refresh_i18n
    }
    );
}

// Initialize with default language
changeLanguage();


