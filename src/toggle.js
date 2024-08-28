

export function toggleCollapsedInStorage(id) {
    if (localStorage.getItem(id) === null || localStorage.getItem(id) === 'true') {
        localStorage.setItem(id, 'false');
    } else {
        localStorage.setItem(id, 'true');
    }
}

export function isOpenCollapsible(id) {
    return localStorage.getItem(id) === 'true' || localStorage.getItem(id) === null;
}

export function getCategoryKey(category) {
    return "warpc." + category.Title.toLowerCase().replace(/\s+/g, "_");
}
