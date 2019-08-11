---
title: Understanding pseudo elements - Display hrefs in printed documents
published: true
description: 
tags: 
  - CSS 
  - HTML
series: Understanding pseudo elements
layout: layouts/post.njk
---

Have you ever tried reading a printed out website, then instantly becoming frustrated when you're trying to click the links? Pseudo elements can't really help you much with this, however they might help you a bit by displaying the links' urls! How do you do this, you ask? Let me show you the power of pseudo elements and the `attr()` function.

Printed documents only have two dimensions, and they aren't even clickable?! How can we tell the user what the underlined text goes to?

By using the `content` property together with the `attr()` CSS function, we can display the value of any attribute. As `href` is an attribute on `a` elements, surely we can display this too, right? Of course!s

```html
<a href="https://dev.to">a link with no clear sign of where it points to</a>
```

```css/2
@media print {
  a::after {
    content: ' (' attr(href) ') ';
  }
}
```

This code will yield the following result: 
![The link is rendered out with the url in parantheses showing after the link text](https://thepracticaldev.s3.amazonaws.com/i/lz5xppyhg3j7gmm6y3dm.png)

Granted printed documents have become rare, this is still a neat trick for those of us working with article heavy sites!
