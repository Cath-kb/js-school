
class App {

  constructor(initData, dataTableId, formName) {
    this._dataTableId = dataTableId;
    this._formName = formName;

    this._store = new Store(initData);

    this._store.subscribe(this._handleChangeData.bind(this));
    this._store.notifyListeners();

    this._bindEventListeners();
  }

  run() {
    this._store.addRecord({
      first: 'test',
      last: 'test',
      handle: 'test',
    })
    // console.log();
  }

  _getTable() {
    return document.getElementById(this._dataTableId);
  }

  _handleChangeData() {
    const newData = this._store.getRecords();
    const parentTable = this._getTable();
    // debugger;
    parentTable.innerHTML = '';
    newData.forEach(rowData => {
      const row = this._renderRow(rowData);
      row.setAttribute("id", rowData.__innerID);
      parentTable.appendChild(row);
    });
  }

  _renderRow(rowData) {
    const row = document.createElement('tr');

    row.appendChild(this._generateTd(rowData.id));
    row.appendChild(this._generateTd(rowData.first));
    row.appendChild(this._generateTd(rowData.last));
    row.appendChild(this._generateTd(rowData.handle));

    return row;
  }

  _generateTd(tdText) {
    const td = document.createElement('td');
    td.appendChild(document.createTextNode(tdText));

    return td;
  }

  _handleDbClick(event) {
    if (event.altKey) {
      const parentTable = this._getTable();
      parentTable.removeChild(
        event.target.parentElement
      );
    }
  }

  _handleClick(event) {
    if (event.altKey) {
      return;
    }

    const targetRow = event.target.parentElement;
    const recordId = targetRow.getAttribute('id');
    const rowData = this._store.getRecordById(recordId);
    this._populateToForm(rowData);
    // debugger;
  }

  _populateToForm(rowData) {
    const form = document.forms[this._formName];
    const fields = Object.keys(rowData);
    fields.forEach((itemName) => {
      const el = form.elements[itemName];
      if (!el) {
        return;
      }
      el.value = rowData[itemName];

    });
  }

  _bindEventListeners() {
    const parentTable = this._getTable();
    parentTable.addEventListener('dblclick', this._handleDbClick.bind(this));
    parentTable.addEventListener('click', this._handleClick.bind(this));
  }

}
