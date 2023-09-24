import React, { useContext } from "react";
import { render } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreditsProvider, CreditsContext } from "../CreditsContext";
jest.mock("@react-native-async-storage/async-storage");

// Written with a help of ChatGPT - start
describe("CreditsContext", () => {
  // Mock AsyncStorage functions
  const mockSetItem = jest.fn();
  const mockGetItem = jest.fn();

  beforeEach(() => {
    mockSetItem.mockClear();
    mockGetItem.mockClear();

    AsyncStorage.setItem = mockSetItem;
    AsyncStorage.getItem = mockGetItem;
  });

  it("initializes credits to 200", () => {
    let creditsValue;

    const TestComponent = () => {
      const { credits } = useContext(CreditsContext);
      creditsValue = credits;
      return null;
    };

    render(
      <CreditsProvider>
        <TestComponent />
      </CreditsProvider>
    );

    expect(creditsValue).toBe(200);
  });
});
// Written with a help of ChatGPT - end
