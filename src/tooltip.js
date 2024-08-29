import {getLocalizedString} from "./translation.js";
import {createHtml} from "./utils.js";


const tooltipColumnHtmlString = `
<div id="warp-menu-column-tooltip" 
    class="flex warp-lg:flex-row not-warp-lg:flex-col warp-lg:items-center not-warp-lg:items-end warp-lg:justify-center not-warp-lg:justify-end 
            not-warp-lg:mb-4 h-screen">
    <div
        class="relative flex items-center gap-2  
                p-4 w-80 h-40 z-[9997]  
                warp-lg:rounded-lg not-warp-lg:rounded-t-lg not-warp-lg:rounded-bl-lg
                bg-warp-bg text-warp-text">
        <!-- Tooltip content -->
        <div class="pointer-events-auto">
          <p>${getLocalizedString("onboardingTextToken")}</p>
          <!-- Checkbox and text -->
          <div class="flex items-center mt-2">
            <input
              type="checkbox"
              id="hide-hint"
              class="h-6 w-6 text-warp-text 
                focus-visible:ces-focused hover:bg-warp-bg-hover focus-visible:bg-warp-bg-hover active:bg-warp-bg-active hover:border-warp-border-hover focus-visible:border-warp-border-hover
                active:border-warp-border-active outline-0 cursor-pointer"
            />
            <label for="hide-hint" class="ml-2 cursor-pointer">${getLocalizedString("onboardingHintToken")}</label>
          </div>
        </div>
    </div>
    <!-- Arrow -->
    <div class="bg-warp-bg w-8 h-8 rotate-45 warp-lg:-ml-5 warp-lg:mt-0 not-warp-lg:-mt-5"></div>
</div>
`;


/**
 *
 * @returns {Element}
 */
export function createTooltip() {
    const tooltipElement = createHtml(tooltipColumnHtmlString);
    const hideHintCheckbox = tooltipElement.querySelector("#hide-hint");

    function hideTooltip() {
        tooltipElement.classList.add("invisible", "opacity-0");
        localStorage.setItem('warpMenuHideTooltip', 'hide');
        setTimeout(function () {
            tooltipElement.style.display = 'none';
        }, 3000);
    }

    hideHintCheckbox.onclick = hideTooltip;


    if (isTooltipDisabled()) {
        tooltipElement.style.display = 'none';
    }


    return tooltipElement;
}

function isTooltipDisabled() {
    const tooltipConfig = localStorage.getItem('warpMenuHideTooltip');
    return tooltipConfig === 'hide';
}
