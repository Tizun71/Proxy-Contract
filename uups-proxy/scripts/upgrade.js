const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  const proxyAddress = "0x29F0dc7937e2DDa9403E8A7F3a9b7cD453273540";
  const LogicV1Address = "0xE506a57693333109cbdE884a2F4FcB3aE6738d16";
  const LogicV2 = await ethers.getContractFactory("MyLogicV2");
  const logicV2 = await LogicV2.deploy();
  await logicV2.waitForDeployment();
  const newImplAddress = logicV2.target;
  const encodedFunctionCall = logicV2.interface.encodeFunctionData(
    "getValue",
    []
  );
  const proxy = await ethers.getContractAt("MyLogic", proxyAddress);

  const tx = await proxy.upgrade(newImplAddress);
  await tx.wait();

  console.log("✅ Upgrade successful!");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
