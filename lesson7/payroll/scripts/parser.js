export function parseCSV(rawData) {
    const rows = rawData.split('\n');
    const titles = parseTitles(rows.shift());

    const data = [];
    rows.forEach(el => {
        const row = el.split(',');
        if (row.length < titles.length) return;

        const dataItem = {};
        titles.forEach((title, index) => {
            const value = row[index];
            const isDecimalNumber = value.match(/^\d*(\.\d+)?$/);
            dataItem[title] = isDecimalNumber ? parseFloat(value) : value;
        });
        data.push(dataItem);
    });
    return {titles, data};
}

function parseTitles(row) {
    return row.split(',');
}
