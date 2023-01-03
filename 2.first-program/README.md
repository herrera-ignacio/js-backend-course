# Running your first program

- [Running your first program](#running-your-first-program)
  - [How JavaScript runs?](#how-javascript-runs)
    - [Browser](#browser)
    - [Node.js](#nodejs)

## How JavaScript runs?

The need of an interpreter or runtime environment.

### Browser

- Create `index.js` file.

```js
console.log("Hello World from JavaScript!");
```

- Create `index.html` file and import JavaScript file using `<script>` tag.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My First JS Program</title>
  </head>
  <body>Inspect your console with F12!</body>
  <script src="./index.js"></script>
</html>
```

- Open `index.html` in browser.

### Node.js

You can use Node.js as a runtime environment for JavaScript without the need of the browser: `node index.js`.
