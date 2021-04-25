import { readFile, writeFile } from 'fs';
import { config } from 'dotenv'
config({ path: '.env' });

export type BlockchianType = 'rinkeby' | 'kovan';

const CONTRACT_ADDR_ENV = './getterSetterContractAddress.env';
const CONTRACT_FALLBACK_ADDR_ENV = './fallbackContractAddress.env';
const CONTRACTS_ADDR_ENV = {
  rinkeby: CONTRACT_ADDR_ENV,
  kovan: CONTRACT_FALLBACK_ADDR_ENV
}

export function getWebSocketAddr(): string {
  return process.env.ETH_URL;
}

export function getRPC(blockchain: BlockchianType): string {
  if (blockchain == 'rinkeby') {
    return process.env.RINKEBY_RPC;
  }
  return process.env.KOVAN_RPC;
}

function getContractBuildPath(blockchain: BlockchianType): string {
  if (blockchain == 'rinkeby') {
    return './contracts/build/contracts_SimpleGetterSetterUint256_sol_SimpleGetterSetterUint256';
  }
  return './contracts/build/contracts_Fallback_sol_FallBack';
}

export async function getContractCompiled(blockchain: BlockchianType): Promise<{
  abi: any;
  bin: any;
}> {
  const contractBuildPath = getContractBuildPath(blockchain);
  const contract_abi = await readFileAsync(`${contractBuildPath}.abi`);
  const contract_bin = await readFileAsync(`${contractBuildPath}.bin`);
  return {
    abi: JSON.parse(contract_abi),
    bin: contract_bin,
  }
}

function readFileAsync(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(fileName, 'utf8', function (error, data) {
      if (error) {
        return reject(error);
      }
      resolve(data);
    })
  });
}

export function writeContractAddrEnv(blockchain: BlockchianType, contractAddress: string) {
  const CONTRACT_ADDR_ENV = CONTRACTS_ADDR_ENV[blockchain];
  writeFile(CONTRACT_ADDR_ENV, `GETTER_SETTER_CONTRACT_ADDRESS=${contractAddress}`, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Wrote contract address: ${contractAddress} to file ${CONTRACT_ADDR_ENV}`);
    return;
  });
}

export function getGetterSetterContractAddress(): string {
  config({ path: CONTRACT_ADDR_ENV });
  return process.env.GETTER_SETTER_CONTRACT_ADDRESS;
}