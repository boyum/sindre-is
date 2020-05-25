---
title: Create a Simple Dark Mode with CSS Filters
published: true
description: 
tags: 
  - CSS
  - HTML
layout: layouts/post.njk
date: 2019-07-10
---

So there's this thing you probably haven't heard of called "dark mode". Yeah, you're right, they're everywhere. Let me teach you how to grace the interwebs with even more instances of light on dark! 🌓

**Caveat**: This tutorial uses the power of [CSS Filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter), thus isn't supported by every browser. Per July 10 2019, [94.36% of users support it worldwide](https://caniuse.com/#search=css%20filter).

## How do filters work?

The CSS `filter` property lets us add effects with functions such as monochrome, blur, saturate and a few others. Each of these functions take parameters, and because of this, the possibilities are practically endless. [The CSS filter MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) has a few examples and describes them quite well.

```css
.invert-me {
  filter: invert(100%);
}
```

Another filter function is the ✨`invert()`✨ function. It takes a percentage (or decimal number between 0 and 1). MDN tells us this:

_[The filter function] inverts the samples in the input image. The value of amount defines the proportion of the conversion. A value of 100% is completely inverted. A value of 0% leaves the input unchanged. Values between 0% and 100% are linear multipliers on the effect. The lacuna value for interpolation is 0._

This sounds perfect for creating a simple dark mode! After all, black inverted is white (and vice versa), right? Sure! Let's try just inverting the entire page and  see how that looks:

{% codepen 'https://codepen.io/sindre/QXzPdj' %}

It looks kind of ok already! Apart from the inverted image, the page looks alright. How could we stop the image from inverting? We might be able to do some magic trick by moving the images out of the container, then position them correctly with absolute positioning, however that sounds terrible for ux, dx and a11y, and possibly more abbreviations, so we need to find another way. We could also invert only parts of the page, let's say every `<p>`, `<hx>`, `<strong>`, `<ul>` and so on, however this might create new problems when trying to invert the background as there might be margins between the elements.

## The solution

But wait! The invert of white is black and the invert of black is white... Could this mean that any color inverted an even number of times is just the same color? Of course that's the case! Let's just invert all images back to their original form when inverting the wrapper!

{% codepen 'https://codepen.io/sindre/WqJxGZ' %}

That seems to work! Now every image will be inverted back. We can also use the class `no-dark-mode` to invert back other elements, such as videos, elements with CSS background images or parts of the page that are already light on dark in color.
