---
title: Will Biome (https://biomejs.dev) replace Prettier and ESLint?
published: true
description: Biome is a new formatter and linter written in Rust. It's much faster than existing tools, but will it replace Prettier and ESLint?
layout: layouts/post.njk
cover_image: https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
date: 2024-01-29
---

Over the weekend I started playing with the rather new formatter and linter written in Rust.
If you're familiar with Prettier and ESLint, you'll quickly get into the basics.
The improvement was clear!
ESLint and Prettier spent 5+7 seconds running on the same code with a cache, while Biome merely spent 50ms on the entire codebase.
However, I think that for most codebases, the developer experience will be key – I only rarely notice IDE slowdown because of Prettier and ESLint.

➕ Some positive notes I've made are:

- Biome can pretty much be set up to have the same rules as Prettier (with only a few tweaks)
- Its documentation for getting started is really good and npx biome init really gets you going quick
- It seems that most of the lint rules I use are present, but I haven't actually written code while using it
- It seems that the lint rules have sane defaults (comparing to my existing code which uses ESLint's/`@typescript-eslint`'s defaults)
- My projects need much fewer dependencies now
- Git precommit hooks can be made so fast with Biome that I might actually start using them

➖ I find it a bit difficult to say whether or not Biome is the perfect contender after this minimal test, however it really seems promising. I have a few worries which might not be justifiable, but they are:

- Are Biome's parsers up to date? Do they support Angular's new control flow, for example?
- Is there a well-functioning plugin community? Prettier formats yaml files, will I find a Biome plugin which does the same?
- Does Biome have lint rules that replace all of ESLint and `@typescript-eslint/*`?
- How does its documentation compare to ESLint's?

All in all, though - I'm excited to see where Biome goes!
It seems mature enough for most projects and is in any case good competition for the existing tools!
