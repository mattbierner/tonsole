"use strict";
const console = require('console');
const tonsole = require('../index');
const assert = require('chai').assert;
const consoleCheck = require('./memory_console').consoleCheck;

['log', 'info', 'error', 'warn'].forEach(method => {
    describe(method, () => {
        const checkLog = consoleCheck(method);

        it('should return undefined for no args', () => {
            assert.strictEqual(undefined, checkLog());
        });

        it('should return single argument', () => {
            assert.strictEqual(1, checkLog(1));
            assert.strictEqual(false, checkLog(false));
            assert.strictEqual(undefined, checkLog(undefined));
            assert.strictEqual("abc", checkLog("abc"));
            assert.strictEqual("%s", checkLog("%s"));

            let a = {};
            assert.strictEqual(a, checkLog(a));
        });

        it('should return last argument', () => {
            assert.strictEqual(3, checkLog(1, 2, 3));
            assert.strictEqual(3, checkLog("%s%s", 2, 3));
            assert.strictEqual("%s", checkLog("%s%s", 2, "%s"));
            assert.deepEqual(null, checkLog(null, [1, 2], null));
        });
    });
});