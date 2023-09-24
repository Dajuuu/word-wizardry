import {
  BASE_HINT_USES,
  HINT_COUNT_STORAGE_KEY_PREFIX,
  loadHintCount,
  decrementHintCount,
  incrementHintCount,
} from "../HintManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("HintManager tests", () => {
  it("BASE_HINT_USES should be equal to 3", () => {
    expect(BASE_HINT_USES).toBe(3);
  });

  it('HINT_COUNT_STORAGE_KEY_PREFIX should be equal to "hintCount_"', () => {
    expect(HINT_COUNT_STORAGE_KEY_PREFIX).toBe("hintCount_");
  });

  // Written with a help of ChatGPT - start
  it("loadHintCount should return BASE_HINT_USES if no hint count is stored", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const hintIndex = 1;
    const hintCount = await loadHintCount(hintIndex);

    expect(hintCount).toBe(BASE_HINT_USES);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      `${HINT_COUNT_STORAGE_KEY_PREFIX}${hintIndex}`
    );
  });

  it("decrementHintCount should decrease the hint count by 1", async () => {
    AsyncStorage.getItem.mockResolvedValue("3");
    AsyncStorage.setItem.mockResolvedValue(undefined);

    const hintIndex = 1;
    await decrementHintCount(hintIndex);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      `${HINT_COUNT_STORAGE_KEY_PREFIX}${hintIndex}`
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      `${HINT_COUNT_STORAGE_KEY_PREFIX}${hintIndex}`,
      "2"
    );
  });

  it("incrementHintCount should increase the hint count by the specified amount", async () => {
    AsyncStorage.getItem.mockResolvedValue("3");
    AsyncStorage.setItem.mockResolvedValue(undefined);

    const hintIndex = 1;
    const increaseAmount = 2;
    await incrementHintCount(hintIndex, increaseAmount);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      `${HINT_COUNT_STORAGE_KEY_PREFIX}${hintIndex}`
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      `${HINT_COUNT_STORAGE_KEY_PREFIX}${hintIndex}`,
      "5"
    );
  });
  // Written with a help of ChatGPT - end
});
