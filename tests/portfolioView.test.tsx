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
});
