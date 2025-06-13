const { ethers } = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Signer address:", signer.address);
  const proxyAddress = "0x5D56658Ee65D6CeeA6C8533A81f6f90Bd030DF0f";
  const proxyAdminAddress = "0xA86B67dd290ccc6C75535a872A3167296753dDE3";

  const LogicV2 = await ethers.getContractFactory("MyLogicV2");
  const logicV2 = await LogicV2.deploy();
  await logicV2.waitForDeployment();
  const newImpl = await logicV2.getAddress();

  console.log("Triển khai logic mới tại:", newImpl);

  const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = new ethers.Contract(
    proxyAdminAddress,
    ProxyAdmin.interface,
    signer
  );

  const ITransparentUpgradeableProxy = await ethers.getContractFactory(
    "TransparentUpgradeableProxy"
  );

  const proxy = new ethers.Contract(
    proxyAddress,
    ITransparentUpgradeableProxy.interface,
    signer
  );

  console.log("Proxy address:", await proxy.getAddress());

  const iface = new ethers.Interface(["function initialize(uint256)"]);
  const data = iface.encodeFunctionData("initialize", [42]);

  try {
    // console.log(proxy.getAddress());
    // console.log(newImpl);
    // console.log(data);
    const tx = await proxyAdmin.upgradeAndCall(proxyAddress, newImpl, data);
    await tx.wait();
    console.log("✅ Đã nâng cấp proxy thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi nâng cấp proxy:", error);
  }
}

main().catch((error) => {
  console.error("Lỗi:", error);
  process.exit(1);
});
