<!--
/**
 * @fileoverview ItemColumn component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */
-->
<template>
  <div class="gantt-elastic__task-list-item-column" :style="itemColumnStyle">
    <div
      class="gantt-elastic__task-list-item-value-wrapper"
      :style="wrapperStyle"
      @click="emitEvent('click', $event)"
      @dblclick="emitEvent('dblclick', $event)"
      @mouseenter="emitEvent('mouseenter', $event)"
      @mouseover="emitEvent('mouseover', $event)"
      @mouseout="emitEvent('mouseout', $event)"
      @mousemove="emitEvent('mousemove', $event)"
      @mousedown="emitEvent('mousedown', $event)"
      @mouseup="emitEvent('mouseup', $event)"
      @mousewheel="emitEvent('mousewheel', $event)"
      @touchstart="emitEvent('touchstart', $event)"
      @touchmove="emitEvent('touchmove', $event)"
      @touchend="emitEvent('touchend', $event)"
    >
      <slot></slot>
      <div class="gantt-elastic__task-list-item-value-container" :style="containerStyle">
        <div v-if="!html" class="gantt-elastic__task-list-item-value" :style="valueStyle">
          {{ value }}
        </div>
        <div v-else class="gantt-elastic__task-list-item-value" :style="valueStyle" v-html="value"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemColumn',
  inject: ['root'],
  props: ['column', 'task'],
  data() {
    return {};
  },
  methods: {
    /**
     * Emit event
     *
     * @param {String} eventName
     * @param {Event} event
     */
    emitEvent(eventName, event) {
      if (eventName.includes('click')) {
        console.log('==column.eventName==', eventName);
      }
      if (typeof this.column.events !== 'undefined' && typeof this.column.events[eventName] === 'function') {
        this.column.events[eventName]({
          event,
          data: this.task,
          column: this.column,
        });
      }

      /**
       * 改动：
       * 新增无任务类型的基础事件
       */

      const eventObj = {
        event,
        data: this.task,
        column: this.column,
      };

      const eventEmitFun = () => {
        this.root.$emit(`taskList-${eventName}`, eventObj);
        this.root.$emit(`taskList-${this.task.type}-${eventName}`, eventObj);
      };

      switch (eventName) {
        // 消除单机事件和双击事件同时使用带来的副作用
        case 'click':
        case 'dblclick':
          clearTimeout(this._eventTriggerTime);
          this._eventTriggerTime = setTimeout(() => {
            eventEmitFun();
          }, 300);

          if (eventName === 'dblclick') {
            clearTimeout(this._eventTriggerTime);
            eventEmitFun();
          }
          break;
        default:
          eventEmitFun();
          break;
      }
    },
  },
  computed: {
    /**
     * Should we display html or just text?
     *
     * @returns {boolean}
     */
    html() {
      if (typeof this.column.html !== 'undefined' && this.column.html === true) {
        return true;
      }
      return false;
    },

    /**
     * Get column value
     *
     * @returns {any|string}
     */
    value() {
      if (typeof this.column.value === 'function') {
        return this.column.value(this.task);
      }
      return this.task[this.column.value];
    },

    itemColumnStyle() {
      return {
        ...this.root.style['task-list-item-column'],
        ...this.column.style['task-list-item-column'],
        width: this.column.finalWidth + 'px',
        height: this.column.height + 'px',
      };
    },

    wrapperStyle() {
      return {
        ...this.root.style['task-list-item-value-wrapper'],
        ...this.column.style['task-list-item-value-wrapper'],
      };
    },

    containerStyle() {
      return {
        ...this.root.style['task-list-item-value-container'],
        ...this.column.style['task-list-item-value-container'],
      };
    },

    valueStyle() {
      return {
        ...this.root.style['task-list-item-value'],
        ...this.column.style['task-list-item-value'],
      };
    },
  },
};
</script>
