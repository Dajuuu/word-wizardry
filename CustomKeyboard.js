import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
// https://github.com/oblador/react-native-vector-icons
import Icon from "react-native-vector-icons/FontAwesome5";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

// Determine the layout of the buttons for the keyboard
const CustomKeyboard = ({ onKeyPress }) => {
  // QWERTY keyboard layout
  const keyboardData = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  // Put empty string after clicking the backspace
  const handleBackspace = () => {
    onKeyPress("");
  };

  return (
    // Display the buttons for the keyboard
    <View style={styles.keyboardContainer} testID="keyboard-container">
      {/* Written with a help of ChatGPT - start */}
      {keyboardData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.keyboardRow}>
          {row.map((key, keyIndex) => (
            <TouchableOpacity
              key={keyIndex}
              style={styles.keyboardKey}
              onPress={() => onKeyPress(key)}
              testID="keyboard-key"
            >
              <Text style={styles.keyboardKeyText}>{key}</Text>
            </TouchableOpacity>
          ))}
          {/* Put the backspace button next to the last row */}
          {rowIndex === keyboardData.length - 1 && (
            <TouchableOpacity
              style={[styles.keyboardKey, styles.keyboardKeyBackspace]}
              onPress={handleBackspace}
              testID="keyboard-backspace"
            >
              <Icon
                name="backspace"
                size={20}
                color="black"
                testID="backspace-key"
              />
            </TouchableOpacity>
          )}
        </View>
      ))}
      {/* Written with a help of ChatGPT - end */}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    width: "100%",
    backgroundColor: "#f7d7ba",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  keyboardKey: {
    width: "9%",
    height: windowHeight / 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
    marginBottom: 8,
    backgroundColor: "#ebb381",
    borderRadius: 5,
    elevation: 4, // Android
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  keyboardKeyBackspace: {
    width: "15%",
    backgroundColor: "#d8965d",
  },
  keyboardKeyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomKeyboard;
