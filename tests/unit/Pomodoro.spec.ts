/// This file contains unit tests for the Pomodoro component
// @ts-nocheck

import PomodoroComponent from "@/components/Pomodoro.vue";
import { fireEvent, wait } from "@testing-library/vue";
import { expect } from "chai";
import Vue from "vue";
import PomodoroModuleInitial, {
  constants
} from "../../src/store/modules/Pomodoro";
import PomodoroSettingsModuleInitial from "../../src/store/modules/PomodoroSettings";
import { renderComponent, sleep } from "../_utils";

describe("Pomodoro", function() {
  let createInitialState;
  let state;
  let renderPomodoroComponent;

  beforeEach(() => {
    // This is for test isolation.
    createInitialState = (pomodoroState = {}, pomodoroSettingsState = {}) => ({
      Pomodoro: {
        namespaced: true,
        ...PomodoroModuleInitial,
        state: {
          ...PomodoroModuleInitial.state,
          ...pomodoroState
        }
      },
      PomodoroSettings: {
        namespaced: true,
        ...PomodoroSettingsModuleInitial,
        state: {
          ...PomodoroSettingsModuleInitial.state,
          ...pomodoroSettingsState
        }
      }
    });

    state = createInitialState(
      { stage: constants.WORK_STAGE },
      { workTime: 30, breakTime: 5, longBreakTime: 15 }
    );

    renderPomodoroComponent = function(customState = state) {
      return renderComponent(PomodoroComponent, {
        ...customState
      });
    };
  });
  it("Advances to break stage after a work stage", async function() {
    // Arrange
    const { getByTestId, getByText } = renderPomodoroComponent();

    const startButton = getByText(/Start/i).closest("button");
    fireEvent.click(startButton);

    await Vue.nextTick();

    const timerDisplay = getByTestId("timer-display");

    const skipButton = getByText(/Skip/i).closest("button");

    // Act
    fireEvent.click(skipButton);
    await Vue.nextTick();

    // Assert
    const timerDisplayValue = timerDisplay.innerHTML;
    expect(timerDisplayValue).to.equal("05:00");
  });

  it("Advances to work stage after a break stage", async function() {
    // Arrange
    const { getByTestId, getByText } = renderPomodoroComponent(
      createInitialState(
        {
          stage: constants.BREAK_STAGE
        },
        { workTime: 30, breakTime: 5, longBreakTime: 15 }
      )
    );

    const startButton = getByText(/Start/i).closest("button");
    fireEvent.click(startButton);

    await Vue.nextTick();

    const timerDisplay = getByTestId("timer-display");

    const skipButton = getByText(/Skip/i).closest("button");

    // Act
    fireEvent.click(skipButton);
    await Vue.nextTick();

    // Assert
    const timerDisplayValue = timerDisplay.innerHTML;
    expect(timerDisplayValue).to.equal("30:00");
  });

  it("Advances to long break stage after 3 work stages", async function() {
    // Arrange
    const { getByTestId, getByText } = renderPomodoroComponent();

    const timerDisplay = getByTestId("timer-display");

    const clickStartAndSkip = async function() {
      const startButton = getByText(/Start/i).closest("button");

      //..Click start
      fireEvent.click(startButton);
      await Vue.nextTick();

      const skipButton = getByText(/Skip/i).closest("button");

      //..Click skip
      fireEvent.click(skipButton);
      await Vue.nextTick();
    };

    const skipOneCycle = async function() {
      //..Work Stage
      await clickStartAndSkip();
      //..Break Stage
      await clickStartAndSkip();
    };

    // Act
    //..After 3 Work/Break cycles
    await skipOneCycle();
    await skipOneCycle();
    await skipOneCycle();
    //..Skip a Work Stage
    await clickStartAndSkip();

    // Assert
    const timerDisplayValue = timerDisplay.innerHTML;

    //..Should be long break
    expect(timerDisplayValue).to.equal("15:00");
  });

  // This test is broken
  it("Autostarts the next session", async function() {
    // Arrange
    const { getByTestId, getByText } = renderPomodoroComponent(
      createInitialState(
        {
          stage: constants.WORK_STAGE
        },
        {
          workTime: 30,
          breakTime: 5,
          longBreakTime: 15,
          autoStartNextSession: true
        }
      )
    );
    const clickStartAndSkip = async function() {
      const startButton = getByText(/Start/i).closest("button");

      //..Click start
      await fireEvent.click(startButton);
      await Vue.nextTick();

      const skipButton = getByText(/Skip/i).closest("button");

      //..Click skip
      await fireEvent.click(skipButton);
      await Vue.nextTick();
    };

    const skipOneCycle = async function() {
      //..Work Stage
      await clickStartAndSkip();
      //..Break Stage
      await clickStartAndSkip();
    };

    // Act
    await skipOneCycle();

    await sleep(1001);

    // Assert

    const timerDisplay = getByTestId("timer-display");
    const timerDisplayValue = timerDisplay.innerHTML;
    expect(timerDisplayValue).to.equal("29:59");
  });

  it("Autostarts the break", async function() {
    // Arrange
    const { getByTestId, getByText } = renderPomodoroComponent(
      createInitialState(
        {
          stage: constants.WORK_STAGE
        },
        {
          workTime: 30,
          breakTime: 5,
          longBreakTime: 15,
          autoStartBreak: true
        }
      )
    );
    const clickStartAndSkip = async function() {
      const startButton = getByText(/Start/i).closest("button");

      //..Click start
      await fireEvent.click(startButton);
      await Vue.nextTick();

      const skipButton = getByText(/Skip/i).closest("button");

      //..Click skip
      await fireEvent.click(skipButton);
      await Vue.nextTick();
    };

    // Act
    //..Work Stage
    await clickStartAndSkip();

    await sleep(1001);

    // Assert
    //..Break Stage
    const timerDisplay = getByTestId("timer-display");
    const timerDisplayValue = timerDisplay.innerHTML;
    expect(timerDisplayValue).to.equal("04:59");
  });

  it("Counts up", async function() {
    // Arrange
    const { getByTestId, getByText } = renderPomodoroComponent(
      createInitialState(
        {
          stage: constants.WORK_STAGE
        },
        {
          workTime: 30,
          breakTime: 5,
          longBreakTime: 15,
          countUpwards: true
        }
      )
    );

    // Act
    const startButton = getByText(/Start/i).closest("button");

    //..Click start
    await fireEvent.click(startButton);

    // Assert
    const timerDisplay = getByTestId("timer-display");

    await wait(
      () => {
        const timerDisplayValue = timerDisplay.innerHTML;
        expect(timerDisplayValue).to.equal("00:01");
      },
      { timeout: 1001 }
    );
  });

  it("Counts up on break stage", async function() {
    // Arrange
    const { getByTestId, getByText } = renderPomodoroComponent(
      createInitialState(
        {
          stage: constants.BREAK_STAGE
        },
        {
          workTime: 30,
          breakTime: 5,
          longBreakTime: 15,
          countUpwardsBreak: true
        }
      )
    );

    // Act
    const startButton = getByText(/Start/i).closest("button");

    //..Click start
    await fireEvent.click(startButton);

    // Assert
    const timerDisplay = getByTestId("timer-display");

    await wait(
      () => {
        const timerDisplayValue = timerDisplay.innerHTML;
        expect(timerDisplayValue).to.equal("00:01");
      },
      { timeout: 1001 }
    );
  });

  it("Counts upon long break stage", async function() {
    // Arrange
    const { getByTestId, getByText } = renderPomodoroComponent(
      createInitialState(
        {
          stage: constants.LONG_BREAK_STAGE
        },
        {
          workTime: 30,
          breakTime: 5,
          longBreakTime: 15,
          countUpwardsBreak: true
        }
      )
    );

    // Act
    const startButton = getByText(/Start/i).closest("button");

    //..Click start
    await fireEvent.click(startButton);

    // Assert
    const timerDisplay = getByTestId("timer-display");

    await wait(
      () => {
        const timerDisplayValue = timerDisplay.innerHTML;
        expect(timerDisplayValue).to.equal("00:01");
      },
      { timeout: 1001 }
    );
  });
});
