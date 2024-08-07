var desktopViewColumnWidthInPx = 245;

var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];


function initWarpMenu(categories) {
    var warpMenuContainer = document.createElement('div');
    addClass(warpMenuContainer, 'warp-menu-container');
    addClass(warpMenuContainer, 'print-hidden');
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
            const menuIsVisible = !hasClass(menuContainer, 'menu-container-hide');
            const targetParent = e.target.closest('#warp-menu-container');
            const isClickOnMenu = targetParent !== undefined && targetParent !== null;
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
