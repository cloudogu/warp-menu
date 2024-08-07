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

function getCategoryKey(category) {
    return "warpc." + category.Title.toLowerCase().replace(/\s+/g, "_");
}

function toggleCategory(e) {
    var target = e.target;
    toggleClass(target, 'warpmenu-category-open');
    toggleCollapsedInStorage(target.id);
    setCorrectColumnCount();
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
