"use strict";
const stream = require('stream');
const console = require('console');
const tonsole = require('../index');
const assert = require('chai').assert;
const memory_stream = require('./memory_console');

const createMemoryStream = () => {
    const out = new stream.Writable();
    out._write = function (chunk, encoding, done) {
        this.data.push(chunk.toString());
        done();
    };
    out.data = [];

    out.clear = function () {
        this.data = [];
    };
    return out;
};

/**
 * Test helper used to ensure tonsole and regular console log same values for `funcName`.
 */
module.exports.consoleCheck = (funcName) => 
    function (/*...*/) {
        const tonsoleOut = createMemoryStream();
        const tonsoleErr = createMemoryStream();
        const tonsoleConsole = new tonsole.Console(tonsoleOut, tonsoleErr);

        const consoleOut = createMemoryStream();
        const consoleErr = createMemoryStream();
        const consoleConsole = new console.Console(consoleOut, consoleErr);

        const result = tonsoleConsole[funcName].apply(tonsoleConsole, arguments);
        consoleConsole[funcName].apply(consoleConsole, arguments);
        
        // make sure logged data is the same as builtin console.
        assert.deepEqual(consoleOut.data, tonsoleOut.data);
        assert.deepEqual(consoleErr.data, tonsoleErr.data);
        return result;
    };