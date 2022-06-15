const { response } = require('express');
const fetch = require('node-fetch')

exports.generateWallet  = async(req,res)=>{

  try{//const query = new URLSearchParams({mnemonic: 'string'}).toString();
  const apiKey = req.body.apiKey
  const resp = await fetch(
    `https://api-eu1.tatum.io/v3/ethereum/wallet`,
    {
      method: 'GET',
      headers: {
        'x-testnet-type': 'ethereum-ropsten',
        'x-api-key': apiKey
      }
    }
  );
  
  const data = await resp.json();
  console.log(data);
  res.status(200).send({message:"Ethereum Wallet Generated Successfully", data})
  }catch(err){
      res.status(500).send({
          error_message: err.message
      })
  }
  }

exports.generateAccountAddress = async(req,res)=>{
  try{
const xpub = req.body.xpub;
const index = req.body.index;
const apiKey = req.body.apiKey;
const resp = await fetch(
  `https://api-eu1.tatum.io/v3/ethereum/address/${xpub}/${index}`,
  {
    method: 'GET',
    headers: {
      'x-testnet-type': 'ethereum-ropstein',
      'x-api-key': apiKey
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send({eth_account_address:data})
  }catch(err){
    res.status(500).send({
      message: err.message
    })
  }
}

exports.generatePrivateKey = async(req,res)=>{
  try{
    const index = req.body.index
    const mnemonic = req.body.mnemonic
    const apiKey = req.body.apiKey
    const resp = await fetch(
      `https://api-eu1.tatum.io/v3/ethereum/wallet/priv`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-testnet-type': 'ethereum-ropsten',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          index: index,
          mnemonic: mnemonic
        })
      }
    );
    
    const data = await resp.json();
    console.log(data);
    res.status(200).send({message:'Privake key generated',data})
  }catch(err){
    res.status(500).send({
      message: err.message
    })
  }
}

exports.getLatestBlockNumber = async(req,res)=>{
  try{
    const apiKey = req.body.apiKey
    const resp = await fetch(
    `https://api-eu1.tatum.io/v3/ethereum/block/current`,
    {
      method: 'GET',
      headers: {
        'x-testnet-type': 'ethereum-ropsten',
        'x-api-key': apiKey
      }
    }
  );
  
  const data = await resp.json();
  console.log(data);
  res.status(200).send({
    latestBlockNumber: data
  })
}catch(err){
  res.status(500).send(err.message)
}
}

exports.getParticularBlockHashDetails = async(req,res)=>{
  try{
    const apiKey = req.body.apiKey
    const hash = req.body.blockNumber;
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/ethereum/block/${hash}`,
  {
    method: 'GET',
    headers: {
      'x-testnet-type': 'ethereum-ropsten',
      'x-api-key': apiKey
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
  }
  catch(err){
    res.status(500).send({
      messsage: err.message
    })
  }
}

exports.getEthereumAccountBalance = async(req,res)=>{
  try{
    const apiKey = req.body.apiKey
    const address = req.body.address;
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/ethereum/account/balance/${address}`,
  {
    method: 'GET',
    headers: {
      'x-testnet-type': 'ethereum-rinkeby',
      'x-api-key': apiKey
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message: err.message
    })
  }
}

exports.getTransactionHash = async(req,res)=>{
  try{
    const apiKey = req.body.apiKey
    const hash = req.body.transactionHash
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/ethereum/transaction/${hash}`,
  {
    method: 'GET',
    headers: {
      'x-testnet-type': 'ethereum-rinkeby',
      'x-api-key': apiKey
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send(data)
  }catch(err){
    res.status(500).send({
      message: err.message
    })
  }
}

exports.getOutgoingTransactions = async(req,res)=>{
  try{
    const apiKey = req.body.apiKey
    const address = req.body.address
    const resp = await fetch(
  `https://api-eu1.tatum.io/v3/ethereum/transaction/count/${address}`,
  {
    method: 'GET',
    headers: {
      'x-testnet-type': 'ethereum-ropsten',
      'x-api-key': apiKey
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send({
  number_of_outgoing_transactions: data
})
  }catch(err){
    res.status(500).send(err.message)
  }
}
