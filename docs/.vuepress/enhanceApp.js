import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default ({ Vue }) => {
  Vue.use(ElementUI);
  Vue.mixin({
    data() {
      return {
        dynamicComponent: '',
      };
    },
    mounted() {
      import('../../demo/GanttElastic.standalone.vue').then((m) => {
        this.dynamicComponent = m.default;
        Vue.component('GanttElastic', m.default);
      });
    },
  });
};
