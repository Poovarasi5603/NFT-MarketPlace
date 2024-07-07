require('dotenv').config(); // Load environment variables from .env file

const { Web3 } = require('web3'); // Import Web3 library
const fs = require('fs'); // Import fs module
const path = require('path'); // Import path module
const pinataSDK = require('@pinata/sdk'); // Import Pinata SDK
const contractABI = require('./build/contracts/NFT.json').abi;  // Load contract ABI
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { PINATA_API_KEY, PINATA_SECRET_KEY, INFURA_PROJECT_ID, CONTRACT_ADDRESS, PRIVATE_KEY, MNEMONIC } = process.env;

// Initialize Pinata SDK
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_KEY);

// Initialize Web3 with Infura provider
const provider = new HDWalletProvider({
    mnemonic: MNEMONIC,
    providerOrUrl: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`
});
const web3 = new Web3(provider);

// Initialize contract instance
const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);

// Function to upload a single file to IPFS using Pinata
async function uploadFileToIPFS(filePath) {
    const readableStreamForFile = fs.createReadStream(filePath);

    const options = {
        pinataMetadata: {
            name: path.basename(filePath),
            keyvalues: {
                document: '1'
            }
        },
        pinataOptions: {
            cidVersion: 0,
        }
    };

    try {
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        console.log('File uploaded to IPFS:', result);
        return result.IpfsHash;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        throw error;
    }
}

// Function to upload folder to IPFS by uploading each file individually
async function uploadFolderToIPFS(folderPath) {
    const files = fs.readdirSync(folderPath).map(fileName => path.join(folderPath, fileName));
    const ipfsHashes = [];

    for (const file of files) {
        const ipfsHash = await uploadFileToIPFS(file);
        ipfsHashes.push(ipfsHash);
    }

    return ipfsHashes;
}

// Function to upload IPFS hash to the smart contract
async function MintNewToken(to, uri) {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const gasLimit = 2000000; // Specify the gas limit
    const gasPrice = await web3.eth.getGasPrice(); // Get the current gas price
    
    // Add a fixed margin to the gas price (you can adjust this value as needed)
    const adjustedGasPrice = BigInt(gasPrice) * BigInt(12) / BigInt(10); // 20% margin increase
    
    const data = contract.methods.safeMint(to, uri).encodeABI();

    const tx = {
        from: account,
        to: CONTRACT_ADDRESS,
        gas: web3.utils.toHex(gasLimit), // Convert gas limit to hexadecimal
        gasPrice: web3.utils.toHex(adjustedGasPrice), // Convert adjusted gas price to hexadecimal
        data: data
    };
    try {
        const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('MintNewToken', receipt);
    } catch (error) {
        console.error('Error uploading to contract:', error);
        throw error;
    }
}

// Main function
async function main() {
    try {
        const folderPath = 'D:/NFT-MarketPlace/metadata/'; // Path to the folder you want to upload
        const to = '0xA8a5717BE63Fb92Abe6E4dB12e440Bd974472065'; // address of minted token

        // Upload folder to IPFS and get the IPFS hashes
        const uris = await uploadFolderToIPFS(folderPath);

        // Assuming you want to mint a token for each file URI
        for (const uri of uris) {
            // Minting new token for given address
            await MintNewToken(to, uri);
        }
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Call the main function
main();
