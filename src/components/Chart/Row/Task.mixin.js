/**
 * @fileoverview Task mixin
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */

export default {
  data() {
    return {
      circleShow: false,

      connectLine: {
        moving: false,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
    };
  },
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

    /**
     * get start circle position
     *
     * @returns {object}
     */
    getStartCircle() {
      const task = this.task;
      return { x: 0, y: task.height / 2 };
    },

    /**
     * get start circle position
     *
     * @returns {object}
     */
    getEndCircle() {
      const task = this.task;
      return { x: task.width, y: task.height / 2 };
    },
  },

  mounted() {
    document.addEventListener('mousemove', this.resizerMouseMove.bind(this));
    document.addEventListener('mouseup', this.resizerMouseup.bind(this));
  },

  beforeDestroy() {
    document.removeEventListener('mouseup', this.resizerMouseup);
    document.removeEventListener('mousemove', this.resizerMouseMove);
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

    onChartBarWrapperMouseenter() {
      this.circleShow = true;
    },

    onChartBarWrapperMouseleave() {
      this.circleShow = false;
    },

    resizerMouseDown(event, params, offset) {
      if (!this.connectLine.moving) {
        this.circleShow = true;
        const task = this.task;
        const { setConnectLine } = this.root.state.connectLine;
        this.circleShow = true;
        this.connectLine.moving = true;
        this.connectLine.x1 = task.x + params.x + offset;
        this.connectLine.y1 = task.y + params.y;
        setConnectLine({ startId: task.id });
      }
    },

    resizerMouseup(event) {
      if (this.connectLine.moving) {
        const endId = this.getTaskIdByNode(event.target);
        const { getConnectingLine, setConnectLine, delConnectLine } = this.root.state.connectLine;
        setConnectLine({ endId: endId });
        this.root.updateTask(endId, { dependentOn: [getConnectingLine().startId] });
        delConnectLine();
        this.connectLine.moving = false;
      }
    },

    resizerMouseMove(event) {
      if (this.connectLine.moving) {
        const { setConnectLine } = this.root.state.connectLine;
        const offset = event.offsetX > this.connectLine.x1 ? -2 : 2;
        this.connectLine.x2 = event.offsetX + offset;
        this.connectLine.y2 = event.offsetY + offset;
        setConnectLine(this.connectLine);
      }
    },

    getTaskIdByNode(node) {
      const pNode = node.parentNode;
      if (pNode && pNode.dataset) {
        const { taskid } = pNode.dataset;
        if (taskid) {
          return taskid;
        } else {
          return this.getTaskIdByNode(pNode);
        }
      }
    },
  },
};
