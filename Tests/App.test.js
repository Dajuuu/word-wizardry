import React from "react";
import { render } from "@testing-library/react-native";

import LoadingScreen from "../Screens/LoadingScreen";
// import HomeScreen from "../Screens/HomeScreen";
// import GameScreen from "./Screens/GameScreen";
// import EasyLevelsScreen from "./Levels/EasyLevels";
// import MediumLevelsScreen from "./Levels/MediumLevels";
// import HardLevelsScreen from "./Levels/HardLevels";
// import ThemedLevelsScreen from "./Levels/ThemedLevels";
// import TestingGamingScreen from "./TestingGamingScreen";
// import CrosswordApp from "./Screens/CrosswordScreen";
// import LevelScreen from "./Screens/LevelScreen";
// import Achievements from "./Achievements";
// import UserProfile from "./Screens/UserProfileScreen";
// import Leaderboard from "./Screens/LeaderboardScreen";

// Mock the useNavigation hook
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(),
  };
});

// Mock the AppContext
// jest.mock("../AppContext", () => ({
//   useAppContext: jest.fn(() => ({
//     doneCount: 5,
//     totalCaloriesBurnt: 100,
//     resetLoadDoneCount: jest.fn(),
//     resetTotalCaloriesBurnt: jest.fn(),
//   })),
// }));

// // Mock the useTimerContext
// jest.mock("../TimerContext", () => ({
//   useTimerContext: jest.fn(() => ({
//     stopTimer: jest.fn(),
//     resetTimer: jest.fn(),
//   })),
// }));

// Unit tests
describe("App tests", () => {
  // Mock the route.params object
  const mockRoute = {
    params: {
      type: "someType", // Replace with the actual value needed for testing
    },
  };

  // it("Non-empty imageAssets", () => {
  //   // Import the actual generatedImagePathArray
  //   const imageAssets = require("../generatedImagePathArray").default;

  //   // Ensure that imageAssets is not empty
  //   expect(imageAssets.length).toBeGreaterThan(0);
  // });

  // it("Font files exist", () => {
  //   const regularFontPath = "../assets/fonts/JosefinSans-Regular.ttf";
  //   const boldFontPath = "../assets/fonts/JosefinSans-Bold.ttf";

  //   // Check if the font files can be resolved
  //   expect(() => require.resolve(regularFontPath)).not.toThrow();
  //   expect(() => require.resolve(boldFontPath)).not.toThrow();
  // });

  // it("Render HomeScreen", () => {
  //   const { root } = render(<HomeScreen />);

  //   // Check if the rendered component is not null or empty
  //   expect(root).toBeTruthy();
  // });

  it("Render LoadingScreen", () => {
    const { root } = render(<LoadingScreen />);

    // Check if the rendered component is not null or empty
    expect(root).toBeTruthy();
  });

  // it("Render GameScreen", () => {
  //   // Render the SelectedWorkoutScreen component with the mocked route prop
  //   const { root } = render(<GameScreen/>);

  //   // Check if the rendered component is not null or empty
  //   expect(root).toBeTruthy();
  // });

  // it("Render ExerciseScreen", () => {
  //   // Render the SelectedWorkoutScreen component with the mocked route prop
  //   const { root } = render(<ExerciseScreen route={mockRoute} />);

  //   // Check if the rendered component is not null or empty
  //   expect(root).toBeTruthy();
  // });

  // it("Render RestScreen", () => {
  //   // Render the SelectedWorkoutScreen component with the mocked route prop
  //   const { root } = render(<RestScreen route={mockRoute} />);

  //   // Check if the rendered component is not null or empty
  //   expect(root).toBeTruthy();
  // });

  // it("Render WorkoutFinished", () => {
  //   // Render the SelectedWorkoutScreen component with the mocked route prop
  //   const { root } = render(<WorkoutFinished route={mockRoute} />);

  //   // Check if the rendered component is not null or empty
  //   expect(root).toBeTruthy();
  // });
  //There is not test for the WorkoutDetailsScreen because there were some problems with this
});
