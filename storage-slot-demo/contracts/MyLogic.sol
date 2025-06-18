// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract MyLogic {
    struct User {
        uint256 balance;
        uint256[50] __gap;
    }
    mapping(address => User) private users;

    function setBalance(uint256 balance) public {
        users[msg.sender].balance = balance;
    }

    function getBalance() public view returns (uint256) {
        return  users[msg.sender].balance;
    }
}