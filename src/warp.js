import {addClass, addStylesheet, hasClass, removeClass, toggleClass} from "./style.js";
import {createTooltip, isTooltipDisabled} from "./tooltip.js";
import {createToggleButton} from "./toggle.js";
import {createMenu, setMenuCorrectPosition} from "./menu.js";
import {setCorrectVh} from "./utils.js";
import {ajax} from "./ajax.js";


export class Warp extends HTMLElement{

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: "open"});
        fetch('warp/warp.css').then(response => response.text()).then(css => {
            const style = document.createElement("style");
            style.textContent = css;
            shadowRoot.appendChild(style);
        })
    }
    
    _asyncCounter = 0;
    _model;

    initWarpMenu(categories) {
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

        this.shadowRoot.appendChild(warpMenuContainer);
        // body.appendChild(warpMenuContainer);

        setCorrectVh();
        window.addEventListener('resize', setCorrectVh);
        this.setCorrectColumnCount();
        setMenuCorrectPosition();
    }

    get asyncCounter() {
        return this._asyncCounter;
    }

    set asyncCounter(counter) {
        this._asyncCounter = counter;
    }

    get model() {
        return this._model;
    }

    set model(model) {
        this._model = model;
    }
}


export function setCorrectColumnCount() {
    var list = warp.shadowRoot.getElementById('warp-menu-category-list');
    var shiftContainer = warp.shadowRoot.getElementById('warp-menu-shift-container');
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

function loaded(menu) {
    if (menu) {
        warp.model = menu;
    }
    warp.asyncCounter--;

    if (warp.asyncCounter === 0) {
        warp.initWarpMenu(warp.model);
    }
}

customElements.define("warp-menu", Warp)
export const warp = document.querySelector('warp-menu');
export var head = document.getElementsByTagName('head')[0];

var desktopViewColumnWidthInPx = 245;
var body = document.getElementsByTagName('body')[0];

if (!hasClass(body, 'warpmenu-push') && (self === top || window.pmaversion)) {
    // load css
    warp.asyncCounter++;
    addStylesheet('/warp/warp.css', function (success) {
        if (success) {
            window.onload = loaded;
        }
    });

    // load model
    warp.asyncCounter++;
    ajax('/warp/menu.json', loaded);
}
