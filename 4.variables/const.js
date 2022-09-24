/**
 * const
 */

/**
 * Can't reassign or redeclare.
 */
function myFunction1() {
  const text = "myTest";
  text = "another"; // TypeError: Assignment to constant variable.
}

/**
 * No hoisting.
 */
function myFunction2() {
  console.log(text); // ReferenceError: text is not defined
  const text = "myTest";
}

/**
 * Mutations can be done using object methods.
 */
function myFunction3() {
  const list = [];
  list.push(1);
  console.log(list);
}

// myFunction1();
// myFunction2();
// myFunction3();
