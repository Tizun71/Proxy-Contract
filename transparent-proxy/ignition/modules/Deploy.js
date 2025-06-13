const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");

module.exports = buildModule("TransparentProxyWithInitModule", (m) => {
  const deployer = m.getAccount(0);
  const logic = m.contract("MyLogic");

  const proxyAdmin = m.contract("ProxyAdmin", [deployer]);

  const initIface = new ethers.Interface([
    "function initialize(uint256 _initialValue)",
  ]);

  const initData = initIface.encodeFunctionData("initialize", [42]);

  const proxy = m.contract("TransparentUpgradeableProxy", [
    logic,
    proxyAdmin,
    initData,
  ]);

  return { logic, proxy, proxyAdmin };
});
