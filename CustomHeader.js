import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SettingsOverlay from "./SettingsOverlay";
import { CreditsContext } from "./CreditsContext";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";

import { PointsContext } from "./PointsContext";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const CustomHeader = ({ title }) => {
  // Attach sound file to the hook
  const [soundObject, setSoundObject] = useState(null);
  // Cache the credits icon
  useEffect(() => {
    const cacheIcon = async () => {
      await Asset.fromModule(require("./assets/credits.png")).downloadAsync();
    };
    cacheIcon();
  }, []);

  const navigation = useNavigation();
  // handles the settings overlay
  const [settingsVisible, setSettingsVisible] = useState(false);
  // Import credits info
  const { credits } = useContext(CreditsContext);

  // Handle the settings overlay
  const handleSettingsButtonPress = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };

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

  /* // Because on the Android status bar is shown, I want to make a small
      adjustment // to make sure that the status bar is not colliding with
      anything */
  return (
    <View style={styles.header}>
      {/* Icon on the left (go back) */}
      <TouchableOpacity
        style={[styles.leftButton, styles.button, { marginRight: 10 }]}
        onPress={() => {
          handleSoundPlayOnClick();
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" style={[styles.buttonIcon]} />
      </TouchableOpacity>

      {/* Icon next to the one on the left (settings) */}
      <TouchableOpacity
        style={[styles.leftButton, styles.button]}
        onPress={() => {
          handleSoundPlayOnClick();
          handleSettingsButtonPress();
        }}
      >
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
      <View style={[styles.creditsContainer, styles.button]}>
        <Image
          source={require("./assets/credits.png")}
          style={styles.creditsImage}
        />
        <Text style={styles.creditsText}>{credits}</Text>
        {/* <Text style={styles.creditsText}>300000</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: windowHeight / 11,
    backgroundColor: "#f7d7ba",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingBottom: 15,
  },
  leftButton: {
    // marginRight: 10,
    padding: 12,
    paddingHorizontal: 14,
    backgroundColor: "#ebb381",
    borderRadius: 20,
  },
  // rightButton: {
  //   marginLeft: 10,
  //   padding: 12,
  //   backgroundColor: "#ebb381",
  //   borderRadius: 20,
  // },
  button: {
    // borderWidth: 1,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  buttonIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    fontFamily: "AppFontBold",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row", // Arrange the title and credits in a row
    justifyContent: "space-between", // Space them evenly along the row
    alignItems: "center", // Center them vertically within the header
  },
  creditsText: {
    fontSize: 16,
    flexWrap: "wrap",
    maxWidth: "70%",
    alignSelf: "center",
    fontFamily: "AppFontBold",
  },
  creditsContainer: {
    backgroundColor: "#ebb381",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    // justifyContent: "space-between", // Space them evenly along the row
    alignItems: "center", // Center them vertically within the header
    maxWidth: 110,
    minWidth: 95,
    maxHeight: 45,
  },
  creditsImage: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginLeft: -5,
  },
});

export default CustomHeader;
