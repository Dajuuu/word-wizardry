import AsyncStorage from "@react-native-async-storage/async-storage";

// Functions to fetch completed levels for a specific difficulty (depending on what letter it starts with)
// and return the count of those levels
// ---***---
// Written with a help of ChatGPT and AsyncStorage documentation
// https://reactnative.dev/docs/asyncstorage
// Easy levels
export async function fetchCompletedEasyLevels() {
  try {
    const completedLevelsString = await AsyncStorage.getItem("completedLevels");
    if (completedLevelsString) {
      const completedLevels = JSON.parse(completedLevelsString);
      const easyCompleted = completedLevels.filter((level) =>
        level.startsWith("E")
      ).length;
      return easyCompleted;
    }
  } catch (error) {
    console.error("Error fetching completed levels:", error);
  }
  return 0; // Default value if fetch fails
}

// Medium levels
export async function fetchCompletedMediumLevels() {
  try {
    const completedLevelsString = await AsyncStorage.getItem("completedLevels");
    if (completedLevelsString) {
      const completedLevels = JSON.parse(completedLevelsString);
      const mediumCompleted = completedLevels.filter((level) =>
        level.startsWith("M")
      ).length;
      return mediumCompleted;
    }
  } catch (error) {
    console.error("Error fetching completed levels:", error);
  }
  return 0; // Default value if fetch fails
}
// Hard levels
export async function fetchCompletedHardLevels() {
  try {
    const completedLevelsString = await AsyncStorage.getItem("completedLevels");
    if (completedLevelsString) {
      const completedLevels = JSON.parse(completedLevelsString);
      const hardCompleted = completedLevels.filter((level) =>
        level.startsWith("H")
      ).length;
      return hardCompleted;
    }
  } catch (error) {
    console.error("Error fetching completed levels:", error);
  }
  return 0; // Default value if fetch fails
}
// Themed levels
export async function fetchCompletedThemedLevels() {
  try {
    const completedLevelsString = await AsyncStorage.getItem("completedLevels");
    if (completedLevelsString) {
      const completedLevels = JSON.parse(completedLevelsString);
      const themedCompleted = completedLevels.filter((level) =>
        level.startsWith("T")
      ).length;
      return themedCompleted;
    }
  } catch (error) {
    console.error("Error fetching completed levels:", error);
  }
  return 0; // Default value if fetch fails
}

// Determine unlocked achievements based on different difficulty levels
export function determineUnlockedLevelAchievements(
  achievementsList,
  easyLevelsCompletedCount,
  mediumLevelsCompletedCount,
  hardLevelsCompletedCount,
  themedLevelsCompletedCount
) {
  return achievementsList
    .filter((achievement) => achievement.achivUnlockCondition)
    .map((achievement) => achievement.achivIndex)
    .filter((index) => {
      const conditionIndex = achievementsList.find(
        (achievement) => achievement.achivIndex === index
      );
      return (
        (conditionIndex &&
          conditionIndex.achivUnlockCondition <= easyLevelsCompletedCount) ||
        conditionIndex.achivUnlockCondition <= mediumLevelsCompletedCount ||
        conditionIndex.achivUnlockCondition <= hardLevelsCompletedCount ||
        conditionIndex.achivUnlockCondition <= themedLevelsCompletedCount
      );
    });
}
