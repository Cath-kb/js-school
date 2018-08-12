class Store {

  constructor(initialState = []) {
    this._id = 0;
    this._state = {};
    initialState.forEach(data => this._addInnerRecord(data));

    this._handlers = [];
  }

  _addInnerRecord(data) {
    this._state[this._generateId()] = data;
  }

  addRecord(data) {
    // Workaround for server id generator
    if (!data.hasOwnProperty('id')) {
      const maxId = this.getRecords().reduce((max, record) => record.id > max ? record.id : max, 0);
      data.id = maxId+1;
    }

    this._addInnerRecord(data);

    this.notifyListeners();
  }

  _updateInnerRecord(recordId, data) {
    if (!this._state.hasOwnProperty(recordId)) {
      throw new Error(`recordId ${recordId} not found!`);
    }
    this._state[recordId] = { ...this._state[recordId], ...data };
  }

  updateRecord(recordId, data) {
    this._updateInnerRecord(recordId, data);

    this.notifyListeners();
  }

  _deleteInnerRecord(storeId) {
    delete this._state[storeId];
  }

  deleteRecord(storeId) {
    this._deleteInnerRecord(storeId);

    this.notifyListeners();
  }

  getRecordById(storeId) {
    return { ...this._state[storeId], __innerID: storeId };
  }

  getRecords() {
    const storeIds = Object.keys(this._state);
    return storeIds.map(storeId => this.getRecordById(storeId));
  }

  _generateId() {
    return 'store_id_' + this._id++;
  }

  subscribe(callback) {
    this._handlers.push(callback);
  }

  unsubscribe(callback) {
    this._handlers = this._handlers.filter(handler => handler !== callback);
  }

  notifyListeners() {
    this._handlers.forEach(cb => cb());
  }

}
