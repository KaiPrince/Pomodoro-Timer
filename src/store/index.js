import Vue from "vue";
import Vuex from "vuex";
import PomodoroSettings from "./modules/PomodoroSettings";
import Pomodoro from "./modules/Pomodoro";

Vue.use(Vuex);

export const appStore = {
  modules: {
    // All modules should have namespaced: true
    PomodoroSettings: { namespaced: true, ...PomodoroSettings },
    Pomodoro: { namespaced: true, ...Pomodoro }
  }
};

export default new Vuex.Store(appStore);
