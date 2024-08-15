import {addClass, hasClass} from "./style.js";
import {getLocalizedString, isTranslateable} from "./translation.js";
import {getCategoryKey, isOpenCollapsible, toggleCategory} from "./toggle.js";
import {setCorrectColumnCount} from "./warp.js";
import {createLink} from "./utils.js";


function createMenuEntry(id, entries, title, list) {
    let category = document.createElement('li');
    let categoryInsideContainer = document.createElement('div');

    let categoryHeader = document.createElement('h3');
    categoryHeader.innerHTML = title;
    categoryHeader.onclick = toggleCategory;
    categoryHeader.id = id;
    if (isOpenCollapsible(categoryHeader.id)) {
        addClass(categoryHeader, 'warpmenu-category-open');
    }

    let categoryLinkList = document.createElement('ul');

    for (let i = 0; i < entries.length; i++) {
        let currentEntry = entries[i];
        let categoryListItem = document.createElement('li');
        let categoryListItemLink = document.createElement('a');
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
        if (isTranslateable(currentEntry.Title)) {
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

export function createMenu(categories) {
    const menuContainer = document.createElement('div');
    menuContainer.id = 'warp-menu-column-menu';
    addClass(menuContainer, 'warp-menu-column-menu');
    addClass(menuContainer, 'menu-container-hide');

    const shiftContainer = document.createElement('div');
    shiftContainer.id = 'warp-menu-shift-container';
    addClass(shiftContainer, 'warp-menu-shift-container');
    menuContainer.appendChild(shiftContainer);

    const overlay = document.createElement('div');
    addClass(overlay, 'warp-menu-gradient-overlay');
    shiftContainer.appendChild(overlay);

    const list = document.createElement('ul');
    addClass(list, 'warp-menu-category-list');
    list.id = 'warp-menu-category-list';
    shiftContainer.appendChild(list);

    const homeElement = createHomeWithImage();
    list.appendChild(homeElement);

    for (let c = 0; c < categories.length; c++) {
        let currentCategory = categories[c];

        let title = currentCategory.Title;
        if (isTranslateable(title)) {
            title = getLocalizedString(title);
        }
        let id = getCategoryKey(currentCategory);
        createMenuEntry(id, currentCategory.Entries, title, list);
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

    // menu in default state should be hidden also to screen-readers
    menuContainer.setAttribute('aria-hidden', 'true');

    return menuContainer;
}

export function setMenuCorrectPosition() {
    let container = document.getElementById('warp-menu-container');
    let menu = document.getElementById('warp-menu-column-menu');
    let largeScreen = window.matchMedia("(min-width: 897px)");

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

export function createHomeWithImage() {
    let homeListElement = document.createElement('li');
    let homeContainer = document.createElement('div');
    addClass(homeContainer, 'warp-menu-home-button');
    let homeImage = document.createElement('div');
    addClass(homeImage, 'img');
    homeContainer.appendChild(homeImage);
    homeListElement.appendChild(homeContainer);
    return homeListElement;
}

export function addLogoutMenuEntry(list) {
    let placeholder = document.createElement('li');
    addClass(placeholder, 'warp-menu-logout-placeholder');
    let placeholderChild = document.createElement('div');
    placeholderChild.innerHTML = '&nbsp;';
    placeholder.appendChild(placeholderChild);

    let logout = document.createElement('li');
    addClass(logout, 'warp-menu-logout-list-element');
    let logoutHref = document.createElement('a');
    addClass(logoutHref, 'warp-menu-logout-link');
    logoutHref.innerHTML = getLocalizedString("ecosystemLogoutToken");
    logoutHref.href = createLink('/cas/logout');
    logout.appendChild(logoutHref);
    list.appendChild(placeholder);
    list.appendChild(logout);
}
