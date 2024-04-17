# eleventy-plugin-robotstxt

> [!NOTE]
> This plugin is experimental and is only compatible with Eleventy versions `>= 3.0.0-alpha.6`.

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
    eleventyConfig.addPlugin(EleventyPluginRobotsTxt, eleventyPluginRobotsTxtOptions);
}
```

See the examples below for how you might configure the plugin for different use cases.

## Examples

TODO:

## API

The following plugin options are available for use in your `.eleventy.js` configuration:

Option            |Type                       |Description|Example|
------------------|---------------------------|-----------|-------|

TODO:

## Notes

- This plugin registers Liquid as a recognized template language, as suggested by Zach Leatherman here: https://github.com/11ty/eleventy/issues/1612#issuecomment-2027476340
