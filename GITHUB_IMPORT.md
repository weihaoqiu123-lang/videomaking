# Google AI Studio 导入说明

仓库：`weihaoqiu123-lang/videomaking`

## 导入
1. 打开 Google AI Studio Build。
2. 点击输入框旁的 `+`。
3. 选择 `Import from GitHub`。
4. 选择仓库 `videomaking`，分支使用 `main`。

## 导入后的第一条指令

这是已经整理好的完整视频任务管理 V1.0 原型。请直接运行当前代码，不要重新设计 Portfolio，也不要重写现有业务流程。如果存在构建错误，只修复构建错误。

重点保持：
- 运营默认进入作品集。
- Hero 只保留“创建视频需求”主按钮。
- Hero 包含背景视频，同时存在 CSS 动态光效兜底；即使外部视频无法加载，也不能退化成纯黑静态背景。
- 代表作品为静态 3 列 Grid，比例 4:3，不使用 Marquee、自动横向滚动或持续位移动画。
- 创建视频需求、我的视频订单、视频人员待办、视频负责人待办、视频任务总览保持现有逻辑。
- 视频人员和视频负责人页面右上角状态筛选必须保留。

## 媒体说明
当前 GitHub 版为了避免 AI Studio 导入时二进制资源丢失：
- Hero 视频使用远程视频地址。
- Hero 同时使用 CSS 动态光效作为加载失败兜底。
- 代表作品使用静态远程图片，不依赖本地 WebP/GIF。

因此从 GitHub 导入后不需要额外上传 `public/videos` 或 `public/showreel` 才能运行 Demo。
