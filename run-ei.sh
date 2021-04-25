sh env.sh

external-initiator "{\"name\":\"eth-kovan-ei\",\"type\":\"ethereum\",\"url\":\"wss://kovan.infura.io/ws/v3/f2f8d283097642bc98a0284d408520b6\"}" \
 --port 8081 \
 --databaseurl $EI_DATABASEURL\
 --ci_accesskey $EI_IC_ACCESSKEY \
 --ci_secret $EI_IC_SECRET \
 --ci_accesskey $EI_CI_ACCESSKEY \
 --ci_secret $EI_CI_SECRET \
 --chainlinkurl $EI_CHAINLINK_URL
