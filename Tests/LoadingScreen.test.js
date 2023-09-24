import React from "react";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import LoadingScreen from "../Screens/LoadingScreen";

describe("LoadingScreen tests", () => {
  it("Render the LoadingScreen component", () => {
    const { getByTestId } = render(<LoadingScreen />);

    const loadingIndicator = getByTestId("loading-indicator");

    expect(loadingIndicator).toBeTruthy();
  });

  it("Render correct game title", () => {
    const { getByText } = render(<LoadingScreen />);

    const appName = getByText("Word Wizardry");

    expect(appName).toBeTruthy();
  });

  it("Check for correct styles", () => {
    const { getByTestId } = render(<LoadingScreen />);

    const container = getByTestId("container");
    const loadingText = getByTestId("loadingText");
    const appName = getByTestId("appName");

    expect(container).toHaveStyle({
      alignItems: "center",
      justifyContent: "center",
    });
    expect(loadingText).toHaveStyle({
      marginTop: 40,
      textAlign: "center",
      color: "white",
      fontFamily: "AppFontBold",
    });
    expect(appName).toHaveStyle({
      textAlign: "center",
      color: "white",
      fontFamily: "AppLoadingAmaticBold",
    });
  });
  it("Background image loads", () => {
    // loadingImage
    const loadingImage = "../assets/loadingImage.png";
    expect(() => require.resolve(loadingImage)).not.toThrow();
  });
});
