import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CustomKeyboard = ({ onKeyPress }) => {
  const keyboardData = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const handleBackspace = () => {
    onKeyPress("");
  };

  return (
    // <SafeAreaView style={styles.container}>
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
          {rowIndex === keyboardData.length - 1 && (
            <TouchableOpacity
              style={[styles.keyboardKey, styles.keyboardKeyBackspace]}
              onPress={handleBackspace}
            >
              <Icon name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 30,
  },
  keyboardContainer: {
    marginTop: 10,
    // marginBottom: 30,
    width: "100%",
    // height: "25%",
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  keyboardKey: {
    width: "9%",
    height: windowHeight / 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
    marginBottom: 8,
    backgroundColor: "#CCCCCC",
  },
  keyboardKeyBackspace: {
    width: "15%",
  },
  keyboardKeyText: {
    fontSize: 16,
  },
});

export default CustomKeyboard;
