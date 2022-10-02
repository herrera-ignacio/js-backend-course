# Event loop & timers

> See reference: https://nodejs.org/en/docs/guides/timers-in-node/ and https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

- [Event loop & timers](#event-loop--timers)
  - [Frontend - Window agent's event loop](#frontend---window-agents-event-loop)
    - [Tasks](#tasks)
    - [Microtasks](#microtasks)
      - [When to use microtasks](#when-to-use-microtasks)
    - [Iteration of event loop](#iteration-of-event-loop)
  - [Backend - Nodejs event loop](#backend---nodejs-event-loop)
    - [Node's event loop explained](#nodes-event-loop-explained)

## Frontend - Window agent's event loop

> [HTML Spec](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) & [ECMAScript agent](https://tc39.es/ecma262/#sec-agents).

To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must se _event loops_.

Conceptually, an _agent_ comprises a set of ECMAScript execution contexts, an execution context stack, a running execution context, an Agent Record, and an executing thread. Except for the executing thread, the constituents of an agent belong exclusively to that agent.

> Some web browsers share a single executing thread across multiple unrelated tabs of a browser window, for example.

### Tasks

> https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth

An event loop has one or more __task queues__. A _task_ encapsulate algorithms that are responsible for such work as dispatching events, parsing html, callbacks, fetching & processing resources, reacting to DOM manipulation, etc.

A task is any JavaScript code which is scheduled to be run by the standard mechanisms such as initially starting to run a program, an event firing and triggering a callback, a `setTimeout()`, or a `setInterval()`.

> Tasks queues are actually _sets_, not queues, because the event loop processing model grabs the first runnable task from the chosen "queue", instead of dequeueing the first task.

When executing tasks from the task queue, the runtime executes each task that is in the queue at the moment a new iteration of the event loop begins. _Tasks added to the queue after the iteration begins will not run until the next iteration_.

### Microtasks

An event loop has a __microtask queue__. A _microtask_ is a short function which is executed after the function or program which created it exits and only if the JavaScript execution stack is empty, but before returning control to the event loop being used by the user agent.

Each time a task exits, and the execution context stack is empty, each microtask in the microtask queue is executed, one after another. _The execution of microtasks continues until the queue is empty, even if new ones are scheduled in the interim_. In other words, microtasks can enqueue new microtasks and those new microtasks will execute before the next task begins to run, and before the end of the current event loop iteration.

> __JavaScript promises__ and the __Mutation Observer API__ both use the microtask queue to run their callbacks, but there are other times when the ability to defer work until the current event loop pass is wrapping up. In order to allow microtasks to be used by third-party libraries, frameworks, and polyfills, the `queueMicrotask()` method is exposed on the Window and Worker interfaces.

#### When to use microtasks

> See [examples](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).

Generally, it's about _capturing or checking results, or performing cleanup_, after the main body of a JavaScript execution context exits, but before any event handlers, timeouts and intervals, or other callbacks are processed.

You can also use microtasks for _batching operations_: collect multiple requests from various sources into a single batch, avoiding the possible overhead involved with multiple calls to handle the same kind of work.

### Iteration of event loop

The oldest runnable task in the task queue will be executed during a single iteration of the event loop. 

After that, microtasks will be executed until the microtask queue is empty, and then the browser may choose to update rendering. Then the browser moves on to the next iteration of event loop.

## Backend - Nodejs event loop

The event loop allows Node.js to perform __non-blocking I/O operations__ — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.

When one of these operations completes, the kernel tells Node.js so that the appropriate *callback* may be added to the *poll* queue to eventually be executed.

### Node's event loop explained

```js
 /* 
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
```
