# Chainlink External Initiator scripts

- This is a project to test ChainLink functionalities

- The goal of this is to use an External Initiator that watches for a oracle contract event in the kovan testnet and triggers a task to write into another smartcontract into the rinkeby testnet

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
> It should start an client at 6688

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
