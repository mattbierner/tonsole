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
    
    log() {
        this._inner.log.apply(this._inner.log, arguments);
        return arguments[arguments.length - 1];
    }
}

/**
 * Global console used for `console.log` style APIs
 */
const globalConsole = new Console(process.stdout, process.stderr);

export const log = globalConsole.log.bind(globalConsole);