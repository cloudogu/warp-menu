// http://stackoverflow.com/questions/11214404/how-to-detect-if-browser-supports-html5-local-storage
export function isLocalStorageSupported() {
    var mod = '__warp';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch (e) {
        return false;
    }
}

export function createHtml(htmlString) {
    const element = document.createElement("div");
    element.innerHTML = htmlString;
    return element.firstElementChild;
}

const svgTextModifierClasses = "fill-warp-text group-hover/svg:fill-warp-text-hover group-focus-visible/svg:fill-warp-text-hover group-active/svg:fill-warp-text-active hover:fill-warp-text-hover focus-visible:fill-warp-text-hover active:fill-warp-text-active";
export const svgCaretRight = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path class="${svgTextModifierClasses}" d="M181.66,122.34l-80-80A8,8,0,0,0,88,48V208a8,8,0,0,0,13.66,5.66l80-80A8,8,0,0,0,181.66,122.34Z"/></svg>`; // https://phosphoricons.com/?q=%22caret%22&weight=%22fill%22
export const svgCaretDown = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path class="${svgTextModifierClasses}" d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94Z"/></svg>`; // https://phosphoricons.com/?q=%22caret%22&weight=%22fill%22
export const svgExternalLink = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path class="${svgTextModifierClasses}" d="M224,104a8,8,0,0,1-13.66,5.66L184,83.31l-42.34,42.35a8,8,0,0,1-11.32-11.32L172.69,72,146.34,45.66A8,8,0,0,1,152,32h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"/></svg>`; // https://phosphoricons.com/?q=%22external%22&weight=%22fill%22
export const svgLogout = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path class="${svgTextModifierClasses}" d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40A8,8,0,0,0,176,88v32H112a8,8,0,0,0,0,16h64v32a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,229.66,122.34Z"/></svg>`; // https://phosphoricons.com/?q=%22logout%22&weight=%22fill%22
