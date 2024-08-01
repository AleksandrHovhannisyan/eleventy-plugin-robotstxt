# eleventy-plugin-robotstxt

> [!NOTE]
> This plugin is only compatible with Eleventy versions `>= 3.0.0-alpha.6`.

Automatically generate a [robots.txt file](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt) for your Eleventy site using front matter.

## Getting Started

Install the plugin in your project using your preferred package manager:

```
npm install --save-dev eleventy-plugin-robotstxt
```

And update your Eleventy config to import and use the plugin:

```js
const EleventyPluginRobotsTxt = require("eleventy-plugin-robotstxt");

module.exports = (eleventyConfig) => {
  /** @type {import("eleventy-plugin-robotstxt/typedefs.js").EleventyPluginRobotsTxtOptions} */
  const eleventyPluginRobotsTxtOptions = {};
  eleventyConfig.addPlugin(
    EleventyPluginRobotsTxt,
    eleventyPluginRobotsTxtOptions,
  );
};
```

See [the examples](#examples) for how you might configure the plugin for different use cases.

## API

The following plugin options are available for use in your `.eleventy.js` configuration:

| Option                 | Type                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Example                               |
| ---------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `sitemapURL`           | `string \| undefined`                                                             | (Optional) The absolute location of a sitemap for this site. The sitemap URL must be a fully-qualified URL; Google doesn't assume or check http/https/www.non-www alternates. Sitemaps are a good way to indicate which content Google should crawl, as opposed to which content it can or cannot crawl. See also: [Google Search Central - How to write robots.txt rules](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt#create_rules). | `https://www.example.com/sitemap.xml` |
| `rules`                | `Map<string \| string[], ({ allow: string } \| { disallow: string })[]> \| undefined` | (Optional) A map of robots.txt rules, grouped by user agent. Each key is an array of user agents in the group; the value is an array of allowed or disallowed paths.| See [examples](#examples).            |
| `shouldBlockAIRobots`  | `string \| undefined`                                                             | (Optional) Whether to soft-block a list of known AI robots (see [the ai-robots GitHub repository](https://github.com/ai-robots-txt/ai.robots.txt) for context).                                                                                                                                                                                                                                                                                                                | `true`                                |
| `frontMatterOverrides` | `Record<string, unknown> \| undefined`                                            | Front matter overrides to apply to the robots.txt template. By default, the plugin automatically applies [`eleventyExcludeFromCollections: true`](https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections) and `permalink: /robots.txt`, so you do not need to set these yourself.                                                                                                                                                                      | `{ "frontMatterKey": "value" }`       |

## Examples

The following examples are direct translations of Google's guide on [how to write and submit a robots.txt file](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt).

### Disallow crawling of the entire site

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([["*", [{ disallow: "/" }]]]),
};
```

Output:

```txt
User-agent: *
Disallow: /
```

### Disallow crawling of a directory and its contents

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([
    [
      "*",
      [
        { disallow: "/calendar/" },
        { disallow: "/junk/" },
        { disallow: "/books/fiction/contemporary/" },
      ],
    ],
  ]),
};
```

Output:

```txt
User-agent: *
Disallow: /calendar/
Disallow: /junk/
Disallow: /books/fiction/contemporary/
```

### Allow access to a single crawler

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([
    ["Googlebot-news", [{ allow: "/" }]],
    ["*", [{ disallow: "/" }]],
  ]),
};
```

Output:

```txt
User-agent: Googlebot-news
Allow: /

User-agent: *
Disallow: /
```

### Allow access to all but a single crawler

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([
    ["Unnecessarybot", [{ disallow: "/" }]],
    ["*", [{ allow: "/" }]],
  ]),
};
```

Output:

```txt
User-agent: Unnecessarybot
Disallow: /

User-agent: *
Allow: /
```

### Disallow crawling of a single web page

For example, disallow the useless_file.html page located at https://example.com/useless_file.html, and other_useless_file.html in the junk directory.

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([
    [
      "*",
      [
        { disallow: "/useless_file.html" },
        { disallow: "/junk/other_useless_file.html" },
      ],
    ],
  ]),
};
```

Output:

```txt
User-agent: *
Disallow: /useless_file.html
Disallow: /junk/other_useless_file.html
```

### Disallow crawling of the whole site except a subdirectory

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([["*", [{ disallow: "/" }, { allow: "/public/" }]]]),
};
```

Output:

```txt
User-agent: *
Disallow: /
Allow: /public/
```

### Block a specific image from Google Images

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([["Googlebot-Image", [{ disallow: "/images/dogs.jpg" }]]]),
};
```

Output:

```txt
User-agent: Googlebot-Image
Disallow: /images/dogs.jpg
```

### Block all images on your site from Google Images

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([["Googlebot-Image", [{ disallow: "/" }]]]),
};
```

Output:

```txt
User-agent: Googlebot-Image
Disallow: /
```

### Disallow crawling of files of a specific file type

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([["Googlebot", [{ disallow: "/*.gif$" }]]]),
};
```

Output:

```txt
User-agent: Googlebot
Disallow: /*.gif$
```

### Disallow crawling of an entire site, but allow Mediapartners-Google

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([
    ["*", [{ disallow: "*" }]],
    ["Mediapartners-Google", [{ allow: "/" }]],
  ]),
};
```

Output:

```txt
User-agent: *
Disallow: /

User-agent: Mediapartners-Google
Allow: /
```

### Disallow crawling for multiple user agents in one go

Input:

```js
const eleventyPluginRobotsTxtOptions = {
  rules: new Map([[["agent1", "agent2", "agent3"], [{ disallow: "/" }]]]),
};
```

Output:

```txt
User-agent: agent1
User-agent: agent2
User-agent: agent3
Disallow: /
```

## Notes

- This plugin registers Liquid as a recognized template language, as suggested by Zach Leatherman here: https://github.com/11ty/eleventy/issues/1612#issuecomment-2027476340

