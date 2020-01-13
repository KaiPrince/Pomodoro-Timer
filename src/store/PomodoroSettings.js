/// This file contains Vuex logic for the PomodoroSettings component

export const initialState = {
  workTime: 25,
  breakTime: 5,
  longBreakTime: 15,
  autoStartBreak: true,
  autoStartNextSession: true
};

export const mutations = {
  setWorkTime(state, payload) {
    state.workTime = payload;
  },
  setBreakTime(state, payload) {
    state.breakTime = payload;
  },
  setLongBreakTime(state, payload) {
    state.longBreakTime = payload;
  },
  setAutoStartBreak(state, payload) {
    state.autoStartBreak = payload;
  },
  setAutoStartNextSession(state, payload) {
    state.autoStartNextSession = payload;
  }
};

export const actions = {};

export const getters = {};
