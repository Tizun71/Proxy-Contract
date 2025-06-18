const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  const MyProxy = await ethers.getContractFactory("MyLogicV4");
  const myProxy = MyProxy.attach("0xc6e7DF5E7b4f2A278906862b61205850344D4e7d");
  console.log("user name:", await myProxy.getName());
  console.log("user gender:", await myProxy.getGender());
  console.log("user balance:", await myProxy.getBalance());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
