/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
import { format, isNullish, keccak256 } from 'web3-utils';
import { FMT_NUMBER, FMT_BYTES, } from 'web3-types';
import { decodeParameters, encodeEventSignature, encodeFunctionSignature, encodeParameter, encodeParameters, inferTypesAndEncodeParameters, isAbiConstructorFragment, jsonInterfaceMethodToString, } from 'web3-eth-abi';
import { blockSchema, ALL_EVENTS } from 'web3-eth';
import { Web3ContractError } from 'web3-errors';
export { decodeEventABI } from 'web3-eth';
export const encodeEventABI = ({ address }, event, options) => {
    var _a, _b;
    const topics = options === null || options === void 0 ? void 0 : options.topics;
    const filter = (_a = options === null || options === void 0 ? void 0 : options.filter) !== null && _a !== void 0 ? _a : {};
    const opts = {};
    if (!isNullish(options === null || options === void 0 ? void 0 : options.fromBlock)) {
        opts.fromBlock = format(blockSchema.properties.number, options === null || options === void 0 ? void 0 : options.fromBlock, {
            number: FMT_NUMBER.HEX,
            bytes: FMT_BYTES.HEX,
        });
    }
    if (!isNullish(options === null || options === void 0 ? void 0 : options.toBlock)) {
        opts.toBlock = format(blockSchema.properties.number, options === null || options === void 0 ? void 0 : options.toBlock, {
            number: FMT_NUMBER.HEX,
            bytes: FMT_BYTES.HEX,
        });
    }
    if (topics && Array.isArray(topics)) {
        opts.topics = [...topics];
    }
    else {
        opts.topics = [];
        // add event signature
        if (event && !event.anonymous && ![ALL_EVENTS, 'allEvents'].includes(event.name)) {
            opts.topics.push((_b = event.signature) !== null && _b !== void 0 ? _b : encodeEventSignature(jsonInterfaceMethodToString(event)));
        }
        // add event topics (indexed arguments)
        if (![ALL_EVENTS, 'allEvents'].includes(event.name) && event.inputs) {
            for (const input of event.inputs) {
                if (!input.indexed) {
                    continue;
                }
                const value = filter[input.name];
                if (!value) {
                    // eslint-disable-next-line no-null/no-null
                    opts.topics.push(null);
                    continue;
                }
                // TODO: https://github.com/ethereum/web3.js/issues/344
                // TODO: deal properly with components
                if (Array.isArray(value)) {
                    opts.topics.push(value.map(v => encodeParameter(input.type, v)));
                }
                else if (input.type === 'string') {
                    opts.topics.push(keccak256(value));
                }
                else {
                    opts.topics.push(encodeParameter(input.type, value));
                }
            }
        }
    }
    if (!opts.topics.length)
        delete opts.topics;
    if (address) {
        opts.address = address.toLowerCase();
    }
    return opts;
};
export const encodeMethodABI = (abi, args, deployData) => {
    const inputLength = Array.isArray(abi.inputs) ? abi.inputs.length : 0;
    if (abi.inputs && inputLength !== args.length) {
        throw new Web3ContractError(`The number of arguments is not matching the methods required number. You need to pass ${inputLength} arguments.`);
    }
    let params;
    if (abi.inputs) {
        params = encodeParameters(Array.isArray(abi.inputs) ? abi.inputs : [], args).replace('0x', '');
    }
    else {
        params = inferTypesAndEncodeParameters(args).replace('0x', '');
    }
    if (isAbiConstructorFragment(abi)) {
        if (!deployData)
            throw new Web3ContractError('The contract has no contract data option set. This is necessary to append the constructor parameters.');
        if (!deployData.startsWith('0x')) {
            return `0x${deployData}${params}`;
        }
        return `${deployData}${params}`;
    }
    return `${encodeFunctionSignature(abi)}${params}`;
};
export const decodeMethodParams = (abi, data, methodSignatureProvided = true) => {
    const value = methodSignatureProvided && data && data.length >= 10 && data.startsWith('0x')
        ? data.slice(10)
        : data;
    if (!abi.inputs) {
        throw new Web3ContractError('No inputs found in the ABI');
    }
    const result = decodeParameters([...abi.inputs], value);
    return result;
};
export const decodeMethodReturn = (abi, returnValues) => {
    // If it was constructor then we need to return contract address
    if (abi.type === 'constructor') {
        return returnValues;
    }
    if (!returnValues) {
        // Using "null" value intentionally to match legacy behavior
        // eslint-disable-next-line no-null/no-null
        return null;
    }
    const value = returnValues.length >= 2 ? returnValues.slice(2) : returnValues;
    if (!abi.outputs) {
        // eslint-disable-next-line no-null/no-null
        return null;
    }
    const result = decodeParameters([...abi.outputs], value);
    if (result.__length__ === 1) {
        return result[0];
    }
    return result;
};
//# sourceMappingURL=encoding.js.map