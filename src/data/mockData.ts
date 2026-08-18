import { VideoType, VideoPersonnel, TaskItem } from '../types';
import { SERVICE_CATALOG } from './serviceCatalog';

export const INITIAL_VIDEO_TYPES: VideoType[] = SERVICE_CATALOG.map((service) => ({
  id: service.id,
  num: service.number,
  name: service.name,
  shortDesc: service.summary,
  needsShoot: ['live_showcase', 'installation', 'custom'].includes(service.id),
}));

export const INITIAL_VIDEO_PERSONNEL: VideoPersonnel[] = [
  {
    id: 'vp_zhangchen',
    name: '张晨',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    specialty: '产品实拍 / 安装 / 专项拍摄',
    supportedTypeIds: ['live_showcase', 'installation', 'custom'],
    currentTasks: 3,
    maxTasks: 20,
    status: 'idle', // 正常
    estimatedStartText: '预计约1周后开始'
  },
  {
    id: 'vp_lihao',
    name: '李浩',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    specialty: '实拍 / UGC / 剪辑',
    supportedTypeIds: ['live_showcase', 'ugc', 'editing'],
    currentTasks: 8,
    maxTasks: 20,
    status: 'normal',
    estimatedStartText: '预计约2周后开始'
  },
  {
    id: 'vp_wangmin',
    name: '王敏',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    specialty: 'AI 展示 / UGC / 精品广告',
    supportedTypeIds: ['ai_showcase', 'ugc', 'ai_premium'],
    currentTasks: 14,
    maxTasks: 20,
    status: 'busy', // 较忙
    estimatedStartText: '预计约3周后开始'
  },
  {
    id: 'vp_chenkai',
    name: '陈凯',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    specialty: '产品实拍 / 安装 / 剪辑',
    supportedTypeIds: ['live_showcase', 'installation', 'editing'],
    currentTasks: 18,
    maxTasks: 20,
    status: 'busy', // 较忙
    estimatedStartText: '预计约4周后开始'
  },
  {
    id: 'vp_zhouyu',
    name: '周宇',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    specialty: 'UGC / 视频剪辑',
    supportedTypeIds: ['ugc', 'editing'],
    currentTasks: 20,
    maxTasks: 20,
    status: 'full',
    estimatedStartText: '暂不可接单'
  },
  {
    id: 'vp_zhaoqi',
    name: '赵琪',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    specialty: '数码实拍 / UGC / 精品广告',
    supportedTypeIds: ['live_showcase', 'ugc', 'ai_premium'],
    currentTasks: 3,
    maxTasks: 20,
    status: 'idle', // 正常
    estimatedStartText: '预计约1周后开始'
  },
  {
    id: 'vp_liuwei',
    name: '刘伟',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    specialty: 'AI 展示 / 安装 / 精品广告',
    supportedTypeIds: ['ai_showcase', 'installation', 'ai_premium'],
    currentTasks: 11,
    maxTasks: 20,
    status: 'busy', // 较忙
    estimatedStartText: '预计约3周后开始'
  },
  {
    id: 'vp_sunyue',
    name: '孙悦',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    specialty: 'AI 展示 / UGC / 混剪',
    supportedTypeIds: ['ai_showcase', 'ugc', 'editing'],
    currentTasks: 7,
    maxTasks: 20,
    status: 'normal',
    estimatedStartText: '预计约2周后开始'
  }
];

export const MOCK_PRODUCTS_DATABASE = [
  {
    sku: 'HUAWEI123',
    name: 'Huawei Outdoor Smart Canopy',
    category: '户外家具 / 遮阳篷',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    sku: 'TP10241PI',
    name: '电子炉灶厨房玩具套装',
    category: '儿童玩具 / 模拟厨房',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80'
  },
  {
    sku: 'SP38244US',
    name: '城市折叠越野电动自行车',
    category: '运动户外 / 电动出行',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80'
  },
  {
    sku: 'TA10065BK',
    name: '30L双层可视不锈钢空气炸锅',
    category: '厨房家电 / 智能料理',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
  },
  {
    sku: 'NP13982BE',
    name: '双门小天窗户外速开充气帐篷',
    category: '露营装备 / 帐篷',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'
  },
  {
    sku: 'HD99011SL',
    name: '人体工学网眼可调电竞椅',
    category: '办公家具 / 电脑椅',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_MOCK_TASKS: TaskItem[] = [
  {
    id: 'task_101',
    taskNo: 'VTD-20260811-001',
    sku: 'HUAWEI123',
    productName: 'Huawei Outdoor Smart Canopy',
    productCategory: '户外家具 / 遮阳篷',
    productImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    videoTypeId: 'vt_01',
    videoTypeName: '实拍展示',
    videoPersonId: 'vp_zhangchen',
    videoPersonName: '张晨',
    isUrgent: false,
    style: 'refined',
    styleName: '精细化设计',
    videoRatio: '16:9',
    videoDuration: '<60s',
    needsPerson: true,
    sampleStatus: 'arrived',
    remarks: '重点拍摄电动伸缩与防水布料特写，需要清晨阳光自然质感。',
    mainStatus: 'in_progress',
    currentNode: 'shooting',
    currentNodeName: '拍摄阶段',
    createdAt: '2026-08-11 09:30',
    updatedAt: '2026-08-11 11:20',
    creatorName: '运营-刘敏',
    nodeData: {
      appointmentDate: '2026-08-12',
      shootingScene: '户外草坪阳光场景',
      mainCameraman: '张晨',
      assistCameraman: '李浩',
      shootDate: '2026-08-11',
      shootLocation: '1号大棚影棚',
      shootAssetUrl: 'https://pan.example.com/raw_footage_001.zip'
    },
    logs: [
      {
        id: 'log_01',
        timestamp: '2026-08-11 09:30',
        actor: '运营-刘敏',
        roleName: '运营人员',
        action: '创建视频需求',
        detail: '提交实拍展示需求，指派张晨'
      },
      {
        id: 'log_02',
        timestamp: '2026-08-11 10:15',
        actor: '张晨',
        roleName: '视频人员',
        action: '完成预约排期',
        detail: '确定拍摄日期为 2026-08-12'
      },
      {
        id: 'log_03',
        timestamp: '2026-08-11 11:20',
        actor: '张晨',
        roleName: '视频人员',
        action: '上传素材并推进到剪辑',
        detail: '原始素材已归档至盘'
      }
    ]
  },
  {
    id: 'task_102',
    taskNo: 'VTD-20260811-002',
    sku: 'TP10241PI',
    productName: '电子炉灶厨房玩具套装',
    productCategory: '儿童玩具 / 模拟厨房',
    productImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    videoTypeId: 'vt_02',
    videoTypeName: '安装视频',
    videoPersonId: 'vp_zhangchen',
    videoPersonName: '张晨',
    isUrgent: true,
    urgencyStatus: 'approved',
    style: 'refined',
    styleName: '精细化设计',
    videoRatio: '16:9',
    videoDuration: '<60s',
    needsPerson: true,
    sampleStatus: 'arrived',
    remarks: '加急任务：客户反馈说明书不清，急需清晰拼接步骤短视频。',
    mainStatus: 'pending',
    currentNode: 'appointment',
    currentNodeName: '待处理',
    createdAt: '2026-08-11 10:00',
    updatedAt: '2026-08-11 10:30',
    creatorName: '运营-张强',
    nodeData: {},
    logs: [
      {
        id: 'log_10',
        timestamp: '2026-08-11 10:00',
        actor: '运营-张强',
        roleName: '运营人员',
        action: '创建加急需求',
        detail: '提交加急安装视频需求'
      },
      {
        id: 'log_11',
        timestamp: '2026-08-11 10:30',
        actor: '负责人-王总',
        roleName: '视频负责人',
        action: '审核通过加急',
        detail: '同意加急排期，调整优先处理'
      }
    ]
  },
  {
    id: 'task_103',
    taskNo: 'VTD-20260811-003',
    sku: 'SP38244US',
    productName: '城市折叠越野电动自行车',
    productCategory: '运动户外 / 电动出行',
    productImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    videoTypeId: 'vt_04',
    videoTypeName: '精品广告',
    videoPersonId: 'vp_wangmin',
    videoPersonName: '王敏',
    isUrgent: false,
    style: 'ai',
    styleName: 'AI设计',
    videoRatio: '9:16',
    videoDuration: '<30s',
    needsPerson: false,
    sampleStatus: 'on_way',
    remarks: 'S级新车上市广告，AI合成极光与赛道背景。',
    mainStatus: 'pending',
    currentNode: 'appointment',
    currentNodeName: '待处理',
    createdAt: '2026-08-11 11:00',
    updatedAt: '2026-08-11 11:00',
    creatorName: '运营-赵雪',
    nodeData: {},
    logs: [
      {
        id: 'log_20',
        timestamp: '2026-08-11 11:00',
        actor: '运营-赵雪',
        roleName: '运营人员',
        action: '创建视频需求',
        detail: '提交AI精品广告需求，指派王敏'
      }
    ]
  }
];

export const INITIAL_TASKS = INITIAL_MOCK_TASKS;
