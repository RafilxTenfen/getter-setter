import { BlockchianType, getFallbackContractAddress, getRPC, writeContractAddrEnv, writeValueAt } from './utils';
import { getWallet } from './wallet';
import { Eth } from 'web3-eth';
import BN = require("bn.js")

const GAS_LIMIT = 2000000;
const abi = require('erc-20-abi');
const web3Eth = require('web3-eth'); // wasn't able to use import
const blockchain: BlockchianType = 'kovan';
const eth: Eth = new web3Eth(getRPC(blockchain));
const ENV_PATH_TX = './sendLinkTx.env';
const ENV_KEY_TX = 'TX_ADDRESS';

const chainLinkTokenAddress = "0xa36085F69e2889c224210F603D836748e7dC0088";
const wallet = getWallet(blockchain);
wallet.getAddedAccount(eth);

eth.getGasPrice((err, gasPrice) => {
  const contractData = new eth.Contract(abi, chainLinkTokenAddress, { from: wallet.publicAddress});
  const linkValue = new BN('4870000000000000');
  contractData.methods.transfer(getFallbackContractAddress(), linkValue).send({
    gas: GAS_LIMIT,
    gasPrice: gasPrice,
  }).then((value: any) => {
    // console.log('txData', value.events.Transfer);
    writeValueAt(ENV_PATH_TX, ENV_KEY_TX, value.transactionHash);
  });
});