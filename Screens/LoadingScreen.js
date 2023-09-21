import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

// Get the width of the screen
const windowWidth = Dimensions.get("window").width;

// TODO testID remains
const LoadingScreen = () => {
  // Written with a help of ChatGPT - start
  // Make an array of what text will be displayed
  const loadingPhrases = ["Loading", "Loading.", "Loading..", "Loading..."];
  // At what index of the array start the animation
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle between every index of the array
      setLoadingIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  // Written with a help of ChatGPT - end
  return (
    // Display background image
    // https://reactnative.dev/docs/imagebackground
    <ImageBackground
      source={require("../assets/loadingImage.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container} testID="container">
        <Text style={styles.appName} testID="appName">
          Word Wizardry
        </Text>
        <ActivityIndicator
          color="white"
          size="large"
          testID="loading-indicator"
          style={{
            transform: [{ scaleX: 2 }, { scaleY: 2 }],
            marginTop: windowWidth * 0.2,
          }}
        />
        {/* Animate the loading text */}
        {/* Written with a help of ChatGPT - start */}
        <Text style={styles.loadingText} testID="loadingText">
          {loadingPhrases[loadingIndex]}
        </Text>
        {/* Written with a help of ChatGPT - end */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loadingText: {
    fontSize: windowWidth * 0.05,
    marginTop: 40,
    textAlign: "center",
    color: "white",
    fontFamily: "AppFontBold",
  },
  appName: {
    fontSize: windowWidth * 0.15,
    marginBottom: windowWidth * 0.1,
    textAlign: "center",
    color: "white",
    fontFamily: "AppLoadingAmaticBold",
  },
  creditsImage: {
    height: windowWidth * 0.7,
    width: windowWidth * 0.7,
  },
});

export default LoadingScreen;
