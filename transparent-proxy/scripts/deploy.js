const { ethers } = require("hardhat");

async function main() {
  [owner] = await ethers.getSigners();
  const MyContract = await ethers.deployContract("MyLogicV2");
  console.log("Contract deployed to:", MyContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
