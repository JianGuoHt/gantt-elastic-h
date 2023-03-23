<!--
/**
 * @fileoverview ProgressBar component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */
-->
<template>
  <g
    class="gantt-elastic__chart-row-progress-bar-wrapper"
    :style="{
      ...root.style['chart-row-progress-bar-wrapper'],
      ...task.style['chart-row-progress-bar-wrapper'],
    }"
  >
    <defs>
      <pattern
        id="diagonalHatch"
        :width="root.state.options.chart.progress.width"
        :height="root.state.options.chart.progress.width"
        patternTransform="rotate(45 0 0)"
        patternUnits="userSpaceOnUse"
      >
        <line
          class="chart-row-progress-bar-line"
          :style="{
            ...root.style['chart-row-progress-bar-line'],
            ...task.style['chart-row-progress-bar-line'],
          }"
          x1="0"
          y1="0"
          x2="0"
          :y2="root.state.options.chart.progress.width"
        />
      </pattern>
    </defs>
    <rect
      v-if="root.state.options.chart.progress.bar"
      class="gantt-elastic__chart-row-progress-bar-solid"
      :style="{
        ...root.style['chart-row-progress-bar-solid'],
        ...task.style['chart-row-progress-bar-solid'],
      }"
      x="0"
      y="0"
      :width="getProgressWidth"
    ></rect>
    <g v-if="root.state.options.chart.progress.pattern">
      <rect
        class="gantt-elastic__chart-row-progress-bar-pattern"
        :style="{
          ...root.style['chart-row-progress-bar-pattern'],
          ...task.style['chart-row-progress-bar-pattern'],
        }"
        :x="getProgressWidth"
        y="0"
        :width="100 - task.progress + '%'"
        height="100%"
      ></rect>
      <path
        class="gantt-elastic__chart-row-progress-bar-outline"
        :style="{
          ...root.style['chart-row-progress-bar-outline'],
          ...task.style['base'],
          ...task.style['chart-row-progress-bar-outline'],
          '--stroke-width': getOutlineStyle['stroke-width'],
        }"
        :d="getLinePoints"
        @mousedown.stop="resizerMouseDown"
        @mouseup.stop="resizerMouseup"
      ></path>
    </g>
  </g>
</template>

<script>
export default {
  name: 'ProgressBar',
  inject: ['root'],
  props: ['task'],
  data() {
    return {
      resize: {
        moving: false,
        moveEvent: {
          offsetX: 0,
          clientX: 0,
        },
      },
    };
  },

  computed: {
    /**
     * Get progress width
     *
     * @returns {string}
     */
    getProgressWidth() {
      return this.task.progress + '%';
    },

    /**
     * Get line points
     *
     * @returns {string}
     */
    getLinePoints() {
      const start = (this.task.width / 100) * this.task.progress;
      return `M ${start} 0 L ${start} ${this.task.height}`;
    },

    /**
     * Get solid style
     *
     * @returns {object}
     */
    getSolidStyle() {
      return Object.assign({}, this.root.state.options.chart.progress.styles.bar.solid, this.task.progressBarStyle.bar);
    },

    /**
     * Get line style
     *
     * @returns {object}
     */
    getLineStyle() {
      return Object.assign(
        {},
        {
          stroke: this.root.state.options.row.styles.bar.stroke + 'a0',
          'stroke-width': this.root.state.options.row.styles.bar['stroke-width'] / 2,
        },
        this.task.style
      );
    },

    getOutlineStyle() {
      return Object.assign(
        {},
        this.root.style['chart-row-progress-bar-outline'],
        this.task.style['base'],
        this.task.style['chart-row-progress-bar-outline']
      );
    },
  },

  watch: {
    'resize.moving': {
      handler(n) {
        // 修改鼠标手势
        document.body.style.cursor = n ? 'w-resize' : 'auto';
      },
    },
  },

  created() {
    document.addEventListener('mousemove', this.resizerMouseMove.bind(this));
    document.addEventListener('mouseup', this.resizerMouseup.bind(this));
  },

  beforeDestroy() {
    document.removeEventListener('mouseover', this.resizerMouseMove);
    document.removeEventListener('mouseup', this.resizerMouseup);
  },

  methods: {
    resizerMouseDown(event) {
      if (!this.resize.moving) {
        this.resize.moving = true;
        this.resize.x = event.clientX;
      }
    },

    resizerMouseup(event) {
      this.resize.moving = false;
      const { moveEvent } = this.resize;
      moveEvent.offsetX = 0;
      moveEvent.clientX = 0;
    },

    resizerMouseMove(event) {
      if (this.resize.moving) {
        const { moveEvent } = this.resize;
        if (!moveEvent.offsetX) {
          moveEvent.offsetX = event.offsetX;
          moveEvent.clientX = event.clientX;
        }
        const offsetX = moveEvent.offsetX + (event.clientX - (moveEvent.clientX || event.clientX));
        const width = offsetX - this.task.x;

        let progress = (width / this.task.width) * 100;
        if (progress === 100) return;
        if (progress === 0) return;
        progress = progress >= 100 ? 100 : progress <= 0 ? 0 : progress;
        progress = progress.toFixed(0);
        this.root.updateTask(this.task.id, { progress });
      }
    },
  },
};
</script>

<style>
.gantt-elastic__chart-row-progress-bar-outline:hover {
  cursor: w-resize;
}

.gantt-elastic__chart-row-bar:hover .gantt-elastic__chart-row-progress-bar-outline {
  stroke-width: calc(var(--stroke-width) * 2) !important;
}
</style>
