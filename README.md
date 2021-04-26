# Chainlink External Initiator scripts

- This is a project to test ChainLink functionalities

- The goal of this is to use an External Initiator that watches for an oracle contract event in the kovan testnet and triggers a task to write into another smart contract into the rinkeby testnet

### Assumptions
- You should have the following tecnologies to run this project
  - Linux based enviroment
  - [docker](https://docs.docker.com/get-docker/)
  - [docker-compose](https://docs.docker.com/compose/install/)
  - [npm](https://docs.npmjs.com) ^12.18
  - [chainlink](https://github.com/smartcontractkit/chainlink) build and in your $PATH
  - [external-initiator](https://github.com/smartcontractkit/external-initiator) build and in your $PATH

- Also some env variables is needed
```env
ROOT='...'
LOG_LEVEL='...'
ETH_CHAIN_ID='...'
MIN_OUTGOING_CONFIRMATIONS='...'
LINK_CONTRACT_ADDRESS='...'
CHAINLINK_TLS_PORT='...'
SECURE_COOKIES='...'
GAS_UPDATER_ENABLED='...'
ALLOW_ORIGINS='...'
ETH_URL='...'
DATABASE_URL='...'
DATABASE_TIMEOUT='...'
CHAINLINK_DEV='...'
FEATURE_EXTERNAL_INITIATORS='...'
RINKEBY_RPC='...'
KOVAN_RPC='...'

# variables for the external initiator
EI_DATABASEURL='...'
EI_CI_ACCESSKEY='...'
EI_CI_SECRET='...'
EI_IC_ACCESSKEY='...'
EI_IC_SECRET='...'
EI_CHAINLINK_URL='...'
```

- Create the following files
  - `.password` With an password with at least 3 capital letters, 3 special characters and 3 numbers
  - `.api` With and email in the first line and any password in the second line
  - `/scripts/wallet.secret.ts` in the following format:
  ```ts-node
  export const wallets = {
    rinkeby: {
      publicAddress: '...',
      privateKey: '...',
      password: '...'
    },
    kovan: {
      publicAddress: '...',
      privateKey: '...',
      password: '...'
    },
  };
  ```
  > This wallets should have funds in ETH and LINK

### How to Run
- Start running the postgresql and adminer
```shell
$~ sh run-postgresql.sh
```
> This will start the postgresql at 5432 and the adminer at 8080

- Run the ChainLink node pointed to Rinkeby
```shell
$~ sh run-chainlink.sh
```
> It should start a client at 6688

- Go to [chainlinl local client](http://localhost:6688/keys)
- Make sure that your Account addresses have funds

- Add an external initiator to the chainlink
```shell
$~ sh add-ei.sh
```
> This will generate the env variables for the External Initiator in `ei.conf` file

- Run the External Initiator
```shell
$~ sh run-ei.sh
```

- Install the dependencies
```shell
$~ npm i
```

- Compile the Simple Getter Setter contract
```shell
$~ npm run compile-getter-setter
```
> This will generate the bin and abi from the `SimpleGetterSetterUint256.sol`

- Deploy the smart contract to the rinkeby
```shell
$~ npm run deploy-getter-setter
```
> Running this command will deploy the smart contract and write the address to `./getterSetterContractAddress.env`

- Generate the jobspec to update the contract address to write
```shell
$~ sh generate-jobspec-EI.sh
```
> This will create a new [job](http://localhost:6688/jobs/) at the chainlink node via CLI

- Now you can send LINK to any address in the kovan network and it will trigger the tasks to write at the Getter Setter contract address in the rinkeby
> It was made this way to watch the smart contract that ChainLink has in the kovan network `0xa36085F69e2889c224210F603D836748e7dC0088`, it's probable that exist a better way to do it, but using just a contract like the `Fallback.sol` and send LINK to the contract address in the Kovan, I wasn't able to read the amount of LINK sent, it could be done sending Ether and reading the amount of ether sent to the contract and emit an Event to trigger the External initiator if pointed to the Fallback contract address.

- Deploy the Fallback smart contract to kovan
```shell
$~ npm run deploy-fallback
```
> A new contract will be deployed at kovan

- Send `4870000000000000` or `0.00487` LINK to our new deployed contract
```shell
$~ npm run send-link
```
> A new transaction will be sent to the chainlink kovan address to transfer to our fallback contract `0.00487` LINK


- You can check if the value was set to the Contract on rinkeby
```shell
$~ npm run get256
```

__Expected Result__
![](https://i.imgur.com/O7RLzU3.png)

> Obs.: Since we are looking at the chainlink smart contract if anyone in the kovan network sends LINK after you, the `npm run get256` could return a different number than the expected

### Completion
- [Transaction](https://kovan.etherscan.io/tx/0x2437fe2210a20f20a48b8cbd5f52c81c456a2c4278c0a1eb462b1b92a0d20895) on Kovan showing the LINK sent: 0x2437fe2210a20f20a48b8cbd5f52c81c456a2c4278c0a1eb462b1b92a0d20895
  ![](https://i.imgur.com/2pKN0Bg.png)
- [Transaction](https://rinkeby.etherscan.io/tx/0x640087e4ba54e933ba188e6f5ff77632ec8dfd7b515f0b9f40c10e3944d0590e) on Rinkeby showing the Chainlink node writing to the GetterSetter contract
  ![](https://i.imgur.com/P7ODhYE.png)
- Job spec used in the Chainlink node
```json
{
  "name": "EI Write rinkeby GetterSetter",
  "initiators": [
    {
      "type": "external",
      "params": {
        "name": "rafilx-chainlink-ei",
        "body": {
          "endpoint": "eth-kovan-ei",
          "addresses": [
            "0xa36085F69e2889c224210F603D836748e7dC0088"
          ]
        }
      }
    }
  ],
  "tasks": [
    {
      "type": "copy",
      "params": {
        "copyPath": [
          "data"
        ]
      }
    },
    {
      "type": "ethuint256"
    },
    {
      "type": "ethtx",
      "params": {
        "address": "0xb95d18Bdacb7D4965B205d9985Ed2A6c93C224f8",
        "functionSelector": "setUint256(uint256)"
      }
    }
  ]
}
```

##### TODO
- Create scripts and update Readme to run the external adapter