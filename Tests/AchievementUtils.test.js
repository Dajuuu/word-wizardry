import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchCompletedEasyLevels,
  fetchCompletedMediumLevels,
  fetchCompletedHardLevels,
  fetchCompletedThemedLevels,
  determineUnlockedLevelAchievements,
} from "../AchievementUtils";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("Achievements Utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Written with a help of ChatGPT - start
  it("should return 0 if AsyncStorage is empty for fetchCompletedEasyLevels", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const result = await fetchCompletedEasyLevels();

    expect(result).toBe(0);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("completedLevels");
  });

  it("fetchCompletedEasyLevels should return the count of completed easy levels", async () => {
    const completedLevels = ["E1", "E2", "M1", "T1"];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(completedLevels));

    const result = await fetchCompletedEasyLevels();

    expect(result).toBe(2); // Two levels start with 'E'
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("completedLevels");
  });
  // Written with a help of ChatGPT - end

  it("fetchCompletedMediumLevels should return the count of completed medium levels", async () => {
    const completedLevels = ["M1", "M2", "E1", "T1"];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(completedLevels));

    const result = await fetchCompletedMediumLevels();

    expect(result).toBe(2); // Two levels start with 'M'
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("completedLevels");
  });

  it("fetchCompletedHardLevels should return the count of completed hard levels", async () => {
    const completedLevels = ["H1", "H2", "E1", "T1"];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(completedLevels));

    const result = await fetchCompletedHardLevels();

    expect(result).toBe(2); // Two levels start with 'H'
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("completedLevels");
  });

  it("fetchCompletedThemedLevels should return the count of completed themed levels", async () => {
    const completedLevels = ["T1", "T2", "E1", "M1"];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(completedLevels));

    const result = await fetchCompletedThemedLevels();

    expect(result).toBe(2); // Two levels start with 'T'
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("completedLevels");
  });
  // Written with a help of ChatGPT - start
  it("determineUnlockedLevelAchievements should return unlocked achievements", () => {
    const achievementsList = [
      { achivIndex: 1, achivUnlockCondition: 2 },
      { achivIndex: 2, achivUnlockCondition: 3 },
      { achivIndex: 3, achivUnlockCondition: 4 },
    ];

    const easyLevelsCompletedCount = 2;
    const mediumLevelsCompletedCount = 3;
    const hardLevelsCompletedCount = 1;
    const themedLevelsCompletedCount = 0;

    const result = determineUnlockedLevelAchievements(
      achievementsList,
      easyLevelsCompletedCount,
      mediumLevelsCompletedCount,
      hardLevelsCompletedCount,
      themedLevelsCompletedCount
    );

    expect(result).toEqual([1, 2]);
  });
  // Written with a help of ChatGPT - end
});
