const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  // MyLogic deployed to: 0xE506a57693333109cbdE884a2F4FcB3aE6738d16
  // Proxy deployed to: 0x29F0dc7937e2DDa9403E8A7F3a9b7cD453273540

  const MyLogic = await ethers.getContractFactory("MyLogicV2");
  const myLogic = MyLogic.attach("0x29F0dc7937e2DDa9403E8A7F3a9b7cD453273540");

  const value = await myLogic.getValue();
  console.log("value:", value);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
