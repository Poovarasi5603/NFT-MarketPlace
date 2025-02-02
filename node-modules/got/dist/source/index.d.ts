declare const got: import("./types.js").Got;
export default got;
export { got };
export { default as Options } from './core/options.js';
export * from './core/options.js';
export * from './core/response.js';
export type { default as Request } from './core/index.js';
export * from './core/index.js';
export * from './core/errors.js';
export { Delays } from './core/timed-out.js';
export { default as calculateRetryDelay } from './core/calculate-retry-delay.js';
export * from './as-promise/types.js';
export * from './types.js';
export { default as create } from './create.js';
export { default as parseLinkHeader } from './core/parse-link-header.js';
