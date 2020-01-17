/// This file contains utility functions for use in tests.

import { appStore } from "@/store";
import { render } from "@testing-library/vue";

/// Sleep for a given timer.
export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const renderComponent = function(component, customState = {}) {
  return render(component, {
    store: {
      ...appStore,
      modules: { ...appStore.modules, ...customState }
    }
  });
};
