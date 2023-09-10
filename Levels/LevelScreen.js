import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useButtonClickSound } from "../SoundManager";

// Save the data from the Difficulty levels
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
  hintCount1Increase,
  hintCount2Increase,
  hintCount3Increase,
  creditsIncrease,
  navigation,
}) => {
  const isCompleted = completedLevels.includes(levelName);
  const backgroundColor = isCompleted ? completedColor : color;
  const borderColor = isCompleted ? completedOutlineColor : outlineColor;
  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();

  // Depending on choosen level, pass appropriate data to the next screen
  const handlePress = () => {
    navigation.navigate("CrosswordScreen", {
      levelName,
      GRID_DATA,
      ROW_CLUES,
      levelPoints,
      hintCount1Increase,
      hintCount2Increase,
      hintCount3Increase,
      creditsIncrease,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.levelBox, { backgroundColor, borderColor }]}
      onPress={() => {
        handleButtonSoundPlay();
        handlePress();
      }}
    >
      <Text style={styles.levelText}>{levelName}</Text>
      {isCompleted && <Text style={styles.completedText}>Completed</Text>}
      {/* Make a small line */}
      <View style={styles.cornerLine} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  levelBox: {
    width: "42%",
    height: 160,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 12,
    borderLeftWidth: 12,
    elevation: 5, // Android shadow
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  levelText: {
    fontSize: 35,
    color: "#fff",
    fontFamily: "AppLoadingAmaticBold",
    textAlign: "center",
  },
  completedText: {
    fontSize: 18,
    color: "white",
    marginTop: 5,
    fontFamily: "AppFont",
  },
  cornerLine: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
    bottom: -11,
    left: -5,
    zIndex: 1,
    transform: [{ rotate: "45deg" }], // Rotate the line 45 degrees
  },
});

export default LevelScreen;
