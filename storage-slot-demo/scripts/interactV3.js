const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  const MyProxy = await ethers.getContractFactory("MyLogicV3");
  const myProxy = MyProxy.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
  const tx = await myProxy.setGender(true);
  console.log("Gender:", (await myProxy.getGender()) ? "Male" : "Female");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
