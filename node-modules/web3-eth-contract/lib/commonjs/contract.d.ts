import { Web3Context, Web3EventEmitter, Web3PromiEvent } from 'web3-core';
import { NewHeadsSubscription, SendTransactionEvents } from 'web3-eth';
import { AbiFunctionFragment, ContractAbi, ContractConstructorArgs, ContractEvent, ContractEvents, ContractMethod, ContractMethodInputParameters, ContractMethodOutputParameters, Address, EthExecutionAPI, Filter, FilterAbis, HexString, ContractInitOptions, PayableCallOptions, DataFormat, DEFAULT_RETURN_FORMAT, EventLog, ContractOptions, TransactionReceipt, FormatType, DecodedParams } from 'web3-types';
import { LogsSubscription } from './log_subscription.js';
import { ContractEventOptions, NonPayableMethodObject, PayableMethodObject, PayableTxOptions, Web3ContractContext } from './types.js';
declare type ContractBoundMethod<Abi extends AbiFunctionFragment, Method extends ContractMethod<Abi> = ContractMethod<Abi>> = (...args: Method['Inputs'] extends undefined | unknown ? any[] : Method['Inputs']) => Method['Abi']['stateMutability'] extends 'payable' | 'pure' ? PayableMethodObject<Method['Inputs'], Method['Outputs']> : NonPayableMethodObject<Method['Inputs'], Method['Outputs']>;
export declare type ContractOverloadedMethodInputs<AbiArr extends ReadonlyArray<unknown>> = NonNullable<AbiArr extends readonly [] ? undefined : AbiArr extends readonly [infer A, ...infer R] ? A extends AbiFunctionFragment ? ContractMethodInputParameters<A['inputs']> | ContractOverloadedMethodInputs<R> : undefined : undefined>;
export declare type ContractOverloadedMethodOutputs<AbiArr extends ReadonlyArray<unknown>> = NonNullable<AbiArr extends readonly [] ? undefined : AbiArr extends readonly [infer A, ...infer R] ? A extends AbiFunctionFragment ? ContractMethodOutputParameters<A['outputs']> | ContractOverloadedMethodOutputs<R> : undefined : undefined>;
export declare type ContractMethodsInterface<Abi extends ContractAbi> = {
    [MethodAbi in FilterAbis<Abi, AbiFunctionFragment & {
        type: 'function';
    }> as MethodAbi['name']]: ContractBoundMethod<MethodAbi>;
} & {
    [key: string]: ContractBoundMethod<any>;
};
export declare type ContractMethodSend = Web3PromiEvent<FormatType<TransactionReceipt, DataFormat>, SendTransactionEvents<DataFormat>>;
export declare type ContractDeploySend<Abi extends ContractAbi> = Web3PromiEvent<Contract<Abi>, SendTransactionEvents<DataFormat>>;
/**
 * @hidden
 * The event object can be accessed from `myContract.events.myEvent`.
 *
 * \> Remember: To subscribe to an event, your provider must have support for subscriptions.
 *
 * ```ts
 * const subscription = await myContract.events.MyEvent([options])
 * ```
 *
 * @param options - The options used to subscribe for the event
 * @returns - A Promise resolved with {@link LogsSubscription} object
 */
export declare type ContractBoundEvent = (options?: ContractEventOptions) => LogsSubscription;
export declare type ContractEventsInterface<Abi extends ContractAbi, Events extends ContractEvents<Abi> = ContractEvents<Abi>> = {
    [Name in keyof Events | 'allEvents']: ContractBoundEvent;
} & {
    [key: string]: ContractBoundEvent;
};
export declare type ContractEventEmitterInterface<Abi extends ContractAbi> = {
    [EventAbi in FilterAbis<Abi, AbiFunctionFragment & {
        type: 'event';
    }> as EventAbi['name']]: ContractEvent<EventAbi>['Inputs'];
};
declare const contractSubscriptions: {
    logs: typeof LogsSubscription;
    newHeads: typeof NewHeadsSubscription;
    newBlockHeaders: typeof NewHeadsSubscription;
};
/**
 * The `web3.eth.Contract` makes it easy to interact with smart contracts on the ethereum blockchain.
 * For using contract package, first install Web3 package using: `npm i web3` or `yarn add web3` based on your package manager, after that contracts features can be used as mentioned in following snippet.
 * ```ts
 *
 * import { Web3 } from 'web3';
 *
 * const web3 = new Web3('https://127.0.0.1:4545');
 * const abi = [...] as const; // your contract ABI
 *
 * let contract = new web3.eth.Contract(abi,'0xdAC17F958D2ee523a2206206994597C13D831ec7');
 * await contract.methods.balanceOf('0xdAC17F958D2ee523a2206206994597C13D831ec7').call();
 * ```
 * For using individual package install `web3-eth-contract` and `web3-core` packages using: `npm i web3-eth-contract web3-core` or `yarn add web3-eth-contract web3-core`. This is more efficient approach for building lightweight applications.
 * ```ts
 *
 * import { Web3Context } from 'web3-core';
 * import { Contract } from 'web3-eth-contract';
 *
 * const abi = [...] as const; // your contract ABI
 *
 * let contract = new web3.eth.Contract(
 * 	abi,
 * 	'0xdAC17F958D2ee523a2206206994597C13D831ec7'
 * 	 new Web3Context('http://127.0.0.1:8545'));
 *
 * await contract.methods.balanceOf('0xdAC17F958D2ee523a2206206994597C13D831ec7').call();
 * ```
 * ## Generated Methods
 * Following methods are generated by web3.js contract object for each of contract functions by using its ABI.
 *
 * ### send
 * This is used to send a transaction to the smart contract and execute its method. Note this can alter the smart contract state.
 *
 * #### Parameters
 * options?: PayableTxOptions | NonPayableTxOptions
 *
 * #### Returns
 * [Web3PromiEvent](/api/web3/namespace/core#Web3PromiEvent) : Web3 Promi Event
 *
 * ```ts
 * // using the promise
 * myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
 * 	.then(function(receipt){
 * 		// other parts of code to use receipt
 * 	});
 *
 *
 * // using the event emitter
 * myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
 * 	.on('transactionHash', function(hash){
 * 		// ...
 * 	})
 * 	.on('confirmation', function(confirmationNumber, receipt){
 * 		// ...
 * 	})
 * 	.on('receipt', function(receipt){
 * 		// ...
 * 	})
 * 	.on('error', function(error, receipt) {
 * 		// ...
 * 	});
 *
 * ```
 *
 * ### call
 * This will execute smart contract method in the EVM without sending any transaction. Note calling cannot alter the smart contract state.
 *
 * #### Parameters
 * options?: PayableCallOptions | NonPayableCallOptions,
 * block?: BlockNumberOrTag,
 *
 * #### Returns
 * Promise : having results of call
 *
 * ```ts
 *
 * let myContract = new web3.eth.Contract(abi, address);
 *
 * myContract.methods.myFunction().call()
 * .then(console.log);
 *
 * ```
 * ### estimateGas
 * Returns the amount of gas consumed by executing the method in EVM without creating a new transaction on the blockchain. The returned amount can be used as a gas estimate for executing the transaction publicly. The actual gas used can be different when sending the transaction later, as the state of the smart contract can be different at that time.
 *
 * #### Parameters
 * options?: PayableCallOptions,
 * returnFormat: ReturnFormat = DEFAULT_RETURN_FORMAT as ReturnFormat,
 *
 * #### Returns
 * Promise: The gas amount estimated.
 *
 * ```ts
 * const estimatedGas = await contract.methods.approve('0xdAC17F958D2ee523a2206206994597C13D831ec7', 300)
 *     .estimateGas();
 *
 * ```
 *
 * ### encodeABI
 * Encodes the ABI for this method. The resulting hex string is 32-bit function signature hash plus the passed parameters in Solidity tightly packed format. This can be used to send a transaction, call a method, or pass it into another smart contract’s method as arguments. Set the data field on web3.eth.sendTransaction options as the encodeABI() result and it is the same as calling the contract method with contract.myMethod.send().
 *
 * Some use cases for encodeABI() include: preparing a smart contract transaction for a multisignature wallet, working with offline wallets and cold storage and creating transaction payload for complex smart contract proxy calls.
 *
 * #### Parameters
 * None
 *
 * #### Returns
 * String: The encoded ABI.
 *
 * ```ts
 * const encodedABI = await contract.methods.approve('0xdAC17F958D2ee523a2206206994597C13D831ec7', 300)
 *     .encodeABI();
 *
 * ```
 *

 * ### decodeMethodData
 * Decodes the given ABI-encoded data, revealing both the method name and the parameters used in the smart contract call.
 * This function reverses the encoding process happens at the method `encodeABI`.
 * It's particularly useful for debugging and understanding the interactions with and between smart contracts.
 *
 * #### Parameters
 *
 * - `data` **HexString**: The string of ABI-encoded data that needs to be decoded. This should include the method signature and the encoded parameters.
 *
 * #### Returns
 *
 * - **Object**: This object combines both the decoded parameters and the method name in a readable format. Specifically, the returned object contains:
 *   - `__method__` **String**: The name of the contract method, reconstructed from the ABI.
 *   - `__length__` **Number**: The number of parameters decoded.
 *   - Additional properties representing each parameter by name, as well as their position and values.
 *
 * #### Example
 *
 * Given an ABI-encoded string from a transaction, you can decode this data to identify the method called and the parameters passed.
 * Here's a simplified example:
 *
 *
 * ```typescript
 * const GreeterAbi = [
 * 	{
 * 		inputs: [
 * 			{
 * 				internalType: 'string',
 * 				name: '_greeting',
 * 				type: 'string',
 * 			},
 * 		],
 * 		name: 'setGreeting',
 * 		outputs: [],
 * 		type: 'function',
 * 	},
 * ];
 * const contract = new Contract(GreeterAbi); // Initialize with your contract's ABI
 *
 * // The ABI-encoded data string for "setGreeting('Hello World')"
 * const encodedData =
 * 	'0xa41368620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000';
 *
 * try {
 * 	const decoded = contract.decodeMethodData(encodedData);
 * 	console.log(decoded.__method__); // Outputs: "setGreeting(string)"
 * 	console.log(decoded); // Outputs the detailed parameter data
 * 	// This tells that the method called was `setGreeting` with a single string parameter "Hello World":
 * 	// {
 * 	//   __method__: 'setGreeting(string)',
 * 	//   __length__: 1,
 * 	//   '0': 'Hello World',
 * 	//   _greeting: 'Hello World'
 * 	// }
 * } catch (error) {
 * 	console.error(error);
 * }
 * ```
 *

 * ### createAccessList
 * This will create an access list a method execution will access when executed in the EVM.
 * Note: You must specify a from address and gas if it’s not specified in options when instantiating parent contract object.
 *
 * #### Parameters
 * options?: PayableCallOptions | NonPayableCallOptions,
 * block?: BlockNumberOrTag,
 *
 * #### Returns
 * Promise: The generated access list for transaction.
 *
 * ```ts
 * const accessList = await contract.methods.approve('0xbEe634C21c16F05B03B704BaE071536121e6cFeA', 300)
 *     .createAccessList({
 *         from: "0x9992695e1053bb737d3cfae4743dcfc4b94f203d"
 *    });
 * ```
 *
 */
export declare class Contract<Abi extends ContractAbi> extends Web3Context<EthExecutionAPI, typeof contractSubscriptions> implements Web3EventEmitter<ContractEventEmitterInterface<Abi>> {
    /**
     * The options `object` for the contract instance. `from`, `gas` and `gasPrice` are used as fallback values when sending transactions.
     *
     * ```ts
     * myContract.options;
     * > {
     *     address: '0x1234567890123456789012345678901234567891',
     *     jsonInterface: [...],
     *     from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
     *     gasPrice: '10000000000000',
     *     gas: 1000000
     * }
     *
     * myContract.options.from = '0x1234567890123456789012345678901234567891'; // default from address
     * myContract.options.gasPrice = '20000000000000'; // default gas price in wei
     * myContract.options.gas = 5000000; // provide as fallback always 5M gas
     * ```
     */
    readonly options: ContractOptions;
    /**
     * Set to true if you want contracts' defaults to sync with global defaults.
     */
    syncWithContext: boolean;
    private _errorsInterface;
    private _jsonInterface;
    private _address?;
    private _functions;
    private readonly _overloadedMethodAbis;
    private _methods;
    private _events;
    /**
     * Set property to `data`, `input`, or `both` to change the property of the contract being sent to the
     * RPC provider when using contract methods.
     * Default is `input`
     */
    private context?;
    /**
     * Creates a new contract instance with all its methods and events defined in its ABI provided.
     *
     * ```ts
     * new web3.eth.Contract(jsonInterface[, address][, options])
     * ```
     *
     * @param jsonInterface - The JSON interface for the contract to instantiate.
     * @param address - The address of the smart contract to call.
     * @param options - The options of the contract. Some are used as fallbacks for calls and transactions.
     * @param context - The context of the contract used for customizing the behavior of the contract.
     * @returns - The contract instance with all its methods and events.
     *
     * ```ts title="Example"
     * var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
     *   from: '0x1234567890123456789012345678901234567891', // default from address
     *   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
     * });
     * ```
     *
     * To use the type safe interface for these contracts you have to include the ABI definitions in your TypeScript project and then declare these as `const`.
     *
     * ```ts title="Example"
     * const myContractAbi = [....] as const; // ABI definitions
     * const myContract = new web3.eth.Contract(myContractAbi, '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe');
     * ```
     */
    constructor(jsonInterface: Abi, context?: Web3ContractContext | Web3Context, returnFormat?: DataFormat);
    constructor(jsonInterface: Abi, address?: Address, contextOrReturnFormat?: Web3ContractContext | Web3Context | DataFormat, returnFormat?: DataFormat);
    constructor(jsonInterface: Abi, options?: ContractInitOptions, contextOrReturnFormat?: Web3ContractContext | Web3Context | DataFormat, returnFormat?: DataFormat);
    constructor(jsonInterface: Abi, address: Address | undefined, options: ContractInitOptions, contextOrReturnFormat?: Web3ContractContext | Web3Context | DataFormat, returnFormat?: DataFormat);
    /**
     * Subscribe to an event.
     *
     * ```ts
     * await myContract.events.MyEvent([options])
     * ```
     *
     * There is a special event `allEvents` that can be used to subscribe all events.
     *
     * ```ts
     * await myContract.events.allEvents([options])
     * ```
     *
     * @returns - When individual event is accessed will returns {@link ContractBoundEvent} object
     */
    get events(): ContractEventsInterface<Abi, ContractEvents<Abi>>;
    /**
     * Creates a transaction object for that method, which then can be `called`, `send`, `estimated`, `createAccessList` , or `ABI encoded`.
     *
     * The methods of this smart contract are available through:
     *
     * The name: `myContract.methods.myMethod(123)`
     * The name with parameters: `myContract.methods['myMethod(uint256)'](123)`
     * The signature `myContract.methods['0x58cf5f10'](123)`
     *
     * This allows calling functions with same name but different parameters from the JavaScript contract object.
     *
     * \> The method signature does not provide a type safe interface, so we recommend to use method `name` instead.
     *
     * ```ts
     * // calling a method
     * const result = await myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
     *
     * // or sending and using a promise
     * const receipt = await myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
     *
     * // or sending and using the events
     * const sendObject = myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
     * sendObject.on('transactionHash', function(hash){
     *   ...
     * });
     * sendObject.on('receipt', function(receipt){
     *   ...
     * });
     * sendObject.on('confirmation', function(confirmationNumber, receipt){
     *   ...
     * });
     * sendObject.on('error', function(error, receipt) {
     *   ...
     * });
     * ```
     *
     * @returns - Either returns {@link PayableMethodObject} or {@link NonPayableMethodObject} based on the definitions of the ABI of that contract.
     */
    get methods(): ContractMethodsInterface<Abi>;
    /**
     * Clones the current contract instance. This doesn't deploy contract on blockchain and only creates a local clone.
     *
     * @returns - The new contract instance.
     *
     * ```ts
     * const contract1 = new web3.eth.Contract(abi, address, {gasPrice: '12345678', from: fromAddress});
     *
     * const contract2 = contract1.clone();
     * contract2.options.address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
     *
     * (contract1.options.address !== contract2.options.address);
     * > true
     * ```
     */
    clone(): Contract<any>;
    /**
     * Call this function to deploy the contract to the blockchain. After successful deployment the promise will resolve with a new contract instance.
     *
     * ```ts
     * myContract.deploy({
     *   input: '0x12345...', // data keyword can be used, too.
     *   arguments: [123, 'My String']
     * })
     * .send({
     *   from: '0x1234567890123456789012345678901234567891',
     *   gas: 1500000,
     *   gasPrice: '30000000000000'
     * }, function(error, transactionHash){ ... })
     * .on('error', function(error){ ... })
     * .on('transactionHash', function(transactionHash){ ... })
     * .on('receipt', function(receipt){
     *  console.log(receipt.contractAddress) // contains the new contract address
     * })
     * .on('confirmation', function(confirmationNumber, receipt){ ... })
     * .then(function(newContractInstance){
     *   console.log(newContractInstance.options.address) // instance with the new contract address
     * });
     *
     *
     * // When the data is already set as an option to the contract itself
     * myContract.options.data = '0x12345...';
     *
     * myContract.deploy({
     *   arguments: [123, 'My String']
     * })
     * .send({
     *   from: '0x1234567890123456789012345678901234567891',
     *   gas: 1500000,
     *   gasPrice: '30000000000000'
     * })
     * .then(function(newContractInstance){
     *   console.log(newContractInstance.options.address) // instance with the new contract address
     * });
     *
     *
     * // Simply encoding
     * myContract.deploy({
     *   input: '0x12345...',
     *   arguments: [123, 'My String']
     * })
     * .encodeABI();
     * > '0x12345...0000012345678765432'
     *
     *
     * // decoding
     * myContract.deploy({
     *   input: '0x12345...',
     *   // arguments: [123, 'My Greeting'] if you just need to decode the data, you can skip the arguments
     * })
     * .decodeData('0x12345...0000012345678765432');
     * > {
     *      __method__: 'constructor',
     *      __length__: 2,
     *      '0': '123',
     *      _id: '123',
     *      '1': 'My Greeting',
     *      _greeting: 'My Greeting',
     *   }
     *
     *
     * // Gas estimation
     * myContract.deploy({
     *   input: '0x12345...',
     *   arguments: [123, 'My String']
     * })
     * .estimateGas(function(err, gas){
     *   console.log(gas);
     * });
     * ```
     *
     * @returns - The transaction object
     */
    deploy(deployOptions?: {
        /**
         * The byte code of the contract.
         */
        data?: HexString;
        input?: HexString;
        /**
         * The arguments which get passed to the constructor on deployment.
         */
        arguments?: ContractConstructorArgs<Abi>;
    }): {
        arguments: never[] | NonNullable<ContractConstructorArgs<Abi>>;
        send: (options?: PayableTxOptions) => ContractDeploySend<Abi>;
        estimateGas: <ReturnFormat extends DataFormat = {
            readonly number: import("web3-types").FMT_NUMBER.BIGINT;
            readonly bytes: import("web3-types").FMT_BYTES.HEX;
        }>(options?: PayableCallOptions, returnFormat?: ReturnFormat) => Promise<import("web3-types").NumberTypes[ReturnFormat["number"]]>;
        encodeABI: () => string;
        decodeData: (data: HexString) => {
            __method__: string;
            __length__: number;
        };
    };
    /**
     * Gets past events for this contract.
     *
     * ```ts
     * const events = await myContract.getPastEvents('MyEvent', {
     *   filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
     *   fromBlock: 0,
     *   toBlock: 'latest'
     * });
     *
     * > [{
     *   returnValues: {
     *       myIndexedParam: 20,
     *       myOtherIndexedParam: '0x123456789...',
     *       myNonIndexParam: 'My String'
     *   },
     *   raw: {
     *       data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
     *       topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
     *   },
     *   event: 'MyEvent',
     *   signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
     *   logIndex: 0,
     *   transactionIndex: 0,
     *   transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
     *   blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
     *   blockNumber: 1234,
     *   address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
     * },{
     *   ...
     * }]
     * ```
     *
     * @param eventName - The name of the event in the contract, or `allEvents` to get all events.
     * @param filter - The filter options used to get events.
     * @param returnFormat - Return format
     * @returns - An array with the past event `Objects`, matching the given event name and filter.
     */
    getPastEvents<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(returnFormat?: ReturnFormat): Promise<(string | EventLog)[]>;
    getPastEvents<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(eventName: keyof ContractEvents<Abi> | 'allEvents' | 'ALLEVENTS', returnFormat?: ReturnFormat): Promise<(string | EventLog)[]>;
    getPastEvents<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(filter: Omit<Filter, 'address'>, returnFormat?: ReturnFormat): Promise<(string | EventLog)[]>;
    getPastEvents<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(eventName: keyof ContractEvents<Abi> | 'allEvents' | 'ALLEVENTS', filter: Omit<Filter, 'address'>, returnFormat?: ReturnFormat): Promise<(string | EventLog)[]>;
    private _parseAndSetAddress;
    decodeMethodData(data: HexString): DecodedParams & {
        __method__: string;
    };
    private _parseAndSetJsonInterface;
    private _getAbiParams;
    private _createContractMethod;
    private _contractMethodCall;
    private _contractMethodCreateAccessList;
    private _contractMethodSend;
    private _contractMethodDeploySend;
    private _contractMethodEstimateGas;
    private _createContractEvent;
    protected subscribeToContextEvents<T extends Web3Context>(context: T): void;
}
export {};
