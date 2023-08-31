import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import CustomHeader from "./CustomHeader";

import { Audio } from "expo-av";

const GameScreen = ({ navigation }) => {
  const [soundObject, setSoundObject] = useState(null);
  const loadSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require("./assets/sounds/buttonClick.mp3"));
      setSoundObject(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  useEffect(() => {
    loadSound(); // Load sound when the component mounts
  }, []); // Empty dependency array ensures the effect runs once

  const handleSoundPlayOnClick = async () => {
    if (soundObject) {
      await soundObject.replayAsync();
    }
  };

  const handleDifficultyPress = (screen) => {
    // Small fix for the route parameters for the EasyLevels
    // TypeError: Cannot read property 'levelCompleted' of undefined
    navigation.navigate(screen, {
      levelCompleted: false,
      completedLevelName: "E0",
    });
  };

  // Declare the difficulty levels
  const difficultyLevels = [
    {
      level: "Easy",
      colorFront: "rgba(35,139,0,1)",
      colorBack: "green",
      screen: "EasyLevels",
      imageSource: require("./assets/LevelDifficultyImages/star-easy.png"),
    },
    {
      level: "Medium",
      colorFront: "rgba(255,204,58,1)",
      colorBack: "rgba(233,186,56,1)",
      screen: "MediumLevels",
      imageSource: require("./assets/LevelDifficultyImages/star-medium.png"),
    },
    {
      level: "Hard",
      colorFront: "rgba(236,117,15,1)",
      colorBack: "rgba(211,106,16,1)",
      screen: "HardLevels",
      imageSource: require("./assets/LevelDifficultyImages/star-hard.png"),
    },
    {
      level: "Themed",
      colorFront: "rgba(87,15,216,1)",
      colorBack: "rgba(67,15,162,1)",
      screen: "ThemedLevels",
      imageSource: require("./assets/LevelDifficultyImages/star-themed.png"),
    },
    {
      level: "Testing ground",
      colorFront: "rgba(87,96,87,1)",
      colorBack: "rgba(74,82,74,1)",
      screen: "TestingGamingScreen",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Display Custom header */}
      <CustomHeader title="Choose Difficulty" />
      <ScrollView style={{ width: "100%" }}>
        {/* Display all difficulty levels */}
        {difficultyLevels.map((level, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.difficultyBox,
              {
                backgroundColor: level.colorFront,
                borderColor: level.colorBack,
              },
            ]}
            onPress={() => {
              handleSoundPlayOnClick();
              handleDifficultyPress(level.screen);
            }}
          >
            <Image source={level.imageSource} style={styles.image} />
            <Text style={styles.difficultyText}>{level.level}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5e1ce",
  },
  difficultyBox: {
    width: "90%",
    height: 150,
    borderRadius: 8,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
    borderBottomWidth: 12,
    borderLeftWidth: 12,
  },
  difficultyText: {
    fontSize: 30,
    // fontWeight: "bold",
    fontFamily: "AppFontBold",
    color: "black",
    alignSelf: "flex-end",
    right: 20,
  },
  image: {
    position: "absolute",
    top: 15,
    left: 10,
    width: 100,
    height: 100,
    // marginRight: 10,
    alignSelf: "flex-start",
  },
});

export default GameScreen;
