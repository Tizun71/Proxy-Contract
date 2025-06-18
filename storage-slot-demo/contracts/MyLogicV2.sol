// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract MyLogicV2 {
    struct User {
        uint256 balance;
        string name;
        uint256[49] __gap;
    }
    mapping(address => User) private users;

    function setBalance(uint256 _balance) public {
        users[msg.sender].balance = _balance;
    }

    function getBalance() public view returns (uint256) {
        return users[msg.sender].balance;
    }

    function setName(string memory name) public {
        users[msg.sender].name = name;
    }

    function getName() public view returns (string memory) {
        return users[msg.sender].name;
    }
}