const express = require('express')
const bitcoinController = require('../controllers/bitcoin-controller')
const route = express.Router()

route.get('/generate-bitcoin-wallet', bitcoinController.generateWallet)
route.get('/get-account-address', bitcoinController.getAccountAddress)

module.exports = route