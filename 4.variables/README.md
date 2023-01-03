# Variables

- [Variables](#variables)
  - [Overview](#overview)
  - [`var`](#var)
    - [Hoisting](#hoisting)
    - [Function scope](#function-scope)
    - [Function scope vs inner block](#function-scope-vs-inner-block)
    - [Closures](#closures)
  - [`let`](#let)
    - [Block scope](#block-scope)
    - [Inner vs outter block](#inner-vs-outter-block)
  - [`const`](#const)
    - [Can't be redeclared or reassigned](#cant-be-redeclared-or-reassigned)
    - [Mutations](#mutations)
  - [Temporal dead zone (TDZ)](#temporal-dead-zone-tdz)

## Overview

Some key points to remember:

- `var`: function scope and hoisting.
- `let`: block scope, temporal dead zone.
- `const`: block scope, can't be redeclared or reassigned.

## `var`

### Hoisting

```js
(function() {
  console.log(text); // undefined
  var text = "Hello World!";
  console.log(text); // Hello World!
})();
```

### Function scope

```js
(function () {
  for (var i = 0; i < 5; i++) {
    // Every reference inside this block to variable i
    // will actually point to the same variable (i.e., pointer)
    setTimeout(() => {
      console.log(i); // 5, 5, 5, 5, 5
    }, 100);
  }
})()
```

### Function scope vs inner block

```js
(function() {
  var text = "Hello";

  if (true) {
    text = "Bye!"; // has access to function scope
    var text = "Bye bye!"; // still refers to the same variable
  }

  console.log(text); // Bye Bye!
})();
```

### Closures

```js
 */
(function() {
  var text = "Hello";

  function innerFunction() {
    // var text = "new" // This would get scoped to the inner function only;
    text = "From inner function!"; // will change the outer function's variable
    console.log("[innerFunction] text:", text); // from inner function!
  }

  innerFunction();

  console.log("[outterFunction] text:", text); // from inner function!
})();
```

## `let`

### Block scope

```js
(function() {
  {
    let text = "Hello world!";
  }
  console.log(text); // ReferenceError: text is not defined
})();
```

### Inner vs outter block

```js
(function() {
  let text = "Hello";
  {
    let text = "Bye";
    console.log("[inner block] text:", text); // Bye
  }
  console.log("[outter block] text:", text); // Hello
})();
```

## `const`

### Can't be redeclared or reassigned

```js
{
  const text = "myTest";
  text = "another"; // TypeError: Assignment to constant variable.
}
```

### Mutations

You can still mutate reference types. For example, you can still push to an array:

```js
{
  const list = [];
  list.push(1);
  console.log(list);
}
```

## Temporal dead zone (TDZ)

A `let` or `const` variable is said to be in a Temporal dead zone (TDZ) from the start of the block scope until code execution reaches the line where the variable is declared and initialized.

While inside the TDZ, any attempt to access the variable will throw a `ReferenceError`.

```js
{
  // TDZ starts at beginning of scope
  const func = () => console.log(letVar); // OK

  // innerFunction();
  // Within the TDZ accessing letVar would throw `ReferenceError`

  let letVar = 3; // End of TDZ (for letVar)
  innerFunction(); // Works, called outside TDZ!
};
```

This differs from `var` variables, which will return `undefined` if they are accessed before they are declared because of _hoisting_.

```js
{ // TDZ starts at beginning of scope
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2; // End of TDZ (for foo)
}
```
