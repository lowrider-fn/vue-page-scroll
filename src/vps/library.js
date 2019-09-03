const trim = str => str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

const hasClass = (el, cls) => {
    if (el.className) return el.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));

    return el.className = cls;
};

const addClass = (el, cls) => {
    if (!hasClass(el, cls)) el.className += ` ${cls}`;
    el.className = trim(el.className);
};

const removeClass = (el, cls) => {
    if (hasClass(el, cls)) {
        const reg    = new RegExp(`(\\s|^)${cls}(\\s|$)`);
        el.className = el.className.replace(reg, ' ');
    }
    el.className = trim(el.className);
};

const querySelector = el => document.querySelector(el);
const querySelectorAll = el => document.querySelectorAll(el);

const addEventListener    = (event, handler) => document.addEventListener(event, handler);
const removeEventListener = (event, handler) => document.removeEventListener(event, handler);
const dispatchEvent       = e => document.dispatchEvent(e);

const setCssText = (el, styles) => el.style.cssText = styles;

export {
    addClass,
    removeClass,
    hasClass,
    querySelectorAll,
    querySelector,
    addEventListener,
    removeEventListener,
    dispatchEvent,
    setCssText,
};

