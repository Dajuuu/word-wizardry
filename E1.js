import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EasyLevelsScreen = ({ navigation }) => {
  const levels = [
    { level: 1, color: "green" },
    { level: 2, color: "green" },
    { level: 3, color: "green" },
    { level: 4, color: "green" },
  ];

  const handleLevelPress = (level) => {
    // Handle level press action
    console.log("Level", level, "pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {levels.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.levelBox, { backgroundColor: item.color }]}
            onPress={() => handleLevelPress(item.level)}
          >
            <Text style={styles.levelText}>{item.level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.column}>
        {levels.slice(2).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.levelBox, { backgroundColor: item.color }]}
            onPress={() => handleLevelPress(item.level)}
          >
            <Text style={styles.levelText}>{item.level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  column: {
    flexDirection: "column",
  },
  levelBox: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default EasyLevelsScreen;
