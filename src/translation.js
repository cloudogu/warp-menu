export function getLanguage() {
    var language = navigator.languages ?
        navigator.languages[0] :
        (navigator.language || navigator.userLanguage || navigator.browserLanguage);

    return language.split("-")[0];
}

export function getLocalizedString(key) {
    var language = getLanguage();
    var translations = getTranslations(language);
    return translations[key];
}

export function isTranslateable(key) {
    var language = getLanguage();
    var translations = getTranslations(language);
    return translations.hasOwnProperty(key);
}

export function getTranslations(language) {
    if (language === "de") {
        return {
            "platform": "cloudogu platform",
            "aboutCloudoguToken": "&Uuml;ber Cloudogu",
            "menuToken": "Men&uuml;",
            "ecosystemLogoutToken": "EcoSystem&nbsp;<span lang=\"en\">Logout</span>",
            "onboardingTextToken": "Klicken Sie auf „Men&uuml;“, um ihre Tools zu sehen. Das Men&uuml; verbindet ihre Toolchain und ist von jedem Tool aus zug&auml;nglich.",
            "onboardingHintToken": "Hinweis nicht mehr anzeigen",
            "Development Apps": "Anwendungen",
            "Administration Apps": "Administration",
            "Documentation": "Dokumentation",
            "docsCloudoguComUrl": "Cloudogu EcoSystem Dokumentation",
            "poweredBy": "Powered by Cloudogu"
        };
    } else {
        return {
            "platform": "cloudogu platform",
            "aboutCloudoguToken": "About Cloudogu",
            "menuToken": "Menu",
            "ecosystemLogoutToken": "EcoSystem Logout",
            "onboardingTextToken": "Click “Menu” to view all tools. That menu connects your toolchain and is available from any tool.",
            "onboardingHintToken": "Do not show this hint again",
            "Development Apps": "Applications",
            "Administration Apps": "Administration Apps",
            "Documentation": "Documentation",
            "docsCloudoguComUrl": "Cloudogu EcoSystem documentation",
            "poweredBy": "Powered by Cloudogu"
        };
    }
}
