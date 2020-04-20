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

var informationEntries = new Array();

var lss = isLocalStorageSupported();

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
    const target = e.target;
    toggleClass(target, 'warpmenu-category-open');
    toggleCollapsed(target.id);
    const container = document.getElementsByClassName('warp-menu-container')[0];
    //Toggle hide class twice to force redraw
    toggleClass(container, 'warpmenu-hide-container')
    toggleClass(container, 'warpmenu-hide-container')
    // var target = e.target;
    // if (target && target.rel) {
    //     toggleClass(target, 'warpmenu-category-open');
    //     var el = document.getElementById(target.rel);
    //     if (el) {
    //         if (hasClass(el, 'warpmenu-collapsed')) {
    //             if (lss) {
    //                 localStorage.removeItem(target.rel + '.collapsed');
    //             }
    //             removeClass(el, 'warpmenu-collapsed');
    //         } else {
    //             if (lss) {
    //                 localStorage.setItem(target.rel + '.collapsed', true);
    //             }
    //             addClass(el, 'warpmenu-collapsed');
    //         }
    //     }
    // }
}

function createMenuEntry(id, entries, title, list) {
    let li = document.createElement('li');

    let h3 = document.createElement('h3');
    h3.innerHTML = title;
    h3.onclick = toggleCategory;
    h3.id = 'collapse-warp-menu-category-header-' + title;
    if (isOpenCollapsible(h3.id)) {
        addClass(h3, 'warpmenu-category-open');
    }

    let ul = document.createElement('ul');

    for (let i = 0; i < entries.length; i++) {
        let link = entries[i];
        let li = document.createElement('li');
        let a = document.createElement('a');
        addClass(a, 'warp-menu-target-link');
        if (link.Target && link.Target === 'external') {
            a.target = '_blank'
        } else {
            a.target = '_top';
        }
        a.href = createLink(link.Href);
        a.innerHTML = link.DisplayName;
        li.appendChild(a);
        ul.appendChild(li);
    }

    li.appendChild(h3);
    li.appendChild(ul);
    list.appendChild(li);
}

function createToggleButton() {
    let toggleColumn = document.createElement('div');
    addClass(toggleColumn, 'warp-menu-column-toggle');

    let toggle = document.createElement('a');
    addClass(toggle, 'warpbtn')
    toggle.innerHTML = 'Menü';
    toggleColumn.appendChild(toggle);
    return {toggleColumn, toggle};
}

function createTooltip() {
    let tooltipColumn = document.createElement('div');
    addClass(tooltipColumn, 'warp-menu-column-tooltip');

    let tooltipLabel = document.createElement('label');
    addClass(tooltipLabel, 'warp-onboarding');
    tooltipColumn.appendChild(tooltipLabel);

    let text = document.createElement('p');
    addClass(text, 'warp-onboarding-msg');
    text.innerHTML = 'Klicken Sie auf "Menü", um ihre Tools zu sehen. Das Menü verbindet ihre Toolchain und ist von jedem Tool aus zugänglich.';
    tooltipLabel.appendChild(text);

    let hint = document.createElement('p');
    addClass(hint, 'warp-onboarding-hint');
    hint.innerHTML = 'Diesen Hinweis nicht mehr anzeigen.';
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    hint.appendChild(checkbox);
    tooltipLabel.appendChild(hint);

    function hideTooltip() {
        addClass(tooltipColumn, 'warp-onboarding-container-hide');
        localStorage.setItem('warpMenuHideTooltip', 'hide');
    }

    checkbox.onclick = hideTooltip;
    return tooltipColumn;
}

function isTooltipDisabled() {
    let config = localStorage.getItem('warpMenuHideTooltip');
    return config === 'hide';
}

function createMenu(categories) {
    let menuContainer = document.createElement('div');
    addClass(menuContainer, 'warp-menu-column-menu')
    addClass(menuContainer, 'menu-container-hide')

    let menu = document.createElement('div');
    addClass(menu, 'warp-menu-shift-container');
    menuContainer.appendChild(menu);

    let overlay = document.createElement('div');
    addClass(overlay, 'warp-menu-gradient-overlay');
    menuContainer.appendChild(overlay);

    let overlayInner = document.createElement('div');
    overlay.appendChild(overlayInner);

    let list = document.createElement('ul');
    addClass(list, 'warp-menu-category-list');
    menu.appendChild(list);


    let firstListElement = document.createElement('li');
    let homeHref = document.createElement('a');
    homeHref.href = '#';
    let img = document.createElement('img');
    img.src = 'images/blib-white-160px.png'
    homeHref.appendChild(img);
    firstListElement.appendChild(homeHref);
    list.appendChild(firstListElement);

    for (let c = 0; c < categories.length; c++) {
        let category = categories[c];

        if (category.Title.toUpperCase() === "INFORMATION") {
            informationEntries = category.Entries;
        } else {
            let id = getCategoryKey(category);
            createMenuEntry(id, category.Entries, category.Title, list);
        }
    }

    return menuContainer;
}

function initWarpMenu(categories) {
    let container = document.createElement('div');
    addClass(container, 'warp-menu-container');
    container.id = 'warp-menu-container';

    let tooltipColumn = createTooltip();
    let {toggleColumn, toggle} = createToggleButton();
    let menuContainer = createMenu(categories);

    function toggleNav() {
        toggleClass(menuContainer, 'menu-container-hide');
    }

    toggle.onclick = toggleNav;

    if (!isTooltipDisabled()) {
        container.appendChild(tooltipColumn)
    }
    container.appendChild(toggleColumn);
    container.appendChild(menuContainer);

    body.appendChild(container);
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
