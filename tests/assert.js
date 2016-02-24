"use strict";
const console = require('console');
const tonsole = require('../index');
const assert = require('chai').assert;
const consoleCheck = require('./memory_console').consoleCheck;

describe(`assert`, () => {
    const checkAssert = consoleCheck('assert');

    it('should return undefined for no args', () => {
        let r = 100;
        assert.throws(() => { r = checkAssert(); });
        assert.strictEqual(100, r);
    });

    it('should return first argument when it is only arg', () => {
        assert.strictEqual(1, checkAssert(1));
        assert.strictEqual("%s", checkAssert("%s"));

        let a = {};
        assert.strictEqual(a, checkAssert(a));
    });

    it('should return first argument when more than one arg is provided', () => {
        assert.strictEqual(1, checkAssert(1, "%s"));
        
        let r = 100;
        assert.throws(() => { r = checkAssert(false, "%s"); });
        assert.strictEqual(100, r);
    });
});
