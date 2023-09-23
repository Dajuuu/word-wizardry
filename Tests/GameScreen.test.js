import React from "react";
import { render, act, fireEvent } from "@testing-library/react-native";
import GameScreen, { difficultyLevels } from "../Screens/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import { CreditsContext } from "../CreditsContext";
import "@testing-library/jest-native/extend-expect";

const renderWithNavigation = (children) => {
  return render(<NavigationContainer>{children}</NavigationContainer>);
};
// Mock the navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Ensure that Jest uses the mock for SoundSettingContext
jest.mock("../SoundSettingContext");

// Mock the CreditsContext functions
const mockCredits = {
  credits: 500, // Set your desired mock credits value
  addCredits: jest.fn(),
  removeCredits: jest.fn(),
  resetCredits: jest.fn(),
};

// Initalise the navigation mock
const mockNavigation = {
  navigate: jest.fn(),
};

describe("GameScreen Tests", () => {
  // Written with a help of ChatGPT - start
  it("Renders correctly", () => {
    // Render the GameScreen component and wrap it with the mock context provider
    const { root } = render(
      <CreditsContext.Provider value={mockCredits}>
        <GameScreen />
      </CreditsContext.Provider>
    );

    act(() => {
      expect(root).toBeTruthy();
    });
  });
  // Written with a help of ChatGPT - end
  it("Renders correct number of buttons", () => {
    const { getAllByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <GameScreen navigation={mockNavigation} />
      </CreditsContext.Provider>
    );

    // Check if the correct number of difficulty level buttons are rendered
    const levelButtons = getAllByTestId("difficulty-level-button");
    expect(levelButtons.length).toBe(4);
  });

  it("Renders difficulty levels with correct information", () => {
    const { getAllByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <GameScreen navigation={mockNavigation} />
      </CreditsContext.Provider>
    );

    // Check if the difficulty level button is present using testID
    const levelButton = getAllByTestId(`difficulty-level-button`);
    expect(levelButton).toBeTruthy();

    // Check if the text for the difficulty level is present using testID
    const levelText = getAllByTestId(`levelDifficulty`);
    expect(levelText).toBeTruthy();

    // Check if the image source is present using testID
    const imageSource = getAllByTestId(`imageSource`);
    expect(imageSource).toBeTruthy();
  });
  // Written with a help of ChatGPT - start
  it("Renders CustomHeader", () => {
    const { getByText } = render(
      <CreditsContext.Provider value={mockCredits}>
        <GameScreen navigation={mockNavigation} />
      </CreditsContext.Provider>
    );

    // Check if the CustomHeader title "Choose Difficulty" is rendered
    expect(getByText("Choose Difficulty")).toBeTruthy();
  });
  // Written with a help of ChatGPT - end
});
