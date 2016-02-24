"use strict";
const NodeConsole = require('console').Console;
const process = require('process');

/**
 * Wrapper around node console that adds return values.
 */
export class Console {
    constructor(stdOut, stdErr) {
        this._inner = new NodeConsole(stdOut, stdErr);
    }

    _loggingProxy(methodName, args) {
        this._inner[methodName].apply(this._inner, args);
        return args[args.length - 1];
    }

    // Wrapped calls
    log(/*...*/) {
        return this._loggingProxy('log', arguments);
    }

    info(/*...*/) {
        return this._loggingProxy('info', arguments);
    }

    warn(/*...*/) {
        return this._loggingProxy('warn', arguments);
    }

    error(/*...*/) {
        return this._loggingProxy('error', arguments);
    }

    dir(obj, options) {
        this._inner.dir(obj, options);
        return obj;
    }

    assert(value /*, ...*/) {
        this._inner.assert.apply(this._inner, arguments);
        return value;
    }
    
    // Pass throughs
    time(label) {
        this._inner.time(label);
    }

    timeEnd(label) {
        this._inner.timeEnd(label);
    }

    trace(/*...*/) {
        this._inner.trace.apply(this._inner, arguments);
    }
}

/**
 * Global console used for `console.log` APIs
 */
const globalConsole = new Console(process.stdout, process.stderr);

export const log = globalConsole.log.bind(globalConsole);
export const info = globalConsole.info.bind(globalConsole);
export const warn = globalConsole.warn.bind(globalConsole);
export const error = globalConsole.error.bind(globalConsole);

export const dir = globalConsole.dir.bind(globalConsole);
export const assert = globalConsole.assert.bind(globalConsole);

export const time = globalConsole.time.bind(globalConsole);
export const timeEnd = globalConsole.timeEnd.bind(globalConsole);
export const trace = globalConsole.timeEnd.bind(globalConsole);
