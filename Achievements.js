import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import CustomHeader from "./CustomHeader";
const Achievements = ({ navigation }) => {
  // Declare the difficulty levels
  const achievementsList = [
    {
      level: "Easy",
      achivDesc: "Complete 2 Easy levels",
      colorFront: "rgb(194, 178, 163)",
      imageSource: require("./assets/LevelDifficultyImages/easy.png"),
    },
    {
      level: "Medium",
      colorFront: "rgb(194, 178, 163)",
    },
    {
      level: "Hard",
      colorFront: "rgb(194, 178, 163)",
    },
    {
      level: "Themed",
      colorFront: "rgb(194, 178, 163)",
    },
  ];

  const isEasyCompleted = {
    Easy: true,
  };

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
      {/* Display Custom header */}
      <CustomHeader title="Achievements" />
      <ScrollView style={{ width: "100%" }}>
        {/* Display all difficulty levels */}
        {achievementsList.map((level, index) => (
          <View
            key={index}
            style={[
              styles.difficultyBox,
              {
                backgroundColor: level.colorFront,
              },
            ]}
          >
            <Image source={level.imageSource} style={styles.image} />
            <Text style={styles.difficultyText}>{level.level}</Text>
            <Text style={styles.descText}>{level.achivDesc}</Text>
            <View
              style={[
                styles.darkOverlay,
                {
                  backgroundColor: isEasyCompleted[level.level]
                    ? "rgba(0,0,0,0)" // Set transparent background when completed
                    : "rgba(0,0,0,0.5)", // Use the original overlay color
                },
              ]}
            />
          </View>
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
  },
  difficultyText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    alignSelf: "flex-end",
    right: 20,
  },
  descText: {
    fontSize: 15,
    fontWeight: "bold",
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
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
  },
});

export default Achievements;
