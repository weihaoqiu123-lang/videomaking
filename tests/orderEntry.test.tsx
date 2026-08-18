import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as AppModule from '../src/App';
import { INITIAL_VIDEO_PERSONNEL, INITIAL_VIDEO_TYPES } from '../src/data/mockData';
import { OrderCreateView } from '../src/views/OrderCreateView';

test('a service entry opens an empty product-information form', () => {
  const html = renderToStaticMarkup(
    <OrderCreateView
      videoTypes={INITIAL_VIDEO_TYPES}
      videoPersonnel={INITIAL_VIDEO_PERSONNEL}
      preselectedVideoTypeId="ai_showcase"
      onSubmitTask={() => undefined}
      onNavigateToOrders={() => undefined}
    />,
  );

  assert.match(html, /placeholder="输入产品货号" value=""/);
  assert.match(html, /placeholder="输入产品名称" value=""/);
  assert.match(html, /placeholder="输入商品链接" value=""/);
  assert.doesNotMatch(html, /TP10241PI|电子炉灶厨房玩具套装|B08X9ZPXYZ/);
});

test('portfolio order navigation resets the browser viewport to the page top', () => {
  const app = AppModule as typeof AppModule & {
    scrollPageToTop?: (scrollTo: (options: ScrollToOptions) => void) => void;
  };
  let received: ScrollToOptions | undefined;

  assert.equal(typeof app.scrollPageToTop, 'function');
  app.scrollPageToTop?.((options) => { received = options; });
  assert.deepEqual(received, { top: 0, left: 0, behavior: 'auto' });
});
