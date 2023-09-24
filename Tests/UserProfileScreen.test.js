import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UserProfile from "../Screens/UserProfileScreen";
import { CreditsContext } from "../CreditsContext";
import "@testing-library/jest-native/extend-expect";

beforeEach(() => {
  jest.clearAllMocks();
  mockAsyncStorage.getItem.mockClear();
  mockAsyncStorage.setItem.mockClear();
});

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

// Mock AsyncStorage functions
const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Written with a help of ChatGPT - start
// Mock Firebase functions
jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  set: jest.fn(),
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

// Mock Firebase configuration
jest.mock("../firebaseConfig", () => ({
  apiKey: "mock-api-key",
}));
// Written with a help of ChatGPT - end

describe("UserProfile", () => {
  it("Renders correctly after loading", async () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <UserProfile />
      </CreditsContext.Provider>
    );
    // Written with a help of ChatGPT - start

    // Wait for the LoadingScreen to disappear
    await new Promise((resolve) => setTimeout(resolve, 1100));
    // Written with a help of ChatGPT - end
    expect(getByText("Your Username")).toBeTruthy();
    expect(getByText("Change Background")).toBeTruthy();
    expect(getByTestId("user-info")).toBeTruthy();
    expect(getByTestId("user-input")).toBeTruthy();
    expect(getByTestId("hint1-box")).toBeTruthy();
    expect(getByTestId("hint2-box")).toBeTruthy();
    expect(getByTestId("hint3-box")).toBeTruthy();
    expect(getByTestId("change-background")).toBeTruthy();
    expect(getAllByTestId("background-image")).toBeTruthy();
  });
  it("Update Username button is pressable", async () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <UserProfile />
      </CreditsContext.Provider>
    );

    // Wait for the LoadingScreen to disappear
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const updateButton = getByTestId("update-username-input");
    expect(updateButton).toBeTruthy();
    fireEvent.press(updateButton);
  });

  it("Hint buttons work", async () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <UserProfile />
      </CreditsContext.Provider>
    );

    // Wait for the LoadingScreen to disappear
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const hint1Button = getByTestId("hint1-box");
    const hint2Button = getByTestId("hint2-box");
    const hint3Button = getByTestId("hint3-box");

    expect(hint1Button).toBeTruthy();
    expect(hint2Button).toBeTruthy();
    expect(hint3Button).toBeTruthy();

    fireEvent.press(hint1Button);
    fireEvent.press(hint2Button);
    fireEvent.press(hint3Button);
  });

  it("Check for User and Background sections style", async () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <UserProfile />
      </CreditsContext.Provider>
    );

    // Wait for the LoadingScreen to disappear
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const userInfo = getByTestId("user-info");
    const changeBackground = getByTestId("change-background");

    expect(userInfo).toHaveStyle({
      flex: 2,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#A4BE7B",
      paddingVertical: 50,
      borderBottomWidth: 1,
      borderBottomColor: "rgb(129, 103, 79)",
    });

    expect(changeBackground).toHaveStyle({
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#5F8D4E",
      paddingVertical: 20,
    });
  });
});
