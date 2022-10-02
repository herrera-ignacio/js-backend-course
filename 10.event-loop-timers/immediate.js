/**
 * Timers
 * https://nodejs.org/en/docs/guides/timers-in-node/
 * https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
 * 
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
 */

/**
 * Immediate
 * Will execute code at the end of the current event loop cycle.
 * This will happen after I/O events and before any timers scheduled for the next event loop.
 * Meaning, any code following the `setImmediate()` function call will execute before the callback.
 */
 function myImmediate() {
  console.log('Before immediate'); // 1

  const immediate = setImmediate((arg) => {
    console.log(`Immediate with arg => ${arg}`);
  }, "my arg"); // 3

  console.log("After immediate"); // 2

  const abort = false;

  if (abort) {
    // Cancel immediate
    console.log(clearImmediate(immediate));
  }
}

// myImmediate();

function myImmediateWithTimeouts() {
  setImmediate((arg) => {
    console.log(`Immediate with arg => ${arg}`);
  }, "my arg"); // 3

  setTimeout(() => {
    console.log("setTimeout");
  }, 0); // 2, this happens before because it's scheduled for this event loop cycle

  console.log("After immediate"); // 1
}

// myImmediateWithTimeouts();
