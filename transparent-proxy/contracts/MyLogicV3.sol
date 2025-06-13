// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
contract MyLogicV3 is Initializable{
    uint256 public number;
    function initialize(uint256 _initialValue) public initializer(){
        number = _initialValue;
    }

    function setNumber(uint256 _num) public {
        number = _num;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }

    function getNewNumber() public view returns (uint256) {
        return 100 + number;
    }
}