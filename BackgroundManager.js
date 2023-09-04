// BackgroundManager.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_BACKGROUND = 3; // Default background image number

const backgroundImagePaths = {
  1: require("./assets/BackgroundImages/1.png"),
  2: require("./assets/BackgroundImages/2.png"),
  3: require("./assets/BackgroundImages/3.png"),
  4: require("./assets/BackgroundImages/4.png"),
  5: require("./assets/BackgroundImages/5.png"),
  6: require("./assets/BackgroundImages/6.png"),
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
export const setBackgroundImage = async (imageNumber) => {
  try {
    await AsyncStorage.setItem("backgroundImageIndex", imageNumber.toString());
  } catch (error) {
    console.error("Error setting backgroundImageIndex in AsyncStorage:", error);
  }
};

// UseEffect to set the default background image number if not already present
export const setDefaultBackgroundImage = () => {
  AsyncStorage.getItem("backgroundImageIndex").then((backgroundImageNumber) => {
    if (backgroundImageNumber === null) {
      setBackgroundImage(DEFAULT_BACKGROUND);
      console.log("Default background image index set to", DEFAULT_BACKGROUND);
    }
  });
};

export { backgroundImagePaths }; // Export backgroundImagePaths
