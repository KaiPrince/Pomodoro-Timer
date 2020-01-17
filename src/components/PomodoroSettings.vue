<!-- Settings for Pomodoro such as work time, break time, and autostart -->

<template>
  <div>
    <v-form>
      <v-text-field v-model.number="workTime" label="Work Time" type="number" />
      <v-text-field
        v-model.number="breakTime"
        label="Break Time"
        type="number"
      />
      <v-text-field
        v-model.number="longBreakTime"
        label="Long Break Time"
        type="number"
      />
      <v-checkbox v-model="autoStartBreak" label="Auto Start Break" />
      <v-checkbox
        v-model="autoStartNextSession"
        label="Auto Start Next Session"
      />
    </v-form>
  </div>
</template>

<script>
export default {
  name: "PomodoroSettings",

  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    workTime: {
      get() {
        return this.$store.state.PomodoroSettings.workTime;
      },
      set(value) {
        this.$store.commit("PomodoroSettings/setWorkTime", value);
      }
    },
    breakTime: {
      get() {
        return this.$store.state.PomodoroSettings.breakTime;
      },
      set(value) {
        this.$store.commit("PomodoroSettings/setBreakTime", value);
      }
    },
    longBreakTime: {
      get() {
        return this.$store.state.PomodoroSettings.longBreakTime;
      },
      set(value) {
        this.$store.commit("PomodoroSettings/setLongBreakTime", value);
      }
    },
    autoStartBreak: {
      get() {
        return this.$store.state.PomodoroSettings.autoStartBreak;
      },
      set(value) {
        this.$store.commit("PomodoroSettings/setAutoStartBreak", value);
      }
    },
    autoStartNextSession: {
      get() {
        return this.$store.state.PomodoroSettings.autoStartNextSession;
      },
      set(value) {
        this.$store.commit("PomodoroSettings/setAutoStartNextSession", value);
      }
    }
  }
};
</script>
