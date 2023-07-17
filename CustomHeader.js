import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SettingsOverlay from "./SettingsOverlay";
const windowHeight = Dimensions.get("window").height;

const CustomHeader = ({ title, onLeftButtonPress, onRightButtonPress }) => {
  // handles the settings overlay
  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleSettingsButtonPress = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={[styles.leftButton, styles.button]}
        onPress={onLeftButtonPress}
      >
        <Icon name="arrow-left" style={[styles.buttonIcon]} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
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
    alignItems: "center",
    height: windowHeight / 15,
    backgroundColor: "#f7d7ba",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
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
  },
});

export default CustomHeader;
