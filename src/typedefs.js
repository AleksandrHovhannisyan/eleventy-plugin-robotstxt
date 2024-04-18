/**
 * @typedef AllowedPathRule
 * @type {object}
 * @property {string} allow A directory or page, relative to the root domain, that may be crawled by the user agent just mentioned. This is used to override a disallow rule to allow crawling of a subdirectory or page in a disallowed directory. For a single page, specify the full page name as shown in the browser. It must start with a / character and if it refers to a directory, it must end with the / mark. See also: {@link https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt#create_rules Google Search Central - How to write robots.txt rules}
 */

/**
 * @typedef DisallowedPathRule
 * @type {object}
 * @property {string} disallow A directory or page, relative to the root domain, that you don't want the user agent to crawl. If the rule refers to a page, it must be the full page name as shown in the browser. It must start with a / character and if it refers to a directory, it must end with the / mark. See also: {@link https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt#create_rules Google Search Central - How to write robots.txt rules}
 */

/**
 * @typedef RobotsRules
 * @type {Map<string[] | string, (AllowedPathRule | DisallowedPathRule)[]>}
 */

/**
 * @typedef EleventyPluginRobotsTxtOptions
 * @type {object}
 * @property {string} [sitemapURL] (Optional) The absolute location of a sitemap for this site. The sitemap URL must be a fully-qualified URL; Google doesn't assume or check http/https/www.non-www alternates. Sitemaps are a good way to indicate which content Google should crawl, as opposed to which content it can or cannot crawl. See also: {@link https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt#create_rules Google Search Central - How to write robots.txt rules}.
 * @property {RobotsRules} [rules] (Optional) A map of robots.txt rules, grouped by user agent. Each key is an array of user agents in the group; the value is an array of allowed or disallowed paths.
 * @property {boolean} [shouldBlockAIRobots] (Optional) Whether to soft-block a list of known AI robots (see {@link https://github.com/ai-robots-txt/ai.robots.txt the ai-robots GitHub repository} for context).
 * @property {Record<string, unknown>} [frontMatterOverrides] Front matter overrides to apply to the robots.txt template. By default, the plugin automatically applies {@link https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections `eleventyExcludeFromCollections: true`} and `permalink: /robots.txt`, so you do not need to set these yourself.
 */

module.exports = {}
