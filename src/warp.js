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
    var target = e.target;
    if (target && target.rel) {
        toggleClass(target, 'warpmenu-category-open');
        var el = document.getElementById(target.rel);
        if (el) {
            if (hasClass(el, 'warpmenu-collapsed')) {
                if (lss) {
                    localStorage.removeItem(target.rel + '.collapsed');
                }
                removeClass(el, 'warpmenu-collapsed');
            } else {
                if (lss) {
                    localStorage.setItem(target.rel + '.collapsed', true);
                }
                addClass(el, 'warpmenu-collapsed');
            }
        }
    }
}

function createMenuEntry(id, entries, title, nav) {
    var ul = document.createElement('ul');
    ul.id = id;
    var collapsed = false;
    if (lss) {
        collapsed = localStorage.getItem(id + '.collapsed');
    }
    if (collapsed) {
        addClass(ul, 'warpmenu-collapsed');
    }
    for (var i = 0; i < entries.length; i++) {
        var link = entries[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        if (link.Target && link.Target == 'external') {
            a.target = '_blank'
        } else {
            a.target = '_top';
        }
        a.href = createLink(link.Href);
        a.innerHTML = link.DisplayName;
        addClass(li, 'warpmenu-link');
        if (i === 0) {
            addClass(li, 'warpmenu-link-top');
        }
        li.appendChild(a);
        ul.appendChild(li);
    }

    var h3 = document.createElement('h3');
    h3.rel = id;
    addClass(h3, 'warpbtn-link');
    if (collapsed) {
        addClass(h3, 'warpmenu-category-open');
    }
    h3.onclick = toggleCategory;
    h3.innerHTML = title;
    nav.appendChild(h3);

    nav.appendChild(ul);
}

function initWarpMenu(categories) {
    addClass(body, 'warpmenu-push');

    // create html
    var nav = document.createElement('nav');
    nav.className = "warpmenu warpmenu-vertical warpmenu-right";
    nav.id = "warpmenu-s1";
    body.appendChild(nav);

    var home = document.createElement('div');
    addClass(home, 'warpmenu-home');
    var homeLink = document.createElement('a');
    homeLink.target = '_top';
    homeLink.href = createLink('/');
    var logo = document.createElement('div');
    addClass(logo, 'warpmenu-logo');
    homeLink.appendChild(logo);
    home.appendChild(homeLink);
    nav.appendChild(home);

    for (var c = 0; c < categories.length; c++) {
        var category = categories[c];

        if (category.Title.toUpperCase() === "INFORMATION") {
            informationEntries = category.Entries;
        } else {
            var id = getCategoryKey(category);
            createMenuEntry(id, category.Entries, category.Title, nav);
        }
    }

    // fixed about page - entry
    informationEntries.push({
        DisplayName: ABOUT_CLOUDOGU_TOKEN,
        Href: createLink("/info/index.html")
    });

    createMenuEntry("warpc.info", informationEntries, "Information", nav);

    var div = document.createElement('div');
    addClass(div, 'warpbtn');
    var btn = document.createElement('a');
    addClass(btn, 'warpbtn-link');

    function toggleNav() {
        toggleClass(div, 'warpbtn-open');
        toggleClass(nav, 'warpmenu-open');
        toggleClass(body, 'warpmenu-push-toleft');
    }

    btn.innerHTML = "Menü"

    div.onclick = toggleNav;
    div.appendChild(btn);

    // hide menu
    document.onclick = function (e) {
        if (e && e.target) {
            var target = e.target;
            // TODO define marker class to stop menu from collapsing
            if (hasClass(nav, 'warpmenu-open') && !hasClass(target, 'warpbtn-link') && !hasClass(target, 'warpmenu') && !hasClass(target, 'warpmenu-home')) {
                toggleNav();
            }
        }
    };

    body.appendChild(div);
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
