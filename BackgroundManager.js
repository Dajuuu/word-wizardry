// BackgroundManager.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_BACKGROUND = require("./assets/BackgroundImages/4.png"); // Default background image path

// Function to get the background image path from AsyncStorage
export const getBackgroundImage = async () => {
  try {
    const backgroundImage = await AsyncStorage.getItem("backgroundImage");
    return backgroundImage || DEFAULT_BACKGROUND; // Use the default if not set
  } catch (error) {
    console.error("Error reading backgroundImage from AsyncStorage:", error);
    return DEFAULT_BACKGROUND;
  }
};

// Function to set the background image path in AsyncStorage
export const setBackgroundImage = async (imageSource) => {
  try {
    await AsyncStorage.setItem("backgroundImage", imageSource);
  } catch (error) {
    console.error("Error setting backgroundImage in AsyncStorage:", error);
  }
};
