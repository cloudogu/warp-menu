var baseUrl = '';
var desktopViewColumnWidthInPx = 245;

var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];

var informationEntries = [];

var lss = isLocalStorageSupported();

function toggleCollapsedInStorage(id) {
    if (!lss) return;

    if (localStorage.getItem(id) === null || localStorage.getItem(id) === 'true') {
        localStorage.setItem(id, 'false');
    } else {
        localStorage.setItem(id, 'true');
    }
}

function isOpenCollapsible(id) {
    if (!lss) return true;

    return localStorage.getItem(id) === 'true' || localStorage.getItem(id) === null;
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
            "myCloudogu": "myCloudogu",
            "aboutCloudoguToken": "&Uuml;ber Cloudogu",
            "menuToken": "Men&uuml;",
            "ecosystemLogoutToken": "EcoSystem Logout",
            "onboardingTextToken": "Klicken Sie auf „Men&uuml;“, um ihre Tools zu sehen. Das Men&uuml; verbindet ihre Toolchain und ist von jedem Tool aus zug&auml;nglich.",
            "onboardingHintToken": "Hinweis nicht mehr anzeigen",
            "Development Apps": "Entwicklung",
            "Administration Apps": "Administration",
            "Documentation": "Dokumentation",
            "docsCloudoguComUrl": "Cloudogu EcoSystem Docs"
        };
    } else {
        return {
            "myCloudogu": "myCloudogu",
            "aboutCloudoguToken": "About Cloudogu",
            "menuToken": "Menu",
            "ecosystemLogoutToken": "EcoSystem Logout",
            "onboardingTextToken": "Click “Menu” to view all tools. That menu connects your toolchain and is available from any tool.",
            "onboardingHintToken": "Do not show this hint again",
            "Development Apps": "Development Apps",
            "Administration Apps": "Administration Apps",
            "Documentation": "Documentation",
            "docsCloudoguComUrl": "Cloudogu EcoSystem Docs"
        };
    }
}

function toggleCategory(e) {
    var target = e.target;
    toggleClass(target, 'warpmenu-category-open');
    toggleCollapsedInStorage(target.id);
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
        var currentEntry = entries[i];
        var categoryListItem = document.createElement('li');
        var categoryListItemLink = document.createElement('a');
        addClass(categoryListItemLink, 'warp-menu-target-link');

        if (currentEntry.Target && currentEntry.Target === 'external') {
            categoryListItemLink.target = '_blank';
            addClass(categoryListItemLink, 'external');
        } else {
            categoryListItemLink.target = '_top';
        }
        categoryListItemLink.href = createLink(currentEntry.Href);

        // translate support entries which come without a display name
        categoryListItemLink.innerHTML = currentEntry.DisplayName;
        if(isTranslateable(currentEntry.Title)){
            categoryListItemLink.innerHTML = getLocalizedString(currentEntry.Title)
        }

        categoryListItem.appendChild(categoryListItemLink);
        categoryLinkList.appendChild(categoryListItem);
    }

    categoryInsideContainer.appendChild(categoryHeader);
    categoryInsideContainer.appendChild(categoryLinkList);
    category.appendChild(categoryInsideContainer);
    list.appendChild(category);
}

function createToggleButton() {
    var toggleColumn = document.createElement('div');
    addClass(toggleColumn, 'warp-menu-column-toggle');

    var toggle = document.createElement('button');
    addClass(toggle, 'warpbtn');
    toggle.setAttribute('aria-haspopup', 'listbox');
    toggle.id = 'warp-menu-warpbtn';
    toggle.innerHTML = getLocalizedString("menuToken");
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
    text.innerHTML = getLocalizedString("onboardingTextToken");
    tooltipLabel.appendChild(text);
    var hint = document.createElement('p');
    addClass(hint, 'warp-onboarding-hint');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    var hintText = document.createElement('span');
    hintText.innerHTML = getLocalizedString("onboardingHintToken");

    hint.appendChild(hintText);
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
    var placeholder = document.createElement('li');
    addClass(placeholder, 'warp-menu-logout-placeholder');
    var placeholderChild = document.createElement('div');
    placeholderChild.innerHTML = '&nbsp;';
    placeholder.appendChild(placeholderChild);

    var logout = document.createElement('li');
    addClass(logout, 'warp-menu-logout-list-element');
    var logoutHref = document.createElement('a');
    addClass(logoutHref, 'warp-menu-logout-link');
    logoutHref.innerHTML = getLocalizedString("ecosystemLogoutToken");
    logoutHref.href = createLink('/cas/logout');
    logout.appendChild(logoutHref);
    list.appendChild(placeholder);
    list.appendChild(logout);
}

function createHomeWithImage() {
    var homeListElement = document.createElement('li');
    var homeContainer = document.createElement('div');
    addClass(homeContainer, 'warp-menu-home-button');
    var homeImage = document.createElement('div');
    addClass(homeImage, 'img');
    homeContainer.appendChild(homeImage);
    homeListElement.appendChild(homeContainer);
    return homeListElement;
}

function createMenu(categories) {
    var menuContainer = document.createElement('div');
    menuContainer.id = 'warp-menu-column-menu';
    addClass(menuContainer, 'warp-menu-column-menu');
    addClass(menuContainer, 'menu-container-hide');

    var shiftContainer = document.createElement('div');
    shiftContainer.id = 'warp-menu-shift-container';
    addClass(shiftContainer, 'warp-menu-shift-container');
    menuContainer.appendChild(shiftContainer);

    var overlay = document.createElement('div');
    addClass(overlay, 'warp-menu-gradient-overlay');
    shiftContainer.appendChild(overlay);

    var list = document.createElement('ul');
    addClass(list, 'warp-menu-category-list');
    list.id = 'warp-menu-category-list';
    shiftContainer.appendChild(list);

    var homeElement = createHomeWithImage();
    list.appendChild(homeElement);

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

    addLogoutMenuEntry(list);

    window.addEventListener('resize', setCorrectColumnCount);
    window.addEventListener('resize', setMenuCorrectPosition);

    window.addEventListener('orientationchange', function () {
        // Can only be done in next frame. Won't work otherwise
        window.requestAnimationFrame(function () {
            setMenuCorrectPosition();
        });
    });

    // Timeout is needed here. Won't work otherwise
    window.addEventListener('resize', function () {
        // Can only be done in next frame. Won't work otherwise
        window.requestAnimationFrame(function () {
            setMenuCorrectPosition();
        });
    });

    return menuContainer;
}

function setMenuCorrectPosition() {
    var container = document.getElementById('warp-menu-container');
    var menu = document.getElementById('warp-menu-column-menu');
    var largeScreen = window.matchMedia("(min-width: 897px)");

    // Move the warp menu into screen (So it is visible)
    container.style.right = 0;

    // In any case we need to set top and bottom to null. Menu won't be hidden otherwise in mobile mode.
    container.style.bottom = null;
    container.style.top = null;

    if (largeScreen.matches) {
        container.style.top = 0;
    } else {
        container.style.bottom = 0;
    }

    // When it should be hidden, move it to outside the screen.
    if (largeScreen.matches && hasClass(menu, 'menu-container-hide')) {
        if (hasClass(menu, 'menu-container-hide')) {
            container.style.right = -menu.clientWidth + "px";
        }
    } else if (hasClass(menu, 'menu-container-hide')) {
        if (hasClass(menu, 'menu-container-hide')) {
            container.style.bottom = -menu.clientHeight + "px";
        }
    }
}

function initWarpMenu(categories) {
    var warpMenuContainer = document.createElement('div');
    addClass(warpMenuContainer, 'warp-menu-container');
    addClass(warpMenuContainer, 'notransition');
    warpMenuContainer.id = 'warp-menu-container';

    var tooltipColumn = createTooltip();
    var toggleResult = createToggleButton();
    var menuContainer = createMenu(categories);

    function toggleNav() {
        var warpButton = document.getElementById("warp-menu-warpbtn");
        if (hasClass(warpMenuContainer, 'collapsing')) {
            return;
        }
        removeClass(warpMenuContainer, 'notransition');

        addClass(warpMenuContainer, 'collapsing');
        toggleClass(menuContainer, 'menu-container-hide');
        setTimeout(function () {
            removeClass(warpMenuContainer, 'collapsing');
        }, 300);

        if (!hasClass(warpMenuContainer, 'menu-container-hide')) {
            setCorrectColumnCount();
        }

        setMenuCorrectPosition();
        setTimeout(function () {
            addClass(warpMenuContainer, 'notransition')
        }, 600);
        if (warpButton.hasAttribute('aria-expanded')) {
            warpButton.removeAttribute('aria-expanded');
        } else {
            warpButton.setAttribute('aria-expanded', 'true');
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

    setCorrectVh();
    window.addEventListener('resize', setCorrectVh);
    setCorrectColumnCount();
    setMenuCorrectPosition();
}

function setCorrectColumnCount() {
    var list = document.getElementById('warp-menu-category-list');
    var shiftContainer = document.getElementById('warp-menu-shift-container');
    var columnCount = 0;

    for (var i = 0; i < list.childNodes.length; i++) {
        var node = list.childNodes[i];
        var current = Math.floor(node.offsetLeft / desktopViewColumnWidthInPx) + 1;

        if (hasClass(node, 'warp-menu-logout-list-element'))
            continue; // Skip logout button because it is positioned outside of list

        if (current > columnCount) columnCount = current;
    }
    list.style.columnCount = null;
    shiftContainer.style.width = null;

    var largeScreen = window.matchMedia('(min-width: 897px)');
    if (largeScreen.matches) {
        shiftContainer.style.width = 'calc(' + columnCount + ' * ' + desktopViewColumnWidthInPx + 'px)';
        list.style.columnCount = columnCount;
    }
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

// According to https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// This trick is used to get the correct height on mobile devices.
function setCorrectVh() {
    var correctVh = (window.innerHeight * 0.01) + 'px';
    // This is used to calculate correct inner height of the display
    document.getElementById('warp-menu-container').style.setProperty('--vh', correctVh);
}
