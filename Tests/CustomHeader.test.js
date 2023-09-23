import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CustomHeader from "../CustomHeader"; // Import the CustomHeader component
import { CreditsContext } from "../CreditsContext";
import { useNavigation } from "@react-navigation/native";

// Mock the useNavigation hook
// jest.mock("@react-navigation/native", () => {
//   return {
//     useNavigation: jest.fn(),
//   };
// });
// Ensure that Jest uses the mock for SoundSettingContext
jest.mock("../SoundSettingContext");

// Mock the CreditsContext functions
const mockCredits = {
  credits: 200,
  addCredits: jest.fn(),
  removeCredits: jest.fn(),
  resetCredits: jest.fn(),
};
// const navigateMock = jest.fn();
// const goBackMock = jest.fn();
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

describe("CustomHeader tests", () => {
  it("Back button work", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <CustomHeader title="Test Title" />{" "}
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

  it("should show the SettingsOverlay when the settings button is pressed", async () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <CustomHeader title="Test Title" settingsVisible={false} />
      </CreditsContext.Provider>
    );

    const settingsButton = getByTestId("settings-button");
    fireEvent.press(settingsButton);

    await waitFor(() => {
      const settingsOverlay = getByTestId("modal");
      expect(settingsOverlay).toBeTruthy();
    });
  });

  // it("should close the SettingsOverlay when the close button is pressed", () => {
  //   const { getByTestId } = render(
  //     <CustomHeader title="Test Title" settingsVisible={true} />
  //   );

  //   const closeButton = getByTestId("close-button");
  //   fireEvent.press(closeButton);

  //   const settingsOverlay = getByTestId("settings-overlay");
  //   expect(settingsOverlay).toBeNull();
  // });

  // it("should show the credits variable", () => {
  //   const creditsText = "Test Credits";
  //   const { getByText } = render(
  //     <CustomHeader title="Test Title" credits={creditsText} />
  //   );

  //   const creditsElement = getByText(creditsText);
  //   expect(creditsElement).toBeTruthy();
  // });
});
