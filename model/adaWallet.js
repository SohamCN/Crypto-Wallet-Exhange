const mongoose = require('mongoose');

const adaWalletSchema = new mongoose.Schema({
    mnemonic:{
        type:String,
        required: true
    },
    xpub :{
        type:String,
        required: true
    },
    ada_wallet_account_address: String,
    pvt_key: String
    },{
        timestamps:true
    })
const ADAWalletDB = mongoose.model('adaWallet', adaWalletSchema)
module.exports = ADAWalletDB