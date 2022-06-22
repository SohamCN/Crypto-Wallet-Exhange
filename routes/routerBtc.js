const express = require('express')
const bitcoinController = require('../controllers/bitcoin-controller')
const route = express.Router()

route.get('/generate-bitcoin-wallet', bitcoinController.generateWallet)
route.get('/get-account-address', bitcoinController.getAccountAddress)
route.get('/generate-private-key', bitcoinController.generatePrivateKey)
route.get('/connect-to-tatum-btc-node', bitcoinController.connnectToBTCTatumNode)
route.get('/get-blockchain-info', bitcoinController.blockChainInfo)
route.get('/get-block-hash', bitcoinController.getBlockHash)
route.get('/get-hash-details', bitcoinController.getBlockDetailsByHash)
route.get('/get-transaction-details-by-hash', bitcoinController.transactionByHash)
route.get('/get-mempool-transactions', bitcoinController.getMemPoolTransactions)
route.get('/get-transaction-details-by-address', bitcoinController.transactionByAddress)
route.get('/get-balance', bitcoinController.getBalance)
route.get('/get-utxo-transaction', bitcoinController.getUTXOTransaction)

module.exports = route