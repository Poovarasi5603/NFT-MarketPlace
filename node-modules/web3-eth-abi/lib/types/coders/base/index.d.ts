import { AbiParameter } from 'web3-types';
import { EncoderResult, DecoderResult } from '../types.js';
export { encodeAddress, decodeAddress } from './address.js';
export { encodeBoolean, decodeBool } from './bool.js';
export { encodeBytes, decodeBytes } from './bytes.js';
export { encodeNumber, decodeNumber } from './number.js';
export { encodeString, decodeString } from './string.js';
export { encodeTuple, decodeTuple } from './tuple.js';
export { encodeArray, decodeArray } from './array.js';
export declare function encodeParamFromAbiParameter(param: AbiParameter, value: unknown): EncoderResult;
export declare function decodeParamFromAbiParameter(param: AbiParameter, bytes: Uint8Array): DecoderResult;
//# sourceMappingURL=index.d.ts.map