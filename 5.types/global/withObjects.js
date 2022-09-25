/**
 * this, advanced
 */

/**
 * Simple object binding
 */
const myObj = {
  myNumber: 1,
  printNum() {
    console.log(this.myNumber);
  }
}

// myObj.printNum(); // 1;

/**
 * What if we reuse a function?
 */
function reusablePrintNum() {
  console.log(this.myNumber);
}

const myObj2 = {
  myNumber: 2,
  printNum: reusablePrintNum,
}

// myObj2.printNum(); // 2

/**
 * What if we want to get something from other object?
 */
const myObj3 = {
  myNumber: 3,
  printExternalNum: myObj.printNum, // "this" refers to myObj3 when calling
}

// myObj3.printExternalNum() // 3!

/**
 * Solving it with bind!
 */
const myObj4 = {
  myNumber: 4,
  printExternalNum: myObj.printNum.bind(myObj), // "this" refers to myObj when calling
  printObj3Num: myObj.printNum.bind(myObj2), // "this" refers to myObj2 when calling
}

/**
 * Caution with arrow functions
 */
const myObj5 = {
  myNumber: 5,
  printNum: () => {
    // When called, will refer to enclosing scope.
    console.log(this.myNumber)
  }
}

const myObj6 = {
  myNumber: 6,
  printExternalNum: myObj5.printNum,
}

// myObj6.printExternalNum(); // Undefined!, enclosing scope is global object
this.myNumber = "I'm actually a string!";
// myObj6.printExternalNum(); // I'm actually a string!
