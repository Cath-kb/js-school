/**
 *
 * Polyfills for: map, reduce, reduceRight, filter, forEach, some, every
 *
 * In real life we'll use condition like:
 *
 * if (!Array.prototype.<method>) { Array.prototype.<method> = function(arguments) { ... } }
 *
 * But our browsers so cool to do all of this stuff
 * All the methods below is well known and supportable at least last 10 years
 * Thus... let's just add _new methods to expand existed functionality =)
 *
 */


/**
 * map
 **/

Array.prototype._map = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new Error('callback should be a function');

    const arr = cloneArray(this);

    const callbackBounded = callback.bind(thisArg);

    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        result[i] = callbackBounded(arr[i], i, arr);
    }

    return result;
};

/**
 * reduce
 **/

Array.prototype._reduce = function(callback, initialValue) {
    if (typeof callback !== 'function') throw new Error('callback should be a function');

    const arr = cloneArray(this);

    const hasInitialValue = initialValue !== undefined;
    if (arr.length === 0 && !hasInitialValue) throw new Error('array without initial value can\'t be empty');

    const startIndex = hasInitialValue ? 0 : 1;
    let result = hasInitialValue ? initialValue : arr[0];
    for (let i = startIndex, len = arr.length; i < len; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        result = callback(result, arr[i], i, arr);
    }

    return result;
};

/**
 * reduceRight
 **/

Array.prototype._reduceRight = function(callback, initialValue) {
    if (typeof callback !== 'function') throw new Error('callback should be a function');

    const arr = cloneArray(this);

    const hasInitialValue = initialValue !== undefined;
    if (arr.length === 0 && !hasInitialValue) throw new Error('array without initial value can\'t be empty');

    const startIndex = hasInitialValue ? 0 : 1;
    let result = hasInitialValue ? initialValue : arr[0];
    for (let i = arr.length-1; i >= startIndex; i--) {
        if (!arr.hasOwnProperty(i)) continue;
        result = callback(result, arr[i], i, arr);
    }

    return result;
};

/**
 * filter
 **/

Array.prototype._filter = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new Error('callback should be a function');

    const arr = cloneArray(this);

    const callbackBounded = callback.bind(thisArg);

    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        if (callbackBounded(arr[i], i, arr)) result.push(arr[i]);
    }

    return result;
};

/**
 * forEach
 **/

Array.prototype._forEach = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new Error('callback should be a function');

    const arr = cloneArray(this);

    const callbackBounded = callback.bind(thisArg);

    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        callbackBounded(arr[i], i, arr);
    }
};

/**
 * some
 **/

Array.prototype._some = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new Error('callback should be a function');

    const arr = cloneArray(this);
    const callbackBounded = callback.bind(thisArg);

    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        if (callbackBounded(arr[i], i, arr)) return true;
    }

    return false;
};

/**
 * every
 **/

Array.prototype._every = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new Error('callback should be a function');

    const arr = cloneArray(this);
    const callbackBounded = callback.bind(thisArg);

    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        if (!callbackBounded(arr[i], i, arr)) return false;
    }

    return true;
};

function cloneArray(arr) {
    const result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        result[i] = arr[i];
    }
    return result;
}
