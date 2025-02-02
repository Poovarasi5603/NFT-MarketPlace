/// <reference types="node" />
/// <reference types="node" />
export type HDKey = {
    privateKey: Buffer;
    publicKey: Uint8Array;
    chainCode: Uint8Array;
};
export declare function createAccountGeneratorFromSeedAndPath(seedBuffer: Uint8Array, hdPath: string[]): (index: number) => {
    privateKey: Buffer;
    publicKey: Uint8Array;
    chainCode: Uint8Array;
};
export declare const uncompressedPublicKeyToAddress: (uncompressedPublicKey: Uint8Array) => Uint8Array;
