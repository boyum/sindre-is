---
title: Add type safety to your CSS modules
published: true
description:
tags:
  - TypeScript
  - CSS
layout: layouts/post.njk
cover_image: https://images.unsplash.com/photo-1547991476-3ac613673c46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80
date: 2023-05-15
---

I really like using CSS modules when programming with React. There are other options too, like the long list of CSS-in-JS libraries and Tailwind, but I like to hand write my CSS in (S)CSS files.

CSS modules typically look like this:

`my-component.module.css`

```css
.myClass {
  color: rebeccapurple;
}
```

`my-component.tsx`

```tsx
import styles from "./my-component.module.css";

const MyComponent = () => {
  return <h1 className={styles.myClass}>Hi!</h1>;
};
```

I find this pattern quite neat and easy to work with. The only thing that has annoyed me with this is that TypeScript doesn't really help us out here. There's nothing stopping me from using the class `iDontExist` in my React component, even though it doesn't exist. That makes my code error prone as I'll have to check if the styles were added correctly.

There's a TypeScript plugin that fixes exactly that issue! With `typescript-plugin-css-modules`, TypeScript will check that we only use class names that are defined in the CSS file!

To install, follow these steps:

1. Install the package (`npm install -D typescript-plugin-css-modules`)
1. Add the plugin to tsconfig's `compilerOptions` section: `"plugins": [{ "name": "typescript-plugin-css-modules" }]`
1. Do you use VS Code? Follow these steps to get type hints in the editor: <https://github.com/mrmckeb/typescript-plugin-css-modules#visual-studio-code>
1. Is TypeScript still complaining? For CSS modules to work, you'll need to declare the modules globally. Create a declaration file (any file named `*.d.ts` , typically `index.d.ts`) and add the following:

   ```ts
   declare module "*.module.css" {
     const classes: { [key: string]: string };
     export default classes;
   }

   declare module "*.module.scss" {
     const classes: { [key: string]: string };
     export default classes;
   }
   ```

Now you have achieved type safety! Beware that TypeScript plugins only work with IDEs and code editors. The TypeScript compiler will not use the plugins and won't give any errors if you're using a class name that doesn't exist.

_Cover image by [Meckl Antal](https://unsplash.com/@meckl_antal) on [Unsplash](https://unsplash.com/photos/XxjFXaMf1-4)_
