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
    <input id="autoStartBreak" v-model="autoStartBreak" type="checkbox" />
    <label for="autoStartNextSession">Auto Start Next Session</label>
    <input
      id="autoStartNextSession"
      v-model="autoStartNextSession"
      type="checkbox"
      name="autoStartNextSession"
    />
  </div>
</template>

<script>
export default {
  name: "PomodoroSettings",

  components: {},
  props: {},
  data() {
    return {
      workTime: 25,
      breakTime: 5,
      longBreakTime: 15,
      autoStartBreak: false,
      autoStartNextSession: false
    };
  }
};
</script>
