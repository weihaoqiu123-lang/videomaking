import { MainStatus, NodeStage } from '../types';

export interface StepDefinition {
  key: NodeStage;
  label: string;
  roleHint: string;
}

export const getNodeSteps = (serviceId?: string): StepDefinition[] => {
  if (serviceId === 'editing') {
    return [
      { key: 'editing', label: '剪辑', roleHint: '视频人员' },
      { key: 'manager_review', label: '负责人终审', roleHint: '视频负责人' },
      { key: 'finished', label: '完结', roleHint: '系统完结' }
    ];
  }
  return [
    { key: 'appointment', label: '待处理', roleHint: '视频人员' },
    { key: 'shooting', label: '拍摄', roleHint: '视频人员' },
    { key: 'editing', label: '剪辑', roleHint: '视频人员' },
    { key: 'manager_review', label: '负责人终审', roleHint: '视频负责人' },
    { key: 'finished', label: '完结', roleHint: '系统完结' }
  ];
};

export const getMainStatusBadge = (status: MainStatus) => {
  switch (status) {
    case 'pending':
      return { label: '排队中', bg: 'bg-[#fffae6] text-[#ff8b00] border-[#ffe380] font-semibold' };
    case 'in_progress':
      return { label: '制作中', bg: 'bg-[#deebff] text-[#0052cc] border-[#b3d4ff] font-semibold' };
    case 'reviewing':
      return { label: '审核中', bg: 'bg-[#fff0b3] text-[#172b4d] border-[#ffe380] font-semibold' };
    case 'completed':
      return { label: '已完成', bg: 'bg-[#e3fcef] text-[#006644] border-[#abf5d1] font-semibold' };
  }
};

export const getNodeBadge = (node: NodeStage) => {
  switch (node) {
    case 'pending_urgency':
      return { label: '待加急审核', bg: 'bg-[#ffebe6] text-[#de350b] border-[#ffbdad] font-semibold' };
    case 'appointment':
      return { label: '待处理', bg: 'bg-[#deebff] text-[#0052cc] border-[#b3d4ff] font-medium' };
    case 'shooting':
      return { label: '拍摄中', bg: 'bg-[#deebff] text-[#0052cc] border-[#b3d4ff] font-medium' };
    case 'editing':
      return { label: '剪辑中', bg: 'bg-[#e6fcff] text-[#008da6] border-[#b3f5fc] font-medium' };
    case 'manager_review':
      return { label: '负责人终审中', bg: 'bg-[#fff0b3] text-[#172b4d] border-[#ffe380] font-medium' };
    case 'finished':
      return { label: '流程完结', bg: 'bg-[#e3fcef] text-[#006644] border-[#abf5d1] font-medium' };
    default:
      return { label: '处理中', bg: 'bg-slate-100 text-slate-700 font-medium' };
  }
};

export const getNodeOrder = (node: NodeStage, serviceId?: string): number => {
  if (node === 'pending_urgency') return -1;
  const steps = getNodeSteps(serviceId);
  const idx = steps.findIndex(s => s.key === node);
  return idx !== -1 ? idx : 0;
};

// Returns next node in sequential order
export const getInitialNodeForService = (serviceId: string, isUrgent: boolean): NodeStage => {
  if (isUrgent) return 'pending_urgency';
  return serviceId === 'editing' ? 'editing' : 'appointment';
};

export const getNextNode = (currentNode: NodeStage, serviceId?: string): NodeStage => {
  if (currentNode === 'pending_urgency') return getInitialNodeForService(serviceId || '', false);
  const steps = getNodeSteps(serviceId);
  const idx = steps.findIndex(s => s.key === currentNode);
  if (idx >= 0 && idx < steps.length - 1) {
    return steps[idx + 1].key;
  }
  return 'finished';
};

// Calculates corresponding main status based on node stage
export const getMainStatusFromNode = (node: NodeStage): MainStatus => {
  if (node === 'pending_urgency' || node === 'appointment') return 'pending';
  if (node === 'shooting' || node === 'editing') return 'in_progress';
  if (node === 'manager_review') return 'reviewing';
  return 'completed';
};

interface VideoQueueTask {
  id: string;
  isUrgent: boolean;
  createdAt: string;
}

export const orderVideoTasks = <T extends VideoQueueTask>(
  tasks: T[],
  manualOrder: string[] = [],
): T[] => {
  const manualRank = new Map(manualOrder.map((taskId, index) => [taskId, index]));

  return [...tasks].sort((a, b) => {
    if (a.isUrgent !== b.isUrgent) return a.isUrgent ? -1 : 1;

    const rankA = manualRank.get(a.id);
    const rankB = manualRank.get(b.id);
    if (rankA !== undefined && rankB !== undefined) return rankA - rankB;
    if (rankA !== undefined) return -1;
    if (rankB !== undefined) return 1;

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};

export const reorderVideoTasks = <T extends VideoQueueTask>(
  tasks: T[],
  sourceId: string,
  targetId: string,
): T[] => {
  if (sourceId === targetId) return [...tasks];

  const source = tasks.find((task) => task.id === sourceId);
  const target = tasks.find((task) => task.id === targetId);
  if (!source || !target || source.isUrgent !== target.isUrgent) return [...tasks];

  const reordered = tasks.filter((task) => task.id !== sourceId);
  const targetIndex = reordered.findIndex((task) => task.id === targetId);
  reordered.splice(targetIndex, 0, source);
  return reordered;
};
