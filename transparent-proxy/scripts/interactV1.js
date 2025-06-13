const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  // MyLogic deployed to: 0x69E42a929FFcc601234D5073FA2c904cAF75F23d
  // Proxy deployed to: 0xDb88c49a6C4f107c2Cd1Bc4026297753255C455D
  // Proxy Admin Address: 0x3f866e454F82F885e6d967fE1cC4b89B2f778341

  const MyLogic = await ethers.getContractFactory("MyLogic");
  const myLogic = MyLogic.attach("0xDb88c49a6C4f107c2Cd1Bc4026297753255C455D");

  // Interact with V1 contract through Proxy without getNumber 
  const tx = await myLogic.setNumber(42);
  console.log("tx:", tx.hash);


}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
