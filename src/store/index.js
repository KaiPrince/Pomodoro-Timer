import Vue from "vue";
import Vuex from "vuex";
import {
  initialState as PomodoroSettingsState,
  mutations as PomodoroSettingsMutations,
  actions as PomodoroSettingsActions,
  getters as PomodoroSettingsGetters
} from "./PomodoroSettings";
import {
  initialState as PomodoroState,
  mutations as PomodoroMutations,
  actions as PomodoroActions,
  getters as PomodoroGetters
} from "./Pomodoro";

Vue.use(Vuex);

export const appStore = {
  state: { ...PomodoroSettingsState, ...PomodoroState },
  mutations: { ...PomodoroSettingsMutations, ...PomodoroMutations },
  actions: { ...PomodoroSettingsActions, ...PomodoroActions },
  getters: { ...PomodoroSettingsGetters, ...PomodoroGetters },
  modules: {}
};

export default new Vuex.Store(appStore);
