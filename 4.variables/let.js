/**
 * let
 * block scope
 * temporal dead zone
 */

/**
 * Inner block reassignment
 */
function myFunction1() {
  let text = "Hello";
  {
    let text = "Bye";
    console.log("[inner block] text:", text);
  }
  console.log("[outter block] text:", text);
}

/**
 * Closure, inner block
 */
function myFunction2() {
  {
    let text = "Hello world!";
  }
  console.log(text); // ReferenceError: text is not defined
}

/**
 * Temporal dead zone
 */
function myFunction3() {
      // TDZ starts at beginning of scope
      function innerFunction() {
        console.log(letVar); // OK
      }

      // Within the TDZ letVar access throws `ReferenceError`
      // innerFunction();
  
      let letVar = 3; // End of TDZ (for letVar)
      innerFunction(); // Called outside TDZ!
}

// myFunction1()
// myFunction2();
// myFunction3();
