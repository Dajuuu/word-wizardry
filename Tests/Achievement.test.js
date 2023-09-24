import React from "react";
import { render, act } from "@testing-library/react-native";
import Achievements from "../Achievements";
import { CreditsContext } from "../CreditsContext";
import { determineUnlockedLevelAchievements } from "../AchievementUtils";
import "@testing-library/jest-native/extend-expect";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Ensure that Jest uses the mock for SoundSettingContext
jest.mock("../SoundSettingContext");

const mockCredits = {
  credits: 200,
  addCredits: jest.fn(),
  removeCredits: jest.fn(),
  resetCredits: jest.fn(),
};

// Mock determineUnlockedLevelAchievements function
jest.mock("../AchievementUtils", () => ({
  ...jest.requireActual("../AchievementUtils"),
  determineUnlockedLevelAchievements: jest.fn(),
}));

describe("Achievements Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders correctly", () => {
    const unlockedAchievementIndexes = [1, 2, 3];
    determineUnlockedLevelAchievements.mockReturnValue(
      unlockedAchievementIndexes
    );

    const { root } = render(
      <CreditsContext.Provider value={mockCredits}>
        <Achievements />
      </CreditsContext.Provider>
    );

    act(() => {
      expect(root).toBeTruthy();
    });
  });

  it("Displays the Progress bar", () => {
    const { getByText, getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <Achievements />
      </CreditsContext.Provider>
    );
    expect(getByText("Your Achievements")).toBeTruthy();
    expect(getByTestId("progress-bar")).toBeTruthy();
  });
  // Written with a help of ChatGPT - start
  it("Displays Achievements list", () => {
    // Mock the unlocked achievements
    const unlockedAchievementIndexes = [1, 2, 3];

    // Mock the achievementsList
    const achievementsList = [
      {
        achivIndex: 1,
        achivTitle: "Novice Explorer",
        achivDesc: "Complete 1 Easy levels. Nice start!",
      },
      {
        achivIndex: 2,
        achivTitle: "Progressing Prodigy",
        achivDesc: "Complete 5 Easy levels. You are half way through!",
      },
      {
        achivIndex: 3,
        achivTitle: "Flawless Foundations",
        achivDesc: "Complete all Easy levels. Good job!",
      },
    ];

    const { getByText } = render(
      <CreditsContext.Provider value={mockCredits}>
        <Achievements
          unlockedAchievementIndexes={unlockedAchievementIndexes}
          achievementsList={achievementsList}
        />
      </CreditsContext.Provider>
    );

    expect(getByText("Novice Explorer")).toBeTruthy();
    expect(getByText("Progressing Prodigy")).toBeTruthy();
    expect(getByText("Flawless Foundations")).toBeTruthy();
  });

  it("Displays unlocked achievements with checkmark icon", () => {
    // Mock the unlocked achievements
    const unlockedAchievementIndexes = [1, 2];

    // Mock the achievementsList
    const achievementsList = [
      {
        achivIndex: 1,
        achivTitle: "Novice Explorer",
        achivDesc: "Complete 1 Easy levels. Nice start!",
      },
      {
        achivIndex: 2,
        achivTitle: "Progressing Prodigy",
        achivDesc: "Complete 5 Easy levels. You are half way through!",
      },
      {
        achivIndex: 3,
        achivTitle: "Flawless Foundations",
        achivDesc: "Complete all Easy levels. Good job!",
      },
    ];

    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <Achievements
          unlockedAchievementIndexes={unlockedAchievementIndexes}
          achievementsList={achievementsList}
        />
      </CreditsContext.Provider>
    );

    unlockedAchievementIndexes.forEach((achievementIndex) => {
      const checkmarkIcon = getByTestId(`checkmark-${achievementIndex}`);
      expect(checkmarkIcon).toBeTruthy();
    });
  });

  it("Check for correct Button style", () => {
    const { getAllByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <Achievements />
      </CreditsContext.Provider>
    );

    const achievementBox = getAllByTestId("achievement-box");
    const styleToCheck = {
      width: "90%",
      height: 120,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginVertical: 5,
      borderColor: "black",
      borderWidth: 1,
    };
    achievementBox.forEach((box) => {
      const style = box.props.style;
      delete style.backgroundColor;
      expect(style).toEqual(styleToCheck);
    });
  });
  // Written with a help of ChatGPT - end
});
