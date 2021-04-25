import { getContractCompiled, getRPC, writeContractAddrEnv, BlockchianType } from './utils';
import { getWallet } from './wallet';
import { Eth } from 'web3-eth';

const blockchainEnv: string = process.argv[2];
let blockchain: BlockchianType = 'rinkeby';
if (blockchainEnv != blockchain) {
  blockchain = 'kovan';
}

const web3Eth = require('web3-eth'); // wasn't able to use import
const GAS_LIMIT_DEPLOY_CONTRACT = 2000000;
const eth: Eth = new web3Eth(getRPC(blockchain));

eth.getGasPrice((err, gasPrice) => {
  if (err) {
    console.log('err in get gas price', err);
    return;
  }

  const wallet = getWallet(blockchain);
  const account = wallet.getAddedAccount(eth);

  getContractCompiled(blockchain).then((compiledContract) => {
    const contractData = new eth.Contract(compiledContract.abi);

    contractData.deploy({
      data: '0x' + compiledContract.bin,
    }).send({
      from: account.address,
      gas: GAS_LIMIT_DEPLOY_CONTRACT,
      gasPrice: gasPrice,
    }).then((value) => { // the smartcontract addess
      writeContractAddrEnv(blockchain, value.options.address);
    }).catch((err) => {
      console.log('error on deploy contract', err);
    });

    return;
  });

  return;
}).catch((err: any) => {
  console.log(err);
});
