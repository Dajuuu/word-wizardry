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
      type: "someType",
    },
  };

  // https://jestjs.io/docs/expect#expectvalue
  it("Font files exist", () => {
    const regularFontPath = "../assets/fonts/Quicksand-Bold.ttf";
    const boldFontPath = "../assets/fonts/Quicksand-Bold.ttf";
    const WWFont = "../assets/fonts/AmaticSC-Bold.ttf";

    // Check if the font files can be resolved
    expect(() => require.resolve(regularFontPath)).not.toThrow();
    expect(() => require.resolve(boldFontPath)).not.toThrow();
    expect(() => require.resolve(WWFont)).not.toThrow();
  });

  it("Sound files exist", () => {
    const backgroundMusic = "../assets/sounds/backgroundMusic.mp3";
    const buttonClick = "../assets/sounds/buttonClick.mp3";
    const levelCompleted = "../assets/sounds/levelCompleted.mp3";

    // Check if the font files can be resolved
    expect(() => require.resolve(backgroundMusic)).not.toThrow();
    expect(() => require.resolve(buttonClick)).not.toThrow();
    expect(() => require.resolve(levelCompleted)).not.toThrow();
  });

  it("Background images exist", () => {
    for (let i = 1; i <= 17; i++) {
      const imagePath = `../assets/BackgroundImages/${i}.png`;

      // Check if the image file can be resolved
      expect(() => require.resolve(imagePath)).not.toThrow();
    }
    // loadingImage
    const loadingImage = "../assets/loadingImage.png";
    expect(() => require.resolve(loadingImage)).not.toThrow();
  });

  it("Level Difficulty images exist", () => {
    const starEasy = "../assets/LevelDifficultyImages/star-easy.png";
    const starMedium = "../assets/LevelDifficultyImages/star-medium.png";
    const starHard = "../assets/LevelDifficultyImages/star-hard.png";
    const startThemed = "../assets/LevelDifficultyImages/star-themed.png";

    // Check if the font files can be resolved
    expect(() => require.resolve(starEasy)).not.toThrow();
    expect(() => require.resolve(starMedium)).not.toThrow();
    expect(() => require.resolve(starHard)).not.toThrow();
    expect(() => require.resolve(startThemed)).not.toThrow();
  });

  it("Icons images exist", () => {
    const credits = "../assets/credits.png";
    const hint1 = "../assets/hint1-mag-glass.png";
    const hint2 = "../assets/hint2-bulb.png";
    const hint3 = "../assets/hint3-dice.png";
    const medal1 = "../assets/medal1.png";
    const medal2 = "../assets/medal2.png";
    const medal3 = "../assets/medal3.png";

    // Check if the font files can be resolved
    expect(() => require.resolve(credits)).not.toThrow();
    expect(() => require.resolve(hint1)).not.toThrow();
    expect(() => require.resolve(hint2)).not.toThrow();
    expect(() => require.resolve(hint3)).not.toThrow();
    expect(() => require.resolve(medal1)).not.toThrow();
    expect(() => require.resolve(medal2)).not.toThrow();
    expect(() => require.resolve(medal3)).not.toThrow();
  });

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
