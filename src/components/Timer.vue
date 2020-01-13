<!-- A Timer which counts down from a given start time to a 
  given duration -->

<template>
  <div>
    <p data-testid="timer-display">{{ timerDisplay }}</p>
    <v-btn @click="onClickStartStop">
      {{ !timerRunning ? "Start" : "Pause" }}
    </v-btn>
    <v-btn v-if="timerRunning" @click="onClickSkip">Skip</v-btn>
    <v-btn v-if="timerRunning" @click="onClickReset">Reset</v-btn>
  </div>
</template>

<script>
const TIMER_TICK_TIME = 500;

function getTimeFromMinutes(minutes) {
  return minutes * 60000;
}

export default {
  name: "Timer",
  props: {
    initialCountdownInMinutes: {
      type: Number,
      default: 0
    },
    onElapsed: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      tickTimer: "",
      timeRemaining: getTimeFromMinutes(this.initialCountdownInMinutes),
      timerRunning: false,
      elapsed: false
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
  watch: {
    initialCountdownInMinutes: function(newValue) {
      this.timeRemaining = getTimeFromMinutes(newValue);
    }
  },
  created() {
    // Start a ticker for triggering updates.
    this.startTickTimer();
  },
  destroyed() {
    // Clear ticker.
    this.clearTickTimer();
  },
  methods: {
    startTickTimer() {
      this.tickTimer = setInterval(this.updateTimeRemaining, TIMER_TICK_TIME);
    },
    clearTickTimer() {
      clearInterval(this.tickTimer);
    },
    updateTimeRemaining() {
      if (this.timerRunning) {
        if (this.timeRemaining > TIMER_TICK_TIME) {
          // Decrement timer.
          this.timeRemaining -= TIMER_TICK_TIME;
        } else {
          // Trigger when timer expires.
          this.timerElapsed();
        }
      } else {
        // Do nothing if timer is not running.
      }
    },
    onClickStartStop: function() {
      if (!this.timerRunning) {
        this.onClickStart();
      } else {
        this.onClickStop();
      }
    },
    onClickStart() {
      if (this.elapsed) {
        this.setTimerToInitialValue();
        this.elapsed = false;
      }
      this.timerRunning = true;
    },
    onClickStop() {
      this.timerRunning = false;
    },
    onClickReset() {
      this.setTimerToInitialValue();
      this.timerRunning = false;
    },
    onClickSkip() {
      this.timeRemaining = 0;

      this.timerElapsed();
    },
    timerElapsed() {
      // When timer expires, stop timer.
      this.elapsed = true;
      this.timerRunning = false;

      // Trigger onElapsed Callback
      this.onElapsed();
    },
    setTimerToInitialValue() {
      this.timeRemaining = getTimeFromMinutes(this.initialCountdownInMinutes);
    }
  }
};
</script>
