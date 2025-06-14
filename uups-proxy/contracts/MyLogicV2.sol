// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
contract MyLogicV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
  uint256 public value;

    function initialize(uint256 _value) public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        value = _value;
    }

    function setValue(uint256 _value) public onlyOwner {
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

     function upgrade(address newImplementation) public onlyOwner {
        upgradeToAndCall(newImplementation, "");
    }
}