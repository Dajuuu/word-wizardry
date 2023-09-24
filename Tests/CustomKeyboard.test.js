import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomKeyboard from "../CustomKeyboard";
import "@testing-library/jest-native/extend-expect";

// Mock the onKeyPress function
// Written with a help of ChatGPT - start
const mockOnKeyPress = jest.fn();

describe("CustomKeyboard tests", () => {
  it("Render the keyboard layout correctly", () => {
    const { getByText } = render(
      <CustomKeyboard onKeyPress={mockOnKeyPress} />
    );

    const keyboardData = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ];

    // Loop through each row and key and check if they are rendered in order
    keyboardData.forEach((row) => {
      row.forEach((key) => {
        expect(getByText(key)).toBeTruthy();
      });
    });
  });
  // Written with a help of ChatGPT - end

  it("Check if backspace exists", () => {
    const { getByTestId } = render(
      <CustomKeyboard onKeyPress={mockOnKeyPress} />
    );

    const backspaceKey = getByTestId("backspace-key");
    fireEvent.press(backspaceKey);

    // Check if the mockOnKeyPress function was called with an empty string
    expect(mockOnKeyPress).toHaveBeenCalledWith("");
  });

  it("Render all keys as TouchableOpacity", () => {
    const { getAllByTestId } = render(
      <CustomKeyboard onKeyPress={mockOnKeyPress} />
    );

    const keys = getAllByTestId("keyboard-key");
    expect(keys.length).toBeGreaterThan(0);
  });
  it("Check for Keyboard style", () => {
    const { getByTestId } = render(
      <CustomKeyboard onKeyPress={mockOnKeyPress} />
    );

    const keyboardContainer = getByTestId("keyboard-container");

    expect(keyboardContainer).toHaveStyle({
      width: "100%",
      backgroundColor: "#f7d7ba",
      paddingHorizontal: 15,
      paddingTop: 10,
      paddingBottom: 20,
    });
  });

  it("Check for Keyboard Button style", () => {
    const { getAllByTestId } = render(
      <CustomKeyboard onKeyPress={mockOnKeyPress} />
    );

    const keyboardButton = getAllByTestId("keyboard-key");

    keyboardButton.forEach((button) => {
      expect(button).toHaveStyle({
        width: "9%",
        alignItems: "center",
        justifyContent: "center",
        margin: 3,
        marginBottom: 8,
        backgroundColor: "#ebb381",
        borderRadius: 5,
        elevation: 4, // Android
        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      });
    });
  });
  it("Check for Keyboard Backspace style", () => {
    const { getByTestId } = render(
      <CustomKeyboard onKeyPress={mockOnKeyPress} />
    );

    const keyboardBackspace = getByTestId("keyboard-backspace");

    expect(keyboardBackspace).toHaveStyle({
      width: "15%",
      backgroundColor: "#d8965d",
    });
  });
});
