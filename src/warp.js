import {addStylesheet, hasClass} from "./style.js";
import {createHtml} from "./utils.js";
import {ajax} from "./ajax.js";
import {getLocalizedString, isTranslateable} from "./translation.js";

/**
 * @typedef {Object} Entry
 * @property {string} DisplayName - The display name of the entry.
 * @property {string} Href - The href/link for the entry.
 * @property {string} Title - The title or description of the entry.
 * @property {string} [Target] - The target attribute, typically used for external links. Optional.
 */

/**
 * @typedef {Object} Section
 * @property {string} Title - The title of the section.
 * @property {number} [Order] - The order of the section, if applicable. Optional.
 * @property {Entry[]} Entries - An array of entries within the section.
 */

/**
 * @type {Section[]}
 */

var desktopViewColumnWidthInPx = 245;

export var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];

/**
 *
 * @param category {Section}
 * @returns {HTMLObjectElement}
 */
export function createCategory(category) {
    return `<details class="border-warp-border border-b w-60">
                <summary
                        class="px-default-2x py-default desktop:text-desktop-xl mobile:text-mobile-xl cursor-pointer focus-visible:ces-focused outline-none
                           focus-visible:text-warp-text-hover active:text-warp-text-active
                           focus-visible:bg-warp-bg-hover active:bg-warp-bg-active"
                >
                    ${isTranslateable(category.Title) ? getLocalizedString(category.Title) : category.Title}
                </summary>
                <ul>
                    <li>
                    ${category.Entries.map(e => `
                        <a 
                        href="${e.Href}"
                        target="${(!!e.Target && e.Target === 'external' ) ? "_blank": "_top"}" 
                        class="my-default-1/2 py-default-1/2 no-underline block px-default-2x text-warp-text cursor-pointer focus-visible:ces-focused outline-none
                           hover:text-warp-text-hover focus-visible:text-warp-text-hover active:text-warp-text-active
                           hover:bg-warp-bg-hover focus-visible:bg-warp-bg-hover active:bg-warp-bg-active">
                           ${isTranslateable(e.Title) ? getLocalizedString(e.Title) : e.DisplayName}
                       </a>
                    `).join("")}
                    </li>
                </ul>
            </details>`;
}

/**
 *
 * @param categories {Section[]}
 * @returns {HTMLObjectElement}
 */
export function initWarpMenu(categories) {
    const warpMenuRoot = createHtml(`
<div id="warp-menu-root" class="relative overflow-hidden w-screen h-screen">
    <div id="warp-menu-container"
         class="fixed right-0 w-screen h-screen pointer-events-none flex flex-row justify-end transition-[right] duration-[600ms] ease-in-out">
        <div class="flex items-center w-14">
            <button id="warp-toggle"
                    class="pointer-events-auto rotate-[-90deg] rounded-t-lg focus-visible:ces-focused whitespace-nowrap px-[14px] h-10
                    desktop:text-desktop-regular mobile:text-mobile-regular bg-warp-bg hover:bg-warp-bg-hover
                    focus-visible:bg-warp-bg-hover active:bg-warp-bg-active border-2 border-warp-border
                    hover:border-warp-border-hover focus-visible:border-warp-border-hover active:border-warp-border-active
                    text-warp-text outline-0 border-b-0">
                ${getLocalizedString("menuToken")}
            </button>
        </div>
        <div id="warp-menu" class="pointer-events-auto flex flex-col text-warp-text flex-wrap border-warp-border border-box border-solid w-fit bg-[var(--warp-bg)] bg-[repeating-linear-gradient(90deg,var(--warp-border)_0px,var(--warp-border)_1px,var(--warp-bg)_1px,var(--warp-bg)_15rem)] bg-repeat-x">
            <div class="border-warp-border border-b flex flex-row justify-center items-center w-60 py-default ">
                <img class="content-[var(--warp-logo)] max-w-32" alt="Cloudogu logo">
            </div>
            ${categories.map(c => createCategory(c)).join("")}
            <div class="grow flex flex-col justify-end w-60">
                <div class="border-warp-border p-default border-t px-default">
                    <a class="text-center inline-block text-warp-text hover:bg-warp-bg-hover focus-visible:bg-warp-bg-hover active:bg-warp-bg-active cursor-pointer w-full h-full">
                        ${getLocalizedString("ecosystemLogoutToken")}
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
    `);

    const warpToggle = warpMenuRoot.querySelector("#warp-toggle");
    warpToggle.onclick = () => {
        const warpMenuWidth = warpMenuRoot.querySelector("#warp-menu").getBoundingClientRect().width
        const warpRoot = warpMenuRoot.querySelector("#warp-menu-container");
        if (warpRoot.style.right.match("^0?[ ]?(px)?$")) {
            warpRoot.style.right = `-${warpMenuWidth}px`;
        } else {
            warpRoot.style.right = `0`;
        }
    };

    Array.from(warpMenuRoot.querySelectorAll("#warp-menu-root summary")).forEach(d => {
        d.onclick = () => {
            const element = warpMenuRoot.querySelector("#warp-menu-container > div:last-child");
            element.style.width = `${element.getBoundingClientRect().width}px`;
            requestAnimationFrame(() => {
                element.style.width = "";
            });
        };
    });

    body.appendChild(warpMenuRoot);
}

export function setCorrectColumnCount() {
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

export function loaded(menu) {
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
    addStylesheet(cesWarpMenuWarpCssUrl ?? '/warp/warp.css', function (success) {
        if (success) {
            loaded();
        }
    });

    // load model
    asyncCounter++;
    ajax(cesWarpMenuMenuJsonUrl ?? '/warp/menu.json', loaded);
}
