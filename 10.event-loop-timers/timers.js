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
 * Timeout
 * Execute as close as possible after a designated amount of milliseconds.
 * Other executing code that blocks or holds onto the event loop
 * will push the execution of the timeout back.
 */
function myTimeout() {
  setTimeout((arg) => {
    console.log(`my setTimeout with arg => ${arg}`);
  }, 1000, "my arg")
}

// myTimeout();

/**
 * Cancel a timeout
 */
function myTimeoutCancel() {
  const timeout = setTimeout(() => {
    console.log("my setTimeout");
  }, 1000)

  const abort = true;

  if (abort) {
    // Before timeout interval
    clearTimeout(timeout);
  }
};

// myTimeoutCancel();

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

/**
 * Interval
 * Will run a callback an infinite number of times with a given millisecond delay between each execution.
 * The delay cannot be guaranteed because of operations that may hold on the event loop.
 */
function myInterval() {
  const interval = setInterval((arg) => {
    console.log(`my setInterval with arg => ${arg}`);
  }, 500, "my arg");

  // Clear after 2000ms
  setTimeout(() => {
    clearInterval(interval);
  }, 2000);
}

// myInterval();
