const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const { HOST, CHAIN, MNEMONIC, INFURA } = require("../config");

const endpoint = process.env.NODE_ENV === "production" ? INFURA : `http://${HOST}:${CHAIN}`;
const clientProvider = typeof window !== "undefined" && typeof window.web3 !== "undefined" ? window.web3.currentProvider : new Web3.providers.HttpProvider(endpoint);
const adminProvider = new HDWalletProvider(MNEMONIC, INFURA);

module.exports = {
    clientProvider,
    adminProvider,
    clientWeb3: new Web3(clientProvider),
    adminWeb3: new Web3(adminProvider),
};