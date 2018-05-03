pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;
  uint secondStoredData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getAgain() public view returns (uint) {
    return secondStoredData;
  }
}
