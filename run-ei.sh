if [ -f .env ]
then
  export $(cat .env | xargs)
else
  echo "You need to compile and deploy the getterSetter Contract"
  exit 1
fi

external-initiator "{\"name\":\"eth-kovan-ei\",\"type\":\"ethereum\",\"url\":\"wss://kovan.infura.io/ws/v3/f2f8d283097642bc98a0284d408520b6\"}" \
 --port 8081 \
 --databaseurl $EI_DATABASEURL\
 --ci_accesskey $EI_IC_ACCESSKEY \
 --ci_secret $EI_IC_SECRET \
 --ci_accesskey $EI_CI_ACCESSKEY \
 --ci_secret $EI_CI_SECRET \
 --chainlinkurl $EI_CHAINLINK_URL
