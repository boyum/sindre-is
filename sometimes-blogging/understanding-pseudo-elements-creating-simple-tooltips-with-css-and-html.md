---
title: Understanding pseudo elements - Creating Simple Tooltips with CSS and HTML
published: true
description: 
tags: 
  - CSS
  - HTML
series: Understanding pseudo elements
---


Tooltips are a nice way to show the user extra info about the site's UI. By making use of CSS attribute selectors and the `attr()` function, we're able to create a neat little tooltip to show our users extra info that we don't want to add to the element's text. Scroll down to the bottom to see the tooltips in action, or follow along to learn how to make them yourself!

## Preface

Before we begin, we need to understand what problems tooltips solve. They help confused users understand the UI we have created. Confused users come in all different shapes and we need to help them all. This means our tooltips must work for:

- Sighted users
- Users with vision impairments
- Those using a mouse
- Those who prefer navigating the web with only a keyboard

Descriptive text can be added through the use of `aria-*` attributes, such as `aria-label` and `aria-description`, and the keyboard users need the element to be focusable. This pretty much sorts itself out, as any element with a tooltip probably is some kind of a focusable element already (`a`, `button`, `input`, `textarea`), however should you need to add a tooltip to a `div`, please think twice to help those of us who won't be able to see that information. 

We also need to add some kind of hover effect for those of us using a mouse pointer. Is there a way to neatly combine all these things such that our tooltips make a great developer experience as well? Let's write some code!

## Step 1: The HTML

There is not much code to write in the HTML part of this, which is actually great, as it means it won't become a hassle to use it!

Let's start with a simple button:

```html
<button
  data-tooltip
  aria-description="Stormy weather ahead!">
  ⚡⚡⚡
</button>
```

The `aria-description` attribute makes screen readers read both the text inside the `button` element, as well as the description text. We'll use the `data-tooltip` to tell the browser that this element should have a tooltip. 

## Step 2: Creating a tooltip in CSS

By using pseudo-elements and `content: attr()`, we can display any of the element's attribute values:

```css
/* Target any element with the `data-tooltip` and `aria-description` attributes */
[data-tooltip][aria-description]::before {
  content: attr(aria-description);
  display: none;
}

[data-tooltip][aria-description]:hover::before,
[data-tooltip][aria-description]:focus::before {
  /* Show the tooltip on hover and focus */
  display: block;
}
```

## Step 3: Styling the tooltip

Ok, now we have a default styled button and some text that pops out whenever we hover or set focus to it. The description can even be read by screen readers! We've done great already, but the UX is not very good for sighted users. Let's fix that!

Check out the final result on CodePen:

<iframe src="https://codepen.io/sindre/pen/XLELQr"></iframe>
