---
title: Creating a Simple Confirm Modal in Vanilla JS
published: true
description: Let's make a custom version of window.confirm() with the dialog element and the Promise API!
tags: 
  - JS
  - HTML
layout: layouts/post.njk
date: 2019-09-25
---

Ever tried using `window.confirm()` before? It's a remarkable method that is very handy whenever you want your users to *really* be sure of what they're doing. However, have you tried styling it? Just like with `window.alert()` it's impossible, so we'll need to create our own Confirm Modal. I'll show you how!

## What to solve

First, it's useful to map out what we're trying to solve. It's important that our modal can do three things:

- Ask the user the question they should answer (e. g. 'Do you really want to delete your user account?')
- Let the user say 'Yes'
- Let the user say 'No'

Also, for developers, `window.confirm()` is *so* easy to use. We don't want to make it much harder for the developers using our custom confirm than it is to do `const theyAreSure = window.confirm('Are you sure');`.

Another thing the native modal comes with is the modal itself. We don't want the devs using our component to create a lot of markup every time they need to ask their users to confirm something, which means our custom modal needs to produce this markup automatically.

Ultimately, it should

- Be easy to use
- Not run any code before the user says 'yes'

## How to solve it

### Markup

For the sake of this tutorial, it's not too important to specify a convoluted markup, so let's just use this simple code as our HTML base:

```html
<dialog class="confirm-dialog">
  <div class="confirm-dialog-question">Do you really want to delete your user account?</div>
  <div class="confirm-dialog-button-group">
    <button class="confirm-dialog-button confirm-dialog-button--false" type="button">Noo</button>
    <button class="confirm-dialog-button confirm-dialog-button--true" type="button">Yes!</button>
  </div>
</dialog>
```

If you're unfamiliar with the `<dialog>` element, go check out [MDN's documentation about it](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)! As a short introduction, it's a native element supported by Chrome, Firefox and Opera ([there is a polyfill as well](https://github.com/GoogleChrome/dialog-polyfill)) which you can use to show a modal with the `showModal()` method as such:

```javascript
function createDialog() {
  const dialog = document.createElement('dialog');
  dialog.textContent = '✨✨✨';

  document.body.appendChild(dialog);

  dialog.showModal();
}
```

### JavaScript API

By making use of the [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) together with [`async`/`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), we can solve two of the things we listed earlier: We can make the code easy to use and we can wait for a signal for when (or if) to actually run the code that deletes every user in the db.

Ultimately, we would want the use of our component to look something like this:

```javascript
async function deleteUsers() {
  const dialog = new ConfirmModal({
    questionText: 'Are you sure you want to delete every user?',
  });
  
  const deleteEveryUser = await dialog.confirm();
  if (deleteEveryUser) {
    // ...
  }
}
```

This makes for an easy to use component, but would this work?

JavaScript's `await`   stops code execution until the Promise that it's waiting for has been either **resolved** or **rejected**. The Promise can be resolved by  a function triggered by an Event and this is how we'll structure our code. When creating a new Promise, we will add an event listener to the two buttons and, depending on which of the buttons is clicked, resolve the Promise to either `true` or `false` - whether or not the user confirms.

## Solving it

Let's start by creating a `ConfirmModal` class for our component. Its constructor will need three things:

- The question text
- The 'Yes' button's text
- The 'No' button's text

```javascript
class ConfirmDialog {
  constructor({
    questionText,
    trueButtonText,
    falseButtonText
  }) {
    this.questionText = questionText ?? 'Are you sure?';
    this.trueButtonText = trueButtonText ?? 'Yes';
    this.falseButtonText = falseButtonText ?? 'No';

    this.dialog = undefined;
    this.trueButton = undefined;
    this.falseButton = undefined;
    this.parent = document.body;

    this._createDialog();
    this._appendDialog();
  }
}
```

I've created one method which creates the `<dialog>` element and its children, one which appends it to the `<body>`, and one which removes it from the body and then deletes our `ConfirmDialog` object. They look as such:

```javascript
  _createDialog() {
    this.dialog = document.createElement("dialog");
    this.dialog.classList.add("confirm-dialog");

    const question = document.createElement("div");
    question.textContent = this.questionText;
    question.classList.add("confirm-dialog-question");
    this.dialog.appendChild(question);

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("confirm-dialog-button-group");
    this.dialog.appendChild(buttonGroup);

    this.falseButton = document.createElement("button");
    this.falseButton.classList.add(
      "confirm-dialog-button",
      "confirm-dialog-button--false"
    );
    this.falseButton.type = "button";
    this.falseButton.textContent = this.falseButtonText;
    buttonGroup.appendChild(this.falseButton);

    this.trueButton = document.createElement("button");
    this.trueButton.classList.add(
      "confirm-dialog-button",
      "confirm-dialog-button--true"
    );
    this.trueButton.type = "button";
    this.trueButton.textContent = this.trueButtonText;
    buttonGroup.appendChild(this.trueButton);
  }

  _appendDialog() {
    this.parent.appendChild(this.dialog);
  }

  _destroy() {
    this.parent.removeChild(this.dialog);
    delete this;
  }
```

Now, for the final part. Let's create the `confirm()` method. Inside it we need to show the modal, and to create event listeners for the two yes/no buttons and make them resolve to either `true` or `false` and then remove every trace of the component itself.

```javascript
confirm() {
  return new Promise((resolve, reject) => {
    const somethingWentWrongUponCreation =
      !this.dialog || !this.trueButton || !this.falseButton;
    if (somethingWentWrongUponCreation) {
      reject("Something went wrong upon modal creation");
    }

    this.dialog.showModal();
    this.trueButton.focus();

    this.trueButton.addEventListener("click", () => {
      resolve(true);
      this._destroy();
    });

    this.falseButton.addEventListener("click", () => {
      resolve(false);
      this._destroy();
    });
  });
}
```

Nice! I've tested it here:
{% codepen 'https://codepen.io/sindre/pen/RwbvObK' %}
