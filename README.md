# Tonsole
Wrapper around [Node's console][console] that adds return values to logging calls.

This is useful for logging expressions and arrow functions without having to change any code.

```js
const tonsole = require('tonsole');

let compute = (data) => data ? process(data.value) : data;

// Normally we can't easily log what `compute` does without
// rewriting it to use statements
compute = (data) => {
    if (data) {
        const r = process(data.value);
        console.log('Processed data: ', r);
        return r;
    }
    console.error('Invalid data: ', data);
    return data;
};

// But with tonsole, we can add logging while still using
// expressions, just as the ancient ones of Lisp intended.
compute = (data) =>
    data
        ?tonsole.log('Processed data: ', process(data.value))
        :tonsole.error('Invalid data: ', data);
```

## Usage

```bash
$ npm install --save tonsole
```

Tonsole provides a complete wrapper around the entire [Node console api][console]. All functions forward to the wrapped Node console implementation. 


#### `tonsole.Console(stdout [, stderr])`
Wrapper around `console.Console`. Logging methods of this class return values besides logging.

#### `tonsole.log(...args)`
#### `tonsole.info(...args)`
#### `tonsole.warn(...args)`
#### `tonsole.error(...args)`
Each of these methods logs using the inner `console.*` method, but instead of returning `undefined`, they return the last argument value.

```js
tonsole.log("%s : %s", 2, 3);
// Logs: "2 : 3"
// returns 3
```

#### `tonsole.assert(value, ...args)`
Verify that `value` is truthy using `console.assert` but returns `value`. If `value` is falsy, an `AssertionError` is thrown.

```js
tonsole.assert(5, "sanity check") === 5

tonsole.assert(false, "should fail") // throws AssertionError 
```

#### `tonsole.dir(obj, options)`
Simply wrapper around `console.dir` that returns `obj`.


#### `tonsole.time(label)`
#### `tonsole.timeEnd(label)`
#### `tonsole.trace(msg, ...)`
Forward directly to `console.*` and continue to return undefined. 

[console]: https://nodejs.org/api/console.html