/// This file contains unit tests for the Pomodoro component

import { render, fireEvent, wait } from "@testing-library/vue";
import Pomodoro from "@/components/Pomodoro.vue";
import { expect } from "chai";
import { sleep } from "../_utils";
import Vue from "vue";

describe("Pomodoro", () => {
  it("Shows a start button", () => {
    // Arrange
    const { getByText } = render(Pomodoro);

    // Act

    // Assert
    expect(getByText(/Start/i));
  });

  it("Shows a pause button", async function() {
    // Arrange
    const { getByText } = render(Pomodoro);

    const startButton = getByText(/Start/i).closest("button");

    fireEvent.click(startButton);

    // Act

    // Assert
    await wait(
      function() {
        expect(getByText(/Pause/i)).does.exist;
      },
      { timeout: 10 }
    );
  });

  it("Pauses the timer when clicking pause.", async function() {
    // Arrange
    const { getByText, getByTestId } = render(Pomodoro);

    const startButton = getByText(/Start/i).closest("button");
    fireEvent.click(startButton);

    await Vue.nextTick();
    const pauseButton = getByText(/Pause/i).closest("button");

    const timerDisplay = getByTestId("timer-display");
    const oldTimerDisplayValue = timerDisplay.innerHTML;

    // Act
    fireEvent.click(pauseButton);

    await sleep(1000);

    const timerDisplayValue = timerDisplay.innerHTML;

    // Assert
    expect(timerDisplayValue).to.equal(oldTimerDisplayValue);
  });

  it("Resets when the Reset button is clicked", async function() {
    // Arrange
    //..Start timer
    const { getByText, getByTestId } = render(Pomodoro);

    const startButton = getByText(/Start/i).closest("button");
    fireEvent.click(startButton);

    await Vue.nextTick();

    const resetButton = getByText(/Reset/i).closest("button");

    const timerDisplay = getByTestId("timer-display");

    await sleep(1000);

    // Act
    fireEvent.click(resetButton);

    // Assert
    await wait(
      function() {
        const timerDisplayValue = timerDisplay.innerHTML;
        expect(timerDisplayValue).to.equal("25:00");
      },
      { timeout: 10 }
    );
  });

  it("Skips the countdown when the Skip button is clicked", async function() {
    // Arrange
    //..Start timer
    const { getByText, getByTestId } = render(Pomodoro);

    const startButton = getByText(/Start/i).closest("button");
    fireEvent.click(startButton);
    await Vue.nextTick();

    const timerDisplay = getByTestId("timer-display");

    const skipButton = getByText(/Skip/i).closest("button");

    // Act
    fireEvent.click(skipButton);
    await Vue.nextTick();

    // Assert
    await wait(
      function() {
        const timerDisplayValue = timerDisplay.innerHTML;
        expect(timerDisplayValue).to.equal("5:00");
      },
      { timeout: 10 }
    );
  });

  it("Resets the timer when the start button is clicked after it expires.");
});
