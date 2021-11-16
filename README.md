<div  align="center">

<br>

# graphile.js

<br>

<p>
Node.js library for interacting with Graphile's REST API
</p>

<br>

<p>
<br>

<a  href="https://www.npmjs.com/package/graphile.js"><img  src="https://img.shields.io/npm/v/graphile.js.svg?maxAge=3600"  alt="NPM version" /></a>
<a  href="https://www.npmjs.com/package/graphile.js"><img  src="https://img.shields.io/npm/dt/graphile.js.svg?maxAge=3600"  alt="NPM downloads" /></a>
<a  href="https://www.npmjs.com/package/graphile.js"><img  src="https://api.ghprofile.me/view?username=graphile-software-graphile.js&label=repository%20view%20count&style=flat"  alt="Repository view count" /></a>

</p>

<br>

<p>
<a  href="https://nodei.co/npm/graphile.js/"><img  src="https://nodei.co/npm/graphile.js.png?downloads=true&stars=true"  alt="npm installnfo" /></a>
</p>
</div>

# Example

```js
const { Client } = require("graphile.js");

const client = new Client({
  url: "http://localhost:3001/",
  tokem: "abc123",
});
let GraphManager = new client.GraphManager(client);
let DataManager = new client.DataManager(client);

client.on("ready", async function (client) {
  console.log(`[Graphile] Client logged in and ready`);

  await GraphManager.fetch("909981006453411800", "id").then((data) => {
    console.log(data); // Returns information about the graph specified (ID)
  });
  await DataManager.post("909981006453411800", -6583498689, {
    color: "#4287f5",
  }).then((data) => {
    console.log(data); // Posts data to the graph specified (ID)
  });
});
```
