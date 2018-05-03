// Allows us to use ES6 in our migrations and tests.
const secrets = require("./secrets.json");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
