<!-- This is the view for the Pomodoro Component -->

<template>
  <v-container class="fill-height">
    <v-row
      ><v-col>
        <v-row justify="center" align="center"> <Pomodoro /></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Pomodoro from "@/components/Pomodoro.vue";
export default {
  name: "PomodoroView",
  components: {
    Pomodoro
  }
};
</script>

<style lang="scss" scoped></style>
