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

let updated = await BtcWalletDb.findOneAndUpdate({"xpub":xpub},{"btc_wallet_account_address":data.address},{new:true})
// let preferredOrder = async(obj, order)=> {
//   var orderedObject = updated;
//   for(var i = 0; i < order.length; i++) {
//       if(obj.hasOwnProperty(order[i])) {
//           orderedObject[order[i]] = obj[order[i]];
//       }
//   }
//    return orderedObject;
// }
// updated = await preferredOrder(updated,[
//   "_id", "mnemonic","xpub", "btc_wallet_account_address", "__v","createdAt", "updatedAt"
// ])
  // let array = [...updated]

console.log(updated);
res.status(200).send(data)
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}

exports.generatePrivateKey = async(req,res)=>{
  try{
    const resp = await fetch(
      `https://api-eu1.tatum.io/v3/bitcoin/wallet/priv`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
        },
        body: JSON.stringify({
          index: req.body.index,
          mnemonic: req.body.mnemonic
        })
      }
    );
    
    const data = await resp.json();
    console.log(data);
     let updated = await BtcWalletDb.findOneAndUpdate({"mnemonic":req.body.mnemonic},{"pvt_key":data.key},{new:true})
     console.log(updated);
    res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.connnectToBTCTatumNode = async(req,res)=>{
  try{
    const resp = await fetch(
      `https://api-eu1.tatum.io/v3/bitcoin/node`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '1.0',
          id: 'test',
          method: 'getblockcount',
          params: []
        })
      }
    );
    
    const data = await resp.json();
    console.log(data);
    res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.blockChainInfo = async(req,res)=>{
  try{
    const resp = await fetch(
      `https://api-eu1.tatum.io/v3/bitcoin/info`,
      {
        method: 'GET',
        headers: {
          'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
        }
      }
    );
    
    const data = await resp.json();
    console.log(data);
    res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.getBlockHash = async(req,res)=>{
  try{
    const i = req.body.block;
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/bitcoin/block/hash/${i}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.getBlockDetailsByHash = async(req,res)=>{
  try{
    const hash = req.body.hash;
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/bitcoin/block/${hash}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.transactionByHash = async(req,res)=>{
  try{
    const hash = req.body.hash; //this hash is present in the output of getBlockDetailsByHash
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/bitcoin/transaction/${hash}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.getMemPoolTransactions = async(req,res)=>{
  try{
    const resp = await fetch(
      `https://api-eu1.tatum.io/v3/bitcoin/mempool`,
      {
        method: 'GET',
        headers: {
          'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
        }
      }
    );
    
    const data = await resp.json();
    console.log(data);
    res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.transactionByAddress = async(req,res)=>{
  try{
    const query = new URLSearchParams({
      pageSize: '10',
      offset: '0'
    }).toString();
    const address = req.body.address;
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/bitcoin/transaction/address/${address}?${query}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.getBalance = async(req,res)=>{
  try{
    const address = req.body.address;
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/bitcoin/address/balance/${address}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.getUTXOTransaction = async(req,res)=>{
  try{
    const hash = req.body.hash;
    const index = req.body.index;
const resp = await fetch(
  `https://api-eu1.tatum.io/v3/bitcoin/utxo/${hash}/${index}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)

  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.functionName = async(req,res)=>{
  try{

  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}

exports.functionName = async(req,res)=>{
  try{

  }catch(err){
    res.status(500).send({
      message:err.message
    })
  }
}