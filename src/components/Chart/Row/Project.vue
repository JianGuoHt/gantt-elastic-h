<!--
/**
 * @fileoverview Project component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */
-->
<template>
  <g
    class="gantt-elastic__chart-row-bar-wrapper gantt-elastic__chart-row-project-wrapper"
    :style="{
      ...root.style['chart-row-bar-wrapper'],
      ...root.style['chart-row-project-wrapper'],
      ...task.style['chart-row-bar-wrapper'],
    }"
  >
    <foreignObject
      class="gantt-elastic__chart-expander gantt-elastic__chart-expander--project"
      :style="{
        ...root.style['chart-expander'],
        ...root.style['chart-expander--project'],
        ...task.style['chart-expander'],
      }"
      :x="task.x - root.state.options.chart.expander.offset - root.state.options.chart.expander.size"
      :y="task.y + (root.state.options.row.height - root.state.options.chart.expander.size) / 2"
      :width="root.state.options.chart.expander.size"
      :height="root.state.options.chart.expander.size"
      v-if="displayExpander"
    >
      <expander :tasks="[task]" :options="root.state.options.chart.expander" type="chart"></expander>
    </foreignObject>

    <chart-text :task="task" v-if="root.state.options.chart.text.display"></chart-text>

    <svg
      class="gantt-elastic__chart-row-bar gantt-elastic__chart-row-project"
      :style="{
        ...root.style['chart-row-bar'],
        ...root.style['chart-row-project'],
        ...task.style['chart-row-bar'],
      }"
      :x="task.x"
      :y="task.y"
      :width="task.width"
      :height="task.height"
      :viewBox="`0 0 ${task.width} ${task.height}`"
      @click="emitEvent('click', $event)"
      @dblclick="emitEvent('dblclick', $event)"
      @mouseenter="emitEvent('mouseenter', $event)"
      @mouseleave="emitEvent('mouseleave', $event)"
      @mouseover="emitEvent('mouseover', $event)"
      @mouseout="emitEvent('mouseout', $event)"
      @mousemove="emitEvent('mousemove', $event)"
      @mousedown="emitEvent('mousedown', $event)"
      @mouseup="emitEvent('mouseup', $event)"
      @mousewheel="emitEvent('mousewheel', $event)"
      @touchstart="emitEvent('touchstart', $event)"
      @touchmove="emitEvent('touchmove', $event)"
      @touchend="emitEvent('touchend', $event)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath :id="clipPathId">
          <path :d="getPoints"></path>
        </clipPath>
      </defs>
      <path
        class="gantt-elastic__chart-row-bar-polygon gantt-elastic__chart-row-project-polygon"
        :style="{
          ...root.style['chart-row-bar-polygon'],
          ...root.style['chart-row-project-polygon'],
          ...task.style['base'],
          ...task.style['chart-row-bar-polygon'],
        }"
        :d="getPoints"
      ></path>

      <circle
        class="gantt-elastic__chart-row-bar-circle"
        :cx="getStartCircle.x"
        :cy="getStartCircle.y"
        :r="circle.r"
        :style="getCircleStyle"
        @mousedown.stop="onMouseDown($event, getStartCircle)"
      ></circle>

      <circle
        class="gantt-elastic__chart-row-bar-circle"
        :cx="getEndCircle.x"
        :cy="getEndCircle.y"
        :r="circle.r"
        :style="getCircleStyle"
        @mousedown.stop="onMouseDown($event, getEndCircle)"
      ></circle>

      <progress-bar :task="task" :clip-path="'url(#' + clipPathId + ')'"></progress-bar>
    </svg>
  </g>
</template>

<script>
import ChartText from '../Text.vue';
import ProgressBar from '../ProgressBar.vue';
import Expander from '../../Expander.vue';
import taskMixin from './Task.mixin.js';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Project',
  components: {
    ChartText,
    ProgressBar,
    Expander,
  },
  inject: ['root'],
  props: ['task'],
  mixins: [taskMixin],
  data() {
    return {};
  },
  computed: {
    /**
     * Get clip path id
     *
     * @returns {string}
     */
    clipPathId() {
      return 'gantt-elastic__project-clip-path-' + this.task.id;
    },

    /**
     * Get points
     *
     * @returns {string}
     */
    getPoints() {
      const task = this.task;
      const bottom = task.height - task.height / 4;
      const corner = task.height / 6;
      const smallCorner = task.height / 8;
      return `M ${smallCorner},0
                L ${task.width - smallCorner} 0
                L ${task.width} ${smallCorner}
                L ${task.width} ${bottom}
                L ${task.width - corner} ${task.height}
                L ${task.width - corner * 2} ${bottom}
                L ${corner * 2} ${bottom}
                L ${corner} ${task.height}
                L 0 ${bottom}
                L 0 ${smallCorner}
                Z
        `;
    },

    /**
     * Should we display expander?
     *
     * @returns {boolean}
     */
    displayExpander() {
      const expander = this.root.state.options.chart.expander;
      return expander.display || (expander.displayIfTaskListHidden && !this.root.state.options.taskList.display);
    },
  },
};
</script>
