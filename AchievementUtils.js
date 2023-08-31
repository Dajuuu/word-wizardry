import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to fetch completed levels and return the count
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
export async function fetchCompletedMediumLevels() {
  try {
    const completedLevelsString = await AsyncStorage.getItem("completedLevels");
    if (completedLevelsString) {
      const completedLevels = JSON.parse(completedLevelsString);
      const mediumCompleted = completedLevels.filter((level) =>
        level.startsWith("M")
      ).length;
      // console.log("Completed medium" + mediumCompleted);
      return mediumCompleted;
    }
  } catch (error) {
    console.error("Error fetching completed levels:", error);
  }
  return 0; // Default value if fetch fails
}
export async function fetchCompletedHardLevels() {
  try {
    const completedLevelsString = await AsyncStorage.getItem("completedLevels");
    if (completedLevelsString) {
      const completedLevels = JSON.parse(completedLevelsString);
      const hardCompleted = completedLevels.filter((level) =>
        level.startsWith("H")
      ).length;
      // console.log("Completed medium" + mediumCompleted);
      return hardCompleted;
    }
  } catch (error) {
    console.error("Error fetching completed levels:", error);
  }
  return 0; // Default value if fetch fails
}
export async function fetchCompletedThemedLevels() {
  try {
    const completedLevelsString = await AsyncStorage.getItem("completedLevels");
    if (completedLevelsString) {
      const completedLevels = JSON.parse(completedLevelsString);
      const themedCompleted = completedLevels.filter((level) =>
        level.startsWith("T")
      ).length;
      // console.log("Completed medium" + mediumCompleted);
      return themedCompleted;
    }
  } catch (error) {
    console.error("Error fetching completed levels:", error);
  }
  return 0; // Default value if fetch fails
}

// Function to determine unlocked achievement indexes based on hideOverlayCondition
// Function to determine unlocked achievement indexes based on hideOverlayCondition
// export function determineUnlockedAchievements(
//   achievementsList,
//   easyLevelsCompletedCount,
//   mediumLevelsCompletedCount,
//   hardLevelsCompletedCount,
//   themedLevelsCompletedCount
// ) {
//   return achievementsList
//     .filter((achievement) => achievement.hideOverlayCondition)
//     .map((achievement) => achievement.achivIndex)
//     .filter(
//       (index) =>
//         index <= easyLevelsCompletedCount ||
//         index <= mediumLevelsCompletedCount ||
//         index <= hardLevelsCompletedCount ||
//         index <= themedLevelsCompletedCount
//     );
// }

// Determine unlocked achievements based on different difficulty levels
export function determineUnlockedLevelAchievements(
  achievementsList,
  easyLevelsCompletedCount,
  mediumLevelsCompletedCount,
  hardLevelsCompletedCount,
  themedLevelsCompletedCount
) {
  return achievementsList
    .filter((achievement) => achievement.hideOverlayCondition)
    .map((achievement) => achievement.achivIndex)
    .filter((index) => {
      const conditionIndex = achievementsList.find(
        (achievement) => achievement.achivIndex === index
      );
      return (
        (conditionIndex &&
          conditionIndex.hideOverlayCondition <= easyLevelsCompletedCount) ||
        conditionIndex.hideOverlayCondition <= mediumLevelsCompletedCount ||
        conditionIndex.hideOverlayCondition <= hardLevelsCompletedCount ||
        conditionIndex.hideOverlayCondition <= themedLevelsCompletedCount
      );
    });
}
