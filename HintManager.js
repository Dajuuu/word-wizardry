import AsyncStorage from "@react-native-async-storage/async-storage";

// How the clue counts will be visible for the storage database
export const HINT_COUNT_STORAGE_KEY_PREFIX = "hintCount_";

// Initalise with this number of uses for all hint types
export const BASE_HINT_USES = 3;

// Load saved number of hints for all hint types
// Written with a help of ChatGPT - start
export const loadHintCount = async (hintIndex) => {
  try {
    const hintCountKey = `${HINT_COUNT_STORAGE_KEY_PREFIX}${hintIndex}`;
    const hintCount = await AsyncStorage.getItem(hintCountKey);
    return hintCount ? parseInt(hintCount) : BASE_HINT_USES;
  } catch (error) {
    console.error(`Error loading clue count for clue ${hintIndex}:`, error);
    throw error;
  }
};
// Written with a help of ChatGPT - end

// Decrement the number of uses for a particular hint
export const decrementHintCount = async (hintIndex) => {
  try {
    const hintCountKey = `${HINT_COUNT_STORAGE_KEY_PREFIX}${hintIndex}`;
    const hintCount = await loadHintCount(hintIndex);
    const updatedCount = hintCount - 1;
    await AsyncStorage.setItem(hintCountKey, updatedCount.toString());
  } catch (error) {
    console.error(
      `Error decrementing clue count for clue ${hintIndex}:`,
      error
    );
    throw error;
  }
};

// Increment the number of uses for a particular hint
export const incrementHintCount = async (hintIndex, increaseAmount) => {
  try {
    const hintCountKey = `${HINT_COUNT_STORAGE_KEY_PREFIX}${hintIndex}`;
    const hintCount = await loadHintCount(hintIndex);
    const updatedCount = hintCount + increaseAmount;
    await AsyncStorage.setItem(hintCountKey, updatedCount.toString());
  } catch (error) {
    console.error(
      `Error incrementing clue count for clue ${hintIndex}:`,
      error
    );
    throw error;
  }
};

// Initialize clue counts
// Written with a help of ChatGPT - start
export const initializeHintCounts = async () => {
  try {
    const hintCountKeys = [
      `${HINT_COUNT_STORAGE_KEY_PREFIX}1`,
      `${HINT_COUNT_STORAGE_KEY_PREFIX}2`,
      `${HINT_COUNT_STORAGE_KEY_PREFIX}3`,
    ];
    const storedHintCounts = await AsyncStorage.multiGet(hintCountKeys);

    // Check if any clue count is missing
    const missingHintCounts = storedHintCounts.filter(
      ([_, hintCount]) => hintCount === null
    );

    // Initialize missing clue counts with the base number of uses
    // e.g when the counts were deleted
    if (missingHintCounts.length > 0) {
      const missingHintCountKeys = missingHintCounts.map(([key, _]) => key);
      const missingHintCountValues = missingHintCountKeys.map(() =>
        BASE_HINT_USES.toString()
      );
      const missingHintCountPairs = missingHintCountKeys.map((key, index) => [
        key,
        missingHintCountValues[index],
      ]);

      await AsyncStorage.multiSet(missingHintCountPairs);

      // Left for testing purposes
      // console.log(
      //   `Initialized missing clue counts with the base number of uses: ${BASE_HINT_USES}`
      // );
    } else {
      // Left for testing purposes
      // console.log("All clue counts are already initialized.");
    }
  } catch (error) {
    console.error("Error initializing clue counts:", error);
    throw error;
  }
};
// Written with a help of ChatGPT - end
