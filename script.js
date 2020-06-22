new Vue({

  el: '#tasks',

  data: {
      tasks: [{
          text: "Покормить кота",
          completed: false,
          editing: false
      },
      {
        text: "Полить цветы",
        completed: false,
        editing: false
    }
    ],

      newTask: '',

      editingTask: {},

      choice: 'all',

      filters: {
          unDone: function(task) {
              return !task.completed;
          },

          completed: function(task) {
              return task.completed;
          },

          all: function(task) {
              return true;
          }
      }

  },

  computed: {
      completions: function() {
          return this.tasks.filter(this.filters.completed);
      },

      remaining: function() {
          return this.tasks.filter(this.filters.unDone);
      }

  },

  methods: {
      addTask: function() {

          if (!this.newTask) return;

          this.tasks.push({
              text: this.newTask,
              completed: false,
              editing: false
          });

          this.newTask = '';
      },

      editTask: function(task) {
          this.editingTask = task;
          task.editing = true;
      },

      endEditing: function(task) {
          this.editingTask = {};
          if (task.text.trim() === "") {
              this.removeTask(task);
          }
          task.editing = false;

      },

      toggleTaskDone: function(task) {
          task.completed = !task.completed;
      },

      completeAll: function() {
          this.tasks.forEach(function(task) {
              task.completed = true;
          });
      },

      removeTask: function(task) {
          var index = this.tasks.indexOf(task);
          this.tasks.splice(index, 1);
      },

      makeActive: function(status) {
          this.choice = status;
      },

      isActiveTab: function(status) {
          return this.choice === status;
      },

      taskFilter: function() {
          return this.tasks.filter(this.filters[this.choice])
      }


  }

});