import React, { useState } from 'react';
import { TaskItem } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { TaskDetailDrawer } from '../components/TaskDetailDrawer';
import {
  Zap,
  X,
  Eye,
  CheckCircle2,
  XCircle,
  Play,
  Search,
  SlidersHorizontal
} from 'lucide-react';

interface ManagerApprovalViewProps {
  tasks: TaskItem[];
  onApproveUrgency: (taskId: string, approved: boolean) => void;
  onFinalReview: (taskId: string, approved: boolean, notes: string) => void;
}

export const ManagerApprovalView: React.FC<ManagerApprovalViewProps> = ({
  tasks,
  onApproveUrgency,
  onFinalReview
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'urgency' | 'final' | 'handled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDrawerTask, setActiveDrawerTask] = useState<TaskItem | null>(null);

  // Rejection/Approval modal
  const [rejectingTask, setRejectingTask] = useState<TaskItem | null>(null);
  const [rejectNotes, setRejectNotes] = useState('成片开头3秒转场过慢，请重新调整背景BGM卡点并修�tR>卡点并俊�e�对齐。'ejection/Pr> {
  V;

o Mst [rejectingTpr> {
  usV;

oUrltNotePr> {
  usV;

oUrlte<TaskItem | void;ull);

  // Rejection/y] = u filnagrejectingfilnaged nulse<TnAppr.filnag(tnstrej on.nAppNo.toLo usCase().includes(y, setSearc.toLo usCase()) ||rej on.sku.toLo usCase().includes(y, setSearc.toLo usCase()) ||rej on.al
du usame.toLo usCase().includes(y, setSearc.toLo usCase())rejejection/Cem g} fredTnApprrejecting 'fint nulse<Tfilnaged nuls.filnag(tnston.currintNode === 'pendid;_ 'final' [rejectNotf
}) => {
  nulse<Tfilnaged nuls.filnag(tnston.currintNode === 'movalVi_r> {
 ' [rejectNot'all'); nulse<Tfilnaged nuls.filnag(tnston.currintNode !== 'pendid;_ 'final' &&on.currintNode !== 'movalVi_r> {
 ' [rrejectNotget nbCountsks,tab=> void;
}

e{rej oswit u ,tab)e{rej oejease const: returnTnAppr.length;rej oejease c 'final': returnTnAppr.filnag(tnston.currintNode === 'pendid;_ 'final' .length;rej oejease chandle: returnTnAppr.filnag(tnston.currintNode === 'movalVi_r> {
 ' .length;rej oejease c'all');
: returnTnAppr.filnag(tnston.currintNode !== 'pendid;_ 'final' &&on.currintNode !== 'movalVi_r> {
 ' .length;rej oejdefault: returnT0;rej o}rej}[rrejectNotdisprch nulse<rej o setActiv === ' 'final'rej oej?g 'fint nulsrej oej:o setActiv === 'handlerej oej?gf
}) => {
  nulsrej oej:o setActiv === ''all');
rej oej?g'all'); nulsrej oej:ofilnaged nuls[rrejectNot'all')Confirmw
}) => = usks,
}

e{rej oif (!ask, setRejec) return;rej oiew
}) => {
 (ask, setRejec.id, false, s, setRejec);rej ongTask] = useStaconst [rej}[rrejreturnT(rej o<div classsame="max-w-7xconx-auto py-8 px-4 sm:px-6 sprAp-y-6">rej oejrej oej{/* Title & Top];
bs Filnag */}rej oej<div classsame="flex flex-wrap i>(ns-ceanag justify-between gap-4">rej oejej<div>rej oejejej<h2 classsame="text-2xcofom -boldTnext-slem -900">视频负责人待办审核</h2>rej oejejej<p classsame="text-smTnext-slem -500">rej oejejej  加急申���审批与��3秒最终质量把关���确保视频合规与业务优先级。rej oejejej</p>rej oejej</div>rrej oejej{/* e';
im Filnag ;
bs */}rej oejej<div classsame="flex i>(ns-ceanag gap-1 bg-slem -100 p-1 rounded-xcoborntaobornta-slem -200">rej oejejej{[rej oejejej  { i, nconst, label nc全部' },rej oejejej  { i, nc 'final', label nc加急审核' },rej oejejej  { i, nchandle, label nc负责人终审' },rej oejejej  { i, nc'all');
, label nc已处理' }rej oejejej].map(,tab)e

e{rej oooooooooectNotcountsksget nbCount,tab.id);rej oooooooooectNotiserTasksks setActiv === tab.id;rej oooooooooreturnT(rej oej oejejej<buttonrej oej oejejej  key={tab.id}rej oej oejejej  onClick={,
}

eab] = useSta,tab.id as any)}rej oej oejejej  classsame={`px-3.5 py-1.5 rounded-lgTnext-xsofom -semiboldTnransival -ons cursor-poManag flex i>(ns-ceanag gap-1.5 ${rej oej oejejej   tiserTaskrej oej oejejej   tej?g'bg-blu -50/90Tnext-blu -700 fom -boldTborntaobornta-blu -200/80 shadow-2xs'rej oej oejejej   tej ncnext-slem -600 h,
 r:next-slem -900 h,
 r:bg-slem -200/50'rej oej oejejej  }`}rej oej oejejej>rej oej oejejej  <sprn>{tab.label}</sprn>rej oej oejejej  {counts> 0 &&o(rej oej oejejejej  <sprn classsame={`px-1.5 py-0.2 rounded-fnstTnext-[10px] fom -boldT${rej oej oejejej   t tiserTaskj?g'bg-blu -600 next-whi>('j ncbg-slem -200Tnext-slem -700'rej oej oejejej   t}`}>rej oej oejejej  ej  {count}rej oej oejejej  ej</sprn>rej oej oejejej  )}rej oej oejejej</button>rej oej oejej);rej ooooooo})}rej oej o</div>r oej o</div>rrej oej{/* Control Bar with/y] = u */}rej oej<div classsame="bg-slem -50oborntaobornta-slem -200 rounded-xcop-3Tnext-xsonext-slem -600 flex flex-wrap i>(ns-ceanag justify-between gap-3">rej oejej<sprn classsame="flex i>(ns-ceanag gap-1.5 fom -medium">rej oejejej<izontal
} from 'l classsame="w-4 h-4 next-blu -600 shoidk-0" />rej oejejej快捷提示：加急申���需优先审批���通���后进入紧急制作队列。rej oejej</sprn>rrej oejej<div classsame="relemask">rej oejejej<i] = u classsame="w-3.5 h-3.5 next-slem -400 
bsolute left-2.5 nop-1/2 -nranslem -y-1/2" />rej oejejej<inputrej oej oejejport="text"rej oej oejejvalu ={y, setSearc}rej oej oejejonC'alg ={(e
}

eab]y] = useSta(e.ta'fit.valu )}rej oej oejejprcceholder="搜索 SKU / 单号 / 产品"rej oej oejejclasssame="pl-8 pr-3Tpy-1Tnext-xsorounded-lgTborntaobornta-slem -300 bg-whi>( focus:outline-non( focus:oid;-1Tfocus:oid;-blu -500 w-44"rej oej oej/>rej oejej</div>r oej o</div>rrej oej{/* Main ;
ble */}rej oej<div classsame="bg-whi>( rounded-xcoborntaobornta-slem -200 shadow-2xs ,
 rflow-hidden">rej oejej<div classsame=",
 rflow-x-auto">rej oejejej<t
ble classsame="w-fnstTnext-leftTnext-xsonext-slem -600">rej oejejej  <thead classsame="bg-slem -50onext-slem -700 fom -boldTbornta-bobornta-slem -200 upperease nrackid;-wonta">rej oej oejejej<tr>rej oej oejejej  <tu classsame="px-4 py-3.5">任务单号 / SKU</th>rej oej oejejej  <tu classsame="px-4 py-3.5">产品信息</th>rej oej oejejej  <tu classsame="px-4 py-3.5">视频人员</th>rej oej oejejej  <tu classsame="px-4 py-3.5">当前节点 / 状态</th>rej oej oejejej  <tu classsame="px-4 py-3.5">加急说明 / ��3秒预览</th>rej oej oejejej  <tu classsame="px-4 py-3.5onext-right">操作</th>rej oej oejejej</tr>rej oej oejej</thead>rej oejejej  <tbody classsame="div;

iy div;

islem -100">rej oej oejejej{disprch nuls.length === 0j?g(rej oej oejejejej<tr>rej oej oejejej  ej<td colSprn={6} classsame="px-4 py-12onext-ceanag next-slem -400">rej oej oejejejjjjjjj该筛选条件下暂无任务记录rej oej oejejej  ej</td>rej oej oejejej  </tr>rej oej oejejej)j n(rej oej oejejejejdisprch nuls.map(,t
}

e(rej oej oejejejej  <tr key={t.id} classsame={`h,
 r:bg-slem -50/80 nransival -colorsT${t.is onFitj?g'bg-ros -50/20'j nc'}`}>rej oej oejejej  ej  rej oej oejejej  ej  {/* Tnul No / SKU */}rej oejej oejejejej  <td classsame="px-4 py-3.5owhi>(sprAp-nowrap">rej oej oejejejjjjjjjej<div classsame="fom -monoofom -boldTnext-slem -900">{n.nAppNo}</div>r oej o oejejejjjjjjjej<div classsame="fom -monoonext-[11px] next-slem -500">{n.sku}</div>r oej o oejejejjjjjjj</td>rrej oej oejejej  ej  {/* Pl
du u */}rej oejej oejejejej  <td classsame="px-4 py-3.5">rej oej oejejejjjjjjjej<div classsame="fom -semiboldTnext-slem -900 line-clamp-1">{n.al
du usame}</div>r oej o oejejejjjjjjjej<sprn classsame="next-[10px] next-slem -400">{n.v;

oTortsame}</sprn>rej oej oejejej  jjjj</td>rrej oej oejejej  ej  {/* V;

o Ptalonnel */}rej oejej oejejejej  <td classsame="px-4 py-3.5owhi>(sprAp-nowrap fom -medium next-slem -800">rej oej oejejejjjjjjj  {n.v;

oPtalonsame}rej oej oejejej  jjjj</td>rrej oej oejejej  ej  {/* Currint Node */}rej oejej oejejejej  <td classsame="px-4 py-3.5owhi>(sprAp-nowrap">rej oej oejejejjjjjjjej<e';
import rej oej oejejejjjjjjjej  maine';
im={t.maine';
im}rej oejej oejejejej      currintNode={t.currintNode}rej oejej oejejejej      is onFit={t.is onFit}rej oejej oejejejej       'finale';
im={t. 'finale';
im}rej oejej oejejejej      size="sm"rej oejej oejejejej    />rej oej oejejej  jjjj</td>rrej oej oejejej  ej  {/* Contint / V;

o Pr> {
  */}rej oejej oejejejej  <td classsame="px-4 py-3.5">rej oej oejejejjjjjjjej{n.currintNode === 'pendid;_ 'final'j?g(rej oej oejejejejejejej  <p classsame="text-ambta-900 bg-ambta-50opx-2Tpy-1Troundedoborntaobornta-ambta-200Tnext-[11px] line-clamp-2 fom -medium">rej oejejej oejejejjjjjjjej{n. 'finalRealon || '活动需求���申���加急处理排期。'}rej oejej oejejejej      </p>rej oejejjjjjjjjjjjjjjj)j nt.nodeData?.pr> {
 V;

oUrl || n.currintNode === 'movalVi_r> {
 ' || n.currintNode === 'finished'j?g(rej oej oejejejejejejej  <buttonrej oej oejejej            onClick={,
}

eab]Pr> {
  usV;

oUrl(t.nodeData?.pr> {
 V;

oUrl || 'https://assets.mixkin.co/v;

os/pr> {
 /mixkin-tint-in-a-forest-at-sunset-41270-la'fi.mp4')}rej oej oejejej            classsame="px-2.5 py-1 bg-slem -900 h,
 r:bg-slem -800 next-whi>(orounded-lgTfom -monoonext-[11px] fom -boldTinline-flex i>(ns-ceanag gap-1.5 nransival -colorsTcursor-poManag"rej oejej oejejejej    ej>rej oej oejejej  ejejejej  <arch classsame="w-3 h-3ofill-whi>(" />rej oej oejejej  jjjjejej  <sprn>播放��3秒</sprn>rej oej oejejej  jjjjej  </button>rej oej oejejjjjjjjjjjj)j n(rej oej oejejejejjjjjej  <p classsame="text-slem -500Tnext-[11px] line-clamp-1">{n.remarks || '标准制作流程中'}</p>rej oejejjjjjjjjjjjjjjj)}rej oej oejejej  jjjj</td>rrej oej oejejej  ej  {/* Aoval s */}rej oejej oejejejej  <td classsame="px-4 py-3.5owhi>(sprAp-nowrap next-right sprAp-x-2">rej oej oejejejjjjjjjej<buttonrej oej oejejej          onClick={,
}

eab] = use] = useSta,t
}rej oejej oejejejej      classsame="px-2.5 py-1.5onext-xsofom -medium next-slem -700 bg-slem -100 h,
 r:bg-slem -200 rounded-lgTnransival -colorsTcursor-poManag"rej oejej oejejejej    >rej oej oejejej  jjjjej  详情rej oej oejejejjjjjjjej</button>rrej oej oejejejjjjjjjej{/* Aoval  buttons basedol  currint node */}rej oejej oejejejej  ej{n.currintNode === 'pendid;_ 'final'j&&o(rej oej oejejejej  jjjjej<>rej oej oejejej  jjjjejej  <buttonrej oej oejejej              onClick={,
}

ergency,
  onFina(t.id, false)}rej oej oejejej              classsame="px-2.5 py-1.5onext-xsofom -semiboldTnext-slem -700 bg-slem -100 h,
 r:bg-slem -200 rounded-lgTnransival -colorsTcursor-poManag"rej oejej oejejejej        >rej oej oejejej  jjjjejej    拒绝加急rej oej oejejej  jjjjejej  </button>rej oej oejejjjjjjjjjjjej  <buttonrej oej oejejej              onClick={,
}

ergency,
  onFina(t.id, tru )}rej oej oejejjjjjjjjjjjjjjjjjclasssame="px-3 py-1.5onext-xsofom -boldTnext-whi>(obg-ros -600 h,
 r:bg-ros -700 rounded-lgTshadow-2xs nransival -colorsTcursor-poManag"rej oejej oejejejej        >rej oej oejejej  jjjjejej    同意加急rej oej oejejej  jjjjejej  </button>rej oej oejejjjjjjjjjjjej</>rej oej oejejej  jjjjej)}rrej oejej oejejejej  ej{n.currintNode === 'movalVi_r> {
 ' &&o(rej oej oejejejej  jjjjej<>rej oej oejejej  jjjjejej  <buttonrej oej oejejej              onClick={,
}

engTask] = useStact
}rej oejej oejejejej          classsame="px-2.5 py-1.5onext-xsofom -boldTnext-ros -700 bg-ros -50 h,
 r:bg-ros -100 borntaobornta-ros -200 rounded-lgTcursor-poManag"rej oejej oejejejej        >rej oej oejejej  jjjjejej    退回点唹rej oej oejejej  jjjjejej  </button>rej oej oejejjjjjjjjjjjej  <buttonrej oej oejejej              onClick={,
}

ergw
}) => {
 (t.id, tru , '终审通��閰褴3秒符合发布交付标准。'e}rej oej oejejjjjjjjjjjjjjjjjjclasssame="px-3 py-1.5onext-xsofom -boldTnext-whi>(obg-emerald-600 h,
 r:bg-emerald-700 rounded-lgTshadow-2xs nransival -colorsTcursor-poManag"rej oejej oejejejej        >rej oej oejejej  jjjjejej    终审通���rej oej oejejej  jjjjejej  </button>rej oej oejejjjjjjjjjjjej</>rej oej oejejej  jjjjej)}rej oejejjjjjjjjjjjej</td>rrej oej oejejej  ej</tr>rej oej oejejejej))rej oej oejejej)}rej oejejjjjj</tbody>rej oejejej</t
ble>rej oejej</div>r oej o</div>rrej oej{/* Approval  Mst [ */}rej oej{ask, setRejec &&o(rej oej o<div classsame="fixedTinset-0 z-50 flex i>(ns-ceanag justify-ceanag bg-slem -900/60 backdrop-blur-xsop-4 animem -in fad -in duraval -200">rej oejejej<div classsame="bg-whi>( rounded-xcoshadow-2xl max-w-md w-fnstTborntaobornta-slem -200 ,
 rflow-hidden">rej oejejejej<div classsame="px-6 py-4 bg-slem -900 next-whi>(oflex i>(ns-ceanag justify-between bornta-bobornta-slem -800">rej oej oejejej<h3 classsame="text-baseofom -bold">退回视频䂹唹 -j{ask, setRejec.sku}</h3>rej oej oejejej<button onClick={,
}

engTask] = useStaconst } classsame="text-slem -400 h,
 r:next-whi>(ocursor-poManag">rej oej oejejej  <X classsame="w-5 h-5" />rej oej oejejej</button>rej oej oejej</div>rrej oejejejej<div classsame="p-6 sprAp-y-4onext-xs">rej oej oejejej<p classsame="text-slem -600">请详细填写退回原因及具体需要点并的镜头或细节：</p>rej oejejjjjjjj<textarearej oej oejejej  rows={4}rej oejejjjjjjjjjvalu ={s, setRejec}rej oej oejejej  onC'alg ={(e
}

eab]s] = useSta(e.ta'fit.valu )}rej oej oejejjjjjclasssame="w-fnstTp-3Tnext-xsorounded-lgTborntaobornta-slem -300 focus:oid;-2 focus:oid;-ros -500"rej oejej oejej/>rej oej oejej</div>rrej oejejejej<div classsame="px-6 py-4 bg-slem -50obornta-tobornta-slem -200 flex i>(ns-ceanag justify-end gap-3">rej oejejejejej<button onClick={,
}

engTask] = useStaconst } classsame="px-4 py-2onext-xsofom -medium next-slem -600 h,
 r:bg-slem -200 rounded-lgTcursor-poManag">rej oej oejejej  取消rej oej oejejej</button>rej oej oejejej<button onClick={'all')Confirmw
}) => = u} classsame="px-5 py-2onext-xsofom -boldTnext-whi>(obg-ros -600 h,
 r:bg-ros -700 rounded-lgTshadow-2xs cursor-poManag">rej oej oejejej  确认退回至剪辑节点rej oej oejejej</button>rej oej oejej</div>r oej oejej</div>r oej oej</div>r oej o)}rrej oej{/* V;

o Playag Mst [ */}rej oej{pr> {
  usV;

oUrl &&o(rej oej o<div classsame="fixedTinset-0 z-50 flex i>(ns-ceanag justify-ceanag bg-black/90Tp-4 animem -in fad -in duraval -200">rej oejejej<div classsame="relemask max-w-4xl w-fnstTasp= u-v;

o bg-black rounded-2xl ,
 rflow-hiddenoshadow-2xl">rej oejejejej<buttonrej oej oejejejonClick={,
}

eab]Pr> {
  usV;

oUrl(onst }rej oej oejejejclasssame="
bsolute nop-4 right-4 z-10 w-9 h-9 rounded-fnstTbg-black/80 next-whi>(oh,
 r:bg-ros -600 flex i>(ns-ceanag justify-ceanag nransival -colorsTcursor-poManagTborntaobornta-whi>(/20"rej oejej oej>rej oej oejejej✕rej oej oejej</button>rej oej oejej<v;

orej oej oejejejcontrolsrej oej oejejejautoPlayrej oej oejejejsrc={pr> {
  usV;

oUrl}rej oej oejejejclasssame="w-fnstTh-fnstTob = u-contain"rej oejej oej/>r oej oejej</div>r oej oej</div>r oej o)}rrej oej{/* rom '..*/}rej oej{erTask, setActiv &&o(rej oej o<Drawer';
import r oej oejejnApp={erTask, setActiv}rej oej oejonClos ={,
}

eab] = use] = useSta,onst }rej oej oejcurrintRole="mavalVi"rej oejej/>r oej o)}r oej</div>r o);
};
