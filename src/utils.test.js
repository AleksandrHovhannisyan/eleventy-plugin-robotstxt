const { it, describe } = require('node:test')
const assert = require('node:assert/strict')
const { getRobotsTxt } = require('./utils')

describe('getRobotsTxt', () => {
  it('outputs an empty file if no params', () => {
    assert.strictEqual(getRobotsTxt({}), '')
  })
  it('throws if siteMapURL is not an absolute URL', () => {
    assert.throws(() => getRobotsTxt({ sitemapURL: 'invalid' }))
    assert.throws(() => getRobotsTxt({ sitemapURL: 'example.com/sitemap.xml' }))
  })
  it('allows valid sitemapURL', () => {
    assert.doesNotThrow(() => getRobotsTxt({ sitemapURL: 'http://example.com/sitemap.xml' }))
    assert.strictEqual(getRobotsTxt({ sitemapURL: 'http://example.com/sitemap.xml' }), 'Sitemap: http://example.com/sitemap.xml')
    assert.doesNotThrow(() => getRobotsTxt({ sitemapURL: 'https://example.com/sitemap.xml' }))
    assert.strictEqual(getRobotsTxt({ sitemapURL: 'https://example.com/sitemap.xml' }), 'Sitemap: https://example.com/sitemap.xml')
  })
  it('throws if a path rule has no paths', () => {
    assert.throws(() => getRobotsTxt({ rules: new Map([['*', []]]) }))
  })
  it('writes path rules', () => {
    let result = getRobotsTxt({
      rules: new Map([
        ['*', [{ disallow: '/404.html' }]]
      ])
    })
    assert.strictEqual(result, 'User-agent: *\nDisallow: /404.html')
    result = getRobotsTxt({
      sitemapURL: 'http://example.com/sitemap.xml',
      rules: new Map([
        ['*', [{ disallow: '/404.html' }]],
        [['agent1', 'agent2', 'agent3'], [{ disallow: '/1' }, { disallow: '/2' }, { allow: '/3' }]]
      ])
    })
    assert.strictEqual(result, 'Sitemap: http://example.com/sitemap.xml\n\nUser-agent: *\nDisallow: /404.html\n\nUser-agent: agent1\nUser-agent: agent2\nUser-agent: agent3\nDisallow: /1\nDisallow: /2\nAllow: /3')
  })
})
