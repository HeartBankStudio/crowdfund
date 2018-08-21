const { HOST, CHAIN } = require("./config");
const { adminProvider } = require("./scripts/web3");

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: HOST,
      port: CHAIN,
      network_id: "*"
    },
    rinkeby: {
      provider: adminProvider,
      network_id: 4,
      gas: 3000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  },
  mocha: {
    useColors: true
  } 
};
