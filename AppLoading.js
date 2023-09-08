import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";

// Get the width of the screen
const windowWidth = Dimensions.get("window").width;

// TODO testID remains
const LoadingScreen = () => {
  const loadingPhrases = ["Loading", "Loading.", "Loading..", "Loading..."];
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
    }, 500); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={require("./assets/loadingImage.png")}
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
        <Text style={styles.loadingText} testID="loadingText">
          {loadingPhrases[loadingIndex]}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(40, 44, 46,1)",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // You can adjust the resizeMode as needed
    // zIndex:
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
