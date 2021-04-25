
if [ ! -f .env ]
then
  export $(cat .env | xargs)
fi

# It expects a .env file as
# ROOT='...'
# LOG_LEVEL='...'
# ETH_CHAIN_ID='...'
# MIN_OUTGOING_CONFIRMATIONS='...'
# LINK_CONTRACT_ADDRESS='...'
# CHAINLINK_TLS_PORT='...'
# SECURE_COOKIES='...'
# GAS_UPDATER_ENABLED='...'
# ALLOW_ORIGINS='...'
# ETH_URL='...'
# DATABASE_URL='...'
# DATABASE_TIMEOUT='...'
# CHAINLINK_DEV='...'
# FEATURE_EXTERNAL_INITIATORS='...'
# RINKEBY_RPC='...'
# EI_DATABASEURL='...'
# EI_CI_ACCESSKEY='...'
# EI_CI_SECRET='...'
# EI_IC_ACCESSKEY='...'
# EI_IC_SECRET='...'
# EI_CHAINLINK_URL='...'