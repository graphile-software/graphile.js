exports.Data = class Data {
  constructor(client, data) {
    this.id = data.id;
    this.date = data.date;
    this.color = data.color || null;
    this.value = data.value;

    this._raw = data;
  }
};
