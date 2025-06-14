const { ethers } = require("hardhat");

async function deployContracts() {
  const MyLogic = await ethers.getContractFactory("MyLogic");
  const implementation = await MyLogic.deploy();
  await implementation.waitForDeployment();
  console.log("Implementation contract deployed to:", implementation.target);

  const initData = implementation.interface.encodeFunctionData("initialize", [
    42,
  ]);

  const Proxy = await ethers.getContractFactory("MyProxy");
  const proxy = await Proxy.deploy(implementation.target, initData);
  await proxy.waitForDeployment();
  console.log("Proxy contract deployed to:", proxy.target);

  return { implementation, proxy };
}

async function verifyContracts(implementation, proxy) {
  try {
    console.log("Contract verification can be added here");
  } catch (error) {
    console.error("Error during contract verification:", error.message);
  }
}

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    const { implementation, proxy } = await deployContracts();

    if (proxyAdminAddress) {
      console.log("Proxy Admin Address:", proxyAdminAddress);
    }

    await verifyContracts(implementation, proxy);

    return { implementation, proxy, proxyAdminAddress };
  } catch (error) {
    console.error("Deployment failed:", error.message);
    throw error;
  }
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { main, deployContracts, getProxyAdmin };
