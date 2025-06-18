// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./MyLogicV3.sol";
contract MyLogicV4 {
    struct User {
        string name_of_user;
        uint8 age;
        uint256 balance;
        bool gender;
    }
    mapping(address => User) private users;

    function migrate(address[] memory userList, address oldContractAddress) external {
    MyLogicV3 oldContract = MyLogicV3(oldContractAddress);

    for (uint i = 0; i < userList.length; i++) {
        address userAddress = userList[i];

        (string memory name, uint256 balance, bool gender) = oldContract.getUser(userAddress);

        User storage u = users[userAddress];
        u.name_of_user = name;
        u.balance = balance;
        u.gender = gender;
    }
}

    function setBalance(uint256 _balance) public {
        users[msg.sender].balance = _balance;
    }

    function getBalance() public view returns (uint256) {
        return users[msg.sender].balance;
    }

    function setName(string memory name) public {
        users[msg.sender].name_of_user = name;
    }

    function getName() public view returns (string memory) {
        return users[msg.sender].name_of_user;
    }

    function setGender(bool gender) public {
        users[msg.sender].gender = gender;
    }

    function getGender() public view returns (bool) {
        return users[msg.sender].gender;
    }

    function setAge(uint8 age) public {
        users[msg.sender].age = age;
    }

    function getAge() public view returns (uint8) {
        return users[msg.sender].age;
    }
}