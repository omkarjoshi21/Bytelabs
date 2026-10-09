import { readFileSync, existsSync } from 'node:fs';
import { expect, it } from 'vitest';

it('publishes consistent ByteLabs and founder identity with accessible crawl assets', () => {
  const html = readFileSync('index.html', 'utf8');
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const site = graph.find(node => node['@type'] === 'WebSite');
  const founder = graph.find(node => node['@type'] === 'Person');
  const studio = graph.find(node => node['@type'] === 'Organization');
  expect(site.name).toBe('ByteLabs');
  expect(site.url).toBe('https://bytelabs-1.onrender.com/');
  expect(founder.name).toBe('Omkar Joshi');
  expect(studio.founder['@id']).toBe(founder['@id']);
  expect(html).toContain(`rel="canonical" href="${site.url}"`);
  expect(html).toContain('<title>ByteLabs | Websites & Software</title>');
  expect(readFileSync('public/sitemap.xml', 'utf8')).toContain(`<loc>${site.url}</loc>`);
  expect(readFileSync('public/robots.txt', 'utf8')).toContain(`Sitemap: ${site.url}sitemap.xml`);
  expect(readFileSync('public/googlef77ffa24419a8dda.html', 'utf8').trim()).toBe('google-site-verification: googlef77ffa24419a8dda.html');
  for (const asset of ['favicon-96.png', 'apple-touch-icon.png', 'brand/bytelabs-icon-512.png', 'brand/bytelabs-social.png']) {
    expect(existsSync(`public/${asset}`)).toBe(true);
  }
  for (const path of ['public/brand-kit.html', 'public/vedcare-mark.html']) {
    expect(readFileSync(path, 'utf8')).toContain('content="noindex, follow"');
  }
});
