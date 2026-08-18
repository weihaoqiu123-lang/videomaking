import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getAllowedDurations,
  getOrderFormConfig,
  getTypeSwitchClearLabels,
} from '../src/data/orderFormConfig';

test('sample state only appears for live showcase and installation', () => {
  assert.deepEqual(getOrderFormConfig('live_showcase').sampleStatuses, ['待寄送', '寄送中', '已到样']);
  assert.deepEqual(getOrderFormConfig('installation').sampleStatuses, ['待寄送', '寄送中', '已到样']);
  assert.equal(getOrderFormConfig('ai_showcase').sampleStatuses, undefined);
  assert.equal(getOrderFormConfig('ugc').sampleStatuses, undefined);
});

test('service formats stay within the approved service-specific choices', () => {
  assert.deepEqual(getOrderFormConfig('ai_showcase').formatIds, ['landscape', 'portrait', 'dual']);
  assert.deepEqual(getOrderFormConfig('ugc').formatIds, ['portrait', 'landscape']);
  assert.deepEqual(getOrderFormConfig('installation').formatIds, ['landscape']);
  assert.deepEqual(getOrderFormConfig('editing').formatIds, ['source', 'landscape', 'portrait', 'square']);
});

test('duration choices react to the AI tier and editing mode', () => {
  assert.deepEqual(getAllowedDurations('ai_showcase', { tierId: 'standard' }), ['30 秒以内']);
  assert.deepEqual(getAllowedDurations('ai_showcase', { tierId: 'custom' }), ['45-60 秒']);
  assert.deepEqual(getAllowedDurations('editing', { editingMode: 'basic' }), ['跟随原素材']);
  assert.deepEqual(getAllowedDurations('editing', { editingMode: 'mix' }), ['60 秒以内']);
});

test('UGC config makes portrait primary and explains the triple package', () => {
  const config = getOrderFormConfig('ugc');
  assert.equal(config.defaultFormatId, 'portrait');
  assert.match(config.packageNote ?? '', /三种不同钩子或卖点方向/);
});

test('switch warning names the service-specific information that will be cleared', () => {
  const labels = getTypeSwitchClearLabels('ai_premium', 'editing');
  assert.ok(labels.includes('多 SKU 产品清单'));
  assert.ok(labels.includes('品牌资料与项目目标'));
  assert.ok(labels.includes('规格与价格设置'));
  assert.ok(labels.includes('已选制作人'));
});
