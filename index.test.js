const createParser = require('./index.js');


const parser = createParser();


const markdown = `# heading 1
## heading 2# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
**Lorem** _ipsum_ ++dolor++ [sit](https://platzi.com) amet.

![Platzi Logo](https://static.platzi.com/static/images/logos/platzi@2x.png)

- \`item 1\`
- item 2

1. item
2. another item

> quote of text

\`\`\`js
function greeting() {
	return 'hello world!';
}
\`\`\`

@[youtube](ajLJOhf-WdA)`;


test('Platzi Flavored Markdown parser', () => {
  const html = parser(markdown);
  expect(html).toMatchSnapshot();
});
