const EleventyPluginRobotsTxt = require('../src/index.js')

module.exports = (eleventyConfig) => {
  /** @type {import("../src/typedefs.js").EleventyPluginRobotsTxtOptions */
  const options = {
    sitemapURL: 'https://example.com/sitemap.xml',
    shouldBlockAIRobots: true,
    rules: new Map([
      ['*', [{ disallow: '/404.html' }]],
      [['agent1', 'agent2', 'agent3'], [{ disallow: '/1' }, { disallow: '/2' }, { allow: '/3' }]]
    ])
  }
  eleventyConfig.addPlugin(EleventyPluginRobotsTxt, options)

  return {
    dir: {
      input: 'src',
      output: '_site'
    }
  }
}
