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
      timerStartTime: Date.now(),
      currentTime: Date.now(),
      timerRunning: this.autoStart,
      elapsed: false
    };
  },
  computed: {
    initialTimeRemaining: function() {
      return getTimeFromMinutes(this.initialValue);
    },
    projectedEndTime: function() {
      const projectedEndTime = new Date(
        new Date(this.timerStartTime).getTime() + this.initialTimeRemaining
      );

      return projectedEndTime;
    },
    timeRemaining: function() {
      // Set the date we're counting down to
      var countDownDate = this.projectedEndTime.getTime();

      // Get today's date and time
      // ..We use the currentTime data value rather than Date.now() because we
      // ..need to trigger an update of this computed value every second.
      var now = this.currentTime;

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      return distance;
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
    initialValue: function() {
      this.timerStartTime = Date.now();

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
          // Update currentTime.
          // This triggers an update of the timerDisplay computed value.
          this.currentTime = Date.now();
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
        this.timerStartTime = Date.now();
        this.elapsed = false;
      }
      this.timerRunning = true;
    },
    onClickStop() {
      this.timerRunning = false;
    },
    onClickReset() {
      this.timerStartTime = Date.now();
      this.timerRunning = false;
    },
    onClickSkip() {
      this.timerStartTime = Date.now();

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
