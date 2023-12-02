export const debounce = function (fn: Function, wait: number) {
    let timer: number;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...arguments);
        }, wait);
    }
}