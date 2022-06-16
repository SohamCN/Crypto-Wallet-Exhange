const { response } = require('express');
const fetch = require('node-fetch')

exports.createAccount = async(req,res)=>{
    try{
        const resp = await fetch(
            `https://api-eu1.tatum.io/v3/ledger/account`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': req.body.apiKey
              },
              body: JSON.stringify({
                currency: req.body.currency,
                xpub: req.body.xpub,
                customer: {
                  accountingCurrency: 'USD',
                  customerCountry: 'US',
                  externalId: '123654',
                  providerCountry: 'US'
                },
                compliant: false,
                accountCode: 'AC_1011_B',
                accountingCurrency: 'USD',
                accountNumber: '123456'
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

exports.listAllAccounts = async(req,res)=>{
    try{
        const query = new URLSearchParams({
            pageSize: '20',
            page: '1',
            sort: 'asc',
            sortBy: 'id',
            active: 'true',
            //onlyNonZeroBalance: 'true',
            frozen: 'false',
            currency: 'ETH',
            accountCode: 'AC_1011_B',
            accountNumber: '123456',
            customerId: '62aad851191792eb42180767'
          });
          
          const resp = await fetch(
            `https://api-eu1.tatum.io/v3/ledger/account`,
            {
              method: 'GET',
              headers: {
                'x-api-key': req.body.apiKey
              }
            }
          );
          
          const data = await resp.json();
          console.log(data);
          res.status(200).send({
           allaccounts:data
          })
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}

exports.countOfAccounts = async(req,res)=>{
    try{
        const query = new URLSearchParams({
            pageSize: '20',
            page: '1',
            sort: 'asc',
            sortBy: 'id',
            active: 'true',
            //onlyNonZeroBalance: 'true',
            frozen: 'false',
            currency: 'ETH',
            accountCode: 'AC_1011_B',
            accountNumber: '123456',
            customerId: '62aad851191792eb42180767'
          }).toString();
          
          const resp = await fetch(
            `https://api-eu1.tatum.io/v3/ledger/account/count?${query}`,
            {
              method: 'GET',
              headers: {
                'x-api-key': req.body.apiKey
              }
            }
          );
          
          const data = await resp.json();
          console.log(data);
        res.status(200).send({
            count:data
        })
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}

exports.createMultipleAccounts = async(req,res)=>{
    try{
        const resp = await fetch(
            `https://api-eu1.tatum.io/v3/ledger/account/batch`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': req.body.apiKey
              },
              body: JSON.stringify({
                accounts: [
                  {
                    currency: 'ETH',
                    xpub: req.body.xpub,
                    customer: {
                      accountingCurrency: 'USD',
                      customerCountry: 'US',
                      externalId: '123654',
                      providerCountry: 'US'
                    },
                    compliant: false,
                    accountCode: 'AC_1011_B',
                    accountingCurrency: 'USD',
                    accountNumber: '123456'
                  }
                ]
              })
            }
          );
          
          const data = await resp.json();
          console.log(data);
          res.status(200).send({
              createdAccounts: data
          })
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}

exports.getAccountById = async(req,res)=>{
    try{
        const id = req.body.id;
        const resp = await fetch(
  `https://api-eu1.tatum.io/v3/ledger/account/${id}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': req.body.apiKey
    }
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send({
    accountFetchedById: data
})
    }catch(err){
        response.status(500).send({
            message: err.message
        })
    }
}

exports.updateAccount = async(req,res)=>{
    try{
        const id = req.body.id;
const resp = await fetch(
  `https://api-eu1.tatum.io/v3/ledger/account/${id}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': req.body.apiKey
    },
    body: JSON.stringify({
      accountCode: 'AC_1011_B',
      accountNumber: '123456',
      active: req.body.active
    })
  }
);

const data = await resp.json();
console.log(data);
res.status(200).send({
    updatedAccount: data
})
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}