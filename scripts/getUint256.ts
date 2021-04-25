import { getContractCompiled, getGetterSetterContractAddress, getRPC } from './utils';
import { getRinkebyWallet } from './wallet';
import { Eth } from 'web3-eth';

const web3Eth = require('web3-eth'); // wasn't able to use import

const eth: Eth = new web3Eth(getRPC());

getContractCompiled().then((compiledContract) => {
  const wallet = getRinkebyWallet();
  const contractData = new eth.Contract(compiledContract.abi, getGetterSetterContractAddress(), { from: wallet.publicAddress });

  contractData.methods.getUint256().call().then((result: any) => {
    console.log(result);
  });

  return;
});