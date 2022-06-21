const fetch = require('node-fetch')
const BtcWalletDb = require('../model/btcWallet')

exports.generateWallet = async(req,res)=>{
    try{
        const resp = await fetch(
            `https://api-eu1.tatum.io/v3/bitcoin/wallet`,
            {
              method: 'GET',
              headers: {
                'x-api-key': req.body.apiKey
              }
            }
          );
          
          const data = await resp.json();
          console.log(data);
          res.status(200).send(data)
          const wallet = await new BtcWalletDb({
            mnemonic: data.mnemonic,
            xpub: data.xpub
          })
          wallet
                .save(wallet)
                .then(walletSavedData=>{
                  console.log(walletSavedData);
                })
                .catch(err=>{
                  console.log("walletdataSavingError", err.message)
                })
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}

exports.getAccountAddress = async(req,res)=>{
    try{
        const xpub = req.body.xpub
        const index = req.body.index
        const resp = await fetch(
  `https://api-eu1.tatum.io/v3/bitcoin/address/${xpub}/${index}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': req.body.apiKey
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
const updated = await BtcWalletDb.findOneAndUpdate({"xpub":xpub},{"btc_wallet_account_address":data.address},{new:true})
console.log(updated);
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}