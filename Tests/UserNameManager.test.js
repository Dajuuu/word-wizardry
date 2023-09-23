import { generateRandomUsername } from "../UserNameManager";

// Clear mock function calls and reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  mockAsyncStorage.getItem.mockClear();
  mockAsyncStorage.setItem.mockClear();
});

// Mock AsyncStorage functions
const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Mock the console.error function to suppress error messages
console.error = jest.fn();

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

describe("UserNameManager tests", () => {
  it("generateRandomUsername should generate a random username", () => {
    const randomUsername = generateRandomUsername(8);
    expect(randomUsername).toMatch(/^User_[A-Za-z0-9]{8}$/); // Check if it matches the expected format
  });
});
