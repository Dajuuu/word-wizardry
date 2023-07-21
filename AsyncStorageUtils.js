import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_PREFIX = "inputData_";

// Load input data - what letters are in which rows for given grids
export const loadInputData = async (level) => {
  try {
    const inputData = await AsyncStorage.getItem(level);
    return JSON.parse(inputData);
  } catch (error) {
    console.error("Error loading input data:", error);
    throw error;
  }
};

// Save the letters for particular boxes in a grid
export const saveInputData = async (level, inputData) => {
  try {
    await AsyncStorage.setItem(level, JSON.stringify(inputData));
  } catch (error) {
    console.error("Error saving input data:", error);
    throw error;
  }
};

// Clear all saved input
export const clearInputData = async (level) => {
  try {
    const storageKey = `${STORAGE_KEY_PREFIX}${level}`;
    await AsyncStorage.removeItem(storageKey);
    console.log(`Input data for level ${level} cleared successfully.`);
  } catch (error) {
    console.error(`Failed to clear input data for level ${level}:`, error);
  }
};

// Remember if given level was completed by the user
export const saveCompletedLevel = async (levelName) => {
  try {
    const completedLevels = await loadCompletedLevels();
    if (!completedLevels.includes(levelName)) {
      completedLevels.push(levelName);
      await AsyncStorage.setItem(
        "completedLevels",
        JSON.stringify(completedLevels)
      );
    }
  } catch (error) {
    console.error("Error saving completed level:", error);
    throw error;
  }
};

// Check in the storage if the level was previously completed
export const loadCompletedLevels = async () => {
  try {
    const completedLevels = await AsyncStorage.getItem("completedLevels");
    return completedLevels ? JSON.parse(completedLevels) : [];
  } catch (error) {
    console.error("Error loading completed levels:", error);
    throw error;
  }
};
