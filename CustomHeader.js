import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SettingsOverlay from "./SettingsOverlay";
const windowHeight = Dimensions.get("window").height;

const CustomHeader = ({ title, onLeftButtonPress, onRightButtonPress }) => {
  const navigation = useNavigation();
  // handles the settings overlay
  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleSettingsButtonPress = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };
  return (
    // Because on the Android status bar is shown, I want to make a small adjustment
    // to make sure that the status bar is not colliding with anything
    <View
      style={[
        styles.header,
        Platform.OS === "android" &&
          settingsVisible && { height: windowHeight / 10 },
      ]}
    >
      {/* Icon on the left (go back) */}
      <TouchableOpacity
        style={[styles.leftButton, styles.button]}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" style={[styles.buttonIcon]} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* Icon on the right (settings) */}
      <TouchableOpacity
        style={[styles.rightButton, styles.button]}
        onPress={handleSettingsButtonPress}
      >
        <SettingsOverlay
          visible={settingsVisible}
          onClose={handleCloseSettings}
        />
        <Icon name="cog" style={[styles.buttonIcon]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: windowHeight / 15,
    backgroundColor: "#f7d7ba",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingBottom: 10,
  },
  leftButton: {
    marginRight: 10,
    padding: 8,
    paddingHorizontal: 10,
    backgroundColor: "#ebb381",
    borderRadius: 20,
  },
  rightButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#ebb381",
    borderRadius: 20,
  },
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
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    paddingBottom: 5,
  },
});

export default CustomHeader;
