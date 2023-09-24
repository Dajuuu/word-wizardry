import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LevelScreen from "../Screens/LevelScreen";
import "@testing-library/jest-native/extend-expect";

describe("LevelScreen", () => {
  const mockProps = {
    levelName: "Test Level 1",
    color: "blue",
    outlineColor: "white",
    completedLevels: [],
    completedColor: "red",
    completedOutlineColor: "blue",
    GRID_DATA: [],
    ROW_CLUES: [],
    levelPoints: 10,
    hintCount1Increase: 1,
    hintCount2Increase: 2,
    hintCount3Increase: 3,
    creditsIncrease: 15,
    navigation: {
      navigate: jest.fn(),
    },
  };
  // Written with a help of ChatGPT - start
  it("Renders the level name", () => {
    const { getByText } = render(<LevelScreen {...mockProps} />);
    expect(getByText("Test Level 1")).toBeTruthy();
  });

  it("Renders the completed text when the level is completed", () => {
    const completedProps = { ...mockProps, completedLevels: ["Test Level 1"] };
    const { getByText } = render(<LevelScreen {...completedProps} />);
    expect(getByText("Completed")).toBeTruthy();
  });

  it("Calls navigation.navigate when pressed", () => {
    const { getByText } = render(<LevelScreen {...mockProps} />);
    const levelBox = getByText("Test Level 1");
    fireEvent.press(levelBox);
    expect(mockProps.navigation.navigate).toHaveBeenCalledWith(
      "CrosswordScreen",
      {
        levelName: "Test Level 1",
        GRID_DATA: [],
        ROW_CLUES: [],
        levelPoints: 10,
        hintCount1Increase: 1,
        hintCount2Increase: 2,
        hintCount3Increase: 3,
        creditsIncrease: 15,
      }
    );
  });
  // Written with a help of ChatGPT - end
  it("Check for Button style", () => {
    const { getByTestId } = render(<LevelScreen {...mockProps} />);

    const levelContainer = getByTestId("level-container");

    expect(levelContainer).toHaveStyle({
      width: "42%",
      height: 160,
      borderRadius: 8,
      marginVertical: 8,
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 12,
      borderLeftWidth: 12,
      elevation: 5, // Android shadow
      shadowColor: "black", // iOS shadow
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    });
  });
});
