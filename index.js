const MarkdownIt = require('markdown-it')

// markdown-it plugins
const emoji = require('markdown-it-emoji')
// const checkbox = require('markdown-it-task-checkbox');
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
  let options
  if (typeof _options === 'undefined') {
    options = {}
  } else {
    options = _options
  }

  // default extra plugins
  let extraPlugins
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
    target: '_blank',
    rel: 'nofollow',
  })
  parser.use(implicitFigures)
  parser.use(mark)
  parser.use(ins)
  parser.use(abbr)
  parser.use(deflist)
  parser.use(video, options.video || {})
  parser.use(podcast, options.podcast || {})

  // apply extra plugins
  extraPlugins.forEach(extraPlugin => {
    if (Array.isArray(extraPlugin)) {
      const [plugin, config] = extraPlugin
      return parser.use(plugin, config || {})
    }
    parser.use(extraPlugin)
  })

  return function parse(html) {
    return parser.render(html)
  }
}

module.exports = createParser
