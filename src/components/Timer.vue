<!-- A Timer which counts down from a given start time to a 
  given duration -->

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <p>
          <v-progress-circular
            :value="timerProgress"
            size="100"
            rotate="270"
            width="13"
            :color="color"
          >
            <span data-testid="timer-display">{{ timerDisplay }}</span>
          </v-progress-circular>
        </p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn @click="onClickStartStop">
          {{ !timerRunning ? "Start" : "Pause" }}
        </v-btn>
      </v-col>
      <v-col v-if="timerRunning">
        <v-btn v-if="timerRunning" @click="onClickSkip">Skip</v-btn>
      </v-col>
      <v-col v-if="timerRunning">
        <v-btn v-if="timerRunning" @click="onClickReset">Reset</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const TIMER_TICK_TIME = 500;

function getTimeFromMinutes(minutes) {
  return minutes * 60000;
}

export default {
  name: "Timer",
  props: {
    initialValue: {
      // Initial countdown in minutes.
      type: Number,
      default: 0
    },
    autoStart: {
      type: Boolean,
      default: false
    },
    onElapsed: {
      type: Function,
      default: () => {}
    },
    countUpwards: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      tickTimer: "",
      timeRemaining: getTimeFromMinutes(this.initialValue),
      timerRunning: this.autoStart,
      elapsed: false
    };
  },
  computed: {
    initialTimeRemaining: function() {
      return getTimeFromMinutes(this.initialValue);
    },
    timerDisplay: function() {
      let timeValue;

      // Invert value if counting up.
      if (this.countUpwards) {
        const invertedValue = this.initialTimeRemaining - this.timeRemaining;

        timeValue = invertedValue;
      } else {
        timeValue = this.timeRemaining;
      }

      // Get minutes and seconds using "math stuff".
      const minutes = Math.floor((timeValue % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeValue % (1000 * 60)) / 1000);

      // Format display string.
      const minutesString = minutes <= 9 ? "0" + minutes : minutes;
      const secondsString = seconds <= 9 ? "0" + seconds : seconds;

      return `${minutesString}:${secondsString}`;
    },
    timerProgress: function() {
      // Catch divide by zero
      if (!this.initialTimeRemaining) {
        return 0;
      }

      const progressPercentage =
        (this.timeRemaining / this.initialTimeRemaining) * 100;
      // Invert value if counting up.
      if (this.countUpwards) {
        const invertedValue = 100 - progressPercentage;
        return invertedValue;
      } else {
        return progressPercentage;
      }
    }
  },
  watch: {
    initialValue: function(newValue) {
      this.timeRemaining = getTimeFromMinutes(newValue);

      if (this.autoStart) {
        this.timerRunning = true;
      }
    },
    autoStart: function(now, was) {
      if (now == true && was == false) {
        this.timerRunning = true;
      }
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
        this.timeRemaining = this.initialTimeRemaining;
        this.elapsed = false;
      }
      this.timerRunning = true;
    },
    onClickStop() {
      this.timerRunning = false;
    },
    onClickReset() {
      this.timeRemaining = this.initialTimeRemaining;
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
    }
  }
};
</script>
