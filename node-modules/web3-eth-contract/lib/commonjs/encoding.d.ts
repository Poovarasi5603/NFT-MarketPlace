import { AbiConstructorFragment, AbiEventFragment, AbiFunctionFragment, Filter, HexString, ContractOptions } from 'web3-types';
export { decodeEventABI } from 'web3-eth';
declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare const encodeEventABI: ({ address }: ContractOptions, event: AbiEventFragment & {
    signature: string;
}, options?: Filter) => Writeable<Filter>;
export declare const encodeMethodABI: (abi: AbiFunctionFragment | AbiConstructorFragment, args: unknown[], deployData?: HexString) => string;
export declare const decodeMethodParams: (abi: AbiFunctionFragment | AbiConstructorFragment, data: HexString, methodSignatureProvided?: boolean) => {
    [key: string]: unknown;
    __length__: number;
};
export declare const decodeMethodReturn: (abi: AbiFunctionFragment, returnValues?: HexString) => unknown;
