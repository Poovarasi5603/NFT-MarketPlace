import { Address } from './eth_types.js';
import { Bytes, Numbers } from './primitives_types.js';
import { FixedSizeArray } from './utility_types.js';
declare type _SolidityIndexRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 25 | 26 | 27 | 28 | 29 | 30;
export declare type ConvertToNumber<T extends string, Range extends number = _SolidityIndexRange> = Range extends unknown ? (`${Range}` extends T ? Range : never) : never;
export declare type Components = {
    name: string;
    type: string;
    indexed?: boolean;
    components?: Components[];
};
export interface AbiStruct {
    [key: string]: unknown;
    name: string;
    type: string;
}
export interface AbiCoderStruct extends AbiStruct {
    [key: string]: unknown;
    components?: Array<AbiStruct>;
}
export declare type AbiParameter = {
    readonly name: string;
    readonly type: string;
    readonly baseType?: string;
    readonly indexed?: boolean;
    readonly components?: ReadonlyArray<AbiParameter>;
    readonly arrayLength?: number;
    readonly arrayChildren?: ReadonlyArray<AbiParameter>;
    readonly internalType?: string;
};
declare type FragmentTypes = 'constructor' | 'event' | 'function' | 'fallback' | 'receive';
export declare type AbiBaseFragment = {
    readonly type: string | FragmentTypes;
};
export declare type AbiConstructorFragment = AbiBaseFragment & {
    readonly type: string | 'constructor';
    readonly stateMutability: string | 'nonpayable' | 'payable';
    readonly inputs?: ReadonlyArray<AbiParameter>;
};
export declare type AbiFunctionFragment = AbiBaseFragment & {
    readonly name: string;
    readonly type: string | 'function';
    readonly stateMutability?: string | 'nonpayable' | 'payable' | 'pure' | 'view';
    readonly inputs?: ReadonlyArray<AbiParameter>;
    readonly outputs?: ReadonlyArray<AbiParameter>;
    readonly constant?: boolean;
    readonly payable?: boolean;
    readonly signature?: string;
    readonly methodNameWithInputs?: string;
};
export declare type AbiFallbackFragment = AbiBaseFragment & {
    readonly name: never;
    readonly type: string | 'fallback';
    readonly stateMutability: string | 'nonpayable' | 'payable' | 'pure' | 'view';
    readonly inputs: never;
    readonly outputs: never;
    readonly constant?: boolean;
    readonly payable?: boolean;
};
export declare type AbiEventFragment = AbiBaseFragment & {
    readonly name: string;
    readonly type: string | 'event';
    readonly inputs?: ReadonlyArray<AbiParameter>;
    readonly anonymous?: boolean;
};
export declare type AbiErrorFragment = AbiBaseFragment & {
    readonly name: string;
    readonly type: string | 'error';
    readonly inputs?: ReadonlyArray<AbiParameter>;
};
export declare type AbiInput = string | AbiParameter | {
    name: string;
    type: string;
    components?: Components;
    index?: boolean;
    internalType?: string;
} | {
    readonly [key: string]: unknown;
};
export interface AbiOutput {
    name: string;
    type: string;
    components?: AbiOutput[];
    internalType?: string;
}
export declare type AbiFragment = AbiConstructorFragment | AbiFunctionFragment | AbiEventFragment | AbiErrorFragment | AbiFallbackFragment;
export declare type AbiItem = AbiFragment;
export declare type ContractAbi = ReadonlyArray<AbiFragment> | ReadonlyArray<AbiItem>;
export declare type JsonFunctionInterface = {
    type: 'function';
    name: string;
    inputs: Components[];
    outputs?: AbiInput[];
    stateMutability?: string;
};
export declare type JsonEventInterface = {
    type: 'event';
    name: string;
    inputs: Components[];
    indexed: boolean;
    anonymous: boolean;
};
export declare type FilterAbis<Abis extends ContractAbi, Filter, Abi = Abis[number]> = Abi extends Filter ? Abi : never;
declare type _TypedArray<Type, Size extends string> = Size extends '' ? Type[] : FixedSizeArray<Type, ConvertToNumber<Size>>;
export declare type PrimitiveAddressType<Type extends string> = Type extends `address[${infer Size}]` ? _TypedArray<Address, Size> : Type extends 'address' ? Address : never;
export declare type PrimitiveStringType<Type extends string> = Type extends `string${string}[${infer Size}]` ? _TypedArray<string, Size> : Type extends 'string' | `string${string}` ? string : never;
export declare type PrimitiveBooleanType<Type extends string> = Type extends `bool[${infer Size}]` ? _TypedArray<boolean, Size> : Type extends 'bool' ? boolean : never;
export declare type PrimitiveIntegerType<Type extends string> = Type extends `uint${string}[${infer Size}]` | `int${string}[${infer Size}]` ? _TypedArray<Numbers, Size> : Type extends 'uint' | 'int' | `int${string}` | `uint${string}` ? Numbers : never;
export declare type PrimitiveBytesType<Type extends string> = Type extends `bytes${string}[${infer Size}]` ? _TypedArray<Bytes, Size> : Type extends 'bytes' | `bytes${string}` ? Bytes : never;
export declare type PrimitiveTupleType<Type extends string, TypeComponents extends ReadonlyArray<AbiParameter> | undefined | unknown = []> = TypeComponents extends ReadonlyArray<AbiParameter> ? Type extends 'tuple' ? {
    [Param in TypeComponents[number] as Param['name']]: MatchPrimitiveType<Param['type'], Param['components']>;
} : Type extends `tuple[${infer Size}]` ? _TypedArray<{
    [Param in TypeComponents[number] as Param['name']]: MatchPrimitiveType<Param['type'], Param['components']>;
}, Size> : never : never;
declare type ObjectToArray<T extends unknown[]> = T extends [...infer R, infer A] ? Record<R['length'], A> & ObjectToArray<R> : T;
declare type ArrToObjectWithFunctions<T extends unknown[]> = Array<unknown> & ObjectToArray<T>;
export declare type MatchPrimitiveType<Type extends string, TypeComponents extends ReadonlyArray<AbiParameter> | undefined | unknown> = PrimitiveAddressType<Type> | PrimitiveStringType<Type> | PrimitiveBooleanType<Type> | PrimitiveIntegerType<Type> | PrimitiveBytesType<Type> | PrimitiveTupleType<Type, TypeComponents> | never;
declare type ContractMethodOutputParametersRecursiveArray<Params extends ReadonlyArray<unknown> | undefined> = Params extends readonly [] ? [] : Params extends readonly [infer H, ...infer R] ? H extends AbiParameter ? [
    MatchPrimitiveType<H['type'], H['components']>,
    ...ContractMethodOutputParametersRecursiveArray<R>
] : [] : [];
declare type ContractMethodOutputParametersRecursiveRecord<Params extends ReadonlyArray<unknown> | undefined> = Params extends readonly [] ? [] : Params extends readonly [infer H, ...infer R] ? H extends AbiParameter ? H['name'] extends '' ? ContractMethodOutputParametersRecursiveRecord<R> : Record<H['name'], MatchPrimitiveType<H['type'], H['components']>> & // sets key-value pair of output param name and type
ContractMethodOutputParametersRecursiveRecord<R> : ContractMethodOutputParametersRecursiveRecord<R> : Params extends undefined | unknown ? [] : Params;
export declare type ContractMethodOutputParameters<Params extends ReadonlyArray<unknown> | undefined> = Params extends readonly [] ? void : Params extends readonly [infer H, ...infer R] ? R extends readonly [] ? H extends AbiParameter ? MatchPrimitiveType<H['type'], H['components']> : [] : // if more than one output
ArrToObjectWithFunctions<[...ContractMethodOutputParametersRecursiveArray<Params>]> & ContractMethodOutputParametersRecursiveRecord<Params> : [];
export declare type ContractMethodInputParameters<Params extends ReadonlyArray<unknown> | undefined> = Params extends readonly [] ? [] : Params extends readonly [infer H, ...infer R] ? H extends AbiParameter ? [
    MatchPrimitiveType<H['type'], H['components']>,
    ...ContractMethodInputParameters<R>
] : ContractMethodInputParameters<R> : Params extends undefined | unknown ? [] : Params;
export declare type ContractConstructor<Abis extends ContractAbi> = {
    [Abi in FilterAbis<Abis, AbiConstructorFragment & {
        type: 'constructor';
    }> as 'constructor']: {
        readonly Abi: Abi;
        readonly Inputs: ContractMethodInputParameters<Abi['inputs']>;
    };
}['constructor'];
export declare type ContractConstructorArgs<Abis extends ContractAbi> = FilterAbis<Abis, AbiConstructorFragment & {
    type: 'constructor';
}> extends never ? any : {
    [Abi in FilterAbis<Abis, AbiConstructorFragment & {
        type: 'constructor';
    }> as 'constructor']: ContractMethodInputParameters<Abi['inputs']>;
}['constructor'];
export declare type ContractMethod<Abi extends AbiFunctionFragment> = {
    readonly Abi: Abi;
    readonly Inputs: ContractMethodInputParameters<Abi['inputs']>;
    readonly Outputs: ContractMethodOutputParameters<Abi['outputs']>;
};
export declare type ContractMethods<Abis extends ContractAbi> = {
    [Abi in FilterAbis<Abis, AbiFunctionFragment & {
        type: 'function';
    }> as Abi['name']]: ContractMethod<Abi>;
};
export declare type ContractEvent<Abi extends AbiEventFragment> = {
    readonly Abi: Abi;
    readonly Inputs: ContractMethodInputParameters<Abi['inputs']>;
};
export declare type ContractEvents<Abis extends ContractAbi> = {
    [Abi in FilterAbis<Abis, AbiEventFragment & {
        type: 'event';
    }> as Abi['name']]: ContractEvent<Abi>;
};
export interface DecodedParams extends Record<string, unknown> {
    __length__: number;
}
export {};
