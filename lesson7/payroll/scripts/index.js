(function () {
   const { titles, data } = parseCSV(readFile());
   const sortFields = ['DEPARTMENT', 'MONTH'];
   data.sort(compareByFields(sortFields, titles));

   document.addEventListener('DOMContentLoaded', function () {
      const root = document.querySelector('#payrollStats');
      const payrollContent = document.querySelector('#payrollContent');
      const btn = document.querySelector('#allPaymentsBtn');
      const sortInfo = document.querySelector('#sortInfo');

      const totalTable = createTable(['total'], getSum(data).toFixed(2));
      root.appendChild(totalTable);
      
      const groupByMonthAvgTable = createTable(['month', 'avg. payment'], getAvgGroupByField('MONTH', data));
      root.appendChild(groupByMonthAvgTable);

      const groupByDepartmentAvgTable = createTable(['department', 'avg. payment'], getAvgGroupByField('DEPARTMENT', data));
      root.appendChild(groupByDepartmentAvgTable);

      const allPaymentsTable = createTable(titles, data);
      allPaymentsTable.classList.add('fullWidth');
      payrollContent.appendChild(allPaymentsTable);

      btn.addEventListener('click', onBtnClick());
      sortInfo.innerHTML = `Sorted by: ${sortFields.join(', ')}`;
   });

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
      const header = generateTableHeader(titles);
      const content = generateTableContent(data);

      table.appendChild(header);
      table.appendChild(content);
      
      return table;
   }
   
   function generateTableHeader(titles) {
      const header = document.createElement('thead');
      const headerContent = document.createElement('tr');
      header.appendChild(headerContent);

      headerContent.innerHTML = titles.reduce((html, title) => {
         return html + `<th>${title}</th>`;
      }, '');

      return header;
   }

   function generateTableContent(data) {
      const content = document.createElement('tbody');

      if (typeof data === 'string') {
         data = [{data}];
      }

      if (Array.isArray(data)) {
         data.forEach(el => {
            let str = '';
            for (const key in el) {
               const value = (typeof el[key] === 'number') ? el[key].toFixed(2) : el[key];
               str += `<td>${value}</td>`;
            }
            content.innerHTML += `<tr>${str}</tr>`;
         });
         return content;
      }

      for (const row in data) {
         content.innerHTML += `<tr><td>${row}</td><td>${data[row]}</td></tr>`;
      }
      return content;
   }

   function parseCSV(rawData) {
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
      return { titles, data };
   }
   
   function parseTitles(row) {
      return row.split(',');
   }

   function getSum(payments) {
      return payments.reduce(function(sum, payment) {
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
})();
