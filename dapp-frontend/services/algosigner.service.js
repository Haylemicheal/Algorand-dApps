export const AlgoService = {
    connectAlgosigner,
    setupSDK,
    getAccounts,
    signAsset,
    getAssetsfromIndexer,
    signAssetOptinTransaction
};
const algosdk = require('algosdk');
const algodServer = 'http://localhost'
const token = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    
const port = '4001';

const algodClient = new algosdk.Algodv2(token, algodServer, port);
function connectAlgosigner() {
    AlgoSigner.connect()
    .then((d) => {
        console.log("Connected")
    })
    .catch((e) => {
    console.error(e);
    });
}

function setupSDK() {
    algodClient.healthCheck().do()
    .then(d => { 
        console.log("Healthy")
    })
    .catch(e => { 
    console.error(e); 
    });
}
function getAccounts() {
    AlgoSigner.accounts({
        ledger: 'TestNet'
      })
      .then((d) => {
        let account = document.getElementById('accounts')
        for(let i in d) {
            var tag = document.createElement("option");
            var text = document.createTextNode(d[i].address);
            tag.appendChild(text);
            account.appendChild(tag)
        }
      })
      .catch((e) => {
        console.error(e);
      });
}

function signAsset(data) {
    let txParamsJS = ''
    algodClient.getTransactionParams().do()
    .then((d) => {
     data = {
         ...data,
         'suggestedParams': {...d}
     }
     const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject(
        data
    );
      
      const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
      
      AlgoSigner.signTxn([{txn: txn_b64}])
      .then((d) => {
        console.log(d)
      })
      .catch((e) => {
        console.error(e);
      });

     console.log(data)
    })
    .catch((e) => {
    console.error(e);
    });

}
function getAssetsfromIndexer() {
    const name = document.getElementById('name').value;
    const limit = document.getElementById('limit').value;

    AlgoSigner.indexer({
    ledger: 'TestNet',
    path: `/v2/assets?name=${name}&limit=${limit}`,
    })
    .then((d) => {
    document.getElementById('assets-code').innerHTML = JSON.stringify(d);
    })
    .catch((e) => {
    console.error(e);
    document.getElementById('assets-code').innerHTML = JSON.stringify(e);
    });
}
function signAssetOptinTransaction() {
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: document.getElementById('from').value,
        to: document.getElementById('from').value,
        assetIndex: +document.getElementById('asset').value,
        note: AlgoSigner.encoding.stringToByteArray(document.getElementById('note').value),
        amount: 0,
        suggestedParams: {...txParamsJS}
      });
      
      // Use the AlgoSigner encoding library to make the transactions base64
      const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
      
      AlgoSigner.signTxn([{txn: txn_b64}]) 
      .then((d) => {
        signedTxs = d;
        signCodeElem.innerHTML = JSON.stringify(d, null, 2);
      })
      .catch((e) => {
        console.error(e);
      });
}
