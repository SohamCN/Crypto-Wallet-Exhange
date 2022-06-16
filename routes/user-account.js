const express = require('express')
const route = express.Router()
const accountController = require('../controllers/user-account-controller')

route.get('/create-account', accountController.createAccount)
route.get('/list-all-accounts', accountController.listAllAccounts)
route.get('/get-accounts-count', accountController.countOfAccounts)
route.get('/create-multiple-accounts', accountController.createMultipleAccounts)
route.get('/get-account-by-id', accountController.getAccountById)
route.get('/update-account', accountController.updateAccount)

module.exports = route