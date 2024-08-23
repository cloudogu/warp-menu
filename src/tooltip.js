import {getLocalizedString} from "./translation.js";
import {lss} from "./toggle.js";
import {createHtml} from "./utils.js";


const tooltipColumnHtml = `
<div class="flex warp-lg:flex-row not-warp-lg:flex-col warp-lg:items-center not-warp-lg:items-end justify-center h-screen">
    <div
        class="relative flex items-center p-4 bg-warp-bg text-warp-text warp-lg:rounded-lg not-warp-lg:rounded-t-lg not-warp-lg:rounded-bl-lg w-[320px] h-[152px] z-[9997] gap-2"
    >
        <!-- Tooltip content -->
        <div>
          <p>
            Klicken Sie auf „Menü“ um Ihre Tools zu sehen. Das Menü ist an
            dieser Stelle aus allen Tools zugänglich. Hallo dies ist ein weiterer Test.
          </p>
          <!-- Checkbox and text -->
          <div class="flex items-center mt-2">
            <input
              type="checkbox"
              id="hide-hint"
              class="h-4 w-4 text-warp-text"
            />
            <label for="hide-hint" class="ml-2">Hinweis verbergen</label>
          </div>
        </div>
    </div>
    <!-- Arrow -->
    <div class="bg-warp-bg w-10 h-10 rotate-45 warp-lg:-ml-5 warp-lg:mt-0 not-warp-lg:-mt-5"></div>
</div>
`;


/**
 *
 * @returns {string}
 */
export function createTooltip() {
    // const tooltipColumnHtml = `
    // <div
    //     class="warp-menu-column-tooltip
    //       z-[9997]  basis-[21.33333em] flex flex-col justify-center
    //       select-none pointer-events-none transition-all duration-500 ease-line"
    //     id="warp-menu-column-tooltip">
    // </div>
    // `;
    // const tooltipColumn = createHtml(tooltipColumnHtml);
    //
    // const tooltipLabelHtml = `
    // <div
    //     class="warp-menu-column-tooltip label warp-onboarding
    //        basis-auto relative mr-6 inline-block rounded-[10px]
    //        p-8 bg-[#00426B] text-white w-[20em] text-[1.33333em] cursor-pointer
    //        pointer-events-auto select-auto shadow-[0_0_15px_-5px_black] mr-0 mb-8">
    // </div>
    // `;
    //
    // const tooltipLabel = createHtml(tooltipLabelHtml);
    // tooltipColumn.appendChild(tooltipLabel);
    //
    // const tooltipLabelTextHtml = `
    // <p class="warp-onboarding-msg">
    // </p>`
    //
    // const tooltipLabelText = createHtml(tooltipLabelTextHtml)
    // tooltipLabelText.innerHTML = getLocalizedString("onboardingTextToken");
    // tooltipLabel.appendChild(tooltipLabelText);
    //
    // const tooltipLabelHintHtml = `
    // <p class="m-0 text-[0.8em] text-right block">
    // </p>`
    //
    // const tooltipLabelHint = createHtml(tooltipLabelHintHtml);
    //
    // const tooltipLabelHintCheckboxHtml = `
    // <input class="text-[1em] align-middle font-normal m-[0.6em_0_0.7em_0.75em] appearance-none"/>`
    //
    // const tooltipLabelHintCheckbox = createHtml(tooltipLabelHintCheckboxHtml);
    // tooltipLabelHintCheckbox.type = 'checkbox';
    //
    // const tooltipLabelHintTextHtml = `
    // <span class="inline">
    // </span>`
    //
    // const tooltipLabelHintText = createHtml(tooltipLabelHintTextHtml);
    // tooltipLabelHintText.innerHTML = getLocalizedString("onboardingHintToken");
    //
    // tooltipLabelHint.appendChild(tooltipLabelHintText);
    // tooltipLabelHint.appendChild(tooltipLabelHintCheckbox);
    // tooltipLabel.appendChild(tooltipLabelHint);
    //
    //
    //
    // const tooltipLabelArrowHtml = `
    // <div class="inline-block absolute bg-[#00426B] rotate-45 w-[2em] h-[2em] right-0">
    //
    // </div>`
    //
    // const tooltipLabelArrow = createHtml(tooltipLabelArrowHtml);
    // tooltipLabelArrow.innerText = ' ';
    //
    // tooltipLabel.appendChild(tooltipLabelArrow);
    //
    // function hideTooltip() {
    //     tooltipColumn.classList.add("invisible opacity-0")
    //     if (lss) localStorage.setItem('warpMenuHideTooltip', 'hide');
    //     setTimeout(function () {
    //         tooltipColumn.style.display = 'none';
    //     }, 3000);
    // }
    //
    // tooltipLabelHintCheckbox.onclick = hideTooltip;
    // return tooltipColumn;
    return tooltipColumnHtml;
}

export function isTooltipDisabled() {
    if (!lss) return false;

    var tooltipConfig = localStorage.getItem('warpMenuHideTooltip');
    return tooltipConfig === 'hide';
}
