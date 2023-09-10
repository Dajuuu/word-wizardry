import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import {
  fetchCompletedEasyLevels,
  fetchCompletedMediumLevels,
  fetchCompletedHardLevels,
  fetchCompletedThemedLevels,
  determineUnlockedLevelAchievements,
} from "./AchievementUtils"; // Import the utility functions
import CustomHeader from "./CustomHeader";
import Icon from "react-native-vector-icons/FontAwesome5";

// Get the height of the device
const windowHeight = Dimensions.get("window").height;

const Achievements = () => {
  // Initialise the Animation
  const [colorPulsatingAnimation] = useState(new Animated.Value(0));

  // Add counters for all levels
  const [easyLevelsCompletedCount, setEasyLevelsCompletedCount] = useState(0);
  const [mediumLevelsCompletedCount, setMediumLevelsCompletedCount] =
    useState(0);
  const [hardLevelsCompletedCount, setHardLevelsCompletedCount] = useState(0);
  const [themedLevelsCompletedCount, setThemedLevelsCompletedCount] =
    useState(0);
  const [unlockedAchievementIndexes, setUnlockedAchievementIndexes] = useState(
    []
  );

  // Color pulsating animation
  const startColorPulsatingAnimation = (duration) => {
    Animated.loop(
      Animated.timing(colorPulsatingAnimation, {
        toValue: 1,
        duration, // Use the duration parameter
        useNativeDriver: false,
      })
    ).start();
  };

  useEffect(() => {
    // Fetch completed easy levels
    fetchCompletedEasyLevels().then((completedEasyCount) => {
      setEasyLevelsCompletedCount(completedEasyCount);
    });
    // Fetch completed medium levels
    fetchCompletedMediumLevels().then((completedMediumCount) => {
      setMediumLevelsCompletedCount(completedMediumCount);
    });

    // Fetch completed hard levels
    fetchCompletedHardLevels().then((completedHardCount) => {
      setHardLevelsCompletedCount(completedHardCount);
    });

    // Fetch completed themed levels
    fetchCompletedThemedLevels().then((completedThemedCount) => {
      setThemedLevelsCompletedCount(completedThemedCount);
    });
  }, []);

  useEffect(() => {
    // Run the function through all level types and add indexes to the array.
    // This way there is a progress bar incraese animation
    const unlockedIndexes = determineUnlockedLevelAchievements(
      achievementsList,
      easyLevelsCompletedCount,
      mediumLevelsCompletedCount,
      hardLevelsCompletedCount,
      themedLevelsCompletedCount
    );
    setUnlockedAchievementIndexes(unlockedIndexes);
  }, [
    easyLevelsCompletedCount,
    mediumLevelsCompletedCount,
    hardLevelsCompletedCount,
    themedLevelsCompletedCount,
  ]);

  // List of all achivements
  const achievementsList = [
    {
      achivIndex: 1,
      achivTitle: "Novice Explorer",
      achivDesc: "Complete 1 Easy levels. Nice start!",
      achivUnlockCondition: easyLevelsCompletedCount >= 1,
    },
    {
      achivIndex: 2,
      achivTitle: "Progressing Prodigy",
      achivDesc: "Complete 5 Easy levels. You are half way through!",
      achivUnlockCondition: easyLevelsCompletedCount >= 5,
    },
    {
      achivIndex: 3,
      achivTitle: "Flawless Foundations",
      achivDesc: "Complete all Easy levels. Good job!",
      achivUnlockCondition: easyLevelsCompletedCount >= 10,
    },
    // Medium levels
    {
      achivIndex: 4,
      achivTitle: "Moderate Milestones",
      achivDesc: "Complete 2 Medium levels.",
      achivUnlockCondition: mediumLevelsCompletedCount >= 2,
    },
    {
      achivIndex: 5,
      achivTitle: "Moderate Conqueror",
      achivDesc: "Complete 5 Medium levels. Keep it up!",
      achivUnlockCondition: mediumLevelsCompletedCount >= 5,
    },
    {
      achivIndex: 6,
      achivTitle: "Intermediate Mastery",
      achivDesc: "Complete all Medium levels. A true word master!",
      achivUnlockCondition: mediumLevelsCompletedCount >= 10,
    },
    // Hard levels
    {
      achivIndex: 7,
      achivTitle: "Hardship Initiate",
      achivDesc: "Complete 2 Hard levels.",
      achivUnlockCondition: hardLevelsCompletedCount >= 2,
    },
    {
      achivIndex: 8,
      achivTitle: "Formidable Feats",
      achivDesc: "Complete 5 Hard levels. Now, that is impressive!",
      achivUnlockCondition: hardLevelsCompletedCount >= 5,
    },
    {
      achivIndex: 9,
      achivTitle: "Hardened Victor",
      achivDesc:
        "Complete all Hard levels. Bet everyone hates playing Scrabble with you.",
      achivUnlockCondition: hardLevelsCompletedCount >= 10,
    },
    // Themed levels
    {
      achivIndex: 10,
      achivTitle: "Theme Explorer",
      achivDesc: "Complete 2 Themed levels.",
      achivUnlockCondition: themedLevelsCompletedCount >= 2,
    },
    {
      achivIndex: 11,
      achivTitle: "Imagination Unleashed",
      achivDesc: "Complete 5 Themed levels. Wow!",
      achivUnlockCondition: themedLevelsCompletedCount >= 5,
    },
    {
      achivIndex: 12,
      achivTitle: "Theme Maestro",
      achivDesc:
        "Complete all Themed levels. Nothing can surprise you at this point!",
      achivUnlockCondition: themedLevelsCompletedCount >= 10,
    },
    // Complete all levels achievement
    {
      achivIndex: 13,
      achivTitle: "Word Wizard",
      achivDesc:
        "Complete all levels in the game. No words can describe your skills.",
      achivUnlockCondition:
        easyLevelsCompletedCount >= 10 &&
        mediumLevelsCompletedCount >= 10 &&
        hardLevelsCompletedCount >= 10 &&
        themedLevelsCompletedCount >= 10,
    },
  ];

  // Initalise the animation when screen mounts with declared duration
  useEffect(() => {
    unlockedAchievementIndexes.forEach((achivIndex) => {
      if (achivIndex === 13) {
        // As special animation it has different duration
        startColorPulsatingAnimation(4000);
      } else {
        startColorPulsatingAnimation(6000);
      }
    });
  }, [unlockedAchievementIndexes]);

  // Declare colours for specific achivIndexes for the animation
  const getBackgroundColor = (achivIndex, colorPulsatingAnimation) => {
    if (achivIndex === 13) {
      return colorPulsatingAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(40,196,185,0.6)",
          "rgba(208,95,224,0.7)",
          "rgba(40,196,185,0.6)",
        ],
      });
    } else if (achivIndex === 1 || achivIndex === 2 || achivIndex === 3) {
      return colorPulsatingAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(68, 205, 78, 0.5)",
          "rgba(64, 194, 73, 0.8)",
          "rgba(68, 205, 78, 0.5)",
        ],
      });
    } else if (achivIndex === 4 || achivIndex === 5 || achivIndex === 6) {
      return colorPulsatingAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(255, 217, 60, 0.6)",
          "rgba(244, 208, 57, 0.8)",
          "rgba(255, 217, 60, 0.6)",
        ],
      });
    } else if (achivIndex === 7 || achivIndex === 8 || achivIndex === 9) {
      return colorPulsatingAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [
          "rgba(172, 61, 49, 0.7)",
          "rgba(158, 56, 45, 0.8)",
          "rgba(172, 61, 49, 0.7)",
        ],
      });
    } else if (achivIndex === 10 || achivIndex === 11 || achivIndex === 12) {
      return colorPulsatingAnimation.interpolate({
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

  // Progress bar
  const progress =
    (unlockedAchievementIndexes.length / achievementsList.length) * 100;

  return (
    <View style={styles.container}>
      {/* No title here */}
      <CustomHeader title="" />
      {/* Box with progress bar at the top of the page */}
      <View style={styles.background}>
        <View style={styles.achivTitle}>
          <Text style={styles.achivTitleText}>Your Achievements</Text>
          <Text style={styles.achivCountText}>
            {unlockedAchievementIndexes.length} / {achievementsList.length}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]}></View>
          <Text style={styles.progressText}>{`${progress.toFixed(1)}%`}</Text>
        </View>
      </View>
      {/* List of all achievements */}
      <ScrollView
        style={{ width: "100%", paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {achievementsList.map((achievement, index) => (
          <Animated.View
            key={index}
            style={[
              styles.achievementBox,
              {
                // Apply declared backgroundColor
                backgroundColor: getBackgroundColor(
                  achievement.achivIndex,
                  colorPulsatingAnimation
                ),
              },
            ]}
          >
            <Text style={styles.difficultyText}>{achievement.achivTitle}</Text>
            <Text style={styles.descText}>{achievement.achivDesc}</Text>
            {/* If the achivement is not unlocked apply a dark overlay */}
            {!unlockedAchievementIndexes.includes(achievement.achivIndex) && (
              <View style={styles.darkOverlay} />
            )}
            {/* If the achivement is unlocked apply a tick icon in the corner */}
            {unlockedAchievementIndexes.includes(achievement.achivIndex) && (
              <View style={styles.checkmarkContainer}>
                <Icon name="check" style={styles.checkmarkIcon} />
              </View>
            )}
          </Animated.View>
        ))}
        {/* Make spacing at the bottom of the page */}
        <View style={{ marginBottom: windowHeight * 0.37 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5e1ce",
  },
  achievementBox: {
    width: "90%",
    height: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: windowHeight * 0.031,
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
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
  },
  achivTitle: {
    alignItems: "center",
    marginVertical: 10,
  },
  achivTitleText: {
    fontSize: windowHeight * 0.035,
    fontFamily: "AppFontBold",
  },
  achivCountText: {
    fontSize: windowHeight * 0.03,
    fontFamily: "AppFont",
  },
  progressBarContainer: {
    width: "90%",
    backgroundColor: "#ccc",
    height: 25,
    borderRadius: 10,
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "rgba(37,170,43,1)",
    borderRadius: 10,
  },
  progressText: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "AppFont",
    fontSize: 17,
  },
  background: {
    backgroundColor: "rgb(224, 195, 169)",
    width: "100%",
    paddingBottom: 10,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 14, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Make sure the shadow is properly displayed
    zIndex: -100,
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
