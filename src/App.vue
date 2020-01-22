<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-toolbar-title>Pomodoro</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
