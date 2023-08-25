import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "./CustomHeader";

const Achievements = ({ navigation }) => {
  const [easyCompletedCount, setEasyCompletedCount] = useState(0);

  useEffect(() => {
    async function fetchCompletedLevels() {
      try {
        const completedLevelsString = await AsyncStorage.getItem(
          "completedLevels"
        );
        if (completedLevelsString) {
          const completedLevels = JSON.parse(completedLevelsString);
          const easyCompleted = completedLevels.filter((level) =>
            level.startsWith("E")
          ).length;
          setEasyCompletedCount(easyCompleted);
        }
      } catch (error) {
        console.error("Error fetching completed levels:", error);
      }
    }

    fetchCompletedLevels();
  }, []);

  const achievementsList = [
    {
      level: "Easy",
      achivDesc: "Complete 2 Easy levels",
      colorFront: "rgb(194, 178, 163)",
      imageSource: require("./assets/LevelDifficultyImages/easy.png"),
      // Define the condition on which the achievment will be unlocked
      hideOverlayCondition: easyCompletedCount >= 2,
    },
    {
      level: "Medium",
      achivDesc: "Complete 4 Easy levels",
      colorFront: "rgb(194, 178, 163)",
      hideOverlayCondition: easyCompletedCount >= 4,
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

  const handleDifficultyPress = (screen) => {
    navigation.navigate(screen, {
      levelCompleted: false,
      completedLevelName: "E0",
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Achievements" />
      <ScrollView style={{ width: "100%" }}>
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
            {!level.hideOverlayCondition && <View style={styles.darkOverlay} />}
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
