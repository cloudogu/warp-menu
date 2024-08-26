import {addStylesheet, hasClass} from "./style.js";
import {createHtml, svgCaretDown, svgCaretRight, svgExternalLink, svgLogout} from "./utils.js";
import {ajax} from "./ajax.js";
import {getLocalizedString, isTranslateable} from "./translation.js";
import {getCategoryKey, isOpenCollapsible, toggleCollapsedInStorage} from "./toggle.js";
import {createTooltip} from "./tooltip.js";

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

export function isWarpMenuOpen() {
    const warpMenuRoot = document.getElementById("warp-menu-root");
    return warpMenuRoot.classList.contains("open");
}

export function toggleWarpMenu(hideAnimation) {
    const warpMenuRoot = document.getElementById("warp-menu-root");
    if (isWarpMenuOpen()){
        warpMenuRoot.classList.remove("open");
        Array.from(warpMenuRoot.querySelectorAll("summary, a")).forEach(e => {
            e.tabIndex = "-1";
        });
    } else {
        warpMenuRoot.classList.add("open");
        Array.from(warpMenuRoot.querySelectorAll("summary, a")).forEach(e => {
            e.removeAttribute("tabindex");
        });
    }

    setWarpMenuPosition(hideAnimation);
}

export function isDesktopMode() {
    return (window.innerWidth ?? 0) >= 897;
}

export function setWarpMenuPosition(hideAnimation) {
    const warpMenuRoot = document.getElementById("warp-menu-root");
    const warpMenu = warpMenuRoot.querySelector("#warp-menu");
    const warpMenuWidth = warpMenu.getBoundingClientRect().width;
    const warpMenuHeight = warpMenu.getBoundingClientRect().height;
    const warpMenuContainer = warpMenuRoot.querySelector("#warp-menu-container");

    if (!!hideAnimation){
        warpMenuContainer.remove();
    }

    if (isWarpMenuOpen()){
        warpMenu.ariaHidden = "false";

        if (isDesktopMode()){
            warpMenuContainer.style.right = `0`;
            warpMenuContainer.style.top = ``;
        } else {
            warpMenuContainer.style.right = ``;
            warpMenuContainer.style.top = `0`;
        }
    } else {
        warpMenu.ariaHidden = "true";

        if (isDesktopMode()){
            warpMenuContainer.style.top = ``;
            warpMenuContainer.style.right = `-${warpMenuWidth}px`;
        } else {
            warpMenuContainer.style.top = `${warpMenuHeight}px`;
            warpMenuContainer.style.right = ``;
        }
    }

    if (!!hideAnimation){
        warpMenuRoot.appendChild(warpMenuContainer);
    }
}


/**
 *
 * @param category {Section}
 * @returns {string}
 */
export function createCategory(category) {
    const categoryId = getCategoryKey(category);
    return `<details class="border-warp-border border-b warp-lg:w-60 not-warp-lg:w-full group h-fit break-inside-avoid">
                <summary
                        class="px-default-2x py-default desktop:text-desktop-xl mobile:text-mobile-xl cursor-pointer focus-visible:ces-focused outline-none
                           focus-visible:text-warp-text-hover active:text-warp-text-active
                           focus-visible:bg-warp-bg-hover active:bg-warp-bg-active flex flex-row items-center group/svg
                           box-border border-l border-l-transparent active:border-l-warp-border"
                       id="${categoryId}"
                >
                    <span class="w-6 h-6 inline-block group-open:hidden mr-1">${svgCaretRight}</span>                    
                    <span class="w-6 h-6 hidden group-open:inline-block mr-1">${svgCaretDown}</span>                    
                    ${isTranslateable(category.Title) ? getLocalizedString(category.Title) : category.Title}
                </summary>
                <ul>
                    <li>
                    ${category.Entries.map(e => {
        const isExternalLink = !!e.Target && e.Target === 'external';
        const linkText = isTranslateable(e.Title) ? getLocalizedString(e.Title) : e.DisplayName;
        const externalIcon = `<span class="w-[1em] h-[1em] inline-block">${svgExternalLink}</span>`;
        return `
                        <a 
                        href="${e.Href}"
                        target="${isExternalLink ? "_blank" : "_top"}" 
                        class="py-default no-underline px-default-2x text-warp-text cursor-pointer focus-visible:ces-focused outline-none
                           hover:text-warp-text-hover focus-visible:text-warp-text-hover active:text-warp-text-active break-all
                           hover:bg-warp-bg-hover focus-visible:bg-warp-bg-hover active:bg-warp-bg-active flex flex-row flex-wrap
                           items-center box-border border-l border-l-transparent border-b border-b-transparent
                           hover:border-l-warp-border active:border-l-warp-border focus-visible:border-l-warp-border
                           hover:border-b-warp-border active:border-b-warp-border focus-visible:border-b-warp-border">
                           ${linkText.split(" ").reduce((a,b) => `${a}<span>${b}&nbsp;</span>`, "")}
                            ${(isExternalLink) ? externalIcon : ""}
                       </a>
                    `;
    }).join("")}
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
    const fallbackLogoValue = getComputedStyle(document.documentElement).getPropertyValue("--warp-logo-internal");
    const actualLogoValue = getComputedStyle(document.documentElement).getPropertyValue("--warp-logo");
    const hasChangedLogo = fallbackLogoValue !== actualLogoValue;
    const warpMenuRoot = createHtml(`
<div id="warp-menu-root" class="z-[9997] absolute overflow-hidden w-screen h-screen pointer-events-none no-print group/root">
    <div id="warp-menu-container"
         class="fixed warp-lg:right-0 not-warp-lg:left-0 not-warp-lg:top-0 w-screen h-screen pointer-events-none flex 
                warp-lg:flex-row not-warp-lg:flex-col justify-end transition-[top,right] duration-[600ms] ease-in-out">
        <div class="flex items-center warp-lg:w-14 not-warp-lg:w-screen not-warp-lg:justify-end">
            <button id="warp-toggle"
                    class="pointer-events-auto warp-lg:rotate-[-90deg] rounded-t-lg focus-visible:ces-focused 
                    whitespace-nowrap px-[14px] h-10 desktop:text-desktop-regular mobile:text-mobile-regular 
                    bg-warp-bg hover:bg-warp-bg-hover focus-visible:bg-warp-bg-hover active:bg-warp-bg-active
                    border-2 border-warp-border hover:border-warp-border-hover focus-visible:border-warp-border-hover 
                    active:border-warp-border-active text-warp-text outline-0 border-b-0 not-warp-lg:border-r-0 
                    not-warp-lg:rounded-tr-none" aria-haspopup="listbox">
                ${getLocalizedString("menuToken")}
            </button>
        </div>
        <div
            id="warp-menu" 
            class="not-warp-lg:w-screen pointer-events-auto warp-lg:flex warp-lg:flex-col text-warp-text 
                   warp-lg:flex-wrap border-warp-border border-box border-solid w-fit bg-[var(--warp-bg)] 
                   warp-lg:bg-[repeating-linear-gradient(90deg,var(--warp-border)_0px,var(--warp-border)_1px,var(--warp-bg)_1px,var(--warp-bg)_15rem)] 
                   warp-md:bg-[repeating-linear-gradient(90deg,var(--warp-border)_0px,var(--warp-border)_1px,var(--warp-bg)_1px,var(--warp-bg)_33.33%)] warp-md:columns-3
                   warp-sm:bg-[repeating-linear-gradient(90deg,var(--warp-border)_0px,var(--warp-border)_1px,var(--warp-bg)_1px,var(--warp-bg)_50%)] warp-sm:columns-2
                   warp-xs:bg-[repeating-linear-gradient(90deg,var(--warp-border)_0px,var(--warp-border)_1px,var(--warp-bg)_1px,var(--warp-bg)_100%)] warp-xs:columns-1
                   bg-repeat-x not-warp-lg:border-t not-warp-lg:border-t-warp-border not-warp-lg:gap-0  not-warp-lg:h-auto 
                   not-warp-lg:overflow-y-scroll scroll-hide relative
                   group-[&:not(.open)]/root:select-none group-[&:not(.open)]/root:pointer-events-none"
            aria-hidden="true"
        >
            <div class="not-warp-lg:h-fit border-warp-border border-b flex flex-col justify-center items-center warp-lg:w-60 not-warp-lg:w-full 
                        py-default gap-default relative">
                    <div class="py-default pb-default-2x bg-warp-logo-bg w-48 flex flex-row justify-center items-center rounded">
                        <img class="content-[var(--warp-logo)] max-w-32" alt="Cloudogu logo">
                    </div>
                    ${(hasChangedLogo) ? `<span>${getLocalizedString("poweredBy")}</span>` : ""}
            </div>
            ${categories.map(c => createCategory(c)).join("")}
            <div class="grow warp-lg:flex flex-col justify-end warp-lg:w-60 not-warp-lg:w-full warp-xs:w-full">
                <div class="border-warp-border warp-lg:border-t not-warp-lg:border-b">
                    <a 
                        href="${window?.location?.origin ?? ""}/cas/logout"
                        class="py-default no-underline px-default-2x text-warp-text cursor-pointer focus-visible:ces-focused outline-none
                           hover:text-warp-text-hover focus-visible:text-warp-text-hover active:text-warp-text-active break-all
                           hover:bg-warp-bg-hover focus-visible:bg-warp-bg-hover active:bg-warp-bg-active flex flex-row flex-wrap
                           items-center box-border border-l border-l-transparent border-b border-b-transparent
                           hover:border-l-warp-border active:border-l-warp-border focus-visible:border-l-warp-border
                           hover:border-b-warp-border active:border-b-warp-border focus-visible:border-b-warp-border"
                    >
                        <span class="w-[1em] h-[1em] mr-default">${svgLogout}</span>
                        ${getLocalizedString("ecosystemLogoutToken")}
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
    `);
    
    // Add tooltip as first child
    // warpMenuRoot.querySelector("#warp-menu-container").prepend(createTooltip());

    body.appendChild(warpMenuRoot);

    document.body.addEventListener("click", (ev) => {
        const warpMenuRoot = document.getElementById("warp-menu-root");
        if (!warpMenuRoot.contains(ev.target) && isWarpMenuOpen()) {
            toggleWarpMenu(false);
        }
    })

    document.body.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape" && isWarpMenuOpen()) {
            toggleWarpMenu(false);
        }
    })

    const warpToggle = warpMenuRoot.querySelector("#warp-toggle");
    warpToggle.onclick = () => {toggleWarpMenu(false)};

    const summaries = Array.from(warpMenuRoot.querySelectorAll("summary"));
    for (const s of summaries) {
        s.parentNode.open = isOpenCollapsible(s.id);
        s.onclick = () => {
            const element = warpMenuRoot.querySelector("#warp-menu-container > div:last-child");
            element.style.width = `${element.getBoundingClientRect().width}px`;
            requestAnimationFrame(() => {
                element.style.width = "";
            });
            toggleCollapsedInStorage(s.id);
        };
    }

    setWarpMenuPosition(true);

    window.addEventListener("resize", () => {
        setWarpMenuPosition(true);
    })
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
    addStylesheet((typeof cesWarpMenuWarpCssUrl !== "undefined") ? cesWarpMenuWarpCssUrl : '/warp/warp.css', function (success) {
        if (success) {
            loaded();
        }
    });

    // load model
    asyncCounter++;
    ajax((typeof cesWarpMenuMenuJsonUrl !== "undefined") ? cesWarpMenuMenuJsonUrl : '/warp/menu.json', loaded);
}
