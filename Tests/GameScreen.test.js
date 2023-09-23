import React from "react";
import { render, act } from "@testing-library/react-native";
import GameScreen from "../Screens/GameScreen";
import { CreditsContext } from "../CreditsContext";
import "@testing-library/jest-native/extend-expect";

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

// Initalise the navigation mock
const mockNavigation = {
  navigate: jest.fn(),
};

describe("GameScreen Tests", () => {
  // Written with a help of ChatGPT - start
  it("Renders correctly", () => {
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

    const levelButtons = getAllByTestId("levelDifficulty");
    expect(levelButtons.length).toBe(4); // expect the length
  });

  it("Renders difficulty levels with correct information", () => {
    const { getAllByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <GameScreen navigation={mockNavigation} />
      </CreditsContext.Provider>
    );

    const levelText = getAllByTestId(`levelDifficulty`);
    expect(levelText).toBeTruthy();

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
    expect(getByText("Choose Difficulty")).toBeTruthy();
  });
  // Written with a help of ChatGPT - end

  it("Check for correct box style", () => {
    const { getAllByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <GameScreen navigation={mockNavigation} />
      </CreditsContext.Provider>
    );

    const buttons = getAllByTestId(/difficulty-level-button-\d+/);

    buttons.forEach((button) => {
      expect(button).toHaveStyle({
        width: "90%",
        height: 150,
        borderRadius: 8,
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 10,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        elevation: 8,
      });
    });
  });
});
