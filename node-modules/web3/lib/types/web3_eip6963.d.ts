import { Web3APISpec, EIP1193Provider } from "web3-types";
export declare enum Eip6963EventName {
    eip6963announceProvider = "eip6963:announceProvider",
    eip6963requestProvider = "eip6963:requestProvider"
}
export interface EIP6963ProviderInfo {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
}
export interface EIP6963ProviderDetail<API = Web3APISpec> {
    info: EIP6963ProviderInfo;
    provider: EIP1193Provider<API>;
}
export interface EIP6963AnnounceProviderEvent<API = Web3APISpec> extends CustomEvent {
    type: Eip6963EventName.eip6963announceProvider;
    detail: EIP6963ProviderDetail<API>;
}
export interface EIP6963RequestProviderEvent extends Event {
    type: Eip6963EventName.eip6963requestProvider;
}
export declare const eip6963ProvidersMap: Map<string, EIP6963ProviderDetail>;
export declare const web3ProvidersMapUpdated = "web3:providersMapUpdated";
export interface EIP6963ProvidersMapUpdateEvent extends CustomEvent {
    type: string;
    detail: Map<string, EIP6963ProviderDetail>;
}
export declare const requestEIP6963Providers: () => Promise<unknown>;
export declare const onNewProviderDiscovered: (callback: (providerEvent: EIP6963AnnounceProviderEvent) => void) => void;
//# sourceMappingURL=web3_eip6963.d.ts.map