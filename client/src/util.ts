export const debounce = function (fn: Function, wait: number) {
    let timer: any;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...arguments);
        }, wait);
    }
}