---
sidebar: auto
---

# 使用文档

## 介绍

### 安装

`npm install gantt-elastic-h --save # yarn add gantt-elastic-h # pnpm add gantt-elastic-h`

<component v-if="dynamicComponent" :is="dynamicComponent"></component>
<a href="https://jianguoht.github.io/gantt-elastic-h/demo/" target="_blank">新标签页中打开</a>
::: details 点击查看代码
<<< @/demo/GanttElastic.standalone.vue
:::

## 配置

### props

| 参数         | 说明                                                                                            | 类型   | 可选值 | 默认值 |
| ------------ | ----------------------------------------------------------------------------------------------- | ------ | ------ | ------ |
| tasks        | 任务列表                                                                                        | Object | --     | --     |
| options      | 配置项                                                                                          |        |        |        |
| dynamicStyle | 自定义样式设置，[样式字典](https://github.com/JianGuoHt/gantt-elastic-h/blob/main/src/style.js) | Object | --     | --     |

### tasks

任务列表

| 参数      | 说明                                                                                                                                                                                                    | 类型            | 可选值                   | 默认值 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------ | ------ |
| parentId  | 父 ID -- 用于生成树                                                                                                                                                                                     | Number / String | --                       | --     |
| type      | 任务类型， 可根据 options.taskMapping 修改字段名 <span style="color: red">必填</span>                                                                                                                   | String          | milestone，task，project | --     |
| start     | 开始时间， 可根据 options.taskMapping 修改字段名 <span style="color: red">必填</span>                                                                                                                   | date            | --                       | --     |
| duration  | 任务持续时间（时间戳），可根据 options.taskMapping 修改字段名 <span style="color: red">必填</span>                                                                                                      | Number          | --                       | --     |
| progress  | 任务完成百分比 ，可根据 options.taskMapping 修改字段名 <span style="color: red">必填</span>                                                                                                             | Number          | --                       | --     |
| collapsed | 是否默认收起，可根据 options.taskMapping 修改字段名 <span style="color: red">必填</span>                                                                                                                | Boolean         | --                       | false  |
| style     | 当前任务，样式设置。[参考](https://github.com/JianGuoHt/gantt-elastic-h/blob/main/src/GanttElastic.standalone.vue#L64)，[样式字典](https://github.com/JianGuoHt/gantt-elastic-h/blob/main/src/style.js) | Object          | --                       | --     |

### options

配置项

| 参数        | 说明                                                                | 类型   | 可选值 | 默认值 |
| ----------- | ------------------------------------------------------------------- | ------ | ------ | ------ |
| taskList    | 左侧列表相关配置                                                    | Object | --     | --     |
| taskMapping | 组件需要用到的字段枚举。具体看下表                                  | Object | --     | --     |
| scroll      | 内容滚动相关配置。具体看下表                                        | Object | --     | --     |
| scope       | 右侧图表前后日期范围。具体看下表                                    | Object | --     | --     |
| times       | 右侧图表时间相关配置。具体看下表                                    | Object | --     | --     |
| row         | 左侧列表，行配置。具体看下表                                        | Object | --     | --     |
| maxRows     | 最多显示行数                                                        | Number | --     | 20     |
| maxHeight   | 最大高度 (maxHeight 权重大于 MaxRows, maxHeight = 0 则不考虑该参数) | Number | --     | 0      |
| chart       | 右侧图表内容相关配置。具体看下表                                    | Object | --     | --     |
| calendar    | 右侧图表日历（日期）相关配置。具体看下表                            | Object | --     | --     |
| locale      | i18n（语言包）配置，和 dayjs 的语言包一样；                         | Object | --     | --     |

### options.taskList

左侧列表相关配置

| 参数           | 说明                                     | 类型    | 可选值 | 默认值                                                                                                                         |
| -------------- | ---------------------------------------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| display        | 是否显示左侧任务列表                     | Boolean | --     | true                                                                                                                           |
| widthThreshold | --                                       | Number  | --     | --                                                                                                                             |
| columns        | 任务列表 -- 列配置, 详细配置见下表       | Arrary  | --     | [{<br/> id: 0,<br/>label: 'ID',<br/>value: 'id',<br/>width: 40,<br/>}]                                                         |
| percent        | --                                       | Number  | --     | 100                                                                                                                            |
| minWidth       | 列最小宽度                               | Number  | --     | 18                                                                                                                             |
| expander       | 任务列表 -- 折叠按钮配置，详细配置见下表 | Object  | --     | {<br/> type: 'task-list',<br/> size: 50,<br/> columnWidth: 24,<br/> padding: 16,<br/> margin: 10,<br/> straight: false,<br/> } |

### options.taskList.columns

左侧列表 ，列配置

| 参数     | 说明                                                                                                                                                                                         | 类型    | 可选值 | 默认值 |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------ |
| id       |                                                                                                                                                                                              |         |        |        |
| label    | 显示的标题                                                                                                                                                                                   | String  | --     | --     |
| value    | 对应列内容的字段名                                                                                                                                                                           | String  | --     | --     |
| width    | 列宽度                                                                                                                                                                                       | Number  | --     | 40     |
| html     | 解析为 html                                                                                                                                                                                  | Boolean | --     | false  |
| slot     | 自定义 Vue 插槽, slot 权重大于 html                                                                                                                                                          | String  | --     | --     |
| expander | 是否显示折叠按钮                                                                                                                                                                             | Boolean | --     | false  |
| events   | 事件注册                                                                                                                                                                                     | Object  | --     | --     |
| style    | 列样式 -- [参考](https://github.com/JianGuoHt/gantt-elastic-h/blob/main/src/GanttElastic.standalone.vue#L309) -- [字典](https://github.com/JianGuoHt/gantt-elastic-h/blob/main/src/style.js) | Object  | --     | --     |

### options.taskList.expander

左侧列表，折叠按钮配置

| 参数    | 说明                         | 类型   | 可选值 | 默认值 |
| ------- | ---------------------------- | ------ | ------ | ------ |
| size    | 按钮大小                     | Number | --     | 16     |
| padding | 子节点与父节点之间的缩进距离 | Number | --     | 16     |
| margin  | 整体与左侧的间隔距离         | Number | --     | 10     |

### options.taskMapping

组件需要用到的字段枚举

| 参数      | 说明                 | 类型    | 可选值 | 默认值    |
| --------- | -------------------- | ------- | ------ | --------- |
| id        | 任务 id              | String  | --     | id        |
| start     | 任务开始时间         | date    | --     | start     |
| label     | 任务名称             | String  | --     | label     |
| duration  | 任务持续时间         | date    | --     | duration  |
| progress  | 任务完成进度         | Number  | --     | progress  |
| type      | 任务类型             | String  | --     | type      |
| style     | 任务样式，具体看下表 | Object  | --     | style     |
| collapsed | 是否默认展开         | Boolean | --     | collapsed |

### options.scroll

内容滚动相关配置

| 参数                | 说明           | 类型   | 可选值 | 默认值 |
| ------------------- | -------------- | ------ | ------ | ------ |
| dragXMoveMultiplier | 推拽速度，X 轴 | Number | --     | 3      |
| dragYMoveMultiplier | 推拽速度，Y 轴 | Number | --     | 2      |

### options.scope

右侧图表前后日期范围

| 参数   | 说明         | 类型   | 可选值 | 默认值 |
| ------ | ------------ | ------ | ------ | ------ |
| before | 前置天数间隔 | Number | --     | 1      |
| after  | 后置天数间隔 | Number | --     | 1      |

### options.times

右侧图表时间相关配置

| 参数     | 说明             | 类型   | 可选值 | 默认值 |
| -------- | ---------------- | ------ | ------ | ------ |
| timeZoom | 时间默认缩放层级 | Number | 1~21   | 17     |

### options.row

左侧列表，行配置

| 参数   | 说明   | 类型   | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| height | 行高度 | Number | --     | 24     |

### options.chart

右侧图表内容相关配置

| 参数     | 说明                           | 类型   | 可选值 | 默认值 |
| -------- | ------------------------------ | ------ | ------ | ------ |
| grid     | 网格配置                       | Object | --     | --     |
| text     | 任务条右侧文本配置。具体看下表 | Object | --     | --     |
| expander | 图表左侧折叠按钮配置           | Object | --     | --     |
|          |                                |        |        |        |

### options.chart.text

任务条右侧文本配置

| 参数     | 说明           | 类型    | 可选值 | 默认值 |
| -------- | -------------- | ------- | ------ | ------ |
| offset   | 文本左侧偏移量 | Number  | --     | 4      |
| xPadding | 文本内容内边距 | Number  | --     | 10     |
| display  | 是否显示文本   | Boolean | --     | true   |

### options.chart.expander

图表左侧折叠按钮配置

| 参数    | 说明             | 类型    | 可选值 | 默认值 |
| ------- | ---------------- | ------- | ------ | ------ |
| display | 是否显示折叠按钮 | Boolean | --     | false  |
| offset  | 距离右侧偏移量   | Number  | --     | 12     |
| size    | 按钮大小         | Number  | --     | 18     |

### options.calendar

右侧图表日历（日期）相关配置

| 参数        | 说明                 | 类型   | 可选值                | 默认值          |
| ----------- | -------------------- | ------ | --------------------- | --------------- |
| workingDays | 工作日配置           | Array  | [1, 2, 3, 4, 5, 6, 7] | [1, 2, 3, 4, 5] |
| gap         | 表格与表头之间的间距 | Number | --                    | 6               |
| hour        | 表头时间节点行配置   | Object | --                    | --              |
| day         | 表头日期节点行配置   | Object | --                    | --              |
| month       | 表头月份节点行配置   | Object | --                    | --              |

### options.calendar.hour

表头时间节点行配置

| 参数    | 说明                         | 类型    | 可选值 | 默认值 |
| ------- | ---------------------------- | ------- | ------ | ------ |
| height  | 高度                         | Number  | --     | 20     |
| display | 是否显示时间                 | Boolean | --     | true   |
| format  | 时间显示内容格式。具体看下表 |         |        |        |

### options.calendar.day

表头日期节点行配置

| 参数    | 说明                         | 类型    | 可选值 | 默认值 |
| ------- | ---------------------------- | ------- | ------ | ------ |
| height  | 高度                         | Number  | --     | 20     |
| display | 是否显示时间                 | Boolean | --     | true   |
| format  | 时间显示内容格式。具体看下表 |         |        |        |

### options.calendar.month

表头月份节点行配置

| 参数    | 说明                         | 类型    | 可选值 | 默认值 |
| ------- | ---------------------------- | ------- | ------ | ------ |
| height  | 高度                         | Number  | --     | 20     |
| display | 是否显示时间                 | Boolean | --     | true   |
| format  | 时间显示内容格式。具体看下表 |         |        |        |

#### format

date 为 dayjs 实例

| 参数   | 说明         | 类型           | 可选值 | 默认值 |
| ------ | ------------ | -------------- | ------ | ------ |
| long   | 缩放层级，小 | Function(date) | --     | --     |
| medium | 缩放层级，中 | Function(date) | --     | --     |
| short  | 缩放层级，大 | Function(date) | --     | --     |

### Methods

| 方法名称       | 说明                                                                                                                         | 参数                               |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| updateTask     | 更新任务, 该方法不能更新任务时间，如需更新时间使用 `updateTaskTime`；<br/>taskid： 任务 ID；<br/>data： 修改后的数据；<br /> | Function(taskId, data, props = {}) |
| updateTaskTime | 更新任务时间;<br/>taskid： 任务 ID；<br/>start： 开始时间；<br />end：结束时间                                               | Function(taskId, start, end)       |
| getTask        | 根据任务 id，获取任务数据；                                                                                                  | Function(taskId)                   |
| getChildren    | 根据任务 id，获取当前任务的子任务；                                                                                          | Function(taskId)                   |
| goCurrentTime  | 跳转到当前时间线                                                                                                             | Function()                         |
|                |                                                                                                                              |                                    |

### Events

| 事件名称                | 说明                           | 回调参数                               |
| ----------------------- | ------------------------------ | -------------------------------------- |
| calendar-recalculate    | 当大小发生变化（resize）触发   | --                                     |
| tasks-changed           | 任务数据（tasks）发生变化触发  | tasks                                  |
| options-changed         | 配置项（options）发生变化触发  | options                                |
| dynamic-style-changed   | 样式发生变化触发               | style                                  |
| created                 | created                        | 组件实例                               |
| before-mount            | before-mount                   | 组件实例                               |
| ready                   | ready                          | 组件实例                               |
| mounted                 | mounted                        | 组件实例                               |
| before-update           | before-update                  |                                        |
| updated                 | updated                        |                                        |
| before-destroy          | before-destroy                 |                                        |
| destroyed               | destroyed                      |                                        |
| main-view-mousemove     | 鼠标移动                       | event                                  |
| main-view-mouseup       | 鼠标松开                       | event                                  |
| chart-scroll-horizontal | 水平滚动事件                   | event                                  |
| chart-scroll-vertical   | 垂直滚动事件                   | event                                  |
| chart-wheel             | 鼠标滚轮在元素上下滚动时触发   | event                                  |
| chart-task-click        | 任务条事件，对应 Html Dom 事件 | {...event, data: task}                 |
| chart-task-dblclick     | 同上                           | 同上                                   |
| chart-task-mouseenter   | 同上                           | 同上                                   |
| chart-task-mouseleave   | 同上                           | 同上                                   |
| chart-task-mouseover    | 同上                           | 同上                                   |
| chart-task-mouseout     | 同上                           | 同上                                   |
| chart-task-mousemove    | 同上                           | 同上                                   |
| chart-task-mousedown    | 同上                           | 同上                                   |
| chart-task-mouseup      | 同上                           | 同上                                   |
| chart-task-mousewheel   | 同上                           | 同上                                   |
| chart-task-touchstart   | 同上                           | 同上                                   |
| chart-task-touchmove    | 同上                           | 同上                                   |
| chart-task-touchend     | 同上                           | 同上                                   |
| task-list-click         | 表格行事件，对应 Html Dom 事件 | {...event, data: task, column: column} |
| task-list-dblclick      | 同上                           | 同上                                   |
| task-list-mouseenter    | 同上                           | 同上                                   |
| task-list-mouseover     | 同上                           | 同上                                   |
| task-list-mouseout      | 同上                           | 同上                                   |
| task-list-mousemove     | 同上                           | 同上                                   |
| task-list-mousedown     | 同上                           | 同上                                   |
| task-list-mouseup       | 同上                           | 同上                                   |
| task-list-mousewheel    | 同上                           | 同上                                   |
| task-list-touchstart    | 同上                           | 同上                                   |
| task-list-touchmove     | 同上                           | 同上                                   |
| task-list-touchend      | 同上                           | 同上                                   |
