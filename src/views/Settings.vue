<!-- This is the view for the PomodoroSettings Component -->

<template>
  <v-container class="fill-height">
    <v-row
      ><v-col>
        <v-row justify="center" align="center"> <PomodoroSettings /></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PomodoroSettings from "@/components/PomodoroSettings.vue";
export default {
  name: "PomodoroView",
  components: {
    PomodoroSettings
  }
};
</script>

<style lang="scss" scoped></style>
