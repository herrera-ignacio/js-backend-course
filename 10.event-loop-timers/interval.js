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
