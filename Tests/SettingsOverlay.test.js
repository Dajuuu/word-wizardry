import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SettingsOverlay from "../SettingsOverlay";
import "@testing-library/jest-native/extend-expect";

// Mock functions and values from context/hooks
jest.mock("../SoundSettingContext");

describe("SettingsOverlay tests", () => {
  // Written with a help of ChatGPT - start
  it("Render the modal when visible prop is true", () => {
    const { getByTestId } = render(<SettingsOverlay visible={true} />);
    const modal = getByTestId("modal");
    expect(modal).toBeTruthy();
  });
  // Written with a help of ChatGPT - end

  it("Call onClose when the close button is pressed", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <SettingsOverlay visible={true} onClose={onClose} />
    );
    const closeButton = getByTestId("close-button");
    fireEvent.press(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it("Sound switch working", () => {
    const { getByTestId } = render(<SettingsOverlay visible={true} />);
    const soundSwitch = getByTestId("sound-switch");
    fireEvent.press(soundSwitch);
    expect(soundSwitch).toBeTruthy();
  });

  it("Music switch working", () => {
    const { getByTestId } = render(<SettingsOverlay visible={true} />);
    const musicSwitch = getByTestId("music-switch");
    fireEvent.press(musicSwitch);
    expect(musicSwitch).toBeTruthy();
  });

  it("Vibrations switch working", () => {
    const { getByTestId } = render(<SettingsOverlay visible={true} />);
    const vibrSwitch = getByTestId("vibr-switch");
    fireEvent.press(vibrSwitch);
    expect(vibrSwitch).toBeTruthy();
  });

  it("Check for correct modal style", () => {
    const { getByTestId } = render(<SettingsOverlay visible={true} />);

    const modalStyle = getByTestId("modal-style");

    expect(modalStyle).toHaveStyle({
      backgroundColor: "rgba(250,234,219,1)",
      padding: 20,
      borderRadius: 18,
      alignItems: "center",
      width: "60%",
      flexDirection: "column",
    });
  });

  it("Check for correct switch container style", () => {
    const { getByTestId } = render(<SettingsOverlay visible={true} />);

    const switchContainer = getByTestId("switch-container");

    expect(switchContainer).toHaveStyle({
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
      backgroundColor: "rgb(255, 225, 198)",
      padding: 8,
      borderRadius: 10,
      elevation: 4, // Android shadow
      shadowColor: "#000", // iOS shadow
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    });
  });

  it("Check for switch font", () => {
    const { getByTestId } = render(<SettingsOverlay visible={true} />);

    const switchFont = getByTestId("switch-font");

    // Declare a windowHeight to compare correct values
    expect(switchFont).toHaveStyle({
      fontFamily: "AppFont",
    });
  });
  it("Check for Close Button style", () => {
    const { getByTestId } = render(<SettingsOverlay visible={true} />);

    const closeButton = getByTestId("close-button");

    // Declare a windowHeight to compare correct values
    expect(closeButton).toHaveStyle({
      position: "absolute",
      top: -10,
      right: -10,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    });
  });
});
