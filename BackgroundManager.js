// BackgroundManager.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_BACKGROUND = 1; // Default background image number

const backgroundImagePaths = {
  1: require("./assets/BackgroundImages/1.png"),
  2: require("./assets/BackgroundImages/2.png"),
  3: require("./assets/BackgroundImages/3.png"),
  4: require("./assets/BackgroundImages/4.png"),
  5: require("./assets/BackgroundImages/5.png"),
  6: require("./assets/BackgroundImages/6.png"),
  7: require("./assets/BackgroundImages/7.png"),
  8: require("./assets/BackgroundImages/8.png"),
  9: require("./assets/BackgroundImages/9.png"),
  10: require("./assets/BackgroundImages/10.png"),
  11: require("./assets/BackgroundImages/11.png"),
  12: require("./assets/BackgroundImages/12.png"),
  13: require("./assets/BackgroundImages/13.png"),
  14: require("./assets/BackgroundImages/14.png"),
  15: require("./assets/BackgroundImages/15.png"),
  16: require("./assets/BackgroundImages/16.png"),
  17: require("./assets/BackgroundImages/17.png"),
  18: require("./assets/BackgroundImages/18.png"),
  19: require("./assets/BackgroundImages/19.png"),
  // Add more image paths here
};

// Function to get the background image number from AsyncStorage
export const getBackgroundImage = async () => {
  try {
    const backgroundImageNumber = await AsyncStorage.getItem(
      "backgroundImageIndex"
    );
    return backgroundImageNumber
      ? parseInt(backgroundImageNumber, 10)
      : DEFAULT_BACKGROUND; // Parse as an integer and use the default if not set
  } catch (error) {
    console.error(
      "Error reading backgroundImageIndex from AsyncStorage:",
      error
    );
    return DEFAULT_BACKGROUND;
  }
};

// Function to set the background image number in AsyncStorage
export const setStoredBackgroundImage = async (imageNumber) => {
  try {
    await AsyncStorage.setItem("backgroundImageIndex", imageNumber.toString());
    console.log("Background image updated to index", imageNumber);
  } catch (error) {
    console.error("Error setting backgroundImageIndex in AsyncStorage:", error);
  }
};

// UseEffect to set the default background image number if not already present
export const setDefaultBackgroundImage = () => {
  AsyncStorage.getItem("backgroundImageIndex").then((backgroundImageNumber) => {
    if (backgroundImageNumber === null) {
      setStoredBackgroundImage(DEFAULT_BACKGROUND);
      console.log("Default background image index set to", DEFAULT_BACKGROUND);
    }
  });
};

// Export the background image paths separately
export { backgroundImagePaths };
