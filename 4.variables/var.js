/**
 * var
 * functional scope
 * hoisting
 */

/**
 * Simple reassignment
 */
function myFunction1() {
  var text = "Hello";

  // Reassign
  text = text + " World";
  // text += ", World";

  console.log(text);
}

/**
 * Inner block
 */
function myFunction2() {
  var text = "Hello";

  if (true) {
    // text = "Bye!";
    // This still refers to the function scope
    // var text = "Bye!";
  }

  console.log(text);
}

/**
 * Closure, inner function
 */
function myFunction3() {
  var text = "Hello";

  function innerFunction() {
    // var text = "This will get scoped to the inner function";
    text = "From inner function!";
    console.log("[innerFunction] text:", text);
  }

  innerFunction();

  console.log("[outterFunction] text:", text);
}

/**
 * Hoisting
 */
function myFunction4() {
  console.log(text); // undefined
  var text = "Hello World!";
  console.log(text);
}

/**
 * Function scope example
 */
function myFunction5() {
  for (var i = 0; i < 5; i++) {
    // Every reference inside this block to variable i
    // will actually point to the same variable (i.e., pointer)
    setTimeout(() => {
      console.log(i); // 5, 5, 5, 5, 5
    }, 100);
  }
}


// myFunction1();
// myFunction2();
// myFunction3();
// myFunction4();
// myFunction5();
