/**
 * Timers & Closures
 * https://github.com/herrera-ignacio/javascript-interview-questions/blob/master/this/README.md
 */

/**
 * Problem 1
 * Function executes on its own context
 */
function problem1() {
  this.i = 1;

  setTimeout(function() {
    // this => Timeout, new context
    // console.log(this);
    console.log(this.i); // undefined
  }, 100);
}

// problem1();

function solution1() {
  this.i = 1;

  setTimeout(() => {
    // Arrow function doesn't create a binding
    // Therefore, "obj" enclosing scope will be used.
    console.log(this.i); // 1
  }, 100);
}

// solution1();

/**
 * Problem 2
 * Function executes on its own context
 */
function problem2() {
  const obj = {
    count: 10,
    doSomethingLater: function() {
      // function keyword binds "this" to the "obj" context
      // this => obj
      setTimeout(function() {
        // this => Timeout, new context
        // console.log(this);
        this.count++; // NaN
        console.log(this.count); // NaN
      }, 300);
    }
  }

  obj.doSomethingLater();
}

// problem3();

function solution2() {
  const obj = {
    count: 10,
    doSomethingLater: function() {
      // function keyword binds "this" to the "obj" context
      // this => obj
      setTimeout(() => {
        // Arrow function doesn't create a binding
        // Therefore, "obj" enclosing scope will be used.
        this.count++;
        console.log(this.count);
      }, 300);
    }
  }

  obj.doSomethingLater();
}

// solution2();

/**
 * Problem 3
 * Scopes with var & let
 */
function problem3() {
  for (var i = 0; i < 3; i++) {
    // var defines variables in the function scope,
    // therefore, every reference inside this block to variable i
    // will actually point to the same variable (i.e., same reference).
    setTimeout(function() {
      // This will execute after the loop has finished,
      // and therefore variable i will be 3.
      console.log(i); // 3, 3, 3
    }, 0);

    // setImmediate will work the same
  }
}

// problem3();

function solution3() {
  // If we defined outside the for block scope, then we'd have the same problem as with var.
  // Because the block scope will be the function scope.
  // let i;
  for (let i = 0; i < 3; i++) {
    // let defines variables in a block scope,
    // therefore, every reference inside this block to variable i
    // will actually point to different variables (i.e., different references).
    setTimeout(function() {
      // Even though this will execute after the loop has finished,
      // variable i will be binded to a different reference each time
      // containing different values
      console.log(i); // 0, 1, 2
    })
  }
}

// solution3();
