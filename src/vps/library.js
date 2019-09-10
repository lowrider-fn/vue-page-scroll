const trim = (str) => str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

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

const setCssText = (el, styles) => el.style.cssText = styles;

export {
    addClass,
    removeClass,
    hasClass,
    setCssText,
};

