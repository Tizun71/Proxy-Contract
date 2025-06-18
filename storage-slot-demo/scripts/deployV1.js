const { ethers } = require("hardhat");

async function main() {
  [owner] = await ethers.getSigners();
  const MyLogic = await ethers.getContractFactory("MyLogic");
  const myLogic = await MyLogic.deploy();
  await myLogic.waitForDeployment();
  console.log("MyLogic deployed to:", myLogic.target);

  const Proxy = await ethers.getContractFactory("TransparentUpgradeableProxy");
  const proxy = await Proxy.deploy(myLogic.target, owner.address, "0x");

  await proxy.waitForDeployment();
  console.log("Proxy deployed to:", proxy.target);
  const receipt = await proxy.deploymentTransaction().wait();
  const deployBlock = receipt.blockNumber;

  const filter = proxy.filters.AdminChanged();
  const events = await proxy.queryFilter(filter, deployBlock, deployBlock + 5);

  if (events.length > 0) {
    const lastEvent = events[events.length - 1];
    const proxyAdminAddress = lastEvent.args.newAdmin;
    console.log("Proxy Admin Address:", proxyAdminAddress);
  } else {
    console.log("No AdminChanged event found.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
