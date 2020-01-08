<!-- Settings for Pomodoro such as work time, break time, and autostart -->

<template>
  <div>
    <label>Work Time</label>
    <input v-model.number="workTime" type="number" />
    <label>Break Time</label>
    <input v-model.number="breakTime" type="number" />
    <label>Long Break Time</label>
    <input v-model.number="longBreakTime" type="number" />
    <label for="autoStartBreak">Auto Start Break</label>
    <input type="checkbox" id="autoStartBreak" v-model="autoStartBreak" />
    <label for="autoStartNextSession">Auto Start Next Session</label>
    <input
      type="checkbox"
      name="autoStartNextSession"
      id="autoStartNextSession"
      v-model="autoStartNextSession"
    />
  </div>
</template>

<script>
export default {
  name: "PomodoroSettings",
  props: {},
  data() {
    return {
      workTime: 25,
      breakTime: 5,
      longBreakTime: 15,
      autoStartBreak: false,
      autoStartNextSession: false
    };
  },

  components: {}
};
</script>
