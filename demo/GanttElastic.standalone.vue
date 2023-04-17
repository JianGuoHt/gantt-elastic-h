<!--
/**
 * @fileoverview GanttElastic standalone version component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package
 */
-->
<template>
  <div>
    <gantt-elastic ref="elastic" :tasks="tasks" :options="options" :dynamicStyle="dynamicStyle">
      <component v-if="components.header" :is="components.header" slot="header"></component>
      <component v-if="components.footer" :is="components.footer" slot="footer"></component>

      <template slot="label" slot-scope="{ task }">
        <div>{{ task.label }}</div>
      </template>

      <template slot="operation" slot-scope="row">
        <el-button size="mini" @click="onUpdate(row)">修改</el-button>
      </template>
    </gantt-elastic>

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="Description" prop="label">
          <el-input v-model="form.label" placeholder="Description"></el-input>
        </el-form-item>
        <el-form-item label="Assigned to" prop="user">
          <el-input v-model="form.user" placeholder="Assigned to"></el-input>
        </el-form-item>
        <el-form-item label="Start" prop="timeArr">
          <el-date-picker
            v-model="form.timeArr"
            type="daterange"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="progress" prop="progress">
          <el-input-number
            v-model="form.progress"
            controls-position="right"
            :min="0"
            :max="100"
            placeholder="progress"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import GanttElastic from '../src/GanttElastic.vue';

function getDate(hours) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(`${currentYear}-${currentMonth}-${currentDay} 00:00:00`).getTime();
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}

export default {
  name: 'GanttElasticStandalone',
  components: {
    'gantt-elastic': GanttElastic,
  },
  props: ['header', 'footer'],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        label: '',
        user: '',
        progress: '',
        timeArr: [],
      },
      rules: {
        label: [{ required: true, message: '不能为空', trigger: ['blur', 'change'] }],
        user: [{ required: true, message: '不能为空', trigger: ['blur', 'change'] }],
        progress: [{ required: true, message: '不能为空', trigger: ['blur', 'change'] }],
        timeArr: [{ required: true, message: '不能为空', trigger: ['blur', 'change'] }],
      },

      components: {},
      tasks: [
        {
          id: 1,
          label: 'Make some noise',
          user: '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
          start: getDate(-24 * 5),
          duration: 15 * 24 * 60 * 60 * 1000,
          percent: 85,
          type: 'project',
          // collapsed: false,
        },
        {
          id: 2,
          label: 'With great power comes great responsibility',
          user: '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
          parentId: 1,
          start: getDate(-24 * 4),
          duration: 4 * 24 * 60 * 60 * 1000,
          percent: 50,
          type: 'milestone',
          collapsed: true,
          style: {
            base: {
              fill: '#1EBC61',
              stroke: '#0EAC51',
            },
            /*'tree-row-bar': {
              fill: '#1EBC61',
              stroke: '#0EAC51'
            },
            'tree-row-bar-polygon': {
              stroke: '#0EAC51'
            }*/
          },
        },
        {
          id: 3,
          label: 'Courage is being scared to death, but saddling up anyway.',
          user: '<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
          parentId: 2,
          start: getDate(-24 * 3),
          duration: 2 * 24 * 60 * 60 * 1000,
          percent: 100,
          type: 'task',
        },
        {
          id: 4,
          label: 'Put that toy AWAY!',
          user: '<a href="https://www.google.com/search?q=Clark+Kent" target="_blank" style="color:#0077c0;">Clark Kent</a>',
          start: getDate(-24 * 2),
          duration: 2 * 24 * 60 * 60 * 1000,
          percent: 50,
          type: 'task',
        },
        {
          id: 5,
          label: 'One billion, gajillion, fafillion... shabadylu...mil...shabady......uh, Yen.',
          user: '<a href="https://www.google.com/search?q=Austin+Powers" target="_blank" style="color:#0077c0;">Austin Powers</a>',
          parentId: 4,
          start: getDate(0),
          duration: 2 * 24 * 60 * 60 * 1000,
          percent: 10,
          type: 'milestone',
          style: {
            base: {
              fill: '#0287D0',
              stroke: '#0077C0',
            },
          },
        },
        {
          id: 6,
          label: 'Butch Mario and the Luigi Kid',
          user: '<a href="https://www.google.com/search?q=Mario+Bros" target="_blank" style="color:#0077c0;">Mario Bros</a>',
          parentId: 5,
          start: getDate(24),
          duration: 1 * 24 * 60 * 60 * 1000,
          percent: 50,
          type: 'task',
          collapsed: true,
          style: {
            base: {
              fill: '#8E44AD',
              stroke: '#7E349D',
            },
          },
        },
        {
          id: 7,
          label: 'Devon, the old man wanted me, it was his dying request',
          user: '<a href="https://www.google.com/search?q=Knight+Rider" target="_blank" style="color:#0077c0;">Knight Rider</a>',
          parentId: 2,
          dependentOn: [6],
          start: getDate(24 * 2),
          duration: 4 * 60 * 60 * 1000,
          percent: 20,
          type: 'task',
          collapsed: true,
        },
        {
          id: 8,
          label: 'Hey, Baby! Anybody ever tell you I have beautiful eyes?',
          user: '<a href="https://www.google.com/search?q=Johhny+Bravo" target="_blank" style="color:#0077c0;">Johhny Bravo</a>',
          parentId: 7,
          dependentOn: [7],
          start: dayjs().startOf('day').valueOf(),
          end: dayjs().startOf('day').add(1, 'day').valueOf(),
          percent: 0,
          type: 'task',
        },
        {
          id: 9,
          label: 'This better be important, woman. You are interrupting my very delicate calculations.',
          user: '<a href="https://www.google.com/search?q=Dexter\'s+Laboratory" target="_blank" style="color:#0077c0;">Dexter\'s Laboratory</a>',
          parentId: 8,
          dependentOn: [8, 7],
          start: getDate(24 * 4),
          duration: 4 * 60 * 60 * 1000,
          percent: 20,
          type: 'task',
          style: {
            base: {
              fill: '#8E44AD',
              stroke: '#7E349D',
            },
            /*'tree-row-bar-polygon': {
              stroke: '#7E349D'
            },
            'tree-row-bar': {
              fill: '#8E44AD',
              stroke: '#7E349D'
            }*/
          },
        },
        {
          id: 10,
          label: 'current task',
          user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
          start: getDate(24 * 5),
          duration: 24 * 60 * 60 * 1000,
          percent: 0,
          type: 'task',
        },
        {
          id: 11,
          label: 'test task',
          user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
          start: getDate(24 * 6),
          duration: 24 * 60 * 60 * 1000,
          percent: 0,
          type: 'task',
        },
        {
          id: 12,
          label: 'test task',
          user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
          start: getDate(24 * 7),
          duration: 24 * 60 * 60 * 1000,
          percent: 0,
          type: 'task',
          parentId: 11,
        },
        {
          id: 13,
          label: 'test task',
          user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
          start: getDate(24 * 8),
          duration: 24 * 60 * 60 * 1000,
          percent: 0,
          type: 'task',
        },
        {
          id: 14,
          label: 'test task',
          user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
          start: getDate(24 * 9),
          end: getDate(24 * 12),
          percent: 0,
          type: 'task',
        },
        {
          id: 15,
          label: 'test task',
          user: '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
          start: getDate(24 * 16),
          duration: 24 * 60 * 60 * 1000,
          percent: 0,
          type: 'task',
        },
      ],
      options: {
        taskMapping: {
          progress: 'percent',
        },
        // maxRows: 2,
        // maxHeight: 500,
        title: {
          label: 'Your project title as html (link or whatever...)',
          html: false,
        },
        row: {
          height: 24,
        },
        calendar: {
          // hour: {
          //   // display: true,
          //   format: {
          //     short(date) {
          //       return '1';
          //     },
          //   },
          // },
        },
        chart: {
          progress: {
            bar: false,
          },
          expander: {
            display: true,
          },
        },
        taskList: {
          expander: {
            straight: false,
          },
          columns: [
            {
              id: 1,
              label: 'ID',
              value: 'id',
              width: 40,
            },
            {
              id: 2,
              label: 'Description',
              value: 'label',
              width: 200,
              expander: true,
              // html: true,
              slot: 'label',
              events: {
                click({ data, column }) {
                  alert('description clicked!\n' + data.label);
                },
              },
            },
            {
              id: 3,
              label: 'Assigned to',
              value: 'user',
              width: 130,
              html: true,
            },
            {
              id: 3,
              label: 'Start',
              value: (task) => dayjs(task.start).format('YYYY-MM-DD'),
              width: 78,
            },
            {
              id: 4,
              label: 'Type',
              value: 'type',
              width: 68,
            },
            {
              id: 5,
              label: '%',
              value: 'progress',
              width: 70,
              html: true,
              style: {
                'task-list-header-label': {
                  'text-align': 'center',
                  width: '100%',
                },
                'task-list-item-value-container': {
                  'text-align': 'center',
                  width: '100%',
                },
              },
            },
            {
              id: 6,
              label: '操作',
              value: 'operation',
              slot: 'operation',
              width: 80,
              style: {
                'task-list-header-label': {
                  'text-align': 'center',
                  width: '100%',
                },
                'task-list-item-value-container': {
                  'text-align': 'center',
                  width: '100%',
                },
              },
            },
          ],
        },
      },
      dynamicStyle: {},
    };
  },

  methods: {
    onUpdate(row) {
      console.log(row);
      Object.keys(this.form).forEach((item) => {
        if (item === 'timeArr') {
          this.form[item] = [row.task['startTime'], row.task['endTime']];
        } else {
          this.form[item] = row.task[item];
        }
      });
      this.dialogFormVisible = true;
    },

    onSubmit() {
      const elastic = this.$refs.elastic;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const time = this.form.timeArr;
          elastic.updateTask(this.form.id, this.form);
          elastic.updateTaskTime(this.form.id, time[0], time[1]);
          this.dialogFormVisible = false;
          console.log(this.tasks);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
