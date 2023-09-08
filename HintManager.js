import AsyncStorage from "@react-native-async-storage/async-storage";

// How the clue counts will be visible for the storage database
export const CLUE_COUNT_STORAGE_KEY_PREFIX = "clueCount_";

// Initalise with this number of uses for all hint types
export const BASE_CLUE_USES = 3;

// Load saved number of hints for all hint types
export const loadClueCount = async (clueIndex) => {
  try {
    const clueCountKey = `${CLUE_COUNT_STORAGE_KEY_PREFIX}${clueIndex}`;
    const clueCount = await AsyncStorage.getItem(clueCountKey);
    return clueCount ? parseInt(clueCount) : BASE_CLUE_USES;
  } catch (error) {
    console.error(`Error loading clue count for clue ${clueIndex}:`, error);
    throw error;
  }
};

// Decrement the number of uses for a particular hint
export const decrementClueCount = async (clueIndex) => {
  try {
    const clueCountKey = `${CLUE_COUNT_STORAGE_KEY_PREFIX}${clueIndex}`;
    const clueCount = await loadClueCount(clueIndex);
    const updatedCount = clueCount - 1;
    await AsyncStorage.setItem(clueCountKey, updatedCount.toString());
  } catch (error) {
    console.error(
      `Error decrementing clue count for clue ${clueIndex}:`,
      error
    );
    throw error;
  }
};

// Increment the number of uses for a particular hint
export const incrementHintCount = async (clueIndex, increaseAmount) => {
  try {
    const clueCountKey = `${CLUE_COUNT_STORAGE_KEY_PREFIX}${clueIndex}`;
    const clueCount = await loadClueCount(clueIndex);
    const updatedCount = clueCount + increaseAmount;
    await AsyncStorage.setItem(clueCountKey, updatedCount.toString());
  } catch (error) {
    console.error(
      `Error incrementing clue count for clue ${clueIndex}:`,
      error
    );
    throw error;
  }
};

// Initialize clue counts
export const initializeClueCounts = async () => {
  try {
    const clueCountKeys = [
      `${CLUE_COUNT_STORAGE_KEY_PREFIX}1`,
      `${CLUE_COUNT_STORAGE_KEY_PREFIX}2`,
      `${CLUE_COUNT_STORAGE_KEY_PREFIX}3`,
    ];
    const storedClueCounts = await AsyncStorage.multiGet(clueCountKeys);

    // Check if any clue count is missing
    const missingClueCounts = storedClueCounts.filter(
      ([_, clueCount]) => clueCount === null
    );

    // Initialize missing clue counts with the base number of uses
    // e.g when the counts were deleted
    if (missingClueCounts.length > 0) {
      const missingClueCountKeys = missingClueCounts.map(([key, _]) => key);
      const missingClueCountValues = missingClueCountKeys.map(() =>
        BASE_CLUE_USES.toString()
      );
      const missingClueCountPairs = missingClueCountKeys.map((key, index) => [
        key,
        missingClueCountValues[index],
      ]);

      await AsyncStorage.multiSet(missingClueCountPairs);

      console.log(
        `Initialized missing clue counts with the base number of uses: ${BASE_CLUE_USES}`
      );
    } else {
      console.log("All clue counts are already initialized.");
    }
  } catch (error) {
    console.error("Error initializing clue counts:", error);
    throw error;
  }
};
