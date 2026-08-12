export interface PortfolioItem {
  id: string;
  title: string;
  englishTitle: string;
  productName: string;
  sku: string;
  videoTypeId: string;
  videoTypeName: string;
  creatorId: string;
  creatorName: string;
  creatorTitle: string;
  creatorAvatar: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  tags: string[];
  category: 'ALL' | '产品AI展示视频' | '产品AI精品广告' | '产品实拍展示视频' | '产品安装视频' | '纯剪辑任务';
  aspectRatio?: '16:9' | '9:16' | '4:3' | '1:1';
  isFeatured?: boolean;
}

export interface CreatorProfile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  status: '正常' | '较忙' | '满载';
  queue: string;
  tone: 'normal' | 'busy' | 'full';
  avatar: string;
  workImage: string;
}

export const ORDER_URL = "#create-order";

const media = {
  voyage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=82",
  codenest: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=82",
  vex: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1200&q=82",
  stellar: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=82",
  asme: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=82",
  transform: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=82",
  vitara: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=82",
  terra: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=82",
  skyelite: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=82",
  aethera: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=82",
  designpro: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1200&q=82",
  stellarClassic: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=82",
  xportfolio: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=82",
  orbit: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=82",
  nexora: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=82",
  evr: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=82",
  planet: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=82",
  newEra: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=82",
  wealth: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1200&q=82",
  luminex: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=82",
  celestia: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=82",
};

export const marqueeMedia = Object.values(media);

export const portfolioCategories = [
  {
    id: "ai-display",
    videoTypeId: "vt_03",
    index: "01",
    title: "产品 AI 展示视频",
    english: "AI PRODUCT FILM",
    intro: "无需寄送样品，利用产品图片和资料制作动态展示，突出产品外观、使用场景和核心卖点。",
    spec: "≤ 30S · 720P",
    price: "80 USD 起",
    timeline: "查看当前排队情况",
    includes: "标准 / 复杂创意 / 定制三档",
    works: [
      { id: "pw_aid_01", title: "FORM / NEW ERA", creator: "LEO", creatorId: "vp_zhangchen", role: "AI VIDEO · EDIT", meta: "智能家居 · 30S", image: media.stellar, videoTypeId: "vt_03", videoTypeName: "产品AI展示视频", productName: "智能空气净化器", sku: "SKU-AIR-90", description: "无需寄送样品，利用生成式AI重构科技氛围家装，多维展示智能风道与静音结构。" },
      { id: "pw_aid_02", title: "FLOW CONTROL", creator: "MAX", creatorId: "vp_wangmin", role: "MOTION DESIGN", meta: "工具产品 · 24S", image: media.transform, videoTypeId: "vt_03", videoTypeName: "产品AI展示视频", productName: "高压数显喷枪", sku: "SKU-GUN-11", description: "利用三维几何流体粒子模拟流体力学与精准控压，打造强烈未来科技感。" },
      { id: "pw_aid_03", title: "NATURAL SYSTEM", creator: "YU", creatorId: "vp_zhouyu", role: "3D ART · LIGHTING", meta: "户外用品 · 28S", image: media.terra, videoTypeId: "vt_03", videoTypeName: "产品AI展示视频", productName: "户外便携电源", sku: "SKU-PWR-88", description: "模拟山林落日与极端露营气象，展现电池防护等级与强续航核心痛点。" },
    ],
  },
  {
    id: "ai-campaign",
    videoTypeId: "vt_04",
    index: "02",
    title: "产品 AI 精品广告",
    english: "AI CAMPAIGN FILM",
    intro: "面向重点产品或品牌项目，以更完整的创意概念、分镜和精细制作建立视觉记忆点。",
    spec: "30–60S · 1080P",
    price: "350 USD",
    timeline: "查看当前排队情况",
    includes: "创意方向 / 分镜 / 精细制作",
    works: [
      { id: "pw_aic_01", title: "AURORA / 智能生活", creator: "KAI", creatorId: "vp_wangmin", role: "AI VIDEO DIRECTOR", meta: "科技品牌 · 45S", image: media.voyage, videoTypeId: "vt_04", videoTypeName: "产品AI精品广告", productName: "旗舰头戴降噪耳机", sku: "SKU-HP-9000", description: "针对S级爆品打造的电影级视觉大片，抽象粒子声波与微距金属质感完美交融。" },
      { id: "pw_aic_02", title: "AETHER / ABOVE", creator: "EVE", creatorId: "vp_zhouyu", role: "ART DIRECTION", meta: "高端出行 · 60S", image: media.aethera, videoTypeId: "vt_04", videoTypeName: "产品AI精品广告", productName: "碳纤维折叠滑板车", sku: "SKU-SCOOT-01", description: "打破传统出行广告视效，以云端穿梭意象赋予产品高端品牌溢价。" },
      { id: "pw_aic_03", title: "SKYLINE 2030", creator: "RAY", creatorId: "vp_lihao", role: "COMMERCIAL EDIT", meta: "城市科技 · 40S", image: media.skyelite, videoTypeId: "vt_04", videoTypeName: "产品AI精品广告", productName: "4K智能投影仪", sku: "SKU-PRJ-2026", description: "极致光影对比度与未来客厅投影演练，强化高清晰度与沉浸式声场。" },
    ],
  },
  {
    id: "live-action",
    videoTypeId: "vt_01",
    index: "03",
    title: "产品实拍展示视频",
    english: "LIVE ACTION PRODUCT",
    intro: "通过真实样品拍摄产品外观、材质、细节和使用过程，让消费者更直观地理解产品。",
    spec: "1 条 · 1080P",
    price: "200 USD",
    timeline: "查看当前排队情况",
    includes: "基础拍摄 / 剪辑 / 调色 / 字幕",
    works: [
      { id: "pw_la_01", title: "SUMMER HOME", creator: "MIA", creatorId: "vp_lihao", role: "CINEMATOGRAPHY", meta: "家居软装 · 35S", image: media.vex, videoTypeId: "vt_01", videoTypeName: "产品实拍展示视频", productName: "真皮软包双人床", sku: "SKU-BED-303", description: "自然光影棚拍，近距离捕捉皮革细腻纹理与框架回弹感，提升实物可信度。" },
      { id: "pw_la_02", title: "GREEN ROUTINE", creator: "LIN", creatorId: "vp_zhaoqi", role: "FOOD STYLING", meta: "生活方式 · 30S", image: media.codenest, videoTypeId: "vt_01", videoTypeName: "产品实拍展示视频", productName: "30L智能空气炸锅", sku: "SKU-AF-3001", description: "真实厨房搭建，烘焙过程油脂流速与一键触控交互实测，垂涎欲滴的美食视觉。" },
      { id: "pw_la_03", title: "TOUCH THE SURFACE", creator: "NINA", creatorId: "vp_lihao", role: "PRODUCT DIRECTOR", meta: "材料工艺 · 42S", image: media.terra, videoTypeId: "vt_01", videoTypeName: "产品实拍展示视频", productName: "工业级重型工具柜", sku: "SKU-TOL-990", description: "实景滑轨承重测试与冷轧钢喷涂抗刮实测，展现工业扎实用料。" },
    ],
  },
  {
    id: "installation",
    videoTypeId: "vt_02",
    index: "04",
    title: "产品安装视频",
    english: "INSTALLATION GUIDE",
    intro: "用真实拍摄清楚呈现产品组装和安装步骤，帮助消费者快速完成操作并减少售后沟通。",
    spec: "步骤型 · 1080P",
    price: "30 USD",
    timeline: "查看当前排队情况",
    includes: "安装拍摄 / 基础剪辑 / 步骤标注",
    works: [
      { id: "pw_ins_01", title: "EASY ASSEMBLY", creator: "NINA", creatorId: "vp_zhangchen", role: "SCRIPT · DIRECTION", meta: "模块家具 · 55S", image: media.transform, videoTypeId: "vt_02", videoTypeName: "产品安装视频", productName: "户外防腐木凉亭", sku: "SKU-GZ-8820", description: "分步展示卡扣衔接与气压杆螺丝紧固细节，搭配防呆高亮标注，大幅降低售后退货率。" },
      { id: "pw_ins_02", title: "ONE CLICK SETUP", creator: "MAX", creatorId: "vp_zhangchen", role: "MOTION DESIGN", meta: "智能设备 · 48S", image: media.stellar, videoTypeId: "vt_02", videoTypeName: "产品安装视频", productName: "人体工学办公网椅 Pro", sku: "SKU-CHR-202", description: "三级气压棒放入底座与托盘螺丝孔对齐细节，5分钟轻松组装。" },
      { id: "pw_ins_03", title: "READY IN 3 STEPS", creator: "JO", creatorId: "vp_zhangchen", role: "POST PRODUCER", meta: "家用工具 · 60S", image: media.codenest, videoTypeId: "vt_02", videoTypeName: "产品安装视频", productName: "儿童模拟木质小厨房", sku: "SKU-KIT-404", description: "针对宝妈宝爸用户群，拆解分类螺丝与主要主板搭配顺序，消除复杂安装顾虑。" },
    ],
  },
  {
    id: "editing",
    videoTypeId: "vt_05",
    index: "05",
    title: "纯剪辑任务",
    english: "EDITING & MOTION",
    intro: "使用需求方提供的现成素材完成修改、整理、混剪或专业成片，不包含新增拍摄。",
    spec: "需提供现成素材",
    price: "评估后报价",
    timeline: "查看当前排队情况",
    includes: "基础调整 / 常规剪辑 / 专业剪辑",
    works: [
      { id: "pw_edt_01", title: "CUT FOR CONVERSION", creator: "RAY", creatorId: "vp_chenkai", role: "COMMERCIAL EDIT", meta: "投放素材 · 20S", image: media.aethera, videoTypeId: "vt_05", videoTypeName: "纯剪辑任务", productName: "多功能旋转切菜器", sku: "SKU-CUT-102", description: "将原有长素材重组为15秒快节奏、高压测试与强吸引力字幕切片，点击率提升200%。" },
      { id: "pw_edt_02", title: "SOCIAL RHYTHM", creator: "LEO", creatorId: "vp_chenkai", role: "EDIT · SOUND", meta: "社媒短片 · 15S", image: media.vex, videoTypeId: "vt_05", videoTypeName: "纯剪辑任务", productName: "轻量化折叠电动车", sku: "SKU-EBK-2026", description: "TikTok卡点音效与字幕包装，前3秒黄金留存强化吸引力。" },
      { id: "pw_edt_03", title: "BRAND IN MOTION", creator: "EVE", creatorId: "vp_chenkai", role: "VISUAL SYSTEM", meta: "品牌包装 · 30S", image: media.skyelite, videoTypeId: "vt_05", videoTypeName: "纯剪辑任务", productName: "真无线3D空间耳机", sku: "SKU-EAR-888", description: "精细音画对位与动态字幕包装，将多段分散拍摄重构成连贯的品牌视效名片。" },
    ],
  },
];

export const testimonials = [
  {
    quote: "视频把功能点讲得很清楚，业务同事拿去发客户，也不用再补一大段说明。",
    person: "陈思",
    role: "家居线运营",
    project: "产品 AI 展示视频",
  },
  {
    quote: "同一套素材拆出了三版投放节奏，测试效率比之前高很多，画面也更像品牌内容。",
    person: "周然",
    role: "增长运营",
    project: "纯剪辑任务",
  },
  {
    quote: "安装步骤终于不是说明书感了，用户能直接跟着做，售后重复咨询也少了一些。",
    person: "林溪",
    role: "产品运营",
    project: "产品安装视频",
  },
  {
    quote: "这版开头三秒抓得很准，投放团队基本没再要求重剪，直接就拿去测了。",
    person: "许妍",
    role: "广告投放",
    project: "产品 AI 精品广告",
  },
  {
    quote: "产品质感比以前的常规棚拍更完整，销售发给客户时也更有信心。",
    person: "高远",
    role: "渠道运营",
    project: "产品实拍展示",
  },
  {
    quote: "卖点顺序和详情页完全对上了，用户看完视频再进页面，理解成本低很多。",
    person: "宋瑜",
    role: "商品运营",
    project: "产品 AI 展示视频",
  },
  {
    quote: "活动临时改主题，团队响应很快，第二天就给了能用的版本。",
    person: "顾宁",
    role: "活动运营",
    project: "短视频剪辑",
  },
  {
    quote: "画面没有为了炫技牺牲信息，核心参数、使用场景和品牌感都保住了。",
    person: "赵琪",
    role: "品类运营",
    project: "产品 AI 精品广告",
  },
] as const;

export const selectionGuide = [
  { situation: "没有样品，需要单款产品场景展示", service: "产品 AI 展示视频" },
  { situation: "重点产品，需要更完整创意表达与大片感", service: "产品 AI 精品广告" },
  { situation: "有样品，需要真实展现材质细节或真实场景", service: "产品实拍展示视频" },
  { situation: "有样品，需要完整组装流程与防呆指引", service: "产品安装视频" },
  { situation: "已有视频素材，仅需后期剪辑与卡点包装", service: "纯剪辑任务" },
  { situation: "特殊非标拍摄或综合性品牌大片", service: "提交专项拍摄需求" },
] as const;

export const serviceTypes = [
  {
    id: "ai-display",
    videoTypeId: "vt_03",
    name: "产品 AI 展示视频",
    useFor: "无需寄送样品，利用产品图片和资料制作动态展示，突出产品外观、使用场景和核心卖点。",
    tags: ["无需样品", "单款产品", "80 USD 起", "内部参考"],
    tiers: [
      { name: "标准版", delivery: "30 秒以内 · 720p", workload: "", price: "80 USD", bestFor: "大多数常规产品展示，约 60% 的产品可选此档。" },
      { name: "复杂 / 创意版", delivery: "30 秒以内 · 720p", workload: "", price: "100 USD", bestFor: "结构复杂、场景生成难度高，或需要更强创意表达。" },
      { name: "定制版", delivery: "45–60 秒 · 1080p", workload: "", price: "160 USD", bestFor: "对时长、清晰度、分镜或制作要求有明确高规格需求。" },
    ],
    note: "内部结算参考，最终以视频组确认口径为准；下单时无需支付。",
  },
  {
    id: "ai-campaign",
    videoTypeId: "vt_04",
    name: "产品 AI 精品广告",
    useFor: "面向重点产品或品牌项目，以完整创意概念、分镜和精细制作建立视觉记忆点。",
    tags: ["重点产品", "1080p", "创意与分镜", "350 USD"],
    tiers: [
      { name: "精品广告", delivery: "通常 30–60 秒 · 1080p", workload: "", price: "350 USD", bestFor: "重点产品、多产品组合、品牌主题或高创意项目。" },
    ],
    note: "建议提前提供产品卖点资料与品牌参考片。",
  },
  {
    id: "live-action",
    videoTypeId: "vt_01",
    name: "产品实拍展示视频",
    useFor: "通过真实样品拍摄外观、材质、细节和使用过程，让消费者直观理解产品。",
    tags: ["需要样品", "真实细节", "1080p", "200 USD"],
    tiers: [
      { name: "实拍展示", delivery: "1080p · 时长按内容", workload: "", price: "200 USD", bestFor: "需要真实呈现材质、尺寸、结构、操作手感或人物讲解。" },
    ],
    note: "请确认样品已准备完毕或寄送中。",
  },
  {
    id: "installation",
    videoTypeId: "vt_02",
    name: "产品安装视频",
    useFor: "用真实拍摄清楚呈现组装和安装步骤，帮助消费者完成操作并减少售后沟通。",
    tags: ["需要样品", "完整安装流程", "1080p", "30 USD"],
    tiers: [
      { name: "标准安装", delivery: "1080p · 时长按步骤", workload: "", price: "30 USD", bestFor: "完整安装演示、关键步骤、易错点和安全提醒。" },
    ],
    note: "针对大件家具或复杂数码设备的安装指引。",
  },
  {
    id: "editing",
    videoTypeId: "vt_05",
    name: "纯剪辑任务",
    useFor: "使用需求方提供的现成素材完成修改、整理、混剪或专业成片，不包含新增拍摄。",
    tags: ["需提供素材", "不含拍摄", "三级剪辑", "评估后报价"],
    tiers: [
      { name: "基础调整", delivery: "改文字 / 尺寸 / 分辨率 / 画幅", workload: "按素材评估", price: "确认后报价", bestFor: "替换简单素材和已有成片的基础修改。" },
      { name: "常规剪辑", delivery: "筛选 / 混剪 / 字幕 / 音乐 / 基础包装", workload: "按素材评估", price: "评估后报价", bestFor: "将多段现成素材整理成节奏完整的成片。" },
      { name: "专业剪辑", delivery: "完整叙事 / 精细节奏 / 复杂视听包装", workload: "项目评估", price: "项目报价", bestFor: "宣传片级别的专业后期，不包含新增拍摄。" },
    ],
    note: "如需重新拍摄，请选择实拍展示或专项需求。",
  },
] as const;

export const specialService = {
  name: "没有找到合适的类型？提交专项拍摄需求",
  useFor: "适用于社媒 how-to、品牌宣传片、特殊人物拍摄或其他同时包含拍摄与剪辑的非标准项目。",
  tags: ["包含拍摄", "非标准项目", "方案确认后评估"],
  note: "提交产品与核心要求后，由视频组负责人人工评估承接可行性与分工。",
} as const;

export const members: CreatorProfile[] = [
  { id: "vp_zhangchen", name: "张晨", role: "AI VIDEO DIRECTOR", skills: ["AI 影像", "创意概念"], status: "正常", queue: "当前可正常接单", tone: "normal", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Kai&backgroundColor=cfff20", workImage: media.voyage },
  { id: "vp_lihao", name: "李浩", role: "CINEMATOGRAPHER", skills: ["产品实拍", "灯光美术"], status: "正常", queue: "当前排期较满", tone: "normal", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Mia&backgroundColor=dbe8ff", workImage: media.vex },
  { id: "vp_wangmin", name: "王敏", role: "EDITOR / MOTION", skills: ["剪辑", "动效包装"], status: "较忙", queue: "当前排期较满", tone: "busy", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Leo&backgroundColor=ffd8cd", workImage: media.stellar },
  { id: "vp_chenkai", name: "陈凯", role: "PRODUCT DIRECTOR", skills: ["产品叙事", "脚本策划"], status: "正常", queue: "当前可正常接单", tone: "normal", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Nina&backgroundColor=cfff20", workImage: media.terra },
  { id: "vp_zhaoqi", name: "赵琪", role: "3D ARTIST", skills: ["三维视觉", "材质灯光"], status: "正常", queue: "当前可正常接单", tone: "normal", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Yu&backgroundColor=dbe8ff", workImage: media.skyelite },
  { id: "vp_zhouyu", name: "周宇", role: "COMMERCIAL EDITOR", skills: ["广告剪辑", "节奏设计"], status: "满载", queue: "暂不可接单", tone: "full", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Ray&backgroundColor=ffd8cd", workImage: media.aethera },
  { id: "vp_eve", name: "EVE", role: "ART DIRECTOR", skills: ["视觉风格", "美术统筹"], status: "正常", queue: "当前可正常接单", tone: "normal", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Eve&backgroundColor=cfff20", workImage: media.codenest },
  { id: "vp_max", name: "MAX", role: "MOTION DESIGNER", skills: ["动态图形", "品牌包装"], status: "正常", queue: "当前排期较满", tone: "normal", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Max&backgroundColor=dbe8ff", workImage: media.transform },
  { id: "vp_lin", name: "LIN", role: "FOOD STYLIST", skills: ["食品拍摄", "场景陈列"], status: "较忙", queue: "当前排期较满", tone: "busy", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Lin&backgroundColor=ffd8cd", workImage: media.voyage },
  { id: "vp_jo", name: "JO", role: "POST PRODUCER", skills: ["后期统筹", "交付管理"], status: "正常", queue: "当前可正常接单", tone: "normal", avatar: "https://api.dicebear.com/10.x/notionists/svg?seed=Jo&backgroundColor=cfff20", workImage: media.terra },
];
