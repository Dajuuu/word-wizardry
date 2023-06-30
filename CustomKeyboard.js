import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomKeyboard = ({ onKeyPress }) => {
  const keyboardData = [
    ["A", "B", "C", "D", "E"],
    ["F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O"],
    ["P", "Q", "R", "S", "T"],
    ["U", "V", "W", "X", "Y"],
  ];

  return (
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
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    marginTop: 20,
  },
  keyboardRow: {
    flexDirection: "row",
  },
  keyboardKey: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    backgroundColor: "#CCCCCC",
  },
  keyboardKeyText: {
    fontSize: 16,
  },
});

export default CustomKeyboard;
