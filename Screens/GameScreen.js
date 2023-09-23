import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import CustomHeader from "../CustomHeader";
import { useButtonClickSound } from "../SoundManager";

const GameScreen = ({ navigation }) => {
  // Import function that plays the sound
  const { handleButtonSoundPlay } = useButtonClickSound();

  const handleDifficultyPress = (screen) => {
    // Navigate to the screen selected
    navigation.navigate(screen);
  };

  // Declare the difficulty levels
  const difficultyLevels = [
    {
      level: "Easy",
      colorFront: "rgba(35,139,0,1)",
      colorBack: "green",
      screen: "EasyLevels",
      imageSource: require("../assets/LevelDifficultyImages/star-easy.png"),
    },
    {
      level: "Medium",
      colorFront: "rgba(255,204,58,1)",
      colorBack: "rgba(233,186,56,1)",
      screen: "MediumLevels",
      imageSource: require("../assets/LevelDifficultyImages/star-medium.png"),
    },
    {
      level: "Hard",
      colorFront: "rgba(236,117,15,1)",
      colorBack: "rgba(211,106,16,1)",
      screen: "HardLevels",
      imageSource: require("../assets/LevelDifficultyImages/star-hard.png"),
    },
    {
      level: "Themed",
      colorFront: "rgba(87,15,216,1)",
      colorBack: "rgba(67,15,162,1)",
      screen: "ThemedLevels",
      imageSource: require("../assets/LevelDifficultyImages/star-themed.png"),
    },
    // Do Wyjebania - narazie niech zostanie
    // {
    //   level: "Testing ground",
    //   colorFront: "rgba(87,96,87,1)",
    //   colorBack: "rgba(74,82,74,1)",
    //   screen: "TestingGamingScreen",
    // },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader title="Choose Difficulty" />

      <ScrollView
        style={{ width: "100%" }}
        // Hiding the scrollbars
        // https://reactnative.dev/docs/scrollview#showshorizontalscrollindicator
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* IOSshadow had to be put here so the shadows do work */}
        <View style={[styles.IOSshadow, { marginTop: 10, marginBottom: 20 }]}>
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
                handleButtonSoundPlay();
                handleDifficultyPress(level.screen);
              }}
            >
              <Image source={level.imageSource} style={styles.image} />
              <Text style={styles.difficultyText}>{level.level}</Text>
              <View style={styles.cornerLine} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5e1ce",
  },
  difficultyBox: {
    width: "90%",
    height: 150,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    elevation: 8,
  },
  IOSshadow: {
    shadowColor: "black", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  difficultyText: {
    fontSize: 50,
    fontFamily: "AppLoadingAmaticBold",
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
    alignSelf: "flex-start",
  },
  cornerLine: {
    width: 1,
    height: 10,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
    bottom: -9,
    left: -5,
    zIndex: 1,
    transform: [{ rotate: "45deg" }], // Rotate the line 45 degrees
  },
});

export default GameScreen;
