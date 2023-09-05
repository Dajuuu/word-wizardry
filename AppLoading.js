import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

// Get the width of the screen
const windowWidth = Dimensions.get("window").width;

// TODO testID remains
const LoadingScreen = () => {
  return (
    <View style={styles.container} testID="container">
      <Text style={styles.appName} testID="appName">
        Word Wizardry
      </Text>

      <Image
        source={require("./assets/logo.png")}
        style={styles.creditsImage}
      ></Image>
      {/* Display circle indicator */}
      <ActivityIndicator
        color="white"
        size="large"
        testID="loading-indicator"
        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
      />
      <Text style={styles.loadingText} testID="loadingText">
        Loading the application
      </Text>
      <StatusBar style="light" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(40, 44, 46,1)",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 40,
    textAlign: "center",
    color: "white",
    fontFamily: "AppFontBold",
  },
  appName: {
    fontSize: 40,
    marginBottom: windowWidth / 3,
    textAlign: "center",
    color: "white",
    fontFamily: "AppFontBold",
  },
  creditsImage: {
    height: windowWidth / 3,
    width: windowWidth / 3,
  },
});
