import {isLocalStorageSupported} from "./utils.js";

export var lss = isLocalStorageSupported();

export function toggleCollapsedInStorage(id) {
    console.log("asdasdasdss");
    if (!lss) return;

    if (localStorage.getItem(id) === null || localStorage.getItem(id) === 'true') {
        localStorage.setItem(id, 'false');
    } else {
        localStorage.setItem(id, 'true');
    }
}

export function isOpenCollapsible(id) {
    if (!lss) return true;

    return localStorage.getItem(id) === 'true' || localStorage.getItem(id) === null;
}

export function getCategoryKey(category) {
    return "warpc." + category.Title.toLowerCase().replace(/\s+/g, "_");
}
