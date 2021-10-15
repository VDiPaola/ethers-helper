import { ethers } from 'ethers';

declare const window: any;

export interface InitResponse {
  provider?: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
  signer?: ethers.providers.JsonRpcSigner;
}

export default class EthersHelper {
  initWeb3(): InitResponse {
    // get provider and signer using injected provider
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      provider.on('network', (_, oldNetwork) => {
        if (oldNetwork) {
          // reload on network change
          window.location.reload();
        }
      });
      const signer = provider ? provider.getSigner() : null;
      if (signer) {
        return { provider, signer };
      }
    }
    return {};
  }

  initRpc(rpcProvider: string): InitResponse {
    // get provider and signer using rpc
    const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
    const signer = provider ? provider.getSigner() : null;
    if (provider && signer) {
      return { provider, signer };
    }
    return {};
  }

  metamaskLogin(): Promise<string> {
    return new Promise((resolve, reject) => {
      // prompt user to login to metamask
      if (window.ethereum) {
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((accounts: any) => {
            if (accounts.length > 0) {
              resolve(accounts[0]);
            } else {
              reject('No accounts found from eth_requestAccounts');
            }
          })
          .catch((err: any) => reject(err));
      }
    });
  }

  getUserAccount(signer: ethers.providers.JsonRpcSigner) {
    return new Promise((resolve, reject) => {
      // get account from signer if they are logged in already
      if (signer) {
        signer
          .getAddress()
          .then((addr) => resolve(addr))
          .catch((_) => reject('user not logged in'));
      } else {
        reject('signer is null');
      }
    });
  }

  getContract(address: string, abi: any, provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider) {
    // create contract from given address and abi
    return new Promise((resolve, reject) => {
      if (provider) {
        try {
          const contract = new ethers.Contract(address, abi, provider);
          resolve(contract);
        } catch (err) {
          reject(err);
        }
      } else {
        reject('web3.getContract provider not set');
      }
    });
  }

  getWallet(
    privateKey: string,
    provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  ): Promise<ethers.Wallet> {
    // create wallet from private key
    return new Promise((resolve, reject) => {
      try {
        const wallet = new ethers.Wallet(privateKey, provider);
        resolve(wallet);
      } catch (err) {
        reject(err);
      }
    });
  }
}
