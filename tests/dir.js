"use strict";
const console = require('console');
const tonsole = require('../index');
const assert = require('chai').assert;
const consoleCheck = require('./memory_console').consoleCheck;

describe(`dir`, () => {
    const checkDir = consoleCheck('dir');

    it('should return undefined for no args', () => {
        assert.strictEqual(undefined, checkDir());
    });

    it('should return first argument when it is only arg', () => {
        assert.strictEqual(1, checkDir(1));
        assert.strictEqual(false, checkDir(false));
        assert.strictEqual(undefined, checkDir(undefined));
        assert.strictEqual("abc", checkDir("abc"));
        assert.strictEqual("%s", checkDir("%s"));

        let a = {};
        assert.strictEqual(a, checkDir(a));
    });

    it('should return first argument when more than one arg is provided', () => {
        assert.strictEqual(1, checkDir(1, { depth: 1 }));
        assert.strictEqual(false, checkDir(false,  { depth: 1 }, 3));
    });
});
