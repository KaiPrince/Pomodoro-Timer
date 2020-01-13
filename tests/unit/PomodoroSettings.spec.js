/// This file contains unit tests for the PomodoroSettings component.

import PomodoroSettings from "@/components/PomodoroSettings.vue";
import { render } from "@testing-library/vue";
import { expect } from "chai";
import Vue from "vue";
import { renderComponent } from "../_utils";

describe("PomodoroSettings", function() {
  const store = { state: { workTime: 30, breakTime: 5, longBreakTime: 15 } };
  const renderPomodoroSettingsComponent = function(customState = {}) {
    return renderComponent(PomodoroSettings, {
      ...store,
      ...customState
    });
  };

  before(function() {
    Vue.config.silent = true;
    Vue.prototype.$vuetify = { rtl: false };

    global.requestAnimationFrame = cb => cb();
  });

  /// This test is broken.
  it.skip("Loads Work Time from Vuex store", function() {
    // Arrange
    const testValue = 5;
    const { getByLabelText, debug } = renderPomodoroSettingsComponent({
      workTime: testValue
    });

    // Act
    debug(getByLabelText(/Work Time/i));
    const workTime = getByLabelText(/Work Time/i).nodeValue;

    // Assert
    expect(workTime).to.equal(testValue);
  });

  it.skip("Saves Work Time to Vuex store", function() {
    // Arrange
    render(PomodoroSettings);
    const store = null; //TODO..
    const newWorkTime = null; //TODO..

    // Act

    // Assert
    expect(store.workTime).to.equal(newWorkTime);
  });
});
