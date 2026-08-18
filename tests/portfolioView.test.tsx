import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PortfolioView } from '../src/components/PortfolioView';

test('portfolio renders a clean static hero and approved entry points', () => {
  const html = renderToStaticMarkup(
    <PortfolioView onNavigateToOrderCreate={() => undefined} />,
  );

  assert.doesNotMatch(html, /<video[^>]*class="hero-video"/);
  assert.match(html, /\/portfolio\/hero\/hero-studio-clean.webp/);
  assert.doesNotMatch(html, /打开背景视频声音|SOUND OFF/);
  assert.match(html, /HOOYA 视频制作服务页/);
  assert.match(html, /进入下单系统/);
  assert.doesNotMatch(html, /class="hero-copy"[^>]*translateY/);
});

test('portfolio preview gallery is a bounded static grid', () => {
  const html = renderToStaticMarkup(
    <PortfolioView onNavigateToOrderCreate={() => undefined} />,
  );

  assert.match(html, /class="portfolio-static-grid"/);
  assert.equal((html.match(/class="portfolio-static-card"/g) || []).length, 8);
  assert.doesNotMatch(html, /showreel-track|showreel-row/);
});

test('portfolio renders approved pricing and an illustration-only presentation team', () => {
  const html = renderToStaticMarkup(
    <PortfolioView onNavigateToOrderCreate={() => undefined} />,
  );

  assert.ok(html.indexOf('产品 AI 展示视频') < html.indexOf('产品实拍展示视频'));
  assert.match(html, /标准版/);
  assert.match(html, /创意版/);
  assert.match(html, /定制版/);
  assert.match(html, /制作团队与排队状态/);
  assert.match(html, /api\.dicebear\.com\/10\.x\/notionists\/svg/);
  assert.doesNotMatch(html, /由TA制作|参考此作品下单/);
});
