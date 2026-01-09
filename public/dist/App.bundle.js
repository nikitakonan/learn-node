(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var _global$2 = {exports: {}};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$l = _global$2.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global$l; // eslint-disable-line no-undef

	var _globalExports = _global$2.exports;

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _core$1 = {exports: {}};

	var core$7 = _core$1.exports = { version: '2.6.12' };
	if (typeof __e == 'number') __e = core$7; // eslint-disable-line no-undef

	var _coreExports$1 = _core$1.exports;

	var _objectDp$1 = {};

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$v = _isObject$1;
	var _anObject$1 = function (it) {
	  if (!isObject$v(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var isObject$u = _isObject$1;
	var document$2 = _globalExports.document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject$u(document$2) && isObject$u(document$2.createElement);
	var _domCreate$1 = function (it) {
	  return is ? document$2.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject$t = _isObject$1;
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!isObject$t(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject$t(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject$t(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject$t(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var anObject$s = _anObject$1;
	var IE8_DOM_DEFINE$2 = _ie8DomDefine$1;
	var toPrimitive$7 = _toPrimitive$1;
	var dP$c = Object.defineProperty;

	_objectDp$1.f = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$s(O);
	  P = toPrimitive$7(P, true);
	  anObject$s(Attributes);
	  if (IE8_DOM_DEFINE$2) try {
	    return dP$c(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var dP$b = _objectDp$1;
	var createDesc$5 = _propertyDesc$1;
	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return dP$b.f(object, key, createDesc$5(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _redefine = {exports: {}};

	var id$2 = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$2 + px).toString(36));
	};

	var _shared = {exports: {}};

	var _library = false;

	var core$6 = _coreExports$1;
	var global$k = _globalExports;
	var SHARED = '__core-js_shared__';
	var store$1 = global$k[SHARED] || (global$k[SHARED] = {});

	(_shared.exports = function (key, value) {
	  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core$6.version,
	  mode: 'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});

	var _sharedExports = _shared.exports;

	var _functionToString = _sharedExports('native-function-to-string', Function.toString);

	var global$j = _globalExports;
	var hide$7 = _hide$1;
	var has$b = _has$1;
	var SRC = _uid('src');
	var $toString$2 = _functionToString;
	var TO_STRING$2 = 'toString';
	var TPL = ('' + $toString$2).split(TO_STRING$2);

	_coreExports$1.inspectSource = function (it) {
	  return $toString$2.call(it);
	};

	(_redefine.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has$b(val, 'name') || hide$7(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has$b(val, SRC) || hide$7(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global$j) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    hide$7(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    hide$7(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING$2, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString$2.call(this);
	});

	var _redefineExports = _redefine.exports;

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding
	var aFunction$a = _aFunction$1;
	var _ctx$1 = function (fn, that, length) {
	  aFunction$a(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var global$i = _globalExports;
	var core$5 = _coreExports$1;
	var hide$6 = _hide$1;
	var redefine$6 = _redefineExports;
	var ctx$9 = _ctx$1;
	var PROTOTYPE$4 = 'prototype';

	var $export$1C = function (type, name, source) {
	  var IS_FORCED = type & $export$1C.F;
	  var IS_GLOBAL = type & $export$1C.G;
	  var IS_STATIC = type & $export$1C.S;
	  var IS_PROTO = type & $export$1C.P;
	  var IS_BIND = type & $export$1C.B;
	  var target = IS_GLOBAL ? global$i : IS_STATIC ? global$i[name] || (global$i[name] = {}) : (global$i[name] || {})[PROTOTYPE$4];
	  var exports$1 = IS_GLOBAL ? core$5 : core$5[name] || (core$5[name] = {});
	  var expProto = exports$1[PROTOTYPE$4] || (exports$1[PROTOTYPE$4] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx$9(out, global$i) : IS_PROTO && typeof out == 'function' ? ctx$9(Function.call, out) : out;
	    // extend global
	    if (target) redefine$6(target, key, out, type & $export$1C.U);
	    // export
	    if (exports$1[key] != out) hide$6(exports$1, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global$i.core = core$5;
	// type bitmap
	$export$1C.F = 1;   // forced
	$export$1C.G = 2;   // global
	$export$1C.S = 4;   // static
	$export$1C.P = 8;   // proto
	$export$1C.B = 16;  // bind
	$export$1C.W = 32;  // wrap
	$export$1C.U = 64;  // safe
	$export$1C.R = 128; // real proto method for `library`
	var _export$1 = $export$1C;

	var _meta = {exports: {}};

	var META$1 = _uid('meta');
	var isObject$s = _isObject$1;
	var has$a = _has$1;
	var setDesc = _objectDp$1.f;
	var id$1 = 0;
	var isExtensible$1 = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails$1(function () {
	  return isExtensible$1(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META$1, { value: {
	    i: 'O' + ++id$1, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey$1 = function (it, create) {
	  // return primitive with prefix
	  if (!isObject$s(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has$a(it, META$1)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible$1(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META$1].i;
	};
	var getWeak$2 = function (it, create) {
	  if (!has$a(it, META$1)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible$1(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META$1].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta$5.NEED && isExtensible$1(it) && !has$a(it, META$1)) setMeta(it);
	  return it;
	};
	var meta$5 = _meta.exports = {
	  KEY: META$1,
	  NEED: false,
	  fastKey: fastKey$1,
	  getWeak: getWeak$2,
	  onFreeze: onFreeze
	};

	var _metaExports = _meta.exports;

	var _wks = {exports: {}};

	var store = _sharedExports('wks');
	var uid$4 = _uid;
	var Symbol$1 = _globalExports.Symbol;
	var USE_SYMBOL = typeof Symbol$1 == 'function';

	var $exports = _wks.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol$1[name] || (USE_SYMBOL ? Symbol$1 : uid$4)('Symbol.' + name));
	};

	$exports.store = store;

	var _wksExports = _wks.exports;

	var def = _objectDp$1.f;
	var has$9 = _has$1;
	var TAG$2 = _wksExports('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !has$9(it = stat ? it : it.prototype, TAG$2)) def(it, TAG$2, { configurable: true, value: tag });
	};

	var _wksExt = {};

	_wksExt.f = _wksExports;

	var global$h = _globalExports;
	var core$4 = _coreExports$1;
	var wksExt$1 = _wksExt;
	var defineProperty = _objectDp$1.f;
	var _wksDefine = function (name) {
	  var $Symbol = core$4.Symbol || (core$4.Symbol = global$h.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt$1.f(name) });
	};

	var toString$1 = {}.toString;

	var _cof = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	var _iobject;
	var hasRequired_iobject;

	function require_iobject () {
		if (hasRequired_iobject) return _iobject;
		hasRequired_iobject = 1;
		// fallback for non-array-like ES3 and non-enumerable old V8 strings
		var cof = _cof;
		// eslint-disable-next-line no-prototype-builtins
		_iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
		  return cof(it) == 'String' ? it.split('') : Object(it);
		};
		return _iobject;
	}

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject$3 = require_iobject();
	var defined$8 = _defined;
	var _toIobject = function (it) {
	  return IObject$3(defined$8(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor$3 = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$3 : ceil)(it);
	};

	// 7.1.15 ToLength
	var toInteger$8 = _toInteger;
	var min$2 = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min$2(toInteger$8(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var toInteger$7 = _toInteger;
	var max$1 = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger$7(index);
	  return index < 0 ? max$1(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject$b = _toIobject;
	var toLength$i = _toLength;
	var toAbsoluteIndex$4 = _toAbsoluteIndex;
	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject$b($this);
	    var length = toLength$i(O.length);
	    var index = toAbsoluteIndex$4(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared$1 = _sharedExports('keys');
	var uid$3 = _uid;
	var _sharedKey = function (key) {
	  return shared$1[key] || (shared$1[key] = uid$3(key));
	};

	var has$8 = _has$1;
	var toIObject$a = _toIobject;
	var arrayIndexOf$1 = _arrayIncludes(false);
	var IE_PROTO$2 = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = toIObject$a(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$2) has$8(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$8(O, key = names[i++])) {
	    ~arrayIndexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys$3 = _objectKeysInternal;
	var enumBugKeys$1 = _enumBugKeys;

	var _objectKeys = Object.keys || function keys(O) {
	  return $keys$3(O, enumBugKeys$1);
	};

	var _objectGops = {};

	_objectGops.f = Object.getOwnPropertySymbols;

	var _objectPie = {};

	var hasRequired_objectPie;

	function require_objectPie () {
		if (hasRequired_objectPie) return _objectPie;
		hasRequired_objectPie = 1;
		_objectPie.f = {}.propertyIsEnumerable;
		return _objectPie;
	}

	// all enumerable object keys, includes symbols
	var getKeys$3 = _objectKeys;
	var gOPS$2 = _objectGops;
	var pIE$2 = require_objectPie();
	var _enumKeys = function (it) {
	  var result = getKeys$3(it);
	  var getSymbols = gOPS$2.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE$2.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)
	var cof$5 = _cof;
	var _isArray = Array.isArray || function isArray(arg) {
	  return cof$5(arg) == 'Array';
	};

	// 7.1.13 ToObject(argument)
	var defined$7 = _defined;
	var _toObject = function (it) {
	  return Object(defined$7(it));
	};

	var _objectDps;
	var hasRequired_objectDps;

	function require_objectDps () {
		if (hasRequired_objectDps) return _objectDps;
		hasRequired_objectDps = 1;
		var dP = _objectDp$1;
		var anObject = _anObject$1;
		var getKeys = _objectKeys;

		_objectDps = _descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
		  anObject(O);
		  var keys = getKeys(Properties);
		  var length = keys.length;
		  var i = 0;
		  var P;
		  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
		  return O;
		};
		return _objectDps;
	}

	var document$1 = _globalExports.document;
	var _html = document$1 && document$1.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject$r = _anObject$1;
	var dPs = require_objectDps();
	var enumBugKeys = _enumBugKeys;
	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$3 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate$1('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$3][enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$3] = anObject$r(O);
	    result = new Empty();
	    Empty[PROTOTYPE$3] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _objectGopnExt = {};

	var _objectGopn = {};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys$2 = _objectKeysInternal;
	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	_objectGopn.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys$2(O, hiddenKeys);
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject$9 = _toIobject;
	var gOPN$5 = _objectGopn.f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN$5(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	_objectGopnExt.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$5(toIObject$9(it));
	};

	var _objectGopd = {};

	var pIE$1 = require_objectPie();
	var createDesc$4 = _propertyDesc$1;
	var toIObject$8 = _toIobject;
	var toPrimitive$6 = _toPrimitive$1;
	var has$7 = _has$1;
	var IE8_DOM_DEFINE$1 = _ie8DomDefine$1;
	var gOPD$8 = Object.getOwnPropertyDescriptor;

	_objectGopd.f = _descriptors$1 ? gOPD$8 : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject$8(O);
	  P = toPrimitive$6(P, true);
	  if (IE8_DOM_DEFINE$1) try {
	    return gOPD$8(O, P);
	  } catch (e) { /* empty */ }
	  if (has$7(O, P)) return createDesc$4(!pIE$1.f.call(O, P), O[P]);
	};

	// ECMAScript 6 symbols shim
	var global$g = _globalExports;
	var has$6 = _has$1;
	var DESCRIPTORS$5 = _descriptors$1;
	var $export$1B = _export$1;
	var redefine$5 = _redefineExports;
	var META = _metaExports.KEY;
	var $fails$1 = _fails$1;
	var shared = _sharedExports;
	var setToStringTag$2 = _setToStringTag;
	var uid$2 = _uid;
	var wks$3 = _wksExports;
	var wksExt = _wksExt;
	var wksDefine = _wksDefine;
	var enumKeys = _enumKeys;
	var isArray$2 = _isArray;
	var anObject$q = _anObject$1;
	var isObject$r = _isObject$1;
	var toObject$c = _toObject;
	var toIObject$7 = _toIobject;
	var toPrimitive$5 = _toPrimitive$1;
	var createDesc$3 = _propertyDesc$1;
	var _create = _objectCreate;
	var gOPNExt = _objectGopnExt;
	var $GOPD$1 = _objectGopd;
	var $GOPS = _objectGops;
	var $DP$1 = _objectDp$1;
	var $keys$1 = _objectKeys;
	var gOPD$7 = $GOPD$1.f;
	var dP$a = $DP$1.f;
	var gOPN$4 = gOPNExt.f;
	var $Symbol = global$g.Symbol;
	var $JSON = global$g.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = wks$3('_hidden');
	var TO_PRIMITIVE$1 = wks$3('toPrimitive');
	var isEnum$1 = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE$1 = typeof $Symbol == 'function' && !!$GOPS.f;
	var QObject = global$g.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS$5 && $fails$1(function () {
	  return _create(dP$a({}, 'a', {
	    get: function () { return dP$a(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$7(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$a(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$a(ObjectProto$1, key, protoDesc);
	} : dP$a;

	var wrap$1 = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty$1 = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty$1(OPSymbols, key, D);
	  anObject$q(it);
	  key = toPrimitive$5(key, true);
	  anObject$q(D);
	  if (has$6(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has$6(it, HIDDEN)) dP$a(it, HIDDEN, createDesc$3(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has$6(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc$3(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$a(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject$q(it);
	  var keys = enumKeys(P = toIObject$7(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty$1(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum$1.call(this, key = toPrimitive$5(key, true));
	  if (this === ObjectProto$1 && has$6(AllSymbols, key) && !has$6(OPSymbols, key)) return false;
	  return E || !has$6(this, key) || !has$6(AllSymbols, key) || has$6(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject$7(it);
	  key = toPrimitive$5(key, true);
	  if (it === ObjectProto$1 && has$6(AllSymbols, key) && !has$6(OPSymbols, key)) return;
	  var D = gOPD$7(it, key);
	  if (D && has$6(AllSymbols, key) && !(has$6(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$4(toIObject$7(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has$6(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$4(IS_OP ? OPSymbols : toIObject$7(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has$6(AllSymbols, key = names[i++]) && (IS_OP ? has$6(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid$2(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (has$6(this, HIDDEN) && has$6(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc$3(1, value));
	    };
	    if (DESCRIPTORS$5 && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap$1(tag);
	  };
	  redefine$5($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD$1.f = $getOwnPropertyDescriptor$1;
	  $DP$1.f = $defineProperty$1;
	  _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
	  require_objectPie().f = $propertyIsEnumerable;
	  $GOPS.f = $getOwnPropertySymbols;

	  if (DESCRIPTORS$5 && !_library) {
	    redefine$5(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap$1(wks$3(name));
	  };
	}

	$export$1B($export$1B.G + $export$1B.W + $export$1B.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j$1 = 0; es6Symbols.length > j$1;)wks$3(es6Symbols[j$1++]);

	for (var wellKnownSymbols = $keys$1(wks$3.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export$1B($export$1B.S + $export$1B.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has$6(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export$1B($export$1B.S + $export$1B.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty$1,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = $fails$1(function () { $GOPS.f(1); });

	$export$1B($export$1B.S + $export$1B.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return $GOPS.f(toObject$c(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$1B($export$1B.S + $export$1B.F * (!USE_NATIVE$1 || $fails$1(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject$r(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray$2(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE$1] || _hide$1($Symbol[PROTOTYPE$2], TO_PRIMITIVE$1, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag$2($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag$2(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag$2(global$g.JSON, 'JSON', true);

	var $export$1A = _export$1;
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export$1A($export$1A.S, 'Object', { create: _objectCreate });

	var $export$1z = _export$1;
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export$1z($export$1z.S + $export$1z.F * !_descriptors$1, 'Object', { defineProperty: _objectDp$1.f });

	var $export$1y = _export$1;
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export$1y($export$1y.S + $export$1y.F * !_descriptors$1, 'Object', { defineProperties: require_objectDps() });

	// most Object methods by ES6 should accept primitives
	var $export$1x = _export$1;
	var core$3 = _coreExports$1;
	var fails$b = _fails$1;
	var _objectSap = function (KEY, exec) {
	  var fn = (core$3.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1x($export$1x.S + $export$1x.F * fails$b(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject$6 = _toIobject;
	var $getOwnPropertyDescriptor = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject$6(it), key);
	  };
	});

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has$5 = _has$1;
	var toObject$b = _toObject;
	var IE_PROTO = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = toObject$b(O);
	  if (has$5(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject$a = _toObject;
	var $getPrototypeOf = _objectGpo;

	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject$a(it));
	  };
	});

	// 19.1.2.14 Object.keys(O)
	var toObject$9 = _toObject;
	var $keys = _objectKeys;

	_objectSap('keys', function () {
	  return function keys(it) {
	    return $keys(toObject$9(it));
	  };
	});

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	// 19.1.2.5 Object.freeze(O)
	var isObject$q = _isObject$1;
	var meta$4 = _metaExports.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject$q(it) ? $freeze(meta$4(it)) : it;
	  };
	});

	// 19.1.2.17 Object.seal(O)
	var isObject$p = _isObject$1;
	var meta$3 = _metaExports.onFreeze;

	_objectSap('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && isObject$p(it) ? $seal(meta$3(it)) : it;
	  };
	});

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject$o = _isObject$1;
	var meta$2 = _metaExports.onFreeze;

	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject$o(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	// 19.1.2.12 Object.isFrozen(O)
	var isObject$n = _isObject$1;

	_objectSap('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return isObject$n(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	// 19.1.2.13 Object.isSealed(O)
	var isObject$m = _isObject$1;

	_objectSap('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return isObject$m(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	// 19.1.2.11 Object.isExtensible(O)
	var isObject$l = _isObject$1;

	_objectSap('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject$l(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	// 19.1.2.1 Object.assign(target, source, ...)
	var DESCRIPTORS$4 = _descriptors$1;
	var getKeys$2 = _objectKeys;
	var gOPS$1 = _objectGops;
	var pIE = require_objectPie();
	var toObject$8 = _toObject;
	var IObject$2 = require_iobject();
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails$1(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject$8(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS$1.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject$2(arguments[index++]);
	    var keys = getSymbols ? getKeys$2(S).concat(getSymbols(S)) : getKeys$2(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$4 || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)
	var $export$1w = _export$1;

	$export$1w($export$1w.S + $export$1w.F, 'Object', { assign: _objectAssign });

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// 19.1.3.10 Object.is(value1, value2)
	var $export$1v = _export$1;
	$export$1v($export$1v.S, 'Object', { is: _sameValue });

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject$k = _isObject$1;
	var anObject$p = _anObject$1;
	var check = function (O, proto) {
	  anObject$p(O);
	  if (!isObject$k(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx$1(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export$1u = _export$1;
	$export$1u($export$1u.S, 'Object', { setPrototypeOf: _setProto.set });

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof$4 = _cof;
	var TAG$1 = _wksExports('toStringTag');
	// ES3 wrong here
	var ARG = cof$4(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof$4(O)
	    // ES3 arguments fallback
	    : (B = cof$4(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	// 19.1.3.6 Object.prototype.toString()
	var classof$4 = _classof;
	var test$1 = {};
	test$1[_wksExports('toStringTag')] = 'z';
	if (test$1 + '' != '[object z]') {
	  _redefineExports(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof$4(this) + ']';
	  }, true);
	}

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var aFunction$9 = _aFunction$1;
	var isObject$j = _isObject$1;
	var invoke$1 = _invoke;
	var arraySlice$2 = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction$9(this);
	  var partArgs = arraySlice$2.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice$2.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke$1(fn, args, that);
	  };
	  if (isObject$j(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export$1t = _export$1;

	$export$1t($export$1t.P, 'Function', { bind: _bind });

	var dP$9 = _objectDp$1.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// 19.2.4.2 name
	NAME$1 in FProto || _descriptors$1 && dP$9(FProto, NAME$1, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var isObject$i = _isObject$1;
	var getPrototypeOf$4 = _objectGpo;
	var HAS_INSTANCE = _wksExports('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) _objectDp$1.f(FunctionProto, HAS_INSTANCE, { value: function (O) {
	  if (typeof this != 'function' || !isObject$i(O)) return false;
	  if (!isObject$i(this.prototype)) return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while (O = getPrototypeOf$4(O)) if (this.prototype === O) return true;
	  return false;
	} });

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var $export$1s = _export$1;
	var defined$6 = _defined;
	var fails$a = _fails$1;
	var spaces = _stringWs;
	var space = '[' + spaces + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = fails$a(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export$1s($export$1s.P + $export$1s.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined$6(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt$2 = _globalExports.parseInt;
	var $trim$2 = _stringTrim.trim;
	var ws = _stringWs;
	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt$2(ws + '08') !== 8 || $parseInt$2(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim$2(String(str), 3);
	  return $parseInt$2(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt$2;

	var $export$1r = _export$1;
	var $parseInt$1 = _parseInt;
	// 18.2.5 parseInt(string, radix)
	$export$1r($export$1r.G + $export$1r.F * (parseInt != $parseInt$1), { parseInt: $parseInt$1 });

	var $parseFloat$2 = _globalExports.parseFloat;
	var $trim$1 = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat$2(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat$2(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat$2;

	var $export$1q = _export$1;
	var $parseFloat$1 = _parseFloat;
	// 18.2.4 parseFloat(string)
	$export$1q($export$1q.G + $export$1q.F * (parseFloat != $parseFloat$1), { parseFloat: $parseFloat$1 });

	var isObject$h = _isObject$1;
	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject$h(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var global$f = _globalExports;
	var has$4 = _has$1;
	var cof$3 = _cof;
	var inheritIfRequired$2 = _inheritIfRequired;
	var toPrimitive$4 = _toPrimitive$1;
	var fails$9 = _fails$1;
	var gOPN$3 = _objectGopn.f;
	var gOPD$6 = _objectGopd.f;
	var dP$8 = _objectDp$1.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = global$f[NUMBER];
	var Base$1 = $Number;
	var proto$4 = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = cof$3(_objectCreate(proto$4)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = toPrimitive$4(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails$9(function () { proto$4.valueOf.call(that); }) : cof$3(that) != NUMBER)
	        ? inheritIfRequired$2(new Base$1(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys$1 = _descriptors$1 ? gOPN$3(Base$1) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key$1; keys$1.length > j; j++) {
	    if (has$4(Base$1, key$1 = keys$1[j]) && !has$4($Number, key$1)) {
	      dP$8($Number, key$1, gOPD$6(Base$1, key$1));
	    }
	  }
	  $Number.prototype = proto$4;
	  proto$4.constructor = $Number;
	  _redefineExports(global$f, NUMBER, $Number);
	}

	var cof$2 = _cof;
	var _aNumberValue = function (it, msg) {
	  if (typeof it != 'number' && cof$2(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

	var toInteger$6 = _toInteger;
	var defined$5 = _defined;

	var _stringRepeat = function repeat(count) {
	  var str = String(defined$5(this));
	  var res = '';
	  var n = toInteger$6(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};

	var $export$1p = _export$1;
	var toInteger$5 = _toInteger;
	var aNumberValue$1 = _aNumberValue;
	var repeat$1 = _stringRepeat;
	var $toFixed = 1.0.toFixed;
	var floor$2 = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';

	var multiply = function (n, c) {
	  var i = -1;
	  var c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor$2(c2 / 1e7);
	  }
	};
	var divide = function (n) {
	  var i = 6;
	  var c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor$2(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function () {
	  var i = 6;
	  var s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat$1.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	$export$1p($export$1p.P + $export$1p.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
	) || !_fails$1(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = aNumberValue$1(this, ERROR);
	    var f = toInteger$5(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    // eslint-disable-next-line no-self-compare
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat$1.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat$1.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

	var $export$1o = _export$1;
	var $fails = _fails$1;
	var aNumberValue = _aNumberValue;
	var $toPrecision = 1.0.toPrecision;

	$export$1o($export$1o.P + $export$1o.F * ($fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

	// 20.1.2.1 Number.EPSILON
	var $export$1n = _export$1;

	$export$1n($export$1n.S, 'Number', { EPSILON: Math.pow(2, -52) });

	// 20.1.2.2 Number.isFinite(number)
	var $export$1m = _export$1;
	var _isFinite = _globalExports.isFinite;

	$export$1m($export$1m.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	// 20.1.2.3 Number.isInteger(number)
	var isObject$g = _isObject$1;
	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !isObject$g(it) && isFinite(it) && floor$1(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)
	var $export$1l = _export$1;

	$export$1l($export$1l.S, 'Number', { isInteger: _isInteger });

	// 20.1.2.4 Number.isNaN(number)
	var $export$1k = _export$1;

	$export$1k($export$1k.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export$1j = _export$1;
	var isInteger = _isInteger;
	var abs$1 = Math.abs;

	$export$1j($export$1j.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return isInteger(number) && abs$1(number) <= 0x1fffffffffffff;
	  }
	});

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export$1i = _export$1;

	$export$1i($export$1i.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export$1h = _export$1;

	$export$1h($export$1h.S, 'Number', { MIN_SAFE_INTEGER: -9007199254740991 });

	var $export$1g = _export$1;
	var $parseFloat = _parseFloat;
	// 20.1.2.12 Number.parseFloat(string)
	$export$1g($export$1g.S + $export$1g.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

	var $export$1f = _export$1;
	var $parseInt = _parseInt;
	// 20.1.2.13 Number.parseInt(string, radix)
	$export$1f($export$1f.S + $export$1f.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

	// 20.2.2.20 Math.log1p(x)
	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	// 20.2.2.3 Math.acosh(x)
	var $export$1e = _export$1;
	var log1p = _mathLog1p;
	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;

	$export$1e($export$1e.S + $export$1e.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	// 20.2.2.5 Math.asinh(x)
	var $export$1d = _export$1;
	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	$export$1d($export$1d.S + $export$1d.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

	// 20.2.2.7 Math.atanh(x)
	var $export$1c = _export$1;
	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	$export$1c($export$1c.S + $export$1c.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// 20.2.2.9 Math.cbrt(x)
	var $export$1b = _export$1;
	var sign = _mathSign;

	$export$1b($export$1b.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	// 20.2.2.11 Math.clz32(x)
	var $export$1a = _export$1;

	$export$1a($export$1a.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	// 20.2.2.12 Math.cosh(x)
	var $export$19 = _export$1;
	var exp$2 = Math.exp;

	$export$19($export$19.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp$2(x = +x) + exp$2(-x)) / 2;
	  }
	});

	// 20.2.2.14 Math.expm1(x)
	var $expm1$1 = Math.expm1;
	var _mathExpm1 = (!$expm1$1
	  // Old FF bug
	  || $expm1$1(10) > 22025.465794806719 || $expm1$1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1$1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1$1;

	// 20.2.2.14 Math.expm1(x)
	var $export$18 = _export$1;
	var $expm1 = _mathExpm1;

	$export$18($export$18.S + $export$18.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

	var _mathFround;
	var hasRequired_mathFround;

	function require_mathFround () {
		if (hasRequired_mathFround) return _mathFround;
		hasRequired_mathFround = 1;
		// 20.2.2.16 Math.fround(x)
		var sign = _mathSign;
		var pow = Math.pow;
		var EPSILON = pow(2, -52);
		var EPSILON32 = pow(2, -23);
		var MAX32 = pow(2, 127) * (2 - EPSILON32);
		var MIN32 = pow(2, -126);

		var roundTiesToEven = function (n) {
		  return n + 1 / EPSILON - 1 / EPSILON;
		};

		_mathFround = Math.fround || function fround(x) {
		  var $abs = Math.abs(x);
		  var $sign = sign(x);
		  var a, result;
		  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
		  a = (1 + EPSILON32 / EPSILON) * $abs;
		  result = a - (a - $abs);
		  // eslint-disable-next-line no-self-compare
		  if (result > MAX32 || result != result) return $sign * Infinity;
		  return $sign * result;
		};
		return _mathFround;
	}

	// 20.2.2.16 Math.fround(x)
	var $export$17 = _export$1;

	$export$17($export$17.S, 'Math', { fround: require_mathFround() });

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export$16 = _export$1;
	var abs = Math.abs;

	$export$16($export$16.S, 'Math', {
	  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	// 20.2.2.18 Math.imul(x, y)
	var $export$15 = _export$1;
	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export$15($export$15.S + $export$15.F * _fails$1(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	// 20.2.2.21 Math.log10(x)
	var $export$14 = _export$1;

	$export$14($export$14.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	// 20.2.2.20 Math.log1p(x)
	var $export$13 = _export$1;

	$export$13($export$13.S, 'Math', { log1p: _mathLog1p });

	// 20.2.2.22 Math.log2(x)
	var $export$12 = _export$1;

	$export$12($export$12.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var $export$11 = _export$1;

	$export$11($export$11.S, 'Math', { sign: _mathSign });

	// 20.2.2.30 Math.sinh(x)
	var $export$10 = _export$1;
	var expm1$1 = _mathExpm1;
	var exp$1 = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export$10($export$10.S + $export$10.F * _fails$1(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1
	      ? (expm1$1(x) - expm1$1(-x)) / 2
	      : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
	  }
	});

	// 20.2.2.33 Math.tanh(x)
	var $export$$ = _export$1;
	var expm1 = _mathExpm1;
	var exp = Math.exp;

	$export$$($export$$.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = expm1(x = +x);
	    var b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

	// 20.2.2.34 Math.trunc(x)
	var $export$_ = _export$1;

	$export$_($export$_.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	var $export$Z = _export$1;
	var toAbsoluteIndex$3 = _toAbsoluteIndex;
	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export$Z($export$Z.S + $export$Z.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (toAbsoluteIndex$3(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

	var $export$Y = _export$1;
	var toIObject$5 = _toIobject;
	var toLength$h = _toLength;

	$export$Y($export$Y.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = toIObject$5(callSite.raw);
	    var len = toLength$h(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	var toInteger$4 = _toInteger;
	var defined$4 = _defined;
	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined$4(that));
	    var i = toInteger$4(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var _iterCreate;
	var hasRequired_iterCreate;

	function require_iterCreate () {
		if (hasRequired_iterCreate) return _iterCreate;
		hasRequired_iterCreate = 1;
		var create = _objectCreate;
		var descriptor = _propertyDesc$1;
		var setToStringTag = _setToStringTag;
		var IteratorPrototype = {};

		// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
		_hide$1(IteratorPrototype, _wksExports('iterator'), function () { return this; });

		_iterCreate = function (Constructor, NAME, next) {
		  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
		  setToStringTag(Constructor, NAME + ' Iterator');
		};
		return _iterCreate;
	}

	var $export$X = _export$1;
	var redefine$4 = _redefineExports;
	var hide$5 = _hide$1;
	var Iterators$5 = _iterators;
	var $iterCreate = require_iterCreate();
	var setToStringTag$1 = _setToStringTag;
	var getPrototypeOf$3 = _objectGpo;
	var ITERATOR$4 = _wksExports('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$4] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf$3($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag$1(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (typeof IteratorPrototype[ITERATOR$4] != 'function') hide$5(IteratorPrototype, ITERATOR$4, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((BUGGY || VALUES_BUG || !proto[ITERATOR$4])) {
	    hide$5(proto, ITERATOR$4, $default);
	  }
	  // Plug for library
	  Iterators$5[NAME] = $default;
	  Iterators$5[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine$4(proto, key, methods[key]);
	    } else $export$X($export$X.P + $export$X.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at$1 = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at$1(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var $export$W = _export$1;
	var $at = _stringAt(false);
	$export$W($export$W.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at(this, pos);
	  }
	});

	// 7.2.8 IsRegExp(argument)
	var isObject$f = _isObject$1;
	var cof$1 = _cof;
	var MATCH = _wksExports('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return isObject$f(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof$1(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp$2 = _isRegexp;
	var defined$3 = _defined;

	var _stringContext = function (that, searchString, NAME) {
	  if (isRegExp$2(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined$3(that));
	};

	var _failsIsRegexp;
	var hasRequired_failsIsRegexp;

	function require_failsIsRegexp () {
		if (hasRequired_failsIsRegexp) return _failsIsRegexp;
		hasRequired_failsIsRegexp = 1;
		var MATCH = _wksExports('match');
		_failsIsRegexp = function (KEY) {
		  var re = /./;
		  try {
		    '/./'[KEY](re);
		  } catch (e) {
		    try {
		      re[MATCH] = false;
		      return !'/./'[KEY](re);
		    } catch (f) { /* empty */ }
		  } return true;
		};
		return _failsIsRegexp;
	}

	var $export$V = _export$1;
	var toLength$g = _toLength;
	var context$2 = _stringContext;
	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	$export$V($export$V.P + $export$V.F * require_failsIsRegexp()(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = context$2(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = toLength$g(that.length);
	    var end = endPosition === undefined ? len : Math.min(toLength$g(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var $export$U = _export$1;
	var context$1 = _stringContext;
	var INCLUDES = 'includes';

	$export$U($export$U.P + $export$U.F * require_failsIsRegexp()(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~context$1(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $export$T = _export$1;

	$export$T($export$T.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: _stringRepeat
	});

	var $export$S = _export$1;
	var toLength$f = _toLength;
	var context = _stringContext;
	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	$export$S($export$S.P + $export$S.F * require_failsIsRegexp()(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = context(this, searchString, STARTS_WITH);
	    var index = toLength$f(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var $export$R = _export$1;
	var fails$8 = _fails$1;
	var defined$2 = _defined;
	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
	  var S = String(defined$2(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	var _stringHtml = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export$R($export$R.P + $export$R.F * fails$8(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

	// B.2.3.2 String.prototype.anchor(name)
	_stringHtml('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

	// B.2.3.3 String.prototype.big()
	_stringHtml('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

	// B.2.3.4 String.prototype.blink()
	_stringHtml('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

	// B.2.3.5 String.prototype.bold()
	_stringHtml('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

	// B.2.3.6 String.prototype.fixed()
	_stringHtml('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

	// B.2.3.7 String.prototype.fontcolor(color)
	_stringHtml('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

	// B.2.3.8 String.prototype.fontsize(size)
	_stringHtml('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

	// B.2.3.9 String.prototype.italics()
	_stringHtml('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

	// B.2.3.10 String.prototype.link(url)
	_stringHtml('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

	// B.2.3.11 String.prototype.small()
	_stringHtml('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

	// B.2.3.12 String.prototype.strike()
	_stringHtml('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

	// B.2.3.13 String.prototype.sub()
	_stringHtml('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

	// B.2.3.14 String.prototype.sup()
	_stringHtml('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export$Q = _export$1;

	$export$Q($export$Q.S, 'Date', { now: function () { return new Date().getTime(); } });

	var $export$P = _export$1;
	var toObject$7 = _toObject;
	var toPrimitive$3 = _toPrimitive$1;

	$export$P($export$P.P + $export$P.F * _fails$1(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	}), 'Date', {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = toObject$7(this);
	    var pv = toPrimitive$3(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var fails$7 = _fails$1;
	var getTime$1 = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;

	var lz = function (num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	var _dateToIsoString = (fails$7(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !fails$7(function () {
	  $toISOString.call(new Date(NaN));
	})) ? function toISOString() {
	  if (!isFinite(getTime$1.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export$O = _export$1;
	var toISOString = _dateToIsoString;

	// PhantomJS / old WebKit has a broken implementations
	$export$O($export$O.P + $export$O.F * (Date.prototype.toISOString !== toISOString), 'Date', {
	  toISOString: toISOString
	});

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING$1 = 'toString';
	var $toString$1 = DateProto[TO_STRING$1];
	var getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefineExports(DateProto, TO_STRING$1, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString$1.call(this) : INVALID_DATE;
	  });
	}

	var _dateToPrimitive;
	var hasRequired_dateToPrimitive;

	function require_dateToPrimitive () {
		if (hasRequired_dateToPrimitive) return _dateToPrimitive;
		hasRequired_dateToPrimitive = 1;
		var anObject = _anObject$1;
		var toPrimitive = _toPrimitive$1;
		var NUMBER = 'number';

		_dateToPrimitive = function (hint) {
		  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
		  return toPrimitive(anObject(this), hint != NUMBER);
		};
		return _dateToPrimitive;
	}

	var TO_PRIMITIVE = _wksExports('toPrimitive');
	var proto$3 = Date.prototype;

	if (!(TO_PRIMITIVE in proto$3)) _hide$1(proto$3, TO_PRIMITIVE, require_dateToPrimitive());

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export$N = _export$1;

	$export$N($export$N.S, 'Array', { isArray: _isArray });

	// call something on iterator step with safe closing on error
	var anObject$o = _anObject$1;
	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject$o(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject$o(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator
	var Iterators$4 = _iterators;
	var ITERATOR$3 = _wksExports('iterator');
	var ArrayProto$2 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (Iterators$4.Array === it || ArrayProto$2[ITERATOR$3] === it);
	};

	var $defineProperty = _objectDp$1;
	var createDesc$2 = _propertyDesc$1;

	var _createProperty = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc$2(0, value));
	  else object[index] = value;
	};

	var classof$3 = _classof;
	var ITERATOR$2 = _wksExports('iterator');
	var Iterators$3 = _iterators;
	var core_getIteratorMethod = _coreExports$1.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || Iterators$3[classof$3(it)];
	};

	var _iterDetect;
	var hasRequired_iterDetect;

	function require_iterDetect () {
		if (hasRequired_iterDetect) return _iterDetect;
		hasRequired_iterDetect = 1;
		var ITERATOR = _wksExports('iterator');
		var SAFE_CLOSING = false;

		try {
		  var riter = [7][ITERATOR]();
		  riter['return'] = function () { SAFE_CLOSING = true; };
		  // eslint-disable-next-line no-throw-literal
		  Array.from(riter, function () { throw 2; });
		} catch (e) { /* empty */ }

		_iterDetect = function (exec, skipClosing) {
		  if (!skipClosing && !SAFE_CLOSING) return false;
		  var safe = false;
		  try {
		    var arr = [7];
		    var iter = arr[ITERATOR]();
		    iter.next = function () { return { done: safe = true }; };
		    arr[ITERATOR] = function () { return iter; };
		    exec(arr);
		  } catch (e) { /* empty */ }
		  return safe;
		};
		return _iterDetect;
	}

	var ctx$8 = _ctx$1;
	var $export$M = _export$1;
	var toObject$6 = _toObject;
	var call$1 = _iterCall;
	var isArrayIter$2 = _isArrayIter;
	var toLength$e = _toLength;
	var createProperty$2 = _createProperty;
	var getIterFn$2 = core_getIteratorMethod;

	$export$M($export$M.S + $export$M.F * !require_iterDetect()(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject$6(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn$2(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx$8(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter$2(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty$2(result, index, mapping ? call$1(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength$e(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty$2(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var $export$L = _export$1;
	var createProperty$1 = _createProperty;

	// WebKit Array.of isn't generic
	$export$L($export$L.S + $export$L.F * _fails$1(function () {
	  function F() { /* empty */ }
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) createProperty$1(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

	var fails$6 = _fails$1;

	var _strictMethod = function (method, arg) {
	  return !!method && fails$6(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	// 22.1.3.13 Array.prototype.join(separator)
	var $export$K = _export$1;
	var toIObject$4 = _toIobject;
	var arrayJoin$1 = [].join;

	// fallback for not array-like strings
	$export$K($export$K.P + $export$K.F * (require_iobject() != Object || !_strictMethod(arrayJoin$1)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin$1.call(toIObject$4(this), separator === undefined ? ',' : separator);
	  }
	});

	var $export$J = _export$1;
	var html$1 = _html;
	var cof = _cof;
	var toAbsoluteIndex$2 = _toAbsoluteIndex;
	var toLength$d = _toLength;
	var arraySlice$1 = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	$export$J($export$J.P + $export$J.F * _fails$1(function () {
	  if (html$1) arraySlice$1.call(html$1);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = toLength$d(this.length);
	    var klass = cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
	    var start = toAbsoluteIndex$2(begin, len);
	    var upTo = toAbsoluteIndex$2(end, len);
	    var size = toLength$d(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

	var $export$I = _export$1;
	var aFunction$8 = _aFunction$1;
	var toObject$5 = _toObject;
	var fails$5 = _fails$1;
	var $sort = [].sort;
	var test = [1, 2, 3];

	$export$I($export$I.P + $export$I.F * (fails$5(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !fails$5(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(toObject$5(this))
	      : $sort.call(toObject$5(this), aFunction$8(comparefn));
	  }
	});

	var isObject$e = _isObject$1;
	var isArray$1 = _isArray;
	var SPECIES$3 = _wksExports('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (isArray$1(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$1(C.prototype))) C = undefined;
	    if (isObject$e(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor$5 = _arraySpeciesConstructor;

	var _arraySpeciesCreate = function (original, length) {
	  return new (speciesConstructor$5(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx$7 = _ctx$1;
	var IObject$1 = require_iobject();
	var toObject$4 = _toObject;
	var toLength$c = _toLength;
	var asc = _arraySpeciesCreate;
	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject$4($this);
	    var self = IObject$1(O);
	    var f = ctx$7(callbackfn, that, 3);
	    var length = toLength$c(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var $export$H = _export$1;
	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	$export$H($export$H.P + $export$H.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $export$G = _export$1;
	var $map$1 = _arrayMethods(1);

	$export$G($export$G.P + $export$G.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map$1(this, callbackfn, arguments[1]);
	  }
	});

	var $export$F = _export$1;
	var $filter = _arrayMethods(2);

	$export$F($export$F.P + $export$F.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $export$E = _export$1;
	var $some = _arrayMethods(3);

	$export$E($export$E.P + $export$E.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var $export$D = _export$1;
	var $every = _arrayMethods(4);

	$export$D($export$D.P + $export$D.F * !_strictMethod([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var aFunction$7 = _aFunction$1;
	var toObject$3 = _toObject;
	var IObject = require_iobject();
	var toLength$b = _toLength;

	var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
	  aFunction$7(callbackfn);
	  var O = toObject$3(that);
	  var self = IObject(O);
	  var length = toLength$b(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

	var $export$C = _export$1;
	var $reduce$1 = _arrayReduce;

	$export$C($export$C.P + $export$C.F * !_strictMethod([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce$1(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	var $export$B = _export$1;
	var $reduce = _arrayReduce;

	$export$B($export$B.P + $export$B.F * !_strictMethod([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

	var $export$A = _export$1;
	var $indexOf = _arrayIncludes(false);
	var $native$1 = [].indexOf;
	var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].indexOf(1, -0) < 0;

	$export$A($export$A.P + $export$A.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO$1
	      // convert -0 to +0
	      ? $native$1.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var $export$z = _export$1;
	var toIObject$3 = _toIobject;
	var toInteger$3 = _toInteger;
	var toLength$a = _toLength;
	var $native = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	$export$z($export$z.P + $export$z.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	    var O = toIObject$3(this);
	    var length = toLength$a(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, toInteger$3(arguments[1]));
	    if (index < 0) index = length + index;
	    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
	    return -1;
	  }
	});

	var _arrayCopyWithin;
	var hasRequired_arrayCopyWithin;

	function require_arrayCopyWithin () {
		if (hasRequired_arrayCopyWithin) return _arrayCopyWithin;
		hasRequired_arrayCopyWithin = 1;
		var toObject = _toObject;
		var toAbsoluteIndex = _toAbsoluteIndex;
		var toLength = _toLength;

		_arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
		  var O = toObject(this);
		  var len = toLength(O.length);
		  var to = toAbsoluteIndex(target, len);
		  var from = toAbsoluteIndex(start, len);
		  var end = arguments.length > 2 ? arguments[2] : undefined;
		  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
		  var inc = 1;
		  if (from < to && to < from + count) {
		    inc = -1;
		    from += count - 1;
		    to += count - 1;
		  }
		  while (count-- > 0) {
		    if (from in O) O[to] = O[from];
		    else delete O[to];
		    to += inc;
		    from += inc;
		  } return O;
		};
		return _arrayCopyWithin;
	}

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wksExports('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) _hide$1(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export$y = _export$1;

	$export$y($export$y.P, 'Array', { copyWithin: require_arrayCopyWithin() });

	_addToUnscopables('copyWithin');

	var _arrayFill;
	var hasRequired_arrayFill;

	function require_arrayFill () {
		if (hasRequired_arrayFill) return _arrayFill;
		hasRequired_arrayFill = 1;
		var toObject = _toObject;
		var toAbsoluteIndex = _toAbsoluteIndex;
		var toLength = _toLength;
		_arrayFill = function fill(value /* , start = 0, end = @length */) {
		  var O = toObject(this);
		  var length = toLength(O.length);
		  var aLen = arguments.length;
		  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
		  var end = aLen > 2 ? arguments[2] : undefined;
		  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
		  while (endPos > index) O[index++] = value;
		  return O;
		};
		return _arrayFill;
	}

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export$x = _export$1;

	$export$x($export$x.P, 'Array', { fill: require_arrayFill() });

	_addToUnscopables('fill');

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export$w = _export$1;
	var $find$1 = _arrayMethods(5);
	var KEY$1 = 'find';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	$export$w($export$w.P + $export$w.F * forced$1, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export$v = _export$1;
	var $find = _arrayMethods(6);
	var KEY = 'findIndex';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export$v($export$v.P + $export$v.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	var global$e = _globalExports;
	var dP$7 = _objectDp$1;
	var DESCRIPTORS$3 = _descriptors$1;
	var SPECIES$2 = _wksExports('species');

	var _setSpecies = function (KEY) {
	  var C = global$e[KEY];
	  if (DESCRIPTORS$3 && C && !C[SPECIES$2]) dP$7.f(C, SPECIES$2, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	_setSpecies('Array');

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var addToUnscopables = _addToUnscopables;
	var step$1 = _iterStep;
	var Iterators$2 = _iterators;
	var toIObject$2 = _toIobject;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject$2(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step$1(1);
	  }
	  if (kind == 'keys') return step$1(0, index);
	  if (kind == 'values') return step$1(0, O[index]);
	  return step$1(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators$2.Arguments = Iterators$2.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// 21.2.5.3 get RegExp.prototype.flags
	var anObject$n = _anObject$1;
	var _flags = function () {
	  var that = anObject$n(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var global$d = _globalExports;
	var inheritIfRequired$1 = _inheritIfRequired;
	var dP$6 = _objectDp$1.f;
	var gOPN$2 = _objectGopn.f;
	var isRegExp$1 = _isRegexp;
	var $flags$1 = _flags;
	var $RegExp = global$d.RegExp;
	var Base = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors$1 && (!CORRECT_NEW || _fails$1(function () {
	  re2[_wksExports('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = isRegExp$1(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired$1(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags$1.call(p) : f)
	      , tiRE ? this : proto$2, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$6($RegExp, key, {
	      configurable: true,
	      get: function () { return Base[key]; },
	      set: function (it) { Base[key] = it; }
	    });
	  };
	  for (var keys = gOPN$2(Base), i$2 = 0; keys.length > i$2;) proxy(keys[i$2++]);
	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;
	  _redefineExports(global$d, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	var regexpFlags = _flags;

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX$1 = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX$1] !== 0 || re2[LAST_INDEX$1] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX$1];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX$1] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	var regexpExec$2 = _regexpExec;
	_export$1({
	  }, {
	  exec: regexpExec$2
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors$1 && /./g.flags != 'g') _objectDp$1.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var anObject$m = _anObject$1;
	var $flags = _flags;
	var DESCRIPTORS$2 = _descriptors$1;
	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  _redefineExports(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails$1(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = anObject$m(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS$2 && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var classof$2 = _classof;
	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (classof$2(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	var redefine$3 = _redefineExports;
	var hide$4 = _hide$1;
	var fails$4 = _fails$1;
	var defined$1 = _defined;
	var wks$2 = _wksExports;
	var regexpExec$1 = _regexpExec;

	var SPECIES$1 = wks$2('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = wks$2(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$4(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails$4(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$1] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      defined$1,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === regexpExec$1) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    redefine$3(String.prototype, KEY, strfn);
	    hide$4(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	var anObject$l = _anObject$1;
	var toLength$9 = _toLength;
	var advanceStringIndex$2 = _advanceStringIndex;
	var regExpExec$2 = _regexpExecAbstract;

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = anObject$l(regexp);
	      var S = String(this);
	      if (!rx.global) return regExpExec$2(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec$2(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$9(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var anObject$k = _anObject$1;
	var toObject$2 = _toObject;
	var toLength$8 = _toLength;
	var toInteger$2 = _toInteger;
	var advanceStringIndex$1 = _advanceStringIndex;
	var regExpExec$1 = _regexpExecAbstract;
	var max = Math.max;
	var min = Math.min;
	var floor = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = anObject$k(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec$1(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$8(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max(min(toInteger$2(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject$2(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var anObject$j = _anObject$1;
	var sameValue = _sameValue;
	var regExpExec = _regexpExecAbstract;

	// @@search logic
	_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[SEARCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative($search, regexp, this);
	      if (res.done) return res.value;
	      var rx = anObject$j(regexp);
	      var S = String(this);
	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regExpExec(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject$i = _anObject$1;
	var aFunction$6 = _aFunction$1;
	var SPECIES = _wksExports('species');
	var _speciesConstructor = function (O, D) {
	  var C = anObject$i(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$i(C)[SPECIES]) == undefined ? D : aFunction$6(S);
	};

	var isRegExp = _isRegexp;
	var anObject$h = _anObject$1;
	var speciesConstructor$4 = _speciesConstructor;
	var advanceStringIndex = _advanceStringIndex;
	var toLength$7 = _toLength;
	var callRegExpExec = _regexpExecAbstract;
	var regexpExec = _regexpExec;
	var fails$3 = _fails$1;
	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails$3(function () { RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = anObject$h(regexp);
	      var S = String(this);
	      var C = speciesConstructor$4(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(toLength$7(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _forOf = {exports: {}};

	var ctx$6 = _ctx$1;
	var call = _iterCall;
	var isArrayIter$1 = _isArrayIter;
	var anObject$g = _anObject$1;
	var toLength$6 = _toLength;
	var getIterFn$1 = core_getIteratorMethod;
	var BREAK = {};
	var RETURN = {};
	var exports$1 = _forOf.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn$1(iterable);
	  var f = ctx$6(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter$1(iterFn)) for (length = toLength$6(iterable.length); length > index; index++) {
	    result = entries ? f(anObject$g(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports$1.BREAK = BREAK;
	exports$1.RETURN = RETURN;

	var _forOfExports = _forOf.exports;

	var ctx$5 = _ctx$1;
	var invoke = _invoke;
	var html = _html;
	var cel = _domCreate$1;
	var global$c = _globalExports;
	var process$2 = global$c.process;
	var setTask = global$c.setImmediate;
	var clearTask = global$c.clearImmediate;
	var MessageChannel = global$c.MessageChannel;
	var Dispatch = global$c.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process$2) == 'process') {
	    defer = function (id) {
	      process$2.nextTick(ctx$5(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx$5(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx$5(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global$c.addEventListener && typeof postMessage == 'function' && !global$c.importScripts) {
	    defer = function (id) {
	      global$c.postMessage(id + '', '*');
	    };
	    global$c.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx$5(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var global$b = _globalExports;
	var macrotask = _task.set;
	var Observer = global$b.MutationObserver || global$b.WebKitMutationObserver;
	var process$1 = global$b.process;
	var Promise$1 = global$b.Promise;
	var isNode$1 = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode$1 && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode$1) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global$b.navigator && global$b.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$b, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	var _newPromiseCapability = {};

	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction$5 = _aFunction$1;

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$5(resolve);
	  this.reject = aFunction$5(reject);
	}

	_newPromiseCapability.f = function (C) {
	  return new PromiseCapability(C);
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var global$a = _globalExports;
	var navigator = global$a.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var anObject$f = _anObject$1;
	var isObject$d = _isObject$1;
	var newPromiseCapability$1 = _newPromiseCapability;

	var _promiseResolve = function (C, x) {
	  anObject$f(C);
	  if (isObject$d(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll;
	var hasRequired_redefineAll;

	function require_redefineAll () {
		if (hasRequired_redefineAll) return _redefineAll;
		hasRequired_redefineAll = 1;
		var redefine = _redefineExports;
		_redefineAll = function (target, src, safe) {
		  for (var key in src) redefine(target, key, src[key], safe);
		  return target;
		};
		return _redefineAll;
	}

	var global$9 = _globalExports;
	var ctx$4 = _ctx$1;
	var classof$1 = _classof;
	var $export$u = _export$1;
	var isObject$c = _isObject$1;
	var aFunction$4 = _aFunction$1;
	var anInstance$4 = _anInstance;
	var forOf$3 = _forOfExports;
	var speciesConstructor$3 = _speciesConstructor;
	var task = _task.set;
	var microtask = _microtask();
	var newPromiseCapabilityModule = _newPromiseCapability;
	var perform = _perform;
	var userAgent$3 = _userAgent;
	var promiseResolve$1 = _promiseResolve;
	var PROMISE = 'Promise';
	var TypeError$2 = global$9.TypeError;
	var process = global$9.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = global$9[PROMISE];
	var isNode = classof$1(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wksExports('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && userAgent$3.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$c(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$2('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global$9, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global$9.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global$9.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global$9, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global$9.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$2("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx$4($resolve, wrapper, 1), ctx$4($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance$4(this, $Promise, PROMISE, '_h');
	    aFunction$4(executor);
	    Internal.call(this);
	    try {
	      executor(ctx$4($resolve, this, 1), ctx$4($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = require_redefineAll()($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor$3(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx$4($resolve, promise, 1);
	    this.reject = ctx$4($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export$u($export$u.G + $export$u.W + $export$u.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _coreExports$1[PROMISE];

	// statics
	$export$u($export$u.S + $export$u.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export$u($export$u.S + $export$u.F * (!USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve$1(this, x);
	  }
	});
	$export$u($export$u.S + $export$u.F * !(USE_NATIVE && require_iterDetect()(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf$3(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf$3(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var isObject$b = _isObject$1;
	var _validateCollection = function (it, TYPE) {
	  if (!isObject$b(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$5 = _objectDp$1.f;
	var create$2 = _objectCreate;
	var redefineAll$3 = require_redefineAll();
	var ctx$3 = _ctx$1;
	var anInstance$3 = _anInstance;
	var forOf$2 = _forOfExports;
	var $iterDefine = _iterDefine;
	var step = _iterStep;
	var setSpecies$1 = _setSpecies;
	var DESCRIPTORS$1 = _descriptors$1;
	var fastKey = _metaExports.fastKey;
	var validate$6 = _validateCollection;
	var SIZE = DESCRIPTORS$1 ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance$3(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = create$2(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) forOf$2(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll$3(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = validate$6(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = validate$6(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        validate$6(this, NAME);
	        var f = ctx$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(validate$6(this, NAME), key);
	      }
	    });
	    if (DESCRIPTORS$1) dP$5(C.prototype, 'size', {
	      get: function () {
	        return validate$6(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = validate$6(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies$1(NAME);
	  }
	};

	var global$8 = _globalExports;
	var $export$t = _export$1;
	var redefine$2 = _redefineExports;
	var redefineAll$2 = require_redefineAll();
	var meta$1 = _metaExports;
	var forOf$1 = _forOfExports;
	var anInstance$2 = _anInstance;
	var isObject$a = _isObject$1;
	var fails$2 = _fails$1;
	var $iterDetect$1 = require_iterDetect();
	var setToStringTag = _setToStringTag;
	var inheritIfRequired = _inheritIfRequired;

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global$8[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    redefine$2(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !isObject$a(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !isObject$a(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !isObject$a(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails$2(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll$2(C.prototype, methods);
	    meta$1.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails$2(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = $iterDetect$1(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails$2(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance$2(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf$1(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export$t($export$t.G + $export$t.W + $export$t.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var strong$1 = _collectionStrong;
	var validate$5 = _validateCollection;
	var MAP = 'Map';

	// 23.1 Map Objects
	_collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong$1.getEntry(validate$5(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong$1.def(validate$5(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, strong$1, true);

	var strong = _collectionStrong;
	var validate$4 = _validateCollection;
	var SET = 'Set';

	// 23.2 Set Objects
	_collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(validate$4(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, strong);

	var redefineAll$1 = require_redefineAll();
	var getWeak$1 = _metaExports.getWeak;
	var anObject$e = _anObject$1;
	var isObject$9 = _isObject$1;
	var anInstance$1 = _anInstance;
	var forOf = _forOfExports;
	var createArrayMethod$1 = _arrayMethods;
	var $has = _has$1;
	var validate$3 = _validateCollection;
	var arrayFind$1 = createArrayMethod$1(5);
	var arrayFindIndex$1 = createArrayMethod$1(6);
	var id = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore$1 = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind$1(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex$1(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance$1(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll$1(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!isObject$9(key)) return false;
	        var data = getWeak$1(key);
	        if (data === true) return uncaughtFrozenStore$1(validate$3(this, NAME))['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject$9(key)) return false;
	        var data = getWeak$1(key);
	        if (data === true) return uncaughtFrozenStore$1(validate$3(this, NAME)).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak$1(anObject$e(key), true);
	    if (data === true) uncaughtFrozenStore$1(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore$1
	};

	var global$7 = _globalExports;
	var each = _arrayMethods(0);
	var redefine$1 = _redefineExports;
	var meta = _metaExports;
	var assign = _objectAssign;
	var weak$1 = _collectionWeak;
	var isObject$8 = _isObject$1;
	var validate$2 = _validateCollection;
	var NATIVE_WEAK_MAP = _validateCollection;
	var IS_IE11 = !global$7.ActiveXObject && 'ActiveXObject' in global$7;
	var WEAK_MAP = 'WeakMap';
	var getWeak = meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = weak$1.ufstore;
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject$8(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(validate$2(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak$1.def(validate$2(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = _collection(WEAK_MAP, wrapper, methods, weak$1, true, true);

	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = weak$1.getConstructor(wrapper, WEAK_MAP);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    redefine$1(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject$8(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

	var weak = _collectionWeak;
	var validate$1 = _validateCollection;
	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	_collection(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(validate$1(this, WEAK_SET), value, true);
	  }
	}, weak, false, true);

	var global$6 = _globalExports;
	var hide$3 = _hide$1;
	var uid$1 = _uid;
	var TYPED = uid$1('typed_array');
	var VIEW$2 = uid$1('view');
	var ABV = !!(global$6.ArrayBuffer && global$6.DataView);
	var CONSTR = ABV;
	var i$1 = 0;
	var l = 9;
	var Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while (i$1 < l) {
	  if (Typed = global$6[TypedArrayConstructors[i$1++]]) {
	    hide$3(Typed.prototype, TYPED, true);
	    hide$3(Typed.prototype, VIEW$2, true);
	  } else CONSTR = false;
	}

	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW$2
	};

	var _typedBuffer = {};

	// https://tc39.github.io/ecma262/#sec-toindex
	var toInteger$1 = _toInteger;
	var toLength$5 = _toLength;
	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger$1(it);
	  var length = toLength$5(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	(function (exports$1) {
		var global = _globalExports;
		var DESCRIPTORS = _descriptors$1;
		var $typed = _typed;
		var hide = _hide$1;
		var redefineAll = require_redefineAll();
		var fails = _fails$1;
		var anInstance = _anInstance;
		var toInteger = _toInteger;
		var toLength = _toLength;
		var toIndex = _toIndex;
		var gOPN = _objectGopn.f;
		var dP = _objectDp$1.f;
		var arrayFill = require_arrayFill();
		var setToStringTag = _setToStringTag;
		var ARRAY_BUFFER = 'ArrayBuffer';
		var DATA_VIEW = 'DataView';
		var PROTOTYPE = 'prototype';
		var WRONG_LENGTH = 'Wrong length!';
		var WRONG_INDEX = 'Wrong index!';
		var $ArrayBuffer = global[ARRAY_BUFFER];
		var $DataView = global[DATA_VIEW];
		var Math = global.Math;
		var RangeError = global.RangeError;
		// eslint-disable-next-line no-shadow-restricted-names
		var Infinity = global.Infinity;
		var BaseBuffer = $ArrayBuffer;
		var abs = Math.abs;
		var pow = Math.pow;
		var floor = Math.floor;
		var log = Math.log;
		var LN2 = Math.LN2;
		var BUFFER = 'buffer';
		var BYTE_LENGTH = 'byteLength';
		var BYTE_OFFSET = 'byteOffset';
		var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
		var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
		var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

		// IEEE754 conversions based on https://github.com/feross/ieee754
		function packIEEE754(value, mLen, nBytes) {
		  var buffer = new Array(nBytes);
		  var eLen = nBytes * 8 - mLen - 1;
		  var eMax = (1 << eLen) - 1;
		  var eBias = eMax >> 1;
		  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
		  var i = 0;
		  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
		  var e, m, c;
		  value = abs(value);
		  // eslint-disable-next-line no-self-compare
		  if (value != value || value === Infinity) {
		    // eslint-disable-next-line no-self-compare
		    m = value != value ? 1 : 0;
		    e = eMax;
		  } else {
		    e = floor(log(value) / LN2);
		    if (value * (c = pow(2, -e)) < 1) {
		      e--;
		      c *= 2;
		    }
		    if (e + eBias >= 1) {
		      value += rt / c;
		    } else {
		      value += rt * pow(2, 1 - eBias);
		    }
		    if (value * c >= 2) {
		      e++;
		      c /= 2;
		    }
		    if (e + eBias >= eMax) {
		      m = 0;
		      e = eMax;
		    } else if (e + eBias >= 1) {
		      m = (value * c - 1) * pow(2, mLen);
		      e = e + eBias;
		    } else {
		      m = value * pow(2, eBias - 1) * pow(2, mLen);
		      e = 0;
		    }
		  }
		  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
		  e = e << mLen | m;
		  eLen += mLen;
		  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
		  buffer[--i] |= s * 128;
		  return buffer;
		}
		function unpackIEEE754(buffer, mLen, nBytes) {
		  var eLen = nBytes * 8 - mLen - 1;
		  var eMax = (1 << eLen) - 1;
		  var eBias = eMax >> 1;
		  var nBits = eLen - 7;
		  var i = nBytes - 1;
		  var s = buffer[i--];
		  var e = s & 127;
		  var m;
		  s >>= 7;
		  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
		  m = e & (1 << -nBits) - 1;
		  e >>= -nBits;
		  nBits += mLen;
		  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
		  if (e === 0) {
		    e = 1 - eBias;
		  } else if (e === eMax) {
		    return m ? NaN : s ? -Infinity : Infinity;
		  } else {
		    m = m + pow(2, mLen);
		    e = e - eBias;
		  } return (s ? -1 : 1) * m * pow(2, e - mLen);
		}

		function unpackI32(bytes) {
		  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
		}
		function packI8(it) {
		  return [it & 0xff];
		}
		function packI16(it) {
		  return [it & 0xff, it >> 8 & 0xff];
		}
		function packI32(it) {
		  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
		}
		function packF64(it) {
		  return packIEEE754(it, 52, 8);
		}
		function packF32(it) {
		  return packIEEE754(it, 23, 4);
		}

		function addGetter(C, key, internal) {
		  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
		}

		function get(view, bytes, index, isLittleEndian) {
		  var numIndex = +index;
		  var intIndex = toIndex(numIndex);
		  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
		  var store = view[$BUFFER]._b;
		  var start = intIndex + view[$OFFSET];
		  var pack = store.slice(start, start + bytes);
		  return isLittleEndian ? pack : pack.reverse();
		}
		function set(view, bytes, index, conversion, value, isLittleEndian) {
		  var numIndex = +index;
		  var intIndex = toIndex(numIndex);
		  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
		  var store = view[$BUFFER]._b;
		  var start = intIndex + view[$OFFSET];
		  var pack = conversion(+value);
		  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
		}

		if (!$typed.ABV) {
		  $ArrayBuffer = function ArrayBuffer(length) {
		    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
		    var byteLength = toIndex(length);
		    this._b = arrayFill.call(new Array(byteLength), 0);
		    this[$LENGTH] = byteLength;
		  };

		  $DataView = function DataView(buffer, byteOffset, byteLength) {
		    anInstance(this, $DataView, DATA_VIEW);
		    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
		    var bufferLength = buffer[$LENGTH];
		    var offset = toInteger(byteOffset);
		    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
		    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
		    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
		    this[$BUFFER] = buffer;
		    this[$OFFSET] = offset;
		    this[$LENGTH] = byteLength;
		  };

		  if (DESCRIPTORS) {
		    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
		    addGetter($DataView, BUFFER, '_b');
		    addGetter($DataView, BYTE_LENGTH, '_l');
		    addGetter($DataView, BYTE_OFFSET, '_o');
		  }

		  redefineAll($DataView[PROTOTYPE], {
		    getInt8: function getInt8(byteOffset) {
		      return get(this, 1, byteOffset)[0] << 24 >> 24;
		    },
		    getUint8: function getUint8(byteOffset) {
		      return get(this, 1, byteOffset)[0];
		    },
		    getInt16: function getInt16(byteOffset /* , littleEndian */) {
		      var bytes = get(this, 2, byteOffset, arguments[1]);
		      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
		    },
		    getUint16: function getUint16(byteOffset /* , littleEndian */) {
		      var bytes = get(this, 2, byteOffset, arguments[1]);
		      return bytes[1] << 8 | bytes[0];
		    },
		    getInt32: function getInt32(byteOffset /* , littleEndian */) {
		      return unpackI32(get(this, 4, byteOffset, arguments[1]));
		    },
		    getUint32: function getUint32(byteOffset /* , littleEndian */) {
		      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
		    },
		    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
		      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
		    },
		    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
		      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
		    },
		    setInt8: function setInt8(byteOffset, value) {
		      set(this, 1, byteOffset, packI8, value);
		    },
		    setUint8: function setUint8(byteOffset, value) {
		      set(this, 1, byteOffset, packI8, value);
		    },
		    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
		      set(this, 2, byteOffset, packI16, value, arguments[2]);
		    },
		    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
		      set(this, 2, byteOffset, packI16, value, arguments[2]);
		    },
		    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
		      set(this, 4, byteOffset, packI32, value, arguments[2]);
		    },
		    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
		      set(this, 4, byteOffset, packI32, value, arguments[2]);
		    },
		    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
		      set(this, 4, byteOffset, packF32, value, arguments[2]);
		    },
		    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
		      set(this, 8, byteOffset, packF64, value, arguments[2]);
		    }
		  });
		} else {
		  if (!fails(function () {
		    $ArrayBuffer(1);
		  }) || !fails(function () {
		    new $ArrayBuffer(-1); // eslint-disable-line no-new
		  }) || fails(function () {
		    new $ArrayBuffer(); // eslint-disable-line no-new
		    new $ArrayBuffer(1.5); // eslint-disable-line no-new
		    new $ArrayBuffer(NaN); // eslint-disable-line no-new
		    return $ArrayBuffer.name != ARRAY_BUFFER;
		  })) {
		    $ArrayBuffer = function ArrayBuffer(length) {
		      anInstance(this, $ArrayBuffer);
		      return new BaseBuffer(toIndex(length));
		    };
		    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
		    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
		      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
		    }
		    ArrayBufferProto.constructor = $ArrayBuffer;
		  }
		  // iOS Safari 7.x bug
		  var view = new $DataView(new $ArrayBuffer(2));
		  var $setInt8 = $DataView[PROTOTYPE].setInt8;
		  view.setInt8(0, 2147483648);
		  view.setInt8(1, 2147483649);
		  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
		    setInt8: function setInt8(byteOffset, value) {
		      $setInt8.call(this, byteOffset, value << 24 >> 24);
		    },
		    setUint8: function setUint8(byteOffset, value) {
		      $setInt8.call(this, byteOffset, value << 24 >> 24);
		    }
		  }, true);
		}
		setToStringTag($ArrayBuffer, ARRAY_BUFFER);
		setToStringTag($DataView, DATA_VIEW);
		hide($DataView[PROTOTYPE], $typed.VIEW, true);
		exports$1[ARRAY_BUFFER] = $ArrayBuffer;
		exports$1[DATA_VIEW] = $DataView; 
	} (_typedBuffer));

	var $export$s = _export$1;
	var $typed$1 = _typed;
	var buffer = _typedBuffer;
	var anObject$d = _anObject$1;
	var toAbsoluteIndex$1 = _toAbsoluteIndex;
	var toLength$4 = _toLength;
	var isObject$7 = _isObject$1;
	var ArrayBuffer = _globalExports.ArrayBuffer;
	var speciesConstructor$2 = _speciesConstructor;
	var $ArrayBuffer$1 = buffer.ArrayBuffer;
	var $DataView$1 = buffer.DataView;
	var $isView = $typed$1.ABV && ArrayBuffer.isView;
	var $slice$1 = $ArrayBuffer$1.prototype.slice;
	var VIEW$1 = $typed$1.VIEW;
	var ARRAY_BUFFER$1 = 'ArrayBuffer';

	$export$s($export$s.G + $export$s.W + $export$s.F * (ArrayBuffer !== $ArrayBuffer$1), { ArrayBuffer: $ArrayBuffer$1 });

	$export$s($export$s.S + $export$s.F * !$typed$1.CONSTR, ARRAY_BUFFER$1, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || isObject$7(it) && VIEW$1 in it;
	  }
	});

	$export$s($export$s.P + $export$s.U + $export$s.F * _fails$1(function () {
	  return !new $ArrayBuffer$1(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER$1, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice$1 !== undefined && end === undefined) return $slice$1.call(anObject$d(this), start); // FF fix
	    var len = anObject$d(this).byteLength;
	    var first = toAbsoluteIndex$1(start, len);
	    var fin = toAbsoluteIndex$1(end === undefined ? len : end, len);
	    var result = new (speciesConstructor$2(this, $ArrayBuffer$1))(toLength$4(fin - first));
	    var viewS = new $DataView$1(this);
	    var viewT = new $DataView$1(result);
	    var index = 0;
	    while (first < fin) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	_setSpecies(ARRAY_BUFFER$1);

	var $export$r = _export$1;
	$export$r($export$r.G + $export$r.W + $export$r.F * !_typed.ABV, {
	  DataView: _typedBuffer.DataView
	});

	var _typedArray = {exports: {}};

	if (_descriptors$1) {
	  var LIBRARY = _library;
	  var global$5 = _globalExports;
	  var fails$1 = _fails$1;
	  var $export$q = _export$1;
	  var $typed = _typed;
	  var $buffer = _typedBuffer;
	  var ctx$2 = _ctx$1;
	  var anInstance = _anInstance;
	  var propertyDesc = _propertyDesc$1;
	  var hide$2 = _hide$1;
	  var redefineAll = require_redefineAll();
	  var toInteger = _toInteger;
	  var toLength$3 = _toLength;
	  var toIndex = _toIndex;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toPrimitive$2 = _toPrimitive$1;
	  var has$3 = _has$1;
	  var classof = _classof;
	  var isObject$6 = _isObject$1;
	  var toObject$1 = _toObject;
	  var isArrayIter = _isArrayIter;
	  var create$1 = _objectCreate;
	  var getPrototypeOf$2 = _objectGpo;
	  var gOPN$1 = _objectGopn.f;
	  var getIterFn = core_getIteratorMethod;
	  var uid = _uid;
	  var wks$1 = _wksExports;
	  var createArrayMethod = _arrayMethods;
	  var createArrayIncludes = _arrayIncludes;
	  var speciesConstructor$1 = _speciesConstructor;
	  var ArrayIterators = es6_array_iterator;
	  var Iterators$1 = _iterators;
	  var $iterDetect = require_iterDetect();
	  var setSpecies = _setSpecies;
	  var arrayFill = require_arrayFill();
	  var arrayCopyWithin = require_arrayCopyWithin();
	  var $DP = _objectDp$1;
	  var $GOPD = _objectGopd;
	  var dP$4 = $DP.f;
	  var gOPD$5 = $GOPD.f;
	  var RangeError$1 = global$5.RangeError;
	  var TypeError$1 = global$5.TypeError;
	  var Uint8Array = global$5.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE$1 = 'prototype';
	  var ArrayProto = Array[PROTOTYPE$1];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR$1 = wks$1('iterator');
	  var TAG = wks$1('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor$1(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails$1(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE$1].set && fails$1(function () {
	    new Uint8Array(1).set({});
	  });

	  var toOffset = function (it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError$1('Wrong offset!');
	    return offset;
	  };

	  var validate = function (it) {
	    if (isObject$6(it) && TYPED_ARRAY in it) return it;
	    throw TypeError$1(it + ' is not a typed array!');
	  };

	  var allocate = function (C, length) {
	    if (!(isObject$6(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError$1('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor$1(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function (it, key, internal) {
	    dP$4(it, key, { get: function () { return this._d[internal]; } });
	  };

	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject$1(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      } O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx$2(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength$3(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/* ...items */) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails$1(function () { arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto$1 = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) { // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      } return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor$1(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength$3((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject$1(arrayLike);
	    var len = toLength$3(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError$1(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };

	  var $iterators$1 = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function (target, key) {
	    return isObject$6(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive$2(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD$5(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive$2(key, true))
	      && isObject$6(desc)
	      && has$3(desc, 'value')
	      && !has$3(desc, 'get')
	      && !has$3(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has$3(desc, 'writable') || desc.writable)
	      && (!has$3(desc, 'enumerable') || desc.enumerable)
	    ) {
	      target[key] = desc.value;
	      return target;
	    } return dP$4(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export$q($export$q.S + $export$q.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails$1(function () { arrayToString.call({}); })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto$1);
	  redefineAll($TypedArrayPrototype$, $iterators$1);
	  hide$2($TypedArrayPrototype$, ITERATOR$1, $iterators$1.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () { /* noop */ },
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP$4($TypedArrayPrototype$, TAG, {
	    get: function () { return this[TYPED_ARRAY]; }
	  });

	  // eslint-disable-next-line max-statements
	  _typedArray.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global$5[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf$2(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE$1];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP$4(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject$6(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
	          } else {
	            byteLength = toLength$3($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError$1(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide$2(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE$1] = create$1($TypedArrayPrototype$);
	      hide$2(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails$1(function () {
	      TypedArray(1);
	    }) || !fails$1(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject$6(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN$1(Base).concat(gOPN$1(TAC)) : gOPN$1(Base), function (key) {
	        if (!(key in TypedArray)) hide$2(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE$1] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR$1];
	    var CORRECT_ITER_NAME = !!$nativeIterator
	      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators$1.values;
	    hide$2(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide$2(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide$2(TypedArrayPrototype, VIEW, true);
	    hide$2(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP$4(TypedArrayPrototype, TAG, {
	        get: function () { return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export$q($export$q.G + $export$q.W + $export$q.F * (TypedArray != Base), O);

	    $export$q($export$q.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });

	    $export$q($export$q.S + $export$q.F * fails$1(function () { Base.of.call(TypedArray, 1); }), NAME, {
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide$2(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export$q($export$q.P, NAME, proto$1);

	    setSpecies(NAME);

	    $export$q($export$q.P + $export$q.F * FORCED_SET, NAME, { set: $set });

	    $export$q($export$q.P + $export$q.F * !CORRECT_ITER_NAME, NAME, $iterators$1);

	    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

	    $export$q($export$q.P + $export$q.F * fails$1(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export$q($export$q.P + $export$q.F * (fails$1(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails$1(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators$1[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide$2(TypedArrayPrototype, ITERATOR$1, $iterator);
	  };
	} else _typedArray.exports = function () { /* empty */ };

	var _typedArrayExports = _typedArray.exports;

	_typedArrayExports('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	_typedArrayExports('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArrayExports('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export$p = _export$1;
	var aFunction$3 = _aFunction$1;
	var anObject$c = _anObject$1;
	var rApply = (_globalExports.Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	$export$p($export$p.S + $export$p.F * !_fails$1(function () {
	  rApply(function () { /* empty */ });
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = aFunction$3(target);
	    var L = anObject$c(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export$o = _export$1;
	var create = _objectCreate;
	var aFunction$2 = _aFunction$1;
	var anObject$b = _anObject$1;
	var isObject$5 = _isObject$1;
	var fails = _fails$1;
	var bind = _bind;
	var rConstruct = (_globalExports.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	$export$o($export$o.S + $export$o.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction$2(Target);
	    anObject$b(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction$2(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create(isObject$5(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject$5(result) ? result : instance;
	  }
	});

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP$3 = _objectDp$1;
	var $export$n = _export$1;
	var anObject$a = _anObject$1;
	var toPrimitive$1 = _toPrimitive$1;

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export$n($export$n.S + $export$n.F * _fails$1(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(dP$3.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    anObject$a(target);
	    propertyKey = toPrimitive$1(propertyKey, true);
	    anObject$a(attributes);
	    try {
	      dP$3.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export$m = _export$1;
	var gOPD$4 = _objectGopd.f;
	var anObject$9 = _anObject$1;

	$export$m($export$m.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$4(anObject$9(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	// 26.1.5 Reflect.enumerate(target)
	var $export$l = _export$1;
	var anObject$8 = _anObject$1;
	var Enumerate = function (iterated) {
	  this._t = anObject$8(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = [];      // keys
	  var key;
	  for (key in iterated) keys.push(key);
	};
	require_iterCreate()(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	$export$l($export$l.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD$3 = _objectGopd;
	var getPrototypeOf$1 = _objectGpo;
	var has$2 = _has$1;
	var $export$k = _export$1;
	var isObject$4 = _isObject$1;
	var anObject$7 = _anObject$1;

	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (anObject$7(target) === receiver) return target[propertyKey];
	  if (desc = gOPD$3.f(target, propertyKey)) return has$2(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (isObject$4(proto = getPrototypeOf$1(target))) return get(proto, propertyKey, receiver);
	}

	$export$k($export$k.S, 'Reflect', { get: get });

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD$2 = _objectGopd;
	var $export$j = _export$1;
	var anObject$6 = _anObject$1;

	$export$j($export$j.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return gOPD$2.f(anObject$6(target), propertyKey);
	  }
	});

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export$i = _export$1;
	var getProto = _objectGpo;
	var anObject$5 = _anObject$1;

	$export$i($export$i.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return getProto(anObject$5(target));
	  }
	});

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export$h = _export$1;

	$export$h($export$h.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	// 26.1.10 Reflect.isExtensible(target)
	var $export$g = _export$1;
	var anObject$4 = _anObject$1;
	var $isExtensible = Object.isExtensible;

	$export$g($export$g.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    anObject$4(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	// all object keys, includes non-enumerable and symbols
	var gOPN = _objectGopn;
	var gOPS = _objectGops;
	var anObject$3 = _anObject$1;
	var Reflect$1 = _globalExports.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = gOPN.f(anObject$3(it));
	  var getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// 26.1.11 Reflect.ownKeys(target)
	var $export$f = _export$1;

	$export$f($export$f.S, 'Reflect', { ownKeys: _ownKeys });

	// 26.1.12 Reflect.preventExtensions(target)
	var $export$e = _export$1;
	var anObject$2 = _anObject$1;
	var $preventExtensions = Object.preventExtensions;

	$export$e($export$e.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    anObject$2(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP$2 = _objectDp$1;
	var gOPD$1 = _objectGopd;
	var getPrototypeOf = _objectGpo;
	var has$1 = _has$1;
	var $export$d = _export$1;
	var createDesc$1 = _propertyDesc$1;
	var anObject$1 = _anObject$1;
	var isObject$3 = _isObject$1;

	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = gOPD$1.f(anObject$1(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (isObject$3(proto = getPrototypeOf(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc$1(0);
	  }
	  if (has$1(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !isObject$3(receiver)) return false;
	    if (existingDescriptor = gOPD$1.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      dP$2.f(receiver, propertyKey, existingDescriptor);
	    } else dP$2.f(receiver, propertyKey, createDesc$1(0, V));
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export$d($export$d.S, 'Reflect', { set: set });

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export$c = _export$1;
	var setProto = _setProto;

	if (setProto) $export$c($export$c.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// https://github.com/tc39/Array.prototype.includes
	var $export$b = _export$1;
	var $includes = _arrayIncludes(true);

	$export$b($export$b.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	_coreExports$1.Array.includes;

	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
	var isArray = _isArray;
	var isObject$2 = _isObject$1;
	var toLength$2 = _toLength;
	var ctx$1 = _ctx$1;
	var IS_CONCAT_SPREADABLE = _wksExports('isConcatSpreadable');

	function flattenIntoArray$1(target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? ctx$1(mapper, thisArg, 3) : false;
	  var element, spreadable;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      spreadable = false;
	      if (isObject$2(element)) {
	        spreadable = element[IS_CONCAT_SPREADABLE];
	        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
	      }

	      if (spreadable && depth > 0) {
	        targetIndex = flattenIntoArray$1(target, original, element, toLength$2(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	}

	var _flattenIntoArray = flattenIntoArray$1;

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
	var $export$a = _export$1;
	var flattenIntoArray = _flattenIntoArray;
	var toObject = _toObject;
	var toLength$1 = _toLength;
	var aFunction$1 = _aFunction$1;
	var arraySpeciesCreate = _arraySpeciesCreate;

	$export$a($export$a.P, 'Array', {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = toObject(this);
	    var sourceLen, A;
	    aFunction$1(callbackfn);
	    sourceLen = toLength$1(O.length);
	    A = arraySpeciesCreate(O, 0);
	    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
	    return A;
	  }
	});

	_addToUnscopables('flatMap');

	_coreExports$1.Array.flatMap;

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = _toLength;
	var repeat = _stringRepeat;
	var defined = _defined;

	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(defined(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	// https://github.com/tc39/proposal-string-pad-start-end
	var $export$9 = _export$1;
	var $pad$1 = _stringPad;
	var userAgent$2 = _userAgent;

	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent$2);

	$export$9($export$9.P + $export$9.F * WEBKIT_BUG$1, 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return $pad$1(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	_coreExports$1.String.padStart;

	// https://github.com/tc39/proposal-string-pad-start-end
	var $export$8 = _export$1;
	var $pad = _stringPad;
	var userAgent$1 = _userAgent;

	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent$1);

	$export$8($export$8.P + $export$8.F * WEBKIT_BUG, 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	_coreExports$1.String.padEnd;

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

	_coreExports$1.String.trimLeft;

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

	_coreExports$1.String.trimRight;

	_wksDefine('asyncIterator');

	_wksExt.f('asyncIterator');

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export$7 = _export$1;
	var ownKeys = _ownKeys;
	var toIObject$1 = _toIobject;
	var gOPD = _objectGopd;
	var createProperty = _createProperty;

	$export$7($export$7.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject$1(object);
	    var getDesc = gOPD.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	_coreExports$1.Object.getOwnPropertyDescriptors;

	var DESCRIPTORS = _descriptors$1;
	var getKeys$1 = _objectKeys;
	var toIObject = _toIobject;
	var isEnum = require_objectPie().f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it);
	    var keys = getKeys$1(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS || isEnum.call(O, key)) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries
	var $export$6 = _export$1;
	var $values = _objectToArray(false);

	$export$6($export$6.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	_coreExports$1.Object.values;

	// https://github.com/tc39/proposal-object-values-entries
	var $export$5 = _export$1;
	var $entries = _objectToArray(true);

	$export$5($export$5.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	_coreExports$1.Object.entries;

	var $export$4 = _export$1;
	var core$2 = _coreExports$1;
	var global$4 = _globalExports;
	var speciesConstructor = _speciesConstructor;
	var promiseResolve = _promiseResolve;

	$export$4($export$4.P + $export$4.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core$2.Promise || global$4.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	_coreExports$1.Promise['finally'];

	// ie9- setTimeout & setInterval additional parameters fix
	var global$3 = _globalExports;
	var $export$3 = _export$1;
	var userAgent = _userAgent;
	var slice = [].slice;
	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
	var wrap = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	$export$3($export$3.G + $export$3.B + $export$3.F * MSIE, {
	  setTimeout: wrap(global$3.setTimeout),
	  setInterval: wrap(global$3.setInterval)
	});

	var $export$2 = _export$1;
	var $task = _task;
	$export$2($export$2.G + $export$2.B, {
	  setImmediate: $task.set,
	  clearImmediate: $task.clear
	});

	var $iterators = es6_array_iterator;
	var getKeys = _objectKeys;
	var redefine = _redefineExports;
	var global$2 = _globalExports;
	var hide$1 = _hide$1;
	var Iterators = _iterators;
	var wks = _wksExports;
	var ITERATOR = wks('iterator');
	var TO_STRING_TAG = wks('toStringTag');
	var ArrayValues = Iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = global$2[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR]) hide$1(proto, ITERATOR, ArrayValues);
	    if (!proto[TO_STRING_TAG]) hide$1(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
	  }
	}

	var runtime = {exports: {}};

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	(function (module) {
		var runtime = (function (exports$1) {

		  var Op = Object.prototype;
		  var hasOwn = Op.hasOwnProperty;
		  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
		  var undefined$1; // More compressible than void 0.
		  var $Symbol = typeof Symbol === "function" ? Symbol : {};
		  var iteratorSymbol = $Symbol.iterator || "@@iterator";
		  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
		  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

		  function define(obj, key, value) {
		    Object.defineProperty(obj, key, {
		      value: value,
		      enumerable: true,
		      configurable: true,
		      writable: true
		    });
		    return obj[key];
		  }
		  try {
		    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
		    define({}, "");
		  } catch (err) {
		    define = function(obj, key, value) {
		      return obj[key] = value;
		    };
		  }

		  function wrap(innerFn, outerFn, self, tryLocsList) {
		    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
		    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
		    var generator = Object.create(protoGenerator.prototype);
		    var context = new Context(tryLocsList || []);

		    // The ._invoke method unifies the implementations of the .next,
		    // .throw, and .return methods.
		    defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

		    return generator;
		  }
		  exports$1.wrap = wrap;

		  // Try/catch helper to minimize deoptimizations. Returns a completion
		  // record like context.tryEntries[i].completion. This interface could
		  // have been (and was previously) designed to take a closure to be
		  // invoked without arguments, but in all the cases we care about we
		  // already have an existing method we want to call, so there's no need
		  // to create a new function object. We can even get away with assuming
		  // the method takes exactly one argument, since that happens to be true
		  // in every case, so we don't have to touch the arguments object. The
		  // only additional allocation required is the completion record, which
		  // has a stable shape and so hopefully should be cheap to allocate.
		  function tryCatch(fn, obj, arg) {
		    try {
		      return { type: "normal", arg: fn.call(obj, arg) };
		    } catch (err) {
		      return { type: "throw", arg: err };
		    }
		  }

		  var GenStateSuspendedStart = "suspendedStart";
		  var GenStateSuspendedYield = "suspendedYield";
		  var GenStateExecuting = "executing";
		  var GenStateCompleted = "completed";

		  // Returning this object from the innerFn has the same effect as
		  // breaking out of the dispatch switch statement.
		  var ContinueSentinel = {};

		  // Dummy constructor functions that we use as the .constructor and
		  // .constructor.prototype properties for functions that return Generator
		  // objects. For full spec compliance, you may wish to configure your
		  // minifier not to mangle the names of these two functions.
		  function Generator() {}
		  function GeneratorFunction() {}
		  function GeneratorFunctionPrototype() {}

		  // This is a polyfill for %IteratorPrototype% for environments that
		  // don't natively support it.
		  var IteratorPrototype = {};
		  define(IteratorPrototype, iteratorSymbol, function () {
		    return this;
		  });

		  var getProto = Object.getPrototypeOf;
		  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
		  if (NativeIteratorPrototype &&
		      NativeIteratorPrototype !== Op &&
		      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
		    // This environment has a native %IteratorPrototype%; use it instead
		    // of the polyfill.
		    IteratorPrototype = NativeIteratorPrototype;
		  }

		  var Gp = GeneratorFunctionPrototype.prototype =
		    Generator.prototype = Object.create(IteratorPrototype);
		  GeneratorFunction.prototype = GeneratorFunctionPrototype;
		  defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
		  defineProperty(
		    GeneratorFunctionPrototype,
		    "constructor",
		    { value: GeneratorFunction, configurable: true }
		  );
		  GeneratorFunction.displayName = define(
		    GeneratorFunctionPrototype,
		    toStringTagSymbol,
		    "GeneratorFunction"
		  );

		  // Helper for defining the .next, .throw, and .return methods of the
		  // Iterator interface in terms of a single ._invoke method.
		  function defineIteratorMethods(prototype) {
		    ["next", "throw", "return"].forEach(function(method) {
		      define(prototype, method, function(arg) {
		        return this._invoke(method, arg);
		      });
		    });
		  }

		  exports$1.isGeneratorFunction = function(genFun) {
		    var ctor = typeof genFun === "function" && genFun.constructor;
		    return ctor
		      ? ctor === GeneratorFunction ||
		        // For the native GeneratorFunction constructor, the best we can
		        // do is to check its .name property.
		        (ctor.displayName || ctor.name) === "GeneratorFunction"
		      : false;
		  };

		  exports$1.mark = function(genFun) {
		    if (Object.setPrototypeOf) {
		      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
		    } else {
		      genFun.__proto__ = GeneratorFunctionPrototype;
		      define(genFun, toStringTagSymbol, "GeneratorFunction");
		    }
		    genFun.prototype = Object.create(Gp);
		    return genFun;
		  };

		  // Within the body of any async function, `await x` is transformed to
		  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
		  // `hasOwn.call(value, "__await")` to determine if the yielded value is
		  // meant to be awaited.
		  exports$1.awrap = function(arg) {
		    return { __await: arg };
		  };

		  function AsyncIterator(generator, PromiseImpl) {
		    function invoke(method, arg, resolve, reject) {
		      var record = tryCatch(generator[method], generator, arg);
		      if (record.type === "throw") {
		        reject(record.arg);
		      } else {
		        var result = record.arg;
		        var value = result.value;
		        if (value &&
		            typeof value === "object" &&
		            hasOwn.call(value, "__await")) {
		          return PromiseImpl.resolve(value.__await).then(function(value) {
		            invoke("next", value, resolve, reject);
		          }, function(err) {
		            invoke("throw", err, resolve, reject);
		          });
		        }

		        return PromiseImpl.resolve(value).then(function(unwrapped) {
		          // When a yielded Promise is resolved, its final value becomes
		          // the .value of the Promise<{value,done}> result for the
		          // current iteration.
		          result.value = unwrapped;
		          resolve(result);
		        }, function(error) {
		          // If a rejected Promise was yielded, throw the rejection back
		          // into the async generator function so it can be handled there.
		          return invoke("throw", error, resolve, reject);
		        });
		      }
		    }

		    var previousPromise;

		    function enqueue(method, arg) {
		      function callInvokeWithMethodAndArg() {
		        return new PromiseImpl(function(resolve, reject) {
		          invoke(method, arg, resolve, reject);
		        });
		      }

		      return previousPromise =
		        // If enqueue has been called before, then we want to wait until
		        // all previous Promises have been resolved before calling invoke,
		        // so that results are always delivered in the correct order. If
		        // enqueue has not been called before, then it is important to
		        // call invoke immediately, without waiting on a callback to fire,
		        // so that the async generator function has the opportunity to do
		        // any necessary setup in a predictable way. This predictability
		        // is why the Promise constructor synchronously invokes its
		        // executor callback, and why async functions synchronously
		        // execute code before the first await. Since we implement simple
		        // async functions in terms of async generators, it is especially
		        // important to get this right, even though it requires care.
		        previousPromise ? previousPromise.then(
		          callInvokeWithMethodAndArg,
		          // Avoid propagating failures to Promises returned by later
		          // invocations of the iterator.
		          callInvokeWithMethodAndArg
		        ) : callInvokeWithMethodAndArg();
		    }

		    // Define the unified helper method that is used to implement .next,
		    // .throw, and .return (see defineIteratorMethods).
		    defineProperty(this, "_invoke", { value: enqueue });
		  }

		  defineIteratorMethods(AsyncIterator.prototype);
		  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
		    return this;
		  });
		  exports$1.AsyncIterator = AsyncIterator;

		  // Note that simple async functions are implemented on top of
		  // AsyncIterator objects; they just return a Promise for the value of
		  // the final result produced by the iterator.
		  exports$1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
		    if (PromiseImpl === void 0) PromiseImpl = Promise;

		    var iter = new AsyncIterator(
		      wrap(innerFn, outerFn, self, tryLocsList),
		      PromiseImpl
		    );

		    return exports$1.isGeneratorFunction(outerFn)
		      ? iter // If outerFn is a generator, return the full iterator.
		      : iter.next().then(function(result) {
		          return result.done ? result.value : iter.next();
		        });
		  };

		  function makeInvokeMethod(innerFn, self, context) {
		    var state = GenStateSuspendedStart;

		    return function invoke(method, arg) {
		      if (state === GenStateExecuting) {
		        throw new Error("Generator is already running");
		      }

		      if (state === GenStateCompleted) {
		        if (method === "throw") {
		          throw arg;
		        }

		        // Be forgiving, per 25.3.3.3.3 of the spec:
		        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
		        return doneResult();
		      }

		      context.method = method;
		      context.arg = arg;

		      while (true) {
		        var delegate = context.delegate;
		        if (delegate) {
		          var delegateResult = maybeInvokeDelegate(delegate, context);
		          if (delegateResult) {
		            if (delegateResult === ContinueSentinel) continue;
		            return delegateResult;
		          }
		        }

		        if (context.method === "next") {
		          // Setting context._sent for legacy support of Babel's
		          // function.sent implementation.
		          context.sent = context._sent = context.arg;

		        } else if (context.method === "throw") {
		          if (state === GenStateSuspendedStart) {
		            state = GenStateCompleted;
		            throw context.arg;
		          }

		          context.dispatchException(context.arg);

		        } else if (context.method === "return") {
		          context.abrupt("return", context.arg);
		        }

		        state = GenStateExecuting;

		        var record = tryCatch(innerFn, self, context);
		        if (record.type === "normal") {
		          // If an exception is thrown from innerFn, we leave state ===
		          // GenStateExecuting and loop back for another invocation.
		          state = context.done
		            ? GenStateCompleted
		            : GenStateSuspendedYield;

		          if (record.arg === ContinueSentinel) {
		            continue;
		          }

		          return {
		            value: record.arg,
		            done: context.done
		          };

		        } else if (record.type === "throw") {
		          state = GenStateCompleted;
		          // Dispatch the exception by looping back around to the
		          // context.dispatchException(context.arg) call above.
		          context.method = "throw";
		          context.arg = record.arg;
		        }
		      }
		    };
		  }

		  // Call delegate.iterator[context.method](context.arg) and handle the
		  // result, either by returning a { value, done } result from the
		  // delegate iterator, or by modifying context.method and context.arg,
		  // setting context.delegate to null, and returning the ContinueSentinel.
		  function maybeInvokeDelegate(delegate, context) {
		    var methodName = context.method;
		    var method = delegate.iterator[methodName];
		    if (method === undefined$1) {
		      // A .throw or .return when the delegate iterator has no .throw
		      // method, or a missing .next mehtod, always terminate the
		      // yield* loop.
		      context.delegate = null;

		      // Note: ["return"] must be used for ES3 parsing compatibility.
		      if (methodName === "throw" && delegate.iterator["return"]) {
		        // If the delegate iterator has a return method, give it a
		        // chance to clean up.
		        context.method = "return";
		        context.arg = undefined$1;
		        maybeInvokeDelegate(delegate, context);

		        if (context.method === "throw") {
		          // If maybeInvokeDelegate(context) changed context.method from
		          // "return" to "throw", let that override the TypeError below.
		          return ContinueSentinel;
		        }
		      }
		      if (methodName !== "return") {
		        context.method = "throw";
		        context.arg = new TypeError(
		          "The iterator does not provide a '" + methodName + "' method");
		      }

		      return ContinueSentinel;
		    }

		    var record = tryCatch(method, delegate.iterator, context.arg);

		    if (record.type === "throw") {
		      context.method = "throw";
		      context.arg = record.arg;
		      context.delegate = null;
		      return ContinueSentinel;
		    }

		    var info = record.arg;

		    if (! info) {
		      context.method = "throw";
		      context.arg = new TypeError("iterator result is not an object");
		      context.delegate = null;
		      return ContinueSentinel;
		    }

		    if (info.done) {
		      // Assign the result of the finished delegate to the temporary
		      // variable specified by delegate.resultName (see delegateYield).
		      context[delegate.resultName] = info.value;

		      // Resume execution at the desired location (see delegateYield).
		      context.next = delegate.nextLoc;

		      // If context.method was "throw" but the delegate handled the
		      // exception, let the outer generator proceed normally. If
		      // context.method was "next", forget context.arg since it has been
		      // "consumed" by the delegate iterator. If context.method was
		      // "return", allow the original .return call to continue in the
		      // outer generator.
		      if (context.method !== "return") {
		        context.method = "next";
		        context.arg = undefined$1;
		      }

		    } else {
		      // Re-yield the result returned by the delegate method.
		      return info;
		    }

		    // The delegate iterator is finished, so forget it and continue with
		    // the outer generator.
		    context.delegate = null;
		    return ContinueSentinel;
		  }

		  // Define Generator.prototype.{next,throw,return} in terms of the
		  // unified ._invoke helper method.
		  defineIteratorMethods(Gp);

		  define(Gp, toStringTagSymbol, "Generator");

		  // A Generator should always return itself as the iterator object when the
		  // @@iterator function is called on it. Some browsers' implementations of the
		  // iterator prototype chain incorrectly implement this, causing the Generator
		  // object to not be returned from this call. This ensures that doesn't happen.
		  // See https://github.com/facebook/regenerator/issues/274 for more details.
		  define(Gp, iteratorSymbol, function() {
		    return this;
		  });

		  define(Gp, "toString", function() {
		    return "[object Generator]";
		  });

		  function pushTryEntry(locs) {
		    var entry = { tryLoc: locs[0] };

		    if (1 in locs) {
		      entry.catchLoc = locs[1];
		    }

		    if (2 in locs) {
		      entry.finallyLoc = locs[2];
		      entry.afterLoc = locs[3];
		    }

		    this.tryEntries.push(entry);
		  }

		  function resetTryEntry(entry) {
		    var record = entry.completion || {};
		    record.type = "normal";
		    delete record.arg;
		    entry.completion = record;
		  }

		  function Context(tryLocsList) {
		    // The root entry object (effectively a try statement without a catch
		    // or a finally block) gives us a place to store values thrown from
		    // locations where there is no enclosing try statement.
		    this.tryEntries = [{ tryLoc: "root" }];
		    tryLocsList.forEach(pushTryEntry, this);
		    this.reset(true);
		  }

		  exports$1.keys = function(val) {
		    var object = Object(val);
		    var keys = [];
		    for (var key in object) {
		      keys.push(key);
		    }
		    keys.reverse();

		    // Rather than returning an object with a next method, we keep
		    // things simple and return the next function itself.
		    return function next() {
		      while (keys.length) {
		        var key = keys.pop();
		        if (key in object) {
		          next.value = key;
		          next.done = false;
		          return next;
		        }
		      }

		      // To avoid creating an additional object, we just hang the .value
		      // and .done properties off the next function object itself. This
		      // also ensures that the minifier will not anonymize the function.
		      next.done = true;
		      return next;
		    };
		  };

		  function values(iterable) {
		    if (iterable) {
		      var iteratorMethod = iterable[iteratorSymbol];
		      if (iteratorMethod) {
		        return iteratorMethod.call(iterable);
		      }

		      if (typeof iterable.next === "function") {
		        return iterable;
		      }

		      if (!isNaN(iterable.length)) {
		        var i = -1, next = function next() {
		          while (++i < iterable.length) {
		            if (hasOwn.call(iterable, i)) {
		              next.value = iterable[i];
		              next.done = false;
		              return next;
		            }
		          }

		          next.value = undefined$1;
		          next.done = true;

		          return next;
		        };

		        return next.next = next;
		      }
		    }

		    // Return an iterator with no values.
		    return { next: doneResult };
		  }
		  exports$1.values = values;

		  function doneResult() {
		    return { value: undefined$1, done: true };
		  }

		  Context.prototype = {
		    constructor: Context,

		    reset: function(skipTempReset) {
		      this.prev = 0;
		      this.next = 0;
		      // Resetting context._sent for legacy support of Babel's
		      // function.sent implementation.
		      this.sent = this._sent = undefined$1;
		      this.done = false;
		      this.delegate = null;

		      this.method = "next";
		      this.arg = undefined$1;

		      this.tryEntries.forEach(resetTryEntry);

		      if (!skipTempReset) {
		        for (var name in this) {
		          // Not sure about the optimal order of these conditions:
		          if (name.charAt(0) === "t" &&
		              hasOwn.call(this, name) &&
		              !isNaN(+name.slice(1))) {
		            this[name] = undefined$1;
		          }
		        }
		      }
		    },

		    stop: function() {
		      this.done = true;

		      var rootEntry = this.tryEntries[0];
		      var rootRecord = rootEntry.completion;
		      if (rootRecord.type === "throw") {
		        throw rootRecord.arg;
		      }

		      return this.rval;
		    },

		    dispatchException: function(exception) {
		      if (this.done) {
		        throw exception;
		      }

		      var context = this;
		      function handle(loc, caught) {
		        record.type = "throw";
		        record.arg = exception;
		        context.next = loc;

		        if (caught) {
		          // If the dispatched exception was caught by a catch block,
		          // then let that catch block handle the exception normally.
		          context.method = "next";
		          context.arg = undefined$1;
		        }

		        return !! caught;
		      }

		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        var record = entry.completion;

		        if (entry.tryLoc === "root") {
		          // Exception thrown outside of any try block that could handle
		          // it, so set the completion value of the entire function to
		          // throw the exception.
		          return handle("end");
		        }

		        if (entry.tryLoc <= this.prev) {
		          var hasCatch = hasOwn.call(entry, "catchLoc");
		          var hasFinally = hasOwn.call(entry, "finallyLoc");

		          if (hasCatch && hasFinally) {
		            if (this.prev < entry.catchLoc) {
		              return handle(entry.catchLoc, true);
		            } else if (this.prev < entry.finallyLoc) {
		              return handle(entry.finallyLoc);
		            }

		          } else if (hasCatch) {
		            if (this.prev < entry.catchLoc) {
		              return handle(entry.catchLoc, true);
		            }

		          } else if (hasFinally) {
		            if (this.prev < entry.finallyLoc) {
		              return handle(entry.finallyLoc);
		            }

		          } else {
		            throw new Error("try statement without catch or finally");
		          }
		        }
		      }
		    },

		    abrupt: function(type, arg) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.tryLoc <= this.prev &&
		            hasOwn.call(entry, "finallyLoc") &&
		            this.prev < entry.finallyLoc) {
		          var finallyEntry = entry;
		          break;
		        }
		      }

		      if (finallyEntry &&
		          (type === "break" ||
		           type === "continue") &&
		          finallyEntry.tryLoc <= arg &&
		          arg <= finallyEntry.finallyLoc) {
		        // Ignore the finally entry if control is not jumping to a
		        // location outside the try/catch block.
		        finallyEntry = null;
		      }

		      var record = finallyEntry ? finallyEntry.completion : {};
		      record.type = type;
		      record.arg = arg;

		      if (finallyEntry) {
		        this.method = "next";
		        this.next = finallyEntry.finallyLoc;
		        return ContinueSentinel;
		      }

		      return this.complete(record);
		    },

		    complete: function(record, afterLoc) {
		      if (record.type === "throw") {
		        throw record.arg;
		      }

		      if (record.type === "break" ||
		          record.type === "continue") {
		        this.next = record.arg;
		      } else if (record.type === "return") {
		        this.rval = this.arg = record.arg;
		        this.method = "return";
		        this.next = "end";
		      } else if (record.type === "normal" && afterLoc) {
		        this.next = afterLoc;
		      }

		      return ContinueSentinel;
		    },

		    finish: function(finallyLoc) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.finallyLoc === finallyLoc) {
		          this.complete(entry.completion, entry.afterLoc);
		          resetTryEntry(entry);
		          return ContinueSentinel;
		        }
		      }
		    },

		    "catch": function(tryLoc) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.tryLoc === tryLoc) {
		          var record = entry.completion;
		          if (record.type === "throw") {
		            var thrown = record.arg;
		            resetTryEntry(entry);
		          }
		          return thrown;
		        }
		      }

		      // The context.catch method must only be called with a location
		      // argument that corresponds to a known catch block.
		      throw new Error("illegal catch attempt");
		    },

		    delegateYield: function(iterable, resultName, nextLoc) {
		      this.delegate = {
		        iterator: values(iterable),
		        resultName: resultName,
		        nextLoc: nextLoc
		      };

		      if (this.method === "next") {
		        // Deliberately forget the last sent value so that we don't
		        // accidentally pass it on to the delegate.
		        this.arg = undefined$1;
		      }

		      return ContinueSentinel;
		    }
		  };

		  // Regardless of whether this script is executing as a CommonJS module
		  // or not, return the runtime object so that we can declare the variable
		  // regeneratorRuntime in the outer scope, which allows this module to be
		  // injected easily by `bin/regenerator --include-runtime script.js`.
		  return exports$1;

		}(
		  // If this script is executing as a CommonJS module, use module.exports
		  // as the regeneratorRuntime namespace. Otherwise create a new empty
		  // object. Either way, the resulting object will be used to initialize
		  // the regeneratorRuntime variable at the top of this file.
		  module.exports 
		));

		try {
		  regeneratorRuntime = runtime;
		} catch (accidentalStrictMode) {
		  // This module should not be running in strict mode, so the above
		  // assignment should always work unless something is misconfigured. Just
		  // in case runtime.js accidentally runs in strict mode, in modern engines
		  // we can explicitly access globalThis. In older engines we can escape
		  // strict mode using a global Function call. This could conceivably fail
		  // if a Content Security Policy forbids using Function, but in that case
		  // the proper solution is to fix the accidental strict mode problem. If
		  // you've misconfigured your bundler to force strict mode and applied a
		  // CSP to forbid Function, and you're not willing to fix either of those
		  // problems, please detail your unique predicament in a GitHub issue.
		  if (typeof globalThis === "object") {
		    globalThis.regeneratorRuntime = runtime;
		  } else {
		    Function("r", "regeneratorRuntime = r")(runtime);
		  }
		} 
	} (runtime));

	var _global$1 = {exports: {}};

	var hasRequired_global;

	function require_global () {
		if (hasRequired_global) return _global$1.exports;
		hasRequired_global = 1;
		// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
		var global = _global$1.exports = typeof window != 'undefined' && window.Math == Math
		  ? window : typeof self != 'undefined' && self.Math == Math ? self
		  // eslint-disable-next-line no-new-func
		  : Function('return this')();
		if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
		return _global$1.exports;
	}

	var _core = {exports: {}};

	var core$1 = _core.exports = { version: '2.6.12' };
	if (typeof __e == 'number') __e = core$1; // eslint-disable-line no-undef

	var _coreExports = _core.exports;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding
	var aFunction = _aFunction;
	var _ctx = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _objectDp = {};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$1 = _isObject;
	var _anObject = function (it) {
	  if (!isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _domCreate;
	var hasRequired_domCreate;

	function require_domCreate () {
		if (hasRequired_domCreate) return _domCreate;
		hasRequired_domCreate = 1;
		var isObject = _isObject;
		var document = require_global().document;
		// typeof document.createElement is 'object' in old IE
		var is = isObject(document) && isObject(document.createElement);
		_domCreate = function (it) {
		  return is ? document.createElement(it) : {};
		};
		return _domCreate;
	}

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(require_domCreate()('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = _isObject;
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var anObject = _anObject;
	var IE8_DOM_DEFINE = _ie8DomDefine;
	var toPrimitive = _toPrimitive;
	var dP$1 = Object.defineProperty;

	_objectDp.f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP$1(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var dP = _objectDp;
	var createDesc = _propertyDesc;
	var _hide = _descriptors ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var global$1 = require_global();
	var core = _coreExports;
	var ctx = _ctx;
	var hide = _hide;
	var has = _has;
	var PROTOTYPE = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var IS_WRAP = type & $export$1.W;
	  var exports$1 = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports$1[PROTOTYPE];
	  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports$1, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports$1[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports$1.virtual || (exports$1.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export$1.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export = $export$1;

	// https://github.com/tc39/proposal-global
	var $export = _export;

	$export($export.G, { global: require_global() });

	var global = _coreExports.global;

	var _global = _interopRequireDefault(global);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	if (_global["default"]._babelPolyfill && typeof console !== "undefined" && console.warn) {
	  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
	}

	_global["default"]._babelPolyfill = true;

	// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

	var $ = document.querySelector.bind(document);
	var $$ = document.querySelectorAll.bind(document);
	Node.prototype.on = window.on = function (name, fn) {
	  this.addEventListener(name, fn);
	};
	Node.prototype.off = window.off = function (name, fn) {
	  this.removeEventListener(name, fn);
	};
	NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

	NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
	  this.forEach(function (elem) {
	    elem.on(name, fn);
	  });
	};
	NodeList.prototype.off = NodeList.prototype.removeEventListener = function (name, fn) {
	  this.forEach(function (elem) {
	    elem.off(name, fn);
	  });
	};

	function _arrayLikeToArray(r, a) {
	  (null == a || a > r.length) && (a = r.length);
	  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	  return n;
	}
	function _arrayWithHoles(r) {
	  if (Array.isArray(r)) return r;
	}
	function asyncGeneratorStep(n, t, e, r, o, a, c) {
	  try {
	    var i = n[a](c),
	      u = i.value;
	  } catch (n) {
	    return void e(n);
	  }
	  i.done ? t(u) : Promise.resolve(u).then(r, o);
	}
	function _asyncToGenerator(n) {
	  return function () {
	    var t = this,
	      e = arguments;
	    return new Promise(function (r, o) {
	      var a = n.apply(t, e);
	      function _next(n) {
	        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
	      }
	      function _throw(n) {
	        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
	      }
	      _next(void 0);
	    });
	  };
	}
	function _iterableToArrayLimit(r, l) {
	  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	  if (null != t) {
	    var e,
	      n,
	      i,
	      u,
	      a = [],
	      f = true,
	      o = false;
	    try {
	      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
	    } catch (r) {
	      o = true, n = r;
	    } finally {
	      try {
	        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
	      } finally {
	        if (o) throw n;
	      }
	    }
	    return a;
	  }
	}
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _regenerator() {
	  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
	  var e,
	    t,
	    r = "function" == typeof Symbol ? Symbol : {},
	    n = r.iterator || "@@iterator",
	    o = r.toStringTag || "@@toStringTag";
	  function i(r, n, o, i) {
	    var c = n && n.prototype instanceof Generator ? n : Generator,
	      u = Object.create(c.prototype);
	    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
	      var i,
	        c,
	        u,
	        f = 0,
	        p = o || [],
	        y = false,
	        G = {
	          p: 0,
	          n: 0,
	          v: e,
	          a: d,
	          f: d.bind(e, 4),
	          d: function (t, r) {
	            return i = t, c = 0, u = e, G.n = r, a;
	          }
	        };
	      function d(r, n) {
	        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
	          var o,
	            i = p[t],
	            d = G.p,
	            l = i[2];
	          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
	        }
	        if (o || r > 1) return a;
	        throw y = true, n;
	      }
	      return function (o, p, l) {
	        if (f > 1) throw TypeError("Generator is already running");
	        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
	          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
	          try {
	            if (f = 2, i) {
	              if (c || (o = "next"), t = i[o]) {
	                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
	                if (!t.done) return t;
	                u = t.value, c < 2 && (c = 0);
	              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
	              i = e;
	            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
	          } catch (t) {
	            i = e, c = 1, u = t;
	          } finally {
	            f = 1;
	          }
	        }
	        return {
	          value: t,
	          done: y
	        };
	      };
	    }(r, o, i), true), u;
	  }
	  var a = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  t = Object.getPrototypeOf;
	  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
	      return this;
	    }), t),
	    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
	  function f(e) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
	    return this;
	  }), _regeneratorDefine(u, "toString", function () {
	    return "[object Generator]";
	  }), (_regenerator = function () {
	    return {
	      w: i,
	      m: f
	    };
	  })();
	}
	function _regeneratorDefine(e, r, n, t) {
	  var i = Object.defineProperty;
	  try {
	    i({}, "", {});
	  } catch (e) {
	    i = 0;
	  }
	  _regeneratorDefine = function (e, r, n, t) {
	    function o(r, n) {
	      _regeneratorDefine(e, r, function (e) {
	        return this._invoke(r, n, e);
	      });
	    }
	    r ? i ? i(e, r, {
	      value: n,
	      enumerable: !t,
	      configurable: !t,
	      writable: !t
	    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
	  }, _regeneratorDefine(e, r, n, t);
	}
	function _slicedToArray(r, e) {
	  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
	}
	function _unsupportedIterableToArray(r, a) {
	  if (r) {
	    if ("string" == typeof r) return _arrayLikeToArray(r, a);
	    var t = {}.toString.call(r).slice(8, -1);
	    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	  }
	}

	function loadMapModule(_x) {
	  return _loadMapModule.apply(this, arguments);
	}
	function _loadMapModule() {
	  _loadMapModule = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(moduleName) {
	    return _regenerator().w(function (_context) {
	      while (1) switch (_context.n) {
	        case 0:
	          return _context.a(2, new Promise(function (resolve, reject) {
	            Microsoft.Maps.loadModule(moduleName, {
	              callback: resolve,
	              errorCallback: reject
	            });
	          }));
	      }
	    }, _callee);
	  }));
	  return _loadMapModule.apply(this, arguments);
	}

	function autocomplete(_x, _x2, _x3) {
	  return _autocomplete.apply(this, arguments);
	}
	function _autocomplete() {
	  _autocomplete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(input, latInput, lngInput) {
	    var manager;
	    return _regenerator().w(function (_context) {
	      while (1) switch (_context.n) {
	        case 0:
	          if (input) {
	            _context.n = 1;
	            break;
	          }
	          return _context.a(2);
	        case 1:
	          _context.n = 2;
	          return loadMapModule('Microsoft.Maps.AutoSuggest');
	        case 2:
	          manager = new Microsoft.Maps.AutosuggestManager({
	            maxResults: 5
	          });
	          manager.attachAutosuggest(input, input.parentElement, function (_ref) {
	            var location = _ref.location;
	            latInput.value = location.latitude;
	            lngInput.value = location.longitude;
	          });
	        case 3:
	          return _context.a(2);
	      }
	    }, _callee);
	  }));
	  return _autocomplete.apply(this, arguments);
	}

	var purify = {exports: {}};

	(function (module) {
	(function(factory) {
		    /* global window: false, define: false, module: false */
		    var root = typeof window === 'undefined' ? null : window;

		    {
		        module.exports = factory(root);
		    }
		}(function factory(window) {

		    var DOMPurify = function(window) {
		        return factory(window);
		    };

		    /**
		     * Version label, exposed for easier checks
		     * if DOMPurify is up to date or not
		     */
		    DOMPurify.version = '0.8.5';

		    /**
		     * Array of elements that DOMPurify removed during sanitation.
		     * Empty if nothing was removed.
		     */
		    DOMPurify.removed = [];

		    if (!window || !window.document || window.document.nodeType !== 9) {
		        // not running in a browser, provide a factory function
		        // so that you can pass your own Window
		        DOMPurify.isSupported = false;
		        return DOMPurify;
		    }

		    var document = window.document;
		    var originalDocument = document;
		    var DocumentFragment = window.DocumentFragment;
		    var HTMLTemplateElement = window.HTMLTemplateElement;
		    var Node = window.Node;
		    var NodeFilter = window.NodeFilter;
		    var NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap;
		    var Text = window.Text;
		    var Comment = window.Comment;
		    var DOMParser = window.DOMParser;

		    // As per issue #47, the web-components registry is inherited by a
		    // new document created via createHTMLDocument. As per the spec
		    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
		    // a new empty registry is used when creating a template contents owner
		    // document, so we use that as our parent document to ensure nothing
		    // is inherited.
		    if (typeof HTMLTemplateElement === 'function') {
		        var template = document.createElement('template');
		        if (template.content && template.content.ownerDocument) {
		            document = template.content.ownerDocument;
		        }
		    }
		    var implementation = document.implementation;
		    var createNodeIterator = document.createNodeIterator;
		    var getElementsByTagName = document.getElementsByTagName;
		    var createDocumentFragment = document.createDocumentFragment;
		    var importNode = originalDocument.importNode;

		    var hooks = {};

		    /**
		     * Expose whether this browser supports running the full DOMPurify.
		     */
		    DOMPurify.isSupported =
		        typeof implementation.createHTMLDocument !== 'undefined' &&
		        document.documentMode !== 9;

		    /* Add properties to a lookup table */
		    var _addToSet = function(set, array) {
		        var l = array.length;
		        while (l--) {
		            if (typeof array[l] === 'string') {
		                array[l] = array[l].toLowerCase();
		            }
		            set[array[l]] = true;
		        }
		        return set;
		    };

		    /* Shallow clone an object */
		    var _cloneObj = function(object) {
		        var newObject = {};
		        var property;
		        for (property in object) {
		            if (object.hasOwnProperty(property)) {
		                newObject[property] = object[property];
		            }
		        }
		        return newObject;
		    };

		    /**
		     * We consider the elements and attributes below to be safe. Ideally
		     * don't add any new ones but feel free to remove unwanted ones.
		     */

		    /* allowed element names */
		    var ALLOWED_TAGS = null;
		    var DEFAULT_ALLOWED_TAGS = _addToSet({}, [

		        // HTML
		        'a','abbr','acronym','address','area','article','aside','audio','b',
		        'bdi','bdo','big','blink','blockquote','body','br','button','canvas',
		        'caption','center','cite','code','col','colgroup','content','data',
		        'datalist','dd','decorator','del','details','dfn','dir','div','dl','dt',
		        'element','em','fieldset','figcaption','figure','font','footer','form',
		        'h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i',
		        'img','input','ins','kbd','label','legend','li','main','map','mark',
		        'marquee','menu','menuitem','meter','nav','nobr','ol','optgroup',
		        'option','output','p','pre','progress','q','rp','rt','ruby','s','samp',
		        'section','select','shadow','small','source','spacer','span','strike',
		        'strong','style','sub','summary','sup','table','tbody','td','template',
		        'textarea','tfoot','th','thead','time','tr','track','tt','u','ul','var',
		        'video','wbr',

		        // SVG
		        'svg','altglyph','altglyphdef','altglyphitem','animatecolor',
		        'animatemotion','animatetransform','circle','clippath','defs','desc',
		        'ellipse','filter','font','g','glyph','glyphref','hkern','image','line',
		        'lineargradient','marker','mask','metadata','mpath','path','pattern',
		        'polygon','polyline','radialgradient','rect','stop','switch','symbol',
		        'text','textpath','title','tref','tspan','view','vkern',

		        // SVG Filters
		        'feBlend','feColorMatrix','feComponentTransfer','feComposite',
		        'feConvolveMatrix','feDiffuseLighting','feDisplacementMap',
		        'feFlood','feFuncA','feFuncB','feFuncG','feFuncR','feGaussianBlur',
		        'feMerge','feMergeNode','feMorphology','feOffset',
		        'feSpecularLighting','feTile','feTurbulence',

		        //MathML
		        'math','menclose','merror','mfenced','mfrac','mglyph','mi','mlabeledtr',
		        'mmuliscripts','mn','mo','mover','mpadded','mphantom','mroot','mrow',
		        'ms','mpspace','msqrt','mystyle','msub','msup','msubsup','mtable','mtd',
		        'mtext','mtr','munder','munderover',

		        //Text
		        '#text'
		    ]);

		    /* Allowed attribute names */
		    var ALLOWED_ATTR = null;
		    var DEFAULT_ALLOWED_ATTR = _addToSet({}, [

		        // HTML
		        'accept','action','align','alt','autocomplete','background','bgcolor',
		        'border','cellpadding','cellspacing','checked','cite','class','clear','color',
		        'cols','colspan','coords','datetime','default','dir','disabled',
		        'download','enctype','face','for','headers','height','hidden','high','href',
		        'hreflang','id','ismap','label','lang','list','loop', 'low','max',
		        'maxlength','media','method','min','multiple','name','noshade','novalidate',
		        'nowrap','open','optimum','pattern','placeholder','poster','preload','pubdate',
		        'radiogroup','readonly','rel','required','rev','reversed','rows',
		        'rowspan','spellcheck','scope','selected','shape','size','span',
		        'srclang','start','src','step','style','summary','tabindex','title',
		        'type','usemap','valign','value','width','xmlns',

		        // SVG
		        'accent-height','accumulate','additivive','alignment-baseline',
		        'ascent','attributename','attributetype','azimuth','basefrequency',
		        'baseline-shift','begin','bias','by','clip','clip-path','clip-rule',
		        'color','color-interpolation','color-interpolation-filters','color-profile',
		        'color-rendering','cx','cy','d','dx','dy','diffuseconstant','direction',
		        'display','divisor','dur','edgemode','elevation','end','fill','fill-opacity',
		        'fill-rule','filter','flood-color','flood-opacity','font-family','font-size',
		        'font-size-adjust','font-stretch','font-style','font-variant','font-weight',
		        'fx', 'fy','g1','g2','glyph-name','glyphref','gradientunits','gradienttransform',
		        'image-rendering','in','in2','k','k1','k2','k3','k4','kerning','keypoints',
		        'keysplines','keytimes','lengthadjust','letter-spacing','kernelmatrix',
		        'kernelunitlength','lighting-color','local','marker-end','marker-mid',
		        'marker-start','markerheight','markerunits','markerwidth','maskcontentunits',
		        'maskunits','max','mask','mode','min','numoctaves','offset','operator',
		        'opacity','order','orient','orientation','origin','overflow','paint-order',
		        'path','pathlength','patterncontentunits','patterntransform','patternunits',
		        'points','preservealpha','r','rx','ry','radius','refx','refy','repeatcount',
		        'repeatdur','restart','result','rotate','scale','seed','shape-rendering',
		        'specularconstant','specularexponent','spreadmethod','stddeviation','stitchtiles',
		        'stop-color','stop-opacity','stroke-dasharray','stroke-dashoffset','stroke-linecap',
		        'stroke-linejoin','stroke-miterlimit','stroke-opacity','stroke','stroke-width',
		        'surfacescale','targetx','targety','transform','text-anchor','text-decoration',
		        'text-rendering','textlength','u1','u2','unicode','values','viewbox',
		        'visibility','vert-adv-y','vert-origin-x','vert-origin-y','word-spacing',
		        'wrap','writing-mode','xchannelselector','ychannelselector','x','x1','x2',
		        'y','y1','y2','z','zoomandpan',

		        // MathML
		        'accent','accentunder','bevelled','close','columnsalign','columnlines',
		        'columnspan','denomalign','depth','display','displaystyle','fence',
		        'frame','largeop','length','linethickness','lspace','lquote',
		        'mathbackground','mathcolor','mathsize','mathvariant','maxsize',
		        'minsize','movablelimits','notation','numalign','open','rowalign',
		        'rowlines','rowspacing','rowspan','rspace','rquote','scriptlevel',
		        'scriptminsize','scriptsizemultiplier','selection','separator',
		        'separators','stretchy','subscriptshift','supscriptshift','symmetric',
		        'voffset',

		        // XML
		        'xlink:href','xml:id','xlink:title','xml:space','xmlns:xlink'
		    ]);

		    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
		    var FORBID_TAGS = null;

		    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
		    var FORBID_ATTR = null;

		    /* Decide if custom data attributes are okay */
		    var ALLOW_DATA_ATTR = true;

		    /* Decide if unknown protocols are okay */
		    var ALLOW_UNKNOWN_PROTOCOLS = false;

		    /* Output should be safe for jQuery's $() factory? */
		    var SAFE_FOR_JQUERY = false;

		    /* Output should be safe for common template engines.
		     * This means, DOMPurify removes data attributes, mustaches and ERB
		     */
		    var SAFE_FOR_TEMPLATES = false;

		    /* Specify template detection regex for SAFE_FOR_TEMPLATES mode */
		    var MUSTACHE_EXPR = /\{\{[\s\S]*|[\s\S]*\}\}/gm;
		    var ERB_EXPR = /<%[\s\S]*|[\s\S]*%>/gm;

		    /* Decide if document with <html>... should be returned */
		    var WHOLE_DOCUMENT = false;

		    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html string.
		     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
		     */
		    var RETURN_DOM = false;

		    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html string */
		    var RETURN_DOM_FRAGMENT = false;

		    /* If `RETURN_DOM` or `RETURN_DOM_FRAGMENT` is enabled, decide if the returned DOM
		     * `Node` is imported into the current `Document`. If this flag is not enabled the
		     * `Node` will belong (its ownerDocument) to a fresh `HTMLDocument`, created by
		     * DOMPurify. */
		    var RETURN_DOM_IMPORT = false;

		    /* Output should be free from DOM clobbering attacks? */
		    var SANITIZE_DOM = true;

		    /* Keep element content when removing element? */
		    var KEEP_CONTENT = true;

		    /* Tags to ignore content of when KEEP_CONTENT is true */
		    var FORBID_CONTENTS = _addToSet({}, [
		        'audio', 'head', 'math', 'script', 'style', 'svg', 'video'
		    ]);

		    /* Tags that are safe for data: URIs */
		    var DATA_URI_TAGS = _addToSet({}, [
		        'audio', 'video', 'img', 'source'
		    ]);

		    /* Attributes safe for values like "javascript:" */
		    var URI_SAFE_ATTRIBUTES = _addToSet({}, [
		        'alt','class','for','id','label','name','pattern','placeholder',
		        'summary','title','value','style','xmlns'
		    ]);

		    /* Keep a reference to config to pass to hooks */
		    var CONFIG = null;

		    /* Ideally, do not touch anything below this line */
		    /* ______________________________________________ */

		    var formElement = document.createElement('form');

		    /**
		     * _parseConfig
		     *
		     * @param  optional config literal
		     */
		    var _parseConfig = function(cfg) {
		        /* Shield configuration object from tampering */
		        if (typeof cfg !== 'object') {
		            cfg = {};
		        }

		        /* Set configuration parameters */
		        ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ?
		            _addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
		        ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ?
		            _addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
		        FORBID_TAGS = 'FORBID_TAGS' in cfg ?
		            _addToSet({}, cfg.FORBID_TAGS) : {};
		        FORBID_ATTR = 'FORBID_ATTR' in cfg ?
		            _addToSet({}, cfg.FORBID_ATTR) : {};
		        ALLOW_DATA_ATTR     = cfg.ALLOW_DATA_ATTR     !== false; // Default true
		        ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
		        SAFE_FOR_JQUERY     = cfg.SAFE_FOR_JQUERY     ||  false; // Default false
		        SAFE_FOR_TEMPLATES  = cfg.SAFE_FOR_TEMPLATES  ||  false; // Default false
		        WHOLE_DOCUMENT      = cfg.WHOLE_DOCUMENT      ||  false; // Default false
		        RETURN_DOM          = cfg.RETURN_DOM          ||  false; // Default false
		        RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT ||  false; // Default false
		        RETURN_DOM_IMPORT   = cfg.RETURN_DOM_IMPORT   ||  false; // Default false
		        SANITIZE_DOM        = cfg.SANITIZE_DOM        !== false; // Default true
		        KEEP_CONTENT        = cfg.KEEP_CONTENT        !== false; // Default true

		        if (SAFE_FOR_TEMPLATES) {
		            ALLOW_DATA_ATTR = false;
		        }

		        if (RETURN_DOM_FRAGMENT) {
		            RETURN_DOM = true;
		        }

		        /* Merge configuration parameters */
		        if (cfg.ADD_TAGS) {
		            if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
		                ALLOWED_TAGS = _cloneObj(ALLOWED_TAGS);
		            }
		            _addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
		        }
		        if (cfg.ADD_ATTR) {
		            if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
		                ALLOWED_ATTR = _cloneObj(ALLOWED_ATTR);
		            }
		            _addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
		        }
		        if (cfg.ADD_URI_SAFE_ATTR) {
		            _addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
		        }

		        /* Add #text in case KEEP_CONTENT is set to true */
		        if (KEEP_CONTENT) { ALLOWED_TAGS['#text'] = true; }

		        // Prevent further manipulation of configuration.
		        // Not available in IE8, Safari 5, etc.
		        if (Object && 'freeze' in Object) { Object.freeze(cfg); }

		        CONFIG = cfg;
		    };

		   /**
		     * _forceRemove
		     *
		     * @param  a DOM node
		     */
		    var _forceRemove = function(node) {
		        DOMPurify.removed.push({element: node});
		        try {
		            node.parentNode.removeChild(node);
		        } catch (e) {
		            node.outerHTML = '';
		        }
		    };

		   /**
		     * _removeAttribute
		     *
		     * @param  an Attribute name
		     * @param  a DOM node
		     */
		    var _removeAttribute = function(name, node) {
		        DOMPurify.removed.push({
		            attribute: node.getAttributeNode(name),
		            from: node
		        });
		        node.removeAttribute(name);
		    };

		   /**
		     * _initDocument
		     *
		     * @param  a string of dirty markup
		     * @return a DOM, filled with the dirty markup
		     */
		    var _initDocument = function(dirty) {
		        /* Create a HTML document using DOMParser */
		        var doc, body;
		        try {
		            doc = new DOMParser().parseFromString(dirty, 'text/html');
		        } catch (e) {}

		        /* Some browsers throw, some browsers return null for the code above
		           DOMParser with text/html support is only in very recent browsers.
		           See #159 why the check here is extra-thorough */
		        if (!doc || !doc.documentElement) {
		            doc = implementation.createHTMLDocument('');
		            body = doc.body;
		            body.parentNode.removeChild(body.parentNode.firstElementChild);
		            body.outerHTML = dirty;
		        }

		        /* Work on whole document or just its body */
		        if (typeof doc.getElementsByTagName === 'function') {
		            return doc.getElementsByTagName(
		                WHOLE_DOCUMENT ? 'html' : 'body')[0];
		        }
		        return getElementsByTagName.call(doc,
		            WHOLE_DOCUMENT ? 'html' : 'body')[0];
		    };

		    /**
		     * _createIterator
		     *
		     * @param  document/fragment to create iterator for
		     * @return iterator instance
		     */
		    var _createIterator = function(root) {
		        return createNodeIterator.call(root.ownerDocument || root,
		            root,
		            NodeFilter.SHOW_ELEMENT
		            | NodeFilter.SHOW_COMMENT
		            | NodeFilter.SHOW_TEXT,
		            function() { return NodeFilter.FILTER_ACCEPT; },
		            false
		        );
		    };

		    /**
		     * _isClobbered
		     *
		     * @param  element to check for clobbering attacks
		     * @return true if clobbered, false if safe
		     */
		    var _isClobbered = function(elm) {
		        if (elm instanceof Text || elm instanceof Comment) {
		            return false;
		        }
		        if (  typeof elm.nodeName !== 'string'
		           || typeof elm.textContent !== 'string'
		           || typeof elm.removeChild !== 'function'
		           || !(elm.attributes instanceof NamedNodeMap)
		           || typeof elm.removeAttribute !== 'function'
		           || typeof elm.setAttribute !== 'function'
		        ) {
		            return true;
		        }
		        return false;
		    };

		    /**
		     * _isNode
		     *
		     * @param object to check whether it's a DOM node
		     * @return true is object is a DOM node
		     */
		    var _isNode = function(obj) {
		        return (
		            typeof Node === "object" ? obj instanceof Node : obj
		                && typeof obj === "object" && typeof obj.nodeType === "number"
		                && typeof obj.nodeName==="string"
		        );
		    };

		    /**
		     * _sanitizeElements
		     *
		     * @protect nodeName
		     * @protect textContent
		     * @protect removeChild
		     *
		     * @param   node to check for permission to exist
		     * @return  true if node was killed, false if left alive
		     */
		    var _sanitizeElements = function(currentNode) {
		        var tagName, content;
		        /* Execute a hook if present */
		        _executeHook('beforeSanitizeElements', currentNode, null);

		        /* Check if element is clobbered or can clobber */
		        if (_isClobbered(currentNode)) {
		            _forceRemove(currentNode);
		            return true;
		        }

		        /* Now let's check the element's type and name */
		        tagName = currentNode.nodeName.toLowerCase();

		        /* Execute a hook if present */
		        _executeHook('uponSanitizeElement', currentNode, {
		            tagName: tagName,
		            allowedTags: ALLOWED_TAGS
		        });

		        /* Remove element if anything forbids its presence */
		        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
		            /* Keep content except for black-listed elements */
		            if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]
		                    && typeof currentNode.insertAdjacentHTML === 'function') {
		                try {
		                    currentNode.insertAdjacentHTML('AfterEnd', currentNode.innerHTML);
		                } catch (e) {}
		            }
		            _forceRemove(currentNode);
		            return true;
		        }

		        /* Convert markup to cover jQuery behavior */
		        if (SAFE_FOR_JQUERY && !currentNode.firstElementChild &&
		                (!currentNode.content || !currentNode.content.firstElementChild) &&
		                /</g.test(currentNode.textContent)) {
		            DOMPurify.removed.push({element: currentNode.cloneNode()});
		            currentNode.innerHTML = currentNode.textContent.replace(/</g, '&lt;');
		        }

		        /* Sanitize element content to be template-safe */
		        if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
		            /* Get the element's text content */
		            content = currentNode.textContent;
		            content = content.replace(MUSTACHE_EXPR, ' ');
		            content = content.replace(ERB_EXPR, ' ');
		            if (currentNode.textContent !== content) {
		                DOMPurify.removed.push({element: currentNode.cloneNode()});
		                currentNode.textContent = content;
		            }
		        }

		        /* Execute a hook if present */
		        _executeHook('afterSanitizeElements', currentNode, null);

		        return false;
		    };

		    var DATA_ATTR = /^data-[\-\w.\u00B7-\uFFFF]/;
		    var IS_ALLOWED_URI = /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i;
		    var IS_SCRIPT_OR_DATA = /^(?:\w+script|data):/i;
		    /* This needs to be extensive thanks to Webkit/Blink's behavior */
		    var ATTR_WHITESPACE = /[\x00-\x20\xA0\u1680\u180E\u2000-\u2029\u205f\u3000]/g;

		    /**
		     * _sanitizeAttributes
		     *
		     * @protect attributes
		     * @protect nodeName
		     * @protect removeAttribute
		     * @protect setAttribute
		     *
		     * @param   node to sanitize
		     * @return  void
		     */
		    var _sanitizeAttributes = function(currentNode) {
		        var attr, name, value, lcName, idAttr, attributes, hookEvent, l;
		        /* Execute a hook if present */
		        _executeHook('beforeSanitizeAttributes', currentNode, null);

		        attributes = currentNode.attributes;

		        /* Check if we have attributes; if not we might have a text node */
		        if (!attributes) { return; }

		        hookEvent = {
		            attrName: '',
		            attrValue: '',
		            keepAttr: true,
		            allowedAttributes: ALLOWED_ATTR
		        };
		        l = attributes.length;

		        /* Go backwards over all attributes; safely remove bad ones */
		        while (l--) {
		            attr = attributes[l];
		            name = attr.name;
		            value = attr.value.trim();
		            lcName = name.toLowerCase();

		            /* Execute a hook if present */
		            hookEvent.attrName = lcName;
		            hookEvent.attrValue = value;
		            hookEvent.keepAttr = true;
		            _executeHook('uponSanitizeAttribute', currentNode, hookEvent );
		            value = hookEvent.attrValue;

		            /* Remove attribute */
		            // Safari (iOS + Mac), last tested v8.0.5, crashes if you try to
		            // remove a "name" attribute from an <img> tag that has an "id"
		            // attribute at the time.
		            if (lcName === 'name'  &&
		                    currentNode.nodeName === 'IMG' && attributes.id) {
		                idAttr = attributes.id;
		                attributes = Array.prototype.slice.apply(attributes);
		                _removeAttribute('id', currentNode);
		                _removeAttribute(name, currentNode);
		                if (attributes.indexOf(idAttr) > l) {
		                    currentNode.setAttribute('id', idAttr.value);
		                }
		            } else {
		                // This avoids a crash in Safari v9.0 with double-ids.
		                // The trick is to first set the id to be empty and then to
		                // remove the attriubute
		                if (name === 'id') {
		                    currentNode.setAttribute(name, '');
		                }
		                _removeAttribute(name, currentNode);
		            }

		            /* Did the hooks approve of the attribute? */
		            if (!hookEvent.keepAttr) {
		                continue;
		            }

		            /* Make sure attribute cannot clobber */
		            if (SANITIZE_DOM &&
		                    (lcName === 'id' || lcName === 'name') &&
		                    (value in window || value in document || value in formElement)) {
		                continue;
		            }

		            /* Sanitize attribute content to be template-safe */
		            if (SAFE_FOR_TEMPLATES) {
		                value = value.replace(MUSTACHE_EXPR, ' ');
		                value = value.replace(ERB_EXPR, ' ');
		            }

		            /* Allow valid data-* attributes: At least one character after "-"
		               (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
		               XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
		               We don't need to check the value; it's always URI safe. */
		            if (ALLOW_DATA_ATTR && DATA_ATTR.test(lcName)) ;
		            /* Otherwise, check the name is permitted */
		            else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
		                continue;
		            }
		            /* Check value is safe. First, is attr inert? If so, is safe */
		            else if (URI_SAFE_ATTRIBUTES[lcName]) ;
		            /* Check no script, data or unknown possibly unsafe URI
		               unless we know URI values are safe for that attribute */
		            else if (IS_ALLOWED_URI.test(value.replace(ATTR_WHITESPACE,''))) ;
		            /* Keep image data URIs alive if src is allowed */
		            else if (
		                lcName === 'src' &&
		                value.indexOf('data:') === 0 &&
		                DATA_URI_TAGS[currentNode.nodeName.toLowerCase()]) ;
		            /* Allow unknown protocols: This provides support for links that
		               are handled by protocol handlers which may be unknown ahead of
		               time, e.g. fb:, spotify: */
		            else if (
		                ALLOW_UNKNOWN_PROTOCOLS &&
		                !IS_SCRIPT_OR_DATA.test(value.replace(ATTR_WHITESPACE,''))) ;
		            /* Check for binary attributes */
		            else if (!value) ;
		            /* Anything else, presume unsafe, do not add it back */
		            else {
		                continue;
		            }

		            /* Handle invalid data-* attribute set by try-catching it */
		            try {
		                currentNode.setAttribute(name, value);
		                DOMPurify.removed.pop();
		            } catch (e) {}
		        }

		        /* Execute a hook if present */
		        _executeHook('afterSanitizeAttributes', currentNode, null);
		    };

		    /**
		     * _sanitizeShadowDOM
		     *
		     * @param  fragment to iterate over recursively
		     * @return void
		     */
		    var _sanitizeShadowDOM = function(fragment) {
		        var shadowNode;
		        var shadowIterator = _createIterator(fragment);

		        /* Execute a hook if present */
		        _executeHook('beforeSanitizeShadowDOM', fragment, null);

		        while ( (shadowNode = shadowIterator.nextNode()) ) {
		            /* Execute a hook if present */
		            _executeHook('uponSanitizeShadowNode', shadowNode, null);

		            /* Sanitize tags and elements */
		            if (_sanitizeElements(shadowNode)) {
		                continue;
		            }

		            /* Deep shadow DOM detected */
		            if (shadowNode.content instanceof DocumentFragment) {
		                _sanitizeShadowDOM(shadowNode.content);
		            }

		            /* Check attributes, sanitize if necessary */
		            _sanitizeAttributes(shadowNode);
		        }

		        /* Execute a hook if present */
		        _executeHook('afterSanitizeShadowDOM', fragment, null);
		    };

		    /**
		     * _executeHook
		     * Execute user configurable hooks
		     *
		     * @param  {String} entryPoint  Name of the hook's entry point
		     * @param  {Node} currentNode
		     */
		    var _executeHook = function(entryPoint, currentNode, data) {
		        if (!hooks[entryPoint]) { return; }

		        hooks[entryPoint].forEach(function(hook) {
		            hook.call(DOMPurify, currentNode, data, CONFIG);
		        });
		    };

		    /**
		     * sanitize
		     * Public method providing core sanitation functionality
		     *
		     * @param {String|Node} dirty string or DOM node
		     * @param {Object} configuration object
		     */
		    DOMPurify.sanitize = function(dirty, cfg) {
		        var body, importedNode, currentNode, oldNode, nodeIterator, returnNode;
		        /* Make sure we have a string to sanitize.
		           DO NOT return early, as this will return the wrong type if
		           the user has requested a DOM object rather than a string */
		        if (!dirty) {
		            dirty = '<!-->';
		        }

		        /* Stringify, in case dirty is an object */
		        if (typeof dirty !== 'string' && !_isNode(dirty)) {
		            if (typeof dirty.toString !== 'function') {
		                throw new TypeError('toString is not a function');
		            } else {
		                dirty = dirty.toString();
		            }
		        }

		        /* Check we can run. Otherwise fall back or ignore */
		        if (!DOMPurify.isSupported) {
		            if (typeof window.toStaticHTML === 'object'
		                || typeof window.toStaticHTML === 'function') {
		                if (typeof dirty === 'string') {
		                    return window.toStaticHTML(dirty);
		                } else if (_isNode(dirty)) {
		                    return window.toStaticHTML(dirty.outerHTML);
		                }
		            }
		            return dirty;
		        }

		        /* Assign config vars */
		        _parseConfig(cfg);

		        /* Clean up removed elements */
		        DOMPurify.removed = [];

		        if (dirty instanceof Node) {
		            /* If dirty is a DOM element, append to an empty document to avoid
		               elements being stripped by the parser */
		            body = _initDocument('<!-->');
		            importedNode = body.ownerDocument.importNode(dirty, true);
		            if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
		                /* Node is already a body, use as is */
		                body = importedNode;
		            } else {
		                body.appendChild( importedNode );
		            }
		        } else {
		            /* Exit directly if we have nothing to do */
		            if (!RETURN_DOM && !WHOLE_DOCUMENT && dirty.indexOf('<') === -1) {
		                return dirty;
		            }

		            /* Initialize the document to work on */
		            body = _initDocument(dirty);

		            /* Check we have a DOM node from the data */
		            if (!body) {
		                return RETURN_DOM ? null : '';
		            }
		        }

		        /* Get node iterator */
		        nodeIterator = _createIterator(body);

		        /* Now start iterating over the created document */
		        while ( (currentNode = nodeIterator.nextNode()) ) {

		            /* Fix IE's strange behavior with manipulated textNodes #89 */
		            if (currentNode.nodeType === 3 && currentNode === oldNode) {
		                continue;
		            }

		            /* Sanitize tags and elements */
		            if (_sanitizeElements(currentNode)) {
		                continue;
		            }

		            /* Shadow DOM detected, sanitize it */
		            if (currentNode.content instanceof DocumentFragment) {
		                _sanitizeShadowDOM(currentNode.content);
		            }

		            /* Check attributes, sanitize if necessary */
		            _sanitizeAttributes(currentNode);

		            oldNode = currentNode;
		        }

		        /* Return sanitized string or DOM */
		        if (RETURN_DOM) {

		            if (RETURN_DOM_FRAGMENT) {
		                returnNode = createDocumentFragment.call(body.ownerDocument);

		                while (body.firstChild) {
		                    returnNode.appendChild(body.firstChild);
		                }
		            } else {
		                returnNode = body;
		            }

		            if (RETURN_DOM_IMPORT) {
		                /* adoptNode() is not used because internal state is not reset
		                   (e.g. the past names map of a HTMLFormElement), this is safe
		                   in theory but we would rather not risk another attack vector.
		                   The state that is cloned by importNode() is explicitly defined
		                   by the specs. */
		                returnNode = importNode.call(originalDocument, returnNode, true);
		            }

		            return returnNode;
		        }

		        return WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
		    };

		    /**
		     * addHook
		     * Public method to add DOMPurify hooks
		     *
		     * @param {String} entryPoint
		     * @param {Function} hookFunction
		     */
		    DOMPurify.addHook = function(entryPoint, hookFunction) {
		        if (typeof hookFunction !== 'function') { return; }
		        hooks[entryPoint] = hooks[entryPoint] || [];
		        hooks[entryPoint].push(hookFunction);
		    };

		    /**
		     * removeHook
		     * Public method to remove a DOMPurify hook at a given entryPoint
		     * (pops it from the stack of hooks if more are present)
		     *
		     * @param {String} entryPoint
		     * @return void
		     */
		    DOMPurify.removeHook = function(entryPoint) {
		        if (hooks[entryPoint]) {
		            hooks[entryPoint].pop();
		        }
		    };

		    /**
		     * removeHooks
		     * Public method to remove all DOMPurify hooks at a given entryPoint
		     *
		     * @param  {String} entryPoint
		     * @return void
		     */
		    DOMPurify.removeHooks = function(entryPoint) {
		        if (hooks[entryPoint]) {
		            hooks[entryPoint] = [];
		        }
		    };

		    /**
		     * removeAllHooks
		     * Public method to remove all DOMPurify hooks
		     *
		     * @return void
		     */
		    DOMPurify.removeAllHooks = function() {
		        hooks = {};
		    };

		    return DOMPurify;
		})); 
	} (purify));

	var purifyExports = purify.exports;
	var dompurify = /*@__PURE__*/getDefaultExportFromCjs(purifyExports);

	var KEY_UP = 38;
	var KEY_DOWN = 40;
	var KEY_ENTER = 13;
	var activeClassName = 'search__result--active';
	var searchResultsHTML = function searchResultsHTML(stores) {
	  return stores.map(function (store) {
	    return "\n        <a href=\"/stores/".concat(store.slug, "\" class=\"search__result\">\n          <strong>").concat(store.name, "</strong>\n        </a>\n      ");
	  }).join();
	};
	function typeAhead(search) {
	  if (!search) return;
	  var searchInput = search.querySelector('input[name="search"]');
	  var searchResults = search.querySelector('.search__results');
	  searchInput.on('input', /*#__PURE__*/function () {
	    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
	      var res, data, html;
	      return _regenerator().w(function (_context) {
	        while (1) switch (_context.n) {
	          case 0:
	            if (e.target.value) {
	              _context.n = 1;
	              break;
	            }
	            searchResults.style.display = 'none';
	            return _context.a(2);
	          case 1:
	            searchResults.style.display = 'block';
	            _context.n = 2;
	            return fetch("/api/search?q=".concat(e.target.value));
	          case 2:
	            res = _context.v;
	            _context.n = 3;
	            return res.json();
	          case 3:
	            data = _context.v;
	            if (data.length) {
	              html = dompurify.sanitize(searchResultsHTML(data));
	              searchResults.innerHTML = html;
	            } else {
	              searchResults.innerHTML = dompurify.sanitize("<div class=\"search__result\">No results for ".concat(e.target.value, " found!</div>"));
	            }
	          case 4:
	            return _context.a(2);
	        }
	      }, _callee);
	    }));
	    return function (_x) {
	      return _ref.apply(this, arguments);
	    };
	  }());
	  searchInput.on('keyup', function (e) {
	    if (![KEY_DOWN, KEY_UP, KEY_ENTER].includes(e.keyCode)) {
	      return;
	    }
	    var current = searchResults.querySelector(".".concat(activeClassName));
	    var items = searchResults.querySelectorAll('.search__result');
	    if (e.keyCode === KEY_DOWN) {
	      if (!current) {
	        items[0].classList.add(activeClassName);
	      } else {
	        current.classList.remove(activeClassName);
	        var nextSibling = current.nextElementSibling || items[0];
	        nextSibling.classList.add(activeClassName);
	      }
	    } else if (e.keyCode === KEY_UP) {
	      if (!current) {
	        items[items.length - 1].classList.add(activeClassName);
	      } else {
	        current.classList.remove(activeClassName);
	        var prevSibling = current.previousElementSibling || items[items.length - 1];
	        prevSibling.classList.add(activeClassName);
	      }
	    } else if (e.keyCode === KEY_ENTER) {
	      if (current) {
	        window.location.assign(current.href);
	      }
	    }
	  });
	}

	var defaultLat = 43.2;
	var defaultLng = -79.8;
	var defaultZoom = 10;
	function loadPlaces(_x) {
	  return _loadPlaces.apply(this, arguments);
	}
	function _loadPlaces() {
	  _loadPlaces = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(map) {
	    var lat,
	      lng,
	      res,
	      places,
	      pins,
	      infobox,
	      locations,
	      _args = arguments;
	    return _regenerator().w(function (_context) {
	      while (1) switch (_context.n) {
	        case 0:
	          lat = _args.length > 1 && _args[1] !== undefined ? _args[1] : defaultLat;
	          lng = _args.length > 2 && _args[2] !== undefined ? _args[2] : defaultLng;
	          _context.n = 1;
	          return fetch("/api/stores/near?lat=".concat(lat, "&lng=").concat(lng));
	        case 1:
	          res = _context.v;
	          _context.n = 2;
	          return res.json();
	        case 2:
	          places = _context.v;
	          if (places.length) {
	            _context.n = 3;
	            break;
	          }
	          console.log('No places found');
	          return _context.a(2);
	        case 3:
	          pins = places.map(function (place) {
	            var _place$location$coord = _slicedToArray(place.location.coordinates, 2),
	              lng = _place$location$coord[0],
	              lat = _place$location$coord[1];
	            var center = new Microsoft.Maps.Location(lat, lng);
	            var pin = new Microsoft.Maps.Pushpin(center, null);
	            pin.place = place;
	            map.entities.push(pin);
	            return pin;
	          });
	          infobox = new Microsoft.Maps.Infobox(pins[0].getLocation(), {
	            visible: false,
	            autoAlignment: true
	          });
	          infobox.setMap(map);
	          pins.forEach(function (pin) {
	            Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {
	              var _e$target$place = e.target.place,
	                slug = _e$target$place.slug,
	                name = _e$target$place.name,
	                photo = _e$target$place.photo,
	                location = _e$target$place.location;
	              var htmlContent = "\n        <div class=\"popup\">\n          <a href=\"/stores/".concat(slug, "\">\n            <img src=\"/uploads/").concat(photo || 'store.png', "\" alt=\"").concat(name, "\" />\n            <p>").concat(name, " - ").concat(location.address, "</p>\n          </a>\n        </div>\n      ");
	              infobox.setOptions({
	                location: e.target.getLocation(),
	                htmlContent: htmlContent,
	                visible: true
	              });
	            });
	          });
	          Microsoft.Maps.Events.addHandler(map, 'click', function () {
	            infobox.setOptions({
	              visible: false
	            });
	          });

	          // adjust bounds
	          locations = pins.map(function (pin) {
	            return pin.getLocation();
	          });
	          map.setView({
	            bounds: Microsoft.Maps.LocationRect.fromLocations(locations)
	          });
	        case 4:
	          return _context.a(2);
	      }
	    }, _callee);
	  }));
	  return _loadPlaces.apply(this, arguments);
	}
	function makeMap(_x2) {
	  return _makeMap.apply(this, arguments);
	}
	function _makeMap() {
	  _makeMap = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(mapDiv) {
	    var mapOptions, map, input, autosuggestManager;
	    return _regenerator().w(function (_context2) {
	      while (1) switch (_context2.n) {
	        case 0:
	          if (mapDiv) {
	            _context2.n = 1;
	            break;
	          }
	          return _context2.a(2);
	        case 1:
	          mapOptions = {
	            center: new Microsoft.Maps.Location(defaultLat, defaultLng),
	            zoom: defaultZoom
	          };
	          map = new Microsoft.Maps.Map(mapDiv, mapOptions);
	          loadPlaces(map);
	          input = $('[name="geolocate"]');
	          _context2.n = 2;
	          return loadMapModule('Microsoft.Maps.AutoSuggest');
	        case 2:
	          autosuggestManager = new Microsoft.Maps.AutosuggestManager({
	            maxResults: 5
	          });
	          autosuggestManager.attachAutosuggest(input, input.parentElement, function (_ref) {
	            var location = _ref.location;
	            var latitude = location.latitude,
	              longitude = location.longitude;
	            map.setView({
	              center: location
	            });
	            loadPlaces(map, latitude, longitude);
	          });
	        case 3:
	          return _context2.a(2);
	      }
	    }, _callee2);
	  }));
	  return _makeMap.apply(this, arguments);
	}

	var container = $('.flash-messages');
	var removeBtnClass = 'js-added-remove';
	container.on('click', function (e) {
	  if (e.target.classList.contains(removeBtnClass)) {
	    e.target.parentElement.remove();
	  }
	});
	function flash(message) {
	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
	  var container = $('.flash-messages');
	  var el = document.createElement('div');
	  el.classList.add('flash', "flash--".concat(type));
	  el.innerHTML = dompurify.sanitize("\n    <p class=\"flash__text\">".concat(message, "</p>\n    <button class=\"flash__remove ").concat(removeBtnClass, "\">&times;</button>\n  "));
	  container.append(el);
	}

	function ajaxHeart(_x) {
	  return _ajaxHeart.apply(this, arguments);
	}
	function _ajaxHeart() {
	  _ajaxHeart = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
	    var res, body, isHearted;
	    return _regenerator().w(function (_context) {
	      while (1) switch (_context.n) {
	        case 0:
	          e.preventDefault();
	          _context.n = 1;
	          return fetch(this.action, {
	            method: 'post'
	          });
	        case 1:
	          res = _context.v;
	          _context.n = 2;
	          return res.json();
	        case 2:
	          body = _context.v;
	          if (!res.ok) {
	            flash(body.msg || "Oooooups! Something happened");
	          } else {
	            isHearted = this.heart.classList.toggle('heart__button--hearted');
	            if (isHearted) {
	              this.heart.classList.add('heart__button--float');
	              this.heart.on('animationend', function () {
	                this.classList.remove('heart__button--float');
	              });
	            }
	            $('.heart-count').textContent = body.hearts.length;
	          }
	        case 3:
	          return _context.a(2);
	      }
	    }, _callee, this);
	  }));
	  return _ajaxHeart.apply(this, arguments);
	}

	window.GetMap = function GetMap() {
	  autocomplete($('#address'), $('#lat'), $('#lng'));
	  makeMap($('#map'));
	};
	typeAhead($('.search'));
	var heartForms = $$('form.heart');
	heartForms.on('submit', ajaxHeart);

})();
//# sourceMappingURL=App.bundle.js.map
