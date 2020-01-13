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
        return this.$store.state.workTime;
      },
      set(value) {
        this.$store.commit("setWorkTime", value);
      }
    },
    breakTime: {
      get() {
        return this.$store.state.breakTime;
      },
      set(value) {
        this.$store.commit("setBreakTime", value);
      }
    },
    longBreakTime: {
      get() {
        return this.$store.state.longBreakTime;
      },
      set(value) {
        this.$store.commit("setLongBreakTime", value);
      }
    },
    autoStartBreak: {
      get() {
        return this.$store.state.autoStartBreak;
      },
      set(value) {
        this.$store.commit("setAutoStartBreak", value);
      }
    },
    autoStartNextSession: {
      get() {
        return this.$store.state.autoStartNextSession;
      },
      set(value) {
        this.$store.commit("setAutoStartNextSession", value);
      }
    }
  }
};
</script>
