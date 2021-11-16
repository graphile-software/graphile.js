exports.Graph = class Graph {
  constructor(client, data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.data = {
      count: data.countData,
      graph: data.graphData,
    };

    this._raw = data;
  }
};
