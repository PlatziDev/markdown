const MarkdownIt = require('markdown-it');

// markdown-it plugins
const emoji = require('markdown-it-emoji');
// const checkbox = require('markdown-it-task-checkbox');
const linkAttributes = require('markdown-it-link-attributes');
const implicitFigures = require('markdown-it-implicit-figures');
const mark = require('markdown-it-mark');
const ins = require('markdown-it-ins');
const abbr = require('markdown-it-abbr');
const deflist = require('markdown-it-deflist');
const video = require('markdown-it-video');


function createParser(options = {}) {
  if (typeof options !== 'object') {
    throw new TypeError('The markdown parser options must be an object.');
  }

  // Initialize the MD parser and apply plugins
  const parser = new MarkdownIt(
    Object.assign({
      html: false,
      breaks: true,
      linkify: true,
      xhtmlOut: true,
      typographer: true,
      langPrefix: 'language-',
    }, options)
  );

  parser.use(emoji);
  // parser.use(checkbox);
  parser.use(linkAttributes, {
    target: '_blank',
    rel: 'nofollow',
  });
  parser.use(implicitFigures);
  parser.use(mark);
  parser.use(ins);
  parser.use(abbr);
  parser.use(deflist);
  parser.use(video, options.video || {});

  return function parse(html) {
    return parser.render(html);
  };
}


module.exports = createParser;
