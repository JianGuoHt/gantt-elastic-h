<!--
/**
 * @fileoverview Chart component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */
-->
<template>
  <div class="gantt-elastic__chart" :style="{ ...root.style['chart'] }" ref="chart">
    <div
      class="gantt-elastic__chart-calendar-container"
      ref="chartCalendarContainer"
      :style="{
        ...root.style['chart-calendar-container'],
        height: root.state.options.calendar.height + 'px',
        'margin-bottom': root.state.options.calendar.gap + 'px',
      }"
    >
      <calendar></calendar>
    </div>
    <div
      class="gantt-elastic__chart-graph-container"
      ref="chartGraphContainer"
      :style="{
        ...root.style['chart-graph-container'],
        height: root.state.options.height - root.state.options.calendar.height + 'px',
      }"
    >
      <div
        :style="{
          ...root.style['chart-area'],
          width: root.state.options.width + 'px',
          height: root.state.options.rowsHeight + 'px',
        }"
      >
        <div
          class="gantt-elastic__chart-graph"
          ref="chartGraph"
          :style="{ ...root.style['chart-graph'], height: '100%' }"
        >
          <svg
            class="gantt-elastic__chart-graph-svg"
            :style="{ ...root.style['chart-graph-svg'] }"
            ref="chartGraphSvg"
            x="0"
            y="0"
            :width="root.state.options.width + 'px'"
            :height="root.state.options.allVisibleTasksHeight + 'px'"
            xmlns="http://www.w3.org/2000/svg"
          >
            <days-highlight></days-highlight>
            <grid></grid>
            <dependency-lines :tasks="root.visibleTasks"></dependency-lines>

            <g
              class="gantt-elastic__chart-row-wrapper"
              :style="{ ...root.style['chart-row-wrapper'] }"
              v-for="task in root.visibleTasks"
              :task="task"
              :key="task.id"
              :data-taskid="task.id"
            >
              <component :task="task" :is="task.type"></component>
            </g>

            <!-- 拖拽连接线 -->
            <line
              v-show="connectingLine.show"
              v-bind="getContLine"
              style="stroke: rgba(0, 119, 192, 0.5); stroke-width: 4"
            ></line>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from './Grid.vue';
import DaysHighlight from './DaysHighlight.vue';
import Calendar from '../Calendar/Calendar.vue';
import DependencyLines from './DependencyLines.vue';
import Task from './Row/Task.vue';
import Milestone from './Row/Milestone.vue';
import Project from './Row/Project.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Chart',
  components: {
    Grid,
    DependencyLines,
    Calendar,
    Task,
    Milestone,
    Project,
    DaysHighlight,
  },
  inject: ['root'],
  data() {
    return {
      moving: false,

      connectingLine: {
        show: false,
        startId: '',
        endId: '',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
    };
  },
  /**
   * Mounted
   */
  mounted() {
    // document.addEventListener('mousemove', this.resizerMouseMove.bind(this));
    // document.addEventListener('mouseup', this.resizerMouseup.bind(this), true);

    this.root.state.refs.chart = this.$refs.chart;
    this.root.state.refs.chartCalendarContainer = this.$refs.chartCalendarContainer;
    this.root.state.refs.chartGraphContainer = this.$refs.chartGraphContainer;
    this.root.state.refs.chartGraph = this.$refs.chartGraph;
    this.root.state.refs.chartGraphSvg = this.$refs.chartGraphSvg;

    this.root.state.connectLine = {
      setConnectLine: this.setConnectLine,
      getConnectingLine: this.getConnectingLine,
      delConnectLine: this.delConnectLine,
    };
    // this.root.state.setConnectLine = this.setConnectLine;
    // this.root.state.getConnectingLine = this.getConnectingLine;
  },

  beforeDestroy() {
    // document.removeEventListener('mouseup', this.resizerMouseup);
    // document.removeEventListener('mousemove', this.resizerMouseMove);
  },

  computed: {
    /**
     * Get view box
     *
     * @returns {string}
     */
    getViewBox() {
      return `0 0 ${this.root.state.options.width} ${this.root.state.options.allVisibleTasksHeight}`;
    },

    getContLine() {
      const { x1, y1, x2, y2 } = this.connectingLine;
      return { x1, y1, x2, y2 };
    },
  },

  methods: {
    setConnectLine(params) {
      this.connectingLine.show = true;
      Object.keys(params).forEach((key) => {
        this.$set(this.connectingLine, key, params[key]);
      });
    },

    delConnectLine() {
      this.connectingLine.show = false;

      this.connectingLine = Object.assign(this.connectingLine, {
        startId: '',
        endId: '',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      });
    },

    getConnectingLine() {
      return this.connectingLine;
    },
  },
};
</script>

<style lang="scss">
.gantt-elastic__chart-row-bar-wrapper {
  .gantt-elastic__chart-row-bar {
    overflow: visible;
  }

  .gantt-elastic__chart-row-bar-circle {
    cursor: pointer;
  }

  // &:hover .gantt-elastic__chart-row-bar-circle {
  //   display: inline !important;
  // }
}
</style>
