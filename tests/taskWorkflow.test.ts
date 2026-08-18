import assert from 'node:assert/strict';
import test from 'node:test';
import { INITIAL_TASKS } from '../src/data/mockData';
import { SERVICE_CATALOG } from '../src/data/serviceCatalog';
import * as taskUtils from '../src/utils/taskUtils';

test('historical demo orders use the approved service names and no legacy style field', () => {
  const approvedNames = new Set(SERVICE_CATALOG.map((service) => service.name));

  for (const task of INITIAL_TASKS) {
    assert.equal(approvedNames.has(task.videoTypeName), true, task.taskNo);
    assert.equal('styleName' in task, false, task.taskNo);
    assert.equal('style' in task, false, task.taskNo);
  }
});

test('pure editing orders enter editing directly unless urgency review is required', () => {
  const utils = taskUtils as typeof taskUtils & {
    getInitialNodeForService?: (serviceId: string, isUrgent: boolean) => string;
  };

  assert.equal(typeof utils.getInitialNodeForService, 'function');
  assert.equal(utils.getInitialNodeForService?.('editing', false), 'editing');
  assert.equal(utils.getInitialNodeForService?.('editing', true), 'pending_urgency');
  assert.equal(utils.getInitialNodeForService?.('live_showcase', false), 'appointment');
});

test('approved urgent editing orders and their timeline skip appointment and shooting', () => {
  const getNextNode = taskUtils.getNextNode as unknown as (
    currentNode: string,
    serviceId?: string,
  ) => string;
  const getNodeSteps = taskUtils.getNodeSteps as unknown as (serviceId?: string) => Array<{ key: string }>;

  assert.equal(getNextNode('pending_urgency', 'editing'), 'editing');
  assert.deepEqual(
    getNodeSteps('editing').map((step) => step.key),
    ['editing', 'manager_review', 'finished'],
  );
});
