const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const proxyAddress = "0x5D56658Ee65D6CeeA6C8533A81f6f90Bd030DF0f";

  const MyLogic = await ethers.getContractFactory("MyLogic");
  const proxy = new ethers.Contract(proxyAddress, MyLogic.interface, signer);

  const gasEstimate = await proxy.setNumber.estimateGas(42);
  console.log("Estimated gas:", gasEstimate.toString());

  const tx = await proxy.setNumber(71, {
    gasLimit: (gasEstimate * 12n) / 10n,
  });
  await tx.wait();
  console.log("Transaction successful:", tx.hash);

  const receipt = await tx.wait();
  console.log("Transaction mined in block:", receipt.blockNumber);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
