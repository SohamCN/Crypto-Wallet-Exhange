const mongoose = require('mongoose');

const btcWalletSchema = new mongoose.Schema({
    mnemonic:{
        type:String,
        required: true
    },
    xpub :{
        type:String,
        required: true
    },
    btc_wallet_account_address:{
        type:[{address:String}],
        default:[]
    },
    pvt_key:{type:[{key:String}],
    default:[]}
    },{
        timestamps:true
    })
const BTCWalletDB = mongoose.model('btcWallet', btcWalletSchema)
module.exports = BTCWalletDB