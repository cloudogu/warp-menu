import {addClass} from "./style.js";
import {getLocalizedString} from "./translation.js";

export function createTooltip() {
    var tooltipColumn = document.createElement('div');
    addClass(tooltipColumn, 'warp-menu-column-tooltip');

    var tooltipLabel = document.createElement('label');
    addClass(tooltipLabel, 'warp-onboarding');
    tooltipColumn.appendChild(tooltipLabel);

    var text = document.createElement('p');
    addClass(text, 'warp-onboarding-msg');
    text.innerHTML = getLocalizedString("onboardingTextToken");
    tooltipLabel.appendChild(text);
    var hint = document.createElement('p');
    addClass(hint, 'warp-onboarding-hint');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    var hintText = document.createElement('span');
    hintText.innerHTML = getLocalizedString("onboardingHintToken");

    hint.appendChild(hintText);
    hint.appendChild(checkbox);
    tooltipLabel.appendChild(hint);

    var tooltipLabelArrow = document.createElement('div');
    tooltipLabelArrow.innerText = ' ';
    addClass(tooltipLabelArrow, 'warp-onboarding-after-arrow');
    tooltipLabel.appendChild(tooltipLabelArrow);

    function hideTooltip() {
        addClass(tooltipColumn, 'warp-onboarding-container-hide');
        if (lss) localStorage.setItem('warpMenuHideTooltip', 'hide');
        setTimeout(function () {
            tooltipColumn.style.display = 'none';
        }, 3000);
    }

    checkbox.onclick = hideTooltip;
    return tooltipColumn;
}

export function isTooltipDisabled() {
    if (!lss) return false;

    var tooltipConfig = localStorage.getItem('warpMenuHideTooltip');
    return tooltipConfig === 'hide';
}
