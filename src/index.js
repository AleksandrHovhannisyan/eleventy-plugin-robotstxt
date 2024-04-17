const { warn, getRobotsTxt } = require('./utils')

/**
 * @param {unknown} eleventyConfig
 * @param {import("./typedefs").EleventyPluginRobotsTxtOptions} options
 */
module.exports = async (eleventyConfig, options) => {
  // https://www.11ty.dev/docs/plugins/#feature-testing
  if (!('addTemplate' in eleventyConfig)) {
    warn('Eleventy plugin compatibility: Virtual Templates are required for this plugin. Please use Eleventy v3.0 or newer.')
  }

  const { rules, sitemapURL, shouldBlockAIRobots, frontMatterOverrides } = options

  const frontMatter = {
    permalink: '/robots.txt',
    eleventyExcludeFromCollections: true,
    ...frontMatterOverrides
  }

  let robotsTxt = getRobotsTxt({ rules, sitemapURL })
  // Optional: soft-block AI robots
  if (shouldBlockAIRobots) {
    // TODO: use eleventy cache plugin?
    let disallowedAIRobots = await fetch('https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt')
    disallowedAIRobots = await disallowedAIRobots.text()
    robotsTxt += '\n\n' + disallowedAIRobots
  }

  // Needed per https://github.com/11ty/eleventy/issues/1612#issuecomment-2027476340
  eleventyConfig.addTemplateFormats('liquid')
  // Virtual template: https://github.com/11ty/eleventy/issues/1612
  eleventyConfig.addTemplate('./robots.liquid', robotsTxt, frontMatter)
}
