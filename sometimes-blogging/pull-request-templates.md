---
title: Help your reviewers with good PR descriptions
published: true
description:
layout: layouts/post.njk
cover_image: https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2360&q=80
date: 2023-09-19
---

One of the things I miss the most in my everyday life as a pull request reviewer is good code descriptions and an explanation that tells me how to test and review the code. Pull requests come in all sizes, and some of them are so heavy that it's difficult to know where to begin! Maybe you're not familiar with the code already, or perhaps the person who created the PR has changed a thousand files.

To solve this, I appreciate good PR descriptions! GitHub allows you to add a pull_request_template.yml file in the .github folder. This serves as a template for the descriptions of new PRs. I like a setup like this:

```md
📝 Description
A description of the changes made. If there are multiple things done, I would recommend using bullet lists. They can:

- Help break up the text
- Clarify what one should focus on
- Make the description more elegant ✨

👀 Review
How to go about reading through the code and testing it. Have you used a specific page to test the changes? Include a link! Numbered lists are a good pro-tip here. They can instruct which steps to follow for testing (all steps should use "1." as Markdown will handle numbering automatically):

1. Open https://link-to-pr.example.org/login
1. Log in with username ("heihei@gmail.com") and password ("👡🐒🪲")
1. Ensure that the website is no longer upside down but the right way up ✨

You can also use a checklist to indicate what needs to be tested:

- [ ] Check that the website is not upside down
- [ ] Test that logging out is possible too

✅ Check list
This checklist can be used by those who created the PR. Typical items might include:

I have

- [ ] Reviewed the code and self-reviewed
- [ ] Written tests where necessary
- [ ] Updated the documentation where necessary
```

For these templates to work efficiently, it's important to mention that it's optional to use parts of them, but also recommended to use them. One tip is to use `<!-- comments -->` to insert text that helps the person creating the PR use the template.
