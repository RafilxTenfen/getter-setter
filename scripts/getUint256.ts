import { BlockchianType, getContractCompiled, getGetterSetterContractAddress, getRPC } from './utils';
import { getWallet } from './wallet';
import { Eth } from 'web3-eth';

const web3Eth = require('web3-eth'); // wasn't able to use import
const blockchain: BlockchianType = 'rinkeby';

const eth: Eth = new web3Eth(getRPC(blockchain));

getContractCompiled(blockchain).then((compiledContract) => {
  const wallet = getWallet(blockchain);
  const contractData = new eth.Contract(compiledContract.abi, getGetterSetterContractAddress(), { from: wallet.publicAddress });

  contractData.methods.getUint256().call().then((result: any) => {
    console.log(result);
  });

  return;
});