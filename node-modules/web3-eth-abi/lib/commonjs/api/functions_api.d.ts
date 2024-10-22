import { AbiFunctionFragment } from 'web3-types';
/**
 * Encodes the function name to its ABI representation, which are the first 4 bytes of the sha3 of the function name including  types.
 * The JSON interface spec documentation https://docs.soliditylang.org/en/latest/abi-spec.html#json
 * @param functionName - The function name to encode or the `JSON interface` object of the function.
 * If the passed parameter is a string, it has to be in the form of `functionName(param1Type,param2Type,...)`. eg: myFunction(uint256,uint32[],bytes10,bytes)
 * @returns - The ABI signature of the function.
 * @example
 * ```ts
 * const signature = web3.eth.abi.encodeFunctionSignature({
 *   name: "myMethod",
 *   type: "function",
 *   inputs: [
 *     {
 *       type: "uint256",
 *       name: "myNumber",
 *     },
 *     {
 *       type: "string",
 *       name: "myString",
 *     },
 *   ],
 * });
 * console.log(signature);
 * > 0x24ee0097
 *
 * const signature = web3.eth.abi.encodeFunctionSignature('myMethod(uint256,string)')
 * console.log(signature);
 * > 0x24ee0097
 *
 * const signature = web3.eth.abi.encodeFunctionSignature('safeTransferFrom(address,address,uint256,bytes)');
 * console.log(signature);
 * > 0xb88d4fde
 * ```
 */
export declare const encodeFunctionSignature: (functionName: string | AbiFunctionFragment) => string;
/**
 * Encodes a function call using its `JSON interface` object and given parameters.
 * The JSON interface spec documentation https://docs.soliditylang.org/en/latest/abi-spec.html#json
 * @param jsonInterface - The `JSON interface` object of the function.
 * @param params - The parameters to encode
 * @returns - The ABI encoded function call, which, means the function signature and the parameters passed.
 * @example
 * ```ts
 * const sig = web3.eth.abi.encodeFunctionCall(
 *   {
 *     name: "myMethod",
 *     type: "function",
 *     inputs: [
 *       {
 *         type: "uint256",
 *         name: "myNumber",
 *       },
 *       {
 *         type: "string",
 *         name: "myString",
 *       },
 *     ],
 *   },
 *   ["2345675643", "Hello!%"]
 * );
 * console.log(sig);
 * > 0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000
 *
 *
 *
 * const sig = web3.eth.abi.encodeFunctionCall(
 *   {
 *     inputs: [
 *       {
 *         name: "account",
 *         type: "address",
 *       },
 *     ],
 *     name: "balanceOf",
 *     outputs: [
 *       {
 *         name: "",
 *         type: "uint256",
 *       },
 *     ],
 *     stateMutability: "view",
 *     type: "function",
 *   },
 *   ["0x1234567890123456789012345678901234567890"]
 * );
 *
 * console.log(sig);
 * > 0x70a082310000000000000000000000001234567890123456789012345678901234567890
 * ```
 */
export declare const encodeFunctionCall: (jsonInterface: AbiFunctionFragment, params: unknown[]) => string;
