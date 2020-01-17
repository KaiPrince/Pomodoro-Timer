/// This file contains unit tests for the Pomodoro component

import PomodoroComponent from "@/components/Pomodoro.vue";
import { fireEvent } from "@testing-library/vue";
import { expect } from "chai";
import Vue from "vue";
import PomodoroModuleInitial, {
  constants
} from "../../src/store/modules/Pomodoro";
import PomodoroSettingsModuleInitial from "../../src/store/modules/PomodoroSettings";
import { renderComponent } from "../_utils";

describe("Pomodoro", function() {
  const createInitialState = (
    pomodoroState = {},
    pomodoroSettingsState = {}
  ) => ({
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

  const state = createInitialState(
    { stage: constants.WORK_STAGE },
    { workTime: 30, breakTime: 5, longBreakTime: 15 }
  );

  const renderPomodoroComponent = function(customState = state) {
    return renderComponent(PomodoroComponent, {
      ...customState
    });
  };

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
      console.log("before click start", timerDisplay.innerHTML);
      const startButton = getByText(/Start/i).closest("button");

      //..Click start
      fireEvent.click(startButton);

      await Vue.nextTick();

      const skipButton = getByText(/Skip/i).closest("button");

      console.log("before click skip", timerDisplay.innerHTML);
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
});
