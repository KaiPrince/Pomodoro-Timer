/// This file contains utility functions for use in tests.

import { appStore } from "@/store";
import { render } from "@testing-library/vue";
import { VueClass } from "@vue/test-utils";

/// Sleep for a given timer.
export const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const renderComponent = function(
  component: VueClass<Vue>,
  customState = {}
) {
  return render(component, {
    store: {
      ...appStore,
      modules: { ...appStore.modules, ...customState }
    }
  });
};
