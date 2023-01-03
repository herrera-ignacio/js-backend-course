# Functions

- [Functions](#functions)
  - [Hoisting](#hoisting)
  - [Declaring as a variable](#declaring-as-a-variable)
  - [Arrow functions](#arrow-functions)
  - [Closures](#closures)
  - [IIFE (Immediately Invoked Function Expression)](#iife-immediately-invoked-function-expression)
    - [Why use IIFE?](#why-use-iife)
      - [Avoid polluting the global namespace](#avoid-polluting-the-global-namespace)
      - [Async functions](#async-functions)
      - [The module pattern](#the-module-pattern)
      - [var before ES6](#var-before-es6)

## Hoisting

Functions are hoisted to the top of the scope in which they are defined. This means that you can call a function before it is defined.

```js
foo(); // foo

function foo() {
  console.log('foo');
}
```

## Declaring as a variable

Functions can be declared as a variable. This is called a function expression. Function expressions are not hoisted.

```js
let foo = function() {
  console.log('foo');
};

foo(); // foo
```

## Arrow functions

Arrow functions have some special properties:

- Don't have a prototype poperty (can't be used as constructors using `new`).
- Don't create a new context (can't use `this`).
- Not suitable for call, apply, and bind methods.
- Cannot use yield (cannot be used as generators).

```js
const foo = () => {
  console.log('foo');
};
```

## Closures

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (i.e., the lexical environment). It's created every time a function is created, at function creation time.

It gives you access to an outer function's scope from an inner function.

```js
const myClosure = () => {
   let secretCounter = 0;

   // This is redundant but possible.
   // const newFunc = () => {}
   // return newFunc; 
   
   return () => {
      secretCounter++;
      console.log(secretCounter);
   }
}
```

## IIFE (Immediately Invoked Function Expression)

> Also called _Self-Executing Anonymous Function_. [See MDN docs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

An IIFE is a JavaScript function that runs as soon as it is defined.

```js
(function() {
  console.log('foo');
})();
```

### Why use IIFE?

#### Avoid polluting the global namespace

If we have some initation code that we don't need to use again:

```js
(() => {
  // some initiation code
  let firstVariable;
  let secondVariable;
})();

// firstVariable and secondVariable will be discarded after the function is executed.
```

#### Async functions

IIFE allows you to use `await` and `for await` even in older browsers and JavaScript runtimes that have no top-level await:

```js
const getFileStream = async (url) => {
  // implementation
};

(async () => {
  const stream = await getFileStream("https://domain.name/path/file.ext");
  for await (const chunk of stream) {
    console.log({ chunk });
  }
})();
```

#### The module pattern

The module pattern is a design pattern used to encapsulate private methods and variables, which can only be accessed publicly through a defined API.

```js
const makeWithdraw = (balance) =>
  ((copyBalance) => {
    let balance = copyBalance; // This variable is private
    const doBadThings = () => {
      console.log("I will do bad things with your money");
    };
    doBadThings();
    return {
      withdraw(amount) {
        if (balance >= amount) {
          balance -= amount;
          return balance;
        }
        return "Insufficient money";
      },
    };
  })(balance);

const firstAccount = makeWithdraw(100); // "I will do bad things with your money"
console.log(firstAccount.balance); // undefined
console.log(firstAccount.withdraw(20)); // 80
console.log(firstAccount.withdraw(30)); // 50
console.log(firstAccount.doBadThings); // undefined; this method is private
const secondAccount = makeWithdraw(20); // "I will do bad things with your money"
console.log(secondAccount.withdraw(30)); // "Insufficient money"
console.log(secondAccount.withdraw(20)); // 0
```

#### var before ES6

Suppose we want to create 2 buttons with the texts "Button 0" and "Button 1", and when we click them, we would like them to alert 0 and 1 respectively. The following code doesn't work:

```js
for (var i = 0; i < 2; i++) {
  const button = document.createElement("button");
  button.innerText = `Button ${i}`;
  button.onclick = function () {
    console.log(i);
  };
  document.body.appendChild(button);
}
console.log(i); // 2
```

When clicked, both Button 0 and Button 1 will alert 2 because `i` is global, with the last value being 2. To fix this problem before ES6, we could use the IIFE pattern:

```js
for (var i = 0; i < 2; i++) {
  const button = document.createElement("button");
  button.innerText = `Button ${i}`;
  button.onclick = (function (copyOfI) {
    return () => {
      console.log(copyOfI);
    };
  })(i);
  document.body.appendChild(button);
}
console.log(i); // 2
```
