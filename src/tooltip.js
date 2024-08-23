import {getLocalizedString} from "./translation.js";
import {lss} from "./toggle.js";
import {createHtml} from "./utils.js";


const tooltipColumnHtmlString = `
<div id="warp-menu-column-tooltip" class="flex warp-lg:flex-row not-warp-lg:flex-col warp-lg:items-center not-warp-lg:items-end justify-center h-screen">
    <div
        class="relative flex items-center p-4 bg-warp-bg text-warp-text warp-lg:rounded-lg not-warp-lg:rounded-t-lg not-warp-lg:rounded-bl-lg w-80 h-40 z-[9997] gap-2"
    >
        <!-- Tooltip content -->
        <div>
          <p>${getLocalizedString("onboardingTextToken")}</p>
          <!-- Checkbox and text -->
          <div class="flex items-center mt-2">
            <input
              type="checkbox"
              id="hide-hint"
              class="h-6 w-6 text-warp-text"
            />
            <label for="hide-hint" class="ml-2">${getLocalizedString("onboardingHintToken")}</label>
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
        if (lss) localStorage.setItem('warpMenuHideTooltip', 'hide');
        setTimeout(function () {
            tooltipElement.style.display = 'none';
        }, 3000);
    }

    hideHintCheckbox.onclick = hideTooltip;


    return tooltipElement;
}

export function isTooltipDisabled() {
    if (!lss) return false;

    var tooltipConfig = localStorage.getItem('warpMenuHideTooltip');
    return tooltipConfig === 'hide';
}
