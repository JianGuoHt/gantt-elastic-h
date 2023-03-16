/**
 * @fileoverview Task mixin
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */

export default {
  computed: {
    /**
     * Get view box
     *
     * @returns {string}
     */
    getViewBox() {
      const task = this.task;
      return `0 0 ${task.width} ${task.height}`;
    },

    /**
     * Get group transform
     *
     * @returns {string}
     */
    getGroupTransform() {
      return `translate(${this.task.x} ${this.task.y})`;
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
  methods: {
    /**
     * Emit event
     *
     * @param {string} eventName
     * @param {Event} event
     */
    emitEvent(eventName, event) {
      if (!this.root.state.options.scroll.scrolling) {
        const eventObj = {
          event,
          data: this.task,
        };

        const eventEmitFun = () => {
          this.root.$emit(`chart-${eventName}`, eventObj);
          this.root.$emit(`chart-${this.task.type}-${eventName}`, eventObj);
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
      }
    },
  },
};
