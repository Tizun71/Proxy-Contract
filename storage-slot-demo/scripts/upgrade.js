const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const proxyAdminAddress = "0xCafac3dD18aC6c6e92c921884f9E4176737C052c";

  const LogicV2 = await ethers.getContractFactory("MyLogicV2");
  const logicV2 = await LogicV2.deploy();
  await logicV2.waitForDeployment();
  const newImplAddress = logicV2.target;

  console.log("New implementation deployed at:", newImplAddress);

  const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = ProxyAdmin.attach(proxyAdminAddress);

  const proxy = await ethers.getContractAt(
    "TransparentUpgradeableProxy",
    proxyAddress
  );

  try {
    const tx = await proxyAdmin.upgradeAndCall(proxy, newImplAddress, "0x");
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
