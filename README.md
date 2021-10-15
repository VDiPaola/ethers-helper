# Ethers.js Helper Class

npm
```
npm install ethers-helper
```
yarn
```
yarn add ethers-helper
```

# Using ethers-helper

import and create object
```
import EthersHelper from '../index';
const ethersHelper = new EthersHelper();
```

getting provider and signer with window.ethereum
```
const {provider, signer} = ethersHelper.initWeb3();
```
getting provider and signer with custom RPC
```
const {provider, signer} = ethersHelper.initRpc('http://127.0.0.1:7545');
```

prompt metamask login (returns account address)
```
const account = await ethersHelper.metamaskLogin()
```

get account address from signer if they are already connected
```
const account = await ethersHelper.getUserAccount(signer)
```

get contract
```
const contract = await ethersHelper.getContract(address, abi, provider)
```

get ether.js wallet object from a given private key
```
const wallet = await ethersHelper.getWallet(privateKey, provider)
```