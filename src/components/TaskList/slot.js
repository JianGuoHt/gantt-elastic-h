export default {
  name: 'taskListSlot',
  functional: true,
  inject: ['root'],

  props: {
    column: {
      type: Object,
      default: null,
    },

    task: {
      type: Object,
      default: null,
    },
  },

  render: (h, ctx) => {
    return h(
      'div',
      {},
      ctx.injections.root.$scopedSlots[ctx.props.column.slot]({
        column: ctx.props.column,
        task: ctx.props.task,
      })
    );
  },
};
