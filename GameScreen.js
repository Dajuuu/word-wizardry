import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const GameScreen = ({ navigation }) => {
  const difficultyLevels = [
    { level: "Easy", color: "green", screen: "EasyLevels" },
    { level: "Medium", color: "yellow", screen: "MediumLevels" },
    { level: "Hard", color: "orange", screen: "HardLevels" },
    { level: "Expert", color: "red", screen: "ExpertLevels" },
  ];

  const handleDifficultyPress = (screen) => {
    // Small fix for the route parameters for the EasyLevels
    // TypeError: Cannot read property 'levelCompleted' of undefined
    navigation.navigate(screen, {
      levelCompleted: false,
      completedLevelName: "E0",
    });
  };

  return (
    <View style={styles.container}>
      {difficultyLevels.map((level, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.difficultyBox, { backgroundColor: level.color }]}
          onPress={() => handleDifficultyPress(level.screen)}
        >
          <Text style={styles.difficultyText}>{level.level}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  difficultyBox: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  difficultyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default GameScreen;
