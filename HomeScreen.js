import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const handlePlayButtonPress = () => {
    // Navigate the given screen when pressing certain button
    navigation.navigate("GameScreen");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hide the header
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainerLeft}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LdrBrd</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainerRight}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.scoreText}>Score: 100</Text>
      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlayButtonPress}
      >
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
      <StatusBar hidden />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainerLeft: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  buttonContainerRight: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  scoreText: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  playButton: {
    backgroundColor: "green",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  playButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
