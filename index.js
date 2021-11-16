const axios = require("axios");
const EventEmitter = require("events").EventEmitter;
const eventManager = new EventEmitter();

class Client {
  constructor(options) {
    var instance = this;
    EventEmitter.call(instance);
    this.eventManager = eventManager;

    if (!options.url) throw new Error('"url" cannot be undefined');
    if (!options.token) throw new Error('"token" cannot be undefined');

    this.url = options.url;
    this.token = options.token;
    this.clientData = {
      url: this.url,
      token: this.token,
    };

    this.httpInstance = axios.create({
      baseURL: this.url,
    });

    /* Try Login Details */
    var login = this.httpInstance
      .post("/util/check-token", {
        token: this.token,
      })
      .catch(function (error) {
        throw error;
      });
    this.loggedIn = false;
    (async () => {
      let loginData = await login;
      let res = loginData.data;

      if (!res.valid) {
        this.loggedIn = false;
        throw new Error("Invalid token provided");
      } else {
        this.loggedIn = true;
        eventManager.emit("ready", this);
      }
    })();

    /* Require Files */
    this.functions = require("./utils/functions/index");
    this.GraphManager = require("./src/graphs");
    this.DataManager = require("./src/datas");
  }

  on(event, f) {
    try {
      eventManager.on(event, f);
    } catch (err) {
      return err;
    }
  }

  once(event, f) {
    try {
      eventManager.once(event, f);
    } catch (err) {
      return err;
    }
  }
}

module.exports = { Client };
