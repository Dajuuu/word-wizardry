import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import CustomHeader from "./CustomHeader";
import {
  fetchCompletedEasyLevels,
  fetchCompletedMediumLevels,
  fetchCompletedHardLevels,
  fetchCompletedThemedLevels,
  determineUnlockedLevelAchievements,
} from "./AchievementUtils"; // Import the utility functions
import Icon from "react-native-vector-icons/FontAwesome5";

const Achievements = () => {
  const [borderColorAnimation] = useState(new Animated.Value(0));

  const [loading, setLoading] = useState(true); // Add a loading state

  const [easyLevelsCompletedCount, setEasyLevelsCompletedCount] = useState(0);
  const [mediumLevelsCompletedCount, setMediumLevelsCompletedCount] =
    useState(0);
  // Add states for hard and themed levels completed count
  const [hardLevelsCompletedCount, setHardLevelsCompletedCount] = useState(0);
  const [themedLevelsCompletedCount, setThemedLevelsCompletedCount] =
    useState(0);
  const [unlockedAchievementIndexes, setUnlockedAchievementIndexes] = useState(
    []
  );

  useEffect(() => {
    // Fetch completed easy levels
    fetchCompletedEasyLevels().then((completedEasyCount) => {
      setEasyLevelsCompletedCount(completedEasyCount);
      // console.log(completedEasyCount);
    });
    // Fetch completed medium levels
    fetchCompletedMediumLevels().then((completedMediumCount) => {
      setMediumLevelsCompletedCount(completedMediumCount);
      // console.log(completedMediumCount);
    });

    // Fetch completed hard levels
    fetchCompletedHardLevels().then((completedHardCount) => {
      setHardLevelsCompletedCount(completedHardCount);
      // console.log(completedHardCount);
    });

    // Fetch completed themed levels
    fetchCompletedThemedLevels().then((completedThemedCount) => {
      setThemedLevelsCompletedCount(completedThemedCount);
      // console.log(completedThemedCount);
    });

    setLoading(false); // Set loading to false once data is fetched
  }, []);

  useEffect(() => {
    const unlockedIndexes = determineUnlockedLevelAchievements(
      achievementsList,
      easyLevelsCompletedCount,
      mediumLevelsCompletedCount,
      hardLevelsCompletedCount,
      themedLevelsCompletedCount
    );
    setUnlockedAchievementIndexes(unlockedIndexes);
    console.log(unlockedIndexes);
  }, [
    easyLevelsCompletedCount,
    mediumLevelsCompletedCount,
    hardLevelsCompletedCount,
    themedLevelsCompletedCount,
  ]);

  // useEffect(() => {
  //   const unlockedIndexes = determineUnlockedMediumAchievements(
  //     achievementsList,
  //     mediumLevelsCompletedCount
  //   );
  //   setUnlockedAchievementIndexes(unlockedIndexes);
  //   console.log(unlockedIndexes);
  // }, [mediumLevelsCompletedCount]);

  // useEffect(() => {
  //   const unlockedIndexes = determineUnlockedHardAchievements(
  //     achievementsList,
  //     hardLevelsCompletedCount
  //   );
  //   setUnlockedAchievementIndexes(unlockedIndexes);
  //   // console.log(unlockedIndexes);
  // }, [hardLevelsCompletedCount]);

  // TODO remember to change the hideOverlayCondition values
  const achievementsList = [
    {
      achivIndex: 1,
      level: "Novice Explorer",
      achivDesc: "Complete 2 Easy levels.",
      hideOverlayCondition: easyLevelsCompletedCount >= 2,
    },
    {
      achivIndex: 2,
      level: "Progressing Prodigy",
      achivDesc: "Complete 5 Easy levels. You are half way through!",
      hideOverlayCondition: easyLevelsCompletedCount >= 3,
    },
    {
      achivIndex: 3,
      level: "Flawless Foundations",
      achivDesc: "Complete all Easy levels. Good job!",
      hideOverlayCondition: easyLevelsCompletedCount >= 3,
    },
    // Medium levels
    {
      achivIndex: 4,
      level: "Moderate Milestones",
      achivDesc: "Complete 2 Medium levels.",
      hideOverlayCondition: mediumLevelsCompletedCount >= 2,
    },
    {
      achivIndex: 5,
      level: "Moderate Conqueror",
      achivDesc: "Complete 5 Medium levels. Keep it up!",
      hideOverlayCondition: mediumLevelsCompletedCount >= 4,
    },
    {
      achivIndex: 6,
      level: "Intermediate Mastery",
      achivDesc: "Complete all Medium levels. A true word master!",
      hideOverlayCondition: mediumLevelsCompletedCount >= 10,
    },
    // Hard levels
    {
      achivIndex: 7,
      level: "Hardship Initiate",
      achivDesc: "Complete 2 Hard levels.",
      hideOverlayCondition: hardLevelsCompletedCount >= 2,
    },
    {
      achivIndex: 8,
      level: "Formidable Feats",
      achivDesc: "Complete 5 Hard levels. Now, that is impressive!",
      hideOverlayCondition: hardLevelsCompletedCount >= 3,
    },
    {
      achivIndex: 9,
      level: "Hardened Victor",
      achivDesc:
        "Complete all Hard levels. Bet everyone hates playing Scrabble with you.",
      hideOverlayCondition: hardLevelsCompletedCount >= 5,
    },
    // Themed levels
    {
      achivIndex: 10,
      level: "Theme Explorer",
      achivDesc: "Complete 2 Themed levels.",
      hideOverlayCondition: themedLevelsCompletedCount >= 2,
    },
    {
      achivIndex: 11,
      level: "Imagination Unleashed",
      achivDesc: "Complete 5 Themed levels. Wow!",
      hideOverlayCondition: themedLevelsCompletedCount >= 3,
    },
    {
      achivIndex: 12,
      level: "Theme Maestro",
      achivDesc:
        "Complete all Themed levels. Nothing can surprise you at this point!",
      hideOverlayCondition: themedLevelsCompletedCount >= 5,
    },
    // Complete all levels
    {
      achivIndex: 13,
      level: "Word Wizard",
      achivDesc:
        "Complete all levels in the game. No words can describe your skills.",
      hideOverlayCondition:
        easyLevelsCompletedCount >= 2 &&
        mediumLevelsCompletedCount >= 2 &&
        hardLevelsCompletedCount >= 2 &&
        themedLevelsCompletedCount >= 2,
    },
  ];

  // const openAchievementModal = (achievement) => {
  //   setSelectedAchievement(achievement);
  //   setIsModalVisible(true);
  // };

  // const closeModal = () => {
  //   setIsModalVisible(false);
  //   setSelectedAchievement(null);
  // };
  // TODO change the name of the function
  const startBorderColorAnimation = (duration) => {
    Animated.loop(
      Animated.timing(borderColorAnimation, {
        toValue: 1,
        duration, // Use the provided duration
        useNativeDriver: false,
      })
    ).start();
  };

  const stopBorderColorAnimation = () => {
    borderColorAnimation.stopAnimation();
    borderColorAnimation.setValue(0);
  };

  // Start the gradient animation when the achivements is unlocked
  useEffect(() => {
    unlockedAchievementIndexes.forEach((achivIndex) => {
      if (achivIndex === 13) {
        // As special animation it has different duration
        startBorderColorAnimation(5000);
      } else {
        startBorderColorAnimation(8000);
      }
    });
  }, [unlockedAchievementIndexes]);

  const getBackgroundColor = (achivIndex, borderColorAnimation) => {
    if (achivIndex === 13) {
      // Special type of colors
      return borderColorAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(40,196,185,0.6)",
          "rgba(208,95,224,0.7)",
          "rgba(40,196,185,0.6)",
        ],
      });
    } else if (achivIndex === 1 || achivIndex === 2 || achivIndex === 3) {
      return borderColorAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(68, 205, 78, 0.5)",
          "rgba(64, 194, 73, 0.6)",
          "rgba(68, 205, 78, 0.5)",
        ],
      });
    } else if (achivIndex === 4 || achivIndex === 5 || achivIndex === 6) {
      return borderColorAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(255, 217, 60, 0.6)",
          "rgba(244, 208, 57, 0.5)",
          "rgba(255, 217, 60, 0.6)",
        ],
      });
    } else if (achivIndex === 7 || achivIndex === 8 || achivIndex === 9) {
      return borderColorAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(172, 61, 49, 0.7)",
          "rgba(158, 56, 45, 0.8)",
          "rgba(172, 61, 49, 0.7)",
        ],
      });
    } else if (achivIndex === 10 || achivIndex === 11 || achivIndex === 12) {
      return borderColorAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(215, 169, 246, 0.8)",
          "rgba(236, 156, 228,0.8)",
          "rgba(215, 169, 246, 0.8)",
        ],
      });
    } else {
      // Default gradient colors for other achivIndex values
      return [
        "rgba(128,128,128,0.6)",
        "rgba(192,192,192,0.6)",
        "rgba(128,128,128,0.6)",
      ];
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Achievements" />
      <ScrollView style={{ width: "100%" }}>
        {achievementsList.map((level, index) => (
          <Animated.View
            key={index}
            style={[
              styles.difficultyBox,
              {
                backgroundColor: getBackgroundColor(
                  level.achivIndex,
                  borderColorAnimation
                ),
              },
            ]}
          >
            {/* <Image source={level.imageSource} style={styles.image} /> */}
            <Text style={styles.difficultyText}>{level.level}</Text>
            <Text style={styles.descText}>{level.achivDesc}</Text>
            {!unlockedAchievementIndexes.includes(level.achivIndex) && (
              <View style={styles.darkOverlay} />
            )}
            {unlockedAchievementIndexes.includes(level.achivIndex) && (
              <View style={styles.checkmarkContainer}>
                <Icon name="check" style={styles.checkmarkIcon} />
              </View>
            )}
          </Animated.View>
        ))}
      </ScrollView>

      {/* Modal */}
      {/* <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAchievement && (
              <>
                <Image
                  source={selectedAchievement.imageSource}
                  style={styles.modalImage}
                />
                <Text style={styles.modalHeaderText}>
                  {selectedAchievement.level}
                </Text>
                <Text style={styles.modalDescText}>
                  {selectedAchievement.achivDesc}
                </Text>
                <Text style={styles.modalDescText}>
                  Credits added: {selectedAchievement.creditsIncrese}
                </Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
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
    height: 120,
    borderRadius: 8,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: 25,
    fontFamily: "AppFontBold",
    color: "black",
    alignSelf: "flex-end",
    right: 20,
  },
  descText: {
    fontSize: 16,
    fontFamily: "AppFont",
    color: "black",
    alignSelf: "flex-end",
    right: 20,
    textAlign: "right",
    maxWidth: "70%",
  },
  image: {
    position: "absolute",
    top: 15,
    left: 10,
    width: 100,
    height: 100,
    alignSelf: "flex-start",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
  },

  // Modal/overlay
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalDescText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  // Check styling
  checkmarkContainer: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "rgba(45,133,45,1)",
    borderRadius: 20,
    padding: 8,
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  checkmarkIcon: {
    color: "white",
    fontSize: 16,
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default Achievements;
