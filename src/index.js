import Vue from 'vue';
import GanttElasticStandalone from './GanttElastic.standalone.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(GanttElasticStandalone),
}).$mount('#app');
