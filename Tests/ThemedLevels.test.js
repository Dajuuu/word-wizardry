import React from "react";
import { render } from "@testing-library/react-native";
import ThemedLevelsScreen from "../Levels/ThemedLevels";
import { CreditsContext } from "../CreditsContext";
import "@testing-library/jest-native/extend-expect";
import LevelScreen from "../Screens/LevelScreen";

// Mock the navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Ensure that Jest uses the mock for SoundSettingContext
jest.mock("../SoundSettingContext");

// Mock the CreditsContext functions
const mockCredits = {
  credits: 200,
  addCredits: jest.fn(),
  removeCredits: jest.fn(),
  resetCredits: jest.fn(),
};

const levelData = [
  {
    levelName: "H1",
    color: "color1",
    completedColor: "color1",
    outlineColor: "outlineColor1",
    completedOutlineColor: "completedOutlineColor1",
    completedLevels: ["H1", "H2"],
    GRID_DATA: [["C", "A", "T"]],
    ROW_CLUES: ["1. Clue"],
    levelPoints: 8,
    hintCount1Increase: 1,
    hintCount2Increase: 0,
    hintCount3Increase: 0,
    creditsIncrease: 15,
  },
];

describe("ThemedLevels tests", () => {
  const navigation = {
    navigate: jest.fn(),
  };

  it("Renders the Themed Levels data", () => {
    const { getByText } = render(
      <CreditsContext.Provider value={mockCredits}>
        <ThemedLevelsScreen navigation={navigation} levels={levelData} />
      </CreditsContext.Provider>
    );
    expect(getByText("Themed Levels")).toBeTruthy();
  });

  it("Renders a list of LevelScreen components", () => {
    const { getAllByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <ThemedLevelsScreen navigation={navigation} levels={levelData} />
      </CreditsContext.Provider>
    );
    const levelScreens = getAllByTestId("level-screen");
    expect(levelScreens.length).toBeGreaterThan(0);
  });
  // Written with a help of ChatGPT - start
  it("Correctly passes mocked data to LevelScreen", () => {
    const { getByTestId, getByText } = render(
      <LevelScreen
        levelName={levelData[0].levelName}
        color={levelData[0].color}
        completedColor={levelData[0].completedColor}
        outlineColor={levelData[0].outlineColor}
        completedOutlineColor={levelData[0].completedOutlineColor}
        completedLevels={levelData[0].completedLevels}
        GRID_DATA={levelData[0].GRID_DATA}
        ROW_CLUES={levelData[0].ROW_CLUES}
        levelPoints={levelData[0].levelPoints}
        hintCount1Increase={levelData[0].hintCount1Increase}
        hintCount2Increase={levelData[0].hintCount2Increase}
        hintCount3Increase={levelData[0].hintCount3Increase}
        creditsIncrease={levelData[0].creditsIncrease}
        navigation={navigation}
      />
    );

    // Verify that the background color matches the 'color1' prop
    const levelContainer = getByTestId("level-container");
    expect(levelContainer).toHaveStyle({ backgroundColor: "color1" });

    // Verify that the level name is displayed correctly
    const levelNameText = getByText(levelData[0].levelName);
    expect(levelNameText).toBeTruthy();

    // Verify that the 'Completed' text is displayed if appropriate
    const completedText = getByText("Completed");
    expect(completedText).toBeTruthy();
  });
  // Written with a help of ChatGPT - end
});
