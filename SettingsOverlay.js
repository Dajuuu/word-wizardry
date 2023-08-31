import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Switch,
} from "react-native";
import { Audio } from "expo-av";

// Declare what props can be used for the SettingsOverlay
const SettingsOverlay = ({ visible, onClose }) => {
  // Attach sound file to the hook
  const [soundObject, setSoundObject] = useState(null);
  const loadSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require("./assets/sounds/buttonClick.mp3"));
      setSoundObject(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  useEffect(() => {
    loadSound(); // Load sound when the component mounts
  }, []); // Empty dependency array ensures the effect runs once

  const handleSoundPlayOnClick = async () => {
    if (soundObject) {
      await soundObject.replayAsync();
    }
  };

  return (
    // Modal props
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.switchContainer}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>Sound</Text>
            </View>
            <Switch />
          </View>
          <View style={styles.switchContainer}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>Music</Text>
            </View>
            <Switch />
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              handleSoundPlayOnClick();
              onClose();
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "60%",
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  switchLabel: {
    fontSize: 16,
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

export default SettingsOverlay;
