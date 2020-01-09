<!-- A Timer which counts down from a given start time to a 
  given duration -->

<template>
  <div>
    <p>{{ timerDisplay }}</p>
    <v-btn v-on:click="toggleTimerRunning">
      {{ !this.timerRunning ? "Start" : "Stop" }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    countdownInMinutes: Number
  },
  data() {
    return {
      tickTimer: "",
      timerStartTime: Date.now(),
      currentDateTime: Date.now(),
      timerRunning: false
    };
  },
  methods: {
    startTickTimer() {
      return setInterval(this.updateTimerDisplay, 500);
    },
    stopTickTimer(timerHandle) {
      return clearInterval(timerHandle);
    },
    updateTimerDisplay() {
      if (this.timerRunning) {
        this.currentDateTime = Date.now();
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
      this.timerStartTime = Date.now();
      this.timerRunning = true;

      this.updateTimerDisplay();
    },
    stopTimer() {
      this.timerRunning = false;
    }
  },
  computed: {
    timerDisplay: function() {
      const projectedEndTime = new Date(
        new Date(this.timerStartTime).getTime() +
          this.countdownInMinutes * 60000
      );

      // Below is a script that I stole from the internet

      // Set the date we're counting down to
      var countDownDate = projectedEndTime.getTime();

      // Get today's date and time
      var now = this.currentDateTime;

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let minutesString = minutes <= 9 ? "0" + minutes : minutes;
      let secondsString = seconds <= 9 ? "0" + seconds : seconds;

      return `${minutesString}:${secondsString} `;
    }
  },
  created() {
    this.timerStartTime = Date.now();
    this.tickTimer = this.startTickTimer();
  },
  destroyed() {
    this.stopTickTimer();
  }
};
</script>
