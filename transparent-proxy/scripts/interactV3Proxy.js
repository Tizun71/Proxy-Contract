const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  // MyLogic deployed to: 0x69E42a929FFcc601234D5073FA2c904cAF75F23d
  // Proxy deployed to: 0xDb88c49a6C4f107c2Cd1Bc4026297753255C455D
  // Proxy Admin Address: 0x3f866e454F82F885e6d967fE1cC4b89B2f778341

  const MyLogic = await ethers.getContractFactory("MyLogicV3");
  const myLogic = MyLogic.attach("0x8444e6877d262E8A9A724C13636B0D57b635f46E");

  // Interact with V2 contract through Proxy with getNumber
  const number = await myLogic.getNewNumber();
  console.log("number:", number);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
