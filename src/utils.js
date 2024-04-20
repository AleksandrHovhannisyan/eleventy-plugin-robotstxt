const report = (message) => `[eleventy-plugin-robots] ${message}`
const warn = (message) => console.log(report(message))
const error = (message) => new Error(report(message))

// TODO: this is a naive algorithm that may fail for certain URL types. Use sindresorhus's is-absolute-url package instead once Eleventy 3.0 ships and becomes stable. At that point, it should be safe to migrate this package to ESM.
const isAbsoluteUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch (e) {
    throw error('Invalid sitemapURL.')
  }
}

/** @param {Omit<import("./typedefs").EleventyPluginRobotsTxtOptions, 'shouldBlockAIRobots'>} options */
const getRobotsTxt = (options) => {
  const { sitemapURL, rules } = options

  let robotsTxt = ''
  if (sitemapURL) {
    if (!isAbsoluteUrl(sitemapURL)) {
      throw error('sitemapURL is not an absolute URL.')
    }
    robotsTxt += `Sitemap: ${sitemapURL}`
    if (rules?.size) {
      robotsTxt += '\n\n'
    }
  }
  if (rules) {
  // Concatenate declaration block per user agent group
    robotsTxt += Array.from(rules).map(([userAgents, pathRules]) => {
      let userAgentGroup = ''
      // Handle single user agent strings and arrays in one go
      const userAgentsArray = [].concat(userAgents)
      // Group user agents together
      userAgentGroup += userAgentsArray.map((agent) => `User-agent: ${agent}`).join('\n')
      if (!pathRules.length) {
        throw error(`No path rules provided for user agent(s): ${userAgents.join(',')}.`)
      }
      userAgentGroup += '\n'
      // After the user agent declarations, list the path rules
      userAgentGroup += pathRules.map((pathRule) => {
        if (pathRule.allow) {
          return `Allow: ${pathRule.allow}`
        } else if (pathRule.disallow) {
          return `Disallow: ${pathRule.disallow}`
        } else {
          throw error(`Invalid path rule (${pathRule.toString()}). A path rule must be an object with either an "allow" or "disallow" key.`)
        }
      }).join('\n')
      return userAgentGroup
    })
      // Blank line between groups is not strictly required but makes it easier to read the output file
      .join('\n\n')
  }

  return robotsTxt
}

module.exports = { isAbsoluteUrl, getRobotsTxt, warn }
