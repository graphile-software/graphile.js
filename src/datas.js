const { Data } = require("./../utils/data");
const GRAPH_TYPES = require("./../utils/types/GRAPH_TYPES.json");

class DataManager {
  constructor(client) {
    if (!client) throw new Error('"client" cannot be undefined');
    this.client = client;
  }
  /**
   * Post data to a graph
   * @returns Graph
   * @param id {string} - ID of the graph
   * @param value {number} - Value to be posted
   * @param options {object} - Options for the post
   */
  async post(id, value, options) {
    try {
      this.client.functions.checkEmit(this.client, this.client.eventManager);
      if (!id) throw new Error("'id' cannot be undefined");
      if (typeof value == "undefined")
        throw new Error("'value' cannot be undefined");
      if (typeof value !== "number")
        throw new Error("'value' must be typeof number");

      var res = await this.client.httpInstance
        .post(
          `/graph/${id}`,
          { value: value, color: options ? options.color : undefined },
          {
            headers: {
              Authorization: this.client.token,
            },
          }
        )
        .then(async (res) => {
          return res.data;
        });

      return new Data(this.client, res);
    } catch (err) {
      if (err.response) {
        return err.response.data;
      } else {
        return err;
      }
    }
  }
}

module.exports = DataManager;
