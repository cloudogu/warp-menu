import {hasClass} from "./style.js";
import {getLocalizedString, isTranslateable} from "./translation.js";
import {getCategoryKey, isOpenCollapsible, toggleCategory} from "./toggle.js";
import {setCorrectColumnCount} from "./warp.js";
import {createHtml, createLink} from "./utils.js";


function createCategory(title, onClick, id, entries){
    const element = createHtml(`
    <li class="border-t-0 border-b border-[#23A3DD] py-[0.66666em] text-[1.1em] border-box border-x-2 border-x-brand border-solid border-y-0">
        <div class="group">
            <h3 
                id="${id}" 
                class="pl-[1.1rem] ${isOpenCollapsible(id) ? "warpmenu-category-open" : ""} warp-menu-category m-0 cursor-pointer block text-[1.17em]">
                ${title}
            </h3>
            <ul class="group-[&:not(:has(.warpmenu-category-open))]:hidden"></ul>
        </div
    </li
    `);

    const categoryHeader = element.firstElementChild.firstElementChild;
    categoryHeader.onclick = onClick;
    const categoryLinkList = categoryHeader.nextElementSibling;

    for (let i = 0; i < entries.length; i++) {
        categoryLinkList.appendChild(createCategoryListEntry(entries[i]));
    }

    return element;
}


/**
 * @param {{Target?: string, Href: string, Title: string, DisplayName: string}} currentEntry
 * @returns {HTMLElement}
 */
function createCategoryListEntry(currentEntry){
    const isExternal = !!currentEntry.Target && currentEntry.Target === 'external';
    const cls = "inline-block mt-2 mb-0 pt-1 pb-1 text-left no-underline warp-menu-target-link hover:bg-[#23A3DD] pl-[1.28333em] cursor-pointer"
    return createHtml(`
    <li>
         <a 
         href="${createLink(currentEntry.Href)}" 
         class="warp-menu-target-link ${(isExternal) ? "ces-external-link" : ""} ${cls}" 
         target="${(isExternal) ? "_blank" : "_top"}">
         ${isTranslateable(currentEntry.Title) ? getLocalizedString(currentEntry.Title) : currentEntry.DisplayName}
        </a>
    </li>
    `);
}

function createMenuEntry(id, entries, title, list) {
    list.appendChild(createCategory(title, toggleCategory, id, entries));
}

/**
 *
 * @param {Array<{Title: string, Entries: Array}>} categories
 * @returns {HTMLElement}
 */
function createMenuElement(categories){
    const containerLgstyles = "warp-lg:overflow-x-auto warp-lg:max-w-[calc(100vw-3.5em)] [&:not(.menu-container-hide)]:warp-lg:shadow-[9px_0px_30px_-12px_black]";
    const listLgStyles = "warp-lg:py-[1.33333em] warp-lg:inline-block warp-lg:[column-width:245px] warp-lg:[column-fill:auto] warp-lg:h-screen warp-lg:[column-gap:0]";
    const element = createHtml(`
    <div 
        aria-hidden="true" id="warp-menu-column-menu" 
        class="warp-menu-column-menu menu-container-hide overflow-hidden pointer-events-auto transition-[box-shadow_300ms_ease-in-out] ${containerLgstyles}"
    >
        <div id="warp-menu-shift-container" class="warp-menu-shift-container inline-block relative z-[1]">
            <div class="warp-menu-gradient-overlay">
            </div>  
            <ul id="warp-menu-category-list" class="warp-menu-category-list ${listLgStyles} bg-brand-strong">
                <li class="border-box border-x-2 border-x-brand border-solid border-y-0">
                    <div class="warp-menu-home-button block text-center">
                        <div class="img inline-block w-[78.36px] h-[48px] bg-[url('images/blib-white-160px.png')] bg-[length:100%]"></div>                                                    
                    </div>  
                </li>
            </ul>
        </div>          
    </div>
    `);
    const list = element.querySelector("#warp-menu-category-list");

    for (let c = 0; c < categories.length; c++) {
        const currentCategory = categories[c];
        let title = currentCategory.Title;
        if (isTranslateable(title)) {
            title = getLocalizedString(title);
        }
        const id = getCategoryKey(currentCategory);
        createMenuEntry(id, currentCategory.Entries, title, list);
    }

    list.appendChild(createLogoutPlaceholder());
    list.appendChild(createLogout());

    return element;
}

export function createMenu(categories) {
    const menuContainer = createMenuElement(categories);

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

export function setMenuCorrectPosition() {
    const container = document.getElementById('warp-menu-container');
    const menu = document.getElementById('warp-menu-column-menu');
    const largeScreen = window.matchMedia("(min-width: 897px)");

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

function createLogoutPlaceholder(){
    return createHtml(`
    <li class="warp-menu-logout-placeholder">
        <div>&nbsp;</div>  
    </li>
    `);
}

function createLogout(){
    return createHtml(`
    <li class="warp-menu-logout-list-element border-x-0 border-b-0 border-t border-[#23A3DD] py-[0.66666em] text-[1.1em] border-solid">
        <a 
            href="${createLink('/cas/logout')}" 
            class="w-full inline-block warp-menu-logout-link cursor-pointer pl-[1.28333em] hover:bg-[#23A3DD]">
            ${getLocalizedString("ecosystemLogoutToken")}
        </a> 
    </li>
    `);
}
