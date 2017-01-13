# Platzi Flavored Markdown
This is the markdown parser used in the Platzi education platform editor.

This version of Markdown support the usual Github Flavored Markdown and Youtube videos, emojis, figure wrapping images, `<mark />` tags, underlines, abbr and definition lists.

## How use it
Install it with **npm**.

```bash
npm i -S @platzi/markdown
```

Import it in your project.

```js
import createParser from '@platzi/markdown';
```

And the use it.

```js
const parser = createParser();
const html = parser(`**this is my text in bold**`);
```

## Contribute
- Fork the project.
- Modify `index.js`.
- Run tests `npm t`.
- Fix problems (or the test).
