var baseUrl = '';

var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];
var categories = {
    "Development Apps": "Entwicklung",
    "Administration Apps": "Administration",
    "Documentation": "Dokumentation"
};
var languageArray = {
    "de": categories
};

//Custom Translation Tokens
var ABOUT_CLOUDOGU_TOKEN = "About Cloudogu";
var MENU_TOKEN = "Menu";
var ECOSYSTEM_LOGOUT_TOKEN = "EcoSystem Logout";
var ONBOARDING_TEXT_TOKEN = "Click 'Menu' to view all tools. That menu connects your toolchain and is available from any tool.";
var ONBOARDING_HINT_TOKEN = "Do not show this hint again.";

var informationEntries = new Array();

var lss = isLocalStorageSupported();

function toggleCollapsedInStorage(id) {
    if (!lss) return;

    if (localStorage.getItem(id) === null) {
        localStorage.setItem(id, 'true');
    } else {
        localStorage.removeItem(id);
    }
}

function isOpenCollapsible(id) {
    if (!lss) return false;

    return localStorage.getItem(id) !== null;
}

// create link
function createLink(href) {
    if (href.indexOf('http') === 0) {
        return href;
    } else {
        return baseUrl + href;
    }
}

// http://stackoverflow.com/questions/11214404/how-to-detect-if-browser-supports-html5-local-storage
function isLocalStorageSupported() {
    var mod = '__warp';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch (e) {
        return false;
    }
}

function getLanguage() {
    var language = navigator.languages ?
        navigator.languages[0] :
        (navigator.language || navigator.userLanguage || navigator.browserLanguage);

    return language;
}

function setCustomTranslationTokens(language) {
    if (language === "de") {
        ABOUT_CLOUDOGU_TOKEN = "Über Cloudogu";
        MENU_TOKEN = "Menü";
        ECOSYSTEM_LOGOUT_TOKEN = "EcoSystem Logout";
        ONBOARDING_TEXT_TOKEN = "Klicken Sie auf 'Menü', um ihre Tools zu sehen. Das Menü verbindet ihre Toolchain und ist von jedem Tool aus zugänglich.";
        ONBOARDING_HINT_TOKEN = "Diesen Hinweis nicht mehr anzeigen.";
    }
}

function getCategoryKey(category) {
    var language = getLanguage();
    setCustomTranslationTokens(language);
    //if language = German, change category.title to German language
    if (language.indexOf("de") > -1) {
        if (languageArray["de"][category.Title] !== undefined)
            category.Title = languageArray["de"][category.Title];
    }

    return "warpc." + category.Title.toLowerCase().replace(/\s+/g, "_");
}

function toggleCategory(e) {
    var container = document.getElementsByClassName('warp-menu-container')[0];
    var list = document.getElementsByClassName('warp-menu-category-list')[0];
    var width = list.clientWidth;
    var height = list.clientHeight;

    var target = e.target;
    toggleClass(target, 'warpmenu-category-open');
    toggleCollapsedInStorage(target.id);

    // The container does not realize it when the content grows.
    // So we force a redraw by hiding and showing again.
    if (list.clientWidth !== width || list.clientHeight !== height) {
        toggleClass(container, 'menu-container-hide')
        setTimeout(function () {
            toggleClass(container, 'menu-container-hide')
        }, 50);
    }
}

function createMenuEntry(id, entries, title, list) {
    var category = document.createElement('li');

    var categoryHeader = document.createElement('h3');
    categoryHeader.innerHTML = title;
    categoryHeader.onclick = toggleCategory;
    categoryHeader.id = 'collapse-warp-menu-category-header-' + title;
    if (isOpenCollapsible(categoryHeader.id)) {
        addClass(categoryHeader, 'warpmenu-category-open');
    }

    var categoryLinkList = document.createElement('ul');

    for (var i = 0; i < entries.length; i++) {
        var link = entries[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        addClass(a, 'warp-menu-target-link');
        if (link.Target && link.Target === 'external') {
            a.target = '_blank'
        } else {
            a.target = '_top';
        }
        a.href = createLink(link.Href);
        a.innerHTML = link.DisplayName;
        li.appendChild(a);
        categoryLinkList.appendChild(li);
    }

    category.appendChild(categoryHeader);
    category.appendChild(categoryLinkList);
    list.appendChild(category);
}

function createToggleButton() {
    var toggleColumn = document.createElement('div');
    addClass(toggleColumn, 'warp-menu-column-toggle');

    var toggle = document.createElement('a');
    addClass(toggle, 'warpbtn')
    toggle.innerHTML = MENU_TOKEN;
    toggleColumn.appendChild(toggle);
    return {
        "toggleColumn": toggleColumn,
        "toggle": toggle
    };
}

function createTooltip() {
    var tooltipColumn = document.createElement('div');
    addClass(tooltipColumn, 'warp-menu-column-tooltip');

    var tooltipLabel = document.createElement('label');
    addClass(tooltipLabel, 'warp-onboarding');
    tooltipColumn.appendChild(tooltipLabel);

    var text = document.createElement('p');
    addClass(text, 'warp-onboarding-msg');
    text.innerHTML = ONBOARDING_TEXT_TOKEN;
    tooltipLabel.appendChild(text);
    createHomeHrefWithImage
    var hint = document.createElement('p');
    addClass(hint, 'warp-onboarding-hint');
    hint.innerHTML = ONBOARDING_HINT_TOKEN;
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    hint.appendChild(checkbox);
    tooltipLabel.appendChild(hint);

    var tooltipLabelArrow = document.createElement('div');
    tooltipLabelArrow.innerText = ' ';
    addClass(tooltipLabelArrow, 'warp-onboarding-after-arrow');
    tooltipLabel.appendChild(tooltipLabelArrow)

    function hideTooltip() {
        addClass(tooltipColumn, 'warp-onboarding-container-hide');
        if (lss) localStorage.setItem('warpMenuHideTooltip', 'hide');
        setTimeout(function () {
            tooltipColumn.style.display = 'none';
        }, 3000);
    }

    checkbox.onclick = hideTooltip;
    return tooltipColumn;
}

function isTooltipDisabled() {
    if (!lss) return false;

    var tooltipConfig = localStorage.getItem('warpMenuHideTooltip');
    return tooltipConfig === 'hide';
}

function addLogoutMenuEntry(list) {
    var placeholder = document.createElement('li');
    addClass(placeholder, 'warp-menu-placeholder');
    list.appendChild(placeholder);

    var logout = document.createElement('li');
    var logoutHref = document.createElement('a');
    addClass(logoutHref, 'warp-menu-logout-link');
    logoutHref.innerHTML = ECOSYSTEM_LOGOUT_TOKEN;
    logoutHref.href = createLink('/cas/logout');
    logout.appendChild(logoutHref);
    list.appendChild(logout);
}

function createHomeHrefWithImage() {
    var homeHrefListElement = document.createElement('li');
    var homeHref = document.createElement('a');
    homeHref.href = createLink('');
    var homeHrefImage = document.createElement('img');
    homeHrefImage.src = 'images/blib-white-160px.png'
    homeHref.appendChild(homeHrefImage);
    homeHrefListElement.appendChild(homeHref);
    return homeHrefListElement;
}

function createMenu(categories) {
    var menuContainer = document.createElement('div');
    addClass(menuContainer, 'warp-menu-column-menu');
    addClass(menuContainer, 'menu-container-hide');

    var menu = document.createElement('div');
    addClass(menu, 'warp-menu-shift-container');
    menuContainer.appendChild(menu);

    var overlay = document.createElement('div');
    addClass(overlay, 'warp-menu-gradient-overlay');
    menuContainer.appendChild(overlay);

    var overlayInner = document.createElement('div');
    overlay.appendChild(overlayInner);

    var list = document.createElement('ul');
    addClass(list, 'warp-menu-category-list');
    menu.appendChild(list);

    var homeHrefElement = createHomeHrefWithImage();
    list.appendChild(homeHrefElement);

    for (var c = 0; c < categories.length; c++) {
        var currentCategory = categories[c];

        if (currentCategory.Title.toUpperCase() === "INFORMATION") {
            informationEntries = currentCategory.Entries;
        } else {
            var id = getCategoryKey(currentCategory);
            createMenuEntry(id, currentCategory.Entries, currentCategory.Title, list);
        }
    }

    // fixed about page - entry
    informationEntries.push({
        DisplayName: ABOUT_CLOUDOGU_TOKEN,
        Href: createLink("/info/index.html")
    });
    createMenuEntry("warpc.info", informationEntries, "Information", list);

    addLogoutMenuEntry(list);

    return menuContainer;
}

function initWarpMenu(categories) {
    var warpMenuContainer = document.createElement('div');
    addClass(warpMenuContainer, 'warp-menu-container');
    warpMenuContainer.id = 'warp-menu-container';

    var tooltipColumn = createTooltip();
    var toggleResult = createToggleButton();
    var menuContainer = createMenu(categories);

    function toggleNav() {
        if (hasClass(warpMenuContainer, 'collapsing')) return;

        addClass(warpMenuContainer, 'collapsing')
        toggleClass(menuContainer, 'menu-container-hide');
        setTimeout(function () {
            removeClass(warpMenuContainer, 'collapsing')
        }, 300);
    }

    toggleResult.toggle.onclick = toggleNav;

    if (!isTooltipDisabled()) {
        warpMenuContainer.appendChild(tooltipColumn)
    }
    warpMenuContainer.appendChild(toggleResult.toggleColumn);
    warpMenuContainer.appendChild(menuContainer);

    // hide menu
    document.onclick = function (e) {
        if (e && e.target) {
            if (!hasClass(menuContainer, 'menu-container-hide') && !hasClass('warp-menu-category-list')) {
                toggleNav();
            }
        }
    };

    body.appendChild(warpMenuContainer);
}

var asyncCounter = 0;
var model;

function loaded(menu) {
    if (menu) {
        model = menu;
    }
    --asyncCounter;
    if (asyncCounter === 0) {
        initWarpMenu(model);
    }
}

if (!hasClass(body, 'warpmenu-push') && (self === top || window.pmaversion)) {

    // load css
    asyncCounter++;
    addStylesheet('/warp/warp.css', function (success) {
        if (success) {
            loaded();
        }
    });

    // load model
    asyncCounter++;
    ajax('/warp/menu.json', loaded);
}
