import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Switch,
  Dimensions,
} from "react-native";
import { useButtonClickSound } from "./SoundManager";
import {
  useSoundSetting,
  useMusicSetting,
  useVibrationSetting,
} from "./SoundSettingContext";
// https://github.com/oblador/react-native-vector-icons
import Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";

// Get the window height
const windowHeight = Dimensions.get("window").height;

// Declare what props can be used for the SettingsOverlay
const SettingsOverlay = ({ visible, onClose }) => {
  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();
  // Import functions that will be used by switches
  // Determine the sound state
  const { soundEnabled, toggleSoundSetting } = useSoundSetting();
  //  Determine the vibrations state
  const { vibrationEnabled, toggleVibrationSetting } = useVibrationSetting();
  // Determine the music state
  const { musicEnabled, toggleMusicSetting } = useMusicSetting();
  // Make sure the user cannot press the music switch on and off rapidly
  const [musicCooldown, setMusicCooldown] = useState(false);

  // Written with a help of ChatGPT - start
  const handleMusicSwitch = async (newValue) => {
    if (!musicCooldown) {
      toggleMusicSetting(newValue);
      handleButtonSoundPlay();

      // Set a cooldown period during which the switch can't be changed
      setMusicCooldown(true);
      setTimeout(() => {
        setMusicCooldown(false);
      }, 1000);
    }
  };
  // Written with a help of ChatGPT - end

  return (
    // Modal props
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      testID="modal"
    >
      <View style={styles.overlay}>
        <View style={styles.modal} testID="modal-style">
          <Text style={styles.title}>Settings</Text>
          <View style={styles.switchContainer} testID="switch-container">
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel} testID="switch-font">
                Sound
              </Text>
            </View>
            {/* Switch for turning on and off the sound */}
            <Switch
              value={soundEnabled}
              onValueChange={toggleSoundSetting}
              testID="sound-switch"
            />
          </View>
          <View style={styles.switchContainer}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>Music</Text>
            </View>
            {/* Switch for turning on and off the music */}
            <Switch
              value={musicEnabled}
              onValueChange={handleMusicSwitch}
              testID="music-switch"
            />
          </View>
          <View style={styles.switchContainer}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>Vibration</Text>
            </View>
            {/* Switch for turning on and off the vibration */}
            <Switch
              value={vibrationEnabled}
              onValueChange={toggleVibrationSetting}
              testID="vibr-switch"
            />
          </View>
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => {
              handleButtonSoundPlay();
              onClose();
            }}
            testID="close-button"
          >
            {/* https://docs.expo.dev/versions/latest/sdk/linear-gradient/ */}
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
    position: "absolute",
    top: -10,
    right: -10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 40,
  },
  closeButtonContainer: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
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
  },
  closeButtonGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});

export default SettingsOverlay;
