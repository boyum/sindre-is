---
layout: layouts/mini-tip.njk
title: "001: Chromium DevTools - Use $ and $$ as shortcuts for document.querySelector and document.querySelectorAll ✨"
tags:
  - mini-tips
---

Ever used DevTools' console for quick debugging? In that case, you might have searched for an element with `document.querySelector(<selector>)`. That works as a charm, as the console reads regular JavaScript, however the Chromium team has added a few shortcuts to make our lives easier.

In a kind of jQuery-ish way, `$` maps to `document.querySelector`, while `$$` is synonymous with `document.querySelectorAll`:

