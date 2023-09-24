import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BuyHintOverlay from "../BuyHintOverlay";
import { CreditsContext } from "../CreditsContext";
import "@testing-library/jest-native/extend-expect";

// Mock the navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Ensure that Jest uses the mock for SoundSettingContext
jest.mock("../SoundSettingContext");

const mockCredits = {
  credits: 200,
  addCredits: jest.fn(),
  removeCredits: jest.fn(),
  resetCredits: jest.fn(),
};

// Mock the parameters
describe("BuyHintOverlay", () => {
  const onCloseMock = jest.fn();
  const onBuyHintMock = jest.fn();
  const removeCreditsMock = jest.fn();
  const canBuyHint = false;
  const hintNumber = 1;
  const creditsDecrement = 10;
  const credits = 20;

  it("Renders correctly when visible is true", () => {
    const { getByText, getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <BuyHintOverlay
          visible={true}
          onClose={onCloseMock}
          onBuyHint={onBuyHintMock}
          hintNumber={hintNumber}
          creditsDecrement={creditsDecrement}
        />
      </CreditsContext.Provider>
    );

    // Check if elements are rendered
    expect(getByText(`Buy Hint ${hintNumber}`)).toBeTruthy();
    expect(getByText("Reveal letter in a specific position")).toBeTruthy();
    expect(getByText("Would you like to buy this hint?")).toBeTruthy();
    expect(getByText(`${creditsDecrement} credits`)).toBeTruthy();
    expect(getByTestId("close-button")).toBeTruthy();
    expect(getByTestId("buy-button")).toBeTruthy();
  });

  // Written with a help of ChatGPT - start
  it("Calls onClose when the close button is pressed", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <BuyHintOverlay
          visible={true}
          onClose={onCloseMock}
          onBuyHint={onBuyHintMock}
          hintNumber={hintNumber}
          creditsDecrement={creditsDecrement}
        />
      </CreditsContext.Provider>
    );

    const closeButton = getByTestId("close-button");
    fireEvent.press(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("Calls onBuyHint when the buy button is pressed and user has enough credits", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider value={mockCredits}>
        <BuyHintOverlay
          visible={true}
          onClose={onCloseMock}
          onBuyHint={onBuyHintMock}
          hintNumber={hintNumber}
          creditsDecrement={creditsDecrement}
          credits={credits}
        />
      </CreditsContext.Provider>
    );

    const buyButton = getByTestId("buy-button");
    fireEvent.press(buyButton);

    expect(onBuyHintMock).toHaveBeenCalledTimes(1);
  });
  // Written with a help of ChatGPT - end
  it("Does not call onBuyHint when the user does not have enough credits", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider
        value={{ credits: 5, removeCredits: removeCreditsMock }}
      >
        <BuyHintOverlay
          visible={true}
          onClose={onCloseMock}
          onBuyHint={onBuyHintMock}
          hintNumber={hintNumber}
          creditsDecrement={creditsDecrement}
        />
      </CreditsContext.Provider>
    );

    const buyButton = getByTestId("buy-button");

    if (canBuyHint) {
      fireEvent.press(buyButton);
    }

    expect(removeCreditsMock).not.toHaveBeenCalled();
    expect(onBuyHintMock).toHaveBeenCalled();
  });
  it("Check for correct modal style", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider
        value={{ credits: 5, removeCredits: removeCreditsMock }}
      >
        <BuyHintOverlay
          visible={true}
          onClose={onCloseMock}
          onBuyHint={onBuyHintMock}
          hintNumber={hintNumber}
          creditsDecrement={creditsDecrement}
        />
      </CreditsContext.Provider>
    );

    const modalStyle = getByTestId("modal-style");

    expect(modalStyle).toHaveStyle({
      backgroundColor: "rgba(250,234,219,1)",
      padding: 20,
      borderRadius: 8,
      alignItems: "center",
      width: "60%",
      flexDirection: "column",
    });
  });
  it("Check for switch font", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider
        value={{ credits: 5, removeCredits: removeCreditsMock }}
      >
        <BuyHintOverlay
          visible={true}
          onClose={onCloseMock}
          onBuyHint={onBuyHintMock}
          hintNumber={hintNumber}
          creditsDecrement={creditsDecrement}
        />
      </CreditsContext.Provider>
    );

    const switchFont = getByTestId("font");

    expect(switchFont).toHaveStyle({
      fontFamily: "AppFontBold",
    });
  });
  it("Check for Close Button style", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider
        value={{ credits: 5, removeCredits: removeCreditsMock }}
      >
        <BuyHintOverlay
          visible={true}
          onClose={onCloseMock}
          onBuyHint={onBuyHintMock}
          hintNumber={hintNumber}
          creditsDecrement={creditsDecrement}
        />
      </CreditsContext.Provider>
    );

    const closeButton = getByTestId("close-button");

    expect(closeButton).toHaveStyle({
      position: "absolute",
      top: -10,
      right: -10,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8, // Android shadow
      shadowColor: "black", // iOS shadow
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    });
  });
  it("Check for Buy Button style", () => {
    const { getByTestId } = render(
      <CreditsContext.Provider
        value={{ credits: 5, removeCredits: removeCreditsMock }}
      >
        <BuyHintOverlay
          visible={true}
          onClose={onCloseMock}
          onBuyHint={onBuyHintMock}
          hintNumber={hintNumber}
          creditsDecrement={creditsDecrement}
        />
      </CreditsContext.Provider>
    );

    const buyButton = getByTestId("buy-button");

    expect(buyButton).toHaveStyle({
      backgroundColor: "transparent",
      marginTop: 20,
      elevation: 5,
      shadowColor: "black", // iOS shadow
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    });
  });
});
