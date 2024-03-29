---
title: Improve your Dependabot experience with grouping and version ignoring
published: true
description:
tags:
  - Dependabot
  - Automation
series: Dependabot
layout: layouts/post.njk
cover_image: https://images.unsplash.com/photo-1570221622224-3bb8f08f166c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2360&q=80
date: 2023-08-19
---

Dependabot is GitHub's tool for automating dependency updates. It's great! But it can be a little noisy. Here are some tips for making it a little less so.

## Grouping

Ever had Dependabot create seven PRs for the same dependency update? If you're working with dependencies like Storybook, you probably have. To make it a little smarter, we can tell it to group certain dependencies. The `groups` keyword lets us create a new group and specify by a pattern which dependencies should be grouped together.

```yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: daily
    groups:
      storybook:
        patterns:
          - "@storybook/*"
          - storybook
```

By doing this, all dependencies that match the regexes will be grouped together in one PR and we no longer get a load of different PRs every week when SB creates a new patch version (no critique of SB here, it's just a very active project!).

Other groups could be `angular`, `eslint`, `react`, and `@typescript-eslint`.

It's also possible to group by dependency type, so you could group all dev dependencies together, for example.
See more in [the docs](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#groups).

## Ignoring patch updates

For projects that are moved to maintenance, it's sometimes nice to turn off patch updates, especially if maintenance only happens every couple of weeks. This can be done by adding the following to the Dependabot config:

```yml
ignore:
  - dependency-name: '\*'
    update-types: ["version-update:semver-patch"]
```

That will ignore all patch updates for all dependencies. If you want to ignore patch updates for a specific dependency, you can do that too:

```yml
ignore:
  - dependency-name: storybook
    update-types: ["version-update:semver-patch"]
```

_Cover image by [Xavier von Erlach](https://unsplash.com/@xavier_von_erlach) on [Unsplash](https://unsplash.com/photos/ooR1jY2yFr4)_
