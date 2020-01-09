<!-- A Pomodoro with Timer, Start/Stop and Reset buttons. -->

<template>
  <div>
    <timer v-bind:countdownInMinutes="countdownInMinutes" />
    <br />
    <v-btn @click="toggleShowSettings">Show Settings</v-btn>
    <PomodoroSettings v-if="showSettings" />
  </div>
</template>

<script>
import Timer from "./Timer";
import PomodoroSettings from "./PomodoroSettings";

export default {
  name: "PomodoroTimer",
  props: {},
  data() {
    return { countdownInMinutes: 25, showSettings: false };
  },
  methods: {
    toggleShowSettings() {
      this.showSettings = !this.showSettings;
    }
  },
  components: {
    Timer,
    PomodoroSettings
  }
};
</script>
