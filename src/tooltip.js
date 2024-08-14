import {getLocalizedString} from "./translation.js";
import {lss} from "./toggle.js";
import {createHtml} from "./utils";

export function createTooltip() {
    const tooltipColumnHtml = `
    <div 
        class="warp-menu-column-tooltip   
          z-[9997]  basis-[21.33333em] flex flex-col justify-center 
          select-none pointer-events-none transition-all duration-500 ease-line" 
        id="warp-menu-column-tooltip">
    </div>
    `;
    const tooltipColumn = createHtml(tooltipColumnHtml);

    const tooltipLabelHtml = `
    <div 
        class="warp-menu-column-tooltip label warp-onboarding 
           basis-auto relative mr-6 inline-block rounded-[10px] 
           p-8 bg-[#00426B] text-white w-[20em] text-[1.33333em] cursor-pointer 
           pointer-events-auto select-auto shadow-[0_0_15px_-5px_black] mr-0 mb-8">
    </div>
    `;

    const tooltipLabel = createHtml(tooltipLabelHtml);
    tooltipColumn.appendChild(tooltipLabel);

    const tooltipLabelTextHtml = `
    <p class="warp-onboarding-msg">
    </p>`

    const tooltipLabelText = createHtml(tooltipLabelTextHtml)
    tooltipLabelText.innerHTML = getLocalizedString("onboardingTextToken");
    tooltipLabel.appendChild(tooltipLabelText);

    const tooltipLabelHintHtml = `
    <p class="m-0 text-[0.8em] text-right block">
    </p>`

    const tooltipLabelHint = createHtml(tooltipLabelHintHtml);

    const tooltipLabelHintCheckboxHtml = `
    <input class="text-[1em] align-middle font-normal m-[0.6em_0_0.7em_0.75em] appearance-none"/>`

    const tooltipLabelHintCheckbox = createHtml(tooltipLabelHintCheckboxHtml);
    tooltipLabelHintCheckbox.type = 'checkbox';

    const tooltipLabelHintTextHtml = `
    <span class="inline">
    </span>`

    const tooltipLabelHintText = createHtml(tooltipLabelHintTextHtml);
    tooltipLabelHintText.innerHTML = getLocalizedString("onboardingHintToken");

    tooltipLabelHint.appendChild(tooltipLabelHintText);
    tooltipLabelHint.appendChild(tooltipLabelHintCheckbox);
    tooltipLabel.appendChild(tooltipLabelHint);



    const tooltipLabelArrowHtml = `
    <div class="inline-block absolute bg-[#00426B] rotate-45 w-[2em] h-[2em] right-0">
    
    </div>`

    const tooltipLabelArrow = createHtml(tooltipLabelArrowHtml);
    tooltipLabelArrow.innerText = ' ';

    tooltipLabel.appendChild(tooltipLabelArrow);

    function hideTooltip() {
        tooltipColumn.classList.add("invisible opacity-0")
        if (lss) localStorage.setItem('warpMenuHideTooltip', 'hide');
        setTimeout(function () {
            tooltipColumn.style.display = 'none';
        }, 3000);
    }

    tooltipLabelHintCheckbox.onclick = hideTooltip;
    return tooltipColumn;
}

export function isTooltipDisabled() {
    if (!lss) return false;

    var tooltipConfig = localStorage.getItem('warpMenuHideTooltip');
    return tooltipConfig === 'hide';
}
