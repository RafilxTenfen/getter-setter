import { getContractCompiled, getRPC, writeGetterSetterContractAddrEnv } from './utils';
import { getRinkebyWallet } from './wallet';
import { Eth } from 'web3-eth';

const web3Eth = require('web3-eth'); // wasn't able to use import
const GAS_LIMIT_DEPLOY_CONTRACT = 2000000;

const eth: Eth = new web3Eth(getRPC());

eth.getGasPrice((err, gasPrice) => {
  if (err) {
    console.log('err in get gas price', err);
    return;
  }

  const wallet = getRinkebyWallet();
  const account = wallet.getAddedAccount(eth);

  getContractCompiled().then((compiledContract) => {
    const contractData = new eth.Contract(compiledContract.abi);

    contractData.deploy({
      data: '0x' + compiledContract.bin,
    }).send({
      from: account.address,
      gas: GAS_LIMIT_DEPLOY_CONTRACT,
      gasPrice: gasPrice,
    }).then((value) => { // the smartcontract addess
      writeGetterSetterContractAddrEnv(value.options.address);
    }).catch((err) => {
      console.log('error on deploy contract', err);
    });

    return;
  });

  return;
}).catch((err: any) => {
  console.log(err);
});
