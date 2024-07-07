const NFT = artifacts.require("NFT.sol");

module.exports = function (deployer) {
  deployer.deploy(NFT,"0xA8a5717BE63Fb92Abe6E4dB12e440Bd974472065");
};