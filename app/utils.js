function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        const later = () => {
            timeout = null;
            fn(args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
    };
}

function chunk(array, size) {
    let counter = 0;
    const result = [];
    const tempArray = [];
    for (let i = 0; i < array.length; i += 1) {
        if (counter === size) {
            counter = 0;
            result.push(Array.from(tempArray));
            tempArray.length = 0;
        }
        tempArray.push(array[i]);
        counter += 1;
    }
    if (tempArray.length > 0) result.push(tempArray);
    return result;
}

module.exports = {
    debounce,
    chunk,
};
