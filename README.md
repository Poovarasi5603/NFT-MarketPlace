# NFT-MarketPlace

## Overview

This project involves the creation of an NFT using an ERC-721 smart contract with OpenZeppelin and Truffle framework. It includes the deployment of the smart contract, creation of metadata, and interaction with the contract to mint NFTs.

### Installation

#### Truffle and OpenZeppelin Contracts (npm)

```
$ npm install -g truffle
$ npm install @openzeppelin/contracts
```

### Usage

Once installed, you can use the contracts in the library by importing them:

```solidity
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyCollectible is ERC721 {
    constructor() ERC721("SpaceBear", "SBR") {
    }
}
```

Set the Name and Symbol as "Spacebear" and "SBR".

Set the Base-URI as "https://gateway.pinata.cloud/ipfs/".

Check Mintable with Auto-Increment IDs. So every time you mint a token it gets a new number.

Enable URI Storage, so your token URIs for metadata are not the token-ID but can be different.

_If you're new to smart contract development, head to [Developing Smart Contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts) to learn about creating a new project and compiling your contracts._

To keep your system secure, you should **always** use the installed code as-is, and neither copy-paste it from online sources nor modify it yourself. The library is designed so that only the contracts and functions you use are deployed, so you don't need to worry about it needlessly increasing gas costs.

### Deployment

Deploy the smart contract using Truffle:

1. Install HD Wallet Provider to deploy our smart contract to blockchain.
   
```
  npm install @truffle/hdwallet-provider
```

2. Use the following command to deploy the contract to the Sepolia testnet:
   
Run DashboardProvider RPC endpoint

```
truffle dashboard

truffle migrate --network dashboard
```

Once deployed, mint tokens and interact with the contract using Web3.js

### Metadata and IPFS

Create and upload your metadata to IPFS using Pinata API

First install pinata sdk :

```
npm install --save @pinata/sdk
```

1. Create a metadata JSON file for each NFT.
2. Use the Node.js script to upload them to IPFS


### View on OpenSea

Once the ERC721 tokens are minted, you can view them on the OpenSea testnet platform using the contract address and token ID.

Example token links:
- [Token 0](https://testnets.opensea.io/assets/sepolia/0x53eb45711d73cfcd8f70ad70d1b8abc26bb18dae/0)
- [Token 1](https://testnets.opensea.io/assets/sepolia/0x53eb45711d73cfcd8f70ad70d1b8abc26bb18dae/1)
- [Token 2](https://testnets.opensea.io/assets/sepolia/0x53eb45711d73cfcd8f70ad70d1b8abc26bb18dae/2)
- [Token 3](https://testnets.opensea.io/assets/sepolia/0x53eb45711d73cfcd8f70ad70d1b8abc26bb18dae/3)
- [Token 4](https://testnets.opensea.io/assets/sepolia/0x53eb45711d73cfcd8f70ad70d1b8abc26bb18dae/4)

## License

OpenZeppelin Contracts is released under the [MIT License](LICENSE).


---
