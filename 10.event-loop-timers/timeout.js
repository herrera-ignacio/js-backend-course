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
