"use strict";
const NodeConsole = require('console').Console;
const process = require('process');

/**
 * Wrapper around node console.
 */
export class Console {
    constructor(stdOut, stdErr) {
        this._inner = new NodeConsole(stdOut, stdErr);
    }

    _loggingProxy(methodName, args) {
        this._inner[methodName].apply(this._inner, args);
        return args[args.length - 1];
    }

    log() {
        return this._loggingProxy('log', arguments);
    }

    info() {
        return this._loggingProxy('info', arguments);
    }

    warn() {
        return this._loggingProxy('warn', arguments);
    }

    error() {
        return this._loggingProxy('error', arguments);
    }
}

/**
 * Global console used for `console.log` style APIs
 */
const globalConsole = new Console(process.stdout, process.stderr);

export const log = globalConsole.log.bind(globalConsole);
export const info = globalConsole.info.bind(globalConsole);
export const error = globalConsole.error.bind(globalConsole);
export const warn = globalConsole.warn.bind(globalConsole);