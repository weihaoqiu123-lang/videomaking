/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RoleType, NavPage, TaskItem, NodeStage, VideoPersonnel } from './types';
import { INITIAL_TASKS, INITIAL_VIDEO_PERSONNEL, INITIAL_VIDEO_TYPES } from './data/mockData';
import { PortfolioItem } from './data/portfolioData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OrderCreateView } from './views/OrderCreateView';
import { OperatorOrdersView } from './views/OperatorOrdersView';
import { VideoTasksView } from './views/VideoTasksView';
import { ManagerApprovalView } from './views/ManagerApprovalView';
import { ManagerOverviewView } from './views/ManagerOverviewView';
import { PortfolioView } from './components/PortfolioView';
import { getMainStatusFromNode } from './utils/taskUtils';

export default function App() {
  const [currentRole, setCurrentRole] = useState<RoleType>('operator');
  const [currentPage, setCurrentPage] = useState<NavPage>('portfolio');
  const [referenceWork, setReferenceWork] = useState<PortfolioItem | null>(null);
  const [preselectedVideoTypeId, setPreselectedVideoTypeId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [videoPersonnel, setVideoPersonnel] = useState<VideoPersonnel[]>(INITIAL_VIDEO_PERSONNEL);
  const [videoTypes] = useState(INITIAL_VIDEO_TYPES);

  const pendingUrgentCount = tasks.filter(t => t.currentNode === 'pending_urgency').length;
  const pendingManagerReviewCount = tasks.filter(t => t.currentNode === 'manager_review').length;
  const pendingVideoCount = tasks.filter(t => t.currentNode === 'appointment' || t.currentNode === 'shooting' || t.currentNode === 'editing').length;

  const handleRoleChange = (role: RoleType) => {
    setCurrentRole(role);
    if (role === 'operator') setCurrentPage('portfolio');
    else if (role === 'video_creator') setCurrentPage('video_tasks');
    else if (role === 'manager') setCurrentPage('manager_approval');
  };

  const handleCreateTask = (newTaskData: Omit<TaskItem, 'id' | 'taskNo' | 'createdAt' | 'updatedAt' | 'logs' | 'nodeData'>) => {
    const taskCount = tasks.length + 1;
    const taskNo = `VT20260810${taskCount.toString().padStart(3, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const newTask: TaskItem = {
      ...newTaskData,
      id: `task_${Date.now()}`,
      taskNo,
      createdAt: nowStr,
      updatedAt: nowStr,
      nodeData: {},
      logs: [{ id: `log_${Date.now()}`, timestamp: nowStr, actor: newTaskData.creatorName, roleName: '运营人员', action: newTaskData.isUrgent ? '创建加急视频需求' : '创建标准视频需求', detail: newTaskData.isUrgent ? '申请加急，进入【待加急审核】队列' : `派发至视频制作人员 ${newTaskData.videoPersonName}` }]
    };
    setTasks(prev => [newTask, ...prev]);
    setVideoPersonnel(prev => prev.map(p => {
      if (p.id !== newTaskData.videoPersonId) return p;
      const newCurrent = p.currentTasks + 1;
      return { ...p, currentTasks: newCurrent, status: newCurrent >= p.maxTasks ? 'full' : newCurrent >= 11 ? 'busy' : 'idle' };
    }));
  };

  const handleUpdateTaskNode = (taskId: string, nextNode: NodeStage, updatedNodeData: any, logAction: string) => {
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const newMainStatus = getMainStatusFromNode(nextNode);
      const newNodeName = nextNode === 'shooting' ? '拍摄中' : nextNode === 'editing' ? '剪辑中' : nextNode === 'manager_review' ? '负责人终审中' : '流程完结';
      return { ...t, currentNode: nextNode, currentNodeName: newNodeName, mainStatus: newMainStatus, updatedAt: nowStr, nodeData: { ...t.nodeData, ...updatedNodeData }, logs: [...t.logs, { id: `log_${Date.now()}`, timestamp: nowStr, actor: t.videoPersonName, roleName: '视频人员', action: logAction, detail: `节点推至【${newNodeName}】` }] };
    }));
  };

  const handleApproveUrgency = (taskId: string, approved: boolean) => {
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setTasks(prev => prev.map(t => t.id !== taskId ? t : { ...t, isUrgent: approved, urgencyStatus: approved ? 'approved' : 'rejected', currentNode: 'appointment', currentNodeName: '待处理', mainStatus: 'pending', updatedAt: nowStr, logs: [...t.logs, { id: `log_${Date.now()}`, timestamp: nowStr, actor: '视频负责人', roleName: '视频负责人', action: approved ? '通过加急申请' : '未通过加急申请', detail: approved ? '同意加急，标记置顶优先级' : '不通过加急，转为普通单排队' }] }));
  };

  const handleFinalReview = (taskId: string, approved: boolean, notes: string) => {
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const nextNode = approved ? 'finished' : 'editing';
      const nextNodeName = approved ? '完结' : '退回剪辑修改';
      if (approved) setVideoPersonnel(list => list.map(p => {
        if (p.id !== t.videoPersonId) return p;
        const newCount = Math.max(0, p.currentTasks - 1);
        return { ...p, currentTasks: newCount, status: newCount >= p.maxTasks ? 'full' : newCount >= 11 ? 'busy' : 'idle' };
      }));
      return { ...t, currentNode: nextNode, currentNodeName: nextNodeName, mainStatus: approved ? 'completed' : 'in_progress', updatedAt: nowStr, nodeData: { ...t.nodeData, managerReviewNotes: notes }, logs: [...t.logs, { id: `log_${Date.now()}`, timestamp: nowStr, actor: '视频负责人', roleName: '视频负责人', action: approved ? '终审通过 (完结)' : '终审退回修改', detail: notes }] };
    }));
  };

  const handleSelectWorkToOrder = (work?: PortfolioItem, videoTypeId?: string) => {
    if (work) { setReferenceWork(work); setPreselectedVideoTypeId(work.videoTypeId); }
    else if (videoTypeId) setPreselectedVideoTypeId(videoTypeId);
    setCurrentRole('operator');
    setCurrentPage('order_create');
  };

  const handleResetData = () => { setTasks(INITIAL_TASKS); setVideoPersonnel(INITIAL_VIDEO_PERSONNEL); };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header currentRole={currentRole} onRoleChange={handleRoleChange} currentPage={currentPage} onNavigate={setCurrentPage} pendingUrgentCount={pendingUrgentCount} pendingManagerReviewCount={pendingManagerReviewCount} pendingVideoCount={pendingVideoCount} onResetData={handleResetData} />
      <Navigation currentRole={currentRole} currentPage={currentPage} onNavigate={setCurrentPage} pendingUrgentCount={pendingUrgentCount} pendingManagerReviewCount={pendingManagerReviewCount} pendingVideoCount={pendingVideoCount} />
      <main className="flex-1">
        {currentRole === 'operator' && currentPage === 'portfolio' && <PortfolioView onNavigateToOrderCreate={(videoTypeId?: string) => handleSelectWorkToOrder(undefined, videoTypeId)} onSelectWorkToOrder={handleSelectWorkToOrder} />}
        {currentRole === 'operator' && currentPage === 'order_create' && <OrderCreateView videoTypes={videoTypes} videoPersonnel={videoPersonnel} onSubmitTask={handleCreateTask} onNavigateToOrders={() => setCurrentPage('operator_orders')} onOpenPortfolio={() => setCurrentPage('portfolio')} referenceWork={referenceWork} preselectedVideoTypeId={preselectedVideoTypeId} onClearReferenceWork={() => { setReferenceWork(null); setPreselectedVideoTypeId(null); }} />}
        {currentRole === 'operator' && currentPage === 'operator_orders' && <OperatorOrdersView tasks={tasks} />}
        {currentRole === 'video_creator' && <VideoTasksView tasks={tasks} currentStaffName="张晨" onUpdateTaskNode={handleUpdateTaskNode} />}
        {currentRole === 'manager' && currentPage === 'manager_approval' && <ManagerApprovalView tasks={tasks} onApproveUrgency={handleApproveUrgency} onFinalReview={handleFinalReview} />}
        {currentRole === 'manager' && currentPage === 'manager_overview' && <ManagerOverviewView tasks={tasks} videoPersonnel={videoPersonnel} videoTypes={videoTypes} />}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-4 border-t border-slate-800 text-center text-xs"><div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2"><span>视频任务管理 V1.0 - 企业内部高保真原型</span><span className="text-slate-500">支持运营、视频与负责人多角色全流程交互演示</span></div></footer>
    </div>
  );
}
