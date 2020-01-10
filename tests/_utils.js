/// This file contains utility functions for use in tests.

/// Sleep for a given timer.
export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
