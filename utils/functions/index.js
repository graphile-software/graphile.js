module.exports = {
  checkEmit: (client, emitter) => {
    if (!client.loggedIn) throw new Error("Client is not logged in");
    let eventsEmitted = emitter.eventNames();
    if (!eventsEmitted.includes("ready"))
      throw new Error('"ready" event has not been emitted');

    return true;
  },
};
