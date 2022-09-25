/**
 * Global Object & this.
 */


// myGlobalVar = "Hello World!";
// console.log(myGlobalVar); // Hello World!
this.myGlobalVar = "Hola Mundo!";
this.myNumber = 1;

// { myGlobalVar: 'Hola Mundo!', myNumber: 1 }
// console.log(this); 

/**
 * Creates own scope.
 */
function myFunction() {
  // Object [global] in Node
  // [object Window] in the browser.
  // console.log(this); 
  console.log(this.myNumber); // undefined
  this.myNumber = 2;
  console.log(this.myNumber) // 2
}

// myFunction();
// console.log(this.myNumber) // 1

/**
 * Binds to enclosing scope
 */
const myUnbindedFunction = () => {
  console.log(this.myNumber); // 1
}

// myUnbindedFunction();


function myCustomBindedFunction() {
  console.log(this.myNumber);
}

// This won't work if using an arrow function.
// myCustomBindedFunction.bind({ myNumber: 7 })();
