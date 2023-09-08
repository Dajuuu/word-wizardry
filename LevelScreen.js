import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { useButtonClickSound } from "./SoundManager";

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
  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();

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
      onPress={() => {
        handleButtonSoundPlay();
        handlePress();
      }}
    >
      <Text style={styles.levelText}>{levelName}</Text>
      {isCompleted && <Text style={styles.completedText}>Completed</Text>}
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
});

export default LevelScreen;
