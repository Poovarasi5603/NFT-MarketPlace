(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mafmt"] = factory();
	else
		root["Mafmt"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */

/* eslint-disable no-proto */


var base64 = __webpack_require__(14);

var ieee754 = __webpack_require__(15);

var isArray = __webpack_require__(16);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */

Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
/*
 * Export kMaxLength after typed array support is determined.
 */

exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function foo() {
        return 42;
      }
    };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }

    that.length = length;
  }

  return that;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */


function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return allocUnsafe(this, arg);
  }

  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/


Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }

  return createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }

  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }

  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  encode: __webpack_require__(25),
  decode: __webpack_require__(26),
  encodingLength: __webpack_require__(27)
};

/***/ }),
/* 2 */
/***/ (function(module) {

module.exports = JSON.parse("{\"identity\":0,\"ip4\":4,\"tcp\":6,\"sha1\":17,\"sha2-256\":18,\"sha2-512\":19,\"sha3-512\":20,\"sha3-384\":21,\"sha3-256\":22,\"sha3-224\":23,\"shake-128\":24,\"shake-256\":25,\"keccak-224\":26,\"keccak-256\":27,\"keccak-384\":28,\"keccak-512\":29,\"dccp\":33,\"murmur3-128\":34,\"murmur3-32\":35,\"ip6\":41,\"ip6zone\":42,\"path\":47,\"multicodec\":48,\"multihash\":49,\"multiaddr\":50,\"multibase\":51,\"dns\":53,\"dns4\":54,\"dns6\":55,\"dnsaddr\":56,\"protobuf\":80,\"cbor\":81,\"raw\":85,\"dbl-sha2-256\":86,\"rlp\":96,\"bencode\":99,\"dag-pb\":112,\"dag-cbor\":113,\"libp2p-key\":114,\"git-raw\":120,\"torrent-info\":123,\"torrent-file\":124,\"leofcoin-block\":129,\"leofcoin-tx\":130,\"leofcoin-pr\":131,\"sctp\":132,\"eth-block\":144,\"eth-block-list\":145,\"eth-tx-trie\":146,\"eth-tx\":147,\"eth-tx-receipt-trie\":148,\"eth-tx-receipt\":149,\"eth-state-trie\":150,\"eth-account-snapshot\":151,\"eth-storage-trie\":152,\"bitcoin-block\":176,\"bitcoin-tx\":177,\"zcash-block\":192,\"zcash-tx\":193,\"stellar-block\":208,\"stellar-tx\":209,\"md4\":212,\"md5\":213,\"bmt\":214,\"decred-block\":224,\"decred-tx\":225,\"ipld-ns\":226,\"ipfs-ns\":227,\"swarm-ns\":228,\"ipns-ns\":229,\"zeronet\":230,\"ed25519-pub\":237,\"dash-block\":240,\"dash-tx\":241,\"swarm-manifest\":250,\"swarm-feed\":251,\"udp\":273,\"p2p-webrtc-star\":275,\"p2p-webrtc-direct\":276,\"p2p-stardust\":277,\"p2p-circuit\":290,\"dag-json\":297,\"udt\":301,\"utp\":302,\"unix\":400,\"p2p\":421,\"ipfs\":421,\"https\":443,\"onion\":444,\"onion3\":445,\"garlic64\":446,\"garlic32\":447,\"tls\":448,\"quic\":460,\"ws\":477,\"wss\":478,\"p2p-websocket-star\":479,\"http\":480,\"json\":512,\"messagepack\":513,\"x11\":4352,\"blake2b-8\":45569,\"blake2b-16\":45570,\"blake2b-24\":45571,\"blake2b-32\":45572,\"blake2b-40\":45573,\"blake2b-48\":45574,\"blake2b-56\":45575,\"blake2b-64\":45576,\"blake2b-72\":45577,\"blake2b-80\":45578,\"blake2b-88\":45579,\"blake2b-96\":45580,\"blake2b-104\":45581,\"blake2b-112\":45582,\"blake2b-120\":45583,\"blake2b-128\":45584,\"blake2b-136\":45585,\"blake2b-144\":45586,\"blake2b-152\":45587,\"blake2b-160\":45588,\"blake2b-168\":45589,\"blake2b-176\":45590,\"blake2b-184\":45591,\"blake2b-192\":45592,\"blake2b-200\":45593,\"blake2b-208\":45594,\"blake2b-216\":45595,\"blake2b-224\":45596,\"blake2b-232\":45597,\"blake2b-240\":45598,\"blake2b-248\":45599,\"blake2b-256\":45600,\"blake2b-264\":45601,\"blake2b-272\":45602,\"blake2b-280\":45603,\"blake2b-288\":45604,\"blake2b-296\":45605,\"blake2b-304\":45606,\"blake2b-312\":45607,\"blake2b-320\":45608,\"blake2b-328\":45609,\"blake2b-336\":45610,\"blake2b-344\":45611,\"blake2b-352\":45612,\"blake2b-360\":45613,\"blake2b-368\":45614,\"blake2b-376\":45615,\"blake2b-384\":45616,\"blake2b-392\":45617,\"blake2b-400\":45618,\"blake2b-408\":45619,\"blake2b-416\":45620,\"blake2b-424\":45621,\"blake2b-432\":45622,\"blake2b-440\":45623,\"blake2b-448\":45624,\"blake2b-456\":45625,\"blake2b-464\":45626,\"blake2b-472\":45627,\"blake2b-480\":45628,\"blake2b-488\":45629,\"blake2b-496\":45630,\"blake2b-504\":45631,\"blake2b-512\":45632,\"blake2s-8\":45633,\"blake2s-16\":45634,\"blake2s-24\":45635,\"blake2s-32\":45636,\"blake2s-40\":45637,\"blake2s-48\":45638,\"blake2s-56\":45639,\"blake2s-64\":45640,\"blake2s-72\":45641,\"blake2s-80\":45642,\"blake2s-88\":45643,\"blake2s-96\":45644,\"blake2s-104\":45645,\"blake2s-112\":45646,\"blake2s-120\":45647,\"blake2s-128\":45648,\"blake2s-136\":45649,\"blake2s-144\":45650,\"blake2s-152\":45651,\"blake2s-160\":45652,\"blake2s-168\":45653,\"blake2s-176\":45654,\"blake2s-184\":45655,\"blake2s-192\":45656,\"blake2s-200\":45657,\"blake2s-208\":45658,\"blake2s-216\":45659,\"blake2s-224\":45660,\"blake2s-232\":45661,\"blake2s-240\":45662,\"blake2s-248\":45663,\"blake2s-256\":45664,\"skein256-8\":45825,\"skein256-16\":45826,\"skein256-24\":45827,\"skein256-32\":45828,\"skein256-40\":45829,\"skein256-48\":45830,\"skein256-56\":45831,\"skein256-64\":45832,\"skein256-72\":45833,\"skein256-80\":45834,\"skein256-88\":45835,\"skein256-96\":45836,\"skein256-104\":45837,\"skein256-112\":45838,\"skein256-120\":45839,\"skein256-128\":45840,\"skein256-136\":45841,\"skein256-144\":45842,\"skein256-152\":45843,\"skein256-160\":45844,\"skein256-168\":45845,\"skein256-176\":45846,\"skein256-184\":45847,\"skein256-192\":45848,\"skein256-200\":45849,\"skein256-208\":45850,\"skein256-216\":45851,\"skein256-224\":45852,\"skein256-232\":45853,\"skein256-240\":45854,\"skein256-248\":45855,\"skein256-256\":45856,\"skein512-8\":45857,\"skein512-16\":45858,\"skein512-24\":45859,\"skein512-32\":45860,\"skein512-40\":45861,\"skein512-48\":45862,\"skein512-56\":45863,\"skein512-64\":45864,\"skein512-72\":45865,\"skein512-80\":45866,\"skein512-88\":45867,\"skein512-96\":45868,\"skein512-104\":45869,\"skein512-112\":45870,\"skein512-120\":45871,\"skein512-128\":45872,\"skein512-136\":45873,\"skein512-144\":45874,\"skein512-152\":45875,\"skein512-160\":45876,\"skein512-168\":45877,\"skein512-176\":45878,\"skein512-184\":45879,\"skein512-192\":45880,\"skein512-200\":45881,\"skein512-208\":45882,\"skein512-216\":45883,\"skein512-224\":45884,\"skein512-232\":45885,\"skein512-240\":45886,\"skein512-248\":45887,\"skein512-256\":45888,\"skein512-264\":45889,\"skein512-272\":45890,\"skein512-280\":45891,\"skein512-288\":45892,\"skein512-296\":45893,\"skein512-304\":45894,\"skein512-312\":45895,\"skein512-320\":45896,\"skein512-328\":45897,\"skein512-336\":45898,\"skein512-344\":45899,\"skein512-352\":45900,\"skein512-360\":45901,\"skein512-368\":45902,\"skein512-376\":45903,\"skein512-384\":45904,\"skein512-392\":45905,\"skein512-400\":45906,\"skein512-408\":45907,\"skein512-416\":45908,\"skein512-424\":45909,\"skein512-432\":45910,\"skein512-440\":45911,\"skein512-448\":45912,\"skein512-456\":45913,\"skein512-464\":45914,\"skein512-472\":45915,\"skein512-480\":45916,\"skein512-488\":45917,\"skein512-496\":45918,\"skein512-504\":45919,\"skein512-512\":45920,\"skein1024-8\":45921,\"skein1024-16\":45922,\"skein1024-24\":45923,\"skein1024-32\":45924,\"skein1024-40\":45925,\"skein1024-48\":45926,\"skein1024-56\":45927,\"skein1024-64\":45928,\"skein1024-72\":45929,\"skein1024-80\":45930,\"skein1024-88\":45931,\"skein1024-96\":45932,\"skein1024-104\":45933,\"skein1024-112\":45934,\"skein1024-120\":45935,\"skein1024-128\":45936,\"skein1024-136\":45937,\"skein1024-144\":45938,\"skein1024-152\":45939,\"skein1024-160\":45940,\"skein1024-168\":45941,\"skein1024-176\":45942,\"skein1024-184\":45943,\"skein1024-192\":45944,\"skein1024-200\":45945,\"skein1024-208\":45946,\"skein1024-216\":45947,\"skein1024-224\":45948,\"skein1024-232\":45949,\"skein1024-240\":45950,\"skein1024-248\":45951,\"skein1024-256\":45952,\"skein1024-264\":45953,\"skein1024-272\":45954,\"skein1024-280\":45955,\"skein1024-288\":45956,\"skein1024-296\":45957,\"skein1024-304\":45958,\"skein1024-312\":45959,\"skein1024-320\":45960,\"skein1024-328\":45961,\"skein1024-336\":45962,\"skein1024-344\":45963,\"skein1024-352\":45964,\"skein1024-360\":45965,\"skein1024-368\":45966,\"skein1024-376\":45967,\"skein1024-384\":45968,\"skein1024-392\":45969,\"skein1024-400\":45970,\"skein1024-408\":45971,\"skein1024-416\":45972,\"skein1024-424\":45973,\"skein1024-432\":45974,\"skein1024-440\":45975,\"skein1024-448\":45976,\"skein1024-456\":45977,\"skein1024-464\":45978,\"skein1024-472\":45979,\"skein1024-480\":45980,\"skein1024-488\":45981,\"skein1024-496\":45982,\"skein1024-504\":45983,\"skein1024-512\":45984,\"skein1024-520\":45985,\"skein1024-528\":45986,\"skein1024-536\":45987,\"skein1024-544\":45988,\"skein1024-552\":45989,\"skein1024-560\":45990,\"skein1024-568\":45991,\"skein1024-576\":45992,\"skein1024-584\":45993,\"skein1024-592\":45994,\"skein1024-600\":45995,\"skein1024-608\":45996,\"skein1024-616\":45997,\"skein1024-624\":45998,\"skein1024-632\":45999,\"skein1024-640\":46000,\"skein1024-648\":46001,\"skein1024-656\":46002,\"skein1024-664\":46003,\"skein1024-672\":46004,\"skein1024-680\":46005,\"skein1024-688\":46006,\"skein1024-696\":46007,\"skein1024-704\":46008,\"skein1024-712\":46009,\"skein1024-720\":46010,\"skein1024-728\":46011,\"skein1024-736\":46012,\"skein1024-744\":46013,\"skein1024-752\":46014,\"skein1024-760\":46015,\"skein1024-768\":46016,\"skein1024-776\":46017,\"skein1024-784\":46018,\"skein1024-792\":46019,\"skein1024-800\":46020,\"skein1024-808\":46021,\"skein1024-816\":46022,\"skein1024-824\":46023,\"skein1024-832\":46024,\"skein1024-840\":46025,\"skein1024-848\":46026,\"skein1024-856\":46027,\"skein1024-864\":46028,\"skein1024-872\":46029,\"skein1024-880\":46030,\"skein1024-888\":46031,\"skein1024-896\":46032,\"skein1024-904\":46033,\"skein1024-912\":46034,\"skein1024-920\":46035,\"skein1024-928\":46036,\"skein1024-936\":46037,\"skein1024-944\":46038,\"skein1024-952\":46039,\"skein1024-960\":46040,\"skein1024-968\":46041,\"skein1024-976\":46042,\"skein1024-984\":46043,\"skein1024-992\":46044,\"skein1024-1000\":46045,\"skein1024-1008\":46046,\"skein1024-1016\":46047,\"skein1024-1024\":46048,\"holochain-adr-v0\":8417572,\"holochain-adr-v1\":8483108,\"holochain-key-v0\":9728292,\"holochain-key-v1\":9793828,\"holochain-sig-v0\":10645796,\"holochain-sig-v1\":10711332}");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Protocols(proto) {
  if (typeof proto === 'number') {
    if (Protocols.codes[proto]) {
      return Protocols.codes[proto];
    }

    throw new Error('no protocol with code: ' + proto);
  } else if (typeof proto === 'string' || proto instanceof String) {
    if (Protocols.names[proto]) {
      return Protocols.names[proto];
    }

    throw new Error('no protocol with name: ' + proto);
  }

  throw new Error('invalid protocol id type: ' + proto);
}

const V = -1;
Protocols.lengthPrefixedVarSize = V;
Protocols.V = V;
Protocols.table = [[4, 32, 'ip4'], [6, 16, 'tcp'], [33, 16, 'dccp'], [41, 128, 'ip6'], [42, V, 'ip6zone'], [53, V, 'dns', 'resolvable'], [54, V, 'dns4', 'resolvable'], [55, V, 'dns6', 'resolvable'], [56, V, 'dnsaddr', 'resolvable'], [132, 16, 'sctp'], [273, 16, 'udp'], [275, 0, 'p2p-webrtc-star'], [276, 0, 'p2p-webrtc-direct'], [277, 0, 'p2p-stardust'], [290, 0, 'p2p-circuit'], [301, 0, 'udt'], [302, 0, 'utp'], [400, V, 'unix', false, 'path'], // `ipfs` is added before `p2p` for legacy support.
// All text representations will default to `p2p`, but `ipfs` will
// still be supported
[421, V, 'ipfs'], // `p2p` is the preferred name for 421, and is now the default
[421, V, 'p2p'], [443, 0, 'https'], [444, 96, 'onion'], [445, 296, 'onion3'], [446, V, 'garlic64'], [460, 0, 'quic'], [477, 0, 'ws'], [478, 0, 'wss'], [479, 0, 'p2p-websocket-star'], [480, 0, 'http']];
Protocols.names = {};
Protocols.codes = {}; // populate tables

Protocols.table.map(row => {
  const proto = p.apply(null, row);
  Protocols.codes[proto.code] = proto;
  Protocols.names[proto.name] = proto;
});
Protocols.object = p;

function p(code, size, name, resolvable, path) {
  return {
    code: code,
    size: size,
    name: name,
    resolvable: Boolean(resolvable),
    path: Boolean(path)
  };
}

module.exports = Protocols;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var basex = __webpack_require__(23);

var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
module.exports = basex(ALPHABET);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(0);

var Buffer = buffer.Buffer; // alternative to using Object.keys for old browsers

function copyProps(src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}

if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer(arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length);
}

SafeBuffer.prototype = Object.create(Buffer.prototype); // Copy static methods from Buffer

copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number');
  }

  return Buffer(arg, encodingOrOffset, length);
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  var buf = Buffer(size);

  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }

  return buf;
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return Buffer(size);
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number');
  }

  return buffer.SlowBuffer(size);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const mh = __webpack_require__(8);

const multibase = __webpack_require__(28);

const multicodec = __webpack_require__(35);

const codecs = __webpack_require__(2);

const CIDUtil = __webpack_require__(40);

const withIs = __webpack_require__(10);
/**
 * @typedef {Object} SerializedCID
 * @param {string} codec
 * @param {number} version
 * @param {Buffer} multihash
 */

/**
 * Test if the given input is a CID.
 * @function isCID
 * @memberof CID
 * @static
 * @param {any} other
 * @returns {bool}
 */

/**
 * Class representing a CID `<mbase><version><mcodec><mhash>`
 * , as defined in [ipld/cid](https://github.com/multiformats/cid).
 * @class CID
 */


class CID {
  /**
   * Create a new CID.
   *
   * The algorithm for argument input is roughly:
   * ```
   * if (cid)
   *   -> create a copy
   * else if (str)
   *   if (1st char is on multibase table) -> CID String
   *   else -> bs58 encoded multihash
   * else if (Buffer)
   *   if (1st byte is 0 or 1) -> CID
   *   else -> multihash
   * else if (Number)
   *   -> construct CID by parts
   * ```
   *
   * @param {string|Buffer|CID} version
   * @param {string} [codec]
   * @param {Buffer} [multihash]
   * @param {string} [multibaseName]
   *
   * @example
   * new CID(<version>, <codec>, <multihash>, <multibaseName>)
   * new CID(<cidStr>)
   * new CID(<cid.buffer>)
   * new CID(<multihash>)
   * new CID(<bs58 encoded multihash>)
   * new CID(<cid>)
   */
  constructor(version, codec, multihash, multibaseName) {
    if (_CID.isCID(version)) {
      // version is an exising CID instance
      const cid = version;
      this.version = cid.version;
      this.codec = cid.codec;
      this.multihash = Buffer.from(cid.multihash); // Default guard for when a CID < 0.7 is passed with no multibaseName

      this.multibaseName = cid.multibaseName || (cid.version === 0 ? 'base58btc' : 'base32');
      return;
    }

    if (typeof version === 'string') {
      // e.g. 'base32' or false
      const baseName = multibase.isEncoded(version);

      if (baseName) {
        // version is a CID String encoded with multibase, so v1
        const cid = multibase.decode(version);
        this.version = parseInt(cid.slice(0, 1).toString('hex'), 16);
        this.codec = multicodec.getCodec(cid.slice(1));
        this.multihash = multicodec.rmPrefix(cid.slice(1));
        this.multibaseName = baseName;
      } else {
        // version is a base58btc string multihash, so v0
        this.version = 0;
        this.codec = 'dag-pb';
        this.multihash = mh.fromB58String(version);
        this.multibaseName = 'base58btc';
      }

      CID.validateCID(this);
      Object.defineProperty(this, 'string', {
        value: version
      });
      return;
    }

    if (Buffer.isBuffer(version)) {
      const firstByte = version.slice(0, 1);
      const v = parseInt(firstByte.toString('hex'), 16);

      if (v === 1) {
        // version is a CID buffer
        const cid = version;
        this.version = v;
        this.codec = multicodec.getCodec(cid.slice(1));
        this.multihash = multicodec.rmPrefix(cid.slice(1));
        this.multibaseName = 'base32';
      } else {
        // version is a raw multihash buffer, so v0
        this.version = 0;
        this.codec = 'dag-pb';
        this.multihash = version;
        this.multibaseName = 'base58btc';
      }

      CID.validateCID(this);
      return;
    } // otherwise, assemble the CID from the parameters

    /**
     * @type {number}
     */


    this.version = version;
    /**
     * @type {string}
     */

    this.codec = codec;
    /**
     * @type {Buffer}
     */

    this.multihash = multihash;
    /**
     * @type {string}
     */

    this.multibaseName = multibaseName || (version === 0 ? 'base58btc' : 'base32');
    CID.validateCID(this);
  }
  /**
   * The CID as a `Buffer`
   *
   * @return {Buffer}
   * @readonly
   *
   * @memberOf CID
   */


  get buffer() {
    let buffer = this._buffer;

    if (!buffer) {
      if (this.version === 0) {
        buffer = this.multihash;
      } else if (this.version === 1) {
        buffer = Buffer.concat([Buffer.from('01', 'hex'), multicodec.getCodeVarint(this.codec), this.multihash]);
      } else {
        throw new Error('unsupported version');
      } // Cache this buffer so it doesn't have to be recreated


      Object.defineProperty(this, '_buffer', {
        value: buffer
      });
    }

    return buffer;
  }
  /**
   * Get the prefix of the CID.
   *
   * @returns {Buffer}
   * @readonly
   */


  get prefix() {
    return Buffer.concat([Buffer.from("0".concat(this.version), 'hex'), multicodec.getCodeVarint(this.codec), mh.prefix(this.multihash)]);
  }
  /**
   * Convert to a CID of version `0`.
   *
   * @returns {CID}
   */


  toV0() {
    if (this.codec !== 'dag-pb') {
      throw new Error('Cannot convert a non dag-pb CID to CIDv0');
    }

    const {
      name,
      length
    } = mh.decode(this.multihash);

    if (name !== 'sha2-256') {
      throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
    }

    if (length !== 32) {
      throw new Error('Cannot convert non 32 byte multihash CID to CIDv0');
    }

    return new _CID(0, this.codec, this.multihash);
  }
  /**
   * Convert to a CID of version `1`.
   *
   * @returns {CID}
   */


  toV1() {
    return new _CID(1, this.codec, this.multihash);
  }
  /**
   * Encode the CID into a string.
   *
   * @param {string} [base=this.multibaseName] - Base encoding to use.
   * @returns {string}
   */


  toBaseEncodedString(base = this.multibaseName) {
    if (this.string && base === this.multibaseName) {
      return this.string;
    }

    let str = null;

    if (this.version === 0) {
      if (base !== 'base58btc') {
        throw new Error('not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()');
      }

      str = mh.toB58String(this.multihash);
    } else if (this.version === 1) {
      str = multibase.encode(base, this.buffer).toString();
    } else {
      throw new Error('unsupported version');
    }

    if (base === this.multibaseName) {
      // cache the string value
      Object.defineProperty(this, 'string', {
        value: str
      });
    }

    return str;
  }

  toString(base) {
    return this.toBaseEncodedString(base);
  }
  /**
   * Serialize to a plain object.
   *
   * @returns {SerializedCID}
   */


  toJSON() {
    return {
      codec: this.codec,
      version: this.version,
      hash: this.multihash
    };
  }
  /**
   * Compare equality with another CID.
   *
   * @param {CID} other
   * @returns {bool}
   */


  equals(other) {
    return this.codec === other.codec && this.version === other.version && this.multihash.equals(other.multihash);
  }
  /**
   * Test if the given input is a valid CID object.
   * Throws if it is not.
   *
   * @param {any} other
   * @returns {void}
   */


  static validateCID(other) {
    const errorMsg = CIDUtil.checkCIDComponents(other);

    if (errorMsg) {
      throw new Error(errorMsg);
    }
  }

}

const _CID = withIs(CID, {
  className: 'CID',
  symbolName: '@ipld/js-cid/CID'
});

_CID.codecs = codecs;
module.exports = _CID;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Multihash implementation in JavaScript.
 *
 * @module multihash
 */


const bs58 = __webpack_require__(4);

const cs = __webpack_require__(24);

exports.names = cs.names;
exports.codes = cs.codes;
exports.defaultLengths = cs.defaultLengths;

const varint = __webpack_require__(1);
/**
 * Convert the given multihash to a hex encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */


exports.toHexString = function toHexString(hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer');
  }

  return hash.toString('hex');
};
/**
 * Convert the given hex encoded string to a multihash.
 *
 * @param {string} hash
 * @returns {Buffer}
 */


exports.fromHexString = function fromHexString(hash) {
  return Buffer.from(hash, 'hex');
};
/**
 * Convert the given multihash to a base58 encoded string.
 *
 * @param {Buffer} hash
 * @returns {string}
 */


exports.toB58String = function toB58String(hash) {
  if (!Buffer.isBuffer(hash)) {
    throw new Error('must be passed a buffer');
  }

  return bs58.encode(hash);
};
/**
 * Convert the given base58 encoded string to a multihash.
 *
 * @param {string|Buffer} hash
 * @returns {Buffer}
 */


exports.fromB58String = function fromB58String(hash) {
  let encoded = hash;

  if (Buffer.isBuffer(hash)) {
    encoded = hash.toString();
  }

  return Buffer.from(bs58.decode(encoded));
};
/**
 * Decode a hash from the given multihash.
 *
 * @param {Buffer} buf
 * @returns {{code: number, name: string, length: number, digest: Buffer}} result
 */


exports.decode = function decode(buf) {
  if (!Buffer.isBuffer(buf)) {
    throw new Error('multihash must be a Buffer');
  }

  if (buf.length < 3) {
    throw new Error('multihash too short. must be > 3 bytes.');
  }

  const code = varint.decode(buf);

  if (!exports.isValidCode(code)) {
    throw new Error("multihash unknown function code: 0x".concat(code.toString(16)));
  }

  buf = buf.slice(varint.decode.bytes);
  const len = varint.decode(buf);

  if (len < 1) {
    throw new Error("multihash invalid length: 0x".concat(len.toString(16)));
  }

  buf = buf.slice(varint.decode.bytes);

  if (buf.length !== len) {
    throw new Error("multihash length inconsistent: 0x".concat(buf.toString('hex')));
  }

  return {
    code: code,
    name: cs.codes[code],
    length: len,
    digest: buf
  };
};
/**
 *  Encode a hash digest along with the specified function code.
 *
 * > **Note:** the length is derived from the length of the digest itself.
 *
 * @param {Buffer} digest
 * @param {string|number} code
 * @param {number} [length]
 * @returns {Buffer}
 */


exports.encode = function encode(digest, code, length) {
  if (!digest || code === undefined) {
    throw new Error('multihash encode requires at least two args: digest, code');
  } // ensure it's a hashfunction code.


  const hashfn = exports.coerceCode(code);

  if (!Buffer.isBuffer(digest)) {
    throw new Error('digest should be a Buffer');
  }

  if (length == null) {
    length = digest.length;
  }

  if (length && digest.length !== length) {
    throw new Error('digest length should be equal to specified length.');
  }

  return Buffer.concat([Buffer.from(varint.encode(hashfn)), Buffer.from(varint.encode(length)), digest]);
};
/**
 * Converts a hash function name into the matching code.
 * If passed a number it will return the number if it's a valid code.
 * @param {string|number} name
 * @returns {number}
 */


exports.coerceCode = function coerceCode(name) {
  let code = name;

  if (typeof name === 'string') {
    if (cs.names[name] === undefined) {
      throw new Error("Unrecognized hash function named: ".concat(name));
    }

    code = cs.names[name];
  }

  if (typeof code !== 'number') {
    throw new Error("Hash function code should be a number. Got: ".concat(code));
  }

  if (cs.codes[code] === undefined && !exports.isAppCode(code)) {
    throw new Error("Unrecognized function code: ".concat(code));
  }

  return code;
};
/**
 * Checks wether a code is part of the app range
 *
 * @param {number} code
 * @returns {boolean}
 */


exports.isAppCode = function appCode(code) {
  return code > 0 && code < 0x10;
};
/**
 * Checks whether a multihash code is valid.
 *
 * @param {number} code
 * @returns {boolean}
 */


exports.isValidCode = function validCode(code) {
  if (exports.isAppCode(code)) {
    return true;
  }

  if (cs.codes[code]) {
    return true;
  }

  return false;
};
/**
 * Check if the given buffer is a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */


function validate(multihash) {
  exports.decode(multihash); // throws if bad.
}

exports.validate = validate;
/**
 * Returns a prefix from a valid multihash. Throws an error if it is not valid.
 *
 * @param {Buffer} multihash
 * @returns {undefined}
 * @throws {Error}
 */

exports.prefix = function prefix(multihash) {
  validate(multihash);
  return multihash.slice(0, 2);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const varint = __webpack_require__(1);

module.exports = {
  numberToBuffer,
  bufferToNumber,
  varintBufferEncode,
  varintBufferDecode,
  varintEncode
};

function bufferToNumber(buf) {
  return parseInt(buf.toString('hex'), 16);
}

function numberToBuffer(num) {
  let hexString = num.toString(16);

  if (hexString.length % 2 === 1) {
    hexString = '0' + hexString;
  }

  return Buffer.from(hexString, 'hex');
}

function varintBufferEncode(input) {
  return Buffer.from(varint.encode(bufferToNumber(input)));
}

function varintBufferDecode(input) {
  return numberToBuffer(varint.decode(input));
}

function varintEncode(num) {
  return Buffer.from(varint.encode(num));
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function withIs(Class, {
  className,
  symbolName
}) {
  const symbol = Symbol.for(symbolName);
  const ClassIsWrapper = {
    // The code below assigns the class wrapper to an object to trick
    // JavaScript engines to show the name of the extended class when
    // logging an instances.
    // We are assigning an anonymous class (class wrapper) to the object
    // with key `className` to keep the correct name.
    // If this is not supported it falls back to logging `ClassIsWrapper`.
    [className]: class extends Class {
      constructor(...args) {
        super(...args);
        Object.defineProperty(this, symbol, {
          value: true
        });
      }

      get [Symbol.toStringTag]() {
        return className;
      }

    }
  }[className];

  ClassIsWrapper["is".concat(className)] = obj => !!(obj && obj[symbol]);

  return ClassIsWrapper;
}

function withIsProto(Class, {
  className,
  symbolName,
  withoutNew
}) {
  const symbol = Symbol.for(symbolName);
  /* eslint-disable object-shorthand */

  const ClassIsWrapper = {
    [className]: function (...args) {
      if (withoutNew && !(this instanceof ClassIsWrapper)) {
        return new ClassIsWrapper(...args);
      }

      const _this = Class.call(this, ...args) || this;

      if (_this && !_this[symbol]) {
        Object.defineProperty(_this, symbol, {
          value: true
        });
      }

      return _this;
    }
  }[className];
  /* eslint-enable object-shorthand */

  ClassIsWrapper.prototype = Object.create(Class.prototype);
  ClassIsWrapper.prototype.constructor = ClassIsWrapper;
  Object.defineProperty(ClassIsWrapper.prototype, Symbol.toStringTag, {
    get() {
      return className;
    }

  });

  ClassIsWrapper["is".concat(className)] = obj => !!(obj && obj[symbol]);

  return ClassIsWrapper;
}

module.exports = withIs;
module.exports.proto = withIsProto;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const multiaddr = __webpack_require__(13);
/*
 * Valid combinations
 */


const DNS4 = base('dns4');
const DNS6 = base('dns6');
const DNS = or(base('dns'), base('dnsaddr'), DNS4, DNS6);
const IP = or(base('ip4'), base('ip6'));
const TCP = or(and(IP, base('tcp')), and(DNS, base('tcp')));
const UDP = and(IP, base('udp'));
const UTP = and(UDP, base('utp'));
const WebSockets = or(and(TCP, base('ws')), and(DNS, base('ws')));
const WebSocketsSecure = or(and(TCP, base('wss')), and(DNS, base('wss')));
const HTTP = or(and(TCP, base('http')), and(IP, base('http')), and(DNS, base('http')));
const HTTPS = or(and(TCP, base('https')), and(IP, base('https')), and(DNS, base('https')));
const WebRTCStar = or(and(WebSockets, base('p2p-webrtc-star'), base('p2p')), and(WebSocketsSecure, base('p2p-webrtc-star'), base('p2p')), and(WebSockets, base('p2p-webrtc-star')), and(WebSocketsSecure, base('p2p-webrtc-star')));
const WebSocketStar = or(and(WebSockets, base('p2p-websocket-star'), base('p2p')), and(WebSocketsSecure, base('p2p-websocket-star'), base('p2p')), and(WebSockets, base('p2p-websocket-star')), and(WebSocketsSecure, base('p2p-websocket-star')));
const WebRTCDirect = or(and(HTTP, base('p2p-webrtc-direct')), and(HTTPS, base('p2p-webrtc-direct')));
const Reliable = or(WebSockets, WebSocketsSecure, HTTP, HTTPS, WebRTCStar, WebRTCDirect, TCP, UTP); // Unlike ws-star, stardust can run over any transport thus removing the requirement for websockets (but don't even think about running a stardust server over webrtc-star ;) )

const Stardust = or(and(Reliable, base('p2p-stardust'), base('p2p')), and(Reliable, base('p2p-stardust')));

const _P2P = or(and(Reliable, base('p2p')), WebRTCStar, base('p2p'));

const _Circuit = or(and(_P2P, base('p2p-circuit'), _P2P), and(_P2P, base('p2p-circuit')), and(base('p2p-circuit'), _P2P), and(Reliable, base('p2p-circuit')), and(base('p2p-circuit'), Reliable), base('p2p-circuit'));

const CircuitRecursive = () => or(and(_Circuit, CircuitRecursive), _Circuit);

const Circuit = CircuitRecursive();
const P2P = or(and(Circuit, _P2P, Circuit), and(_P2P, Circuit), and(Circuit, _P2P), Circuit, _P2P);
exports.DNS = DNS;
exports.DNS4 = DNS4;
exports.DNS6 = DNS6;
exports.IP = IP;
exports.TCP = TCP;
exports.UDP = UDP;
exports.UTP = UTP;
exports.HTTP = HTTP;
exports.HTTPS = HTTPS;
exports.WebSockets = WebSockets;
exports.WebSocketsSecure = WebSocketsSecure;
exports.WebSocketStar = WebSocketStar;
exports.WebRTCStar = WebRTCStar;
exports.WebRTCDirect = WebRTCDirect;
exports.Reliable = Reliable;
exports.Stardust = Stardust;
exports.Circuit = Circuit;
exports.P2P = P2P;
exports.IPFS = P2P;
/*
 * Validation funcs
 */

function makeMatchesFunction(partialMatch) {
  return function matches(a) {
    if (!multiaddr.isMultiaddr(a)) {
      try {
        a = multiaddr(a);
      } catch (err) {
        // catch error
        return false; // also if it's invalid it's propably not matching as well so return false
      }
    }

    const out = partialMatch(a.protoNames());

    if (out === null) {
      return false;
    }

    return out.length === 0;
  };
}

function and() {
  const args = Array.from(arguments);

  function partialMatch(a) {
    if (a.length < args.length) {
      return null;
    }

    args.some(arg => {
      a = typeof arg === 'function' ? arg().partialMatch(a) : arg.partialMatch(a);

      if (a === null) {
        return true;
      }
    });
    return a;
  }

  return {
    toString: function toString() {
      return '{ ' + args.join(' ') + ' }';
    },
    input: args,
    matches: makeMatchesFunction(partialMatch),
    partialMatch: partialMatch
  };
}

function or() {
  const args = Array.from(arguments);

  function partialMatch(a) {
    let out = null;
    args.some(arg => {
      const res = typeof arg === 'function' ? arg().partialMatch(a) : arg.partialMatch(a);

      if (res) {
        out = res;
        return true;
      }
    });
    return out;
  }

  const result = {
    toString: function toString() {
      return '{ ' + args.join(' ') + ' }';
    },
    input: args,
    matches: makeMatchesFunction(partialMatch),
    partialMatch: partialMatch
  };
  return result;
}

function base(n) {
  const name = n;

  function matches(a) {
    if (typeof a === 'string') {
      try {
        a = multiaddr(a);
      } catch (err) {
        // catch error
        return false; // also if it's invalid it's propably not matching as well so return false
      }
    }

    const pnames = a.protoNames();

    if (pnames.length === 1 && pnames[0] === name) {
      return true;
    }

    return false;
  }

  function partialMatch(protos) {
    if (protos.length === 0) {
      return null;
    }

    if (protos[0] === name) {
      return protos.slice(1);
    }

    return null;
  }

  return {
    toString: function toString() {
      return name;
    },
    matches: matches,
    partialMatch: partialMatch
  };
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const codec = __webpack_require__(17);

const protocols = __webpack_require__(3);

const varint = __webpack_require__(1);

const bs58 = __webpack_require__(4);

const CID = __webpack_require__(7);

const withIs = __webpack_require__(10);
/**
 * Creates a [multiaddr](https://github.com/multiformats/multiaddr) from
 * a Buffer, String or another Multiaddr instance
 * public key.
 * @class Multiaddr
 * @param {(String|Buffer|Multiaddr)} addr - If String or Buffer, needs to adhere
 * to the address format of a [multiaddr](https://github.com/multiformats/multiaddr#string-format)
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 */


const Multiaddr = withIs.proto(function (addr) {
  if (!(this instanceof Multiaddr)) {
    return new Multiaddr(addr);
  } // default


  if (addr == null) {
    addr = '';
  }

  if (addr instanceof Buffer) {
    /**
     * @type {Buffer} - The raw bytes representing this multiaddress
     */
    this.buffer = codec.fromBuffer(addr);
  } else if (typeof addr === 'string' || addr instanceof String) {
    if (addr.length > 0 && addr.charAt(0) !== '/') {
      throw new Error("multiaddr \"".concat(addr, "\" must start with a \"/\""));
    }

    this.buffer = codec.fromString(addr);
  } else if (addr.buffer && addr.protos && addr.protoCodes) {
    // Multiaddr
    this.buffer = codec.fromBuffer(addr.buffer); // validate + copy buffer
  } else {
    throw new Error('addr must be a string, Buffer, or another Multiaddr');
  }
}, {
  className: 'Multiaddr',
  symbolName: '@multiformats/js-multiaddr/multiaddr'
});
/**
 * Returns Multiaddr as a String
 *
 * @returns {String}
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').toString()
 * // '/ip4/127.0.0.1/tcp/4001'
 */

Multiaddr.prototype.toString = function toString() {
  return codec.bufferToString(this.buffer);
};
/**
 * Returns Multiaddr as a JSON encoded object
 *
 * @returns {String}
 * @example
 * JSON.stringify(Multiaddr('/ip4/127.0.0.1/tcp/4001'))
 * // '/ip4/127.0.0.1/tcp/4001'
 */


Multiaddr.prototype.toJSON = Multiaddr.prototype.toString;
/**
 * Returns Multiaddr as a convinient options object to be used with net.createConnection
 *
 * @returns {{family: String, host: String, transport: String, port: Number}}
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').toOptions()
 * // { family: 'ipv4', host: '127.0.0.1', transport: 'tcp', port: 4001 }
 */

Multiaddr.prototype.toOptions = function toOptions() {
  const opts = {};
  const parsed = this.toString().split('/');
  opts.family = parsed[1] === 'ip4' ? 'ipv4' : 'ipv6';
  opts.host = parsed[2];
  opts.transport = parsed[3];
  opts.port = parseInt(parsed[4]);
  return opts;
};
/**
 * Returns Multiaddr as a human-readable string
 *
 * @returns {String}
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').inspect()
 * // '<Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>'
 */


Multiaddr.prototype.inspect = function inspect() {
  return '<Multiaddr ' + this.buffer.toString('hex') + ' - ' + codec.bufferToString(this.buffer) + '>';
};
/**
 * Returns the protocols the Multiaddr is defined with, as an array of objects, in
 * left-to-right order. Each object contains the protocol code, protocol name,
 * and the size of its address space in bits.
 * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
 *
 * @returns {Array.<Object>} protocols - All the protocols the address is composed of
 * @returns {Number} protocols[].code
 * @returns {Number} protocols[].size
 * @returns {String} protocols[].name
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').protos()
 * // [ { code: 4, size: 32, name: 'ip4' },
 * //   { code: 6, size: 16, name: 'tcp' } ]
 */


Multiaddr.prototype.protos = function protos() {
  return this.protoCodes().map(code => Object.assign({}, protocols(code)));
};
/**
 * Returns the codes of the protocols in left-to-right order.
 * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
 *
 * @returns {Array.<Number>} protocol codes
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').protoCodes()
 * // [ 4, 6 ]
 */


Multiaddr.prototype.protoCodes = function protoCodes() {
  const codes = [];
  const buf = this.buffer;
  let i = 0;

  while (i < buf.length) {
    const code = varint.decode(buf, i);
    const n = varint.decode.bytes;
    const p = protocols(code);
    const size = codec.sizeForAddr(p, buf.slice(i + n));
    i += size + n;
    codes.push(code);
  }

  return codes;
};
/**
 * Returns the names of the protocols in left-to-right order.
 * [See list of protocols](https://github.com/multiformats/multiaddr/blob/master/protocols.csv)
 *
 * @return {Array.<String>} protocol names
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').protoNames()
 * // [ 'ip4', 'tcp' ]
 */


Multiaddr.prototype.protoNames = function protoNames() {
  return this.protos().map(proto => proto.name);
};
/**
 * Returns a tuple of parts
 *
 * @return {Array.<Array>} tuples
 * @return {Number} tuples[].0 code of protocol
 * @return {Buffer} tuples[].1 contents of address
 * @example
 * Multiaddr("/ip4/127.0.0.1/tcp/4001").tuples()
 * // [ [ 4, <Buffer 7f 00 00 01> ], [ 6, <Buffer 0f a1> ] ]
 */


Multiaddr.prototype.tuples = function tuples() {
  return codec.bufferToTuples(this.buffer);
};
/**
 * Returns a tuple of string/number parts
 *
 * @return {Array.<Array>} tuples
 * @return {Number} tuples[].0 code of protocol
 * @return {(String|Number)} tuples[].1 contents of address
 * @example
 * Multiaddr("/ip4/127.0.0.1/tcp/4001").stringTuples()
 * // [ [ 4, '127.0.0.1' ], [ 6, 4001 ] ]
 */


Multiaddr.prototype.stringTuples = function stringTuples() {
  const t = codec.bufferToTuples(this.buffer);
  return codec.tuplesToStringTuples(t);
};
/**
 * Encapsulates a Multiaddr in another Multiaddr
 *
 * @param {Multiaddr} addr - Multiaddr to add into this Multiaddr
 * @return {Multiaddr}
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
 *
 * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 *
 * const mh3 = mh1.encapsulate(mh2)
 * // <Multiaddr 0408080808060438047f000001060fa1 - /ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001>
 *
 * mh3.toString()
 * // '/ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001'
 */


Multiaddr.prototype.encapsulate = function encapsulate(addr) {
  addr = Multiaddr(addr);
  return Multiaddr(this.toString() + addr.toString());
};
/**
 * Decapsulates a Multiaddr from another Multiaddr
 *
 * @param {Multiaddr} addr - Multiaddr to remove from this Multiaddr
 * @return {Multiaddr}
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
 *
 * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 *
 * const mh3 = mh1.encapsulate(mh2)
 * // <Multiaddr 0408080808060438047f000001060fa1 - /ip4/8.8.8.8/tcp/1080/ip4/127.0.0.1/tcp/4001>
 *
 * mh3.decapsulate(mh2).toString()
 * // '/ip4/8.8.8.8/tcp/1080'
 */


Multiaddr.prototype.decapsulate = function decapsulate(addr) {
  addr = addr.toString();
  const s = this.toString();
  const i = s.lastIndexOf(addr);

  if (i < 0) {
    throw new Error('Address ' + this + ' does not contain subaddress: ' + addr);
  }

  return Multiaddr(s.slice(0, i));
};
/**
 * A more reliable version of `decapsulate` if you are targeting a
 * specific code, such as 421 (the `p2p` protocol code). The last index of the code
 * will be removed from the `Multiaddr`, and a new instance will be returned.
 * If the code is not present, the original `Multiaddr` is returned.
 *
 * @param {Number} code The code of the protocol to decapsulate from this Multiaddr
 * @return {Multiaddr}
 * @example
 * const addr = Multiaddr('/ip4/0.0.0.0/tcp/8080/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSupNKC')
 * // <Multiaddr 0400... - /ip4/0.0.0.0/tcp/8080/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSupNKC>
 *
 * addr.decapsulateCode(421).toString()
 * // '/ip4/0.0.0.0/tcp/8080'
 *
 * Multiaddr('/ip4/127.0.0.1/tcp/8080').decapsulateCode(421).toString()
 * // '/ip4/127.0.0.1/tcp/8080'
 */


Multiaddr.prototype.decapsulateCode = function decapsulateCode(code) {
  const tuples = this.tuples();

  for (let i = tuples.length - 1; i >= 0; i--) {
    if (tuples[i][0] === code) {
      return Multiaddr(codec.tuplesToBuffer(tuples.slice(0, i)));
    }
  }

  return this;
};
/**
 * Extract the peerId if the multiaddr contains one
 *
 * @return {String|null} peerId - The id of the peer or null if invalid or missing from the ma
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080/ipfs/QmValidBase58string')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080/ipfs/QmValidBase58string>
 *
 * // should return QmValidBase58string or null if the id is missing or invalid
 * const peerId = mh1.getPeerId()
 */


Multiaddr.prototype.getPeerId = function getPeerId() {
  let b58str = null;

  try {
    const tuples = this.stringTuples().filter(tuple => {
      if (tuple[0] === protocols.names.ipfs.code) {
        return true;
      }
    }); // Get the last id

    b58str = tuples.pop()[1]; // Get multihash, unwrap from CID if needed

    b58str = bs58.encode(new CID(b58str).multihash);
  } catch (e) {
    b58str = null;
  }

  return b58str;
};
/**
 * Extract the path if the multiaddr contains one
 *
 * @return {String|null} path - The path of the multiaddr, or null if no path protocol is present
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080/unix/tmp/p2p.sock')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080/unix/tmp/p2p.sock>
 *
 * // should return utf8 string or null if the id is missing or invalid
 * const path = mh1.getPath()
 */


Multiaddr.prototype.getPath = function getPath() {
  let path = null;

  try {
    path = this.stringTuples().filter(tuple => {
      const proto = protocols(tuple[0]);

      if (proto.path) {
        return true;
      }
    })[0][1];
  } catch (e) {
    path = null;
  }

  return path;
};
/**
 * Checks if two Multiaddrs are the same
 *
 * @param {Multiaddr} addr
 * @return {Bool}
 * @example
 * const mh1 = Multiaddr('/ip4/8.8.8.8/tcp/1080')
 * // <Multiaddr 0408080808060438 - /ip4/8.8.8.8/tcp/1080>
 *
 * const mh2 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 *
 * mh1.equals(mh1)
 * // true
 *
 * mh1.equals(mh2)
 * // false
 */


Multiaddr.prototype.equals = function equals(addr) {
  return this.buffer.equals(addr.buffer);
};
/**
 * Gets a Multiaddrs node-friendly address object. Note that protocol information
 * is left out: in Node (and most network systems) the protocol is unknowable
 * given only the address.
 *
 * Has to be a ThinWaist Address, otherwise throws error
 *
 * @returns {{family: String, address: String, port: Number}}
 * @throws {Error} Throws error if Multiaddr is not a Thin Waist address
 * @example
 * Multiaddr('/ip4/127.0.0.1/tcp/4001').nodeAddress()
 * // {family: 'IPv4', address: '127.0.0.1', port: '4001'}
 */


Multiaddr.prototype.nodeAddress = function nodeAddress() {
  const codes = this.protoCodes();
  const names = this.protoNames();
  const parts = this.toString().split('/').slice(1);

  if (parts.length < 4) {
    throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6}/{address}/{tcp, udp}/{port}".');
  } else if (codes[0] !== 4 && codes[0] !== 41 && codes[0] !== 54 && codes[0] !== 55) {
    throw new Error("no protocol with name: \"'".concat(names[0], "'\". Must have a valid family name: \"{ip4, ip6, dns4, dns6}\"."));
  } else if (parts[2] !== 'tcp' && parts[2] !== 'udp') {
    throw new Error("no protocol with name: \"'".concat(names[1], "'\". Must have a valid transport protocol: \"{tcp, udp}\"."));
  }

  return {
    family: codes[0] === 41 || codes[0] === 55 ? 6 : 4,
    address: parts[1],
    // ip addr
    port: parseInt(parts[3]) // tcp or udp port

  };
};
/**
 * Creates a Multiaddr from a node-friendly address object
 *
 * @param {{family: String, address: String, port: Number}} addr
 * @param {String} transport
 * @returns {Multiaddr} multiaddr
 * @throws {Error} Throws error if addr is not truthy
 * @throws {Error} Throws error if transport is not truthy
 * @example
 * Multiaddr.fromNodeAddress({address: '127.0.0.1', port: '4001'}, 'tcp')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 */


Multiaddr.fromNodeAddress = function fromNodeAddress(addr, transport) {
  if (!addr) throw new Error('requires node address object');
  if (!transport) throw new Error('requires transport protocol');
  const ip = addr.family === 'IPv6' ? 'ip6' : 'ip4';
  return Multiaddr('/' + [ip, addr.address, transport, addr.port].join('/'));
}; // TODO find a better example, not sure about it's good enough

/**
 * Returns if a Multiaddr is a Thin Waist address or not.
 *
 * Thin Waist is if a Multiaddr adheres to the standard combination of:
 *
 * `{IPv4, IPv6}/{TCP, UDP}`
 *
 * @param {Multiaddr} [addr] - Defaults to using `this` instance
 * @returns {Boolean} isThinWaistAddress
 * @example
 * const mh1 = Multiaddr('/ip4/127.0.0.1/tcp/4001')
 * // <Multiaddr 047f000001060fa1 - /ip4/127.0.0.1/tcp/4001>
 * const mh2 = Multiaddr('/ip4/192.168.2.1/tcp/5001')
 * // <Multiaddr 04c0a80201061389 - /ip4/192.168.2.1/tcp/5001>
 * const mh3 = mh1.encapsulate(mh2)
 * // <Multiaddr 047f000001060fa104c0a80201061389 - /ip4/127.0.0.1/tcp/4001/ip4/192.168.2.1/tcp/5001>
 * mh1.isThinWaistAddress()
 * // true
 * mh2.isThinWaistAddress()
 * // true
 * mh3.isThinWaistAddress()
 * // false
 */


Multiaddr.prototype.isThinWaistAddress = function isThinWaistAddress(addr) {
  const protos = (addr || this).protos();

  if (protos.length !== 2) {
    return false;
  }

  if (protos[0].code !== 4 && protos[0].code !== 41) {
    return false;
  }

  if (protos[1].code !== 6 && protos[1].code !== 273) {
    return false;
  }

  return true;
};
/**
 * Object containing table, names and codes of all supported protocols.
 * To get the protocol values from a Multiaddr, you can use
 * [`.protos()`](#multiaddrprotos),
 * [`.protoCodes()`](#multiaddrprotocodes) or
 * [`.protoNames()`](#multiaddrprotonames)
 *
 * @instance
 * @returns {{table: Array, names: Object, codes: Object}}
 *
 */


Multiaddr.protocols = protocols;
/**
 * Returns if something is a Multiaddr that is a name
 *
 * @param {Multiaddr} addr
 * @return {Bool} isName
 */

Multiaddr.isName = function isName(addr) {
  if (!Multiaddr.isMultiaddr(addr)) {
    return false;
  } // if a part of the multiaddr is resolvable, then return true


  return addr.protos().some(proto => proto.resolvable);
};
/**
 * Returns an array of multiaddrs, by resolving the multiaddr that is a name
 *
 * @async
 * @param {Multiaddr} addr
 * @return {Multiaddr[]}
 */


Multiaddr.resolve = function resolve(addr) {
  if (!Multiaddr.isMultiaddr(addr) || !Multiaddr.isName(addr)) {
    return Promise.reject(Error('not a valid name'));
  }
  /*
   * Needs more consideration from spec design:
   *   - what to return
   *   - how to achieve it in the browser?
   */


  return Promise.reject(new Error('not implemented yet'));
};

exports = module.exports = Multiaddr;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;

  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const convert = __webpack_require__(18);

const protocols = __webpack_require__(3);

const varint = __webpack_require__(1); // export codec


module.exports = {
  stringToStringTuples: stringToStringTuples,
  stringTuplesToString: stringTuplesToString,
  tuplesToStringTuples: tuplesToStringTuples,
  stringTuplesToTuples: stringTuplesToTuples,
  bufferToTuples: bufferToTuples,
  tuplesToBuffer: tuplesToBuffer,
  bufferToString: bufferToString,
  stringToBuffer: stringToBuffer,
  fromString: fromString,
  fromBuffer: fromBuffer,
  validateBuffer: validateBuffer,
  isValidBuffer: isValidBuffer,
  cleanPath: cleanPath,
  ParseError: ParseError,
  protoFromTuple: protoFromTuple,
  sizeForAddr: sizeForAddr
}; // string -> [[str name, str addr]... ]

function stringToStringTuples(str) {
  const tuples = [];
  const parts = str.split('/').slice(1); // skip first empty elem

  if (parts.length === 1 && parts[0] === '') {
    return [];
  }

  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];
    const proto = protocols(part);

    if (proto.size === 0) {
      tuples.push([part]);
      continue;
    }

    p++; // advance addr part

    if (p >= parts.length) {
      throw ParseError('invalid address: ' + str);
    } // if it's a path proto, take the rest


    if (proto.path) {
      tuples.push([part, // TODO: should we need to check each path part to see if it's a proto?
      // This would allow for other protocols to be added after a unix path,
      // however it would have issues if the path had a protocol name in the path
      cleanPath(parts.slice(p).join('/'))]);
      break;
    }

    tuples.push([part, parts[p]]);
  }

  return tuples;
} // [[str name, str addr]... ] -> string


function stringTuplesToString(tuples) {
  const parts = [];
  tuples.map(tup => {
    const proto = protoFromTuple(tup);
    parts.push(proto.name);

    if (tup.length > 1) {
      parts.push(tup[1]);
    }
  });
  return cleanPath(parts.join('/'));
} // [[str name, str addr]... ] -> [[int code, Buffer]... ]


function stringTuplesToTuples(tuples) {
  return tuples.map(tup => {
    if (!Array.isArray(tup)) {
      tup = [tup];
    }

    const proto = protoFromTuple(tup);

    if (tup.length > 1) {
      return [proto.code, convert.toBuffer(proto.code, tup[1])];
    }

    return [proto.code];
  });
} // [[int code, Buffer]... ] -> [[str name, str addr]... ]


function tuplesToStringTuples(tuples) {
  return tuples.map(tup => {
    const proto = protoFromTuple(tup);

    if (tup.length > 1) {
      return [proto.code, convert.toString(proto.code, tup[1])];
    }

    return [proto.code];
  });
} // [[int code, Buffer ]... ] -> Buffer


function tuplesToBuffer(tuples) {
  return fromBuffer(Buffer.concat(tuples.map(tup => {
    const proto = protoFromTuple(tup);
    let buf = Buffer.from(varint.encode(proto.code));

    if (tup.length > 1) {
      buf = Buffer.concat([buf, tup[1]]); // add address buffer
    }

    return buf;
  })));
}

function sizeForAddr(p, addr) {
  if (p.size > 0) {
    return p.size / 8;
  } else if (p.size === 0) {
    return 0;
  } else {
    const size = varint.decode(addr);
    return size + varint.decode.bytes;
  }
} // Buffer -> [[int code, Buffer ]... ]


function bufferToTuples(buf) {
  const tuples = [];
  let i = 0;

  while (i < buf.length) {
    const code = varint.decode(buf, i);
    const n = varint.decode.bytes;
    const p = protocols(code);
    const size = sizeForAddr(p, buf.slice(i + n));

    if (size === 0) {
      tuples.push([code]);
      i += n;
      continue;
    }

    const addr = buf.slice(i + n, i + n + size);
    i += size + n;

    if (i > buf.length) {
      // did not end _exactly_ at buffer.length
      throw ParseError('Invalid address buffer: ' + buf.toString('hex'));
    } // ok, tuple seems good.


    tuples.push([code, addr]);
  }

  return tuples;
} // Buffer -> String


function bufferToString(buf) {
  const a = bufferToTuples(buf);
  const b = tuplesToStringTuples(a);
  return stringTuplesToString(b);
} // String -> Buffer


function stringToBuffer(str) {
  str = cleanPath(str);
  const a = stringToStringTuples(str);
  const b = stringTuplesToTuples(a);
  return tuplesToBuffer(b);
} // String -> Buffer


function fromString(str) {
  return stringToBuffer(str);
} // Buffer -> Buffer


function fromBuffer(buf) {
  const err = validateBuffer(buf);
  if (err) throw err;
  return Buffer.from(buf); // copy
}

function validateBuffer(buf) {
  try {
    bufferToTuples(buf); // try to parse. will throw if breaks
  } catch (err) {
    return err;
  }
}

function isValidBuffer(buf) {
  return validateBuffer(buf) === undefined;
}

function cleanPath(str) {
  return '/' + str.trim().split('/').filter(a => a).join('/');
}

function ParseError(str) {
  return new Error('Error parsing address: ' + str);
}

function protoFromTuple(tup) {
  const proto = protocols(tup[0]);
  return proto;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const ip = __webpack_require__(19);

const isIp = __webpack_require__(21);

const protocols = __webpack_require__(3);

const bs58 = __webpack_require__(4);

const CID = __webpack_require__(7);

const base32 = __webpack_require__(41);

const varint = __webpack_require__(1);

module.exports = Convert; // converts (serializes) addresses

function Convert(proto, a) {
  if (a instanceof Buffer) {
    return Convert.toString(proto, a);
  } else {
    return Convert.toBuffer(proto, a);
  }
}

Convert.toString = function convertToString(proto, buf) {
  proto = protocols(proto);

  switch (proto.code) {
    case 4: // ipv4

    case 41:
      // ipv6
      return buf2ip(buf);

    case 6: // tcp

    case 273: // udp

    case 33: // dccp

    case 132:
      // sctp
      return buf2port(buf);

    case 53: // dns

    case 54: // dns4

    case 55: // dns6

    case 56: // dnsaddr

    case 400:
      // unix
      return buf2str(buf);

    case 421:
      // ipfs
      return buf2mh(buf);

    case 444:
      // onion
      return buf2onion(buf);

    case 445:
      // onion3
      return buf2onion(buf);

    default:
      return buf.toString('hex');
    // no clue. convert to hex
  }
};

Convert.toBuffer = function convertToBuffer(proto, str) {
  proto = protocols(proto);

  switch (proto.code) {
    case 4:
      // ipv4
      return ip2buf(str);

    case 41:
      // ipv6
      return ip2buf(str);

    case 6: // tcp

    case 273: // udp

    case 33: // dccp

    case 132:
      // sctp
      return port2buf(parseInt(str, 10));

    case 53: // dns

    case 54: // dns4

    case 55: // dns6

    case 56: // dnsaddr

    case 400:
      // unix
      return str2buf(str);

    case 421:
      // ipfs
      return mh2buf(str);

    case 444:
      // onion
      return onion2buf(str);

    case 445:
      // onion3
      return onion32buf(str);

    default:
      return Buffer.from(str, 'hex');
    // no clue. convert from hex
  }
};

function ip2buf(ipString) {
  if (!isIp(ipString)) {
    throw new Error('invalid ip address');
  }

  return ip.toBuffer(ipString);
}

function buf2ip(ipBuff) {
  const ipString = ip.toString(ipBuff);

  if (!isIp(ipString)) {
    throw new Error('invalid ip address');
  }

  return ipString;
}

function port2buf(port) {
  const buf = Buffer.alloc(2);
  buf.writeUInt16BE(port, 0);
  return buf;
}

function buf2port(buf) {
  return buf.readUInt16BE(0);
}

function str2buf(str) {
  const buf = Buffer.from(str);
  const size = Buffer.from(varint.encode(buf.length));
  return Buffer.concat([size, buf]);
}

function buf2str(buf) {
  const size = varint.decode(buf);
  buf = buf.slice(varint.decode.bytes);

  if (buf.length !== size) {
    throw new Error('inconsistent lengths');
  }

  return buf.toString();
}

function mh2buf(hash) {
  // the address is a varint prefixed multihash string representation
  const mh = new CID(hash).multihash;
  const size = Buffer.from(varint.encode(mh.length));
  return Buffer.concat([size, mh]);
}

function buf2mh(buf) {
  const size = varint.decode(buf);
  const address = buf.slice(varint.decode.bytes);

  if (address.length !== size) {
    throw new Error('inconsistent lengths');
  }

  return bs58.encode(address);
}

function onion2buf(str) {
  const addr = str.split(':');

  if (addr.length !== 2) {
    throw new Error('failed to parse onion addr: ' + addr + ' does not contain a port number');
  }

  if (addr[0].length !== 16) {
    throw new Error('failed to parse onion addr: ' + addr[0] + ' not a Tor onion address.');
  }

  const buf = Buffer.from(base32.decode.asBytes(addr[0].toUpperCase())); // onion port number

  const port = parseInt(addr[1], 10);

  if (port < 1 || port > 65536) {
    throw new Error('Port number is not in range(1, 65536)');
  }

  const portBuf = port2buf(port);
  return Buffer.concat([buf, portBuf]);
}

function onion32buf(str) {
  const addr = str.split(':');

  if (addr.length !== 2) {
    throw new Error('failed to parse onion addr: ' + addr + ' does not contain a port number');
  }

  if (addr[0].length !== 56) {
    throw new Error('failed to parse onion addr: ' + addr[0] + ' not a Tor onion3 address.');
  }

  const buf = Buffer.from(base32.decode.asBytes(addr[0].toUpperCase())); // onion port number

  const port = parseInt(addr[1], 10);

  if (port < 1 || port > 65536) {
    throw new Error('Port number is not in range(1, 65536)');
  }

  const portBuf = port2buf(port);
  return Buffer.concat([buf, portBuf]);
}

function buf2onion(buf) {
  const addrBytes = buf.slice(0, buf.length - 2);
  const portBytes = buf.slice(buf.length - 2);
  const addr = base32.encode(addrBytes).toLowerCase();
  const port = buf2port(portBytes);
  return addr + ':' + port;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ip = exports;

var Buffer = __webpack_require__(0).Buffer;

var os = __webpack_require__(20);

ip.toBuffer = function (ip, buff, offset) {
  offset = ~~offset;
  var result;

  if (this.isV4Format(ip)) {
    result = buff || new Buffer(offset + 4);
    ip.split(/\./g).map(function (byte) {
      result[offset++] = parseInt(byte, 10) & 0xff;
    });
  } else if (this.isV6Format(ip)) {
    var sections = ip.split(':', 8);
    var i;

    for (i = 0; i < sections.length; i++) {
      var isv4 = this.isV4Format(sections[i]);
      var v4Buffer;

      if (isv4) {
        v4Buffer = this.toBuffer(sections[i]);
        sections[i] = v4Buffer.slice(0, 2).toString('hex');
      }

      if (v4Buffer && ++i < 8) {
        sections.splice(i, 0, v4Buffer.slice(2, 4).toString('hex'));
      }
    }

    if (sections[0] === '') {
      while (sections.length < 8) sections.unshift('0');
    } else if (sections[sections.length - 1] === '') {
      while (sections.length < 8) sections.push('0');
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ''; i++);

      var argv = [i, 1];

      for (i = 9 - sections.length; i > 0; i--) {
        argv.push('0');
      }

      sections.splice.apply(sections, argv);
    }

    result = buff || new Buffer(offset + 16);

    for (i = 0; i < sections.length; i++) {
      var word = parseInt(sections[i], 16);
      result[offset++] = word >> 8 & 0xff;
      result[offset++] = word & 0xff;
    }
  }

  if (!result) {
    throw Error('Invalid ip address: ' + ip);
  }

  return result;
};

ip.toString = function (buff, offset, length) {
  offset = ~~offset;
  length = length || buff.length - offset;
  var result = [];

  if (length === 4) {
    // IPv4
    for (var i = 0; i < length; i++) {
      result.push(buff[offset + i]);
    }

    result = result.join('.');
  } else if (length === 16) {
    // IPv6
    for (var i = 0; i < length; i += 2) {
      result.push(buff.readUInt16BE(offset + i).toString(16));
    }

    result = result.join(':');
    result = result.replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3');
    result = result.replace(/:{3,4}/, '::');
  }

  return result;
};

var ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
var ipv6Regex = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;

ip.isV4Format = function (ip) {
  return ipv4Regex.test(ip);
};

ip.isV6Format = function (ip) {
  return ipv6Regex.test(ip);
};

function _normalizeFamily(family) {
  return family ? family.toLowerCase() : 'ipv4';
}

ip.fromPrefixLen = function (prefixlen, family) {
  if (prefixlen > 32) {
    family = 'ipv6';
  } else {
    family = _normalizeFamily(family);
  }

  var len = 4;

  if (family === 'ipv6') {
    len = 16;
  }

  var buff = new Buffer(len);

  for (var i = 0, n = buff.length; i < n; ++i) {
    var bits = 8;

    if (prefixlen < 8) {
      bits = prefixlen;
    }

    prefixlen -= bits;
    buff[i] = ~(0xff >> bits) & 0xff;
  }

  return ip.toString(buff);
};

ip.mask = function (addr, mask) {
  addr = ip.toBuffer(addr);
  mask = ip.toBuffer(mask);
  var result = new Buffer(Math.max(addr.length, mask.length));
  var i = 0; // Same protocol - do bitwise and

  if (addr.length === mask.length) {
    for (i = 0; i < addr.length; i++) {
      result[i] = addr[i] & mask[i];
    }
  } else if (mask.length === 4) {
    // IPv6 address and IPv4 mask
    // (Mask low bits)
    for (i = 0; i < mask.length; i++) {
      result[i] = addr[addr.length - 4 + i] & mask[i];
    }
  } else {
    // IPv6 mask and IPv4 addr
    for (var i = 0; i < result.length - 6; i++) {
      result[i] = 0;
    } // ::ffff:ipv4


    result[10] = 0xff;
    result[11] = 0xff;

    for (i = 0; i < addr.length; i++) {
      result[i + 12] = addr[i] & mask[i + 12];
    }

    i = i + 12;
  }

  for (; i < result.length; i++) result[i] = 0;

  return ip.toString(result);
};

ip.cidr = function (cidrString) {
  var cidrParts = cidrString.split('/');
  var addr = cidrParts[0];
  if (cidrParts.length !== 2) throw new Error('invalid CIDR subnet: ' + addr);
  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));
  return ip.mask(addr, mask);
};

ip.subnet = function (addr, mask) {
  var networkAddress = ip.toLong(ip.mask(addr, mask)); // Calculate the mask's length.

  var maskBuffer = ip.toBuffer(mask);
  var maskLength = 0;

  for (var i = 0; i < maskBuffer.length; i++) {
    if (maskBuffer[i] === 0xff) {
      maskLength += 8;
    } else {
      var octet = maskBuffer[i] & 0xff;

      while (octet) {
        octet = octet << 1 & 0xff;
        maskLength++;
      }
    }
  }

  var numberOfAddresses = Math.pow(2, 32 - maskLength);
  return {
    networkAddress: ip.fromLong(networkAddress),
    firstAddress: numberOfAddresses <= 2 ? ip.fromLong(networkAddress) : ip.fromLong(networkAddress + 1),
    lastAddress: numberOfAddresses <= 2 ? ip.fromLong(networkAddress + numberOfAddresses - 1) : ip.fromLong(networkAddress + numberOfAddresses - 2),
    broadcastAddress: ip.fromLong(networkAddress + numberOfAddresses - 1),
    subnetMask: mask,
    subnetMaskLength: maskLength,
    numHosts: numberOfAddresses <= 2 ? numberOfAddresses : numberOfAddresses - 2,
    length: numberOfAddresses,
    contains: function contains(other) {
      return networkAddress === ip.toLong(ip.mask(other, mask));
    }
  };
};

ip.cidrSubnet = function (cidrString) {
  var cidrParts = cidrString.split('/');
  var addr = cidrParts[0];
  if (cidrParts.length !== 2) throw new Error('invalid CIDR subnet: ' + addr);
  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));
  return ip.subnet(addr, mask);
};

ip.not = function (addr) {
  var buff = ip.toBuffer(addr);

  for (var i = 0; i < buff.length; i++) {
    buff[i] = 0xff ^ buff[i];
  }

  return ip.toString(buff);
};

ip.or = function (a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b); // same protocol

  if (a.length === b.length) {
    for (var i = 0; i < a.length; ++i) {
      a[i] |= b[i];
    }

    return ip.toString(a); // mixed protocols
  } else {
    var buff = a;
    var other = b;

    if (b.length > a.length) {
      buff = b;
      other = a;
    }

    var offset = buff.length - other.length;

    for (var i = offset; i < buff.length; ++i) {
      buff[i] |= other[i - offset];
    }

    return ip.toString(buff);
  }
};

ip.isEqual = function (a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b); // Same protocol

  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  } // Swap


  if (b.length === 4) {
    var t = b;
    b = a;
    a = t;
  } // a - IPv4, b - IPv6


  for (var i = 0; i < 10; i++) {
    if (b[i] !== 0) return false;
  }

  var word = b.readUInt16BE(10);
  if (word !== 0 && word !== 0xffff) return false;

  for (var i = 0; i < 4; i++) {
    if (a[i] !== b[i + 12]) return false;
  }

  return true;
};

ip.isPrivate = function (addr) {
  return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^f[cd][0-9a-f]{2}:/i.test(addr) || /^fe80:/i.test(addr) || /^::1$/.test(addr) || /^::$/.test(addr);
};

ip.isPublic = function (addr) {
  return !ip.isPrivate(addr);
};

ip.isLoopback = function (addr) {
  return /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.test(addr) || /^fe80::1$/.test(addr) || /^::1$/.test(addr) || /^::$/.test(addr);
};

ip.loopback = function (family) {
  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  if (family !== 'ipv4' && family !== 'ipv6') {
    throw new Error('family must be ipv4 or ipv6');
  }

  return family === 'ipv4' ? '127.0.0.1' : 'fe80::1';
}; //
// ### function address (name, family)
// #### @name {string|'public'|'private'} **Optional** Name or security
//      of the network interface.
// #### @family {ipv4|ipv6} **Optional** IP family of the address (defaults
//      to ipv4).
//
// Returns the address for the network interface on the current system with
// the specified `name`:
//   * String: First `family` address of the interface.
//             If not found see `undefined`.
//   * 'public': the first public ip address of family.
//   * 'private': the first private ip address of family.
//   * undefined: First address with `ipv4` or loopback address `127.0.0.1`.
//


ip.address = function (name, family) {
  var interfaces = os.networkInterfaces();
  var all; //
  // Default to `ipv4`
  //

  family = _normalizeFamily(family); //
  // If a specific network interface has been named,
  // return the address.
  //

  if (name && name !== 'private' && name !== 'public') {
    var res = interfaces[name].filter(function (details) {
      var itemFamily = details.family.toLowerCase();
      return itemFamily === family;
    });
    if (res.length === 0) return undefined;
    return res[0].address;
  }

  var all = Object.keys(interfaces).map(function (nic) {
    //
    // Note: name will only be `public` or `private`
    // when this is called.
    //
    var addresses = interfaces[nic].filter(function (details) {
      details.family = details.family.toLowerCase();

      if (details.family !== family || ip.isLoopback(details.address)) {
        return false;
      } else if (!name) {
        return true;
      }

      return name === 'public' ? ip.isPrivate(details.address) : ip.isPublic(details.address);
    });
    return addresses.length ? addresses[0].address : undefined;
  }).filter(Boolean);
  return !all.length ? ip.loopback(family) : all[0];
};

ip.toLong = function (ip) {
  var ipl = 0;
  ip.split('.').forEach(function (octet) {
    ipl <<= 8;
    ipl += parseInt(octet);
  });
  return ipl >>> 0;
};

ip.fromLong = function (ipl) {
  return (ipl >>> 24) + '.' + (ipl >> 16 & 255) + '.' + (ipl >> 8 & 255) + '.' + (ipl & 255);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.endianness = function () {
  return 'LE';
};

exports.hostname = function () {
  if (typeof location !== 'undefined') {
    return location.hostname;
  } else return '';
};

exports.loadavg = function () {
  return [];
};

exports.uptime = function () {
  return 0;
};

exports.freemem = function () {
  return Number.MAX_VALUE;
};

exports.totalmem = function () {
  return Number.MAX_VALUE;
};

exports.cpus = function () {
  return [];
};

exports.type = function () {
  return 'Browser';
};

exports.release = function () {
  if (typeof navigator !== 'undefined') {
    return navigator.appVersion;
  }

  return '';
};

exports.networkInterfaces = exports.getNetworkInterfaces = function () {
  return {};
};

exports.arch = function () {
  return 'javascript';
};

exports.platform = function () {
  return 'browser';
};

exports.tmpdir = exports.tmpDir = function () {
  return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
  return '/';
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ipRegex = __webpack_require__(22);

const isIp = string => ipRegex({
  exact: true
}).test(string);

isIp.v4 = string => ipRegex.v4({
  exact: true
}).test(string);

isIp.v6 = string => ipRegex.v6({
  exact: true
}).test(string);

isIp.version = string => isIp(string) ? isIp.v4(string) ? 4 : 6 : undefined;

module.exports = isIp;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const word = '[a-fA-F\\d:]';

const b = options => options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=".concat(word, ")|(?<=").concat(word, ")(?=\\s|$))") : '';

const v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';
const v6seg = '[a-fA-F\\d]{1,4}';
const v6 = "\n(\n(?:".concat(v6seg, ":){7}(?:").concat(v6seg, "|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:").concat(v6seg, ":){6}(?:").concat(v4, "|:").concat(v6seg, "|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:").concat(v6seg, ":){5}(?::").concat(v4, "|(:").concat(v6seg, "){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:").concat(v6seg, ":){4}(?:(:").concat(v6seg, "){0,1}:").concat(v4, "|(:").concat(v6seg, "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:").concat(v6seg, ":){3}(?:(:").concat(v6seg, "){0,2}:").concat(v4, "|(:").concat(v6seg, "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:").concat(v6seg, ":){2}(?:(:").concat(v6seg, "){0,3}:").concat(v4, "|(:").concat(v6seg, "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:").concat(v6seg, ":){1}(?:(:").concat(v6seg, "){0,4}:").concat(v4, "|(:").concat(v6seg, "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::((?::").concat(v6seg, "){0,5}:").concat(v4, "|(?::").concat(v6seg, "){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n").replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

const ip = options => options && options.exact ? new RegExp("(?:^".concat(v4, "$)|(?:^").concat(v6, "$)")) : new RegExp("(?:".concat(b(options)).concat(v4).concat(b(options), ")|(?:").concat(b(options)).concat(v6).concat(b(options), ")"), 'g');

ip.v4 = options => options && options.exact ? new RegExp("^".concat(v4, "$")) : new RegExp("".concat(b(options)).concat(v4).concat(b(options)), 'g');

ip.v6 = options => options && options.exact ? new RegExp("^".concat(v6, "$")) : new RegExp("".concat(b(options)).concat(v6).concat(b(options)), 'g');

module.exports = ip;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
// @ts-ignore

var _Buffer = __webpack_require__(6).Buffer;

function base(ALPHABET) {
  if (ALPHABET.length >= 255) {
    throw new TypeError('Alphabet too long');
  }

  var BASE_MAP = new Uint8Array(256);
  BASE_MAP.fill(255);

  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);

    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + ' is ambiguous');
    }

    BASE_MAP[xc] = i;
  }

  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up

  var iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up

  function encode(source) {
    if (!_Buffer.isBuffer(source)) {
      throw new TypeError('Expected Buffer');
    }

    if (source.length === 0) {
      return '';
    } // Skip & count leading zeroes.


    var zeroes = 0;
    var length = 0;
    var pbegin = 0;
    var pend = source.length;

    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    } // Allocate enough space in big-endian base58 representation.


    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size); // Process the bytes.

    while (pbegin !== pend) {
      var carry = source[pbegin]; // Apply "b58 = b58 * 256 + ch".

      var i = 0;

      for (var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }

      if (carry !== 0) {
        throw new Error('Non-zero carry');
      }

      length = i;
      pbegin++;
    } // Skip leading zeroes in base58 result.


    var it2 = size - length;

    while (it2 !== size && b58[it2] === 0) {
      it2++;
    } // Translate the result into a string.


    var str = LEADER.repeat(zeroes);

    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }

    return str;
  }

  function decodeUnsafe(source) {
    if (typeof source !== 'string') {
      throw new TypeError('Expected String');
    }

    if (source.length === 0) {
      return _Buffer.alloc(0);
    }

    var psz = 0; // Skip leading spaces.

    if (source[psz] === ' ') {
      return;
    } // Skip and count leading '1's.


    var zeroes = 0;
    var length = 0;

    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    } // Allocate enough space in big-endian base256 representation.


    var size = (source.length - psz) * FACTOR + 1 >>> 0; // log(58) / log(256), rounded up.

    var b256 = new Uint8Array(size); // Process the characters.

    while (source[psz]) {
      // Decode character
      var carry = BASE_MAP[source.charCodeAt(psz)]; // Invalid character

      if (carry === 255) {
        return;
      }

      var i = 0;

      for (var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }

      if (carry !== 0) {
        throw new Error('Non-zero carry');
      }

      length = i;
      psz++;
    } // Skip trailing spaces.


    if (source[psz] === ' ') {
      return;
    } // Skip leading zeroes in b256.


    var it4 = size - length;

    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }

    var vch = _Buffer.allocUnsafe(zeroes + (size - it4));

    vch.fill(0x00, 0, zeroes);
    var j = zeroes;

    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }

    return vch;
  }

  function decode(string) {
    var buffer = decodeUnsafe(string);

    if (buffer) {
      return buffer;
    }

    throw new Error('Non-base' + BASE + ' character');
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  };
}

module.exports = base;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint quote-props: off */

/* eslint key-spacing: off */


exports.names = Object.freeze({
  'identity': 0x0,
  'sha1': 0x11,
  'sha2-256': 0x12,
  'sha2-512': 0x13,
  'dbl-sha2-256': 0x56,
  'sha3-224': 0x17,
  'sha3-256': 0x16,
  'sha3-384': 0x15,
  'sha3-512': 0x14,
  'shake-128': 0x18,
  'shake-256': 0x19,
  'keccak-224': 0x1A,
  'keccak-256': 0x1B,
  'keccak-384': 0x1C,
  'keccak-512': 0x1D,
  'murmur3-128': 0x22,
  'murmur3-32': 0x23,
  'blake2b-8': 0xb201,
  'blake2b-16': 0xb202,
  'blake2b-24': 0xb203,
  'blake2b-32': 0xb204,
  'blake2b-40': 0xb205,
  'blake2b-48': 0xb206,
  'blake2b-56': 0xb207,
  'blake2b-64': 0xb208,
  'blake2b-72': 0xb209,
  'blake2b-80': 0xb20a,
  'blake2b-88': 0xb20b,
  'blake2b-96': 0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8': 0xb241,
  'blake2s-16': 0xb242,
  'blake2s-24': 0xb243,
  'blake2s-32': 0xb244,
  'blake2s-40': 0xb245,
  'blake2s-48': 0xb246,
  'blake2s-56': 0xb247,
  'blake2s-64': 0xb248,
  'blake2s-72': 0xb249,
  'blake2s-80': 0xb24a,
  'blake2s-88': 0xb24b,
  'blake2s-96': 0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'Skein256-8': 0xb301,
  'Skein256-16': 0xb302,
  'Skein256-24': 0xb303,
  'Skein256-32': 0xb304,
  'Skein256-40': 0xb305,
  'Skein256-48': 0xb306,
  'Skein256-56': 0xb307,
  'Skein256-64': 0xb308,
  'Skein256-72': 0xb309,
  'Skein256-80': 0xb30a,
  'Skein256-88': 0xb30b,
  'Skein256-96': 0xb30c,
  'Skein256-104': 0xb30d,
  'Skein256-112': 0xb30e,
  'Skein256-120': 0xb30f,
  'Skein256-128': 0xb310,
  'Skein256-136': 0xb311,
  'Skein256-144': 0xb312,
  'Skein256-152': 0xb313,
  'Skein256-160': 0xb314,
  'Skein256-168': 0xb315,
  'Skein256-176': 0xb316,
  'Skein256-184': 0xb317,
  'Skein256-192': 0xb318,
  'Skein256-200': 0xb319,
  'Skein256-208': 0xb31a,
  'Skein256-216': 0xb31b,
  'Skein256-224': 0xb31c,
  'Skein256-232': 0xb31d,
  'Skein256-240': 0xb31e,
  'Skein256-248': 0xb31f,
  'Skein256-256': 0xb320,
  'Skein512-8': 0xb321,
  'Skein512-16': 0xb322,
  'Skein512-24': 0xb323,
  'Skein512-32': 0xb324,
  'Skein512-40': 0xb325,
  'Skein512-48': 0xb326,
  'Skein512-56': 0xb327,
  'Skein512-64': 0xb328,
  'Skein512-72': 0xb329,
  'Skein512-80': 0xb32a,
  'Skein512-88': 0xb32b,
  'Skein512-96': 0xb32c,
  'Skein512-104': 0xb32d,
  'Skein512-112': 0xb32e,
  'Skein512-120': 0xb32f,
  'Skein512-128': 0xb330,
  'Skein512-136': 0xb331,
  'Skein512-144': 0xb332,
  'Skein512-152': 0xb333,
  'Skein512-160': 0xb334,
  'Skein512-168': 0xb335,
  'Skein512-176': 0xb336,
  'Skein512-184': 0xb337,
  'Skein512-192': 0xb338,
  'Skein512-200': 0xb339,
  'Skein512-208': 0xb33a,
  'Skein512-216': 0xb33b,
  'Skein512-224': 0xb33c,
  'Skein512-232': 0xb33d,
  'Skein512-240': 0xb33e,
  'Skein512-248': 0xb33f,
  'Skein512-256': 0xb340,
  'Skein512-264': 0xb341,
  'Skein512-272': 0xb342,
  'Skein512-280': 0xb343,
  'Skein512-288': 0xb344,
  'Skein512-296': 0xb345,
  'Skein512-304': 0xb346,
  'Skein512-312': 0xb347,
  'Skein512-320': 0xb348,
  'Skein512-328': 0xb349,
  'Skein512-336': 0xb34a,
  'Skein512-344': 0xb34b,
  'Skein512-352': 0xb34c,
  'Skein512-360': 0xb34d,
  'Skein512-368': 0xb34e,
  'Skein512-376': 0xb34f,
  'Skein512-384': 0xb350,
  'Skein512-392': 0xb351,
  'Skein512-400': 0xb352,
  'Skein512-408': 0xb353,
  'Skein512-416': 0xb354,
  'Skein512-424': 0xb355,
  'Skein512-432': 0xb356,
  'Skein512-440': 0xb357,
  'Skein512-448': 0xb358,
  'Skein512-456': 0xb359,
  'Skein512-464': 0xb35a,
  'Skein512-472': 0xb35b,
  'Skein512-480': 0xb35c,
  'Skein512-488': 0xb35d,
  'Skein512-496': 0xb35e,
  'Skein512-504': 0xb35f,
  'Skein512-512': 0xb360,
  'Skein1024-8': 0xb361,
  'Skein1024-16': 0xb362,
  'Skein1024-24': 0xb363,
  'Skein1024-32': 0xb364,
  'Skein1024-40': 0xb365,
  'Skein1024-48': 0xb366,
  'Skein1024-56': 0xb367,
  'Skein1024-64': 0xb368,
  'Skein1024-72': 0xb369,
  'Skein1024-80': 0xb36a,
  'Skein1024-88': 0xb36b,
  'Skein1024-96': 0xb36c,
  'Skein1024-104': 0xb36d,
  'Skein1024-112': 0xb36e,
  'Skein1024-120': 0xb36f,
  'Skein1024-128': 0xb370,
  'Skein1024-136': 0xb371,
  'Skein1024-144': 0xb372,
  'Skein1024-152': 0xb373,
  'Skein1024-160': 0xb374,
  'Skein1024-168': 0xb375,
  'Skein1024-176': 0xb376,
  'Skein1024-184': 0xb377,
  'Skein1024-192': 0xb378,
  'Skein1024-200': 0xb379,
  'Skein1024-208': 0xb37a,
  'Skein1024-216': 0xb37b,
  'Skein1024-224': 0xb37c,
  'Skein1024-232': 0xb37d,
  'Skein1024-240': 0xb37e,
  'Skein1024-248': 0xb37f,
  'Skein1024-256': 0xb380,
  'Skein1024-264': 0xb381,
  'Skein1024-272': 0xb382,
  'Skein1024-280': 0xb383,
  'Skein1024-288': 0xb384,
  'Skein1024-296': 0xb385,
  'Skein1024-304': 0xb386,
  'Skein1024-312': 0xb387,
  'Skein1024-320': 0xb388,
  'Skein1024-328': 0xb389,
  'Skein1024-336': 0xb38a,
  'Skein1024-344': 0xb38b,
  'Skein1024-352': 0xb38c,
  'Skein1024-360': 0xb38d,
  'Skein1024-368': 0xb38e,
  'Skein1024-376': 0xb38f,
  'Skein1024-384': 0xb390,
  'Skein1024-392': 0xb391,
  'Skein1024-400': 0xb392,
  'Skein1024-408': 0xb393,
  'Skein1024-416': 0xb394,
  'Skein1024-424': 0xb395,
  'Skein1024-432': 0xb396,
  'Skein1024-440': 0xb397,
  'Skein1024-448': 0xb398,
  'Skein1024-456': 0xb399,
  'Skein1024-464': 0xb39a,
  'Skein1024-472': 0xb39b,
  'Skein1024-480': 0xb39c,
  'Skein1024-488': 0xb39d,
  'Skein1024-496': 0xb39e,
  'Skein1024-504': 0xb39f,
  'Skein1024-512': 0xb3a0,
  'Skein1024-520': 0xb3a1,
  'Skein1024-528': 0xb3a2,
  'Skein1024-536': 0xb3a3,
  'Skein1024-544': 0xb3a4,
  'Skein1024-552': 0xb3a5,
  'Skein1024-560': 0xb3a6,
  'Skein1024-568': 0xb3a7,
  'Skein1024-576': 0xb3a8,
  'Skein1024-584': 0xb3a9,
  'Skein1024-592': 0xb3aa,
  'Skein1024-600': 0xb3ab,
  'Skein1024-608': 0xb3ac,
  'Skein1024-616': 0xb3ad,
  'Skein1024-624': 0xb3ae,
  'Skein1024-632': 0xb3af,
  'Skein1024-640': 0xb3b0,
  'Skein1024-648': 0xb3b1,
  'Skein1024-656': 0xb3b2,
  'Skein1024-664': 0xb3b3,
  'Skein1024-672': 0xb3b4,
  'Skein1024-680': 0xb3b5,
  'Skein1024-688': 0xb3b6,
  'Skein1024-696': 0xb3b7,
  'Skein1024-704': 0xb3b8,
  'Skein1024-712': 0xb3b9,
  'Skein1024-720': 0xb3ba,
  'Skein1024-728': 0xb3bb,
  'Skein1024-736': 0xb3bc,
  'Skein1024-744': 0xb3bd,
  'Skein1024-752': 0xb3be,
  'Skein1024-760': 0xb3bf,
  'Skein1024-768': 0xb3c0,
  'Skein1024-776': 0xb3c1,
  'Skein1024-784': 0xb3c2,
  'Skein1024-792': 0xb3c3,
  'Skein1024-800': 0xb3c4,
  'Skein1024-808': 0xb3c5,
  'Skein1024-816': 0xb3c6,
  'Skein1024-824': 0xb3c7,
  'Skein1024-832': 0xb3c8,
  'Skein1024-840': 0xb3c9,
  'Skein1024-848': 0xb3ca,
  'Skein1024-856': 0xb3cb,
  'Skein1024-864': 0xb3cc,
  'Skein1024-872': 0xb3cd,
  'Skein1024-880': 0xb3ce,
  'Skein1024-888': 0xb3cf,
  'Skein1024-896': 0xb3d0,
  'Skein1024-904': 0xb3d1,
  'Skein1024-912': 0xb3d2,
  'Skein1024-920': 0xb3d3,
  'Skein1024-928': 0xb3d4,
  'Skein1024-936': 0xb3d5,
  'Skein1024-944': 0xb3d6,
  'Skein1024-952': 0xb3d7,
  'Skein1024-960': 0xb3d8,
  'Skein1024-968': 0xb3d9,
  'Skein1024-976': 0xb3da,
  'Skein1024-984': 0xb3db,
  'Skein1024-992': 0xb3dc,
  'Skein1024-1000': 0xb3dd,
  'Skein1024-1008': 0xb3de,
  'Skein1024-1016': 0xb3df,
  'Skein1024-1024': 0xb3e0
});
exports.codes = Object.freeze({
  0x0: 'identity',
  // sha family
  0x11: 'sha1',
  0x12: 'sha2-256',
  0x13: 'sha2-512',
  0x56: 'dbl-sha2-256',
  0x17: 'sha3-224',
  0x16: 'sha3-256',
  0x15: 'sha3-384',
  0x14: 'sha3-512',
  0x18: 'shake-128',
  0x19: 'shake-256',
  0x1A: 'keccak-224',
  0x1B: 'keccak-256',
  0x1C: 'keccak-384',
  0x1D: 'keccak-512',
  0x22: 'murmur3-128',
  0x23: 'murmur3-32',
  // blake2
  0xb201: 'blake2b-8',
  0xb202: 'blake2b-16',
  0xb203: 'blake2b-24',
  0xb204: 'blake2b-32',
  0xb205: 'blake2b-40',
  0xb206: 'blake2b-48',
  0xb207: 'blake2b-56',
  0xb208: 'blake2b-64',
  0xb209: 'blake2b-72',
  0xb20a: 'blake2b-80',
  0xb20b: 'blake2b-88',
  0xb20c: 'blake2b-96',
  0xb20d: 'blake2b-104',
  0xb20e: 'blake2b-112',
  0xb20f: 'blake2b-120',
  0xb210: 'blake2b-128',
  0xb211: 'blake2b-136',
  0xb212: 'blake2b-144',
  0xb213: 'blake2b-152',
  0xb214: 'blake2b-160',
  0xb215: 'blake2b-168',
  0xb216: 'blake2b-176',
  0xb217: 'blake2b-184',
  0xb218: 'blake2b-192',
  0xb219: 'blake2b-200',
  0xb21a: 'blake2b-208',
  0xb21b: 'blake2b-216',
  0xb21c: 'blake2b-224',
  0xb21d: 'blake2b-232',
  0xb21e: 'blake2b-240',
  0xb21f: 'blake2b-248',
  0xb220: 'blake2b-256',
  0xb221: 'blake2b-264',
  0xb222: 'blake2b-272',
  0xb223: 'blake2b-280',
  0xb224: 'blake2b-288',
  0xb225: 'blake2b-296',
  0xb226: 'blake2b-304',
  0xb227: 'blake2b-312',
  0xb228: 'blake2b-320',
  0xb229: 'blake2b-328',
  0xb22a: 'blake2b-336',
  0xb22b: 'blake2b-344',
  0xb22c: 'blake2b-352',
  0xb22d: 'blake2b-360',
  0xb22e: 'blake2b-368',
  0xb22f: 'blake2b-376',
  0xb230: 'blake2b-384',
  0xb231: 'blake2b-392',
  0xb232: 'blake2b-400',
  0xb233: 'blake2b-408',
  0xb234: 'blake2b-416',
  0xb235: 'blake2b-424',
  0xb236: 'blake2b-432',
  0xb237: 'blake2b-440',
  0xb238: 'blake2b-448',
  0xb239: 'blake2b-456',
  0xb23a: 'blake2b-464',
  0xb23b: 'blake2b-472',
  0xb23c: 'blake2b-480',
  0xb23d: 'blake2b-488',
  0xb23e: 'blake2b-496',
  0xb23f: 'blake2b-504',
  0xb240: 'blake2b-512',
  0xb241: 'blake2s-8',
  0xb242: 'blake2s-16',
  0xb243: 'blake2s-24',
  0xb244: 'blake2s-32',
  0xb245: 'blake2s-40',
  0xb246: 'blake2s-48',
  0xb247: 'blake2s-56',
  0xb248: 'blake2s-64',
  0xb249: 'blake2s-72',
  0xb24a: 'blake2s-80',
  0xb24b: 'blake2s-88',
  0xb24c: 'blake2s-96',
  0xb24d: 'blake2s-104',
  0xb24e: 'blake2s-112',
  0xb24f: 'blake2s-120',
  0xb250: 'blake2s-128',
  0xb251: 'blake2s-136',
  0xb252: 'blake2s-144',
  0xb253: 'blake2s-152',
  0xb254: 'blake2s-160',
  0xb255: 'blake2s-168',
  0xb256: 'blake2s-176',
  0xb257: 'blake2s-184',
  0xb258: 'blake2s-192',
  0xb259: 'blake2s-200',
  0xb25a: 'blake2s-208',
  0xb25b: 'blake2s-216',
  0xb25c: 'blake2s-224',
  0xb25d: 'blake2s-232',
  0xb25e: 'blake2s-240',
  0xb25f: 'blake2s-248',
  0xb260: 'blake2s-256',
  // skein
  0xb301: 'Skein256-8',
  0xb302: 'Skein256-16',
  0xb303: 'Skein256-24',
  0xb304: 'Skein256-32',
  0xb305: 'Skein256-40',
  0xb306: 'Skein256-48',
  0xb307: 'Skein256-56',
  0xb308: 'Skein256-64',
  0xb309: 'Skein256-72',
  0xb30a: 'Skein256-80',
  0xb30b: 'Skein256-88',
  0xb30c: 'Skein256-96',
  0xb30d: 'Skein256-104',
  0xb30e: 'Skein256-112',
  0xb30f: 'Skein256-120',
  0xb310: 'Skein256-128',
  0xb311: 'Skein256-136',
  0xb312: 'Skein256-144',
  0xb313: 'Skein256-152',
  0xb314: 'Skein256-160',
  0xb315: 'Skein256-168',
  0xb316: 'Skein256-176',
  0xb317: 'Skein256-184',
  0xb318: 'Skein256-192',
  0xb319: 'Skein256-200',
  0xb31a: 'Skein256-208',
  0xb31b: 'Skein256-216',
  0xb31c: 'Skein256-224',
  0xb31d: 'Skein256-232',
  0xb31e: 'Skein256-240',
  0xb31f: 'Skein256-248',
  0xb320: 'Skein256-256',
  0xb321: 'Skein512-8',
  0xb322: 'Skein512-16',
  0xb323: 'Skein512-24',
  0xb324: 'Skein512-32',
  0xb325: 'Skein512-40',
  0xb326: 'Skein512-48',
  0xb327: 'Skein512-56',
  0xb328: 'Skein512-64',
  0xb329: 'Skein512-72',
  0xb32a: 'Skein512-80',
  0xb32b: 'Skein512-88',
  0xb32c: 'Skein512-96',
  0xb32d: 'Skein512-104',
  0xb32e: 'Skein512-112',
  0xb32f: 'Skein512-120',
  0xb330: 'Skein512-128',
  0xb331: 'Skein512-136',
  0xb332: 'Skein512-144',
  0xb333: 'Skein512-152',
  0xb334: 'Skein512-160',
  0xb335: 'Skein512-168',
  0xb336: 'Skein512-176',
  0xb337: 'Skein512-184',
  0xb338: 'Skein512-192',
  0xb339: 'Skein512-200',
  0xb33a: 'Skein512-208',
  0xb33b: 'Skein512-216',
  0xb33c: 'Skein512-224',
  0xb33d: 'Skein512-232',
  0xb33e: 'Skein512-240',
  0xb33f: 'Skein512-248',
  0xb340: 'Skein512-256',
  0xb341: 'Skein512-264',
  0xb342: 'Skein512-272',
  0xb343: 'Skein512-280',
  0xb344: 'Skein512-288',
  0xb345: 'Skein512-296',
  0xb346: 'Skein512-304',
  0xb347: 'Skein512-312',
  0xb348: 'Skein512-320',
  0xb349: 'Skein512-328',
  0xb34a: 'Skein512-336',
  0xb34b: 'Skein512-344',
  0xb34c: 'Skein512-352',
  0xb34d: 'Skein512-360',
  0xb34e: 'Skein512-368',
  0xb34f: 'Skein512-376',
  0xb350: 'Skein512-384',
  0xb351: 'Skein512-392',
  0xb352: 'Skein512-400',
  0xb353: 'Skein512-408',
  0xb354: 'Skein512-416',
  0xb355: 'Skein512-424',
  0xb356: 'Skein512-432',
  0xb357: 'Skein512-440',
  0xb358: 'Skein512-448',
  0xb359: 'Skein512-456',
  0xb35a: 'Skein512-464',
  0xb35b: 'Skein512-472',
  0xb35c: 'Skein512-480',
  0xb35d: 'Skein512-488',
  0xb35e: 'Skein512-496',
  0xb35f: 'Skein512-504',
  0xb360: 'Skein512-512',
  0xb361: 'Skein1024-8',
  0xb362: 'Skein1024-16',
  0xb363: 'Skein1024-24',
  0xb364: 'Skein1024-32',
  0xb365: 'Skein1024-40',
  0xb366: 'Skein1024-48',
  0xb367: 'Skein1024-56',
  0xb368: 'Skein1024-64',
  0xb369: 'Skein1024-72',
  0xb36a: 'Skein1024-80',
  0xb36b: 'Skein1024-88',
  0xb36c: 'Skein1024-96',
  0xb36d: 'Skein1024-104',
  0xb36e: 'Skein1024-112',
  0xb36f: 'Skein1024-120',
  0xb370: 'Skein1024-128',
  0xb371: 'Skein1024-136',
  0xb372: 'Skein1024-144',
  0xb373: 'Skein1024-152',
  0xb374: 'Skein1024-160',
  0xb375: 'Skein1024-168',
  0xb376: 'Skein1024-176',
  0xb377: 'Skein1024-184',
  0xb378: 'Skein1024-192',
  0xb379: 'Skein1024-200',
  0xb37a: 'Skein1024-208',
  0xb37b: 'Skein1024-216',
  0xb37c: 'Skein1024-224',
  0xb37d: 'Skein1024-232',
  0xb37e: 'Skein1024-240',
  0xb37f: 'Skein1024-248',
  0xb380: 'Skein1024-256',
  0xb381: 'Skein1024-264',
  0xb382: 'Skein1024-272',
  0xb383: 'Skein1024-280',
  0xb384: 'Skein1024-288',
  0xb385: 'Skein1024-296',
  0xb386: 'Skein1024-304',
  0xb387: 'Skein1024-312',
  0xb388: 'Skein1024-320',
  0xb389: 'Skein1024-328',
  0xb38a: 'Skein1024-336',
  0xb38b: 'Skein1024-344',
  0xb38c: 'Skein1024-352',
  0xb38d: 'Skein1024-360',
  0xb38e: 'Skein1024-368',
  0xb38f: 'Skein1024-376',
  0xb390: 'Skein1024-384',
  0xb391: 'Skein1024-392',
  0xb392: 'Skein1024-400',
  0xb393: 'Skein1024-408',
  0xb394: 'Skein1024-416',
  0xb395: 'Skein1024-424',
  0xb396: 'Skein1024-432',
  0xb397: 'Skein1024-440',
  0xb398: 'Skein1024-448',
  0xb399: 'Skein1024-456',
  0xb39a: 'Skein1024-464',
  0xb39b: 'Skein1024-472',
  0xb39c: 'Skein1024-480',
  0xb39d: 'Skein1024-488',
  0xb39e: 'Skein1024-496',
  0xb39f: 'Skein1024-504',
  0xb3a0: 'Skein1024-512',
  0xb3a1: 'Skein1024-520',
  0xb3a2: 'Skein1024-528',
  0xb3a3: 'Skein1024-536',
  0xb3a4: 'Skein1024-544',
  0xb3a5: 'Skein1024-552',
  0xb3a6: 'Skein1024-560',
  0xb3a7: 'Skein1024-568',
  0xb3a8: 'Skein1024-576',
  0xb3a9: 'Skein1024-584',
  0xb3aa: 'Skein1024-592',
  0xb3ab: 'Skein1024-600',
  0xb3ac: 'Skein1024-608',
  0xb3ad: 'Skein1024-616',
  0xb3ae: 'Skein1024-624',
  0xb3af: 'Skein1024-632',
  0xb3b0: 'Skein1024-640',
  0xb3b1: 'Skein1024-648',
  0xb3b2: 'Skein1024-656',
  0xb3b3: 'Skein1024-664',
  0xb3b4: 'Skein1024-672',
  0xb3b5: 'Skein1024-680',
  0xb3b6: 'Skein1024-688',
  0xb3b7: 'Skein1024-696',
  0xb3b8: 'Skein1024-704',
  0xb3b9: 'Skein1024-712',
  0xb3ba: 'Skein1024-720',
  0xb3bb: 'Skein1024-728',
  0xb3bc: 'Skein1024-736',
  0xb3bd: 'Skein1024-744',
  0xb3be: 'Skein1024-752',
  0xb3bf: 'Skein1024-760',
  0xb3c0: 'Skein1024-768',
  0xb3c1: 'Skein1024-776',
  0xb3c2: 'Skein1024-784',
  0xb3c3: 'Skein1024-792',
  0xb3c4: 'Skein1024-800',
  0xb3c5: 'Skein1024-808',
  0xb3c6: 'Skein1024-816',
  0xb3c7: 'Skein1024-824',
  0xb3c8: 'Skein1024-832',
  0xb3c9: 'Skein1024-840',
  0xb3ca: 'Skein1024-848',
  0xb3cb: 'Skein1024-856',
  0xb3cc: 'Skein1024-864',
  0xb3cd: 'Skein1024-872',
  0xb3ce: 'Skein1024-880',
  0xb3cf: 'Skein1024-888',
  0xb3d0: 'Skein1024-896',
  0xb3d1: 'Skein1024-904',
  0xb3d2: 'Skein1024-912',
  0xb3d3: 'Skein1024-920',
  0xb3d4: 'Skein1024-928',
  0xb3d5: 'Skein1024-936',
  0xb3d6: 'Skein1024-944',
  0xb3d7: 'Skein1024-952',
  0xb3d8: 'Skein1024-960',
  0xb3d9: 'Skein1024-968',
  0xb3da: 'Skein1024-976',
  0xb3db: 'Skein1024-984',
  0xb3dc: 'Skein1024-992',
  0xb3dd: 'Skein1024-1000',
  0xb3de: 'Skein1024-1008',
  0xb3df: 'Skein1024-1016',
  0xb3e0: 'Skein1024-1024'
});
exports.defaultLengths = Object.freeze({
  0x11: 20,
  0x12: 32,
  0x13: 64,
  0x56: 32,
  0x17: 28,
  0x16: 32,
  0x15: 48,
  0x14: 64,
  0x18: 32,
  0x19: 64,
  0x1A: 28,
  0x1B: 32,
  0x1C: 48,
  0x1D: 64,
  0x22: 32,
  0xb201: 0x01,
  0xb202: 0x02,
  0xb203: 0x03,
  0xb204: 0x04,
  0xb205: 0x05,
  0xb206: 0x06,
  0xb207: 0x07,
  0xb208: 0x08,
  0xb209: 0x09,
  0xb20a: 0x0a,
  0xb20b: 0x0b,
  0xb20c: 0x0c,
  0xb20d: 0x0d,
  0xb20e: 0x0e,
  0xb20f: 0x0f,
  0xb210: 0x10,
  0xb211: 0x11,
  0xb212: 0x12,
  0xb213: 0x13,
  0xb214: 0x14,
  0xb215: 0x15,
  0xb216: 0x16,
  0xb217: 0x17,
  0xb218: 0x18,
  0xb219: 0x19,
  0xb21a: 0x1a,
  0xb21b: 0x1b,
  0xb21c: 0x1c,
  0xb21d: 0x1d,
  0xb21e: 0x1e,
  0xb21f: 0x1f,
  0xb220: 0x20,
  0xb221: 0x21,
  0xb222: 0x22,
  0xb223: 0x23,
  0xb224: 0x24,
  0xb225: 0x25,
  0xb226: 0x26,
  0xb227: 0x27,
  0xb228: 0x28,
  0xb229: 0x29,
  0xb22a: 0x2a,
  0xb22b: 0x2b,
  0xb22c: 0x2c,
  0xb22d: 0x2d,
  0xb22e: 0x2e,
  0xb22f: 0x2f,
  0xb230: 0x30,
  0xb231: 0x31,
  0xb232: 0x32,
  0xb233: 0x33,
  0xb234: 0x34,
  0xb235: 0x35,
  0xb236: 0x36,
  0xb237: 0x37,
  0xb238: 0x38,
  0xb239: 0x39,
  0xb23a: 0x3a,
  0xb23b: 0x3b,
  0xb23c: 0x3c,
  0xb23d: 0x3d,
  0xb23e: 0x3e,
  0xb23f: 0x3f,
  0xb240: 0x40,
  0xb241: 0x01,
  0xb242: 0x02,
  0xb243: 0x03,
  0xb244: 0x04,
  0xb245: 0x05,
  0xb246: 0x06,
  0xb247: 0x07,
  0xb248: 0x08,
  0xb249: 0x09,
  0xb24a: 0x0a,
  0xb24b: 0x0b,
  0xb24c: 0x0c,
  0xb24d: 0x0d,
  0xb24e: 0x0e,
  0xb24f: 0x0f,
  0xb250: 0x10,
  0xb251: 0x11,
  0xb252: 0x12,
  0xb253: 0x13,
  0xb254: 0x14,
  0xb255: 0x15,
  0xb256: 0x16,
  0xb257: 0x17,
  0xb258: 0x18,
  0xb259: 0x19,
  0xb25a: 0x1a,
  0xb25b: 0x1b,
  0xb25c: 0x1c,
  0xb25d: 0x1d,
  0xb25e: 0x1e,
  0xb25f: 0x1f,
  0xb260: 0x20,
  0xb301: 0x01,
  0xb302: 0x02,
  0xb303: 0x03,
  0xb304: 0x04,
  0xb305: 0x05,
  0xb306: 0x06,
  0xb307: 0x07,
  0xb308: 0x08,
  0xb309: 0x09,
  0xb30a: 0x0a,
  0xb30b: 0x0b,
  0xb30c: 0x0c,
  0xb30d: 0x0d,
  0xb30e: 0x0e,
  0xb30f: 0x0f,
  0xb310: 0x10,
  0xb311: 0x11,
  0xb312: 0x12,
  0xb313: 0x13,
  0xb314: 0x14,
  0xb315: 0x15,
  0xb316: 0x16,
  0xb317: 0x17,
  0xb318: 0x18,
  0xb319: 0x19,
  0xb31a: 0x1a,
  0xb31b: 0x1b,
  0xb31c: 0x1c,
  0xb31d: 0x1d,
  0xb31e: 0x1e,
  0xb31f: 0x1f,
  0xb320: 0x20,
  0xb321: 0x01,
  0xb322: 0x02,
  0xb323: 0x03,
  0xb324: 0x04,
  0xb325: 0x05,
  0xb326: 0x06,
  0xb327: 0x07,
  0xb328: 0x08,
  0xb329: 0x09,
  0xb32a: 0x0a,
  0xb32b: 0x0b,
  0xb32c: 0x0c,
  0xb32d: 0x0d,
  0xb32e: 0x0e,
  0xb32f: 0x0f,
  0xb330: 0x10,
  0xb331: 0x11,
  0xb332: 0x12,
  0xb333: 0x13,
  0xb334: 0x14,
  0xb335: 0x15,
  0xb336: 0x16,
  0xb337: 0x17,
  0xb338: 0x18,
  0xb339: 0x19,
  0xb33a: 0x1a,
  0xb33b: 0x1b,
  0xb33c: 0x1c,
  0xb33d: 0x1d,
  0xb33e: 0x1e,
  0xb33f: 0x1f,
  0xb340: 0x20,
  0xb341: 0x21,
  0xb342: 0x22,
  0xb343: 0x23,
  0xb344: 0x24,
  0xb345: 0x25,
  0xb346: 0x26,
  0xb347: 0x27,
  0xb348: 0x28,
  0xb349: 0x29,
  0xb34a: 0x2a,
  0xb34b: 0x2b,
  0xb34c: 0x2c,
  0xb34d: 0x2d,
  0xb34e: 0x2e,
  0xb34f: 0x2f,
  0xb350: 0x30,
  0xb351: 0x31,
  0xb352: 0x32,
  0xb353: 0x33,
  0xb354: 0x34,
  0xb355: 0x35,
  0xb356: 0x36,
  0xb357: 0x37,
  0xb358: 0x38,
  0xb359: 0x39,
  0xb35a: 0x3a,
  0xb35b: 0x3b,
  0xb35c: 0x3c,
  0xb35d: 0x3d,
  0xb35e: 0x3e,
  0xb35f: 0x3f,
  0xb360: 0x40,
  0xb361: 0x01,
  0xb362: 0x02,
  0xb363: 0x03,
  0xb364: 0x04,
  0xb365: 0x05,
  0xb366: 0x06,
  0xb367: 0x07,
  0xb368: 0x08,
  0xb369: 0x09,
  0xb36a: 0x0a,
  0xb36b: 0x0b,
  0xb36c: 0x0c,
  0xb36d: 0x0d,
  0xb36e: 0x0e,
  0xb36f: 0x0f,
  0xb370: 0x10,
  0xb371: 0x11,
  0xb372: 0x12,
  0xb373: 0x13,
  0xb374: 0x14,
  0xb375: 0x15,
  0xb376: 0x16,
  0xb377: 0x17,
  0xb378: 0x18,
  0xb379: 0x19,
  0xb37a: 0x1a,
  0xb37b: 0x1b,
  0xb37c: 0x1c,
  0xb37d: 0x1d,
  0xb37e: 0x1e,
  0xb37f: 0x1f,
  0xb380: 0x20,
  0xb381: 0x21,
  0xb382: 0x22,
  0xb383: 0x23,
  0xb384: 0x24,
  0xb385: 0x25,
  0xb386: 0x26,
  0xb387: 0x27,
  0xb388: 0x28,
  0xb389: 0x29,
  0xb38a: 0x2a,
  0xb38b: 0x2b,
  0xb38c: 0x2c,
  0xb38d: 0x2d,
  0xb38e: 0x2e,
  0xb38f: 0x2f,
  0xb390: 0x30,
  0xb391: 0x31,
  0xb392: 0x32,
  0xb393: 0x33,
  0xb394: 0x34,
  0xb395: 0x35,
  0xb396: 0x36,
  0xb397: 0x37,
  0xb398: 0x38,
  0xb399: 0x39,
  0xb39a: 0x3a,
  0xb39b: 0x3b,
  0xb39c: 0x3c,
  0xb39d: 0x3d,
  0xb39e: 0x3e,
  0xb39f: 0x3f,
  0xb3a0: 0x40,
  0xb3a1: 0x41,
  0xb3a2: 0x42,
  0xb3a3: 0x43,
  0xb3a4: 0x44,
  0xb3a5: 0x45,
  0xb3a6: 0x46,
  0xb3a7: 0x47,
  0xb3a8: 0x48,
  0xb3a9: 0x49,
  0xb3aa: 0x4a,
  0xb3ab: 0x4b,
  0xb3ac: 0x4c,
  0xb3ad: 0x4d,
  0xb3ae: 0x4e,
  0xb3af: 0x4f,
  0xb3b0: 0x50,
  0xb3b1: 0x51,
  0xb3b2: 0x52,
  0xb3b3: 0x53,
  0xb3b4: 0x54,
  0xb3b5: 0x55,
  0xb3b6: 0x56,
  0xb3b7: 0x57,
  0xb3b8: 0x58,
  0xb3b9: 0x59,
  0xb3ba: 0x5a,
  0xb3bb: 0x5b,
  0xb3bc: 0x5c,
  0xb3bd: 0x5d,
  0xb3be: 0x5e,
  0xb3bf: 0x5f,
  0xb3c0: 0x60,
  0xb3c1: 0x61,
  0xb3c2: 0x62,
  0xb3c3: 0x63,
  0xb3c4: 0x64,
  0xb3c5: 0x65,
  0xb3c6: 0x66,
  0xb3c7: 0x67,
  0xb3c8: 0x68,
  0xb3c9: 0x69,
  0xb3ca: 0x6a,
  0xb3cb: 0x6b,
  0xb3cc: 0x6c,
  0xb3cd: 0x6d,
  0xb3ce: 0x6e,
  0xb3cf: 0x6f,
  0xb3d0: 0x70,
  0xb3d1: 0x71,
  0xb3d2: 0x72,
  0xb3d3: 0x73,
  0xb3d4: 0x74,
  0xb3d5: 0x75,
  0xb3d6: 0x76,
  0xb3d7: 0x77,
  0xb3d8: 0x78,
  0xb3d9: 0x79,
  0xb3da: 0x7a,
  0xb3db: 0x7b,
  0xb3dc: 0x7c,
  0xb3dd: 0x7d,
  0xb3de: 0x7e,
  0xb3df: 0x7f,
  0xb3e0: 0x80
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = encode;
var MSB = 0x80,
    REST = 0x7F,
    MSBALL = ~REST,
    INT = Math.pow(2, 31);

function encode(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;

  while (num >= INT) {
    out[offset++] = num & 0xFF | MSB;
    num /= 128;
  }

  while (num & MSBALL) {
    out[offset++] = num & 0xFF | MSB;
    num >>>= 7;
  }

  out[offset] = num | 0;
  encode.bytes = offset - oldOffset + 1;
  return out;
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = read;
var MSB = 0x80,
    REST = 0x7F;

function read(buf, offset) {
  var res = 0,
      offset = offset || 0,
      shift = 0,
      counter = offset,
      b,
      l = buf.length;

  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError('Could not decode varint');
    }

    b = buf[counter++];
    res += shift < 28 ? (b & REST) << shift : (b & REST) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB);

  read.bytes = counter - offset;
  return res;
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);

module.exports = function (value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Implementation of the [multibase](https://github.com/multiformats/multibase) specification.
 * @module Multibase
 */


const constants = __webpack_require__(29);

exports = module.exports = multibase;
exports.encode = encode;
exports.decode = decode;
exports.isEncoded = isEncoded;
exports.names = Object.freeze(Object.keys(constants.names));
exports.codes = Object.freeze(Object.keys(constants.codes));
const errNotSupported = new Error('Unsupported encoding');
/**
 * Create a new buffer with the multibase varint+code.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be prefixed with multibase.
 * @memberof Multibase
 * @returns {Buffer}
 */

function multibase(nameOrCode, buf) {
  if (!buf) {
    throw new Error('requires an encoded buffer');
  }

  const base = getBase(nameOrCode);
  const codeBuf = Buffer.from(base.code);
  const name = base.name;
  validEncode(name, buf);
  return Buffer.concat([codeBuf, buf]);
}
/**
 * Encode data with the specified base and add the multibase prefix.
 *
 * @param {string|number} nameOrCode - The multibase name or code number.
 * @param {Buffer} buf - The data to be encoded.
 * @returns {Buffer}
 * @memberof Multibase
 */


function encode(nameOrCode, buf) {
  const base = getBase(nameOrCode);
  const name = base.name;
  return multibase(name, Buffer.from(base.encode(buf)));
}
/**
 * Takes a buffer or string encoded with multibase header, decodes it and
 * returns the decoded buffer
 *
 * @param {Buffer|string} bufOrString
 * @returns {Buffer}
 * @memberof Multibase
 *
 */


function decode(bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString();
  }

  const code = bufOrString.substring(0, 1);
  bufOrString = bufOrString.substring(1, bufOrString.length);

  if (typeof bufOrString === 'string') {
    bufOrString = Buffer.from(bufOrString);
  }

  const base = getBase(code);
  return Buffer.from(base.decode(bufOrString.toString()));
}
/**
 * Is the given data multibase encoded?
 *
 * @param {Buffer|string} bufOrString
 * @returns {boolean}
 * @memberof Multibase
 */


function isEncoded(bufOrString) {
  if (Buffer.isBuffer(bufOrString)) {
    bufOrString = bufOrString.toString();
  } // Ensure bufOrString is a string


  if (Object.prototype.toString.call(bufOrString) !== '[object String]') {
    return false;
  }

  const code = bufOrString.substring(0, 1);

  try {
    const base = getBase(code);
    return base.name;
  } catch (err) {
    return false;
  }
}
/**
 * @param {string} name
 * @param {Buffer} buf
 * @private
 * @returns {undefined}
 */


function validEncode(name, buf) {
  const base = getBase(name);
  base.decode(buf.toString());
}

function getBase(nameOrCode) {
  let base;

  if (constants.names[nameOrCode]) {
    base = constants.names[nameOrCode];
  } else if (constants.codes[nameOrCode]) {
    base = constants.codes[nameOrCode];
  } else {
    throw errNotSupported;
  }

  if (!base.isImplemented()) {
    throw new Error('Base ' + nameOrCode + ' is not implemented yet');
  }

  return base;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Base = __webpack_require__(30);

const baseX = __webpack_require__(31);

const base16 = __webpack_require__(32);

const base32 = __webpack_require__(33);

const base64 = __webpack_require__(34); // name, code, implementation, alphabet


const constants = [['base1', '1', '', '1'], ['base2', '0', baseX, '01'], ['base8', '7', baseX, '01234567'], ['base10', '9', baseX, '0123456789'], ['base16', 'f', base16, '0123456789abcdef'], ['base32', 'b', base32, 'abcdefghijklmnopqrstuvwxyz234567'], ['base32pad', 'c', base32, 'abcdefghijklmnopqrstuvwxyz234567='], ['base32hex', 'v', base32, '0123456789abcdefghijklmnopqrstuv'], ['base32hexpad', 't', base32, '0123456789abcdefghijklmnopqrstuv='], ['base32z', 'h', base32, 'ybndrfg8ejkmcpqxot1uwisza345h769'], ['base58flickr', 'Z', baseX, '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'], ['base58btc', 'z', baseX, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'], ['base64', 'm', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'], ['base64pad', 'M', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='], ['base64url', 'u', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'], ['base64urlpad', 'U', base64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=']];
const names = constants.reduce((prev, tupple) => {
  prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3]);
  return prev;
}, {});
const codes = constants.reduce((prev, tupple) => {
  prev[tupple[1]] = names[tupple[0]];
  return prev;
}, {});
module.exports = {
  names: names,
  codes: codes
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Base {
  constructor(name, code, implementation, alphabet) {
    this.name = name;
    this.code = code;
    this.alphabet = alphabet;

    if (implementation && alphabet) {
      this.engine = implementation(alphabet);
    }
  }

  encode(stringOrBuffer) {
    return this.engine.encode(stringOrBuffer);
  }

  decode(stringOrBuffer) {
    return this.engine.decode(stringOrBuffer);
  }

  isImplemented() {
    return this.engine;
  }

}

module.exports = Base;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc
var Buffer = __webpack_require__(6).Buffer;

module.exports = function base(ALPHABET) {
  var ALPHABET_MAP = {};
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0); // pre-compute lookup table

  for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z);
    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous');
    ALPHABET_MAP[x] = z;
  }

  function encode(source) {
    if (source.length === 0) return '';
    var digits = [0];

    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8;
        digits[j] = carry % BASE;
        carry = carry / BASE | 0;
      }

      while (carry > 0) {
        digits.push(carry % BASE);
        carry = carry / BASE | 0;
      }
    }

    var string = ''; // deal with leading zeros

    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += LEADER; // convert digits to a string


    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]];

    return string;
  }

  function decodeUnsafe(string) {
    if (typeof string !== 'string') throw new TypeError('Expected String');
    if (string.length === 0) return Buffer.allocUnsafe(0);
    var bytes = [0];

    for (var i = 0; i < string.length; i++) {
      var value = ALPHABET_MAP[string[i]];
      if (value === undefined) return;

      for (var j = 0, carry = value; j < bytes.length; ++j) {
        carry += bytes[j] * BASE;
        bytes[j] = carry & 0xff;
        carry >>= 8;
      }

      while (carry > 0) {
        bytes.push(carry & 0xff);
        carry >>= 8;
      }
    } // deal with leading zeros


    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
      bytes.push(0);
    }

    return Buffer.from(bytes.reverse());
  }

  function decode(string) {
    var buffer = decodeUnsafe(string);
    if (buffer) return buffer;
    throw new Error('Non-base' + BASE + ' character');
  }

  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

module.exports = function base16(alphabet) {
  return {
    encode(input) {
      if (typeof input === 'string') {
        return Buffer.from(input).toString('hex');
      }

      return input.toString('hex');
    },

    decode(input) {
      for (let char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base16 character');
        }
      }

      return Buffer.from(input, 'hex');
    }

  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

function decode(input, alphabet) {
  input = input.replace(new RegExp('=', 'g'), '');
  let length = input.length;
  let bits = 0;
  let value = 0;
  let index = 0;
  let output = new Uint8Array(length * 5 / 8 | 0);

  for (let i = 0; i < length; i++) {
    value = value << 5 | alphabet.indexOf(input[i]);
    bits += 5;

    if (bits >= 8) {
      output[index++] = value >>> bits - 8 & 255;
      bits -= 8;
    }
  }

  return output.buffer;
}

function encode(buffer, alphabet) {
  let length = buffer.byteLength;
  let view = new Uint8Array(buffer);
  let padding = alphabet.indexOf('=') === alphabet.length - 1;

  if (padding) {
    alphabet = alphabet.substring(0, alphabet.length - 2);
  }

  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < length; i++) {
    value = value << 8 | view[i];
    bits += 8;

    while (bits >= 5) {
      output += alphabet[value >>> bits - 5 & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += alphabet[value << 5 - bits & 31];
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += '=';
    }
  }

  return output;
}

module.exports = function base32(alphabet) {
  return {
    encode(input) {
      if (typeof input === 'string') {
        return encode(Buffer.from(input), alphabet);
      }

      return encode(input, alphabet);
    },

    decode(input) {
      for (let char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base32 character');
        }
      }

      return decode(input, alphabet);
    }

  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

module.exports = function base64(alphabet) {
  // The alphabet is only used to know:
  //   1. If padding is enabled (must contain '=')
  //   2. If the output must be url-safe (must contain '-' and '_')
  //   3. If the input of the output function is valid
  // The alphabets from RFC 4648 are always used.
  const padding = alphabet.indexOf('=') > -1;
  const url = alphabet.indexOf('-') > -1 && alphabet.indexOf('_') > -1;
  return {
    encode(input) {
      let output = '';

      if (typeof input === 'string') {
        output = Buffer.from(input).toString('base64');
      } else {
        output = input.toString('base64');
      }

      if (url) {
        output = output.replace(/\+/g, '-').replace(/\//g, '_');
      }

      const pad = output.indexOf('=');

      if (pad > 0 && !padding) {
        output = output.substring(0, pad);
      }

      return output;
    },

    decode(input) {
      for (let char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base64 character');
        }
      }

      return Buffer.from(input, 'base64');
    }

  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Implementation of the multicodec specification.
 *
 * @module multicodec
 * @example
 * const multicodec = require('multicodec')
 *
 * const prefixedProtobuf = multicodec.addPrefix('protobuf', protobufBuffer)
 * // prefixedProtobuf 0x50...
 *
 */


const varint = __webpack_require__(1);

const intTable = __webpack_require__(36);

const codecNameToCodeVarint = __webpack_require__(37);

const util = __webpack_require__(9);

exports = module.exports;
/**
 * Prefix a buffer with a multicodec-packed.
 *
 * @param {string|number} multicodecStrOrCode
 * @param {Buffer} data
 * @returns {Buffer}
 */

exports.addPrefix = (multicodecStrOrCode, data) => {
  let prefix;

  if (Buffer.isBuffer(multicodecStrOrCode)) {
    prefix = util.varintBufferEncode(multicodecStrOrCode);
  } else {
    if (codecNameToCodeVarint[multicodecStrOrCode]) {
      prefix = codecNameToCodeVarint[multicodecStrOrCode];
    } else {
      throw new Error('multicodec not recognized');
    }
  }

  return Buffer.concat([prefix, data]);
};
/**
 * Decapsulate the multicodec-packed prefix from the data.
 *
 * @param {Buffer} data
 * @returns {Buffer}
 */


exports.rmPrefix = data => {
  varint.decode(data);
  return data.slice(varint.decode.bytes);
};
/**
 * Get the codec of the prefixed data.
 * @param {Buffer} prefixedData
 * @returns {string}
 */


exports.getCodec = prefixedData => {
  const code = varint.decode(prefixedData);
  const codecName = intTable.get(code);

  if (codecName === undefined) {
    throw new Error("Code ".concat(code, " not found"));
  }

  return codecName;
};
/**
 * Get the name of the codec.
 * @param {number} codec
 * @returns {string}
 */


exports.getName = codec => {
  return intTable.get(codec);
};
/**
 * Get the code of the codec
 * @param {string} name
 * @returns {number}
 */


exports.getNumber = name => {
  const code = codecNameToCodeVarint[name];

  if (code === undefined) {
    throw new Error('Codec `' + name + '` not found');
  }

  return util.varintBufferDecode(code)[0];
};
/**
 * Get the code of the prefixed data.
 * @param {Buffer} prefixedData
 * @returns {number}
 */


exports.getCode = prefixedData => {
  return varint.decode(prefixedData);
};
/**
 * Get the code as varint of a codec name.
 * @param {string} codecName
 * @returns {Buffer}
 */


exports.getCodeVarint = codecName => {
  const code = codecNameToCodeVarint[codecName];

  if (code === undefined) {
    throw new Error('Codec `' + codecName + '` not found');
  }

  return code;
};
/**
 * Get the varint of a code.
 * @param {Number} code
 * @returns {Array.<number>}
 */


exports.getVarint = code => {
  return varint.encode(code);
}; // Make the constants top-level constants


const constants = __webpack_require__(38);

Object.assign(exports, constants); // Human friendly names for printing, e.g. in error messages

exports.print = __webpack_require__(39);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const baseTable = __webpack_require__(2); // map for hexString -> codecName


const nameTable = new Map();

for (const encodingName in baseTable) {
  const code = baseTable[encodingName];
  nameTable.set(code, encodingName);
}

module.exports = Object.freeze(nameTable);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const baseTable = __webpack_require__(2);

const varintEncode = __webpack_require__(9).varintEncode; // map for codecName -> codeVarintBuffer


const varintTable = {};

for (const encodingName in baseTable) {
  const code = baseTable[encodingName];
  varintTable[encodingName] = varintEncode(code);
}

module.exports = Object.freeze(varintTable);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const table = __webpack_require__(2); // map for codecConstant -> code


const constants = {};

for (const [name, code] of Object.entries(table)) {
  constants[name.toUpperCase().replace(/-/g, '_')] = code;
}

module.exports = Object.freeze(constants);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const table = __webpack_require__(2); // map for code -> print friendly name


const tableByCode = {};

for (const [name, code] of Object.entries(table)) {
  if (tableByCode[code] === undefined) tableByCode[code] = name;
}

module.exports = Object.freeze(tableByCode);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

const mh = __webpack_require__(8);

var CIDUtil = {
  /**
   * Test if the given input is a valid CID object.
   * Returns an error message if it is not.
   * Returns undefined if it is a valid CID.
   *
   * @param {any} other
   * @returns {string}
   */
  checkCIDComponents: function checkCIDComponents(other) {
    if (other == null) {
      return 'null values are not valid CIDs';
    }

    if (!(other.version === 0 || other.version === 1)) {
      return 'Invalid version, must be a number equal to 1 or 0';
    }

    if (typeof other.codec !== 'string') {
      return 'codec must be string';
    }

    if (other.version === 0) {
      if (other.codec !== 'dag-pb') {
        return "codec must be 'dag-pb' for CIDv0";
      }

      if (other.multibaseName !== 'base58btc') {
        return "multibaseName must be 'base58btc' for CIDv0";
      }
    }

    if (!Buffer.isBuffer(other.multihash)) {
      return 'multihash must be a Buffer';
    }

    try {
      mh.validate(other.multihash);
    } catch (err) {
      let errorMsg = err.message;

      if (!errorMsg) {
        // Just in case mh.validate() throws an error with empty error message
        errorMsg = 'Multihash validation failed';
      }

      return errorMsg;
    }
  }
};
module.exports = CIDUtil;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0).Buffer))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;

/*
 * [hi-base32]{@link https://github.com/emn178/hi-base32}
 *
 * @version 0.5.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */

/*jslint bitwise: true */
(function () {
  'use strict';

  var root = typeof window === 'object' ? window : {};
  var NODE_JS = !root.HI_BASE32_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;

  if (NODE_JS) {
    root = global;
  }

  var COMMON_JS = !root.HI_BASE32_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(43);
  var BASE32_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');
  var BASE32_DECODE_CHAR = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'P': 15,
    'Q': 16,
    'R': 17,
    'S': 18,
    'T': 19,
    'U': 20,
    'V': 21,
    'W': 22,
    'X': 23,
    'Y': 24,
    'Z': 25,
    '2': 26,
    '3': 27,
    '4': 28,
    '5': 29,
    '6': 30,
    '7': 31
  };
  var blocks = [0, 0, 0, 0, 0, 0, 0, 0];

  var throwInvalidUtf8 = function throwInvalidUtf8(position, partial) {
    if (partial.length > 10) {
      partial = '...' + partial.substr(-10);
    }

    var err = new Error('Decoded data is not valid UTF-8.' + ' Maybe try base32.decode.asBytes()?' + ' Partial data after reading ' + position + ' bytes: ' + partial + ' <-');
    err.position = position;
    throw err;
  };

  var toUtf8String = function toUtf8String(bytes) {
    var str = '',
        length = bytes.length,
        i = 0,
        followingChars = 0,
        b,
        c;

    while (i < length) {
      b = bytes[i++];

      if (b <= 0x7F) {
        str += String.fromCharCode(b);
        continue;
      } else if (b > 0xBF && b <= 0xDF) {
        c = b & 0x1F;
        followingChars = 1;
      } else if (b <= 0xEF) {
        c = b & 0x0F;
        followingChars = 2;
      } else if (b <= 0xF7) {
        c = b & 0x07;
        followingChars = 3;
      } else {
        throwInvalidUtf8(i, str);
      }

      for (var j = 0; j < followingChars; ++j) {
        b = bytes[i++];

        if (b < 0x80 || b > 0xBF) {
          throwInvalidUtf8(i, str);
        }

        c <<= 6;
        c += b & 0x3F;
      }

      if (c >= 0xD800 && c <= 0xDFFF) {
        throwInvalidUtf8(i, str);
      }

      if (c > 0x10FFFF) {
        throwInvalidUtf8(i, str);
      }

      if (c <= 0xFFFF) {
        str += String.fromCharCode(c);
      } else {
        c -= 0x10000;
        str += String.fromCharCode((c >> 10) + 0xD800);
        str += String.fromCharCode((c & 0x3FF) + 0xDC00);
      }
    }

    return str;
  };

  var decodeAsBytes = function decodeAsBytes(base32Str) {
    if (!/^[A-Z2-7=]+$/.test(base32Str)) {
      throw new Error('Invalid base32 characters');
    }

    base32Str = base32Str.replace(/=/g, '');
    var v1,
        v2,
        v3,
        v4,
        v5,
        v6,
        v7,
        v8,
        bytes = [],
        index = 0,
        length = base32Str.length; // 4 char to 3 bytes

    for (var i = 0, count = length >> 3 << 3; i < count;) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
      bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
      bytes[index++] = (v7 << 5 | v8) & 255;
    } // remain bytes


    var remain = length - count;

    if (remain === 2) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
    } else if (remain === 4) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
    } else if (remain === 5) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
    } else if (remain === 7) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
      bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
      bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
      bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
    }

    return bytes;
  };

  var encodeAscii = function encodeAscii(str) {
    var v1,
        v2,
        v3,
        v4,
        v5,
        base32Str = '',
        length = str.length;

    for (var i = 0, count = parseInt(length / 5) * 5; i < count;) {
      v1 = str.charCodeAt(i++);
      v2 = str.charCodeAt(i++);
      v3 = str.charCodeAt(i++);
      v4 = str.charCodeAt(i++);
      v5 = str.charCodeAt(i++);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
    } // remain char


    var remain = length - count;

    if (remain === 1) {
      v1 = str.charCodeAt(i);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + '======';
    } else if (remain === 2) {
      v1 = str.charCodeAt(i++);
      v2 = str.charCodeAt(i);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + '====';
    } else if (remain === 3) {
      v1 = str.charCodeAt(i++);
      v2 = str.charCodeAt(i++);
      v3 = str.charCodeAt(i);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + '===';
    } else if (remain === 4) {
      v1 = str.charCodeAt(i++);
      v2 = str.charCodeAt(i++);
      v3 = str.charCodeAt(i++);
      v4 = str.charCodeAt(i);
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + '=';
    }

    return base32Str;
  };

  var encodeUtf8 = function encodeUtf8(str) {
    var v1,
        v2,
        v3,
        v4,
        v5,
        code,
        end = false,
        base32Str = '',
        index = 0,
        i,
        start = 0,
        bytes = 0,
        length = str.length;

    do {
      blocks[0] = blocks[5];
      blocks[1] = blocks[6];
      blocks[2] = blocks[7];

      for (i = start; index < length && i < 5; ++index) {
        code = str.charCodeAt(index);

        if (code < 0x80) {
          blocks[i++] = code;
        } else if (code < 0x800) {
          blocks[i++] = 0xc0 | code >> 6;
          blocks[i++] = 0x80 | code & 0x3f;
        } else if (code < 0xd800 || code >= 0xe000) {
          blocks[i++] = 0xe0 | code >> 12;
          blocks[i++] = 0x80 | code >> 6 & 0x3f;
          blocks[i++] = 0x80 | code & 0x3f;
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | str.charCodeAt(++index) & 0x3ff);
          blocks[i++] = 0xf0 | code >> 18;
          blocks[i++] = 0x80 | code >> 12 & 0x3f;
          blocks[i++] = 0x80 | code >> 6 & 0x3f;
          blocks[i++] = 0x80 | code & 0x3f;
        }
      }

      bytes += i - start;
      start = i - 5;

      if (index === length) {
        ++index;
      }

      if (index > length && i < 6) {
        end = true;
      }

      v1 = blocks[0];

      if (i > 4) {
        v2 = blocks[1];
        v3 = blocks[2];
        v4 = blocks[3];
        v5 = blocks[4];
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
      } else if (i === 1) {
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + '======';
      } else if (i === 2) {
        v2 = blocks[1];
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + '====';
      } else if (i === 3) {
        v2 = blocks[1];
        v3 = blocks[2];
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + '===';
      } else {
        v2 = blocks[1];
        v3 = blocks[2];
        v4 = blocks[3];
        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + '=';
      }
    } while (!end);

    return base32Str;
  };

  var encodeBytes = function encodeBytes(bytes) {
    var v1,
        v2,
        v3,
        v4,
        v5,
        base32Str = '',
        length = bytes.length;

    for (var i = 0, count = parseInt(length / 5) * 5; i < count;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      v4 = bytes[i++];
      v5 = bytes[i++];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
    } // remain char


    var remain = length - count;

    if (remain === 1) {
      v1 = bytes[i];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + '======';
    } else if (remain === 2) {
      v1 = bytes[i++];
      v2 = bytes[i];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + '====';
    } else if (remain === 3) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + '===';
    } else if (remain === 4) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      v4 = bytes[i];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + '=';
    }

    return base32Str;
  };

  var encode = function encode(input, asciiOnly) {
    var notString = typeof input !== 'string';

    if (notString && input.constructor === ArrayBuffer) {
      input = new Uint8Array(input);
    }

    if (notString) {
      return encodeBytes(input);
    } else if (asciiOnly) {
      return encodeAscii(input);
    } else {
      return encodeUtf8(input);
    }
  };

  var decode = function decode(base32Str, asciiOnly) {
    if (!asciiOnly) {
      return toUtf8String(decodeAsBytes(base32Str));
    }

    if (!/^[A-Z2-7=]+$/.test(base32Str)) {
      throw new Error('Invalid base32 characters');
    }

    var v1,
        v2,
        v3,
        v4,
        v5,
        v6,
        v7,
        v8,
        str = '',
        length = base32Str.indexOf('=');

    if (length === -1) {
      length = base32Str.length;
    } // 8 char to 5 bytes


    for (var i = 0, count = length >> 3 << 3; i < count;) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) + String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255) + String.fromCharCode((v7 << 5 | v8) & 255);
    } // remain bytes


    var remain = length - count;

    if (remain === 2) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255);
    } else if (remain === 4) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255);
    } else if (remain === 5) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255);
    } else if (remain === 7) {
      v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
      str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) + String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255);
    }

    return str;
  };

  var exports = {
    encode: encode,
    decode: decode
  };
  decode.asBytes = decodeAsBytes;

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.base32 = exports;

    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(42), __webpack_require__(5)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map