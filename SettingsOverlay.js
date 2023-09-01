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
import { useButtonClickSound } from "./SoundManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Declare what props can be used for the SettingsOverlay
const SettingsOverlay = ({ visible, onClose }) => {
  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();

  const [soundEnabled, setSoundEnabled] = useState(); // Default to true, sound is enabled
  // Import information whether the sound is turned off or on
  const loadSoundSetting = async () => {
    try {
      const soundSetting = await AsyncStorage.getItem("soundSetting");
      if (soundSetting !== null) {
        // Convert the stored setting to a boolean
        const isSoundEnabled = soundSetting === "true";
        setSoundEnabled(isSoundEnabled);
        // console.log(isSoundEnabled);
      }
    } catch (error) {
      console.error("Error loading sound setting:", error);
    }
  };

  // Load the Sound Settings
  useEffect(() => {
    loadSoundSetting();
  }, []);

  // Update the sound settings
  const toggleSoundSetting = async (newValue) => {
    setSoundEnabled(newValue);
    console.log(newValue);
    try {
      // Store the new setting in AsyncStorage
      await AsyncStorage.setItem("soundSetting", newValue.toString());
    } catch (error) {
      console.error("Error saving sound setting:", error);
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
            {/* Switch for turning on and off the sound */}
            <Switch value={soundEnabled} onValueChange={toggleSoundSetting} />
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
              handleButtonSoundPlay();
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
