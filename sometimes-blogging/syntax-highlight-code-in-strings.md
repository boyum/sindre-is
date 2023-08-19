---
title: Using tagged template literals to syntax highlight code in strings
published: true
tags:
  - CSS
  - HTML
  - JavaScript
layout: layouts/post.njk
date: 2023-06-21
---

Sometimes as developers we have to write code that generates code. This can be for a number of reasons, but one of the most common ones is that we want to generate HTML or CSS from JavaScript. This is a common pattern in libraries like [styled-components](https://styled-components.com/) and [Lit](https://lit.dev/), but it's also something you might want to do if you're writing a tool that generates HTML or CSS.

## The problem

This code often ends up as strings in JavaScript, and strings get no syntax highlighting. This is because the editor doesn't know that the string contains HTML or CSS, and will therefore highlight it as a regular JavaScript string. This is bad for readability and makes it easy to introduce bugs to the HTML or CSS code.

## The solution

We can use a few `String.raw` "hacks" to make Prettier format CSS and HTML strings!
The `String.raw` tagged template literal is basically a no-op and won't do any changes to the template string, but if you assign it to a variable with the name `html` or `css`, tools like Prettier and VS Code will interpret the string as HTML or CSS respectively ✨

Before:

```js
const myCss = `
  h1 {
    color: hotpink;
  }
`;

const myHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My document</title>
</head>
<body>
  <h1>Hello, world 🌏</h1>
</body>
</html>
`;
```

After:

```js
const css = String.raw;
const html = String.raw;

const myCss = css`
  h1 {
    color: hotpink;
  }
`;

const myHtml = html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My document</title>
    </head>
    <body>
      <h1>Hello, world 🌏</h1>
    </body>
  </html>
`;
```

(Regrettably, my blog doesn't recognize this as CSS or HTML, but try it out in your editor!)
