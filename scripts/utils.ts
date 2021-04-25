import { readFile, writeFile } from 'fs';
import { config } from 'dotenv'
config({ path: '.env' });

const CONTRACT_ADDR_ENV = './contractAddress.env';
const CONTRACT_BUILD_PATH = './contracts/build/contracts_SimpleGetterSetterUint256_sol_SimpleGetterSetterUint256';

export function getWebSocketAddr(): string {
  return process.env.ETH_URL;
}

export function getRPC(): string {
  return process.env.RINKEBY_RPC;
}

export async function getContractCompiled(): Promise<{
  abi: any;
  bin: any;
}> {
  const contract_abi = await readFileAsync(`${CONTRACT_BUILD_PATH}.abi`);
  const contract_bin = await readFileAsync(`${CONTRACT_BUILD_PATH}.bin`);
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

export function writeGetterSetterContractAddrEnv(contractAddress: string) {
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