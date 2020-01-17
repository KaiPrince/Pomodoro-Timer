/// This file contains Vuex logic for the Pomodoro component

export const constants = {
  WORK_STAGE: "WORK_STAGE",
  BREAK_STAGE: "BREAK_STAGE",
  LONG_BREAK_STAGE: "LONG_BREAK_STAGE"
};

const initialState = { stage: constants.WORK_STAGE, countCycles: 0 };

const mutations = {
  changeStage(state, payload) {
    state.stage = payload;
  },
  changeCycles(state, payload) {
    state.countCycles = payload;
  }
};

const actions = {
  workStage(context) {
    context.commit("changeStage", constants.WORK_STAGE);
  },
  breakStage(context) {
    context.commit("changeStage", constants.BREAK_STAGE);
  },
  longBreakStage(context) {
    context.commit("changeStage", constants.LONG_BREAK_STAGE);
  },
  incrementCycles({ commit, state }) {
    commit("changeCycles", state.countCycles + 1);
  },
  resetCycles({ commit }) {
    commit("changeCycles", 0);
  }
};

const getters = {
  isWorkStage: state => state.stage === constants.WORK_STAGE,
  isBreakStage: state => state.stage === constants.BREAK_STAGE,
  isLongBreakStage: state => state.stage === constants.LONG_BREAK_STAGE
};

const module = {
  state: initialState,
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default module;
