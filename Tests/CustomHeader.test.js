import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CustomHeader from "../CustomHeader";
import { CreditsContext } from "../CreditsContext";
import "@testing-library/jest-native/extend-expect";

// Ensure that Jest uses the mock for SoundSettingContext
jest.mock("../SoundSettingContext");

// Mock the CreditsContext functions
const mockCredits = {
  credits: 200,
  addCredits: jest.fn(),
  removeCredits: jest.fn(),
  resetCredits: jest.fn(),
};
// Written with a help of ChatGPT - start
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));
// Written with a help of ChatGPT - end

describe("CustomHeader tests", () => {
  it("Back button work", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <CustomHeader title="Test Title" />
      </CreditsContext.Provider>
    );
    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);
    expect(backButton).toBeTruthy();
  });

  it("Settings button work", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <CustomHeader title="Test Title" />
      </CreditsContext.Provider>
    );
    const settingsButton = getByTestId("settings-button");
    fireEvent.press(settingsButton);
    expect(settingsButton).toBeTruthy();
  });

  it("Show the SettingsOverlay when the settings button is pressed", async () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <CustomHeader title="Test Title" settingsVisible={false} />
      </CreditsContext.Provider>
    );

    const settingsButton = getByTestId("settings-button");
    fireEvent.press(settingsButton);
    // Written with a help of ChatGPT - start
    await waitFor(() => {
      const settingsOverlay = getByTestId("modal");
      expect(settingsOverlay).toBeTruthy();
    });
    // Written with a help of ChatGPT - end
  });

  it("Show the credits count", () => {
    const creditsText = mockCredits.credits;
    const { getByText } = render(
      <CreditsContext.Provider value={mockCredits}>
        <CustomHeader title="Test Title" credits={creditsText} />
      </CreditsContext.Provider>
    );

    const creditsElement = getByText(String(creditsText));
    expect(creditsElement).toBeTruthy();
  });

  it("Check for correct Button style", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <CustomHeader title="Test Title" />
      </CreditsContext.Provider>
    );

    const settingsButton = getByTestId("settings-button");

    expect(settingsButton).toHaveStyle({
      backgroundColor: "rgba(183, 140, 101,1)",
      borderRadius: 100,
      shadowColor: "black", // iOS shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4, // Android
    });
  });
  it("Check for correct Credits Box style", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <CustomHeader title="Test Title" />
      </CreditsContext.Provider>
    );

    const creditsContainer = getByTestId("credits-container");

    expect(creditsContainer).toHaveStyle({
      justifyContent: "center",
      backgroundColor: "rgba(183, 140, 101,1)",
      padding: 2,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      minWidth: 100,
      shadowColor: "black", // iOS shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4, // Android
    });
  });
});
