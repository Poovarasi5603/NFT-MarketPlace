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
import { BaseWeb3Error } from '../web3_error_base.js';
import { ERR_RPC_INTERNAL_ERROR, ERR_RPC_INVALID_INPUT, ERR_RPC_INVALID_JSON, ERR_RPC_INVALID_METHOD, ERR_RPC_INVALID_PARAMS, ERR_RPC_INVALID_REQUEST, ERR_RPC_LIMIT_EXCEEDED, ERR_RPC_MISSING_RESOURCE, ERR_RPC_NOT_SUPPORTED, ERR_RPC_TRANSACTION_REJECTED, ERR_RPC_UNAVAILABLE_RESOURCE, ERR_RPC_UNSUPPORTED_METHOD, } from '../error_codes.js';
import { RpcErrorMessages, genericRpcErrorMessageTemplate } from './rpc_error_messages.js';
export class RpcError extends BaseWeb3Error {
    constructor(rpcError, message) {
        super(message !== null && message !== void 0 ? message : genericRpcErrorMessageTemplate.replace('*code*', rpcError.error.code.toString()));
        this.code = rpcError.error.code;
        this.id = rpcError.id;
        this.jsonrpc = rpcError.jsonrpc;
        this.jsonRpcError = rpcError.error;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { error: this.jsonRpcError, id: this.id, jsonRpc: this.jsonrpc });
    }
}
export class EIP1193ProviderRpcError extends BaseWeb3Error {
    constructor(code, data) {
        var _a, _b, _c, _d;
        if (!code) {
            // this case should ideally not happen
            super();
        }
        else if ((_a = RpcErrorMessages[code]) === null || _a === void 0 ? void 0 : _a.message) {
            super(RpcErrorMessages[code].message);
        }
        else {
            // Retrieve the status code object for the given code from the table, by searching through the appropriate range
            const statusCodeRange = Object.keys(RpcErrorMessages).find(statusCode => typeof statusCode === 'string' &&
                code >= parseInt(statusCode.split('-')[0], 10) &&
                code <= parseInt(statusCode.split('-')[1], 10));
            super((_c = (_b = RpcErrorMessages[statusCodeRange !== null && statusCodeRange !== void 0 ? statusCodeRange : '']) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : genericRpcErrorMessageTemplate.replace('*code*', (_d = code === null || code === void 0 ? void 0 : code.toString()) !== null && _d !== void 0 ? _d : '""'));
        }
        this.code = code;
        this.data = data;
    }
}
export class ParseError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_INVALID_JSON].message);
        this.code = ERR_RPC_INVALID_JSON;
    }
}
export class InvalidRequestError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_INVALID_REQUEST].message);
        this.code = ERR_RPC_INVALID_REQUEST;
    }
}
export class MethodNotFoundError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_INVALID_METHOD].message);
        this.code = ERR_RPC_INVALID_METHOD;
    }
}
export class InvalidParamsError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_INVALID_PARAMS].message);
        this.code = ERR_RPC_INVALID_PARAMS;
    }
}
export class InternalError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_INTERNAL_ERROR].message);
        this.code = ERR_RPC_INTERNAL_ERROR;
    }
}
export class InvalidInputError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_INVALID_INPUT].message);
        this.code = ERR_RPC_INVALID_INPUT;
    }
}
export class MethodNotSupported extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_UNSUPPORTED_METHOD].message);
        this.code = ERR_RPC_UNSUPPORTED_METHOD;
    }
}
export class ResourceUnavailableError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_UNAVAILABLE_RESOURCE].message);
        this.code = ERR_RPC_UNAVAILABLE_RESOURCE;
    }
}
export class ResourcesNotFoundError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_MISSING_RESOURCE].message);
        this.code = ERR_RPC_MISSING_RESOURCE;
    }
}
export class VersionNotSupportedError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_NOT_SUPPORTED].message);
        this.code = ERR_RPC_NOT_SUPPORTED;
    }
}
export class TransactionRejectedError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_TRANSACTION_REJECTED].message);
        this.code = ERR_RPC_TRANSACTION_REJECTED;
    }
}
export class LimitExceededError extends RpcError {
    constructor(rpcError) {
        super(rpcError, RpcErrorMessages[ERR_RPC_LIMIT_EXCEEDED].message);
        this.code = ERR_RPC_LIMIT_EXCEEDED;
    }
}
export const rpcErrorsMap = new Map();
rpcErrorsMap.set(ERR_RPC_INVALID_JSON, { error: ParseError });
rpcErrorsMap.set(ERR_RPC_INVALID_REQUEST, {
    error: InvalidRequestError,
});
rpcErrorsMap.set(ERR_RPC_INVALID_METHOD, {
    error: MethodNotFoundError,
});
rpcErrorsMap.set(ERR_RPC_INVALID_PARAMS, { error: InvalidParamsError });
rpcErrorsMap.set(ERR_RPC_INTERNAL_ERROR, { error: InternalError });
rpcErrorsMap.set(ERR_RPC_INVALID_INPUT, { error: InvalidInputError });
rpcErrorsMap.set(ERR_RPC_UNSUPPORTED_METHOD, {
    error: MethodNotSupported,
});
rpcErrorsMap.set(ERR_RPC_UNAVAILABLE_RESOURCE, {
    error: ResourceUnavailableError,
});
rpcErrorsMap.set(ERR_RPC_TRANSACTION_REJECTED, {
    error: TransactionRejectedError,
});
rpcErrorsMap.set(ERR_RPC_MISSING_RESOURCE, {
    error: ResourcesNotFoundError,
});
rpcErrorsMap.set(ERR_RPC_NOT_SUPPORTED, {
    error: VersionNotSupportedError,
});
rpcErrorsMap.set(ERR_RPC_LIMIT_EXCEEDED, { error: LimitExceededError });
//# sourceMappingURL=rpc_errors.js.map