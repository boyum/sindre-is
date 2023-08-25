---
title: The new `using` keyword in TypeScript 5.2
published: true
tags:
  - TypeScdript
layout: layouts/post.njk
date: 2023-08-25
---

TypeScript 5.2 is out! The newest version comes with ✨Explicit Resource Management✨ and the using keyword!

Just like in C# it will now be possible to create auto-disposable resources, which means that it is no longer the consumer's responsibility to, say, close connections.

This example is copied from the [TS team's blog post](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management), which makes it quite clear how to set it up imo:

```ts
function loggy(id: string): Disposable {
    console.log(`Creating ${id}`);

    return {
        [Symbol.dispose]() {
            console.log(`Disposing ${id}`);
        }
    }
}

function func() {
    using a = loggy("a");
    using b = loggy("b");
    {
        using c = loggy("c");
        using d = loggy("d");
    }
    using e = loggy("e");
    return;

    // Unreachable.
    // Never created, never disposed.
    using f = loggy("f");
}

func();
```

Output:

```sh
Creating a
Creating b
Creating c
Creating d
Disposing d
Disposing c
Creating e
Disposing e
Disposing b
Disposing a
```

The using​​ keyword comes together with an addition to Symbol - dispose, which is how we mark an object as disposable. These are part of an [ECMAScript proposal](https://github.com/tc39/proposal-explicit-resource-management) which has reached stage 3 out of 4, and will soon be available in all browsers.
