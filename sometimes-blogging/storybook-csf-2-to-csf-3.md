---
title: Storybook - Update your stories from CSF 2 to CSF 3 now!
published: true
description:
tags:
  - Storybook
series: Storybook
layout: layouts/post.njk
date: 2023-08-18
---

Storybook 7 came out earlier this year and together with better performance and type safety the team shipped ✨ Component Story Format (CSF) 3 ✨! In my opinion it makes stories looks nicer and beautifuller and they're simpler to write!

As with a few other updates in Storybook, this one comes with a migration! Just run this to migrate all stories from v2 to v3 (switch out the glob pattern with whatever matches your project):

```bash
npx storybook@latest migrate csf-2-to-3 --glob="**/*.stories.ts"
```

What do the new stories look like, you ask? They went from something like this:

```tsx
export default {
  title: "My/Story",
  component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const Template: ComponentStory<typeof MyComponent> = args => (
  <MyComponent {...args} />
);

export const Story1 = Template.bind({});
Story1.args = {
  hello: "world",
};

export const Story2 = Template.bind({});
Story2.args = {
  hello: "🌏",
};
```

to this:

```tsx
export default {
  title: "My/Story",
  component: MyComponent,
  // This is the default render method and can be omitted
  render: args => {
    return <MyComponent {...args} />;
  },
} satisfies Meta<typeof MyComponent>;

type Story = StoryObj<typeof MyComponent>;

export const Story1: Story = {
  args: {
    hello: "world",
  },
};

export const Story2: Story = {
  args: {
    hello: "🌏",
  },
};
```

Note that I'm using satisfies here to provide type safety for the default export. This really doesn't have anything to do with Storybook, but is a nice way of improving the code base a little ✨
