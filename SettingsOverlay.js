import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Switch,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { useButtonClickSound } from "./SoundManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useSoundSetting,
  useMusicSetting,
  useVibrationSetting,
} from "./SoundSettingContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";

// Get the height
const windowHeight = Dimensions.get("window").height;

// Declare what props can be used for the SettingsOverlay
const SettingsOverlay = ({ visible, onClose }) => {
  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();
  const { soundEnabled, toggleSoundSetting } = useSoundSetting();
  const { musicEnabled, toggleMusicSetting } = useMusicSetting();
  const { vibrationEnabled, toggleVibrationSetting } = useVibrationSetting();

  // Make sure the user cannot press the music switch on and off rapidly
  const [musicCooldown, setMusicCooldown] = useState(false);

  const handleMusicSwitch = async (newValue) => {
    if (!musicCooldown) {
      toggleMusicSetting(newValue);
      handleButtonSoundPlay();

      // Set a cooldown period (e.g., 1 second) during which the switch can't be changed
      setMusicCooldown(true);
      setTimeout(() => {
        setMusicCooldown(false);
      }, 1000); // Adjust the duration as needed
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
            {/* Switch for turning on and off the music */}
            <Switch value={musicEnabled} onValueChange={handleMusicSwitch} />
          </View>
          <View style={styles.switchContainer}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>Vibration</Text>
            </View>
            {/* Switch for turning on and off the sound */}
            <Switch
              value={vibrationEnabled}
              onValueChange={toggleVibrationSetting}
            />
          </View>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => {
              handleButtonSoundPlay();
              onClose();
            }}
          >
            <LinearGradient
              colors={["rgb(255, 67, 67)", "rgb(204, 53, 53)"]}
              style={styles.closeButtonGradient}
              start={{ x: 0.2, y: 0.8 }}
              end={{ x: 0.5, y: 1 }}
            >
              <Icon name="times" style={styles.iconStyle} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "rgba(250,234,219,1)",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    width: "60%",
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: "AppFontBold",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "rgb(255, 225, 198)",
    padding: 8,
    borderRadius: 10,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  switchLabel: {
    fontSize: windowHeight * 0.028,
    fontFamily: "AppFont",
  },
  closeButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    top: -10,
    right: -10,
    borderRadius: 20, // Half of the width/height to make it a circle
    width: 40, // Adjust as needed for the circle size
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center", // Center the icon horizontally
    lineHeight: 40,
  },
  closeButtonContainer: {
    position: "absolute",
    top: -10, // Adjust the distance from the top
    right: -10, // Adjust the distance from the right
    width: 40, // Adjust as needed for the circle size
    height: 40,
    borderRadius: 20, // Half of the width/height to make it a circle
    backgroundColor: "transparent", // Set a transparent background
    justifyContent: "center",
    alignItems: "center",
    elevation: 15,
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Androi
  },
  closeButtonGradient: {
    // padding: 30,
    width: "100%", // Use 100% to make it a circle
    height: "100%", // Use 100% to make it a circle
    borderRadius: 20, // Half of the width/height to make it a circle
  },
});

export default SettingsOverlay;
