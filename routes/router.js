const express = require('express')
const ethereumController = require('../controllers/ethereum-controller.js')
const route = express.Router()
route.get('/generate-ethereum-wallet', ethereumController.generateWallet)
route.get('/generate-ethereum-account-address', ethereumController.generateAccountAddress)
route.get('/generate-ethereum-privake-key', ethereumController.generatePrivateKey)
route.get('/get-latest-block', ethereumController.getLatestBlockNumber)
route.get('/get-block-hash-details', ethereumController.getParticularBlockHashDetails)
route.get('/get-account-balance-ethereum', ethereumController.getEthereumAccountBalance)
route.get('/get-transaction-hash', ethereumController.getTransactionHash)
route.get('/get-outgoing-transactions', ethereumController.getOutgoingTransactions)

module.exports = route