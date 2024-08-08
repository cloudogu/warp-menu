import {addClass, toggleClass} from "./style.js";
import {setCorrectColumnCount} from "./warp.js";
import {getLocalizedString} from "./translation.js";
import {isLocalStorageSupported} from "./utils.js";

var lss = isLocalStorageSupported();

export function toggleCollapsedInStorage(id) {
    if (!lss) return;

    if (localStorage.getItem(id) === null || localStorage.getItem(id) === 'true') {
        localStorage.setItem(id, 'false');
    } else {
        localStorage.setItem(id, 'true');
    }
}

export function isOpenCollapsible(id) {
    if (!lss) return true;

    return localStorage.getItem(id) === 'true' || localStorage.getItem(id) === null;
}

export function getCategoryKey(category) {
    return "warpc." + category.Title.toLowerCase().replace(/\s+/g, "_");
}

export function toggleCategory(e) {
    var target = e.target;
    toggleClass(target, 'warpmenu-category-open');
    toggleCollapsedInStorage(target.id);
    setCorrectColumnCount();
}


export function createToggleButton() {
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
