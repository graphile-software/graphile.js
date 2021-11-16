const { Graph } = require("./../utils/graph");
const GRAPH_TYPES = require("./../utils/types/GRAPH_TYPES.json");

class GraphManager {
  constructor(client) {
    if (!client) throw new Error('"client" cannot be undefined');
    this.client = client;
  }

  /**
   * Fetch a graph by its ID or Name
   * @returns Graph
   * @param id {string} - ID/Name of the graph
   * @param type {string} - Type of id provided (id/name)
   */
  async fetch(id, type) {
    try {
      this.client.functions.checkEmit(this.client, this.client.eventManager);
      if (!id) throw new Error("'id' cannot be undefined");
      if (!type) throw new Error("'type' cannot be undefined");
      if (type != "id" && type != "name")
        throw new Error("'type' must be a string, 'id' or 'name'");

      if (type == "id") {
        var res = await this.client.httpInstance
          .get(`/graph/${id}`)
          .then(async (res) => {
            return res.data;
          });
      } else if (type == "name") {
        var res = await this.client.httpInstance
          .post(`/graph/find`, { name: id })
          .then(async (res) => {
            return res.data;
          });
      }

      return new Graph(this.client, res);
    } catch (err) {
      if (err.response) {
        return err.response.data;
      } else {
        return err;
      }
    }
  }

  /**
   * Fetch all graphs
   * @returns Graph[]
   */
  async fetchAll() {
    try {
      this.client.functions.checkEmit(this.client, this.client.eventManager);
      var res = await this.client.httpInstance
        .get(`/graph/all`)
        .then(async (res) => {
          return res.data;
        });

      let graphs = res.map((graph) => new Graph(this.client, graph));
      return graphs;
    } catch (err) {
      if (err.response) {
        return err.response.data;
      } else {
        return err;
      }
    }
  }

  /**
   * Create a graph
   * @returns Graph
   * @param name {string} - Name for the graph
   * @param type {string} - Type of graph (any one of GRAPH_TYPES)
   */
  async create(name, type) {
    try {
      this.client.functions.checkEmit(this.client, this.client.eventManager);
      if (!name) throw new Error("'name' cannot be undefined");
      if (!type) throw new Error("'type' cannot be undefined");
      if (!GRAPH_TYPES.includes(type))
        throw new Error("'type' must be a string (any one of GRAPH_TYPES)");

      var res = await this.client.httpInstance
        .post(
          `/graph/create`,
          { name: name, type: type },
          {
            headers: {
              Authorization: this.client.token,
            },
          }
        )
        .then(async (res) => {
          return res.data;
        });

      return new Graph(this.client, res);
    } catch (err) {
      if (err.response) {
        return err.response.data;
      } else {
        return err;
      }
    }
  }

  /**
   * Delete a graph
   * @returns Graph
   * @param id {string} - ID of the graph
   */
  async delete(id) {
    try {
      this.client.functions.checkEmit(this.client, this.client.eventManager);
      if (!id) throw new Error("'id' cannot be undefined");

      var res = await this.client.httpInstance
        .delete(`/graph/${id}`, {
          headers: {
            Authorization: this.client.token,
          },
        })
        .then(async (res) => {
          return res.data;
        });

      return new Graph(this.client, res);
    } catch (err) {
      if (err.response) {
        return err.response.data;
      } else {
        return err;
      }
    }
  }
}

module.exports = GraphManager;
