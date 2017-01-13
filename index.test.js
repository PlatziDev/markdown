const createParser = require('./index.js');


const parser = createParser();


const markdown = `![Platzi Logo](https://static.platzi.com/static/images/logos/platzi@2x.png)

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium

# Heading 1
Lorem **ipsum** dolor _sit_ ++amet++.

The HTML ==specification== is maintained by the W3C.

- \`item 1\`
- item 2
- item 3

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b

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
