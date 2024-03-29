import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../Screens/HomeScreen";
import { CreditsContext } from "../CreditsContext";
import { PointsContext } from "../PointsContext";
import "@testing-library/jest-native/extend-expect";

beforeEach(() => {
  jest.clearAllMocks();
  mockAsyncStorage.getItem.mockClear();
  mockAsyncStorage.setItem.mockClear();
});

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
  useFocusEffect: jest.fn(),
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

const mockPointsContext = {
  points: 100,
  addPoints: jest.fn(),
  resetPoints: jest.fn(),
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

describe("HomeScreen tests", () => {
  it("Renders the HomeScreen component", () => {
    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );
    const homeScreen = getByTestId("homescreen-container");
    expect(homeScreen).toBeTruthy();
  });
  // Written with a help of ChatGPT - start
  it("User Profile button works and navigates to appropriate screen", async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen navigation={navigation} />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );
    const userProfileButton = getByTestId("user-profile-button");
    expect(userProfileButton).toBeTruthy();
    fireEvent.press(userProfileButton);
    expect(navigation.navigate).toHaveBeenCalledWith("UserProfile");
    // Written with a help of ChatGPT - end
  });

  it("Achievments button works and navigates to appropriate screen", async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen navigation={navigation} />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );

    const userProfileButton = getByTestId("achivs-button");
    expect(userProfileButton).toBeTruthy();
    fireEvent.press(userProfileButton);
    expect(navigation.navigate).toHaveBeenCalledWith("Achievements");
  });
  it("Leaderboard button works and navigates to appropriate screen", async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen navigation={navigation} />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );

    const userProfileButton = getByTestId("leaderboard-button");
    expect(userProfileButton).toBeTruthy();
    fireEvent.press(userProfileButton);
    expect(navigation.navigate).toHaveBeenCalledWith("Leaderboard");
  });
  it("Play button works and navigates to appropriate screen", async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen navigation={navigation} />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );

    const userProfileButton = getByTestId("play-button");
    expect(userProfileButton).toBeTruthy();
    fireEvent.press(userProfileButton);
    expect(navigation.navigate).toHaveBeenCalledWith("GameScreen");
  });

  it("Settings button work", async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen navigation={navigation} />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );
    const settingsButton = getByTestId("settings-button");
    expect(settingsButton).toBeTruthy();
    fireEvent.press(settingsButton);
  });

  it("Check Buttons style", async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen navigation={navigation} />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );

    const button = getByTestId("achivs-button");

    expect(button).toHaveStyle({
      justifyContent: "center",
      alignItems: "center",
      padding: 12,
      backgroundColor: "rgba(69,84,62,1)",
      borderRadius: 20,
      elevation: 4, // Android shadow
      shadowColor: "#000", // iOS shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    });
  });

  it("Check Play Button style", async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen navigation={navigation} />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );

    const button = getByTestId("play-button");

    expect(button).toHaveStyle({
      paddingHorizontal: 130,
      paddingVertical: 50,
      borderRadius: 40,
      elevation: 8, // Android shadow
      shadowColor: "#000", // iOS shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    });
  });

  it("Check Leaderboard Button style", async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByTestId } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen navigation={navigation} />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );

    const button = getByTestId("leaderboard-button");

    expect(button).toHaveStyle({
      width: "50%",
      backgroundColor: "rgba(47,57,44,0.8)",
      paddingVertical: 20,
      borderRadius: 10,
      marginTop: 40,
    });
  });

  it("Displays user points correctly", () => {
    const { getByText } = render(
      <PointsContext.Provider value={mockPointsContext}>
        <CreditsContext.Provider value={mockCredits}>
          <HomeScreen />
        </CreditsContext.Provider>
      </PointsContext.Provider>
    );

    const pointsText = getByText("Your points");
    expect(pointsText).toBeTruthy();
  });
});
