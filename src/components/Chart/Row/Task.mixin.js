/**
 * @fileoverview Task mixin
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */

export default {
  data() {
    return {
      circleOffset: 5,

      circle: {
        show: false,
        r: 6,
        offset: 7,
      },

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
      const { task, circle } = this;
      return { x: 0 - circle.offset, y: task.height / 2 };
    },

    /**
     * get start circle position
     *
     * @returns {object}
     */
    getEndCircle() {
      const { task, circle } = this;
      return { x: task.width + circle.offset, y: task.height / 2 };
    },

    /**
     * get circle show
     * @returns {boolean}
     */
    getCircleShow() {
      return this.circle.show || this.connectLine.moving;
    },

    /**
     * get circle style
     * @returns {object}
     */
    getCircleStyle() {
      return {
        stroke: 'rgba(0, 119, 192, 1)',
        fill: 'rgba(0, 119, 192, 1)',
        opacity: this.getCircleShow ? '1' : '0',
      };
    },
  },

  mounted() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseup.bind(this));
  },

  beforeDestroy() {
    document.removeEventListener('mouseup', this.onMouseup);
    document.removeEventListener('mousemove', this.onMouseMove);
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

          case 'mouseenter':
            this.setCircleShow();
            eventEmitFun();
            break;

          case 'mouseleave':
            this.setCircleHidden();
            eventEmitFun();
            break;

          default:
            eventEmitFun();
            break;
        }
      }
    },

    // 显示连接线锚点
    setCircleShow() {
      this.circle.show = true;
    },

    // 隐藏连接线锚点
    setCircleHidden() {
      this.circle.show = false;
    },

    // 鼠标按下事件
    onMouseDown(event, params) {
      if (!this.connectLine.moving) {
        this.circle.show = true;
        const task = this.task;
        const { setConnectLine } = this.root.state.connectLine;
        this.circle.show = true;
        this.connectLine.moving = true;
        this.connectLine.x1 = task.x + params.x;
        this.connectLine.y1 = task.y + params.y;
        setConnectLine({ startId: task.id });
      }
    },

    // 鼠标松开事件
    onMouseup(event) {
      if (this.connectLine.moving) {
        const endId = this.getTaskIdByNode(event.target);
        const { getConnectingLine, setConnectLine, delConnectLine } = this.root.state.connectLine;
        setConnectLine({ endId: endId });
        this.root.updateTask(endId, { dependentOn: [getConnectingLine().startId] });
        delConnectLine();
        this.connectLine.moving = false;
      }
    },

    // 鼠标移动事件
    onMouseMove(event) {
      if (this.connectLine.moving) {
        const { setConnectLine } = this.root.state.connectLine;
        const offset = event.offsetX > this.connectLine.x1 ? -2 : 2;
        this.connectLine.x2 = event.offsetX + offset;
        this.connectLine.y2 = event.offsetY + offset;
        setConnectLine(this.connectLine);
      }
    },

    // 递归 获取dom节点上的 taskID
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
