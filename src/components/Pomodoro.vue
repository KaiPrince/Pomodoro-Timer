<!-- A Pomodoro with Timer, Start/Stop and Reset buttons. -->

<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <timer
            :initial-countdown-in-minutes="countdownInMinutes"
            :on-elapsed="onTimerElapsed"
          />
          <br />
          <v-btn @click="toggleShowSettings">Show Settings</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col> <PomodoroSettings v-if="showSettings" /> </v-col
      ></v-row>
    </v-container>
  </div>
</template>

<script>
import Timer from "./Timer";
import PomodoroSettings from "./PomodoroSettings";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "PomodoroTimer",
  components: {
    Timer,
    PomodoroSettings
  },
  props: {},
  data() {
    return { showSettings: false };
  },
  computed: {
    countdownInMinutes() {
      if (this.isWorkStage) {
        return this.workTime;
      } else if (this.isBreakStage) {
        return this.breakTime;
      } else if (this.isLongBreakStage) {
        return this.longBreakTime;
      } else {
        console.error("Unknown stage:", this.$store.state.stage);
        return 0;
      }
    },
    ...mapGetters("Pomodoro", [
      "isWorkStage",
      "isBreakStage",
      "isLongBreakStage"
    ]),
    ...mapState("Pomodoro", ["countCycles"]),
    ...mapState("PomodoroSettings", ["workTime", "breakTime", "longBreakTime"])
  },
  methods: {
    toggleShowSettings() {
      this.showSettings = !this.showSettings;
    },
    onTimerElapsed() {
      this.incrementCycles();
      if (this.isWorkStage) {
        if (this.countCycles >= 3) {
          this.resetCycles();
          this.longBreakStage();
        } else {
          this.breakStage();
        }
      } else if (this.isBreakStage) {
        this.workStage();
      } else if (this.isLongBreakStage) {
        this.workStage();
      } else {
        console.error("Unkown stage:", this.$store.state.stage);
      }
    },
    ...mapActions("Pomodoro", [
      "breakStage",
      "workStage",
      "longBreakStage",
      "incrementCycles",
      "resetCycles"
    ])
  }
};
</script>
