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
import { Asset } from "expo-asset";
import { Audio } from "expo-av";
import { useButtonClickSound } from "./SoundManager";
import { PointsContext } from "./PointsContext";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const CustomHeader = ({ title }) => {
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

  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();
  /* // Because on the Android status bar is shown, I want to make a small
      adjustment // to make sure that the status bar is not colliding with
      anything */
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Icon on the left (go back) */}
        <TouchableOpacity
          // margin to make spacing for the next button
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
          {/* <Text style={styles.creditsText}>230</Text> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "rgb(224, 195, 169)", // Set your background color
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
    // marginRight: 10,
    padding: windowHeight * 0.022,
    // paddingHorizontal: 14,
    backgroundColor: "rgba(183, 140, 101,1)",
    borderRadius: 200,
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // Android
  },
  // rightButton: {
  //   marginLeft: 10,
  //   padding: 12,
  //   backgroundColor: "#ebb381",
  //   borderRadius: 20,
  // },
  buttonText: {
    fontSize: 16,
    color: "#333",
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
    flexDirection: "row", // Arrange the title and credits in a row
    justifyContent: "space-between", // Space them evenly along the row
    paddingHorizontal: 10,
    // alignItems: "center", // Center them vertically within the header
  },
  creditsText: {
    fontSize: windowHeight * 0.024,
    flexWrap: "wrap",
    maxWidth: "70%",
    // alignSelf: "center",

    fontFamily: "AppFontBold",
    paddingRight: 10,
  },
  creditsContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(183, 140, 101,1)",
    padding: 2,
    // paddingHorizontal: 10,
    // paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    // justifyContent: "space-between", // Space them evenly along the row
    alignItems: "center", // Center them vertically within the header
    // maxWidth: 110,
    minWidth: 95,
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
    // marginRight: 5,
    // marginLeft: -5,
  },
});

export default CustomHeader;
