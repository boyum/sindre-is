---
title: Typescript's "satisfies" keyword
published: true
description:
tags:
  - TypeScript
layout: layouts/post.njk
date: 2023-05-12
---

`satisfies` is a pretty cool keyword that came with TypeScript 5! There aren't many places it can be used, but for config objects and default exports, it's especially good.

You might already know that `as` has its limitations. It's not very good because we're telling the TypeScript compiler that we know better than it does. It turns off some checks and just takes what we say at face value:

```typescript
type Person = {
  name: string;
  age: number;
};

const person = {
  name: "Sindre",
} as Person;
// No error because `name` is a valid field in Person,
// and when we use `as`, TS says "okay, fine" even though
// `age` is missing in the `person` object.
```

Instead, we can use `satisfies` to ask TypeScript to check if we've included everything we need:

```typescript
type Person = {
  name: string;
  age: number;
};

const person = {
  name: "Sindre",
} satisfies Person; // Error: `age` is missing.
```

In this case, it would have been the same to write `const person: Person = { ... }`, but we can't type with `:` everywhere - that's where "satisfies" comes into play.
