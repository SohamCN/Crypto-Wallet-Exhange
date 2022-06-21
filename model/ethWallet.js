const mongoose = require('mongoose');

const ethWalletSchema = new mongoose.Schema({
    mnemonic:{
        type:String,
        required: true
    },
    xpub :{
        type:String,
        required: true
    },
    eth_wallet_account_address: String,
    pvt_key: String
    },{
        timestamps:true
    })
const ETHWalletDB = mongoose.model('ethWallet', ethWalletSchema)
module.exports = ETHWalletDB