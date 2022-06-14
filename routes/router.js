import express from 'express'
import fetch from 'node-fetch'

var route = express.Router()

route.get('/generate-ethereum-wallet', async(req,res)=>{

    try{//const query = new URLSearchParams({mnemonic: 'string'}).toString();
    
    const resp = await fetch(
      `https://api-eu1.tatum.io/v3/ethereum/wallet`,
      {
        method: 'GET',
        headers: {
          'x-testnet-type': 'ethereum-ropsten',
          'x-api-key': '437e4fe2-818f-4a9f-9375-83fc6e72f667'
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
    })

export default route