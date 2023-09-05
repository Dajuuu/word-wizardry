import { StatusBar } from "expo-status-bar";
import React from "react";
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
  return (
    <ImageBackground
      source={require("./assets/loadingImage.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container} testID="container">
        <Text style={styles.appName} testID="appName">
          Word Wizardry
        </Text>

        {/* <Image
          source={require("./assets/logo.png")}
          style={styles.creditsImage}
        /> */}

        {/* Display circle indicator */}

        {/* Display circle indicator */}
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
          Loading
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
    fontSize: 18,
    marginTop: 40,
    textAlign: "center",
    color: "white",
    fontFamily: "AppFontBold",
  },
  appName: {
    fontSize: 65,
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
