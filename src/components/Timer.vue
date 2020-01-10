<!-- A Timer which counts down from a given start time to a 
  given duration -->

<template>
  <div>
    <p data-testid="timer-display">{{ timerDisplay }}</p>
    <v-btn @click="toggleTimerRunning">
      {{ !timerRunning ? "Start" : "Pause" }}
    </v-btn>
    <v-btn v-if="timerRunning">Skip</v-btn>
    <v-btn v-if="timerRunning" @click="resetTimer">Reset</v-btn>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    initialCountdownInMinutes: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tickTimer: "",
      timeRemaining: 0,
      timerRunning: false
    };
  },
  computed: {
    timerDisplay: function() {
      // Get minutes and seconds using "math stuff".
      const minutes = Math.floor(
        (this.timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((this.timeRemaining % (1000 * 60)) / 1000);

      // Format display string.
      const minutesString = minutes <= 9 ? "0" + minutes : minutes;
      const secondsString = seconds <= 9 ? "0" + seconds : seconds;

      return `${minutesString}:${secondsString}`;
    }
  },
  created() {
    this.tickTimer = this.startTickTimer();
    this.timeRemaining = this.initialCountdownInMinutes * 60000;
  },
  destroyed() {
    this.stopTickTimer();
  },
  methods: {
    startTickTimer() {
      return setInterval(this.updateTimerDisplay, 1000);
    },
    stopTickTimer(timerHandle) {
      return clearInterval(timerHandle);
    },
    updateTimerDisplay() {
      if (this.timerRunning) {
        this.timeRemaining -= 1000;

        // When timer expires, stop timer.
        if (this.timeRemaining <= 1000) {
          this.stopTimer();
        }
      }
    },
    toggleTimerRunning: function() {
      if (!this.timerRunning) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    },
    startTimer() {
      this.timerRunning = true;
    },
    stopTimer() {
      this.timerRunning = false;
    },
    resetTimer() {
      this.timeRemaining = this.initialCountdownInMinutes * 60000;
      this.timerRunning = false;
    }
  }
};
</script>
