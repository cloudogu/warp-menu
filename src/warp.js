import {hasClass, createHtml, svgCaretDown, svgCaretRight, svgExternalLink, svgLogout, fetchWarpJson} from "./utils.js";
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
 * @type {HTMLHeadElement}
 */
export const head = document.getElementsByTagName('head')[0];

/**
 * @type {HTMLBodyElement}
 */
const body = document.getElementsByTagName('body')[0];

let shadowRootDocument = document.documentElement;

export function isWarpMenuOpen() {
    const warpMenuRoot = shadowRootDocument.getElementById("warp-menu-root");
    return warpMenuRoot.classList.contains("open");
}

export function toggleWarpMenu(hideAnimation) {
    const toggleButton = shadowRootDocument.getElementById("warp-toggle");
    const warpMenuRoot = shadowRootDocument.getElementById("warp-menu-root");
    console.log("start toggle");
    if (isWarpMenuOpen()) {
        console.log("remove open");
        warpMenuRoot.classList.remove("open");
        toggleButton.ariaExpanded = "false";
        Array.from(warpMenuRoot.querySelectorAll("summary, a")).forEach(e => {
            e.tabIndex = "-1";
        });
    } else {
        console.log("add open");
        warpMenuRoot.classList.add("open");
        toggleButton.ariaExpanded = "true";
        Array.from(warpMenuRoot.querySelectorAll("summary, a")).forEach(e => {
            e.removeAttribute("tabindex");
        });
    }

    requestAnimationFrame(() => {
        setWarpMenuPosition(hideAnimation);
    });
}

export function isDesktopMode() {
    return (window.innerWidth ?? 0) >= 897;
}

export function setWarpMenuPosition(hideAnimation) {
    const warpMenuRoot = shadowRootDocument.getElementById("warp-menu-root");
    const warpMenu = warpMenuRoot.querySelector("#warp-menu");
    warpMenu.style.width = ``;
    warpMenu.firstElementChild.style.width = ``;
    const warpMenuWidth = warpMenu.scrollWidth;
    const warpMenuHeight = warpMenu.getBoundingClientRect().height;
    const warpMenuContainer = warpMenuRoot.querySelector("#warp-menu-container");
    const toggleButtonWidth = Number(getComputedStyle(warpMenuRoot.querySelector("div:has(>#warp-toggle)")).width.replace("px", ""));
    const tooltipColumnWidth = Number(getComputedStyle(warpMenuRoot.querySelector("#warp-menu-column-tooltip")).width.replace("px", "").replace("auto", "0"));
    const offset = Math.min(document.documentElement.clientWidth - toggleButtonWidth - tooltipColumnWidth, warpMenuWidth);

    if (!!hideAnimation) {
        warpMenuContainer.remove();
    }

    if (isDesktopMode()) {
        warpMenu.style.width = `${warpMenuWidth}px`;
        warpMenu.firstElementChild.style.width = `${warpMenuWidth}px`;
    }


    if (isWarpMenuOpen()) {
        warpMenu.ariaHidden = "false";

        if (isDesktopMode()) {
            warpMenuContainer.style.right = `0`;
            warpMenuContainer.style.top = ``;
        } else {
            warpMenuContainer.style.right = ``;
            warpMenuContainer.style.top = `0`;
        }
    } else {
        warpMenu.ariaHidden = "true";

        if (isDesktopMode()) {
            warpMenuContainer.style.top = ``;
            warpMenuContainer.style.right = `-${offset}px`;
        } else {
            warpMenuContainer.style.top = `${warpMenuHeight}px`;
            warpMenuContainer.style.right = ``;
        }
    }


    if (!!hideAnimation) {
        warpMenuRoot.appendChild(warpMenuContainer);
    }

    warpMenuRoot.style.opacity = 1;
}


/**
 *
 * @param category {Section}
 * @returns {string}
 */
export function createCategory(category) {
    const categoryId = getCategoryKey(category);
    return `<details class="border-warp-border border-b warp-lg:w-60 not-warp-lg:w-full group h-fit">
                <summary
                        class="px-default-2x py-default desktop:text-desktop-xl mobile:text-mobile-xl cursor-pointer focus-visible:ces-focused outline-none
                           focus-visible:text-warp-text-hover active:text-warp-text-active
                           focus-visible:bg-warp-bg-hover active:bg-warp-bg-active flex flex-row items-center group/svg
                           box-border border-l border-l-transparent active:border-l-warp-border"
                       id="${categoryId}"
                >
                    <span class="w-6 h-6 inline-block group-open:hidden mr-1">${svgCaretRight}</span>                    
                    <span class="w-6 h-6 hidden group-open:inline-block mr-1">${svgCaretDown}</span>                    
                    <h2 class="text-xl mb-0">${isTranslateable(category.Title) ? getLocalizedString(category.Title) : category.Title}</h2>
                </summary>
                <ul>
                    ${category.Entries.map(e => {
        const isExternalLink = !!e.Target && e.Target === 'external';
        const linkText = isTranslateable(e.Title) ? getLocalizedString(e.Title) : e.DisplayName;
        const externalIcon = `<span class="w-[1em] h-[1em] inline-block">${svgExternalLink}</span>`;
        return `
                    <li>
                        <a
                        role="menuitem"
                        href="${e.Href}"
                        target="${isExternalLink ? "_blank" : "_top"}" 
                        class="py-default no-underline px-default-2x text-warp-text cursor-pointer focus-visible:ces-focused outline-none
                           hover:text-warp-text-hover focus-visible:text-warp-text-hover active:text-warp-text-active break-all
                           hover:bg-warp-bg-hover focus-visible:bg-warp-bg-hover active:bg-warp-bg-active flex flex-row flex-wrap
                           items-center box-border border-l border-l-transparent border-b border-b-transparent
                           hover:border-l-warp-border active:border-l-warp-border focus-visible:border-l-warp-border
                           hover:border-b-warp-border active:border-b-warp-border focus-visible:border-b-warp-border">
                           ${linkText.split(" ").reduce((a, b) => `${a}<span>${b}&nbsp;</span>`, "")}
                            ${(isExternalLink) ? externalIcon : ""}
                       </a>
                    </li>
                    `;
    }).join("")}
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
<div style="opacity: 0;" id="warp-menu-root" class="z-[9997] absolute overflow-hidden w-full h-full pointer-events-none no-print group/root top-0 left-0">
    <div id="warp-menu-container"
         class="fixed warp-lg:right-0 not-warp-lg:left-0 not-warp-lg:top-0 w-full h-full pointer-events-none flex 
                warp-lg:flex-row not-warp-lg:flex-col justify-end transition-[top,right] duration-[600ms] ease-in-out">
        <div class="flex items-center warp-lg:w-[62px] not-warp-lg:justify-end warp-lg:h-full not-warp-lg:w-full">
            <button id="warp-toggle"
                    class="pointer-events-auto warp-lg:rotate-[-90deg] rounded-t-lg focus-visible:ces-focused 
                    whitespace-nowrap px-[14px] h-11
                    bg-warp-bg hover:bg-warp-bg-hover focus-visible:bg-warp-bg-hover active:bg-warp-bg-active
                    border-2 border-warp-border hover:border-warp-border-hover focus-visible:border-warp-border-hover 
                    active:border-warp-border-active text-warp-text outline-0 border-b-0 not-warp-lg:border-r-0 
                    not-warp-lg:rounded-tr-none text-[1.125rem] font-[600] tracking-[1px]" aria-haspopup="menu" aria-controls="warp-menu">
                ${getLocalizedString("menuToken")}
            </button>
        </div>
        <nav
                id="warp-menu" 
                class="pointer-events-auto group-[&:not(.open)]/root:select-none group-[&:not(.open)]/root:pointer-events-none 
                       relative overflow-auto scroll-hide
                       warp-lg:bg-[repeating-linear-gradient(90deg,var(--warp-border)_0px,var(--warp-border)_1px,var(--warp-bg)_1px,var(--warp-bg)_15rem)] bg-[var(--warp-bg)]
                       bg-repeat-x bg-local
                       "
                aria-hidden="true"
                aria-expanded="false"
                role="menu"
            >
                <div class="warp-lg:flex warp-lg:flex-col text-warp-text
                            not-warp-lg:w-screen column-style
                            h-auto warp-md:columns-3 warp-sm:columns-2 warp-xs:columns-1
                            warp-lg:flex-wrap border-warp-border border-box border-solid w-fit
                            not-warp-lg:border-t not-warp-lg:border-t-warp-border not-warp-lg:gap-0 warp-lg:h-full scroll-hide"
                >
                    <div class="not-warp-lg:h-fit border-warp-border border-b flex flex-col justify-center items-center warp-lg:w-60 not-warp-lg:w-full 
                                py-default gap-default relative">
                            <div class="py-default pb-default-2x bg-warp-logo-bg w-48 flex flex-row justify-center items-center rounded">
                                <img class="content-[var(--warp-logo)] max-w-32" alt="">
                            </div>
                            <span id="powered-by" class="hidden">${getLocalizedString("poweredBy")}</span>
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
        </nav>
    </div>
</div>
    `);

    // Add tooltip as first child
    warpMenuRoot.querySelector("#warp-menu-container").prepend(createTooltip());

    const shadowHost = createHtml(`<div id="warp-menu-shadow-host" style="pointer-events: none;"></div>`);
    const shadowRoot = shadowHost.attachShadow({mode: "open"});
    shadowRoot.appendChild(warpMenuRoot);
    body.appendChild(shadowHost);

    shadowRootDocument = shadowRoot;

    document.body.addEventListener("click", (ev) => {
        const warpMenuRoot = shadowRootDocument.getElementById("warp-menu-root");
        if (!warpMenuRoot.contains(ev.target) && isWarpMenuOpen() && ev.target.id !== "warp-menu-shadow-host") {
            toggleWarpMenu(false);
        }
    })

    document.body.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape" && isWarpMenuOpen()) {
            toggleWarpMenu(false);
        }
    })

    const warpToggle = warpMenuRoot.querySelector("#warp-toggle");
    warpToggle.onclick = () => {
        toggleWarpMenu(false);
    };

    const summaries = Array.from(warpMenuRoot.querySelectorAll("summary"));
    for (const s of summaries) {
        s.parentNode.open = isOpenCollapsible(s.id);
        s.onclick = () => {
            const element = warpMenuRoot.querySelector("#warp-menu");
            element.style.width = `${element.getBoundingClientRect().width}px`;
            requestAnimationFrame(() => {
                element.style.width = "";
            });
            toggleCollapsedInStorage(s.id);
            requestAnimationFrame(() => {
                setWarpMenuPosition(true);
                s.focus();
            });
        };
    }

    const styleLink = document.createElement("link");
    styleLink.onload = () => {
        requestAnimationFrame(() => {
            const fallbackLogoValue = getComputedStyle(shadowRootDocument.firstElementChild).getPropertyValue("--warp-logo-internal");
            const actualLogoValue = getComputedStyle(shadowRootDocument.firstElementChild).getPropertyValue("--warp-logo");
            const hasChangedLogo = fallbackLogoValue !== actualLogoValue;
            if(hasChangedLogo) {
                shadowRoot.firstElementChild.querySelector("#powered-by")?.classList.remove("hidden");
            }

            setWarpMenuPosition(true);
        });
    }
    styleLink.rel = "stylesheet";
    styleLink.type = "text/css";
    styleLink.href = (typeof cesWarpMenuWarpCssUrl !== "undefined") ? cesWarpMenuWarpCssUrl : '/warp/warp.css';
    shadowRoot.appendChild(styleLink);

    window.addEventListener("resize", () => {
        setWarpMenuPosition(true);
    })
}

if (!hasClass(body, 'warpmenu-push') && (self === top || window.pmaversion)) {
    fetchWarpJson((typeof cesWarpMenuMenuJsonUrl !== "undefined") ? cesWarpMenuMenuJsonUrl : '/warp/menu.json', initWarpMenu);
}
