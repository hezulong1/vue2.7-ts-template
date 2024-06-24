<h1 align="center">vue2.7-ts-template</h1>
<p align="center"><a href="README.md">English</a> | 中文</p>

<br>

一份集成了魔改 ElementUI 的框架模板。

## 特征

* 绝对的代码简洁（只引入必要包，只提供需要的功能）
* 完全使用 ESM 编码
* 友好的浏览器兼容度（以 vue2 兼容度为准）
* 支持 vue-setup 语法
* 支持 `compositionAPI` 语法
* 支持国际化
* 重构 Element，见[细节](#element-重构)
* 自定义状态机（如果不喜欢，亦可以使用 pinia，vuex）
* 待补充...


## Element 重构

基本 [Element@2.15.14](https://element.eleme.cn/) 修改 （2024-06-24）

- 使用 TS 增强提示
- 使用 dayjs 替换 fenca
- 调整 commonjs 为 esm
- 图标采用 [SVG](https://github.com/element-plus/element-plus-icons)
- 主题调整

### 细节

+ 控件大小与 ElementPlus 保持一致，default(32px), small(24px)，移除 large
+ 控件内边距与 ElementPlus 保持一致
+ 适配 DartSass
+ 解决开发模式下的重复引入问题
+ 规范化色彩值（特别是中性色），不再仅仅是视觉上的差异
+ 规范化相似组件表现，比如 select 和 timeselect 表现不一致，又比如 drawer，dialog，messagebox，notification 的关闭按钮

+ 布局组件在多数项目实用性，远不如直接使用样式，遂直接从 Element 移出
  el-container
  el-header
  el-aside
  el-main
  el-footer
  el-card
  el-link：直接使用 a 标签更加简洁

+ 一次性组件在多数项目根据设计稿走，遂也直接从 Element 移出
  el-menu
  el-submenu
  el-menu-item
  el-menu-item-group
  el-empty
  el-result
  el-page-header
  el-backtop

+ 特殊优化组件
  el-button：active 模式与 ElementPlus 保持一致
  el-scrollbar：支持最小高度/宽度

+ 新增组件
  el-treeselect
  el-close
  el-focustrap
  el-image-viewer
  el-auto-resizer
