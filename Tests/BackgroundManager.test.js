import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DEFAULT_BACKGROUND,
  getBackgroundImage,
  setStoredBackgroundImage,
  setDefaultBackgroundImage,
  backgroundImagePaths,
} from "../BackgroundManager";

jest.mock("@react-native-async-storage/async-storage");

describe("Background Utility Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("DEFAULT_BACKGROUND should be equal to 1", () => {
    expect(DEFAULT_BACKGROUND).toEqual(1);
  });

  it("backgroundImagePaths should have a length of 17", () => {
    expect(Object.keys(backgroundImagePaths).length).toEqual(17);
  });
  // Written with a help of ChatGPT - start
  it("getBackgroundImage should return the stored background image number", async () => {
    const storedBackgroundImage = "5"; // Example stored background image number
    AsyncStorage.getItem.mockResolvedValue(storedBackgroundImage);

    const result = await getBackgroundImage();

    expect(result).toEqual(parseInt(storedBackgroundImage, 10));
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("backgroundImageIndex");
  });

  it("getBackgroundImage should return DEFAULT_BACKGROUND if no value is stored", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const result = await getBackgroundImage();

    expect(result).toEqual(DEFAULT_BACKGROUND);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("backgroundImageIndex");
  });

  it("getBackgroundImage should return DEFAULT_BACKGROUND if AsyncStorage throws an error", async () => {
    AsyncStorage.getItem.mockRejectedValue(new Error("AsyncStorage Error"));

    const result = await getBackgroundImage();

    expect(result).toEqual(DEFAULT_BACKGROUND);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("backgroundImageIndex");
  });
  // Written with a help of ChatGPT - end
  it("setStoredBackgroundImage should set the background image number in AsyncStorage", async () => {
    const imageNumber = 3; // Example background image number

    await setStoredBackgroundImage(imageNumber);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "backgroundImageIndex",
      imageNumber.toString()
    );
  });

  it("setDefaultBackgroundImage should set the default background image if not already present", async () => {
    AsyncStorage.getItem.mockResolvedValue(null); // Simulate that it's not already set

    await setDefaultBackgroundImage();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("backgroundImageIndex");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "backgroundImageIndex",
      DEFAULT_BACKGROUND.toString()
    );
  });

  it("setDefaultBackgroundImage should not set the default background image if already present", async () => {
    AsyncStorage.getItem.mockResolvedValue("5"); // Simulate that it's already set

    await setDefaultBackgroundImage();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("backgroundImageIndex");
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });
});
