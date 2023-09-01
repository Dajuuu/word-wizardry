import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

// Determine the layout of the buttons for the keyboard
const CustomKeyboard = ({ onKeyPress }) => {
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
    <View style={styles.keyboardContainer}>
      {keyboardData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.keyboardRow}>
          {row.map((key, keyIndex) => (
            <TouchableOpacity
              key={keyIndex}
              style={styles.keyboardKey}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyboardKeyText}>{key}</Text>
            </TouchableOpacity>
          ))}
          {/* Put the backspace button next to the last row */}
          {rowIndex === keyboardData.length - 1 && (
            <TouchableOpacity
              style={[styles.keyboardKey, styles.keyboardKeyBackspace]}
              onPress={handleBackspace}
            >
              <Icon name="backspace" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    // marginBottom: 10,
    width: "100%",
    // height: "25%",
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
    // borderWidth: 1,
    // shadowColor: "rgba(0,0,0, .4)", // IOS
    // shadowOffset: { height: 1 }, // IOS
    // shadowOpacity: 1, // IOS
    // shadowRadius: 1, //IOS
    // elevation: 2, // Android
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
