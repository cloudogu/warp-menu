// http://stackoverflow.com/questions/11214404/how-to-detect-if-browser-supports-html5-local-storage
function isLocalStorageSupported() {
    var mod = '__warp';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch (e) {
        return false;
    }
}

// According to https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// This trick is used to get the correct height on mobile devices.
function setCorrectVh() {
    var correctVh = (window.innerHeight * 0.01) + 'px';
    // This is used to calculate correct inner height of the display
    document.getElementById('warp-menu-container').style.setProperty('--vh', correctVh);
}

function createLink(href) {
    var baseUrl = '';
    if (href.indexOf('http') === 0) {
        return href;
    } else {
        return baseUrl + href;
    }
}
