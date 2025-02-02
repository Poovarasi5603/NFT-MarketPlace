# Installation
> `npm install --save @types/web3-provider-engine`

# Summary
This package contains type definitions for web3-provider-engine (https://github.com/MetaMask/provider-engine#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/web3-provider-engine.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/web3-provider-engine/index.d.ts)
````ts
import { JSONRPCRequestPayload, JSONRPCResponsePayload, Provider } from "ethereum-protocol";
interface Web3ProviderEngineOptions {
    pollingInterval?: number | undefined;
    blockTracker?: any;
    blockTrackerProvider?: any;
}
declare class Web3ProviderEngine implements Provider {
    constructor(options?: Web3ProviderEngineOptions);
    on(event: string, handler: () => void): void;
    send(payload: JSONRPCRequestPayload): void;
    sendAsync(
        payload: JSONRPCRequestPayload,
        callback: (
            error: null | Error,
            response: JSONRPCResponsePayload,
        ) => void,
    ): void;
    addProvider(provider: any): void;
    // start block polling
    start(callback?: () => void): void;
    // stop block polling
    stop(): void;
}
export = Web3ProviderEngine;

// declare module "web3-provider-engine/subproviders/nonce-tracker";
// declare module "web3-provider-engine/subproviders/hooked-wallet";
// declare module "web3-provider-engine/subproviders/filters";

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 15:11:36 GMT
 * Dependencies: [@types/ethereum-protocol](https://npmjs.com/package/@types/ethereum-protocol)

# Credits
These definitions were written by [Leonid Logvinov](https://github.com/LogvinovLeon).
