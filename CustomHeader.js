import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SettingsOverlay from "./SettingsOverlay";
import { CreditsContext } from "./CreditsContext";
import { useButtonClickSound } from "./SoundManager";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const CustomHeader = ({ title }) => {
  // Use navigation
  const navigation = useNavigation();
  // Handles the settings overlay
  const [settingsVisible, setSettingsVisible] = useState(false);
  // Import credits info
  const { credits } = useContext(CreditsContext);
  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();

  // Handle the settings overlay
  const handleSettingsButtonPress = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };

  return (
    // Make sure the header is responsive
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Icon on the left (go back) */}
        <TouchableOpacity
          // Margin to make spacing for the next button
          style={[styles.leftButton, { marginRight: windowHeight * 0.015 }]}
          onPress={() => {
            handleButtonSoundPlay();
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" style={[styles.buttonIcon]} />
        </TouchableOpacity>

        {/* Icon next to the one on the left (settings) */}
        <TouchableOpacity
          style={[styles.leftButton]}
          onPress={() => {
            handleButtonSoundPlay();
            handleSettingsButtonPress();
          }}
        >
          {/* Display settings when pressed */}
          <SettingsOverlay
            visible={settingsVisible}
            onClose={handleCloseSettings}
          />
          <Icon name="cog" style={[styles.buttonIcon]} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {/* Display the credits on the right */}
        <View style={[styles.creditsContainer]}>
          <Image
            source={require("./assets/credits.png")}
            style={styles.creditsImage}
          />
          <Text style={styles.creditsText}>{credits}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "rgb(224, 195, 169)", // the same header
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: windowHeight / 10,
    backgroundColor: "rgb(224, 195, 169)",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(129, 103, 79)",
  },
  leftButton: {
    padding: windowHeight * 0.02,
    backgroundColor: "rgba(183, 140, 101,1)",
    borderRadius: 100,
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android
  },
  buttonIcon: {
    fontSize: windowHeight * 0.024,
  },
  title: {
    fontSize: windowHeight * 0.025,
    flex: 1,
    textAlign: "center",
    fontFamily: "AppFontBold",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  creditsText: {
    fontSize: windowHeight * 0.024,
    flexWrap: "wrap",
    maxWidth: "70%",
    fontFamily: "AppFontBold",
    paddingRight: 10,
  },
  creditsContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(183, 140, 101,1)",
    padding: 2,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 100,
    height: windowHeight * 0.07,
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android
  },
  creditsImage: {
    width: windowHeight * 0.04,
    height: windowHeight * 0.04,
  },
});

export default CustomHeader;
