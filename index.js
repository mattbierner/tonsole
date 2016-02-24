"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeConsole = require('console').Console;
var process = require('process');

/**
 * Wrapper around node console that adds return values.
 */

var Console = exports.Console = (function () {
    function Console(stdOut, stdErr) {
        _classCallCheck(this, Console);

        this._inner = new NodeConsole(stdOut, stdErr);
    }

    _createClass(Console, [{
        key: '_loggingProxy',
        value: function _loggingProxy(methodName, args) {
            this._inner[methodName].apply(this._inner, args);
            return args[args.length - 1];
        }

        // Wrapped calls

    }, {
        key: 'log',
        value: function log() /*...*/{
            return this._loggingProxy('log', arguments);
        }
    }, {
        key: 'info',
        value: function info() /*...*/{
            return this._loggingProxy('info', arguments);
        }
    }, {
        key: 'warn',
        value: function warn() /*...*/{
            return this._loggingProxy('warn', arguments);
        }
    }, {
        key: 'error',
        value: function error() /*...*/{
            return this._loggingProxy('error', arguments);
        }
    }, {
        key: 'dir',
        value: function dir(obj, options) {
            this._inner.dir(obj, options);
            return obj;
        }
    }, {
        key: 'assert',
        value: function assert(value /*, ...*/) {
            this._inner.assert.apply(this._inner, arguments);
            return value;
        }

        // Pass throughs

    }, {
        key: 'time',
        value: function time(label) {
            this._inner.time(label);
        }
    }, {
        key: 'timeEnd',
        value: function timeEnd(label) {
            this._inner.timeEnd(label);
        }
    }, {
        key: 'trace',
        value: function trace() /*...*/{
            this._inner.trace.apply(this._inner, arguments);
        }
    }]);

    return Console;
})();

/**
 * Global console used for `console.log` APIs
 */

var globalConsole = new Console(process.stdout, process.stderr);

var log = exports.log = globalConsole.log.bind(globalConsole);
var info = exports.info = globalConsole.info.bind(globalConsole);
var warn = exports.warn = globalConsole.warn.bind(globalConsole);
var error = exports.error = globalConsole.error.bind(globalConsole);

var dir = exports.dir = globalConsole.dir.bind(globalConsole);
var assert = exports.assert = globalConsole.assert.bind(globalConsole);

var time = exports.time = globalConsole.time.bind(globalConsole);
var timeEnd = exports.timeEnd = globalConsole.timeEnd.bind(globalConsole);
var trace = exports.trace = globalConsole.timeEnd.bind(globalConsole);
//# sourceMappingURL=index.js.map
