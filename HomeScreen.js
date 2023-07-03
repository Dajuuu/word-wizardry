import React, { useState, useContext } from "react";
import { PointsContext } from "./PointsContext";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const { points } = useContext(PointsContext);

  const [settingsVisible, setSettingsVisible] = useState(false);

  const handlePlayButtonPress = () => {
    navigation.navigate("GameScreen");
  };

  const handleSettingsButtonPress = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSettingsButtonPress}
        >
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.scoreText}>Score: {points}</Text>
      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlayButtonPress}
      >
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>

      {/* Settings Overlay */}
      <Modal visible={settingsVisible} animationType="slide" transparent>
        <View style={styles.settingsOverlay}>
          {/* Settings Box Content */}
          <View style={styles.settingsBox}>
            <Text style={styles.settingsText}>Settings</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseSettings}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  buttonContainer: {
    position: "absolute",
    top: 20,
    left: 20,
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
  settingsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  settingsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;
