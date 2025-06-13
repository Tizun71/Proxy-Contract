// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract MyLogic {
    uint256 public number;

    function initialize(uint256 _initialValue) public {
        number = _initialValue;
    }

    function setNumber(uint256 _num) public {
        number = _num;
    }
}