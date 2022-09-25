/**
 * Functions
 */

/**
 * Hoisting
 */
console.log(myFunction);

/**
 * Function declaration.
 */
function myFunction() {
  console.log('myFunction');
}

/**
 * Function invocation.
 */
myFunction();

/**
 * Declaring as a variable.
 */
let myFunctionAsVariable = function() {
  console.log("myFunctionAsVariable");
}

/**
 * Arrow functions.
 * (Will be covered in a later chapter)
 */
const myArrowFunc = () => {
  console.log("myArrowFunc");
}

/**
 * High Order Functions & Closure.
 */
const myHocFunction = () => {
   let secretCounter = 0;

   // This is redundant but possible.
   // const newFunc = () => {}
   // return newFunc; 
   
   return () => {
      secretCounter++;
      console.log(secretCounter);
   }
}

// Anoynmous function invocation.
//(() => {})();
(function () {
  const myHocFunc = myHocFunction();
  const anotherHocFunc = myHocFunction();

  myHocFunc(); // 1
  myHocFunc(); // 2
  anotherHocFunc(); // 1
  myHocFunc(); // 3
})();
