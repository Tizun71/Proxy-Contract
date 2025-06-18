const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  const MyProxy = await ethers.getContractFactory("MyLogic");
  const myProxy = MyProxy.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

  const tx = await myProxy.setBalance(42);
  console.log("user balance:", await myProxy.getBalance());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
