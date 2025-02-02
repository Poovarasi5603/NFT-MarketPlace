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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DEFAULT_RETURN_FORMAT, } from 'web3-types';
import { ProviderError, SubscriptionError } from 'web3-errors';
import { isNullish } from 'web3-utils';
import { isSupportSubscriptions } from './utils.js';
import { Web3RequestManagerEvent } from './web3_request_manager.js';
export class Web3SubscriptionManager {
    constructor(requestManager, registeredSubscriptions, tolerateUnlinkedSubscription = false) {
        this.requestManager = requestManager;
        this.registeredSubscriptions = registeredSubscriptions;
        this.tolerateUnlinkedSubscription = tolerateUnlinkedSubscription;
        this._subscriptions = new Map();
        this.requestManager.on(Web3RequestManagerEvent.BEFORE_PROVIDER_CHANGE, () => __awaiter(this, void 0, void 0, function* () {
            yield this.unsubscribe();
        }));
        this.requestManager.on(Web3RequestManagerEvent.PROVIDER_CHANGED, () => {
            this.clear();
            this.listenToProviderEvents();
        });
        this.listenToProviderEvents();
    }
    listenToProviderEvents() {
        const providerAsWebProvider = this.requestManager.provider;
        if (!this.requestManager.provider ||
            (typeof (providerAsWebProvider === null || providerAsWebProvider === void 0 ? void 0 : providerAsWebProvider.supportsSubscriptions) === 'function' &&
                !(providerAsWebProvider === null || providerAsWebProvider === void 0 ? void 0 : providerAsWebProvider.supportsSubscriptions()))) {
            return;
        }
        if (typeof this.requestManager.provider.on === 'function') {
            if (typeof this.requestManager.provider.request === 'function') {
                // Listen to provider messages and data
                this.requestManager.provider.on('message', 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
                (message) => this.messageListener(message));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
                providerAsWebProvider.on('data', (data) => this.messageListener(data));
            }
        }
    }
    messageListener(data) {
        var _a, _b, _c;
        if (!data) {
            throw new SubscriptionError('Should not call messageListener with no data. Type was');
        }
        const subscriptionId = ((_a = data.params) === null || _a === void 0 ? void 0 : _a.subscription) ||
            ((_b = data.data) === null || _b === void 0 ? void 0 : _b.subscription) ||
            ((_c = data.id) === null || _c === void 0 ? void 0 : _c.toString(16));
        // Process if the received data is related to a subscription
        if (subscriptionId) {
            const sub = this._subscriptions.get(subscriptionId);
            sub === null || sub === void 0 ? void 0 : sub.processSubscriptionData(data);
        }
    }
    /**
     * Will create a new subscription
     *
     * @param name - The subscription you want to subscribe to
     * @param args - Optional additional parameters, depending on the subscription type
     * @param returnFormat- ({@link DataFormat} defaults to {@link DEFAULT_RETURN_FORMAT}) - Specifies how the return data from the call should be formatted.
     *
     * Will subscribe to a specific topic (note: name)
     * @returns The subscription object
     */
    subscribe(name, args, returnFormat = DEFAULT_RETURN_FORMAT) {
        return __awaiter(this, void 0, void 0, function* () {
            const Klass = this.registeredSubscriptions[name];
            if (!Klass) {
                throw new SubscriptionError('Invalid subscription type');
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const subscription = new Klass(args !== null && args !== void 0 ? args : undefined, {
                subscriptionManager: this,
                returnFormat,
            });
            yield this.addSubscription(subscription);
            return subscription;
        });
    }
    /**
     * Will returns all subscriptions.
     */
    get subscriptions() {
        return this._subscriptions;
    }
    /**
     *
     * Adds an instance of {@link Web3Subscription} and subscribes to it
     *
     * @param sub - A {@link Web3Subscription} object
     */
    addSubscription(sub) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.requestManager.provider) {
                throw new ProviderError('Provider not available');
            }
            if (!this.supportsSubscriptions()) {
                throw new SubscriptionError('The current provider does not support subscriptions');
            }
            if (sub.id && this._subscriptions.has(sub.id)) {
                throw new SubscriptionError(`Subscription with id "${sub.id}" already exists`);
            }
            yield sub.sendSubscriptionRequest();
            if (isNullish(sub.id)) {
                throw new SubscriptionError('Subscription is not subscribed yet.');
            }
            this._subscriptions.set(sub.id, sub);
            return sub.id;
        });
    }
    /**
     * Will clear a subscription
     *
     * @param id - The subscription of type {@link Web3Subscription}  to remove
     */
    removeSubscription(sub) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = sub;
            if (isNullish(id)) {
                throw new SubscriptionError('Subscription is not subscribed yet. Or, had already been unsubscribed but not through the Subscription Manager.');
            }
            if (!this._subscriptions.has(id) && !this.tolerateUnlinkedSubscription) {
                throw new SubscriptionError(`Subscription with id "${id.toString()}" does not exists`);
            }
            yield sub.sendUnsubscribeRequest();
            this._subscriptions.delete(id);
            return id;
        });
    }
    /**
     * Will unsubscribe all subscriptions that fulfill the condition
     *
     * @param condition - A function that access and `id` and a `subscription` and return `true` or `false`
     * @returns An array of all the un-subscribed subscriptions
     */
    unsubscribe(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            for (const [id, sub] of this.subscriptions.entries()) {
                if (!condition || (typeof condition === 'function' && condition({ id, sub }))) {
                    result.push(this.removeSubscription(sub));
                }
            }
            return Promise.all(result);
        });
    }
    /**
     * Clears all subscriptions
     */
    clear() {
        this._subscriptions.clear();
    }
    /**
     * Check whether the current provider supports subscriptions.
     *
     * @returns `true` or `false` depending on if the current provider supports subscriptions
     */
    supportsSubscriptions() {
        return isNullish(this.requestManager.provider)
            ? false
            : isSupportSubscriptions(this.requestManager.provider);
    }
}
//# sourceMappingURL=web3_subscription_manager.js.map