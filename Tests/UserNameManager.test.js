import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  checkUsernameInStorage,
  generateRandomUsername,
  initializeUsername,
  updateUsername,
} from "../UserNameManager";

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

// Clear mock function calls and reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  mockAsyncStorage.getItem.mockClear();
  mockAsyncStorage.setItem.mockClear();
});

describe("UserNameManager tests", () => {
  it("generateRandomUsername should generate a random username", () => {
    const randomUsername = generateRandomUsername(8);
    expect(randomUsername).toMatch(/^User_[A-Za-z0-9]{8}$/); // Check if it matches the expected format
  });

  // it("checkUsernameInStorage should return the stored username if available", async () => {
  //   const storedUsername = "User_Test123";
  //   mockAsyncStorage.getItem.mockResolvedValue(storedUsername);

  //   const result = await checkUsernameInStorage();

  //   expect(result).toBe(storedUsername);
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledTimes(2);
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("usernameInitial");
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("username");
  // });

  // it("checkUsernameInStorage should return null if no username is available", async () => {
  //   mockAsyncStorage.getItem.mockResolvedValue(null);

  //   const result = await checkUsernameInStorage();

  //   expect(result).toBeNull();
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledTimes(2);
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("usernameInitial");
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("username");
  // });

  // it("initializeUsername should initialize and return a random username", async () => {
  //   const storedUsername = "User_Test123";
  //   mockAsyncStorage.getItem.mockResolvedValue(null);
  //   mockAsyncStorage.setItem.mockResolvedValue(undefined);
  //   generateRandomUsername.mockReturnValue(storedUsername);

  //   const result = await initializeUsername();

  //   expect(result).toBe(storedUsername);
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledTimes(2);
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("usernameInitial");
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("username");
  //   expect(mockAsyncStorage.setItem).toHaveBeenCalledTimes(2);
  //   expect(mockAsyncStorage.setItem).toHaveBeenCalledWith("username", storedUsername);
  //   expect(mockAsyncStorage.setItem).toHaveBeenCalledWith("usernameInitial", storedUsername);
  // });

  // it("initializeUsername should return the stored username if available", async () => {
  //   const storedUsername = "User_Test123";
  //   mockAsyncStorage.getItem.mockResolvedValue(storedUsername);

  //   const result = await initializeUsername();

  //   expect(result).toBe(storedUsername);
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledTimes(2);
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("usernameInitial");
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("username");
  //   expect(mockAsyncStorage.setItem).not.toHaveBeenCalled();
  // });

  // it("updateUsername should update the username in AsyncStorage and Firebase", async () => {
  //   const newUsername = "User_NewName";
  //   const usernameInitial = "User_InitialName";

  //   mockAsyncStorage.getItem.mockResolvedValue(usernameInitial);

  //   const dbSetMock = jest.fn();

  //   // Mock Firebase Realtime Database set function
  //   jest.mock("firebase/database", () => ({
  //     ref: jest.fn(() => ({
  //       set: dbSetMock,
  //     })),
  //   }));

  //   await updateUsername(newUsername);

  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledTimes(1);
  //   expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("usernameInitial");
  //   expect(mockAsyncStorage.setItem).toHaveBeenCalledTimes(1);
  //   expect(mockAsyncStorage.setItem).toHaveBeenCalledWith("username", newUsername);
  //   expect(dbSetMock).toHaveBeenCalledTimes(1);
  //   expect(dbSetMock).toHaveBeenCalledWith(
  //     expect.anything(),
  //     newUsername
  //   ); // You can adjust the expectation based on your Firebase setup
  // });
});
