尽可能的与 element-plus 中的 [scrollbar](https://element-plus.gitee.io/zh-CN/component/scrollbar.html) 保持一致。

1. 新增 height 属性，控制滚动条高度
1. 新增 maxHeight 属性，控制滚动条最大高度
1. 新增 always 属性，控制滚动条总是显示
1. 新增 minSize 属性，控制滚动条最小尺寸
1. 新增 scroll 事件
1. 对外暴露 scrollTo 方法
1. 对外暴露 setScrollTop 方法
1. 对外暴露 setScrollLeft 方法
1. 优化 wrapStyle 的集成方式

## CSS

1. 新增 @scrollbar-gap, @scrollbar-size, @scrollbar-opacity, @scrollbar-hover-opacity, @scrollbar-active-opacity 变量
1. 移除 @scrollbar-hover-background-color
1. 修改 @scrollbar-background-color 由 fade(@color-text-secondary, 30%) -> @color-black，通过 opacity 作为反馈属性
1. 滚动条样式宽度 6px -> 8px
1. 滚动条弧度 4px -> 9999px
1. 新增激活状态下的样式
1. 新增滚动条一直显示样式

## Diff with element-plus

1. 组件对外暴露 wrap，Elp 为 wrapRef。
1. 与 Elp 保持一致，默认移除 marginBottom 与 marginRight，若不支持 `el-scrollbar__wrap--hidden-default`，则回退处理，Elp 不需要考虑此情况。
1. 组件未提供 handleScroll 方法。
