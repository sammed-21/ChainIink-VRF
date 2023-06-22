const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");
 
async function main() {
 
  // Deploy the contract
  const RandomWinnerGameFactory = await ethers.getContractFactory("RandomWinnerGame");
  const randomWinnerGame = await RandomWinnerGameFactory.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  );

  await randomWinnerGame.deployed();

  // Print the address of the deployed contract
  console.log("Deployed Contract Address:", randomWinnerGame.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: randomWinnerGame.address,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
     
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
