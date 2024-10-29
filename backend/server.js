const Web3 = require("web3");
const app = require("./app");
const sequelize = require("./database");
const { port } = require("./secret");
const { listEventBsc } = require("./service/event-service");

app.listen(port, () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Database connected and synced.");
    })
    .catch((err) => {
      console.error("Unable to sync database:", err);
    });
  console.log(`Server is running on http://localhost:${port}`);
});

let provider = new Web3.providers.WebsocketProvider(process.env.RPC, {
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 60000
  },
  reconnect: {
    auto: true,
    delay: 5000,
    maxAttempts: 5,
    onTimeout: false
  }
});
const web3 = new Web3(provider);
console.log("Web3 connected", web3);

listEventBsc(web3);
