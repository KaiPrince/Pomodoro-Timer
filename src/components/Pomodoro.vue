<!-- A Pomodoro with Timer, Start/Stop and Reset buttons. -->

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <timer
          :initial-value="countdownInMinutes"
          :on-elapsed="onTimerElapsed"
          :auto-start="autoStartTimer"
          :count-upwards="countUpwardsTimer"
          :color="timerDisplayColor"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn text color="secondary" @click="toggleShowSettings">{{
          !showSettings ? "Show Settings" : "Hide Settings"
        }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col> <PomodoroSettings v-if="showSettings" /> </v-col
    ></v-row>
  </v-container>
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
    return { showSettings: false, firstRun: true };
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
        // Unknown stage
        return 0;
      }
    },
    autoStartTimer() {
      if (this.firstRun) return false;

      if (this.isWorkStage && this.autoStartNextSession) {
        return true;
      } else if (this.isBreakStage && this.autoStartBreak) {
        return true;
      } else if (this.isLongBreakStage && this.autoStartBreak) {
        return true;
      } else {
        return false;
      }
    },
    countUpwardsTimer() {
      if (this.isWorkStage && this.countUpwards) {
        return true;
      } else if (this.isBreakStage && this.countUpwardsBreak) {
        return true;
      } else if (this.isLongBreakStage && this.countUpwardsBreak) {
        return true;
      } else {
        return false;
      }
    },
    timerDisplayColor() {
      if (this.isWorkStage) {
        return "deep-orange";
      } else {
        return "success";
      }
    },
    ...mapGetters("Pomodoro", [
      "isWorkStage",
      "isBreakStage",
      "isLongBreakStage"
    ]),
    // Using mapState to avoid creating empty getters.
    ...mapState("Pomodoro", ["countCycles"]),
    ...mapState("PomodoroSettings", [
      "workTime",
      "breakTime",
      "longBreakTime",
      "autoStartNextSession",
      "autoStartBreak",
      "countUpwards",
      "countUpwardsBreak"
    ])
  },
  created() {
    // Request notification permission
    try {
      Notification.requestPermission();
    } catch (exception) {
      // Do nothing.
    }
  },
  methods: {
    toggleShowSettings() {
      this.showSettings = !this.showSettings;
    },
    onTimerElapsed() {
      if (this.isWorkStage) {
        // Display a notification on the browser
        try {
          if (Notification.permission == "granted") {
            new Notification("Time for a break!");
          }
        } catch (exception) {
          // Do nothing.
        }

        // Set cycles and stage
        if (this.countCycles >= 3) {
          this.resetCycles();
          this.longBreakStage();
        } else {
          this.breakStage();
        }
      } else {
        // Display a notification on the browser
        try {
          if (Notification.permission == "granted") {
            new Notification("Time for work!");
          }
        } catch (exception) {
          // Do nothing.
        }

        // Set cycles and stage
        this.incrementCycles();
        this.workStage();
      }

      this.firstRun = false;
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
