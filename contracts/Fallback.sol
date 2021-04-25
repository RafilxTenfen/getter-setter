// "SPDX-License-Identifier: UNLICENSED"
pragma solidity 0.8.4;

// FallBack is a contract to receive ETH and triggers event in EI
contract FallBack {

  event NewEvent(uint256 value);

  fallback() external payable {
    emit NewEvent(msg.value);
  }

}
