---
sidebar: auto
---

# 使用文档

## 介绍

### 安装

`npm install gantt-elastic-h --save # yarn add gantt-elastic-h`

## 配置

### props

| 参数         | 说明     | 类型   | 可选值 | 默认值 |
| ------------ | -------- | ------ | ------ | ------ |
| tasks        | 任务列表 | Object | --     | --     |
| options      | 配置项   |        |        |        |
| dynamicStyle | --       | --     | --     | --     |

### tasks

### options

| 参数        | 说明                 | 类型   | 可选值 | 默认值 |
| ----------- | -------------------- | ------ | ------ | ------ |
| taskList    |                      |        |        |        |
| taskMapping | 配置选项，具体看下表 | Object | --     | --     |

### options.taskMapping

| 参数      | 说明                                           | 类型   | 可选值                   | 默认值 |
| --------- | ---------------------------------------------- | ------ | ------------------------ | ------ |
| id        | 任务 id                                        | String | --                       | --     |
| start     | 任务开始时间                                   | date   | --                       | --     |
| label     | 任务名称                                       | String | --                       | --     |
| duration  | 任务持续时间                                   | date   | --                       | --     |
| progress  | 任务完成进度                                   | Number | --                       | --     |
| type      | 任务类型, <span style="color: red">必填</span> | String | milestone, project, task | --     |
| style     | 任务样式，具体看下表                           |        |                          |        |
| collapsed | 是否默认展开                                   |        |                          |        |

### dynamicStyle
