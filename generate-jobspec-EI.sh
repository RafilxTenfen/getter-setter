if [ -f getterSetterContractAddress.env ]
then
  export $(cat getterSetterContractAddress.env | xargs)
else
  echo "You need to compile and deploy the getterSetter Contract"
  exit 1
fi

echo "
{
  \"name\": \"EI Write rinkeby GetterSetter\",
  \"initiators\": [
    {
      \"type\": \"external\",
      \"params\": {
        \"name\": \"rafilx-chainlink-ei\",
        \"body\": {
          \"endpoint\": \"eth-kovan-ei\",
          \"addresses\": [
            \"0xa36085F69e2889c224210F603D836748e7dC0088\"
          ]
        }
      }
    }
  ],
  \"tasks\": [
    {
      \"type\": \"copy\",
      \"params\": {
        \"copyPath\": [
          \"data\"
        ]
      }
    },
    {
      \"type\": \"ethuint256\"
    },
    {
      \"type\": \"ethtx\",
      \"params\": {
        \"address\": \"${GETTER_SETTER_CONTRACT_ADDRESS}\",
        \"functionSelector\": \"setUint256(uint256)\"
      }
    }
  ]
}
" > jobspec/EIKovanToRinkeby.json