const MarkdownIt = require('markdown-it')
const emoji = require('markdown-it-emoji')
const linkAttributes = require('markdown-it-link-attributes')
const implicitFigures = require('markdown-it-implicit-figures')
const mark = require('markdown-it-mark')
const ins = require('markdown-it-ins')
const abbr = require('markdown-it-abbr')
const deflist = require('markdown-it-deflist')
const video = require('markdown-it-video')
const podcast = require('markdown-it-podcast')

function createParser(_options, _extraPlugins) {
  // default options
  var options
  if (typeof _options === 'undefined') {
    options = {}
  } else {
    options = _options
  }

  // default extra plugins
  var extraPlugins
  if (typeof _extraPlugins === 'undefined') {
    extraPlugins = []
  } else {
    extraPlugins = _extraPlugins
  }

  // type validations
  if (typeof options !== 'object') {
    throw new TypeError('The markdown parser options must be an object.')
  }

  if (!Array.isArray(extraPlugins)) {
    throw new TypeError('The parser extra plugins must be an array.')
  }

  // Initialize the MD parser and apply plugins
  const parser = new MarkdownIt(
    Object.assign(
      {
        html: false,
        breaks: true,
        linkify: true,
        xhtmlOut: true,
        typographer: true,
        langPrefix: 'language-',
      },
      options
    )
  )

  parser.use(emoji)
  // parser.use(checkbox);
  parser.use(linkAttributes, {
    attrs: {
      target: '_blank',
      rel: 'nofollow noopener',
    }
  })
  parser.use(implicitFigures)
  parser.use(mark)
  parser.use(ins)
  parser.use(abbr)
  parser.use(deflist)
  parser.use(video, options.video || {})
  parser.use(podcast, options.podcast || {})

  function applyPlugin(extraPlugin) {
    if (Array.isArray(extraPlugin)) {
      const plugin = extraPlugin[0]
      const config = extraPlugin[1]
      return parser.use(plugin, config || {})
    }
    parser.use(extraPlugin)
  }

  // apply extra plugins
  extraPlugins.forEach(applyPlugin)

  function parse(html) {
    return parser.render(html)
  }

  return parse;
}

module.exports = createParser
