var baseUrl = '';

var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];

var informationEntries = [];

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

    return language.split("-")[0];
}

function getLocalizedString(key) {
    var language = getLanguage();
    var translations = getTranslations(language);
    return translations[key];
}

function isTranslateable(key) {
    var language = getLanguage();
    var translations = getTranslations(language);
    return translations.hasOwnProperty(key);
}

function getCategoryKey(category) {
    return "warpc." + category.Title.toLowerCase().replace(/\s+/g, "_");
}

function getTranslations(language) {
    if (language === "de") {
        return {
            "aboutCloudoguToken": "Über Cloudogu",
            "menuToken": "Menü",
            "ecosystemLogoutToken": "EcoSystem Logout",
            "onboardingTextToken": "Klicken Sie auf 'Menü', um ihre Tools zu sehen. Das Menü verbindet ihre Toolchain und ist von jedem Tool aus zugänglich.",
            "onboardingHintToken": "Diesen Hinweis nicht mehr anzeigen.",
            "Development Apps": "Entwicklung",
            "Administration Apps": "Administration",
            "Documentation": "Dokumentation"
        };
    } else {
        return {
            "aboutCloudoguToken": "About Cloudogu",
            "menuToken": "Menu",
            "ecosystemLogoutToken": "EcoSystem Logout",
            "onboardingTextToken": "Click 'Menu' to view all tools. That menu connects your toolchain and is available from any tool.",
            "onboardingHintToken": "Do not show this hint again.",
            "Development Apps": "Development Apps",
            "Administration Apps": "Administration Apps",
            "Documentation": "Documentation"
        };
    }
}

function toggleCategory(e) {
    var container = document.getElementById('warp-menu-container');
    var list = document.getElementById('warp-menu-category-list');
    var width = list.clientWidth;
    var height = list.clientHeight;

    var target = e.target;
    toggleClass(target, 'warpmenu-category-open');
    toggleCollapsedInStorage(target.id);

    // The container does not realize it when the content grows.
    // So we force a redraw by hiding and showing again.
    if (list.clientWidth !== width || list.clientHeight !== height) {
        toggleClass(container, 'warp-menu-hide-to-refresh');
        setTimeout(function () {
            toggleClass(container, 'warp-menu-hide-to-refresh');
        }, 50);
    }

    setCorrectColumnCount();
}

function createMenuEntry(id, entries, title, list) {
    var category = document.createElement('li');
    var categoryInsideContainer = document.createElement('div');

    var categoryHeader = document.createElement('h3');
    categoryHeader.innerHTML = title;
    categoryHeader.onclick = toggleCategory;
    categoryHeader.id = id;
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
            a.target = '_blank';
        } else {
            a.target = '_top';
        }
        a.href = createLink(link.Href);
        a.innerHTML = link.DisplayName;
        li.appendChild(a);
        categoryLinkList.appendChild(li);
    }

    categoryInsideContainer.appendChild(categoryHeader);
    categoryInsideContainer.appendChild(categoryLinkList);
    category.appendChild(categoryInsideContainer);
    list.appendChild(category);
}

function createToggleButton() {
    var toggleColumn = document.createElement('div');
    addClass(toggleColumn, 'warp-menu-column-toggle');

    var toggle = document.createElement('a');
    addClass(toggle, 'warpbtn');
    toggle.id = 'warp-menu-warpbtn';
    toggle.innerHTML = getLocalizedString("menuToken");
    toggleColumn.appendChild(toggle);

    // The button on bottom must be bigger when there is a scrollbar on screen.
    window.addEventListener('resize', resizeToggleButtonIfNeeded);

    return {
        "toggleColumn": toggleColumn,
        "toggle": toggle
    };
}

function resizeToggleButtonIfNeeded() {
    var toggle = document.getElementById('warp-menu-warpbtn');
    if (body.scrollWidth !== body.clientWidth) {
        addClass(toggle, 'scrollbar-warpbtn');
    } else {
        removeClass(toggle, 'scrollbar-warpbtn');
    }
}

function createTooltip() {
    var tooltipColumn = document.createElement('div');
    addClass(tooltipColumn, 'warp-menu-column-tooltip');

    var tooltipLabel = document.createElement('label');
    addClass(tooltipLabel, 'warp-onboarding');
    tooltipColumn.appendChild(tooltipLabel);

    var text = document.createElement('p');
    addClass(text, 'warp-onboarding-msg');
    text.innerHTML = getLocalizedString("onboardingTextToken");
    tooltipLabel.appendChild(text);
    var hint = document.createElement('p');
    addClass(hint, 'warp-onboarding-hint');
    hint.innerHTML = getLocalizedString("onboardingHintToken");
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    hint.appendChild(checkbox);
    tooltipLabel.appendChild(hint);

    var tooltipLabelArrow = document.createElement('div');
    tooltipLabelArrow.innerText = ' ';
    addClass(tooltipLabelArrow, 'warp-onboarding-after-arrow');
    tooltipLabel.appendChild(tooltipLabelArrow);

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
    var logout = document.createElement('li');
    var logoutHref = document.createElement('a');
    addClass(logoutHref, 'warp-menu-logout-link');
    logoutHref.innerHTML = getLocalizedString("ecosystemLogoutToken");
    logoutHref.href = createLink('/cas/logout');
    logout.appendChild(logoutHref);
    list.appendChild(logout);
}

function createHomeHrefWithImage() {
    var homeHrefListElement = document.createElement('li');
    var homeHref = document.createElement('a');
    addClass(homeHref, 'warp-menu-home-button');
    homeHref.href = createLink('');
    var homeHrefImage = document.createElement('img');
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

    var list = document.createElement('ul');
    addClass(list, 'warp-menu-category-list');
    list.id = 'warp-menu-category-list';
    menu.appendChild(list);

    var homeHrefElement = createHomeHrefWithImage();
    list.appendChild(homeHrefElement);

    for (var c = 0; c < categories.length; c++) {
        var currentCategory = categories[c];

        if (currentCategory.Title.toUpperCase() === "INFORMATION") {
            informationEntries = currentCategory.Entries;
        } else {
            var title = currentCategory.Title;
            if (isTranslateable(title)) {
                title = getLocalizedString(title);
            }
            var id = getCategoryKey(currentCategory);
            createMenuEntry(id, currentCategory.Entries, title, list);
        }
    }

    // fixed about page - entry
    informationEntries.push({
        DisplayName: getLocalizedString("aboutCloudoguToken"),
        Href: createLink("/info/index.html")
    });
    createMenuEntry("warpc.info", informationEntries, "Information", list);

    addLogoutMenuEntry(list);

    window.addEventListener('resize', setCorrectColumnCount);

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
        addClass(warpMenuContainer, 'collapsing');
        toggleClass(menuContainer, 'menu-container-hide');
        setTimeout(function () {
            removeClass(warpMenuContainer, 'collapsing');
        }, 300);

        if (!hasClass(warpMenuContainer, 'menu-container-hide')) {
            setCorrectColumnCount();
        }
    }

    toggleResult.toggle.onclick = toggleNav;

    if (!isTooltipDisabled()) {
        warpMenuContainer.appendChild(tooltipColumn);
    }
    warpMenuContainer.appendChild(toggleResult.toggleColumn);
    warpMenuContainer.appendChild(menuContainer);

    // hide menu
    document.onclick = function (e) {
        if (e && e.target) {
            if (e.path === null || e.path === undefined) return;

            var menuIsVisible = !hasClass(menuContainer, 'menu-container-hide');
            var isClickOnMenu = e.path.indexOf(menuContainer) !== -1;
            if (menuIsVisible && !isClickOnMenu) {
                toggleNav();
            }
        }
    };

    body.appendChild(warpMenuContainer);
    resizeToggleButtonIfNeeded();
}

function setCorrectColumnCount() {
    var list = document.getElementById('warp-menu-category-list');
    var columnCount = 0;

    for (var i = 0; i < list.childNodes.length; i++) {
        var node = list.childNodes[i];
        var current = Math.floor(node.offsetLeft / 192) + 1;
        if (current > columnCount) columnCount = current;
    }

    removeClass(list, 'warp-menu-column-count-1');
    removeClass(list, 'warp-menu-column-count-2');
    removeClass(list, 'warp-menu-column-count-3');
    removeClass(list, 'warp-menu-column-count-4');
    removeClass(list, 'warp-menu-column-count-5');
    addClass(list, 'warp-menu-column-count-' + columnCount);
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
