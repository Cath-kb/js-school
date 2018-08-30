export default { getSum, compareByFields, getAvgGroupByField };

function getSum(payments) {
    return payments.reduce(function (sum, payment) {
        return sum + payment['AMOUNT'];
    }, 0);
}

function compareByFields(fields, defaultFields) {
    const fieldsByOrder = defaultFields.reduce((arr, el) => {
        if (arr.indexOf(el) === -1) arr.push(el);
        return arr;
    }, fields.concat([]));

    return (a, b) => {
        for (const field of fieldsByOrder) {
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
        }
        return 0;
    }
}

function getAvgGroupByField(fieldName, payments) {
    const values = getUniqueFieldValues(fieldName, payments);
    return values.reduce((result, value) => {
        result[value] = getAvgForFieldValue(fieldName, value, payments);
        return result;
    }, {});
}

function getUniqueFieldValues(fieldName, payments) {
    return payments.reduce((values, payment) => {
        if (values.indexOf(payment[fieldName]) === -1) {
            values.push(payment[fieldName]);
        }
        return values;
    }, []).sort();
}

function getAvgForFieldValue(fieldName, fieldValue, payments) {
    const filteredPayments = filterByField(fieldName, fieldValue, payments);
    const sum = getSum(filteredPayments);
    const count = filteredPayments.length;

    return roundTo(sum / count, 2);
}

function filterByField(fieldName, fieldValue, array) {
    return array.filter(el => {
        return el[fieldName] === fieldValue;
    });
}

function roundTo(number, precision = 0) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}