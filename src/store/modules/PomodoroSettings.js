/// This file contains Vuex logic for the PomodoroSettings component

const initialState = {
  workTime: 25,
  breakTime: 5,
  longBreakTime: 15,
  autoStartBreak: false,
  autoStartNextSession: false,
  countUpwards: false,
  countUpwardsBreak: false
};

const mutations = {
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
  },
  setCountUpwards(state, payload) {
    state.countUpwards = payload;
  },
  setCountUpwardsBreak(state, payload) {
    state.countUpwardsBreak = payload;
  }
};

const actions = {};

const getters = {};

const module = {
  state: initialState,
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default module;
