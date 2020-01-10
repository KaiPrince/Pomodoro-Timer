/// This file contains unit tests for the Timer component.

import { render, fireEvent, wait } from "@testing-library/vue";
import TimerComponent from "@/components/Timer.vue";
import { expect } from "chai";
import { sleep } from "../_utils";
import Vue from "vue";

describe("Timer", () => {
  const renderTimerComponent = function(minutes = 25) {
    return render(TimerComponent, {
      props: {
        initialCountdownInMinutes: minutes
      }
    });
  };

  it("Shows a start button", () => {
    // Arrange
    const { getByText } = renderTimerComponent();

    // Act

    // Assert
    expect(getByText(/Start/i));
  });

  it("Shows a pause button", async function() {
    // Arrange
    const { getByText } = renderTimerComponent();

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
    const { getByText, getByTestId } = renderTimerComponent();

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
    const { getByText, getByTestId } = renderTimerComponent(25);

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
    const { getByText, getByTestId } = renderTimerComponent(25);

    const startButton = getByText(/Start/i).closest("button");
    fireEvent.click(startButton);
    await Vue.nextTick();

    const timerDisplay = getByTestId("timer-display");

    const skipButton = getByText(/Skip/i).closest("button");

    await sleep(1000);

    // Act
    fireEvent.click(skipButton);
    await Vue.nextTick();

    // Assert
    await wait(
      function() {
        const timerDisplayValue = timerDisplay.innerHTML;
        expect(timerDisplayValue).to.equal("25:00");
      },
      { timeout: 10 }
    );
  });

  it("Resets the timer when the start button is clicked after it expires.");
});
