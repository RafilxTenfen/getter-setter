// "SPDX-License-Identifier: UNLICENSED"
pragma solidity 0.8.4;

// SimpleGetterSetterUint256 is a contract to test some values set with chainlink :)
contract SimpleGetterSetterUint256 {
  uint256 public valueLink;

  event SetUint256(address indexed from, uint256 indexed valueLink);

  function setUint256(uint256 _value) public {
    valueLink = _value;
    emit SetUint256(msg.sender, _value);
  }

  function getUint256() external view returns (uint256) {
    return valueLink;
  }

}
