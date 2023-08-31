import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const LevelScreen = ({
  levelName,
  color,
  outlineColor,
  completedLevels,
  completedColor,
  completedOutlineColor,
  GRID_DATA,
  ROW_CLUES,
  levelPoints,
  clueCount1Increase,
  clueCount2Increase,
  clueCount3Increase,
  creditsIncrease,
  navigation,
}) => {
  const isCompleted = completedLevels.includes(levelName);
  const backgroundColor = isCompleted ? completedColor : color;
  const borderColor = isCompleted ? completedOutlineColor : outlineColor;

  const handlePress = () => {
    navigation.navigate("CrosswordScreen", {
      levelName,
      GRID_DATA,
      ROW_CLUES,
      levelPoints,
      clueCount1Increase,
      clueCount2Increase,
      clueCount3Increase,
      creditsIncrease,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.levelBox, { backgroundColor, borderColor }]}
      onPress={handlePress}
    >
      <Text style={styles.levelText}>{levelName}</Text>
      {isCompleted && <Text style={styles.completedText}>Completed</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  levelBox: {
    width: "45%",
    height: 150,
    borderRadius: 8,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderBottomWidth: 12,
    borderLeftWidth: 12,
  },
  levelText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "AppFontBold",
  },
  completedText: {
    fontSize: 18,
    color: "white",
    marginTop: 5,
    fontFamily: "AppFont",
  },
});

export default LevelScreen;
