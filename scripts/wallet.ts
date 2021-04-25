import { Eth } from 'web3-eth';
import { AddedAccount } from 'web3-core';
import { wallets } from './wallet.secret';

export class Wallet {
  publicAddress: string;
  privateKey: string;
  password: string;
  addedAccount: AddedAccount;

  constructor(publicAddr: string, privKey: string, password: string) {
    this.publicAddress = publicAddr;
    this.privateKey = privKey;
    this.password = password;
    this.addedAccount = null;
  }

  getAddedAccount(eth: Eth) {
    if (this.addedAccount == null) {
      this.addedAccount = eth.accounts.wallet.add({
        address: this.publicAddress,
        privateKey: this.privateKey,
      });
    }
    return this.addedAccount;
  }

  getWalletPrivKey(): Buffer {
    return Buffer.from(this.privateKey, 'hex');
  }

  unlockAccount(eth: Eth, unlockDuration: number = 15000) {
    eth.personal.unlockAccount(this.publicAddress, this.password, unlockDuration).then((value) => {
      console.log('unlockAccount value', value);
    }).catch((reason) => {
      console.log('unlockAccount catch', reason);
    })
  }

}

export function getWallet(blockchain: 'rinkeby' | 'kovan'): Wallet {
  return new Wallet(wallets[blockchain].publicAddress, wallets[blockchain].privateKey, wallets[blockchain].password);
}
