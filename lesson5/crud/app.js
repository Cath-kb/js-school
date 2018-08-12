class App {

  constructor(initData, dataContainerId, datumFormName) {
    this._dataContainerId = dataContainerId;
    this._datumFormName = datumFormName;

    this._store = new Store(initData);
    this._renderStoreDataBound = this._renderStoreData.bind(this);
  }

  run() {
    this._handleDataStoreRenderSync();
    this._addDomEventListeners();
  }

  _getDataContainer() {
    return document.getElementById(this._dataContainerId);
  }

  _getSubmitFormButton() {
    return document.forms[this._datumFormName].querySelector('button[type=button]');
  }

  _getResetFormButton() {
    return document.forms[this._datumFormName].querySelector('button[type=reset]');
  }

  _getDataStoreRenderSyncCheckbox() {
    return document.getElementById('sync');
  }

  _renderStoreData() {
    const data = this._store.getRecords();
    this._renderRecords(data);
  }

  _renderRecords(data) {
    const dataContainer = this._getDataContainer();

    dataContainer.innerHTML = '';
    data.forEach(recordData => {
      const record = this._renderRecord(recordData);
      record.setAttribute("id", recordData.__innerID);
      dataContainer.appendChild(record);
    });
  }

  _renderRecord(data) {
    const el = document.createElement('tr');
    const fieldsToRender = ['id', 'first', 'last', 'handle'];

    fieldsToRender.forEach(field => {
      el.appendChild(this._renderField(data[field]));
    });

    return el;
  }

  _renderField(data) {
    const el = document.createElement('td');
    el.appendChild(document.createTextNode(data));

    return el;
  }

  _handleDblClick(event) {
    if (!event.altKey) {
      return;
    }

    const isConfirmed = confirm('Are you sure you want to delete the record?');
    if (!isConfirmed) return;

    const recordEl = event.target.parentElement;
    const recordId = recordEl.getAttribute('id');
    this._store.deleteRecord(recordId);

    if (this._getFormInnerIDElement().value === recordId) {
        this._resetFormData();
    }
  }

  _handleClick(event) {
    if (event.altKey) {
      return;
    }

    const recordEl = event.target.parentElement;
    const recordId = recordEl.getAttribute('id');
    const recordData = this._store.getRecordById(recordId);
    this._setFormData(recordData);
  }

  _handleFormSubmit(event) {
    const { form } = event.target;
    const recordId = form.elements.__innerID.value;

    const values = {};
    for (let el of form.elements) {
      if (!el.name || el.name ==='__innerID') continue;
      values[el.name] = el.value;
    }

    const isNewRecord = !recordId;
    if (isNewRecord) {
      this._store.addRecord(values);
    } else {
      this._store.updateRecord(recordId, values);
    }
  }

  _handleFormReset() {
    this._resetFormData();
  }

  _handleDataStoreRenderSync() {
    const isSync = this._getDataStoreRenderSyncCheckbox().checked;

    if (isSync) {
      this._renderStoreData();
      this._store.subscribe(this._renderStoreDataBound);
    } else {
      this._store.unsubscribe(this._renderStoreDataBound);
    }
  }

  _setFormData(recordData) {
    const form = document.forms[this._datumFormName];
    const fields = Object.keys(recordData);
    fields.forEach(field => {
      const el = form.elements[field];
      if (!el) {
        return;
      }
      el.value = recordData[field];
    });
  }

  _resetFormData() {
    this._getFormInnerIDElement().value = '';
  }

  _getFormInnerIDElement() {
    return document.forms[this._datumFormName].elements.__innerID;
  }

  _addDomEventListeners() {
    const dataContainer = this._getDataContainer();
    const submitFormButton = this._getSubmitFormButton();
    const resetFormButton = this._getResetFormButton();
    const dataStoreRenderSyncCheckbox = this._getDataStoreRenderSyncCheckbox();

    dataContainer.addEventListener('dblclick', this._handleDblClick.bind(this));
    dataContainer.addEventListener('click', this._handleClick.bind(this));
    submitFormButton.addEventListener('click', this._handleFormSubmit.bind(this));
    resetFormButton.addEventListener('click', this._handleFormReset.bind(this));
    dataStoreRenderSyncCheckbox.addEventListener('click', this._handleDataStoreRenderSync.bind(this));
  }

}
