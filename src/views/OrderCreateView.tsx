import React, { useState, useEffect, useRef } from 'react';
import { VideoType, VideoPersonnel, TaskItem } from '../types';
import { PortfolioItem } from '../data/portfolioData';
import { MOCK_PRODUCTS_DATABASE } from '../data/mockData';
import {
  Sparkles,
  Check,
  ArrowRight,
  Search,
  CheckCircle2,
  Package,
  Clock,
  User,
  Sliders,
  ChevronDown,
  Zap,
  Camera,
  Wrench,
  Clapperboard,
  Scissors,
  X
} from 'lucide-react';

interface OrderCreateViewProps {
  videoTypes: VideoType[];
  videoPersonnel: VideoPersonnel[];
  onSubmitTask: (newTask: Omit<TaskItem, 'id' | 'taskNo' | 'createdAt' | 'updatedAt' | 'logs' | 'nodeData'>) => void;
  onNavigateToOrders: () => void;
  onOpenPortfolio?: () => void;
  referenceWork?: PortfolioItem | null;
  preselectedVideoTypeId?: string | null;
  onClearReferenceWork?: () => void;
}

export const OrderCreateView: React.FC<OrderCreateViewProps> = ({
  videoTypes,
  videoPersonnel,
  onSubmitTask,
  onNavigateToOrders,
  onOpenPortfolio,
  referenceWork,
  preselectedVideoTypeId,
  onClearReferenceWork
}) => {
  // Currently selected Video Type (default to vt_01 or preselected)
  const [selectedType, setSelectedType] = useState<VideoType>(() => {
    if (preselectedVideoTypeId) {
      const match = videoTypes.find(t => t.id === preselectedVideoTypeId);
      if (match) return match;
    }
    if (referenceWork) {
      const match = videoTypes.find(t => t.id === referenceWork.videoTypeId);
      if (match) return match;
    }
    return videoTypes[0] || null;
  });

  const [selectedPerson, setSelectedPerson] = useState<VideoPersonnel | null>(null);

  // Personnel Dropdown Custom Toggle State
  const [isPersonnelDropdownOpen, setIsPersonnelDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Product Search / Autocomplete State
  const [searchProductQuery, setSearchProductQuery] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Form Fields - Product & Requirements
  const [sku, setSku] = useState('TP10241PI');
  const [productName, setProductName] = useState('电子炉灶厨房玩具套装');
  const [productCategory, setProductCategory] = useState('儿童玩具 / 模拟厨房');
  const [productImage, setProductImage] = useState('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80');
  const [productLink, setProductLink] = useState('https://www.amazon.com/dp/B08X9ZPXYZ');

  // Video Requirements
  const [style, setStyle] = useState<'simple' | 'refined' | 'ai'>('refined');
  const [videoRatio, setVideoRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [videoDuration, setVideoDuration] = useState<'<30s' | '<60s' | '<90s' | '自定义'>('<60s');
  const [sampleStatus, setSampleStatus] = useState<'arrived' | 'on_way' | 'not_needed'>('arrived');
  const [needsPerson, setNeedsPerson] = useState(true);
  const [remarks, setRemarks] = useState('重点展示柜体拼接与防呆线路连接步骤，画面需光线明亮。');

  // Urgency
  const [isUrgent, setIsUrgent] = useState(false);

  // Submission Status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTaskInfo, setSubmittedTaskInfo] = useState<{ isUrgent: boolean; personName: string } | null>(null);

  // Close custom personnel dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsPersonnelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update selectedType when preselectedVideoTypeId or referenceWork changes
  useEffect(() => {
    if (preselectedVideoTypeId) {
      const matchedType = videoTypes.find(t => t.id === preselectedVideoTypeId);
      if (matchedType) {
        setSelectedType(matchedType);
      }
    }
  }, [preselectedVideoTypeId, videoTypes]);

  useEffect(() => {
    if (referenceWork) {
      const matchedType = videoTypes.find(t => t.id === referenceWork.videoTypeId);
      if (matchedType) {
        setSelectedType(matchedType);
      }
      const matchedPerson = videoPersonnel.find(p => p.id === referenceWork.creatorId);
      if (matchedPerson) {
        setSelectedPerson(matchedPerson);
      }
      setRemarks(`【参考作品：${referenceWork.title}】\n表达效果参考：${referenceWork.description}`);
    }
  }, [referenceWork, videoTypes, videoPersonnel]);

  // Filtered Product Autocomplete Items
  const filteredProducts = MOCK_PRODUCTS_DATABASE.filter(
    p => p.sku.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
         p.name.toLowerCase().includes(searchProductQuery.toLowerCase())
  );

  const handleSelectProductFromSearch = (product: typeof MOCK_PRODUCTS_DATABASE[0]) => {
    setSku(product.sku);
    setProductName(product.name);
    setProductCategory(product.category);
    setProductImage(product.image);
    setSearchProductQuery('');
    setShowProductDropdown(false);
  };

  // Direct Final Submit Handler
  const handleSubmitTask = () => {
    if (!selectedType) {
      alert('请先选择视频类型！');
      return;
    }
    if (!sku || !productName) {
      alert('请填写完整的 SKU 和产品名称！');
      return;
    }
    if (!selectedPerson) {
      alert('请选择视频制作人员！');
      return;
    }

    const styleNameMap = {
      simple: '简单视频风格',
      refined: '精细化设计',
      ai: 'AI设计'
    };

    const newTaskData = {
      sku,
      productName,
      productCategory,
      productImage,
      productLink,
      videoTypeId: selectedType.id,
      videoTypeName: selectedType.name,
      videoPersonId: selectedPerson.id,
      videoPersonName: selectedPerson.name,
      isUrgent: isUrgent,
      style,
      styleName: styleNameMap[style],
      videoRatio,
      videoDuration,
      needsPerson,
      sampleStatus,
      remarks,
      mainStatus: 'pending' as const,
      currentNode: isUrgent ? ('pending_urgency' as const) : ('appointment' as const),
      currentNodeName: isUrgent ? '待加急审核' : '待处理',
      creatorName: '运营-刘敏'
    };

    onSubmitTask(newTaskData);
    setSubmittedTaskInfo({ isUrgent, personName: selectedPerson.name });
    setIsSubmitted(true);
  };

  // Calculate status label and style based on task count
  const getPersonStatusDisplay = (vp: VideoPersonnel) => {
    if (vp.currentTasks >= vp.maxTasks || vp.status === 'full') {
      return {
        label: '满载',
        badgeClass: 'bg-slate-200 text-slate-700 border-slate-300',
        isDisabled: true,
        estStart: '暂不可接单'
      };
    }
    if (vp.currentTasks >= 11 || vp.status === 'busy') {
      return {
        label: '较忙',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        isDisabled: false,
        estStart: vp.estimatedStartText || '预计约3周后开始'
      };
    }
    return {
      label: '正常',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      isDisabled: false,
      estStart: vp.estimatedStartText || '预计约1周后开始'
    };
  };

  // Icon map for video types
  const getVideoTypeIcon = (num: string) => {
    switch (num) {
      case '01': return Camera;
      case '02': return Wrench;
      case '03': return Sparkles;
      case '04': return Clapperboard;
      case '05': return Scissors;
      default: return Camera;
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">视频需求提单成功！</h2>
          {submittedTaskInfo?.isUrgent ? (
            <p className="text-sm text-amber-900 bg-amber-50 p-4 rounded-xl border border-amber-200 font-medium">
              加急视频需求已成功提交，已自动进入【待加急审核】队列，将由视频负责人专项处理审核与排期。
            </p>
          ) : (
            <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
              视频需求已成功派发至 <span className="font-bold text-slate-900">{submittedTaskInfo?.personName}</span> 的任务队列中。
            </p>
          )}
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onNavigateToOrders}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            前往「我的视频订单」查看进度
          </button>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedPerson(null);
            }}
            className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm rounded-lg transition-colors cursor-pointer"
          >
            继续创建下一单
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* 1. COMPACT PORTFOLIO STRIP (Grow AI Style, Height ~130px) */}
      <div className="relative w-full rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 text-white p-5 sm:p-6 border border-white/10 shadow-lg overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 right-0 w-80 h-full bg-purple-600/10 blur-2xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-medium">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>✦ VIDEO PORTFOLIO</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            还没确定视频方向？
          </h3>
          <p className="text-xs text-slate-300 font-normal leading-relaxed">
            看看不同类型的精选作品，找到参考效果后再创建需求。
          </p>
        </div>

        <div className="flex items-center gap-4 relative z-10 shrink-0">
          {/* Mini Floating Thumbnails */}
          <div className="hidden md:flex items-center -space-x-3">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80"
              alt="Installation"
              className="w-12 h-12 rounded-lg object-cover border-2 border-slate-900 shadow-md transform hover:scale-110 transition-transform"
            />
            <img
              src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=200&q=80"
              alt="Showcase"
              className="w-12 h-12 rounded-lg object-cover border-2 border-slate-900 shadow-md transform hover:scale-110 transition-transform"
            />
            <img
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=200&q=80"
              alt="AI Video"
              className="w-12 h-12 rounded-lg object-cover border-2 border-slate-900 shadow-md transform hover:scale-110 transition-transform"
            />
          </div>

          <button
            onClick={onOpenPortfolio}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>查看作品集</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Referenced Work Bar if selected from Portfolio */}
      {referenceWork && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <img src={referenceWork.thumbnail} alt={referenceWork.title} className="w-10 h-10 rounded-lg object-cover border border-purple-200 shrink-0" />
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600 text-white font-mono">
                已带入参考作品
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">{referenceWork.title}</h4>
            </div>
          </div>
          {onClearReferenceWork && (
            <button
              onClick={onClearReferenceWork}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              title="清除参考"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Header Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">创建视频需求</h2>
        <p className="text-xs text-slate-500">
          点击选择视频类型，并在下方直接填写需求参数与制作人员信息。
        </p>
      </div>

      {/* 2. COMPACT VIDEO TYPE SELECTION GRID (3 to 5 Columns) */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          选择视频类型 <span className="text-rose-500">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {videoTypes.map((vt) => {
            const isSelected = selectedType?.id === vt.id;
            const IconComp = getVideoTypeIcon(vt.num);

            return (
              <div
                key={vt.id}
                onClick={() => setSelectedType(vt)}
                className={`relative bg-white rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between h-[140px] shadow-2xs group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`p-1.5 rounded-lg text-xs font-bold ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </span>

                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>已选择</span>
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300 group-hover:border-slate-400" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {vt.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 mt-1 font-normal">
                    {vt.shortDesc}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  TYPE #{vt.num}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SAME-PAGE FORM UNFOLDING (When Selected) */}
      {selectedType && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8 animate-in fade-in duration-200">
          
          {/* SECTION 01: 产品基础信息 */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span>01 产品基础信息</span>
            </h3>

            {/* Product Autocomplete Search */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                搜索已有产品 (快速自动填充 SKU 与名称)
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchProductQuery}
                  onChange={(e) => {
                    setSearchProductQuery(e.target.value);
                    setShowProductDropdown(true);
                  }}
                  onFocus={() => setShowProductDropdown(true)}
                  placeholder="输入 SKU 编号或关键词 (例如 HUAWEI123, TP10241PI, 模拟厨房...)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Dropdown Options */}
              {showProductDropdown && filteredProducts.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.sku}
                      onClick={() => handleSelectProductFromSearch(p)}
                      className="p-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded object-cover border border-slate-200 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-700">{p.sku}</span>
                          <span className="text-[10px] text-slate-400">{p.category}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detailed Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SKU / 产品货号 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="例如 TP10241PI"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  产品名称 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="输入产品中文名称"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">产品类目</label>
                <input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">产品链接 (Amazon/官网)</label>
                <input
                  type="text"
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* SECTION 02: 视频制作要求 */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>02 视频制作要求 ({selectedType.name})</span>
            </h3>

            {/* Style Choice */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                制作风格定位 <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'simple', label: '简单视频风格', desc: '基础展示与快速出片，适合日常跑量' },
                  { key: 'refined', label: '精细化设计', desc: '高品质视觉包装与精细光影打磨' },
                  { key: 'ai', label: 'AI设计', desc: '借助AI生成高感视觉场景与动态流效' }
                ].map((st) => {
                  const isSelected = style === st.key;
                  return (
                    <div
                      key={st.key}
                      onClick={() => setStyle(st.key as any)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">{st.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 font-bold" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{st.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">视频比例</label>
                <select
                  value={videoRatio}
                  onChange={(e) => setVideoRatio(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="16:9">16:9 (横屏大屏)</option>
                  <option value="9:16">9:16 (竖屏短视频)</option>
                  <option value="1:1">1:1 (正方形主图)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">视频时长</label>
                <select
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="<30s">&lt;30s</option>
                  <option value="<60s">&lt;60s</option>
                  <option value="<90s">&lt;90s</option>
                  <option value="自定义">自定义时长</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">样品状态</label>
                <select
                  value={sampleStatus}
                  onChange={(e) => setSampleStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="arrived">样品已到位</option>
                  <option value="on_way">样品寄送中</option>
                  <option value="not_needed">无需样品</option>
                </select>
              </div>
            </div>

            <div className="pt-1">
              <label className="inline-flex items-center gap-2 text-xs text-slate-800 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsPerson}
                  onChange={(e) => setNeedsPerson(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                需要真人/模特出镜
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">需求描述 / 补充说明</label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="填写具体拍摄或包装要求..."
                className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* SECTION 03: 是否加急 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isUrgent ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'}`}>
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">03 是否标注为加急需求</span>
                  {isUrgent ? (
                    <p className="text-[12px] text-amber-800 font-medium mt-0.5">
                      加急费用预估上涨20%，望知悉。
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      加急需求将进入负责人审核队列，不受常规排期限制。
                    </p>
                  )}
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </div>

          {/* SECTION 04: 选择视频制作人员 (Combobox) */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>04 选择视频制作人员 <span className="text-rose-500">*</span></span>
            </h3>

            {/* Custom Select Combobox */}
            <div ref={dropdownRef} className="relative w-full">
              <div
                onClick={() => setIsPersonnelDropdownOpen(!isPersonnelDropdownOpen)}
                className={`w-full p-3.5 rounded-xl border bg-white flex items-center justify-between cursor-pointer transition-all shadow-2xs ${
                  selectedPerson
                    ? 'border-blue-600 ring-2 ring-blue-500/10'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                {selectedPerson ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPerson.avatar}
                      alt={selectedPerson.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-bold text-slate-900 text-sm">{selectedPerson.name}</span>
                      <span className="text-slate-500 font-medium">{selectedPerson.specialty}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getPersonStatusDisplay(selectedPerson).badgeClass}`}>
                        状态：{getPersonStatusDisplay(selectedPerson).label}
                      </span>
                      <span className="text-slate-600 font-medium hidden sm:inline">
                        (预计：{isUrgent ? '加急排期中' : getPersonStatusDisplay(selectedPerson).estStart})
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">请选择视频制作人员...</span>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isPersonnelDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Options List */}
              {isPersonnelDropdownOpen && (
                <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden max-h-80 overflow-y-auto divide-y divide-slate-100 animate-in fade-in duration-150">
                  {videoPersonnel.map((vp) => {
                    const statusInfo = getPersonStatusDisplay(vp);
                    const isSelected = selectedPerson?.id === vp.id;

                    return (
                      <div
                        key={vp.id}
                        onClick={() => {
                          if (!statusInfo.isDisabled) {
                            setSelectedPerson(vp);
                            setIsPersonnelDropdownOpen(false);
                          }
                        }}
                        className={`p-3.5 flex items-center justify-between transition-colors ${
                          statusInfo.isDisabled
                            ? 'bg-slate-50 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'bg-blue-50/80 cursor-pointer'
                            : 'hover:bg-slate-50 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={vp.avatar}
                            alt={vp.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">{vp.name}</span>
                              <span className={`text-[10px] px-2 py-0.2 rounded font-bold border ${statusInfo.badgeClass}`}>
                                状态：{statusInfo.label}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{vp.specialty}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-semibold text-slate-700 block">
                            {isUrgent ? '加急排期中' : statusInfo.estStart}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-blue-600 block">已选择</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selected Person Summary Bar */}
            {selectedPerson && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>已选择：{selectedPerson.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">状态：</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPersonStatusDisplay(selectedPerson).badgeClass}`}>
                      {getPersonStatusDisplay(selectedPerson).label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-500">预计开始：</span>
                    <span className="font-bold text-slate-800">
                      {isUrgent ? '加急排期中' : getPersonStatusDisplay(selectedPerson).estStart}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 05: Direct Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={handleSubmitTask}
              className={`px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] ${
                isUrgent
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
              }`}
            >
              {isUrgent ? <Zap className="w-4 h-4 fill-white" /> : <Check className="w-4 h-4" />}
              <span>直接提交视频需求</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
