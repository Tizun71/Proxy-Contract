const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  // MyLogic deployed to: 0x69E42a929FFcc601234D5073FA2c904cAF75F23d
  // Proxy deployed to: 0xDb88c49a6C4f107c2Cd1Bc4026297753255C455D
  // Proxy Admin Address: 0x3f866e454F82F885e6d967fE1cC4b89B2f778341

  const proxyAddress = "0xDb88c49a6C4f107c2Cd1Bc4026297753255C455D";
  const proxyAdminAddress = "0x3f866e454F82F885e6d967fE1cC4b89B2f778341";

  // Deploy new implementation
  const LogicV2 = await ethers.getContractFactory("MyLogicV2");
  const logicV2 = await LogicV2.deploy();
  await logicV2.waitForDeployment();
  const newImplAddress = logicV2.target;


  const encodedFunctionCall = logicV2.interface.encodeFunctionData("getNumber", []);

  console.log("Encoded function call:", encodedFunctionCall);


  const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = ProxyAdmin.attach(proxyAdminAddress);

  const proxy = await ethers.getContractAt("TransparentUpgradeableProxy", proxyAddress);

  try {

    const tx = await proxyAdmin.upgradeAndCall(proxy, newImplAddress, encodedFunctionCall);
    await tx.wait();
    console.log("✅ Upgrade proxy success!");
  } catch (error) {
    console.error("❌ Error when upgrade proxy:", error);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
