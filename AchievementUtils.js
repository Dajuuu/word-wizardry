import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to fetch completed levels and return the count
export async function fetchCompletedLevels() {
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

// Function to determine unlocked achievement indexes based on hideOverlayCondition
export function determineUnlockedAchievements(
  achievementsList,
  easyLevelsCompletedCount
) {
  return achievementsList
    .filter((achievement) => achievement.hideOverlayCondition)
    .map((achievement) => achievement.achivIndex)
    .filter((index) => index <= easyLevelsCompletedCount);
}
