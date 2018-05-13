// Allows us to use ES6 in our migrations and tests.
require("babel-register");
const secrets = require("./secrets.json");
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      gas: 3000000,
      gasPrice: 10000000000,
      provider: function() {
        return new HDWalletProvider(
          secrets.mnemonic,
          "https://ropsten.infura.io/" + secrets.token
        );
      },
      network_id: 3 // Official ID of the Ropsten Network
    },
    kovan: {
      gas: 3000000,
      gasPrice: 10000000000,
      provider: function() {
        return new HDWalletProvider(
          secrets.mnemonic,
          "https://kovan.infura.io/" + secrets.token
        );
      },
      network_id: 42 // Official ID of the Ropsten Network
    }
  }
};
