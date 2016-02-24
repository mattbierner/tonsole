"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeConsole = require('console').Console;
var process = require('process');

/**
 * Wrapper around node console.
 */

var Console = exports.Console = (function () {
    function Console(stdOut, stdErr) {
        _classCallCheck(this, Console);

        this._inner = new NodeConsole(stdOut, stdErr);
    }

    _createClass(Console, [{
        key: 'log',
        value: function log() {
            this._inner.log.apply(this._inner.log, arguments);
            return arguments[arguments.length - 1];
        }
    }]);

    return Console;
})();

/**
 * Global console used for `console.log` style APIs
 */

var globalConsole = new Console(process.stdout, process.stderr);

var log = exports.log = globalConsole.log.bind(globalConsole);
//# sourceMappingURL=index.js.map
