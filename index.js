var MarkdownIt = require('markdown-it');

// markdown-it plugins
var emoji = require('markdown-it-emoji');
var linkAttributes = require('markdown-it-link-attributes');
var implicitFigures = require('markdown-it-implicit-figures');
var mark = require('markdown-it-mark');
var ins = require('markdown-it-ins');
var abbr = require('markdown-it-abbr');
var deflist = require('markdown-it-deflist');
var video = require('markdown-it-video');
// var podcast = require('markdown-it-podcast');
var codesandbox = require('markdown-it-codesandbox');
var mentions = require('markdown-it-mentions');

function createParser(_options, _extraPlugins) {
  // default options
  var options;
  if (typeof _options === 'undefined') {
    options = {};
  } else {
    options = _options;
  }

  // default extra plugins
  var extraPlugins;
  if (typeof _extraPlugins === 'undefined') {
    extraPlugins = [];
  } else {
    extraPlugins = _extraPlugins;
  }

  // type validations
  if (typeof options !== 'object') {
    throw new TypeError('The markdown parser options must be an object.');
  }

  if (!Array.isArray(extraPlugins)) {
    throw new TypeError('The parser extra plugins must be an array.');
  }

  // Initialize the MD parser and apply plugins
  var parser = new MarkdownIt(
    Object.assign(
      {
        html: false,
        breaks: true,
        linkify: true,
        xhtmlOut: true,
        typographer: true,
        langPrefix: 'language-'
      },
      options
    )
  );

  parser.use(emoji);
  parser.use(
    linkAttributes,
    Object.assign(
      {
        attrs: {
          target: '_blank',
          rel: 'nofollow noopener'
        }
      },
      options.links || {}
    )
  );
  parser.use(implicitFigures, options.figures || {});
  parser.use(mark);
  parser.use(ins);
  parser.use(abbr);
  parser.use(deflist);
  parser.use(video, options.video || {});
  // parser.use(podcast, options.podcast || {});
  parser.use(codesandbox);
  parser.use(
    mentions,
    Object.assign(
      {
        parseURL: function parseURL(username) {
          return 'https://platzi.com/@' + username;
        }
      },
      options.mentions || {}
    )
  );

  function applyPlugin(extraPlugin) {
    if (Array.isArray(extraPlugin)) {
      const plugin = extraPlugin[0];
      const config = extraPlugin[1];
      return parser.use(plugin, config || {});
    }
    parser.use(extraPlugin);
  }

  // apply extra plugins
  extraPlugins.forEach(applyPlugin);

  function parse(html) {
    return parser.render(html);
  }

  return parse;
}

module.exports = createParser;
