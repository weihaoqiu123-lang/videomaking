import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PortfolioView } from '../src/components/PortfolioView';

test('portfolio renders the IT media hero and approved entry points', () => {
  const html = renderToStaticMarkup(
    <PortfolioView onNavigateToOrderCreate={() => undefined} />,
  );

  assert.match(html, /<video/);
  assert.match(html, /\/portfolio\/showreel\/still-01.webp/);
  assert.match(html, /HOOYA 视频制作服务页/);
  assert.match(html, /进入下单系统/);
  assert.doesNotMatch(html, /class="hero-copy"[^>]*translateY/);
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
