import model from './model.js';
import { sortFields } from './config.js';

export function render(data, titles) {
    const root = document.querySelector('#payrollStats');
    const payrollContent = document.querySelector('#payrollContent');
    const btn = document.querySelector('#allPaymentsBtn');
    const sortInfo = document.querySelector('#sortInfo');

    const totalTable = createTable(['total'], model.getSum(data).toFixed(2));
    root.appendChild(totalTable);

    const groupByMonthAvgTable = createTable(['month', 'avg. payment'], model.getAvgGroupByField('MONTH', data));
    root.appendChild(groupByMonthAvgTable);

    const groupByDepartmentAvgTable = createTable(['department', 'avg. payment'], model.getAvgGroupByField('DEPARTMENT', data));
    root.appendChild(groupByDepartmentAvgTable);

    const allPaymentsTable = createTable(titles, data);
    allPaymentsTable.classList.add('fullWidth');
    payrollContent.appendChild(allPaymentsTable);

    btn.addEventListener('click', onBtnClick());
    sortInfo.innerHTML = `Sorted by: ${sortFields.join(', ')}`;
}

function onBtnClick() {
    let isShown = false;
    const content = document.querySelector('#payrollContent');
    return function (event) {
        if (isShown) {
            content.classList.remove('open');
            event.target.innerHTML = 'Show all Payments';
        } else {
            content.classList.add('open');
            event.target.innerHTML = 'Hide all Payments';
        }
        isShown = !isShown;
    }
}

function createTable(titles, data) {
    const table = document.createElement('table');

    const header = createTableHeader(titles);
    table.appendChild(header);

    const content = createTableContent(data);
    table.appendChild(content);

    return table;
}

function createTableHeader(titles) {
    const header = document.createElement('thead');
    const headerContent = document.createElement('tr');
    header.appendChild(headerContent);

    headerContent.innerHTML = titles.reduce((html, title) => {
        return html + `<th>${title}</th>`;
    }, '');

    return header;
}

function createTableContent(data) {
    const content = document.createElement('tbody');

    if (typeof data === 'string') {
        data = [{data}];
    }

    if (Array.isArray(data)) {
        content.innerHTML = data.reduce((innerHTML, el) => innerHTML + `<tr>${getRowInnerHtml(el)}</tr>`, ``);
        return content;
    }

    for (const row in data) {
        content.innerHTML += `<tr><td>${row}</td><td>${data[row]}</td></tr>`;
    }
    return content;
}

function getRowInnerHtml(el) {
    let str = '';
    for (const key in el) {
        const value = (typeof el[key] === 'number') ? el[key].toFixed(2) : el[key];
        str += `<td>${value}</td>`;
    }
    return str;
}