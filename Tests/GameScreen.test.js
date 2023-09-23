import React from "react";
import { render, act } from "@testing-library/react-native";
import GameScreen from "../Screens/GameScreen";
import { CreditsContext } from "../CreditsContext";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Ensure that Jest uses the mock for SoundSettingContext
jest.mock("../SoundSettingContext");

describe("GameScreen", () => {
  it("Renders correctly", () => {
    // Create a mock context value for the test
    const mockCredits = {
      credits: 500, // Set your desired mock credits value
      addCredits: jest.fn(),
      removeCredits: jest.fn(),
      resetCredits: jest.fn(),
    };

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
});
